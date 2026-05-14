import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck, Stethoscope, User } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('patient');

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'patient') navigate('/patient');
    if (role === 'doctor') navigate('/doctor');
    if (role === 'admin') navigate('/admin');
  };

  return (
    <div className="app-container flex-center" style={{ flexDirection: 'column' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <h1 className="text-gradient-blue title-display flex-center" style={{ gap: '12px', fontSize: '2rem' }}>
          <Activity color="#06B6D4" size={40} />
          VitalSync AI
        </h1>
        <p style={{ marginBottom: '32px' }}>Secure Healthcare Authentication</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
            <button type="button" className={`badge ${role === 'patient' ? 'badge-blue' : ''}`} onClick={() => setRole('patient')} style={{ padding: '8px 16px', cursor: 'pointer', background: role !== 'patient' ? 'transparent' : '', border: role !== 'patient' ? '1px solid var(--card-border)' : '' }}>
              <User size={16} /> Patient
            </button>
            <button type="button" className={`badge ${role === 'doctor' ? 'badge-blue' : ''}`} onClick={() => setRole('doctor')} style={{ padding: '8px 16px', cursor: 'pointer', background: role !== 'doctor' ? 'transparent' : '', border: role !== 'doctor' ? '1px solid var(--card-border)' : '' }}>
              <Stethoscope size={16} /> Doctor
            </button>
            <button type="button" className={`badge ${role === 'admin' ? 'badge-blue' : ''}`} onClick={() => setRole('admin')} style={{ padding: '8px 16px', cursor: 'pointer', background: role !== 'admin' ? 'transparent' : '', border: role !== 'admin' ? '1px solid var(--card-border)' : '' }}>
              <ShieldCheck size={16} /> Admin
            </button>
          </div>
          
          <input type="email" placeholder="Email Address" required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }} defaultValue="test@vitalsync.ai" />
          <input type="password" placeholder="Password" required style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', color: 'white' }} defaultValue="password123" />
          
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '16px' }}>
            Login to {role.charAt(0).toUpperCase() + role.slice(1)} Portal
          </button>
        </form>
      </div>
    </div>
  );
}
