// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');

// Create a new schedule
router.post('/', async (req, res) => {
  try {
    const newSchedule = await Schedule.create(req.body);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing schedule
router.put('/:id', async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a schedule
router.delete('/:id', async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

router.get('/user/:userId', async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.params.userId });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get all schedules by instructor
router.get('/schedules/:instructor', async (req, res) => {
  try {
    const instructor = req.params.instructor;

    // Query the database for schedules with the given instructor
    const schedules = await Schedule.find({ instructor: instructor });

    if (!schedules) {
      return res.status(404).json({ message: 'Schedules not found for the given instructor' });
    }

    res.status(200).json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
