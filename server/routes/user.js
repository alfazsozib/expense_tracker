// GET /api/user/profile
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/profile', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret here
    const user = await User.findById(decoded.id).select("-password"); // Remove password

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.put("/update-name/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    // Find the user by _id and update the name
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;