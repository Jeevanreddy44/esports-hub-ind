const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament', required: true },
  registeredAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Unique registration per user per tournament
registrationSchema.index({ user: 1, tournament: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
