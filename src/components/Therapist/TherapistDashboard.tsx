import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  MessageSquare,
  Video,
  Phone,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText
} from 'lucide-react';
import { useTherapist } from '../../context/TherapistContext';

const TherapistDashboard: React.FC = () => {
  const { auth, appointments, clients } = useTherapist();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const todayAppointments = appointments.filter(apt => apt.date === selectedDate);
  const upcomingAppointments = appointments.filter(apt => 
    apt.status === 'scheduled' && new Date(apt.date) >= new Date()
  );

  const stats = [
    {
      label: 'Total Clients',
      value: clients.length,
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      change: '+2 this month'
    },
    {
      label: 'Today\'s Sessions',
      value: todayAppointments.length,
      icon: Calendar,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      change: `${todayAppointments.filter(a => a.status === 'completed').length} completed`
    },
    {
      label: 'This Month',
      value: appointments.filter(a => a.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: 'KSh 45,000 earned'
    },
    {
      label: 'Avg Rating',
      value: auth.therapist?.rating || 0,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: `${auth.therapist?.reviewCount} reviews`
    }
  ];

  const getSessionIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'phone': return Phone;
      case 'chat': return MessageSquare;
      default: return Video;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {auth.therapist?.name}
            </h1>
            <p className="text-gray-600">Here's what's happening with your practice today</p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{stat.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Schedule for {new Date(selectedDate).toLocaleDateString()}
                </h2>
                <span className="text-sm text-gray-500">
                  {todayAppointments.length} sessions
                </span>
              </div>
            </div>
            <div className="p-6">
              {todayAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => {
                    const SessionIcon = getSessionIcon(appointment.sessionType);
                    return (
                      <div key={appointment.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                            <SessionIcon size={16} className="text-secondary-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">{appointment.clientName}</h3>
                              <p className="text-sm text-gray-500">
                                {appointment.time} • {appointment.duration} min • {appointment.sessionType}
                              </p>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                {appointment.status}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                KSh {appointment.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions scheduled</h3>
                  <p className="text-gray-500">Enjoy your free day!</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Recent Clients */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Calendar size={20} className="text-primary-600" />
                  <span className="font-medium text-gray-900">View Full Schedule</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users size={20} className="text-secondary-600" />
                  <span className="font-medium text-gray-900">Manage Clients</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText size={20} className="text-green-600" />
                  <span className="font-medium text-gray-900">Session Notes</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <DollarSign size={20} className="text-yellow-600" />
                  <span className="font-medium text-gray-900">Payment History</span>
                </button>
              </div>
            </div>

            {/* Recent Clients */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Clients</h3>
              <div className="space-y-3">
                {clients.slice(0, 3).map((client) => (
                  <div key={client.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <img
                      src={client.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500">
                        {client.totalSessions} sessions • Last: {client.lastSessionDate?.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        Mood: {client.currentMoodScore}/10
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;