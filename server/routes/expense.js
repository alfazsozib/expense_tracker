const express = require('express');
const { addExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post('/', addExpense);

module.exports = router;
