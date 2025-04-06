const express = require("express");
const router = express.Router();
const PackPayment = require("../models/PackPayment");

// Route to get all pack payments
router.get("/", async (req, res) => {
  try {
    const packPayments = await PackPayment.find();
    res.json(packPayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to get pack payments by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const packPayments = await PackPayment.find({ userId: req.params.userId });
    res.json(packPayments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to add new pack payment
router.post("/", async (req, res) => {
  const { userId, packageId, paidAmount, balance } = req.body;
  try {
    const newPackPayment = new PackPayment({
      userId,
      packageId,
      paidAmount,
      balance,
    });
    const savedPackPayment = await newPackPayment.save();
    res.status(201).json(savedPackPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.put("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { paidAmount, balance } = req.body;
  try {
    const packPayment = await PackPayment.findOne({ userId });
    if (!packPayment) {
      return res.status(404).json({ message: "Pack payment not found" });
    }
    packPayment.paidAmount = paidAmount;
    packPayment.balance = balance;
    const updatedPackPayment = await packPayment.save();
    res.json(updatedPackPayment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to delete pack payments by package ID
router.delete("/:packageId", async (req, res) => {
  const { packageId } = req.params;
  try {
    await PackPayment.deleteMany({ packageId });
    res.json({ message: "Pack payments deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
