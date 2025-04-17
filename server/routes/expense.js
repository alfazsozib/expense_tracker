const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// POST /api/expenses
router.get('/', async (req, res) => {
  try {
    const { note, amount } = req.body;

    const expense = new Expense({
      user: req.user.id,
      note,
      amount,
    });

    await expense.save();
    res.status(201).json({ message: 'Expense saved successfully', expense });
  } catch (err) {
    res.status(500).json({ message: 'Error saving expense', error: err.message });
  }
});
module.exports = router;
