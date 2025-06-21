import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TherapistProvider, useTherapist } from '../../context/TherapistContext';
import TherapistLogin from './TherapistLogin';
import TherapistLayout from './TherapistLayout';
import TherapistDashboard from './TherapistDashboard';
import ClientManagement from './ClientManagement';

const TherapistAppContent: React.FC = () => {
  const { auth } = useTherapist();

  if (!auth.isAuthenticated) {
    return <TherapistLogin />;
  }

  return (
    <TherapistLayout>
      <Routes>
        <Route path="/" element={<TherapistDashboard />} />
        <Route path="/clients" element={<ClientManagement />} />
        <Route path="/schedule" element={<div className="p-6"><h1 className="text-2xl font-bold">Schedule Management</h1><p className="text-gray-600">Coming soon...</p></div>} />
        <Route path="/notes" element={<div className="p-6"><h1 className="text-2xl font-bold">Session Notes</h1><p className="text-gray-600">Coming soon...</p></div>} />
        <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600">Coming soon...</p></div>} />
      </Routes>
    </TherapistLayout>
  );
};

const TherapistApp: React.FC = () => {
  return (
    <TherapistProvider>
      <TherapistAppContent />
    </TherapistProvider>
  );
};

export default TherapistApp;