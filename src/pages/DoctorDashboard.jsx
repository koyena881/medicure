import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Users, AlertTriangle, FileText, MessageSquare, Video, LogOut, Search, User, X } from 'lucide-react';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  
  // Categorized and sorted patients
  const [patients] = useState([
    { id: 3, name: 'John Doe', age: 55, category: 'Cardiac', condition: 'Cardiac Arrest Risk', hr: 135, spo2: 89, status: 'critical' },
    { id: 2, name: 'Robert Brown', age: 65, category: 'Hypertension', condition: 'Arrhythmia', hr: 88, spo2: 95, status: 'warning' },
    { id: 5, name: 'Michael Johnson', age: 71, category: 'Respiratory', condition: 'COPD', hr: 82, spo2: 92, status: 'warning' },
    { id: 1, name: 'Alice Smith', age: 42, category: 'Hypertension', condition: 'Hypertension', hr: 72, spo2: 98, status: 'stable' },
    { id: 4, name: 'Emily Chen', age: 28, category: 'Diabetes', condition: 'Type 1', hr: 68, spo2: 99, status: 'stable' }
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [showChat, setShowChat] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([{sender: 'Patient', text: 'Doctor, my chest feels tight today.'}]);
  const [newMsg, setNewMsg] = useState('');

  const sendMsg = () => {
    if(newMsg.trim()) {
      const msg = {sender: 'Doctor', text: newMsg};
      setChatMsgs([...chatMsgs, msg]);
      fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      setNewMsg('');
    }
  };

  const filteredPatients = activeCategory === 'All' ? patients : patients.filter(p => p.category === activeCategory);

  return (
    <div className="app-container">
      
      {showChat && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '350px', background: 'var(--bg-color-secondary)', border: '1px solid var(--primary)', borderRadius: '12px', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
          <div style={{ background: 'var(--primary)', color: 'black', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
            <span>Chat with {selectedPatient.name}</span>
            <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div style={{ padding: '16px', height: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chatMsgs.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.sender === 'Doctor' ? 'flex-end' : 'flex-start', background: msg.sender === 'Doctor' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: msg.sender === 'Doctor' ? 'black' : 'white', padding: '8px 12px', borderRadius: '16px' }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '8px', borderTop: '1px solid var(--card-border)' }}>
            <input type="text" value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} style={{ flex: 1, padding: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }} placeholder="Type a message..." />
            <button onClick={sendMsg} style={{ background: 'var(--primary)', border: 'none', padding: '8px 12px', borderRadius: '4px', marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold', color: 'black' }}>Send</button>
          </div>
        </div>
      )}

      <aside className="sidebar">
        <div style={{ padding: '0 32px 32px 32px', textAlign: 'center' }}>
          <Activity color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue title-display" style={{ fontSize: '1.8rem', margin: 0 }}>Doctor</h2>
        </div>
        <nav style={{ flex: 1 }}>
          <a className="nav-item active"><Users size={20} /> Priority Patients</a>
          <a className="nav-item" onClick={() => setShowChat(true)}><MessageSquare size={20} /> Patient Chat</a>
          <a className="nav-item" onClick={() => alert("Backend API hit: Fetching consultation logs...")}><Video size={20} /> Consultations</a>
        </nav>
        <div style={{ padding: '0 32px', marginTop: 'auto' }}>
          <a className="nav-item" onClick={() => navigate('/login')} style={{ color: 'var(--accent-red)', cursor: 'pointer' }}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header className="dashboard-header" style={{ flexShrink: 0 }}>
          <div>
            <h1>Dr. Sarah Jenkins</h1>
            <p>1 Critical Case requires immediate attention.</p>
          </div>
        </header>

        <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
          
          <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
            <h3 style={{ marginBottom: '16px' }}>Triage & Categories</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {['All', 'Cardiac', 'Hypertension', 'Diabetes', 'Respiratory'].map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`btn ${activeCategory === cat ? '' : 'btn-secondary'}`} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>{cat}</button>
              ))}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredPatients.map(patient => (
                <div 
                  key={patient.id} onClick={() => setSelectedPatient(patient)}
                  style={{ 
                    padding: '16px', background: selectedPatient.id === patient.id ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255,255,255,0.02)', 
                    borderRadius: '8px', cursor: 'pointer',
                    borderLeft: patient.status === 'critical' ? '4px solid var(--accent-red)' : patient.status === 'warning' ? '4px solid #F59E0B' : '4px solid var(--accent-green)',
                  }}
                >
                  <div className="flex-between">
                    <strong style={{ fontSize: '1.1rem' }}>{patient.name}</strong>
                    {patient.status === 'critical' && <AlertTriangle size={16} color="var(--accent-red)" className="animate-pulse-slow" />}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>[{patient.category}] {patient.condition}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ flex: 2, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            {selectedPatient && (
              <>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '16px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="avatar" style={{ width: '64px', height: '64px' }}><User size={32} /></div>
                    <div>
                      <h2 style={{ margin: 0 }}>{selectedPatient.name}</h2>
                      <span style={{ color: 'var(--text-secondary)' }}>{selectedPatient.age} yrs • {selectedPatient.condition}</span>
                    </div>
                  </div>
                  <button className="btn" onClick={() => setShowChat(true)}><MessageSquare size={16}/> Message</button>
                </div>
                
                <div className="metrics-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Heart Rate</span>
                    <div className="stat-value" style={{ color: selectedPatient.status === 'critical' ? 'var(--accent-red)' : 'white' }}>{selectedPatient.hr}</div>
                  </div>
                  <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>SpO2</span>
                    <div className="stat-value">{selectedPatient.spo2}%</div>
                  </div>
                </div>

                {selectedPatient.status === 'critical' && (
                  <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-red)', borderRadius: '8px' }}>
                    <h3 style={{ color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={20} /> CRITICAL ALERT</h3>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                      <button className="btn btn-danger" onClick={() => alert("Backend API hit: Establishing WebRTC Video Stream.")}>Start Emergency Call</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
