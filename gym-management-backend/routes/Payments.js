const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing payment
router.put('/:id', async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all payments grouped by user ID
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      { $group: { _id: '$user', payments: { $push: '$$ROOT' } } }
    ]);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payments for a specific user by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const payments = await Payment.find({ user: userId });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a payment
router.delete('/:id', async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
