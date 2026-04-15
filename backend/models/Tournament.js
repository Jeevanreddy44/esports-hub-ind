const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  game: { type: String, required: true },
  game_icon: { type: String, default: '' },
  status: { type: String, enum: ['upcoming', 'live', 'past'], default: 'upcoming' },
  prize_pool: { type: String, default: '₹10,000' },
  slots: { type: Number, default: 64 },
  slots_filled: { type: Number, default: 0 },
  start_date: { type: String, required: true },
  end_date: { type: String },
  registration_deadline: { type: String },
  location: { type: String, default: 'Online' },
  organizer: { type: String, default: 'Esports Hub India' },
  description: { type: String, default: '' },
  rules: { type: [String], default: [] },
  banner_color: { type: String, default: '#7B2FFF' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tournament', tournamentSchema);
