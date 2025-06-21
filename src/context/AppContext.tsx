import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Appointment, Progress } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  progress: Progress;
  setProgress: (progress: Progress) => void;
  isOnboarded: boolean;
  setIsOnboarded: (onboarded: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [progress, setProgress] = useState<Progress>({
    workouts: {
      totalSessions: 12,
      totalMinutes: 480,
      streak: 5,
      weeklyGoal: 5,
      weeklyProgress: 3,
    },
    mentalHealth: {
      moodScore: 7,
      journalEntries: 8,
      therapySessions: 3,
    },
  });

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      type: 'therapy',
      providerId: '1',
      providerName: 'Dr. Sarah Johnson',
      clientId: 'user-1',
      clientName: 'Current User',
      date: '2024-12-25',
      time: '10:00 AM',
      duration: 50,
      status: 'scheduled',
      price: 2000,
      sessionType: 'video',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      type: 'therapy',
      providerId: '2',
      providerName: 'Michael Chen',
      clientId: 'user-1',
      clientName: 'Current User',
      date: '2024-12-27',
      time: '2:00 PM',
      duration: 50,
      status: 'scheduled',
      price: 1800,
      sessionType: 'video',
      paymentStatus: 'paid'
    }
  ]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        appointments,
        setAppointments,
        progress,
        setProgress,
        isOnboarded,
        setIsOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};