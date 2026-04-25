import { motion } from 'framer-motion';
import { FaGamepad, FaUsers, FaTrophy, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="page" style={{ paddingTop: 100, paddingBottom: 100, minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary shape-pill" style={{ position: 'absolute', top: 100, left: '5%', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px' }}>
        <FaArrowLeft /> Back
      </button>
      <div className="container" style={{ maxWidth: 900, marginTop: 40 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center" style={{ marginBottom: 60 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: 100, background: 'rgba(0,243,255,0.1)', border: '1px solid rgba(0,243,255,0.3)', fontFamily: 'Rajdhani', fontWeight: 700, fontSize: '0.8rem', color: 'var(--cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
            Our Mission
          </div>
          <h1 className="section-title"><span className="gradient-text">About Esports Hub India</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: 20 }}>
            We are building the definitive competitive gaming platform for Indian players. 
            Our goal is to bridge the gap between amateur gamers and professional esports opportunities.
          </p>
        </motion.div>

        <div className="grid-2" style={{ gap: 30, marginBottom: 60 }}>
          <div className="card text-center" style={{ padding: 40 }}>
            <div className="shape-circle" style={{ width: 60, height: 60, background: 'rgba(123,47,255,0.1)', color: 'var(--purple)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}><FaUsers /></div>
            <h3 style={{ fontFamily: 'Orbitron', marginBottom: 10 }}>For The Community</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>A safe, toxic-free environment where players of all skill levels can find teams, compete, and improve together.</p>
          </div>
          <div className="card text-center" style={{ padding: 40 }}>
            <div className="shape-circle" style={{ width: 60, height: 60, background: 'rgba(0,243,255,0.1)', color: 'var(--cyan)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}><FaTrophy /></div>
            <h3 style={{ fontFamily: 'Orbitron', marginBottom: 10 }}>Fair Competition</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verified tournaments, strict anti-cheat policies, and guaranteed prize pool payouts for all winners.</p>
          </div>
        </div>

        <div className="card" style={{ padding: 40, textAlign: 'center', background: 'linear-gradient(135deg, rgba(123,47,255,0.1), rgba(0,243,255,0.1))', borderColor: 'rgba(0,243,255,0.3)' }}>
          <h2 style={{ fontFamily: 'Orbitron', marginBottom: 16 }}>Ready to dominate?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>Join over 50,000 players already competing on our platform.</p>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Create Your Account <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
