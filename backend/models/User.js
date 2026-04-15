const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  state: { type: String, default: 'Maharashtra' },
  games: { type: [String], default: [] },
  avatar: { type: String, default: '' },
  rank: { type: String, default: 'Rookie' },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
