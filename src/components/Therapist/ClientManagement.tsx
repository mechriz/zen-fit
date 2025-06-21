import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  Calendar, 
  Phone, 
  Mail,
  Heart,
  TrendingUp,
  FileText,
  AlertTriangle,
  Clock,
  MessageSquare
} from 'lucide-react';
import { useTherapist } from '../../context/TherapistContext';

const ClientManagement: React.FC = () => {
  const { clients, appointments, sessionNotes } = useTherapist();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [filterBy, setFilterBy] = useState('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'recent' && client.lastSessionDate && 
                          new Date(client.lastSessionDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                         (filterBy === 'needs-attention' && client.currentMoodScore < 5);
    
    return matchesSearch && matchesFilter;
  });

  const selectedClientData = selectedClient ? clients.find(c => c.id === selectedClient) : null;
  const clientAppointments = selectedClient ? 
    appointments.filter(a => a.clientId === selectedClient).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ) : [];
  const clientNotes = selectedClient ? 
    sessionNotes.filter(n => n.clientId === selectedClient) : [];

  const getMoodColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    if (score >= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
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
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600">Manage your clients and track their progress</p>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Client List Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          {/* Search and Filter */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative mb-4">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              >
                <option value="all">All Clients</option>
                <option value="recent">Recent Sessions</option>
                <option value="needs-attention">Needs Attention</option>
              </select>
            </div>
          </div>

          {/* Client List */}
          <div className="flex-1 overflow-y-auto">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => setSelectedClient(client.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedClient === client.id ? 'bg-primary-50 border-primary-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={client.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={client.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{client.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(client.currentMoodScore)}`}>
                        {client.currentMoodScore}/10
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{client.email}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <span>{client.totalSessions} sessions</span>
                      <span>Age {client.age}</span>
                      {client.currentMoodScore < 5 && (
                        <AlertTriangle size={12} className="text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Details */}
        <div className="flex-1 flex flex-col">
          {selectedClientData ? (
            <>
              {/* Client Header */}
              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedClientData.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={selectedClientData.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedClientData.name}</h2>
                    <p className="text-gray-600">{selectedClientData.email}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Age {selectedClientData.age}</span>
                      <span>Joined {selectedClientData.joinedAt.toLocaleDateString()}</span>
                      <span>{selectedClientData.totalSessions} total sessions</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-primary-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <MessageSquare size={16} />
                    </button>
                  </div>
                </div>

                {/* Client Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedClientData.currentMoodScore}</div>
                    <div className="text-sm text-gray-600">Current Mood</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedClientData.totalSessions}</div>
                    <div className="text-sm text-gray-600">Total Sessions</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedClientData.lastSessionDate ? 
                        Math.floor((Date.now() - selectedClientData.lastSessionDate.getTime()) / (1000 * 60 * 60 * 24)) : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-600">Days Since Last</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedClientData.mentalHealthGoals.length}</div>
                    <div className="text-sm text-gray-600">Active Goals</div>
                  </div>
                </div>
              </div>

              {/* Tabs Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Goals and Progress */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals & Progress</h3>
                    <div className="space-y-3">
                      {selectedClientData.mentalHealthGoals.map((goal, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Heart size={16} className="text-secondary-600" />
                            <span className="font-medium text-gray-900">{goal}</span>
                          </div>
                          <TrendingUp size={16} className="text-green-600" />
                        </div>
                      ))}
                    </div>

                    {selectedClientData.emergencyContact && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-medium text-red-900 mb-2">Emergency Contact</h4>
                        <div className="text-sm text-red-700">
                          <p>{selectedClientData.emergencyContact.name} ({selectedClientData.emergencyContact.relationship})</p>
                          <p>{selectedClientData.emergencyContact.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recent Sessions */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
                    <div className="space-y-3">
                      {clientAppointments.slice(0, 5).map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">
                              {appointment.date} at {appointment.time}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.duration} min • {appointment.sessionType}
                            </div>
                            {appointment.notes && (
                              <div className="text-sm text-gray-600 mt-1">{appointment.notes}</div>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Session Notes */}
                  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Session Notes</h3>
                      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                        Add Note
                      </button>
                    </div>
                    <div className="space-y-4">
                      {clientNotes.map((note) => (
                        <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <FileText size={16} className="text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">
                                Session Note - {note.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                            <Clock size={14} className="text-gray-400" />
                          </div>
                          <p className="text-gray-700 mb-3">{note.content}</p>
                          
                          {note.goals.length > 0 && (
                            <div className="mb-3">
                              <h5 className="text-sm font-medium text-gray-900 mb-1">Goals:</h5>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {note.goals.map((goal, index) => (
                                  <li key={index}>{goal}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {note.nextSteps.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-gray-900 mb-1">Next Steps:</h5>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {note.nextSteps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <User size={64} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Client</h3>
                <p className="text-gray-500">Choose a client from the list to view their details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;