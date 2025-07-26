const db = require('../db/database');

const LoanModel = {
  createLoan: (data, callback) => {
    const { customer_id, principal, interest_rate, period_years } = data;
    const interest = principal * interest_rate * period_years;
    const total_amount = principal + interest;
    const emi = total_amount / (period_years * 12);

    db.run(
      `INSERT INTO loans (customer_id, principal, interest_rate, period_years, total_amount, emi) VALUES (?, ?, ?, ?, ?, ?)`,
      [customer_id, principal, interest_rate, period_years, total_amount, emi],
      function (err) {
        if (err) return callback(err);
        callback(null, {
          loan_id: this.lastID,
          total_amount,
          emi: emi.toFixed(2),
        });
      }
    );
  },

  getLoanById: (loan_id, callback) => {
    db.get(`SELECT * FROM loans WHERE id = ?`, [loan_id], callback);
  },

  getAllLoansForCustomer: (customer_id, callback) => {
    db.all(`SELECT * FROM loans WHERE customer_id = ?`, [customer_id], callback);
  },

  recordPayment: (loan_id, type, amount, callback) => {
    db.run(
      `INSERT INTO transactions (loan_id, type, amount, date) VALUES (?, ?, ?, ?)`,
      [loan_id, type, amount, new Date().toISOString()],
      function (err) {
        if (err) return callback(err);

        db.get(`SELECT * FROM loans WHERE id = ?`, [loan_id], (err, loan) => {
          if (err || !loan) return callback(err || "Loan not found");

          let newPaid = loan.amount_paid + amount;
          let newEmiCount = loan.emi_paid + (type === "EMI" ? 1 : 0);
          db.run(
            `UPDATE loans SET amount_paid = ?, emi_paid = ? WHERE id = ?`,
            [newPaid, newEmiCount, loan_id],
            (err) => {
              if (err) return callback(err);
              callback(null, { message: 'Payment recorded successfully' });
            }
          );
        });
      }
    );
  },

  getLedger: (loan_id, callback) => {
    db.get(`SELECT * FROM loans WHERE id = ?`, [loan_id], (err, loan) => {
      if (err || !loan) return callback(err || "Loan not found");
      db.all(`SELECT * FROM transactions WHERE loan_id = ?`, [loan_id], (err, transactions) => {
        if (err) return callback(err);
        const balance = loan.total_amount - loan.amount_paid;
        const emi_left = Math.ceil(balance / loan.emi);
        callback(null, {
          loan,
          transactions,
          balance: balance.toFixed(2),
          emi_left,
        });
      });
    });
  },
};

module.exports = LoanModel;
