const express = require('express');
const router = express.Router();
const Budget = require('../models/budget');
const { protect } = require('../middleware/auth');  // Assuming you have this for user authentication

// POST /api/budget - Save a new budget
router.post('/', protect, async (req, res) => {
  try {
    const { amount } = req.body;

    // Check if a budget already exists for this user
    let budget = await Budget.findOne({ user: req.user.id });
    if (budget) {
      // Update the existing budget
      budget.amount = amount;
    } else {
      // Create a new budget if not found
      budget = new Budget({
        user: req.user.id,
        amount,
      });
    }

    await budget.save();
    res.status(201).json({ message: 'Budget saved successfully', budget });
  } catch (err) {
    res.status(500).json({ message: 'Error saving budget', error: err.message });
  }
});

// GET /api/budget - Fetch the user's budget
router.get('/', protect, async (req, res) => {
  try {
    const budget = await Budget.findOne({ user: req.user.id });
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    res.json(budget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching budget' });
  }
});


// DELETE budget entry by _id
router.delete("/:id", async (req, res) => {
  console.log(req)
  const userId = req.userid;
  const itemId = req.params.id;
  

  try {
    // Make sure the budget item belongs to the logged-in user
    const deleted = await Budget.findOneAndDelete({ _id: itemId, user: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Budget item not found or not authorized to delete." });
    }

    res.status(200).json({ message: "Budget item deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting budget item:", error);
    res.status(500).json({ message: "Server error while deleting budget item." });
  }
});

module.exports = router;
