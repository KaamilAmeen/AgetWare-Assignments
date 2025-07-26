const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bank.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id TEXT,
    principal REAL,
    interest_rate REAL,
    period_years INTEGER,
    total_amount REAL,
    emi REAL,
    amount_paid REAL DEFAULT 0,
    emi_paid INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    loan_id INTEGER,
    type TEXT, -- EMI or LUMP SUM
    amount REAL,
    date TEXT
  )`);
});

module.exports = db;
