const express = require('express');
const router = express.Router();
const { getDB } = require('../db/database');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_PROMPT_BASE = `You are NeuroGamer, the ultimate AI Esports Mentor & Assistant for "India Esports Hub". 
Your goal is to help players dominate the Indian esports scene.

KNOWLEDGE BASE:
- PLATFORM: India Esports Hub is India's top site for BGMI, Valorant, and Free Fire Max tournaments.
- REGISTRATION: To join any tournament: 1. Sign up for an account. 2. Visit the 'Tournaments' page. 3. Click 'Join Now' on your favorite game. 
- PRIZES: We offer prize pools from ₹10,000 to ₹5,00,000. Payouts are 100% secure via UPI or Bank Transfer within 72 hours of tournament completion.
- SUPPORT: If a player is stuck, tell them to "Open a Support Ticket" in their profile or check the Rules tab.

STRICT RULES:
1. NEVER start a response with an introduction like "Hey Gamer! I'm NeuroGamer" or "Welcome to India Esports Hub" after the very first message in the conversation.
2. After the initial greeting, answer every query DIRECTLY and CONCISELY.
3. Use the LIVE TOURNAMENT DATA provided below to answer specific questions about events.

PERSONALITY:
- Be a Mentor/Coach: Dynamic, encouraging, and professional. 
- Use Gaming Lingo: GG, Clutch, Frag, IGL, Scrims, Rotations.`;

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    // Fetch Live Tournament Data
    const db = getDB();
    const liveTournaments = db.prepare('SELECT title, game, status, slots, slots_filled FROM tournaments WHERE status != "past"').all();
    const liveDataStr = liveTournaments.map(t => 
      `- ${t.title} (${t.game}): ${t.status.toUpperCase()}, Slots: ${t.slots_filled}/${t.slots}`
    ).join('\n');

    const FINAL_SYSTEM_PROMPT = `${SYSTEM_PROMPT_BASE}\n\nLIVE TOURNAMENT DATA:\n${liveDataStr || 'No live tournaments at the moment.'}`;

    if (!GEMINI_API_KEY) {
      // Fallback smart responses without API (Refined: No repeats)
      const lower = message.toLowerCase();
      let reply = "";
      
      if (lower.includes('register') || lower.includes('registration')) {
        reply = "To register, just 1. Create an account, 2. Go to Tournaments, 3. Click 'Join Now' on your game! GG! 🏆";
      } else if (lower.includes('bgmi') || lower.includes('battleground')) {
        reply = "We have active BGMI events! Check the Tournaments page for live slots and ₹5 Lakh prize pools! 🔥";
      } else if (lower.includes('prize') || lower.includes('money')) {
        reply = "Prize pools range from ₹50k to ₹5 Lakhs! We pay winners within 72 hours via UPI/Bank. 💰";
      } else if (lower.includes('valorant')) {
        reply = "Valorant Champions India is live! Head to the Tournaments page to grab one of the last 8 slots. ⚡";
      } else if (lower.includes('hello') || lower.includes('hi')) {
        reply = "Hey Gamer! How can I help you dominate the arena today? 🎯";
      } else if (lower.includes('tournament')) {
        reply = liveDataStr ? `Here are the active tournaments:\n${liveDataStr}` : "Check the Tournaments page for the latest updates on upcoming events! 🚀";
      } else {
        reply = "Visit our Tournaments page for all details, or ask me tips for BGMI, Valorant, or Free Fire Max! 🚀";
      }
      return res.json({ reply });
    }

    // Build conversation for Gemini
    const contents = [];
    if (history && history.length > 0) {
      history.slice(-6).forEach(msg => {
        contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
      });
    }
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: FINAL_SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 300, temperature: 0.8 }
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting. Check the Tournaments page for help! 🎮";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
