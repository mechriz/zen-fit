import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import MobileHeader from '../Layout/MobileHeader';
import { useApp } from '../../context/AppContext';

const AppointmentScheduler: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { appointments, setAppointments } = useApp();

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const upcomingAppointments = appointments.filter(app => app.status === 'scheduled');

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      const newAppointment = {
        id: Date.now().toString(),
        type: 'therapy' as const,
        providerId: '1',
        providerName: 'Dr. Sarah Johnson',
        date: selectedDate,
        time: selectedTime,
        duration: 50,
        status: 'scheduled' as const,
        price: 2000,
      };
      
      setAppointments([...appointments, newAppointment]);
      setShowConfirmation(true);
    }
  };

  const handlePayment = () => {
    // Simulate M-Pesa payment process
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedDate('');
      setSelectedTime('');
    }, 2000);
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileHeader title="Payment" />
        
        <div className="pb-20 md:pb-8 md:ml-64">
          <div className="p-4 md:p-8">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard size={32} className="text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Payment</h2>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Session with Dr. Sarah Johnson</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Date & Time</span>
                    <span className="font-medium">{selectedDate} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-bold text-lg">KSh 2,000</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="mpesa"
                        checked={paymentMethod === 'mpesa'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-600 rounded mr-3 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                        <span className="font-medium">M-Pesa</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Pay with M-Pesa
                </button>

                <p className="text-xs text-gray-500 mt-4">
                  You'll receive an M-Pesa prompt on your phone to complete the payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader title="Book Appointment" />
      
      <div className="pb-20 md:pb-8 md:ml-64">
        <div className="p-4 md:p-8">
          {/* Upcoming Appointments */}
          {upcomingAppointments.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                        <Calendar size={16} className="text-secondary-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{appointment.providerName}</div>
                        <div className="text-sm text-gray-500">
                          {appointment.date} at {appointment.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">KSh {appointment.price.toLocaleString()}</div>
                      <div className="text-xs text-green-600">Confirmed</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Booking */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Book New Session</h2>
              <p className="text-gray-600">Schedule your next therapy session</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Provider Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Therapist</h3>
                <div className="border border-gray-300 rounded-lg p-4 bg-primary-50 border-primary-300">
                  <div className="flex items-center space-x-3">
                    <img
                      src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Dr. Sarah Johnson"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Dr. Sarah Johnson</div>
                      <div className="text-sm text-gray-600">Anxiety & Stress Management</div>
                      <div className="text-sm text-primary-600 font-medium">KSh 2,000 per session</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Date</h3>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Time Selection */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Select Time</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 text-center border rounded-lg transition-all duration-200 ${
                        selectedTime === time
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                      }`}
                    >
                      <Clock size={16} className="mx-auto mb-1" />
                      <div className="text-sm font-medium">{time}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Session Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">50 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">Video Session</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium">KSh 2,000</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;