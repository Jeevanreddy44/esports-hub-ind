import React from 'react';
import { motion } from 'framer-motion';
import { FaDiscord, FaInstagram, FaTelegramPlane, FaYoutube, FaUsers, FaTrophy, FaHandshake } from 'react-icons/fa';

const STATS = [
  { icon: <FaUsers />, label: 'Active Members', value: '48K+', color: '#5865F2' },
  { icon: <FaHandshake />, label: 'Registered Clans', value: '1,200', color: '#ff2d78' },
  { icon: <FaTrophy />, label: 'Matches Played', value: '85K+', color: '#ffd60a' },
];

export default function Community() {
  return (
    <div className="page" style={{ paddingTop: 100, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 className="hero-title anim-fade-up">
            <span className="gradient-text">THE ARENA </span> COMMUNITY
          </h1>
          <p className="hero-description anim-fade-up delay-100" style={{ maxWidth: 600, margin: '20px auto 0' }}>
            Connect with India's most elite gaming squads, find teammates, and engage in daily scrims and giveaways!
          </p>
        </div>

        <div className="grid-3" style={{ gap: 24, marginBottom: 80 }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className="glass-card shape-oval"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ padding: '30px 20px', textAlign: 'center', borderTop: `4px solid ${s.color}` }}
            >
              <div style={{ fontSize: '2.5rem', color: s.color, marginBottom: 16 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Orbitron', fontWeight: 900, fontSize: '2rem', color: '#fff', marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: 'var(--text-muted)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="section-title anim-fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>Our <span className="gradient-text" style={{ color: 'var(--cyan)' }}>Networks</span></h2>
        
        <div className="grid-2" style={{ gap: 30, marginBottom: 60 }}>
          <a href="#" className="glass-card shape-soft-hex anim-fade-up" style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 24, textDecoration: 'none', transition: '0.3s' }}>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(88,101,242,0.15)', color: '#5865F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              <FaDiscord />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Orbitron', color: '#fff', fontSize: '1.4rem', marginBottom: 6 }}>Discord Server</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>Join our main communication hub. Daily scrims, voice channels, and live support.</p>
              <div style={{ color: '#5865F2', fontFamily: 'Rajdhani', fontWeight: 800, marginTop: 12, fontSize: '0.85rem' }}>JOIN 48K+ MEMBERS →</div>
            </div>
          </a>

          <a href="#" className="glass-card shape-soft-hex anim-fade-up delay-100" style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 24, textDecoration: 'none', transition: '0.3s' }}>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,45,120,0.15)', color: '#ff2d78', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              <FaInstagram />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Orbitron', color: '#fff', fontSize: '1.4rem', marginBottom: 6 }}>Instagram</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>Follow us for daily tournament highlights, clutch clips, and important announcements.</p>
              <div style={{ color: '#ff2d78', fontFamily: 'Rajdhani', fontWeight: 800, marginTop: 12, fontSize: '0.85rem' }}>FOLLOW @ESPORTS_HUB_IND →</div>
            </div>
          </a>

          <a href="#" className="glass-card shape-soft-hex anim-fade-up delay-200" style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 24, textDecoration: 'none', transition: '0.3s' }}>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(0,136,204,0.15)', color: '#0088cc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              <FaTelegramPlane />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Orbitron', color: '#fff', fontSize: '1.4rem', marginBottom: 6 }}>Telegram</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>Instant alerts! Never miss a tournament registration deadline or bracket update.</p>
              <div style={{ color: '#0088cc', fontFamily: 'Rajdhani', fontWeight: 800, marginTop: 12, fontSize: '0.85rem' }}>GET ALERTS →</div>
            </div>
          </a>

          <a href="#" className="glass-card shape-soft-hex anim-fade-up delay-300" style={{ padding: 32, display: 'flex', alignItems: 'center', gap: 24, textDecoration: 'none', transition: '0.3s' }}>
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,0,0,0.15)', color: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
              <FaYoutube />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Orbitron', color: '#fff', fontSize: '1.4rem', marginBottom: 6 }}>YouTube Channel</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>Watch live streams of grand finals, professional casting, and advanced tip videos.</p>
              <div style={{ color: '#FF0000', fontFamily: 'Rajdhani', fontWeight: 800, marginTop: 12, fontSize: '0.85rem' }}>SUBSCRIBE →</div>
            </div>
          </a>
        </div>

      </div>
    </div>
  );
}
