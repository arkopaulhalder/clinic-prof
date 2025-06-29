import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import DoctorDashboard from './components/Doctor/DoctorDashboard';
import MySchedule from './components/Doctor/MySchedule';
import PatientHistory from './components/Doctor/PatientHistory';
import AvailabilityManagement from './components/Doctor/AvailabilityManagement';
import DoctorProfile from './components/Doctor/DoctorProfile';
import HomePage from './components/HomePage';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route path="/doctor/*" element={<Layout />}>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="schedule" element={<MySchedule />} />
        <Route path="patients" element={<PatientHistory />} />
        <Route path="availability" element={<AvailabilityManagement />} />
        <Route path="profile" element={<DoctorProfile />} />
      </Route>

      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;