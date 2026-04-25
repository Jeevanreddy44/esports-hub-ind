import { motion } from 'framer-motion';
import { FaEnvelope, FaDiscord, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="page" style={{ paddingTop: 100, paddingBottom: 100, minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: 900 }}>
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
              <div className="shape-circle" style={{ width: 50, height: 50, background: 'rgba(0,243,255,0.1)', color: 'var(--cyan)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaEnvelope /></div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 800, color: 'var(--text-muted)' }}>EMAIL US</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 600 }}>support@esportshub.in</div>
              </div>
            </div>
            <div className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="shape-circle" style={{ width: 50, height: 50, background: 'rgba(123,47,255,0.1)', color: 'var(--purple)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaDiscord /></div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 800, color: 'var(--text-muted)' }}>JOIN DISCORD</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 600 }}>discord.gg/esportshub</div>
              </div>
            </div>
            <div className="card" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="shape-circle" style={{ width: 50, height: 50, background: 'rgba(255,45,120,0.1)', color: 'var(--pink)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FaMapMarkerAlt /></div>
              <div>
                <div style={{ fontFamily: 'Rajdhani', fontWeight: 800, color: 'var(--text-muted)' }}>HEADQUARTERS</div>
                <div style={{ fontFamily: 'Inter', fontWeight: 600 }}>Bangalore, Karnataka, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
