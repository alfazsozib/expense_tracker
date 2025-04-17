const express = require('express');
const { addBudget } = require('../controllers/budgetController');
const router = express.Router();

router.post('/', addBudget);

module.exports = router;
