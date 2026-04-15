const express = require('express');
const Leaderboard = require('../models/Leaderboard');
const router = express.Router();

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const { game } = req.query;
    let filter = {};
    if (game && game !== 'all') filter.game = game;

    const players = await Leaderboard.find(filter).sort({ points: -1 });
    res.json({ players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
