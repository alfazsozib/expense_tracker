const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { protect } = require('../middleware/auth');  // Assuming you have this for user authentication

// POST /api/expenses - Save a new expense
router.post('/', protect, async (req, res) => {
  try {
    const { note, amount } = req.body;

    const expense = new Expense({
      user: req.user.id,
      note,
      amount,
      createdAt: Date.now(),
    });

    await expense.save();
    res.status(201).json({ message: 'Expense saved successfully', expense });
  } catch (err) {
    res.status(500).json({ message: 'Error saving expense', error: err.message });
  }
});

// GET /api/expenses - Fetch all expenses for the authenticated user
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 }); // Sort by latest first
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

module.exports = router;
