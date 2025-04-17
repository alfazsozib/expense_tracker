const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Budget', budgetSchema);
