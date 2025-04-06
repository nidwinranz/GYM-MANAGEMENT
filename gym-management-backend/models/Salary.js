const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the Trainer user model
    month: { type: String, required: true },
    basicSalary: { type: Number, required: true },
    otHours: { type: Number, required: true },
    otRate: { type: Number, required: true },
    bonus: { type: Number, required: true },
    totalSalary: { type: Number, required: true }
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
