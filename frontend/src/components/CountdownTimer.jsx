import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate, status }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetDate || status === 'past' || status === 'live') return;

    const update = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) { setTimeLeft(null); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ d, h, m, s });
    };

    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate, status]);

  if (status === 'live') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', borderRadius: 8,
        background: 'rgba(255,45,120,0.12)',
        border: '1px solid rgba(255,45,120,0.4)',
        fontFamily: 'Rajdhani', fontWeight: 700,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#ff2d78',
          animation: 'live-pulse 1s ease-in-out infinite',
          display: 'inline-block'
        }}/>
        <span style={{ color: '#ff2d78', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
          LIVE NOW
        </span>
      </div>
    );
  }

  if (!timeLeft) return null;

  const Unit = ({ val, label }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Orbitron', fontWeight: 800, fontSize: '1.1rem',
        color: 'var(--cyan)', lineHeight: 1,
        textShadow: '0 0 10px rgba(0,243,255,0.5)',
      }}>
        {String(val).padStart(2, '0')}
      </div>
      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>
        {label}
      </div>
    </div>
  );

  return (
    <div style={{
      padding: '8px 14px', borderRadius: 8,
      background: 'rgba(0,243,255,0.06)',
      border: '1px solid rgba(0,243,255,0.2)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'Rajdhani', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        ⏳ Starts in
      </span>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {timeLeft.d > 0 && <><Unit val={timeLeft.d} label="days" /><span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>:</span></>}
        <Unit val={timeLeft.h} label="hrs" />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>:</span>
        <Unit val={timeLeft.m} label="min" />
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 4 }}>:</span>
        <Unit val={timeLeft.s} label="sec" />
      </div>
    </div>
  );
}
