const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// POST /api/budget
router.get('/', async (req, res) => {
  try {
    const { month, amount } = req.body;

    const budget = new Budget({
      user: req.user.id,
      month,
      amount,
    });

    await budget.save();
    res.status(201).json({ message: 'Budget saved successfully', budget });
  } catch (err) {
    res.status(500).json({ message: 'Error saving budget', error: err.message });
  }
});
module.exports = router;
