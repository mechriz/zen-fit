import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Award, 
  TrendingUp, 
  Heart,
  Calendar,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import MobileHeader from '../Layout/MobileHeader';

const UserProfile: React.FC = () => {
  const { user, progress, appointments } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const profileTabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'appointments', label: 'Sessions', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const achievements = [
    { title: 'First Workout', description: 'Completed your first workout session', earned: true },
    { title: 'Consistency King', description: '7-day workout streak', earned: true },
    { title: 'Mental Health Advocate', description: 'Booked your first therapy session', earned: true },
    { title: 'Wellness Warrior', description: 'Complete 30 workout sessions', earned: false },
    { title: 'Mindful Month', description: 'Complete 4 therapy sessions in a month', earned: false },
  ];

  const recentSessions = appointments.slice(0, 5);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-primary-100">{user?.email}</p>
            <p className="text-sm text-primary-200 mt-1">
              Member since {user?.joinedAt.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{progress.workouts.totalSessions}</div>
              <div className="text-sm text-gray-600">Workouts</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
              <Heart size={20} className="text-secondary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{progress.mentalHealth.therapySessions}</div>
              <div className="text-sm text-gray-600">Therapy Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Your Goals</h3>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Fitness Goals</h4>
            <div className="flex flex-wrap gap-2">
              {user?.fitnessGoals.map((goal) => (
                <span key={goal} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {goal}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Mental Wellness Goals</h4>
            <div className="flex flex-wrap gap-2">
              {user?.mentalHealthGoals.map((goal) => (
                <span key={goal} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      {/* Workout Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Workout Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Weekly Goal</span>
              <span className="text-sm text-gray-600">
                {progress.workouts.weeklyProgress}/{progress.workouts.weeklyGoal}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: `${(progress.workouts.weeklyProgress / progress.workouts.weeklyGoal) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{progress.workouts.streak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{progress.workouts.totalMinutes}</div>
              <div className="text-sm text-gray-600">Total Minutes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mental Health Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Mental Health Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Current Mood Score</span>
            <span className="text-2xl font-bold text-secondary-600">
              {progress.mentalHealth.moodScore}/10
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{progress.mentalHealth.journalEntries}</div>
              <div className="text-sm text-gray-600">Journal Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{progress.mentalHealth.therapySessions}</div>
              <div className="text-sm text-gray-600">Therapy Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
              achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.earned ? 'bg-green-500' : 'bg-gray-300'
              }`}>
                <Award size={20} className="text-white" />
              </div>
              <div>
                <div className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-700'}`}>
                  {achievement.title}
                </div>
                <div className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                  {achievement.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-4">
      {recentSessions.length > 0 ? (
        recentSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  session.type === 'therapy' ? 'bg-secondary-100' : 'bg-primary-100'
                }`}>
                  {session.type === 'therapy' ? (
                    <Heart size={16} className="text-secondary-600" />
                  ) : (
                    <TrendingUp size={16} className="text-primary-600" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{session.providerName}</div>
                  <div className="text-sm text-gray-500">{session.date} at {session.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  session.status === 'completed' ? 'bg-green-100 text-green-800' :
                  session.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {session.status}
                </div>
                <div className="text-sm text-gray-500 mt-1">KSh {session.price.toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-xl p-8 shadow-sm text-center">
          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions yet</h3>
          <p className="text-gray-500">Book your first session to get started</p>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-4">
      {[
        { icon: Bell, title: 'Notifications', description: 'Manage your notification preferences' },
        { icon: Shield, title: 'Privacy & Security', description: 'Control your privacy settings' },
        { icon: CreditCard, title: 'Payment Methods', description: 'Manage your payment options' },
        { icon: HelpCircle, title: 'Help & Support', description: 'Get help and contact support' },
        { icon: LogOut, title: 'Sign Out', description: 'Sign out of your account' },
      ].map((setting, index) => {
        const Icon = setting.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon size={20} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{setting.title}</div>
                <div className="text-sm text-gray-500">{setting.description}</div>
              </div>
              <div className="text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Profile" />
      
      <div className="pb-20 md:pb-8 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm mb-6 p-2">
            <div className="flex space-x-1">
              {profileTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'progress' && renderProgress()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;