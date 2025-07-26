const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/lend', loanController.lend);
router.post('/payment/:loan_id', loanController.payment);
router.get('/ledger/:loan_id', loanController.ledger);
router.get('/overview/:customer_id', loanController.accountOverview);

module.exports = router;
