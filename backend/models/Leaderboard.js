const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  player_name: { type: String, required: true },
  game: { type: String, required: true },
  state: { type: String, default: 'Maharashtra' },
  rank: { type: Number, default: 1 },
  points: { type: Number, default: 1000 },
  wins: { type: Number, default: 0 },
  tournaments_played: { type: Number, default: 0 },
  avatar_color: { type: String, default: '#7B2FFF' }
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
