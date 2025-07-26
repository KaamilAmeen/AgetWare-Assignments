const LoanModel = require('../models/LoanModel');

exports.lend = (req, res) => {
  LoanModel.createLoan(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(result);
  });
};

exports.payment = (req, res) => {
  const { loan_id } = req.params;
  const { type, amount } = req.body;
  LoanModel.recordPayment(loan_id, type, amount, (err, result) => {
    if (err) return res.status(400).send(err);
    res.json(result);
  });
};

exports.ledger = (req, res) => {
  const { loan_id } = req.params;
  LoanModel.getLedger(loan_id, (err, result) => {
    if (err) return res.status(404).send(err);
    res.json(result);
  });
};

exports.accountOverview = (req, res) => {
  const { customer_id } = req.params;
  LoanModel.getAllLoansForCustomer(customer_id, (err, loans) => {
    if (err) return res.status(500).send(err);
    res.json(loans);
  });
};
