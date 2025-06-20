import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    weight: '',
    height: '',
    fitnessGoals: [] as string[],
    mentalHealthGoals: [] as string[],
  });

  const { setUser, setIsOnboarded } = useApp();

  const steps = [
    'Personal Info',
    'Physical Details',
    'Fitness Goals',
    'Mental Wellness Goals',
    'Complete Setup',
  ];

  const fitnessGoalOptions = [
    'Lose Weight',
    'Build Muscle',
    'Improve Endurance',
    'Increase Flexibility',
    'General Fitness',
    'Sports Performance',
  ];

  const mentalHealthGoalOptions = [
    'Stress Management',
    'Anxiety Relief',
    'Better Sleep',
    'Mood Improvement',
    'Self-Confidence',
    'Mindfulness',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal: string, type: 'fitness' | 'mental') => {
    const field = type === 'fitness' ? 'fitnessGoals' : 'mentalHealthGoals';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(goal)
        ? prev[field].filter(g => g !== goal)
        : [...prev[field], goal]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      fitnessGoals: formData.fitnessGoals,
      mentalHealthGoals: formData.mentalHealthGoals,
      joinedAt: new Date(),
    };
    
    setUser(newUser);
    setIsOnboarded(true);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.email;
      case 1:
        return formData.age && formData.weight && formData.height;
      case 2:
        return formData.fitnessGoals.length > 0;
      case 3:
        return formData.mentalHealthGoals.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your age"
                min="16"
                max="24"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Height"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">Select your fitness goals (choose multiple):</p>
            <div className="grid grid-cols-2 gap-3">
              {fitnessGoalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal, 'fitness')}
                  className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                    formData.fitnessGoals.includes(goal)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal}</span>
                    {formData.fitnessGoals.includes(goal) && (
                      <CheckCircle size={16} className="text-primary-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <p className="text-gray-600">Select your mental wellness goals (choose multiple):</p>
            <div className="grid grid-cols-2 gap-3">
              {mentalHealthGoalOptions.map((goal) => (
                <button
                  key={goal}
                  onClick={() => handleGoalToggle(goal, 'mental')}
                  className={`p-3 text-left border rounded-lg transition-all duration-200 ${
                    formData.mentalHealthGoals.includes(goal)
                      ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                      : 'border-gray-300 hover:border-secondary-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal}</span>
                    {formData.mentalHealthGoals.includes(goal) && (
                      <CheckCircle size={16} className="text-secondary-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">You're All Set!</h3>
            <p className="text-gray-600">
              Welcome to ZenFit! We've created a personalized plan based on your goals.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h4 className="font-semibold text-gray-900 mb-2">Your Profile Summary:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>Name: {formData.name}</li>
                <li>Age: {formData.age} years</li>
                <li>Fitness Goals: {formData.fitnessGoals.length} selected</li>
                <li>Wellness Goals: {formData.mentalHealthGoals.length} selected</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-primary-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStep]}
          </h2>
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          {currentStep > 0 ? (
            <button
              onClick={handlePrevious}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;