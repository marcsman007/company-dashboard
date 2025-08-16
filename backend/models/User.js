const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['employee', 'manager', 'admin'], default: "employee" }
});

module.exports = mongoose.model('User', userSchema);
