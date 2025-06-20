import React, { useState } from 'react';
import { Play, Clock, Star, Filter, Search } from 'lucide-react';
import MobileHeader from '../Layout/MobileHeader';

interface WorkoutPlan {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  thumbnail: string;
  rating: number;
  completions: number;
}

const WorkoutModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Flexibility'];

  const workoutPlans: WorkoutPlan[] = [
    {
      id: '1',
      title: 'Morning Energy Boost',
      description: 'Start your day with this energizing full-body workout',
      duration: 20,
      difficulty: 'Beginner',
      category: 'Cardio',
      thumbnail: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      completions: 1247
    },
    {
      id: '2',
      title: 'Strength Building Basics',
      description: 'Build foundational strength with bodyweight exercises',
      duration: 30,
      difficulty: 'Intermediate',
      category: 'Strength',
      thumbnail: 'https://images.pexels.com/photos/1552108/pexels-photo-1552108.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      completions: 892
    },
    {
      id: '3',
      title: 'Mindful Yoga Flow',
      description: 'Gentle yoga sequence for flexibility and mindfulness',
      duration: 25,
      difficulty: 'Beginner',
      category: 'Yoga',
      thumbnail: 'https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      completions: 2156
    },
    {
      id: '4',
      title: 'High-Intensity Fat Burn',
      description: 'Intense HIIT session for maximum calorie burn',
      duration: 15,
      difficulty: 'Advanced',
      category: 'HIIT',
      thumbnail: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.6,
      completions: 756
    },
    {
      id: '5',
      title: 'Evening Stretch & Relax',
      description: 'Wind down with gentle stretches and relaxation',
      duration: 15,
      difficulty: 'Beginner',
      category: 'Flexibility',
      thumbnail: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      completions: 1834
    },
    {
      id: '6',
      title: 'Core Power Training',
      description: 'Strengthen your core with targeted exercises',
      duration: 20,
      difficulty: 'Intermediate',
      category: 'Strength',
      thumbnail: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.5,
      completions: 634
    }
  ];

  const filteredWorkouts = workoutPlans.filter(workout => {
    const matchesCategory = selectedCategory === 'All' || workout.category === selectedCategory;
    const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Workouts" showSearch />
      
      <div className="pb-20 md:pb-8 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-6 text-white mb-8">
            <h1 className="text-2xl font-bold mb-2">Your Fitness Journey</h1>
            <p className="text-primary-100 mb-4">
              Personalized workouts designed for your goals
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>15-45 min sessions</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-1" />
                <span>Expert-designed</span>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workouts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-400" />
                <span className="text-sm text-gray-600">Filter:</span>
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Workout Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <div key={workout.id} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={workout.thumbnail}
                    alt={workout.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/50 rounded-full p-2">
                      <Clock size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <Play size={20} className="text-primary-600 ml-1" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{workout.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{workout.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{workout.duration} min</span>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 mr-1" />
                        <span>{workout.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">
                      {workout.completions.toLocaleString()} completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No workouts found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutModule;