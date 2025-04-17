const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const budgetRoutes = require('./routes/budget');
const { protect } = require('./middleware/auth'); // Auth middleware (will create in next step)

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', protect, expenseRoutes);  // Protecting the expense routes
app.use('/api/budget', protect, budgetRoutes);    // Protecting the budget routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
