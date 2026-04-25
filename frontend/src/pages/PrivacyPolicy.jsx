import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <div className="page" style={{ paddingTop: 100, paddingBottom: 100, minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary shape-pill" style={{ position: 'absolute', top: 100, left: '5%', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px' }}>
        <FaArrowLeft /> Back
      </button>
      <div className="container" style={{ maxWidth: 800, marginTop: 40 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="section-title" style={{ marginBottom: 40 }}>Privacy <span className="gradient-text">Policy</span></h1>
          
          <div className="card" style={{ padding: 40, fontFamily: 'Inter', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            <h3 style={{ fontFamily: 'Orbitron', color: '#fff', marginBottom: 16 }}>1. Information We Collect</h3>
            <p style={{ marginBottom: 30 }}>
              When you register for an Esports Hub India account, we collect personal information such as your name, email address, in-game IDs, and state of residence. We also track tournament participation and leaderboard statistics.
            </p>

            <h3 style={{ fontFamily: 'Orbitron', color: '#fff', marginBottom: 16 }}>2. How We Use Your Data</h3>
            <p style={{ marginBottom: 30 }}>
              Your data is used to verify tournament eligibility, calculate leaderboard rankings, distribute prize pools accurately, and improve our AI matchmaking systems. We do not sell your personal data to third parties.
            </p>

            <h3 style={{ fontFamily: 'Orbitron', color: '#fff', marginBottom: 16 }}>3. Fair Play & Anti-Cheat</h3>
            <p style={{ marginBottom: 30 }}>
              To maintain tournament integrity, we may collect hardware identifiers and running process information during active tournament matches. This data is strictly used for anti-cheat verification and is purged after 30 days.
            </p>

            <h3 style={{ fontFamily: 'Orbitron', color: '#fff', marginBottom: 16 }}>4. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@esportshub.in.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
