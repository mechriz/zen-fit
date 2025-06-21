import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Layout/Navigation';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import DashboardHome from './components/Dashboard/DashboardHome';
import WorkoutModule from './components/Workouts/WorkoutModule';
import WellnessModule from './components/Wellness/WellnessModule';
import AppointmentScheduler from './components/Appointments/AppointmentScheduler';
import UserProfile from './components/Profile/UserProfile';
import TherapistApp from './components/Therapist/TherapistApp';

const AppContent: React.FC = () => {
  const { isOnboarded } = useApp();

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Navigation />
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/workouts" element={<WorkoutModule />} />
        <Route path="/wellness" element={<WellnessModule />} />
        <Route path="/appointments" element={<AppointmentScheduler />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Therapist Portal Routes */}
          <Route path="/therapist/*" element={<TherapistApp />} />
          
          {/* Main App Routes */}
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;