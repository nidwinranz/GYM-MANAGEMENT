const express = require("express");
const router = express.Router();
const ActivePackage = require("../models/ActivePackage");

router.get("/", async (req, res) => {
  try {
    const activePackages = await ActivePackage.find().populate("packageId");
    res.json(activePackages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
// Route to get active package by user ID
router.get("/:userId", async (req, res) => {
  try {
    const activePackage = await ActivePackage.findOne({
      userId: req.params.userId,
    }).populate("packageId");
    res.json(activePackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to add/update active package
router.post("/:userId", async (req, res) => {
  const { active, packageId } = req.body;
  const userId = req.params.userId;
  try {
    let activePackage = await ActivePackage.findOne({ userId });
    if (activePackage) {
      // If active package exists, update it
      activePackage.active = active;
      activePackage.packageId = packageId;
      activePackage = await activePackage.save();
    } else {
      // If active package does not exist, create a new one
      activePackage = new ActivePackage({ userId, active, packageId });
      activePackage = await activePackage.save();
    }
    res.status(201).json(activePackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to delete active package
router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    await ActivePackage.deleteOne({ userId });
    res.json({ message: "Active package deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:userId/:packageId", async (req, res) => {
  const { active } = req.body;
  const { userId, packageId } = req.params;
  try {
    let activePackage = await ActivePackage.findOne({ userId });
    if (activePackage) {
      // If active package exists, update it
      activePackage.active = active;
      activePackage.packageId = packageId;
      activePackage = await activePackage.save();
    } else {
      // If active package does not exist, create a new one
      activePackage = new ActivePackage({ userId, active, packageId });
      activePackage = await activePackage.save();
    }
    res.status(201).json(activePackage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/:userId", async (req, res) => {
  try {
    const activePackage = await ActivePackage.findOne({
      userId: req.params.userId,
    });
    console.log(activePackage);
    if (!activePackage) {
      // If no active package found, return active as false
      return res.json({ active: false });
    }

    // If active package found, return its active status
    res.json({ active: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to delete active package by package ID
router.delete("/pack/:packageId", async (req, res) => {
  const packageId = req.params.packageId;
  try {
    await ActivePackage.deleteOne({ packageId });
    res.json({ message: "Active package deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
