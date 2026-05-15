import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import HelpCentre from './pages/HelpCentre';
import NearbyMedical from './pages/NearbyMedical';
import PatientReviews from './pages/PatientReviews';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DoctorBooking from './pages/DoctorBooking';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/patient/help-centre" element={<HelpCentre />} />
        <Route path="/patient/nearby-medical" element={<NearbyMedical />} />
        <Route path="/patient/book-doctor" element={<DoctorBooking />} />
        <Route path="/patient/reviews" element={<PatientReviews />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/main-admin" element={<AdminDashboard role="main" />} />
        <Route path="/sub-admin" element={<AdminDashboard role="sub" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
