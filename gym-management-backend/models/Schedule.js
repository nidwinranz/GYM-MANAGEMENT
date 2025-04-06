const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  className: { type: String, required: true },
  instructor: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true }, // New date field
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;
