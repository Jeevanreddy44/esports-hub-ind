import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className="page" style={{ paddingTop: 100, paddingBottom: 100, minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary shape-pill" style={{ position: 'absolute', top: 100, left: '5%', zIndex: 10, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px' }}>
        <FaArrowLeft /> Back
      </button>
      <div className="container" style={{ maxWidth: 900, marginTop: 40 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center" style={{ marginBottom: 60 }}>
          <h1 className="section-title"><span className="gradient-text">Contact Support</span></h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: 10 }}>
            Need help with a tournament or your account? We're here for you 24/7.
          </p>
        </motion.div>

        <div className="grid-2" style={{ gap: 40 }}>
          <div className="card" style={{ padding: 40 }}>
            <h3 style={{ fontFamily: 'Orbitron', marginBottom: 24, fontSize: '1.4rem' }}>Send a Message</h3>
            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
              <textarea placeholder="How can we help?" className="form-input" rows="5" style={{ resize: 'vertical' }}></textarea>
              <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="shape-circle" style={{ width: 50, height: 50, background: 'rgba(234,67,53,0.1)', color: '#ea4335', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaEnvelope /></div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 800, color: 'var(--text-muted)' }}>EMAIL US</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                  <a href="mailto:esportshubindia@gmail.com" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#ea4335'} onMouseLeave={e => e.currentTarget.style.color = '#fff'}>esportshubindia@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="shape-circle" style={{ width: 50, height: 50, background: 'rgba(0,243,255,0.1)', color: 'var(--cyan)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaPhone /></div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 800, color: 'var(--text-muted)' }}>CALL US</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 600 }}>
                  <a href="tel:+919876543210" style={{ color: '#fff', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'} onMouseLeave={e => e.currentTarget.style.color = '#fff'}>+91 98765 43210</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
