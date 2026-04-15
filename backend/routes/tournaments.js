const express = require('express');
const jwt = require('jsonwebtoken');
const Tournament = require('../models/Tournament');
const Registration = require('../models/Registration');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'esportshubindia_secret_2025';

// GET /api/tournaments
router.get('/', async (req, res) => {
  try {
    const { game, status, search } = req.query;
    let filter = {};
    if (game && game !== 'all') filter.game = game;
    if (status && status !== 'all') filter.status = status;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const tournaments = await Tournament.find(filter).sort({ createdAt: -1 });
    res.json({ tournaments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tournaments/:id
router.get('/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
    res.json({ tournament });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/tournaments/:id/register
router.post('/:id/register', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Login required to register' });
    const decoded = jwt.verify(token, JWT_SECRET);

    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ error: 'Tournament not found' });
    if (tournament.status === 'past') return res.status(400).json({ error: 'Tournament has ended' });
    if (tournament.slots_filled >= tournament.slots) return res.status(400).json({ error: 'Tournament is full' });

    const existing = await Registration.findOne({ user: decoded.id, tournament: req.params.id });
    if (existing) return res.status(409).json({ error: 'Already registered' });

    const registration = new Registration({ user: decoded.id, tournament: req.params.id });
    await registration.save();

    await Tournament.findByIdAndUpdate(req.params.id, { $inc: { slots_filled: 1 } });

    res.json({ success: true, message: 'Successfully registered!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tournaments/user/registered
router.get('/user/registered', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Login required' });
    const decoded = jwt.verify(token, JWT_SECRET);

    const registrations = await Registration.find({ user: decoded.id }).populate('tournament');
    const tournaments = registrations.map(r => r.tournament).filter(t => t !== null);
    
    res.json({ tournaments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
