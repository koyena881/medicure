import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Users, Shield, Database, BarChart, LogOut, CheckCircle, Lock, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([
    { id: 101, patient: 'Alice Smith', doctor: 'Dr. Sarah Jenkins', time: 'Today 2:00 PM', status: 'pending', paid: true },
    { id: 102, patient: 'John Doe', doctor: 'Dr. Robert Cline', time: 'Tomorrow 10:00 AM', status: 'approved', paid: true }
  ]);

  const approveAppointment = (app) => {
    fetch('http://localhost:5000/api/approve-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientName: app.patient, doctorName: app.doctor })
    }).then(() => {
      setAppointments(appointments.map(a => a.id === app.id ? { ...a, status: 'approved' } : a));
    }).catch(console.error);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div style={{ padding: '0 32px 32px 32px', textAlign: 'center' }}>
          <Shield color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue title-display" style={{ fontSize: '1.8rem', margin: 0 }}>Admin</h2>
        </div>
        <nav style={{ flex: 1 }}>
          <a className="nav-item active"><BarChart size={20} /> Analytics</a>
          <a className="nav-item" onClick={() => alert("Backend API hit: Fetching Staff Data")}><Users size={20} /> Manage Staff</a>
          <a className="nav-item" onClick={() => alert("Backend API hit: Securing Data Layers")}><Lock size={20} /> Security Settings</a>
        </nav>
        <div style={{ padding: '0 32px', marginTop: 'auto' }}>
          <a className="nav-item" onClick={() => navigate('/login')} style={{ color: 'var(--accent-red)', cursor: 'pointer' }}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>Hospital Administrator</h1>
            <p>System is operational. Review pending appointments.</p>
          </div>
        </header>

        <div className="metrics-grid">
          <div className="glass-panel"><h3 style={{ color: 'var(--text-secondary)' }}>Total Patients</h3><div className="stat-value">1,248</div></div>
          <div className="glass-panel"><h3 style={{ color: 'var(--text-secondary)' }}>Active Doctors</h3><div className="stat-value">84</div></div>
        </div>

        <div className="dashboard-grid" style={{ marginTop: '24px', gridTemplateColumns: '1fr' }}>
          <div className="glass-panel">
            <h3><Calendar size={20} style={{marginRight: '8px'}} /> Appointment Approvals</h3>
            <p style={{marginBottom: '16px', color: 'var(--text-secondary)'}}>Observe and approve patient appointments after successful payment.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {appointments.map(app => (
                <div key={app.id} className="flex-between" style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: app.status === 'approved' ? '4px solid var(--accent-green)' : '4px solid #F59E0B' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{app.patient} ➔ {app.doctor}</h4>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{app.time} • Payment: {app.paid ? '✅ Cleared' : 'Pending'}</p>
                  </div>
                  <div>
                    {app.status === 'approved' ? (
                      <span className="badge badge-green"><CheckCircle size={14} style={{marginRight:'4px'}}/> Approved</span>
                    ) : (
                      <button className="btn" onClick={() => approveAppointment(app)}>Approve</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
