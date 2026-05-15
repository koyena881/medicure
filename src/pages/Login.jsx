import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, User, Shield, Stethoscope, Lock, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'patient') navigate('/patient');
    else if (role === 'doctor') navigate('/doctor');
    else navigate('/admin');
  };

  return (
    <div className="login-screen">
      {/* Dynamic Background */}
      <div className="login-bg">
        <div className="bg-overlay"></div>
        <div className="bg-gradient"></div>
      </div>

      <div className="login-container animate-fade-in">
        <div className="glass-panel login-card">
          <div className="login-header">
            <div className="logo-glow">
              <HeartPulse size={48} color="var(--primary)" className="animate-pulse" />
            </div>
            <h1 className="text-gradient-blue">Medicure</h1>
            <p className="text-secondary">Next-Generation Healthcare Management</p>
          </div>

          <div className="role-selector">
            <button 
              className={`role-btn ${role === 'patient' ? 'active' : ''}`} 
              onClick={() => setRole('patient')}
            >
              <User size={20} />
              <span>Patient</span>
            </button>
            <button 
              className={`role-btn ${role === 'doctor' ? 'active' : ''}`} 
              onClick={() => setRole('doctor')}
            >
              <Stethoscope size={20} />
              <span>Doctor</span>
            </button>
            <button 
              className={`role-btn ${role === 'admin' ? 'active' : ''}`} 
              onClick={() => setRole('admin')}
            >
              <Shield size={20} />
              <span>Admin</span>
            </button>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-field-wrap">
              <label><Lock size={14} /> Identification</label>
              <input type="text" placeholder={`Enter ${role} ID or Email`} required />
            </div>
            <div className="input-field-wrap" style={{ marginTop: '16px' }}>
              <label><ShieldCheck size={14} /> Security Key</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="login-submit-btn">
              Access Portal <ArrowRight size={18} />
            </button>
          </form>

          <div className="login-footer">
            <p>Verified Government Medical Portal</p>
            <div className="flex-center" style={{ gap: '8px', marginTop: '8px', fontSize: '0.75rem', opacity: 0.6 }}>
              <Activity size={12} /> HIPAA Compliant | 256-bit Encryption
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .login-screen {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #0a0f18;
          font-family: 'Inter', sans-serif;
        }

        .login-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: url('/medical_background_1778783491229.png') no-repeat center center;
          background-size: cover;
          filter: blur(5px) scale(1.1);
          z-index: 0;
        }

        .bg-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(10, 15, 24, 0.6);
          z-index: 1;
        }

        .bg-gradient {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at center, transparent, #0a0f18);
          z-index: 2;
        }

        .login-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 450px;
          padding: 20px;
        }

        .login-card {
          padding: 48px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        }

        .login-header {
          margin-bottom: 32px;
        }

        .logo-glow {
          margin-bottom: 16px;
          display: inline-block;
          filter: drop-shadow(0 0 15px var(--primary));
        }

        .role-selector {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px;
          border-radius: 12px;
          margin-bottom: 32px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .role-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 12px 8px;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .role-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .role-btn.active {
          background: var(--primary);
          color: #0a0f18;
          box-shadow: 0 4px 15px rgba(0, 245, 255, 0.3);
        }

        .login-form {
          text-align: left;
        }

        .login-submit-btn {
          width: 100%;
          margin-top: 32px;
          padding: 16px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border: none;
          border-radius: 12px;
          color: #0a0f18;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
        }

        .login-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 245, 255, 0.4);
        }

        .login-footer {
          margin-top: 32px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </div>
  );
}
