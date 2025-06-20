export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;
  height: number;
  fitnessGoals: string[];
  mentalHealthGoals: string[];
  avatar?: string;
  joinedAt: Date;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  videoUrl: string;
  thumbnail: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  name: string;
  duration: number;
  reps?: number;
  sets?: number;
  instructions: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialization: string[];
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  availability: TimeSlot[];
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string[];
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  availability: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  type: 'therapy' | 'training';
  providerId: string;
  providerName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
}

export interface Progress {
  workouts: {
    totalSessions: number;
    totalMinutes: number;
    streak: number;
    weeklyGoal: number;
    weeklyProgress: number;
  };
  mentalHealth: {
    moodScore: number;
    journalEntries: number;
    therapySessions: number;
    lastSessionDate?: Date;
  };
}