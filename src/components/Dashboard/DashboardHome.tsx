import React from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Heart,
  Play,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import MobileHeader from '../Layout/MobileHeader';

const DashboardHome: React.FC = () => {
  const { user, progress, appointments } = useApp();

  const upcomingAppointments = appointments
    .filter(app => app.status === 'scheduled')
    .slice(0, 2);

  const quickStats = [
    {
      label: 'Workout Streak',
      value: progress.workouts.streak,
      unit: 'days',
      icon: Target,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      label: 'Total Sessions',
      value: progress.workouts.totalSessions,
      unit: 'workouts',
      icon: Play,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
    },
    {
      label: 'Mood Score',
      value: progress.mentalHealth.moodScore,
      unit: '/10',
      icon: Heart,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
    },
    {
      label: 'This Week',
      value: progress.workouts.weeklyProgress,
      unit: `/${progress.workouts.weeklyGoal}`,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Dashboard" />
      
      <div className="pb-20 md:pb-8 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-primary-100">
                  Ready to continue your wellness journey?
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <TrendingUp size={32} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon size={20} className={stat.color} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}<span className="text-sm text-gray-500">{stat.unit}</span>
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Weekly Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Progress</h3>
              <span className="text-sm text-gray-500">
                {progress.workouts.weeklyProgress}/{progress.workouts.weeklyGoal} goals
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(progress.workouts.weeklyProgress / progress.workouts.weeklyGoal) * 100}%` 
                }}
              />
            </div>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs ${
                    index < progress.workouts.weeklyProgress 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < progress.workouts.weeklyProgress ? '✓' : ''}
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
                <Calendar size={20} className="text-gray-400" />
              </div>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        appointment.type === 'therapy' ? 'bg-secondary-100' : 'bg-primary-100'
                      }`}>
                        {appointment.type === 'therapy' ? (
                          <Heart size={16} className="text-secondary-600" />
                        ) : (
                          <Users size={16} className="text-primary-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{appointment.providerName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {appointment.date} at {appointment.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No upcoming appointments</p>
                  <p className="text-sm">Book your next session to continue your journey</p>
                </div>
              )}
            </div>

            {/* Achievement Highlight */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Achievement</h3>
                <Award size={20} className="text-yellow-500" />
              </div>
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Consistency Champion!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  You've maintained a {progress.workouts.streak}-day workout streak. Keep it up!
                </p>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-yellow-800">Next Goal</div>
                  <div className="text-xs text-yellow-600">Reach a 10-day streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;