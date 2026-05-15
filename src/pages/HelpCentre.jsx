import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, LayoutDashboard, Scan, MessageSquare, LogOut, 
  Send, User, CheckCircle, ShieldCheck, ArrowLeft, Video, Phone, MessageCircle
} from 'lucide-react';

export default function HelpCentre() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Doctor', text: 'Hello! I am Dr. Jenkins. I have reviewed your latest BMI report. How are you feeling today?', time: '10:00 AM' }
  ]);
  const [newMsg, setNewMsg] = useState('');

  const handleSend = () => {
    if (!newMsg.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: 'Patient', text: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMsg('');
  };

  return (
    <div className="app-container">
      {/* Sidebar - Consistent with Dashboard */}
      <aside className="sidebar mobile-hide">
        <div className="sidebar-header" style={{ textAlign: 'center' }}>
          <Activity color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue">Medicure Patient</h2>
        </div>
        <nav>
          <a className="nav-item" onClick={() => navigate('/patient')}><LayoutDashboard size={20} /> Dashboard</a>
          <a className="nav-item active"><MessageSquare size={20} /> Help Centre</a>
          <a className="nav-item" onClick={() => navigate('/patient/reviews')}><MessageCircle size={20} /> Reviews & Feedback</a>
        </nav>
        <div className="sidebar-footer">
          <a className="nav-item text-red" onClick={() => navigate('/login')}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="flex-center" style={{ gap: '16px', justifyContent: 'flex-start' }}>
            <button onClick={() => navigate('/patient')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><ArrowLeft size={24} /></button>
            <h1>Help Centre</h1>
          </div>
        </header>

        <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr', height: 'calc(100vh - 150px)' }}>
          {/* Chat Segment */}
          <section className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div className="chat-header-bar flex-between" style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--card-border)' }}>
              <div className="flex-center" style={{ gap: '12px' }}>
                <div className="avatar">SJ</div>
                <div>
                  <h3 style={{ margin: 0 }}>Dr. Sarah Jenkins</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>● Online | Verified MBBS</span>
                </div>
              </div>
              <div className="flex-center" style={{ gap: '12px' }}>
                <button className="icon-btn-circle"><Video size={18} /></button>
                <button className="icon-btn-circle"><Phone size={18} /></button>
              </div>
            </div>

            <div className="chat-messages-area" style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map(m => (
                <div key={m.id} className={`message-bubble ${m.sender.toLowerCase()}`} style={{
                  alignSelf: m.sender === 'Patient' ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: m.sender === 'Patient' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: m.sender === 'Patient' ? 'black' : 'white',
                  position: 'relative'
                }}>
                  <p style={{ margin: 0 }}>{m.text}</p>
                  <span style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '4px', display: 'block', textAlign: 'right' }}>{m.time}</span>
                </div>
              ))}
            </div>

            <div className="chat-input-bar" style={{ padding: '20px', borderTop: '1px solid var(--card-border)' }}>
              <div className="flex-center" style={{ gap: '12px' }}>
                <input 
                  type="text" 
                  value={newMsg} 
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your health concern here..." 
                  style={{ flex: 1, padding: '12px 20px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '30px', color: 'white' }}
                />
                <button className="btn btn-primary" onClick={handleSend} style={{ borderRadius: '50%', width: '45px', height: '45px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Send size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Doctor Info Segment */}
          <section className="glass-panel mobile-hide">
            <h3>Doctor Profile</h3>
            <div className="doctor-profile-card" style={{ marginTop: '24px', textAlign: 'center' }}>
              <div className="avatar-large" style={{ width: '100px', height: '100px', margin: '0 auto 16px' }}>SJ</div>
              <h2>Dr. Sarah Jenkins</h2>
              <p className="text-secondary">MBBS, MD - Cardiology</p>
              
              <div className="flex-center" style={{ gap: '8px', marginTop: '16px', color: 'var(--accent-green)' }}>
                <ShieldCheck size={20} />
                <strong>Govt. Certified</strong>
              </div>

              <div className="info-list" style={{ marginTop: '32px', textAlign: 'left' }}>
                <div className="info-item">
                  <label>Reg No:</label>
                  <span>MC-992-G-2024</span>
                </div>
                <div className="info-item">
                  <label>Experience:</label>
                  <span>12+ Years</span>
                </div>
                <div className="info-item">
                  <label>Consultation:</label>
                  <span>Verified Video Call</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
