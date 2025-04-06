const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  role: { type: String, enum: ['admin', 'trainer', 'user'], default: 'user' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;