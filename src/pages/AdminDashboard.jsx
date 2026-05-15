import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Users, Shield, Database, BarChart, LogOut, CheckCircle, Lock, Calendar, 
  ShieldCheck, AlertTriangle, Terminal, Settings, FileCheck, Search, Award, X, Eye
} from 'lucide-react';
import { ResponsiveContainer, BarChart as ReBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, manage-doctors
  
  const [appointments, setAppointments] = useState([
    { id: 101, patient: 'Alice Smith', doctor: 'Dr. Sarah Jenkins', time: 'Today 2:00 PM', status: 'pending', paid: true },
    { id: 102, patient: 'John Doe', doctor: 'Dr. Robert Cline', time: 'Tomorrow 10:00 AM', status: 'approved', paid: true }
  ]);

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Sarah Jenkins', degree: 'MBBS, MD', regNo: 'MC-992-G-2024', status: 'verified', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Mike Ross', degree: 'MBBS', regNo: 'MC-1102-G', status: 'pending', specialty: 'General Physician' },
    { id: 3, name: 'Dr. Rachel Zane', degree: 'MBBS, MD', regNo: 'MC-4451-G', status: 'pending', specialty: 'Pediatrics' }
  ]);

  const [systemLogs] = useState([
    { id: 1, event: 'New Patient SOS Triggered', time: '2 mins ago', status: 'critical' },
    { id: 2, event: 'Payment Success: $50', time: '10 mins ago', status: 'success' },
    { id: 3, event: 'AI Rx Scan Completed', time: '15 mins ago', status: 'info' }
  ]);

  const analyticsData = [
    { name: 'Mon', visits: 40 },
    { name: 'Tue', visits: 30 },
    { name: 'Wed', visits: 60 },
    { name: 'Thu', visits: 45 },
    { name: 'Fri', visits: 90 },
  ];

  const approveAppointment = (app) => {
    fetch('http://localhost:5000/api/approve-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientName: app.patient, doctorName: app.doctor })
    }).then(() => {
      setAppointments(appointments.map(a => a.id === app.id ? { ...a, status: 'approved' } : a));
    });
  };

  const verifyDoctor = (id) => {
    setDoctors(doctors.map(d => d.id === id ? { ...d, status: 'verified' } : d));
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div style={{ padding: '0 32px 32px 32px', textAlign: 'center' }}>
          <Shield color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue title-display" style={{ fontSize: '1.8rem', margin: 0 }}>Admin</h2>
          <div className="flex-center" style={{ gap: '6px', fontSize: '0.8rem', color: 'var(--accent-green)', marginTop: '8px' }}>
            <ShieldCheck size={14} /> System Secure
          </div>
        </div>
        <nav style={{ flex: 1 }}>
          <a className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}><BarChart size={20} /> Dashboard</a>
          <a className={`nav-item ${activeTab === 'manage-doctors' ? 'active' : ''}`} onClick={() => setActiveTab('manage-doctors')}><Users size={20} /> Manage Doctors</a>
          <a className="nav-item"><Database size={20} /> Health Records</a>
        </nav>
        <div style={{ padding: '0 32px', marginTop: 'auto' }}>
          <a className="nav-item text-red" onClick={() => navigate('/login')}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>{activeTab === 'dashboard' ? 'Command Centre' : 'Manage Medical Staff'}</h1>
            <p>{activeTab === 'dashboard' ? 'Observing real-time clinical activity.' : 'Verify credentials and manage active doctors.'}</p>
          </div>
          <div className="flex-center" style={{ gap: '16px' }}>
            <div className="status-indicator">
              <span className="dot" style={{ background: 'var(--accent-green)' }}></span> System Live
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
          <>
            <div className="metrics-grid">
              <div className="glass-panel"><h3 className="label-secondary">Total Patients</h3><div className="stat-value">1.2k</div></div>
              <div className="glass-panel"><h3 className="label-secondary">Verified Doctors</h3><div className="stat-value">{doctors.filter(d => d.status === 'verified').length}</div></div>
              <div className="glass-panel"><h3 className="label-secondary">Pending Approvals</h3><div className="stat-value text-red">{doctors.filter(d => d.status === 'pending').length}</div></div>
            </div>

            <div className="dashboard-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
              <section className="glass-panel">
                <h3 className="flex-center" style={{ gap: '10px', justifyContent: 'flex-start' }}><Activity size={20} color="var(--primary)" /> Patient Traffic</h3>
                <div style={{ height: '250px', marginTop: '20px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis dataKey="name" stroke="var(--text-secondary)" />
                      <YAxis stroke="var(--text-secondary)" />
                      <Tooltip contentStyle={{ background: 'var(--bg-color-secondary)', border: '1px solid var(--card-border)' }} />
                      <Bar dataKey="visits" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </section>

              <section className="glass-panel" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <h3 className="flex-center" style={{ gap: '10px', justifyContent: 'flex-start' }}><Terminal size={20} /> System Logs</h3>
                <div className="log-list" style={{ marginTop: '16px', fontSize: '0.85rem' }}>
                  {systemLogs.map(log => (
                    <div key={log.id} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: log.status === 'critical' ? 'var(--accent-red)' : 'var(--accent-green)' }}>[{log.time}]</span> {log.event}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        ) : (
          <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {/* Doctor Credential Verification Segment */}
            <section className="glass-panel">
              <h2 className="flex-center" style={{ gap: '12px', justifyContent: 'flex-start' }}><FileCheck size={28} color="var(--accent-green)" /> Credential Verification</h2>
              <p className="text-secondary" style={{ marginBottom: '24px' }}>Validate government MBBS certificates for new doctor registrations.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {doctors.filter(d => d.status === 'pending').map(doc => (
                  <div key={doc.id} className="glass-panel-inner animate-fade-in" style={{ padding: '20px' }}>
                    <div className="flex-between">
                      <div>
                        <h3 style={{ margin: 0 }}>{doc.name}</h3>
                        <p style={{ color: 'var(--primary)', fontSize: '0.9rem', margin: '4px 0' }}>{doc.specialty}</p>
                      </div>
                      <span className="badge badge-blue">Reg: {doc.regNo}</span>
                    </div>
                    
                    <div className="verification-details" style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                      <div className="flex-between">
                        <span style={{ fontSize: '0.85rem' }}><Award size={14} style={{ display: 'inline', marginRight: '4px' }} /> MBBS Certificate.pdf</span>
                        <button className="btn-small" style={{ fontSize: '0.75rem' }}><Eye size={12} /> View</button>
                      </div>
                    </div>

                    <div className="flex-center" style={{ gap: '12px', marginTop: '20px' }}>
                      <button className="btn btn-primary-full" style={{ flex: 1 }} onClick={() => verifyDoctor(doc.id)}>Approve Credentials</button>
                      <button className="btn btn-danger" style={{ padding: '12px' }}><X size={20} /></button>
                    </div>
                  </div>
                ))}
                {doctors.filter(d => d.status === 'pending').length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>
                    <CheckCircle size={48} style={{ margin: '0 auto 16px' }} />
                    <p>All credentials verified.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Appointment Management Segment */}
            <section className="glass-panel">
              <h2 className="flex-center" style={{ gap: '12px', justifyContent: 'flex-start' }}><Calendar size={28} color="var(--primary)" /> Appointment Manager</h2>
              <p className="text-secondary" style={{ marginBottom: '24px' }}>Monitor and finalize patient bookings after payment clearance.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {appointments.map(app => (
                  <div key={app.id} className="glass-panel-inner" style={{ padding: '16px', borderLeft: app.status === 'approved' ? '4px solid var(--accent-green)' : '4px solid #F59E0B' }}>
                    <div className="flex-between">
                      <div>
                        <h4 style={{ margin: 0 }}>{app.patient}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Consulting: {app.doctor}</p>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{app.time}</span>
                    </div>
                    
                    <div className="flex-between" style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <span className={`badge ${app.paid ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.7rem' }}>
                        {app.paid ? 'Payment Verified' : 'Payment Pending'}
                      </span>
                      {app.status === 'approved' ? (
                        <div className="flex-center" style={{ gap: '4px', color: 'var(--accent-green)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                          <CheckCircle size={16} /> Finalized
                        </div>
                      ) : (
                        <button className="btn btn-small" onClick={() => approveAppointment(app)}>Confirm Visit</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
