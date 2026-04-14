const express = require('express');
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

const SYSTEM_PROMPT = `You are NeuroGamer, the ultimate AI Esports Mentor & Assistant for "India Esports Hub". 
Your goal is to help players dominate the Indian esports scene.

KNOWLEDGE BASE:
- PLATFORM: India Esports Hub is India's top site for BGMI, Valorant, and Free Fire Max tournaments.
- REGISTRATION: To join any tournament: 1. Sign up for an account. 2. Visit the 'Tournaments' page. 3. Click 'Join Now' on your favorite game. 
- PRIZES: We offer prize pools from ₹10,000 to ₹5,00,000. Payouts are 100% secure via UPI or Bank Transfer within 72 hours of tournament completion.
- GAMES: We host BGMI Scrims, Valorant Champions India, and Free Fire Max Grand Prix.
- SUPPORT: If a player is stuck, tell them to "Open a Support Ticket" in their profile or check the Rules tab.

PERSONALITY:
- Be a Mentor/Coach: Dynamic, encouraging, and professional. 
- Use Gaming Lingo: GG, Clutch, Frag, IGL, Scrims, Rotations.
- Keep it concise but pack it with value. 
- If asked about live data, remind them to check the 'Tournaments' page for real-time slots.`;

router.post('/', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    if (!GEMINI_API_KEY) {
      // Fallback smart responses without API
      const lower = message.toLowerCase();
      let reply = "Hey Gamer! 🎮 I'm NeuroGamer. ";
      if (lower.includes('register') || lower.includes('registration')) {
        reply += "To register: 1. Create an account. 2. Go to Tournaments. 3. Click 'Join Now'! GG EZ! 🏆";
      } else if (lower.includes('bgmi') || lower.includes('battleground')) {
        reply += "BGMI tournaments are live with prize pools up to ₹5 Lakhs! Check the Tournaments page! 🔥";
      } else if (lower.includes('prize') || lower.includes('money') || lower.includes('winning')) {
        reply += "Prize pools range from ₹50k to ₹5 Lakhs! We pay via UPI/Bank Transfer within 72 hours. 💰";
      } else if (lower.includes('valorant')) {
        reply += "Valorant Champions India is live with ₹3 Lakh prize pool. Group stages starting soon! ⚡";
      } else if (lower.includes('free fire') || lower.includes('freefire')) {
        reply += "Free Fire Max Grand Prix has ₹2 Lakh prize pool! Don't miss the entry! 🔥";
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        reply += "Welcome to India Esports Hub! I'm your mentor and assistant. How can I help you dominate today? 🎯";
      } else {
        reply += "Visit our Tournaments page for the latest events, or ask me tips for BGMI, Valorant, or Free Fire Max! 🚀";
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
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { maxOutputTokens: 300, temperature: 0.8 }
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble connecting right now. Please try again! 🎮";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
