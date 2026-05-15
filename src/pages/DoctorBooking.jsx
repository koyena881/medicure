import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, User, ShieldCheck, Star, Search, Filter, 
  ArrowLeft, CheckCircle2, ChevronRight, Stethoscope, HeartPulse, 
  Award, MapPin, Phone, Info
} from 'lucide-react';

export default function DoctorBooking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Doctor, 2: Select Slot, 3: Success
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const doctors = [
    { 
      id: 1, 
      name: 'Dr. Sarah Jenkins', 
      specialty: 'Cardiology', 
      experience: '12 Years', 
      rating: 4.9, 
      reviews: 128, 
      image: '/doc_1.png',
      availability: ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'],
      education: 'MD - Cardiology, MBBS',
      location: 'Medicure Central, NY'
    },
    { 
      id: 2, 
      name: 'Dr. Robert Cline', 
      specialty: 'Neurology', 
      experience: '15 Years', 
      rating: 4.8, 
      reviews: 94, 
      image: '/doc_2.png',
      availability: ['10:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
      education: 'PhD - Neurology, MBBS',
      location: 'West Medical Hub'
    },
    { 
      id: 3, 
      name: 'Dr. Michael Chen', 
      specialty: 'Pediatrics', 
      experience: '8 Years', 
      rating: 4.9, 
      reviews: 210, 
      image: '/doc_3.png',
      availability: ['08:30 AM', '11:30 AM', '01:30 PM'],
      education: 'MD - Pediatrics, MBBS',
      location: 'Children\'s Health Centre'
    },
    { 
      id: 4, 
      name: 'Dr. Emily Watson', 
      specialty: 'Dermatology', 
      experience: '10 Years', 
      rating: 4.7, 
      reviews: 86, 
      image: '/doc_4.png',
      availability: ['12:00 PM', '02:30 PM', '04:00 PM'],
      education: 'MD - Dermatology, MBBS',
      location: 'Skin Care Clinic'
    }
  ];

  const categories = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Dermatology'];

  const filteredDoctors = doctors.filter(doc => 
    (filterCategory === 'All' || doc.specialty === filterCategory) &&
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookSlot = () => {
    if (!selectedDate || !selectedSlot) return;
    setStep(3);
    // In a real app, we'd send this to the server
    console.log(`Booking confirmed for ${selectedDoctor.name} on ${selectedDate} at ${selectedSlot}`);
  };

  return (
    <div className="app-container">
      <main className="main-content" style={{ marginLeft: 0, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Header */}
        <div className="flex-between" style={{ marginBottom: '40px' }}>
          <div>
            <button onClick={() => step > 1 ? setStep(step - 1) : navigate('/patient')} className="btn-icon" style={{ marginBottom: '16px' }}>
              <ArrowLeft size={20} />
            </button>
            <h1 className="title-display text-gradient-blue" style={{ fontSize: '2.5rem' }}>
              {step === 1 ? 'Book Your Specialist' : step === 2 ? 'Schedule Appointment' : 'Booking Confirmed'}
            </h1>
            <p className="text-secondary">
              {step === 1 ? 'Find the best medical experts for your health needs.' : step === 2 ? `Confirming visit with ${selectedDoctor.name}` : 'Your visit has been scheduled successfully.'}
            </p>
          </div>
          <div className="step-indicator">
            <span className={`dot ${step >= 1 ? 'active' : ''}`}></span>
            <span className={`dot ${step >= 2 ? 'active' : ''}`}></span>
            <span className={`dot ${step >= 3 ? 'active' : ''}`}></span>
          </div>
        </div>

        {step === 1 && (
          <div className="booking-step-1 animate-fade-in">
            {/* Search & Filter Bar */}
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '32px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="search-input-wrap" style={{ flex: 1, minWidth: '250px' }}>
                <Search size={18} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search doctor by name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="premium-input"
                />
              </div>
              <div className="filter-group" style={{ display: 'flex', gap: '8px' }}>
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    className={`filter-chip ${filterCategory === cat ? 'active' : ''}`}
                    onClick={() => setFilterCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="doctors-grid">
              {filteredDoctors.map(doc => (
                <div key={doc.id} className="glass-panel doctor-card animate-scale-up" onClick={() => { setSelectedDoctor(doc); setStep(2); }}>
                  <div className="doctor-card-header">
                    <div className="doctor-img-wrap">
                      <img src={doc.image} alt={doc.name} style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--primary)' }} />
                      <div className="verified-badge"><ShieldCheck size={14} /></div>
                    </div>
                    <div className="doctor-info-main">
                      <h3 style={{ margin: 0 }}>{doc.name}</h3>
                      <p style={{ color: 'var(--primary)', fontWeight: '600', margin: '4px 0' }}>{doc.specialty}</p>
                      <div className="flex-center" style={{ gap: '4px', fontSize: '0.85rem', color: 'var(--accent-yellow)' }}>
                        <Star size={14} fill="currentColor" /> {doc.rating} <span style={{ color: 'var(--text-secondary)' }}>({doc.reviews} Reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="doctor-card-details">
                    <div className="detail-item"><Award size={16} /> <span>{doc.experience} Exp.</span></div>
                    <div className="detail-item"><MapPin size={16} /> <span>{doc.location}</span></div>
                  </div>

                  <button className="btn btn-primary-full" style={{ marginTop: '20px' }}>
                    View Schedule <ChevronRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && selectedDoctor && (
          <div className="booking-step-2 animate-fade-in dashboard-grid" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
            <div className="doctor-sidebar glass-panel">
              <div style={{ textAlign: 'center' }}>
                <img src={selectedDoctor.image} alt={selectedDoctor.name} style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--primary)', marginBottom: '16px' }} />
                <h2>{selectedDoctor.name}</h2>
                <span className="badge badge-blue">{selectedDoctor.specialty}</span>
              </div>
              <div className="info-list" style={{ marginTop: '32px' }}>
                <div className="info-item">
                  <Info size={18} />
                  <div><strong>Education</strong><p>{selectedDoctor.education}</p></div>
                </div>
                <div className="info-item">
                  <Phone size={18} />
                  <div><strong>Contact</strong><p>+1 (555) 902-3456</p></div>
                </div>
                <div className="info-item">
                  <Clock size={18} />
                  <div><strong>Experience</strong><p>{selectedDoctor.experience} practicing</p></div>
                </div>
              </div>
            </div>

            <div className="slot-selection-panel glass-panel">
              <h3>Select Appointment Slot</h3>
              
              <div style={{ marginTop: '24px' }}>
                <label className="label-secondary">Choose Date</label>
                <input 
                  type="date" 
                  className="premium-input" 
                  style={{ marginTop: '8px' }}
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div style={{ marginTop: '32px' }}>
                <label className="label-secondary">Available Time Slots</label>
                <div className="slots-grid" style={{ marginTop: '12px' }}>
                  {selectedDoctor.availability.map(slot => (
                    <button 
                      key={slot} 
                      className={`slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-summary" style={{ marginTop: '40px', padding: '24px', background: 'rgba(0,245,255,0.05)', borderRadius: '16px', border: '1px dashed var(--primary)' }}>
                <div className="flex-between">
                  <span>Consultation Fee</span>
                  <span style={{ fontWeight: 'bold' }}>$50.00</span>
                </div>
                <div className="flex-between" style={{ marginTop: '12px', fontSize: '1.1rem' }}>
                  <strong>Total Amount</strong>
                  <strong className="ai-glow">$50.00</strong>
                </div>
              </div>

              <button 
                className="btn btn-primary-full" 
                style={{ marginTop: '32px', height: '60px', fontSize: '1.1rem' }}
                disabled={!selectedDate || !selectedSlot}
                onClick={handleBookSlot}
              >
                Confirm Booking & Payment
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step-3 animate-scale-up" style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="success-icon-wrap" style={{ display: 'inline-block', marginBottom: '32px' }}>
              <div className="success-pulse"></div>
              <CheckCircle2 size={120} color="var(--accent-green)" />
            </div>
            <h1 className="ai-glow" style={{ fontSize: '3rem' }}>Appointment Confirmed!</h1>
            <p className="text-secondary" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '20px auto 40px' }}>
              Your consultation with <strong>{selectedDoctor.name}</strong> is scheduled for <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>. 
              Please arrive 10 minutes early.
            </p>
            <div className="flex-center" style={{ gap: '20px' }}>
              <button className="btn btn-primary-full" onClick={() => navigate('/patient')} style={{ width: '200px' }}>Back to Dashboard</button>
              <button className="btn btn-secondary" style={{ width: '200px' }}>Download Receipt</button>
            </div>
          </div>
        )}

      </main>

      <style>{`
        .step-indicator {
          display: flex;
          gap: 12px;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          transition: all 0.3s;
        }
        .dot.active {
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary);
          transform: scale(1.2);
        }
        .search-input-wrap {
          position: relative;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }
        .premium-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          padding: 14px 14px 14px 48px;
          border-radius: 12px;
          color: white;
          outline: none;
          transition: all 0.3s;
        }
        .premium-input:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.1);
        }
        .filter-chip {
          padding: 8px 20px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
        }
        .filter-chip.active {
          background: var(--primary);
          color: #0a0f18;
          border-color: var(--primary);
        }
        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .doctor-card {
          padding: 24px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .doctor-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
          box-shadow: 0 15px 30px rgba(0, 245, 255, 0.2);
        }
        .doctor-card-header {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 20px;
        }
        .doctor-img-wrap {
          position: relative;
        }
        .verified-badge {
          position: absolute;
          bottom: 0;
          right: 0;
          background: var(--accent-green);
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #0a0f18;
        }
        .doctor-card-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .info-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .info-item strong {
          display: block;
          font-size: 0.9rem;
        }
        .info-item p {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-top: 4px;
        }
        .slots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 12px;
        }
        .slot-btn {
          padding: 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--card-border);
          color: white;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 600;
        }
        .slot-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--primary);
        }
        .slot-btn.active {
          background: var(--primary);
          color: #0a0f18;
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(0, 245, 255, 0.4);
        }
        .success-pulse {
          position: absolute;
          width: 120px;
          height: 120px;
          background: var(--accent-green);
          border-radius: 50%;
          opacity: 0.2;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          z-index: -1;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
