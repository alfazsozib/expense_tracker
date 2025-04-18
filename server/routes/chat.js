const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log("POST /api/chat called");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: "No message provided" });
  }

  const msg = message.toLowerCase();
  let reply = "Sorry, I didn’t understand that. Can you rephrase it?";

  // Greetings
  if (["hi", "hello", "hey", "what's up"].some(greet => msg.includes(greet))) {
    reply = "Hello! How can I assist you with your expenses today?";
  } else if (msg.includes("how are you")) {
    reply = "I'm great, thank you! How can I help with your budget?";
  }else if(msg.includes("bye")){
    reply = "Bye! Have a good day."
  }

  // Expense-related Q&A
  else if (msg.includes("budget")) {
    reply = "Your current budget is calculated based on your entries.";
  } else if (msg.includes("spent") || msg.includes("expense")) {
    reply = "You can view total expenses in the summary section.";
  } else if (msg.includes("how much did i spend")) {
    reply = "Your total expenses are visible in the dashboard summary.";
  } else if (msg.includes("remaining budget")) {
    reply = "Remaining budget is calculated by subtracting expenses from your total budget.";
  } else if (msg.includes("can i increase my budget")) {
    reply = "Yes, you can update your budget anytime from the budget section.";
  } else if (msg.includes("can i delete an expense")) {
    reply = "Yes, just go to the expenses page and click delete next to the entry.";
  } else if (msg.includes("add an expense")) {
    reply = "Click on 'Add Expense' and fill in the details.";
  } else if (msg.includes("monthly report")) {
    reply = "You can see the monthly report in the summary section.";
  } else if (msg.includes("weekly report")) {
    reply = "Currently, only monthly summaries are available.";
  } else if (msg.includes("what is my largest expense")) {
    reply = "Your largest expense is visible in the categorized summary.";
  } else if (msg.includes("how many categories")) {
    reply = "You can create and view as many categories as you like.";
  } else if (msg.includes("how to save money")) {
    reply = "Set realistic budgets and track expenses regularly to save more.";
  } else if (msg.includes("what is expense tracker")) {
    reply = "This tool helps you monitor spending and manage your budget.";
  } else if (msg.includes("can i reset all data")) {
    reply = "There’s no reset option yet. You can manually delete entries.";
  } else if (msg.includes("how secure is my data")) {
    reply = "Your data is stored securely. We prioritize your privacy.";
  } else if (msg.includes("what happens if i exceed budget")) {
    reply = "We notify you in the summary section if expenses exceed your budget.";
  } else if (msg.includes("can i use multiple currencies")) {
    reply = "Right now, only one currency is supported. Multi-currency is coming soon!";
  } else if (msg.includes("difference between fixed and used expense")) {
    reply = "Fixed expense is planned, used expense is what you've actually spent.";
  }

  res.json({ reply });
});

module.exports = router;
