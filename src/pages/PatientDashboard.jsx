import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, HeartPulse, Droplets, Thermometer, LayoutDashboard, Calendar, 
  BrainCircuit, LogOut, TrendingUp, AlertTriangle, Bot, PhoneCall, Pill, Camera, Scan, X, CheckCircle, Navigation, Settings, Users, Video, UploadCloud, Clock, Plus, MapPin, CreditCard, MessageSquare
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const BACKEND_URL = 'http://localhost:5000';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [heartData, setHeartData] = useState([]);
  const [currentVitals, setCurrentVitals] = useState({ heartRate: 72, bloodPressure: "118/76", oxygenLevel: 98, temperature: 36.6 });
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [sosStatus, setSosStatus] = useState('idle'); 
  const [sosLocation, setSosLocation] = useState(null);
  
  const [showScanner, setShowScanner] = useState(false);
  const [scanStatus, setScanStatus] = useState('idle');
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showNearby, setShowNearby] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMsgs, setChatMsgs] = useState([{sender: 'Doctor', text: 'Hello, how are you feeling today?'}]);
  const [newMsg, setNewMsg] = useState('');
  
  const [showMedicine, setShowMedicine] = useState(false);
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Lisinopril (10mg)', time: '08:00 AM', status: 'taken' },
    { id: 2, name: 'Atorvastatin (20mg)', time: '02:00 PM', status: 'pending' }
  ]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/insights`).then(res => res.json()).then(setInsights).catch(console.error);
    const fetchVitals = () => {
      fetch(`${BACKEND_URL}/api/vitals`).then(res => res.json()).then(data => {
        setHeartData(data.history);
        setCurrentVitals(data.current);
        setLoading(false);
      }).catch(() => setLoading(false));
    };
    fetchVitals();
    const interval = setInterval(fetchVitals, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSOS = () => {
    setSosStatus('triggering');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => finalizeSOS(pos.coords.latitude.toFixed(4), pos.coords.longitude.toFixed(4)),
        () => finalizeSOS("Unknown", "Unknown")
      );
    } else finalizeSOS("Unsupported", "Unsupported");
  };

  const finalizeSOS = (lat, lng) => {
    setSosLocation({ lat, lng });
    fetch(`${BACKEND_URL}/api/sos`, { method: 'POST', body: JSON.stringify({ location: {lat,lng}, contacts: [] }), headers:{'Content-Type':'application/json'} })
    .then(() => {
      setTimeout(() => {
        setSosStatus('sent');
        setTimeout(() => { setSosStatus('idle'); setSosLocation(null); }, 6000);
      }, 2000);
    }).catch(console.error);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setScanStatus('scanning');
      setTimeout(() => setScanStatus('result'), 3500);
    }
  };

  const processPayment = () => {
    fetch(`${BACKEND_URL}/api/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 50.00, cardLast4: '4242' })
    }).then(() => {
      alert("Payment Successful! Appointment booked for Admin Approval.");
      setShowPayment(false);
    }).catch(console.error);
  };

  const sendMsg = () => {
    if(newMsg.trim()) {
      const msg = {sender: 'Patient', text: newMsg};
      setChatMsgs([...chatMsgs, msg]);
      fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg)
      });
      setNewMsg('');
    }
  };

  if (loading) return <div className="app-container flex-center"><h2 className="ai-glow animate-pulse-slow">Loading...</h2></div>;

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      
      {/* SOS Modal */}
      {sosStatus !== 'idle' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ border: '2px solid var(--accent-red)', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
            {sosStatus === 'triggering' ? (
               <><AlertTriangle size={64} color="var(--accent-red)" className="animate-pulse-slow" style={{ margin: '0 auto 16px' }} /><h1 style={{ color: 'var(--accent-red)' }}>TRIGGERING EMERGENCY SOS...</h1></>
            ) : (
               <><CheckCircle size={64} color="var(--accent-green)" style={{ margin: '0 auto 16px' }} /><h1 style={{ color: 'var(--accent-green)' }}>EMERGENCY SENT</h1>
               <div style={{ textAlign: 'left', marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.05)' }}>
                  <p>✅ Hospital and Contacts notified.</p>
                  {sosLocation?.lat !== "Unknown" && <iframe width="100%" height="200" style={{ border: 0, marginTop: '16px' }} src={`https://maps.google.com/maps?q=${sosLocation.lat},${sosLocation.lng}&z=15&output=embed`} />}
               </div></>
            )}
          </div>
        </div>
      )}

      {/* AI Scanner + Diet Chart */}
      {showScanner && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="flex-between">
               <h2 className="ai-glow flex-center" style={{ gap: '8px' }}><Scan size={28} /> AI Rx Scanner</h2>
               <button onClick={() => {setShowScanner(false); setScanStatus('idle');}} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            {scanStatus === 'idle' && (
              <div className="flex-center" style={{ flexDirection: 'column', padding: '60px', border: '2px dashed var(--card-border)', marginTop: '20px', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
                <Camera size={48} color="var(--text-secondary)" /><p>Upload Prescription</p>
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
              </div>
            )}
            {scanStatus === 'scanning' && (
              <div className="flex-center" style={{ flexDirection: 'column', padding: '40px 0' }}>
                <img src={uploadedImage} style={{ width: '200px', height: '200px', objectFit: 'cover', opacity: 0.5, borderRadius: '12px' }} />
                <h3 className="text-gradient-blue" style={{marginTop: '16px'}}>Analyzing...</h3>
              </div>
            )}
            {scanStatus === 'result' && (
              <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '8px' }}>💊 Lisinopril (10mg)</h3>
                <p><strong>Use:</strong> Lowers blood pressure.</p>
                <p><strong>Warnings:</strong> Do not double dose.</p>
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderLeft: '3px solid var(--accent-green)', marginTop: '16px', borderRadius: '4px' }}>
                  <h4 style={{ color: 'var(--accent-green)', marginBottom: '4px' }}>🥗 Recommended Diet Chart</h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                    <li><strong>Reduce:</strong> Salt / Sodium intake (avoid processed foods).</li>
                    <li><strong>Increase:</strong> Potassium (Bananas, Spinach).</li>
                    <li><strong>Hydration:</strong> Drink 8 glasses of water daily.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Appointment & Video Call Modal */}
      {showVideoCall && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ maxWidth: '600px', width: '90%' }}>
            <div className="flex-between">
              <h2><Calendar size={24} /> Book Doctor Appointment</h2>
              <button onClick={() => setShowVideoCall(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={24}/></button>
            </div>
            <div style={{ marginTop: '20px' }}>
              <div style={{ padding: '16px', border: '1px solid var(--primary)', borderRadius: '8px', marginBottom: '12px' }}>
                <h3 style={{ margin: 0 }}>Dr. Sarah Jenkins</h3>
                <p style={{ color: 'var(--accent-green)', marginTop: '4px' }}>Free Today: 2:00 PM - 4:00 PM</p>
                <p style={{ color: 'var(--text-secondary)' }}>Cardiologist • Consultation Fee: $50</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button className="btn" onClick={() => {setShowVideoCall(false); setShowPayment(true);}}><CreditCard size={16}/> Pay & Book</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ maxWidth: '400px', width: '90%' }}>
            <div className="flex-between" style={{marginBottom: '16px'}}>
              <h2><CreditCard size={24} /> Payment Gateway</h2>
              <button onClick={() => setShowPayment(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={24}/></button>
            </div>
            <input type="text" placeholder="Card Number" style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--card-border)', color: 'white' }} />
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--card-border)', color: 'white' }} />
              <input type="text" placeholder="CVC" style={{ flex: 1, padding: '12px', borderRadius: '8px', background: 'transparent', border: '1px solid var(--card-border)', color: 'white' }} />
            </div>
            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={processPayment}>Pay $50.00</button>
          </div>
        </div>
      )}

      {/* Nearby Finder Modal */}
      {showNearby && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ maxWidth: '600px', width: '90%' }}>
            <div className="flex-between">
              <h2><MapPin size={24} /> Nearby Shops & Clinics</h2>
              <button onClick={() => setShowNearby(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={24}/></button>
            </div>
            <iframe width="100%" height="250" style={{ border: 0, borderRadius: '12px', marginTop: '16px' }} src="https://maps.google.com/maps?q=pharmacy&z=13&output=embed" />
            <div style={{ marginTop: '16px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', marginBottom: '8px', borderRadius: '8px' }}>
                <strong>City General Pharmacy</strong> <br/><span style={{fontSize:'0.85rem', color:'var(--text-secondary)'}}>0.5 miles away • Open 24/7</span>
              </div>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <strong>Downtown Medical Clinic</strong> <br/><span style={{fontSize:'0.85rem', color:'var(--text-secondary)'}}>1.2 miles away • Walk-ins welcome</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Box */}
      {showChat && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '350px', background: 'var(--bg-color-secondary)', border: '1px solid var(--primary)', borderRadius: '12px', zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>
          <div style={{ background: 'var(--primary)', color: 'black', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' }}>
            <span><MessageSquare size={16} /> Chat with Dr. Sarah</span>
            <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div style={{ padding: '16px', height: '250px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chatMsgs.map((msg, i) => (
              <div key={i} style={{ alignSelf: msg.sender === 'Patient' ? 'flex-end' : 'flex-start', background: msg.sender === 'Patient' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: msg.sender === 'Patient' ? 'black' : 'white', padding: '8px 12px', borderRadius: '16px' }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', padding: '8px', borderTop: '1px solid var(--card-border)' }}>
            <input type="text" value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} style={{ flex: 1, padding: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }} placeholder="Type a message..." />
            <button onClick={sendMsg} style={{ background: 'var(--primary)', border: 'none', padding: '8px 12px', borderRadius: '4px', marginLeft: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
          </div>
        </div>
      )}

      <aside className="sidebar">
        <div style={{ padding: '0 32px 32px 32px', textAlign: 'center' }}>
          <Activity color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue title-display" style={{ fontSize: '1.8rem', margin: 0 }}>Patient</h2>
        </div>
        <nav style={{ flex: 1 }}>
          <a className="nav-item active"><LayoutDashboard size={20} /> My Health</a>
          <a className="nav-item" onClick={() => setShowScanner(true)}><Scan size={20} /> AI Rx & Diet</a>
          <a className="nav-item" onClick={() => setShowVideoCall(true)}><Calendar size={20} /> Appointments</a>
          <a className="nav-item" onClick={() => setShowNearby(true)}><MapPin size={20} /> Nearby Finder</a>
          <a className="nav-item" onClick={() => setShowChat(true)}><MessageSquare size={20} /> Doctor Chat</a>
        </nav>
        <div style={{ padding: '0 32px', marginTop: 'auto' }}>
          <a className="nav-item" onClick={() => navigate('/login')} style={{ color: 'var(--accent-red)' }}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div><h1>Patient Dashboard</h1><p>Your real-time vitals and AI insights.</p></div>
          <div className="user-profile">
            <button className="btn btn-danger" onClick={handleSOS}><AlertTriangle size={18} /> {sosStatus === 'idle' ? '1-Click SOS' : 'Sending...'}</button>
          </div>
        </header>

        <div className="metrics-grid">
          <div className="glass-panel"><h3 style={{ color: 'var(--text-secondary)' }}>Heart Rate</h3><div className="stat-value">{currentVitals.heartRate} <span className="stat-unit">bpm</span></div></div>
          <div className="glass-panel"><h3 style={{ color: 'var(--text-secondary)' }}>BP</h3><div className="stat-value">{currentVitals.bloodPressure}</div></div>
          <div className="glass-panel"><h3 style={{ color: 'var(--text-secondary)' }}>SpO2</h3><div className="stat-value">{currentVitals.oxygenLevel} <span className="stat-unit">%</span></div></div>
        </div>

        <div className="dashboard-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <div className="glass-panel">
            <h2>Real-time Stream</h2>
            <div className="chart-container" style={{ minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={heartData}>
                  <defs><linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                  <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                  <Area type="monotone" dataKey="value" stroke="var(--secondary)" strokeWidth={3} fillOpacity={1} fill="url(#colorHeart)" animationDuration={300} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
