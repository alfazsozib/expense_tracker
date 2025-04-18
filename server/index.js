const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const budgetRoutes = require('./routes/budget');
const { protect } = require('./middleware/auth'); // Auth middleware (will create in next step)
const chatRoutes = require('./routes/chat');

const cors = require("cors")
dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // 👈 important
app.use(express.json());
// app.use(bodyParser.json());



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);  // Protecting the expense routes
app.use('/api/budget', budgetRoutes);    // Protecting the budget routes
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
