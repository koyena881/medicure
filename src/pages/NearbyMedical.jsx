import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, LayoutDashboard, MessageSquare, LogOut, MapPin, 
  Search, Phone, Clock, Navigation, ExternalLink, ArrowLeft, Pill, MessageCircle
} from 'lucide-react';

export default function NearbyMedical() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const pharmacies = [
    { id: 1, name: 'City Central Pharmacy', distance: '0.4 miles', address: '123 Health St, Medical District', open: 'Open 24/7', phone: '+1 555-0101' },
    { id: 2, name: 'Wellness Drug Store', distance: '1.2 miles', address: '456 Wellness Ave, Downtown', open: 'Closes at 10 PM', phone: '+1 555-0102' },
    { id: 3, name: 'Green Life Medicals', distance: '2.5 miles', address: '789 Life Rd, North Side', open: 'Open 24/7', phone: '+1 555-0103' },
    { id: 4, name: 'Family Care Pharmacy', distance: '3.1 miles', address: '101 Care Lane, Suburban Area', open: 'Closes at 8 PM', phone: '+1 555-0104' }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar mobile-hide">
        <div className="sidebar-header" style={{ textAlign: 'center' }}>
          <Activity color="#06B6D4" size={64} style={{ marginBottom: '16px' }} />
          <h2 className="text-gradient-blue">Medicure Patient</h2>
        </div>
        <nav>
          <a className="nav-item" onClick={() => navigate('/patient')}><LayoutDashboard size={20} /> Dashboard</a>
          <a className="nav-item active"><MapPin size={20} /> Nearby Medical</a>
          <a className="nav-item" onClick={() => navigate('/patient/help-centre')}><MessageSquare size={20} /> Help Centre</a>
          <a className="nav-item" onClick={() => navigate('/patient/reviews')}><MessageCircle size={20} /> Reviews & Feedback</a>
        </nav>
        <div className="sidebar-footer">
          <a className="nav-item text-red" onClick={() => navigate('/login')}><LogOut size={20} /> Logout</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div className="flex-center" style={{ gap: '16px', justifyContent: 'flex-start' }}>
            <button onClick={() => navigate('/patient')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><ArrowLeft size={24} /></button>
            <h1>Nearby Medical Shops</h1>
          </div>
        </header>

        <div className="dashboard-grid" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
          {/* Map Segment */}
          <section className="glass-panel" style={{ padding: '0', overflow: 'hidden', minHeight: '500px' }}>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid var(--card-border)' }}>
              <div className="flex-center" style={{ gap: '12px' }}>
                <Search size={20} color="var(--text-secondary)" />
                <input 
                  type="text" 
                  placeholder="Search for specific pharmacies or medicines..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', outline: 'none' }}
                />
              </div>
            </div>
            <iframe 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '450px' }} 
              src="https://maps.google.com/maps?q=pharmacy&z=14&output=embed"
              allowFullScreen
            />
          </section>

          {/* List Segment */}
          <section className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 className="flex-center" style={{ gap: '10px', justifyContent: 'flex-start' }}><Pill size={24} color="var(--primary)" /> Top Recommendations</h2>
            <div className="pharmacy-list" style={{ marginTop: '20px', overflowY: 'auto', flex: 1 }}>
              {pharmacies.map(shop => (
                <div key={shop.id} className="glass-panel-inner" style={{ marginBottom: '16px', padding: '16px', borderLeft: '3px solid var(--primary)' }}>
                  <div className="flex-between">
                    <strong>{shop.name}</strong>
                    <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>{shop.distance}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0' }}><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} /> {shop.address}</p>
                  
                  <div className="flex-between" style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '0.8rem', color: shop.open.includes('24/7') ? 'var(--accent-green)' : 'var(--text-secondary)' }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} /> {shop.open}
                    </div>
                    <div className="flex-center" style={{ gap: '12px' }}>
                      <button className="icon-btn-small" title="Call"><Phone size={14} /></button>
                      <button className="icon-btn-small" title="Navigate"><Navigation size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary-full" style={{ marginTop: '20px' }}>View All on Map</button>
          </section>
        </div>
      </main>
    </div>
  );
}
