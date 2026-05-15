import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Users, AlertTriangle, MessageSquare, Video, LogOut, 
  Search, User, X, ShieldCheck, Award, FileCheck, ClipboardList, 
  Send, Bell, MapPin, HeartPulse, Stethoscope, Info, Bot, Sparkles, Phone, Monitor
} from 'lucide-react';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('patients'); // patients, help-centre
  
  // Verification State
  const [isVerified] = useState(true);
  const [govRegNo] = useState("MC-992-G-2024");

  // Emergency & Video States
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  // Patient Data
  const [patients, setPatients] = useState([
    { 
      id: 3, name: 'John Doe', age: 55, category: 'Cardiac', condition: 'Cardiac Arrest Risk', status: 'critical', 
      report: { type: 'BMI Analysis', value: '31.2', status: 'Obese', history: 'Chest pain, high sodium diet' },
      aiSummary: "Patient presents high risk due to BMI of 31.2 coupled with history of chest tightness. AI recommends immediate lipid profile and EKG. Triage Level 1."
    },
    { 
      id: 2, name: 'Robert Brown', age: 65, category: 'Hypertension', condition: 'Arrhythmia', status: 'warning',
      report: { type: 'ECG Report', value: 'Abnormal', status: 'Warning', history: 'Stable on medication' },
      aiSummary: "Slight arrhythmia detected in latest ECG. BP consistently 145/95. Suggest adjusting Beta-blocker dosage. Triage Level 2."
    }
  ]);
  
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [chatMsgs, setChatMsgs] = useState([{ sender: 'Patient', text: 'Doctor, I am feeling a bit dizzy today.', time: '10:15 AM' }]);
  const [newMsg, setNewMsg] = useState('');

  const sendMsg = () => {
    if (!newMsg.trim()) return;
    setChatMsgs([...chatMsgs, { sender: 'Doctor', text: newMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMsg('');
  };

  return (
    <div className="app-container">
      {/* Video Call Overlay */}
      {isVideoActive && (
        <div className="modal-overlay" style={{ zIndex: 6000 }}>
          <div className="glass-panel video-call-container animate-fade-in" style={{ width: '90%', maxWidth: '1000px', height: '80vh', padding: 0, overflow: 'hidden' }}>
            <div className="video-main" style={{ height: '100%', position: 'relative', background: '#111' }}>
              <div className="remote-stream" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={120} color="gray" />
                <p style={{ position: 'absolute', bottom: 100, color: 'white' }}>Connected to {selectedPatient.name}</p>
              </div>
              <div className="local-stream" style={{ position: 'absolute', top: 20, right: 20, width: '200px', height: '150px', background: '#222', borderRadius: '12px', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Stethoscope size={40} color="var(--primary)" />
              </div>
              <div className="video-controls flex-center" style={{ position: 'absolute', bottom: 30, left: 0, right: 0, gap: '20px' }}>
                <button className="btn btn-danger" style={{ borderRadius: '50%', width: 60, height: 60, padding: 0 }} onClick={() => setIsVideoActive(false)}><X size={24} /></button>
                <button className="btn btn-secondary" style={{ borderRadius: '50%', width: 50, height: 50, padding: 0 }}><Monitor size={20} /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <aside className="sidebar">
        <div style={{ padding: '0 32px 32px 32px', textAlign: 'center' }}>
          <Activity color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue">Medicure</h2>
          <div className="flex-center" style={{ gap: '4px', color: 'var(--accent-green)', fontSize: '0.8rem', marginTop: '8px' }}>
            <ShieldCheck size={14} /> Verified MBBS
          </div>
        </div>
        <nav style={{ flex: 1 }}>
          <a className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}><Users size={20} /> My Patients</a>
          <a className={`nav-item ${activeTab === 'help-centre' ? 'active' : ''}`} onClick={() => setActiveTab('help-centre')}><MessageSquare size={20} /> Help Centre</a>
        </nav>
        <div style={{ padding: '0 32px', marginTop: 'auto' }}>
          <a className="nav-item text-red" onClick={() => navigate('/login')}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header flex-between">
          <div>
            <h1>{activeTab === 'patients' ? 'Clinical Workspace' : 'Patient Help Centre'}</h1>
            <p>Registration No: <strong>{govRegNo}</strong></p>
          </div>
          <div className="flex-center" style={{ gap: '16px' }}>
            <button className="btn btn-secondary" onClick={() => setIsVideoActive(true)}><Video size={18} /> Instant Call</button>
          </div>
        </header>

        {activeTab === 'patients' ? (
          <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 2.5fr' }}>
            {/* Triage Queue */}
            <section className="glass-panel">
              <h3 className="flex-center" style={{ gap: '8px', justifyContent: 'flex-start' }}><Users size={20} /> Patient Queue</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                {patients.map(p => (
                  <div key={p.id} onClick={() => setSelectedPatient(p)} className={`glass-panel-inner ${selectedPatient.id === p.id ? 'active-border' : ''}`} style={{ padding: '12px', cursor: 'pointer', borderLeft: p.status === 'critical' ? '4px solid var(--accent-red)' : '1px solid var(--card-border)' }}>
                    <strong>{p.name}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.condition}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Analysis & AI Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <section className="glass-panel">
                <div className="flex-between">
                  <h2>Report Analysis: {selectedPatient.name}</h2>
                  <span className="badge badge-blue">{selectedPatient.report.type}</span>
                </div>
                
                {/* AI Patient Summary - NEW */}
                <div className="ai-summary-card" style={{ marginTop: '20px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))', padding: '20px', borderRadius: '12px', border: '1px solid var(--primary)' }}>
                  <h4 className="flex-center ai-glow" style={{ gap: '8px', justifyContent: 'flex-start' }}>
                    <Sparkles size={18} /> AI-Generated Clinical Summary
                  </h4>
                  <p style={{ marginTop: '12px', fontStyle: 'italic', color: 'white', lineHeight: '1.6' }}>
                    "{selectedPatient.aiSummary}"
                  </p>
                </div>

                <div className="report-viewer-card" style={{ marginTop: '24px', background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px' }}>
                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div><label className="label-secondary">Status</label><div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-red)' }}>{selectedPatient.report.status}</div></div>
                    <div><label className="label-secondary">Value</label><div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{selectedPatient.report.value}</div></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          /* Dedicated Help Centre Segment for Doctor */
          <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
            <section className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '70vh', padding: 0, overflow: 'hidden' }}>
              <div className="chat-header flex-between" style={{ padding: '16px 24px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--card-border)' }}>
                <div className="flex-center" style={{ gap: '12px' }}>
                  <div className="avatar">JD</div>
                  <h3>Patient: {selectedPatient.name}</h3>
                </div>
                <div className="flex-center" style={{ gap: '12px' }}>
                  <button className="icon-btn-circle" onClick={() => setIsVideoActive(true)}><Video size={18} /></button>
                  <button className="icon-btn-circle"><Phone size={18} /></button>
                </div>
              </div>

              <div className="chat-body" style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {chatMsgs.map((m, i) => (
                  <div key={i} className={`msg ${m.sender.toLowerCase()}`} style={{
                    alignSelf: m.sender === 'Doctor' ? 'flex-end' : 'flex-start',
                    background: m.sender === 'Doctor' ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    color: m.sender === 'Doctor' ? 'black' : 'white',
                    padding: '12px 16px', borderRadius: '16px', maxWidth: '70%'
                  }}>
                    {m.text}
                    <span style={{ fontSize: '0.6rem', display: 'block', marginTop: '4px', opacity: 0.6 }}>{m.time}</span>
                  </div>
                ))}
              </div>

              <div className="chat-input" style={{ padding: '20px', borderTop: '1px solid var(--card-border)' }}>
                <div className="flex-center" style={{ gap: '12px' }}>
                  <input 
                    type="text" value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()}
                    placeholder="Provide medical guidance..." style={{ flex: 1, padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'white' }}
                  />
                  <button className="btn btn-primary" onClick={sendMsg}><Send size={18} /></button>
                </div>
              </div>
            </section>

            <section className="glass-panel">
              <h3>Quick Actions</h3>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="btn btn-secondary-full" onClick={() => setIsVideoActive(true)}><Video size={18} /> Initiate Video Call</button>
                <button className="btn btn-secondary-full"><FileCheck size={18} /> Prescribe Medicine</button>
                <div className="ai-warning-box" style={{ marginTop: '20px' }}>
                  <p style={{ fontSize: '0.85rem' }}>Only verified doctors can use the video consultation and prescription features.</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
