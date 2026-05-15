import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, LayoutDashboard, MessageSquare, LogOut, Star, 
  Send, User, CheckCircle, ArrowLeft, MessageCircle, ThumbsUp
} from 'lucide-react';

export default function PatientReviews() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [pastReviews] = useState([
    { id: 1, user: 'John D.', stars: 5, comment: 'Dr. Jenkins was very helpful and the BMI analysis is spot on!', date: 'May 10, 2026' },
    { id: 2, user: 'Alice S.', stars: 4, comment: 'The medicine reminders are a life saver.', date: 'May 12, 2026' }
  ]);

  const handleSubmit = () => {
    if (rating === 0 || !review.trim()) return;
    
    // Log to backend
    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sender: 'Patient Feedback', text: `Rating: ${rating} Stars | Review: ${review}` })
    }).then(() => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setRating(0);
      setReview('');
    });
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div style={{ padding: '0 32px 32px 32px', textAlign: 'center' }}>
          <Activity color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue">Medicure</h2>
        </div>
        <nav style={{ flex: 1 }}>
          <a className="nav-item" onClick={() => navigate('/patient')}><LayoutDashboard size={20} /> Dashboard</a>
          <a className="nav-item active"><MessageCircle size={20} /> Reviews & Feedback</a>
        </nav>
        <div style={{ padding: '0 32px', marginTop: 'auto' }}>
          <a className="nav-item text-red" onClick={() => navigate('/login')}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="flex-center" style={{ gap: '16px', justifyContent: 'flex-start' }}>
            <button onClick={() => navigate('/patient')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><ArrowLeft size={24} /></button>
            <h1>Patient Experience</h1>
          </div>
        </header>

        <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Submit Review Section */}
          <section className="glass-panel">
            <h2>Share Your Experience</h2>
            <p className="text-secondary">Your feedback helps us improve our AI and medical services.</p>
            
            <div className="star-rating" style={{ display: 'flex', gap: '8px', margin: '32px 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <Star 
                    size={32} 
                    fill={(hover || rating) >= star ? 'var(--primary)' : 'none'} 
                    color={(hover || rating) >= star ? 'var(--primary)' : 'var(--text-secondary)'} 
                  />
                </button>
              ))}
            </div>

            <div className="input-group-stack">
              <textarea 
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="How was your consultation? Did the AI provide accurate diet advice?"
                style={{ width: '100%', height: '150px', padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'white', resize: 'none' }}
              />
              <button className="btn btn-primary-full" onClick={handleSubmit} disabled={rating === 0}>
                {submitted ? 'Review Submitted!' : 'Submit Feedback'}
              </button>
            </div>
          </section>

          {/* Past Reviews Section */}
          <section className="glass-panel">
            <h2>Community Feedback</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
              {pastReviews.map(r => (
                <div key={r.id} className="glass-panel-inner" style={{ padding: '16px' }}>
                  <div className="flex-between">
                    <div className="flex-center" style={{ gap: '8px' }}>
                      <User size={16} color="var(--primary)" />
                      <strong>{r.user}</strong>
                    </div>
                    <span className="text-secondary" style={{ fontSize: '0.8rem' }}>{r.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '2px', margin: '8px 0' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < r.stars ? 'var(--primary)' : 'none'} color={i < r.stars ? 'var(--primary)' : 'var(--text-secondary)'} />
                    ))}
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>"{r.comment}"</p>
                </div>
              ))}
            </div>
            
            <div className="trust-badge flex-center" style={{ marginTop: '32px', gap: '12px', color: 'var(--accent-green)', padding: '12px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px' }}>
              <ThumbsUp size={20} />
              <span>98% of patients recommend Dr. Jenkins</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
