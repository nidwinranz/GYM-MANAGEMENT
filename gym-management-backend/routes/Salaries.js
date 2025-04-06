const express = require('express');
const router = express.Router();
const Salary = require('../models/Salary');

// POST route to add a new salary entry
router.post('/salaries', async (req, res) => {
    try {
        const { trainerId, month, basicSalary, otHours, otRate, bonus, totalSalary } = req.body;
        const salary = new Salary({ trainer: trainerId, month, basicSalary, otHours, otRate, bonus, totalSalary });
        await salary.save();
        res.status(201).json(salary);
    } catch (error) {
        console.error('Error adding salary:', error.message);
        res.status(500).json({ message: 'Failed to add salary' });
    }
});

// GET route to fetch all salary entries
router.get('/salaries', async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.json(salaries);
    } catch (error) {
        console.error('Error fetching salaries:', error.message);
        res.status(500).json({ message: 'Failed to fetch salaries' });
    }
});

// GET route to fetch a specific salary entry by ID
router.get('/salaries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const salary = await Salary.findById(id);
        if (!salary) {
            return res.status(404).json({ message: 'Salary not found' });
        }
        res.json(salary);
    } catch (error) {
        console.error('Error fetching salary:', error.message);
        res.status(500).json({ message: 'Failed to fetch salary' });
    }
});

// PUT route to update a specific salary entry by ID
router.put('/salaries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSalary = await Salary.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedSalary);
    } catch (error) {
        console.error('Error updating salary:', error.message);
        res.status(500).json({ message: 'Failed to update salary' });
    }
});

// DELETE route to delete a specific salary entry by ID
router.delete('/salaries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSalary = await Salary.findByIdAndDelete(id);
        if (!deletedSalary) {
            return res.status(404).json({ message: 'Salary not found' });
        }
        res.json({ message: 'Salary deleted successfully' });
    } catch (error) {
        console.error('Error deleting salary:', error.message);
        res.status(500).json({ message: 'Failed to delete salary' });
    }
});

module.exports = router;
