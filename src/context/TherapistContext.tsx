import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Therapist, Appointment, Client, SessionNote, TherapistAuth } from '../types';

interface TherapistContextType {
  auth: TherapistAuth;
  setAuth: (auth: TherapistAuth) => void;
  clients: Client[];
  setClients: (clients: Client[]) => void;
  appointments: Appointment[];
  setAppointments: (appointments: Appointment[]) => void;
  sessionNotes: SessionNote[];
  setSessionNotes: (notes: SessionNote[]) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const TherapistContext = createContext<TherapistContextType | undefined>(undefined);

export const useTherapist = () => {
  const context = useContext(TherapistContext);
  if (context === undefined) {
    throw new Error('useTherapist must be used within a TherapistProvider');
  }
  return context;
};

interface TherapistProviderProps {
  children: ReactNode;
}

export const TherapistProvider: React.FC<TherapistProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<TherapistAuth>({
    isAuthenticated: false,
    therapist: null,
  });

  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      age: 20,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      mentalHealthGoals: ['Anxiety Relief', 'Stress Management'],
      joinedAt: new Date('2024-01-15'),
      lastSessionDate: new Date('2024-12-20'),
      totalSessions: 8,
      currentMoodScore: 7,
      emergencyContact: {
        name: 'Maria Johnson',
        phone: '+254712345678',
        relationship: 'Mother'
      }
    },
    {
      id: '2',
      name: 'Sam Wilson',
      email: 'sam.wilson@email.com',
      age: 22,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
      mentalHealthGoals: ['Self-Confidence', 'Better Sleep'],
      joinedAt: new Date('2024-02-10'),
      lastSessionDate: new Date('2024-12-18'),
      totalSessions: 5,
      currentMoodScore: 6,
      emergencyContact: {
        name: 'John Wilson',
        phone: '+254723456789',
        relationship: 'Father'
      }
    },
    {
      id: '3',
      name: 'Maya Patel',
      email: 'maya.patel@email.com',
      age: 19,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      mentalHealthGoals: ['Mood Improvement', 'Mindfulness'],
      joinedAt: new Date('2024-03-05'),
      lastSessionDate: new Date('2024-12-15'),
      totalSessions: 12,
      currentMoodScore: 8,
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      type: 'therapy',
      providerId: '1',
      providerName: 'Dr. Sarah Johnson',
      clientId: '1',
      clientName: 'Alex Johnson',
      date: '2024-12-23',
      time: '10:00 AM',
      duration: 50,
      status: 'scheduled',
      price: 2000,
      sessionType: 'video',
      paymentStatus: 'paid',
      notes: 'Follow-up on anxiety management techniques'
    },
    {
      id: '2',
      type: 'therapy',
      providerId: '1',
      providerName: 'Dr. Sarah Johnson',
      clientId: '2',
      clientName: 'Sam Wilson',
      date: '2024-12-23',
      time: '2:00 PM',
      duration: 50,
      status: 'scheduled',
      price: 2000,
      sessionType: 'video',
      paymentStatus: 'paid'
    },
    {
      id: '3',
      type: 'therapy',
      providerId: '1',
      providerName: 'Dr. Sarah Johnson',
      clientId: '3',
      clientName: 'Maya Patel',
      date: '2024-12-24',
      time: '11:00 AM',
      duration: 50,
      status: 'scheduled',
      price: 2000,
      sessionType: 'phone',
      paymentStatus: 'paid'
    },
    {
      id: '4',
      type: 'therapy',
      providerId: '1',
      providerName: 'Dr. Sarah Johnson',
      clientId: '1',
      clientName: 'Alex Johnson',
      date: '2024-12-20',
      time: '10:00 AM',
      duration: 50,
      status: 'completed',
      price: 2000,
      sessionType: 'video',
      paymentStatus: 'paid',
      notes: 'Great progress on breathing exercises'
    }
  ]);

  const [sessionNotes, setSessionNotes] = useState<SessionNote[]>([
    {
      id: '1',
      appointmentId: '4',
      therapistId: '1',
      clientId: '1',
      content: 'Client showed significant improvement in managing anxiety symptoms. Practiced deep breathing exercises and discussed coping strategies for stressful situations.',
      goals: ['Continue breathing exercises', 'Practice mindfulness daily'],
      nextSteps: ['Homework: 10-minute daily meditation', 'Journal anxiety triggers'],
      createdAt: new Date('2024-12-20'),
      updatedAt: new Date('2024-12-20')
    }
  ]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would call your API
    if (email === 'sarah.johnson@zenfit.co.ke' && password === 'password123') {
      const therapist: Therapist = {
        id: '1',
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@zenfit.co.ke',
        specialization: ['Anxiety', 'Stress Management', 'Depression'],
        bio: 'Licensed therapist with 8+ years helping young adults navigate anxiety and stress.',
        avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
        rating: 4.9,
        reviewCount: 127,
        pricePerSession: 2000,
        availability: [],
        licenseNumber: 'LT-2024-001',
        yearsExperience: 8,
        education: ['PhD Psychology - University of Nairobi', 'MSc Clinical Psychology - Kenyatta University'],
        languages: ['English', 'Swahili'],
        verified: true,
        joinedAt: new Date('2023-01-15')
      };

      setAuth({
        isAuthenticated: true,
        therapist,
        token: 'mock-jwt-token'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      therapist: null,
    });
  };

  return (
    <TherapistContext.Provider
      value={{
        auth,
        setAuth,
        clients,
        setClients,
        appointments,
        setAppointments,
        sessionNotes,
        setSessionNotes,
        login,
        logout,
      }}
    >
      {children}
    </TherapistContext.Provider>
  );
};