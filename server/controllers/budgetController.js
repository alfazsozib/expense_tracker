const Budget = require('../models/budget');

const addBudget = async (req, res) => {
  const { month, budget } = req.body;

  try {
    const newBudget = new Budget({
      month,
      budget,
      user: req.user.id, // user should be passed from auth middleware
    });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { addBudget };
