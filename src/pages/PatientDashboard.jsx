import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, LayoutDashboard, Calendar, BrainCircuit, LogOut, TrendingUp, AlertTriangle, 
  Bot, Pill, Camera, Scan, X, CheckCircle, Navigation, Settings, Users, Video, 
  UploadCloud, Clock, Plus, MapPin, CreditCard, MessageSquare, Scale, Info, Apple, FileText, AlertCircle, MessageCircle, Bell, BellOff, Volume2
} from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // BMI States
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [dietPlan, setDietPlan] = useState('');

  // Medicine & Alarm States
  const [medicines, setMedicines] = useState([
    { id: 1, name: 'Lisinopril', time: '08:00', dosage: '10mg', taken: false, alarm: true },
    { id: 2, name: 'Metformin', time: '12:00', dosage: '500mg', taken: true, alarm: false }
  ]);
  const [newMed, setNewMed] = useState({ name: '', time: '', dosage: '' });
  const [activeAlarm, setActiveAlarm] = useState(null);

  // AI Scanner States
  const [showScanner, setShowScanner] = useState(false);
  const [scanStatus, setScanStatus] = useState('idle');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  // Other States
  const [sosStatus, setSosStatus] = useState('idle'); 
  const [sosLocation, setSosLocation] = useState(null);

  // Alarm Checker Effect
  useEffect(() => {
    const checkAlarms = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      const triggerMed = medicines.find(m => m.time === currentTime && m.alarm && !m.taken);
      if (triggerMed && (!activeAlarm || activeAlarm.id !== triggerMed.id)) {
        setActiveAlarm(triggerMed);
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(checkAlarms);
  }, [medicines, activeAlarm]);

  const calculateBMI = () => {
    if (!height || !weight) return;
    const hMeter = height / 100;
    const bmi = (weight / (hMeter * hMeter)).toFixed(1);
    setBmiResult(bmi);
    let category = '';
    let diet = '';
    if (bmi < 18.5) { category = 'UNDERWEIGHT'; diet = 'Increase calorie intake with healthy fats and lean proteins.'; }
    else if (bmi >= 18.5 && bmi < 24.9) { category = 'NORMAL'; diet = 'Maintain balanced nutrition and regular exercise.'; }
    else if (bmi >= 25 && bmi < 29.9) { category = 'OVERWEIGHT'; diet = 'Focus on high-fiber foods and a calorie deficit.'; }
    else { category = 'OBESE'; diet = 'Prioritize whole foods and consult a nutritionist for a plan.'; }
    setBmiCategory(category);
    setDietPlan(diet);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setScanStatus('analyzing');
      setTimeout(() => {
        setScanResult({
          medName: "Amoxicillin",
          dosage: "500mg",
          purpose: "Infection",
          sideEffects: "Nausea",
          doctor: "Dr. Jenkins",
          warning: "Complete the full course."
        });
        setScanStatus('result');
      }, 3000);
    }
  };

  const addMedicine = () => {
    if (!newMed.name || !newMed.time) return;
    setMedicines([...medicines, { ...newMed, id: Date.now(), taken: false, alarm: true }]);
    setNewMed({ name: '', time: '', dosage: '' });
  };

  const toggleAlarm = (id) => {
    setMedicines(medicines.map(m => m.id === id ? { ...m, alarm: !m.alarm } : m));
  };

  const dismissAlarm = () => {
    if (activeAlarm) {
      // Mark as taken or just dismiss
      setActiveAlarm(null);
    }
  };

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
    fetch(`${BACKEND_URL}/api/sos`, { method: 'POST', body: JSON.stringify({ location: {lat,lng} }), headers:{'Content-Type':'application/json'} })
    .then(() => { setTimeout(() => setSosStatus('sent'), 2000); });
  };

  return (
    <div className="app-container patient-portal">
      
      {/* Medicine Alarm Modal */}
      {activeAlarm && (
        <div className="modal-overlay" style={{ zIndex: 10000 }}>
          <div className="glass-panel alarm-modal animate-bounce-subtle" style={{ borderColor: 'var(--primary)', textAlign: 'center' }}>
            <Volume2 size={64} color="var(--primary)" className="animate-pulse" style={{ margin: '0 auto 16px' }} />
            <h1 className="ai-glow">MEDICINE REMINDER!</h1>
            <p style={{ fontSize: '1.2rem', margin: '16px 0' }}>It's time to take <strong>{activeAlarm.name}</strong> ({activeAlarm.dosage})</p>
            <div className="flex-center" style={{ gap: '16px', marginTop: '24px' }}>
              <button className="btn btn-primary-full" onClick={() => { setMedicines(medicines.map(m => m.id === activeAlarm.id ? {...m, taken: true} : m)); setActiveAlarm(null); }}>Mark as Taken</button>
              <button className="btn btn-secondary" onClick={dismissAlarm}>Dismiss</button>
            </div>
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {sosStatus !== 'idle' && (
        <div className="modal-overlay">
          <div className="glass-panel sos-modal">
            {sosStatus === 'triggering' ? <h1 className="text-red">SENDING SOS...</h1> : <h1 className="text-green">HELP IS ON THE WAY</h1>}
          </div>
        </div>
      )}

      {/* AI Rx Scanner Modal */}
      {showScanner && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content-large" style={{ maxWidth: '600px', width: '90%' }}>
            <div className="flex-between">
               <h2 className="ai-glow flex-center" style={{ gap: '10px' }}><Scan size={28} /> AI Rx Scanner</h2>
               <button onClick={() => {setShowScanner(false); setScanStatus('idle');}} className="close-btn"><X size={24} /></button>
            </div>
            {scanStatus === 'idle' && (
              <div className="upload-zone-premium" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud size={48} color="var(--primary)" />
                <h3>Drop Rx here or click to browse</h3>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileUpload} />
              </div>
            )}
            {scanStatus === 'analyzing' && <div className="scanning-container"><div className="scan-line"></div><h3 className="ai-glow animate-pulse">Analyzing...</h3></div>}
            {scanStatus === 'result' && scanResult && (
              <div className="scan-result-details animate-fade-in">
                <h3>{scanResult.medName}</h3>
                <p>{scanResult.purpose}</p>
                <button className="btn btn-primary-full" onClick={() => { setMedicines([...medicines, { id: Date.now(), name: scanResult.medName, time: '09:00', dosage: scanResult.dosage, taken: false, alarm: true }]); setShowScanner(false); setScanStatus('idle'); }}>Add to Reminders</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar mobile-hide">
        <div className="sidebar-header" style={{ textAlign: 'center' }}>
          <Scale color="#06B6D4" size={64} />
          <h2 className="text-gradient-blue">Medicure</h2>
        </div>
        <nav>
          <a className="nav-item active"><LayoutDashboard size={20} /> Dashboard</a>
          <a className="nav-item" onClick={() => setShowScanner(true)}><Scan size={20} /> AI Rx Scanner</a>
          <a className="nav-item" onClick={() => navigate('/patient/nearby-medical')}><MapPin size={20} /> Nearby Medical</a>
          <a className="nav-item" onClick={() => navigate('/patient/help-centre')}><MessageSquare size={20} /> Help Centre</a>
          <a className="nav-item" onClick={() => navigate('/patient/reviews')}><MessageCircle size={20} /> Reviews & Feedback</a>
        </nav>
        <div className="sidebar-footer">
          <a className="nav-item text-red" onClick={() => navigate('/login')}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content mobile-full">
        <header className="dashboard-header">
          <div><h1>Wellness Dashboard</h1><p>Verified medical care at your fingertips.</p></div>
          <button className="btn btn-danger" onClick={handleSOS}>SOS</button>
        </header>

        <div className="dashboard-grid">
          {/* BMI Section */}
          <section className="glass-panel">
            <h2>BMI Analysis</h2>
            <div className="input-group-stack">
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm)" />
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg)" />
              <button className="btn btn-primary-full" onClick={calculateBMI}>Analyze Wellness</button>
            </div>
            {bmiResult && <div className="bmi-result-card animate-fade-in"><h3>{bmiCategory}</h3><p>{dietPlan}</p></div>}
          </section>

          {/* Medicine Section with Alarms */}
          <section className="glass-panel">
            <div className="flex-between">
              <h2>Medicine Alarms</h2>
              <button className="btn-small" onClick={() => document.getElementById('add-med-form').scrollIntoView({ behavior: 'smooth' })}><Plus size={14} /> New</button>
            </div>
            <div className="med-list" style={{ marginTop: '16px' }}>
              {medicines.map(m => (
                <div key={m.id} className={`med-item flex-between ${m.taken ? 'opacity-50' : ''}`} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle size={20} color={m.taken ? 'var(--accent-green)' : 'gray'} onClick={() => setMedicines(medicines.map(med => med.id === m.id ? {...med, taken: !med.taken} : med))} style={{ cursor: 'pointer' }} />
                    <div>
                      <strong style={{ display: 'block', textDecoration: m.taken ? 'line-through' : 'none' }}>{m.name}</strong>
                      <span className="text-secondary" style={{ fontSize: '0.8rem' }}><Clock size={12} style={{ display: 'inline', marginRight: '4px' }} /> {m.time}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleAlarm(m.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: m.alarm ? 'var(--primary)' : 'var(--text-secondary)' }}>
                    {m.alarm ? <Bell size={20} className="animate-wiggle" /> : <BellOff size={20} />}
                  </button>
                </div>
              ))}
            </div>
            
            <div id="add-med-form" style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <h3>Add New Alarm</h3>
              <div className="input-group-stack" style={{ marginTop: '12px' }}>
                <input type="text" placeholder="Medicine Name" value={newMed.name} onChange={e => setNewMed({...newMed, name: e.target.value})} />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input type="time" value={newMed.time} onChange={e => setNewMed({...newMed, time: e.target.value})} style={{ flex: 1 }} />
                  <input type="text" placeholder="Dosage" value={newMed.dosage} onChange={e => setNewMed({...newMed, dosage: e.target.value})} style={{ flex: 1 }} />
                </div>
                <button className="btn btn-secondary-full" onClick={addMedicine}>Set Alarm</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
