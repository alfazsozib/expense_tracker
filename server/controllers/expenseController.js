const Expense = require('../models/expense');

const addExpense = async (req, res) => {
  const { category, amount } = req.body;

  try {
    const newExpense = new Expense({
      category,
      amount,
      user: req.user.id, // user should be passed from auth middleware
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { addExpense };
