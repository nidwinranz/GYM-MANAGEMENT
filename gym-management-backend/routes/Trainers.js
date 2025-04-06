const express = require("express");
const router = express.Router();
const Trainer = require("../models/Trainer");

// POST route to add a new trainer with userId as a parameter
router.post("/trainers/:userId", async (req, res) => {
  try {
    const {
      name,
      qualification,
      role,
      gender,
      experience,
      contactNo,
      email,
      bio,
      imgUrl,
    } = req.body;
    const { userId } = req.params; // Extract userId from the URL parameter
    const trainer = new Trainer({
      name,
      qualification,
      role,
      gender,
      experience,
      contactNo,
      email,
      bio,
      imgUrl,
      userId, // userId from the URL parameter
    });
    await trainer.save();
    res.status(201).json({ message: "Trainer added successfully", trainer });
  } catch (error) {
    console.error("Error adding trainer:", error.message);
    res.status(500).json({ error: "Failed to add trainer" });
  }
});

// GET route to get a trainer by ID
router.get("/trainers/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    res.json(trainer);
  } catch (error) {
    console.error("Error fetching trainer:", error.message);
    res.status(500).json({ error: "Failed to fetch trainer" });
  }
});

// PUT route to update a trainer by ID
router.put("/trainers/:id", async (req, res) => {
  try {
    const {
      name,
      qualification,
      role,
      gender,
      experience,
      contactNo,
      email,
      bio,
      imgUrl,
    } = req.body;
    const trainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      {
        name,
        qualification,
        role,
        gender,
        experience,
        contactNo,
        email,
        bio,
        imgUrl,
      },
      { new: true }
    );
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    res.json({ message: "Trainer updated successfully", trainer });
  } catch (error) {
    console.error("Error updating trainer:", error.message);
    res.status(500).json({ error: "Failed to update trainer" });
  }
});

// DELETE route to delete a trainer by ID
router.delete("/trainers/:id", async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    res.json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error.message);
    res.status(500).json({ error: "Failed to delete trainer" });
  }
});

router.get("/trainers/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user ID exists in the Trainer collection
    const userExists = await Trainer.exists({ userId });

    if (userExists) {
      // User ID exists, proceed with fetching trainers
      const trainers = await Trainer.find({ userId });
      res.json(trainers);
    } else {
      // User ID does not exist
      res.status(404).json({ error: "User ID not found" });
    }
  } catch (error) {
    console.error("Error fetching trainers:", error.message);
    res.status(500).json({ error: "Failed to fetch trainers" });
  }
});
router.get("/trainers", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error.message);
    res.status(500).json({ error: "Failed to fetch trainers" });
  }
});

module.exports = router;
