import React, { useState } from 'react';
import { 
  Heart, 
  Calendar, 
  Star, 
  MapPin, 
  Clock,
  Phone,
  Video,
  MessageCircle,
  Award
} from 'lucide-react';
import MobileHeader from '../Layout/MobileHeader';

interface Therapist {
  id: string;
  name: string;
  specialization: string[];
  bio: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  nextAvailable: string;
  languages: string[];
  verified: boolean;
}

const WellnessModule: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');

  const specializations = ['All', 'Anxiety', 'Depression', 'Stress', 'Relationships', 'Self-Esteem', 'Sleep'];

  const therapists: Therapist[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: ['Anxiety', 'Stress Management'],
      bio: 'Licensed therapist with 8+ years helping young adults navigate anxiety and stress.',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      reviewCount: 127,
      pricePerSession: 2000,
      nextAvailable: 'Today, 3:00 PM',
      languages: ['English', 'Swahili'],
      verified: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      specialization: ['Depression', 'Self-Esteem'],
      bio: 'Specialized in cognitive behavioral therapy for depression and building self-confidence.',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      reviewCount: 89,
      pricePerSession: 1800,
      nextAvailable: 'Tomorrow, 10:00 AM',
      languages: ['English'],
      verified: true
    },
    {
      id: '3',
      name: 'Dr. Amina Hassan',
      specialization: ['Relationships', 'Stress'],
      bio: 'Expert in relationship counseling and stress management for Gen Z.',
      avatar: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      reviewCount: 156,
      pricePerSession: 2200,
      nextAvailable: 'Today, 6:00 PM',
      languages: ['English', 'Swahili', 'Arabic'],
      verified: true
    },
    {
      id: '4',
      name: 'James Mwangi',
      specialization: ['Sleep', 'Anxiety'],
      bio: 'Sleep specialist helping young adults develop healthy sleep patterns and reduce anxiety.',
      avatar: 'https://images.pexels.com/photos/5452224/pexels-photo-5452224.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      reviewCount: 73,
      pricePerSession: 1700,
      nextAvailable: 'Thursday, 2:00 PM',
      languages: ['English', 'Swahili'],
      verified: true
    }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    if (selectedSpecialization === 'All') return true;
    return therapist.specialization.includes(selectedSpecialization);
  });

  const sessionTypes = [
    {
      icon: Video,
      title: 'Video Session',
      description: 'Face-to-face therapy via secure video call',
      duration: '50 minutes',
      popular: true
    },
    {
      icon: Phone,
      title: 'Phone Session',
      description: 'Audio-only therapy session',
      duration: '50 minutes',
      popular: false
    },
    {
      icon: MessageCircle,
      title: 'Chat Session',
      description: 'Text-based therapy session',
      duration: '60 minutes',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Mental Wellness" />
      
      <div className="pb-20 md:pb-8 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Mental Wellness Support</h1>
                <p className="text-secondary-100 mb-4">
                  Connect with licensed therapists who understand Gen Z
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Award size={16} className="mr-1" />
                    <span>Licensed professionals</span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={16} className="mr-1" />
                    <span>Safe & confidential</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Heart size={32} />
                </div>
              </div>
            </div>
          </div>

          {/* Session Types */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {sessionTypes.map((sessionType, index) => {
              const Icon = sessionType.icon;
              return (
                <div key={index} className={`bg-white rounded-xl p-4 shadow-sm relative ${
                  sessionType.popular ? 'border-2 border-secondary-200' : ''
                }`}>
                  {sessionType.popular && (
                    <div className="absolute -top-2 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{sessionType.title}</h3>
                      <p className="text-sm text-gray-500">{sessionType.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{sessionType.description}</p>
                </div>
              );
            })}
          </div>

          {/* Specialization Filter */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Find support for:</h3>
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedSpecialization === spec
                      ? 'bg-secondary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Therapists Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredTherapists.map((therapist) => (
              <div key={therapist.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={therapist.avatar}
                      alt={therapist.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {therapist.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Award size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{therapist.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{therapist.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({therapist.reviewCount})</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        <span>{therapist.languages.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {therapist.specialization.map((spec) => (
                        <span key={spec} className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">KSh {therapist.pricePerSession.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">per session</div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{therapist.bio}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>Next available: {therapist.nextAvailable}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      View Profile
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-secondary-500 to-primary-500 text-white rounded-lg hover:from-secondary-600 hover:to-primary-600 transition-all duration-200 text-sm font-medium">
                      Book Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Resources */}
          <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Crisis Support</h3>
                <p className="text-sm text-red-700 mb-3">
                  If you're experiencing a mental health crisis, please reach out for immediate help.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone size={14} className="text-red-600" />
                    <span className="font-medium text-red-900">Kenya Crisis Helpline: 0800 0300 300</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MessageCircle size={14} className="text-red-600" />
                    <span className="font-medium text-red-900">Text: 22988</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessModule;