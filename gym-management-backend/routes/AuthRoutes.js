const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, gender, weight, height, role } =
      req.body;
    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      gender,
      weight,
      height,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, gender, weight, height } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        gender,
        weight,
        height,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

// Route to get all users by role
router.get("/users/:role", async (req, res) => {
  const role = req.params.role;

  try {
    const users = await User.find({ role: role });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
