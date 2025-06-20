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
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [progress, setProgress] = useState<Progress>({
    workouts: {
      totalSessions: 0,
      totalMinutes: 0,
      streak: 0,
      weeklyGoal: 5,
      weeklyProgress: 0,
    },
    mentalHealth: {
      moodScore: 7,
      journalEntries: 0,
      therapySessions: 0,
    },
  });

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