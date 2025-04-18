const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;

  // Basic rule-based replies (later replace with real AI)
  let reply = "Sorry, I didn’t understand.";
  if (message.toLowerCase().includes("budget")) reply = "Your current budget is calculated based on your entries.";
  if (message.toLowerCase().includes("spent") || message.toLowerCase().includes("expense")) reply = "You can view total expenses in the summary section.";

  res.json({ reply });
});

module.exports = router;
