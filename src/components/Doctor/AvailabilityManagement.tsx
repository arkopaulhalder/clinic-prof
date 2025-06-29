import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Plus, Edit, Trash2, Save, X, RotateCcw } from 'lucide-react';
import { DoctorAvailability } from '../../types';

interface TimeSlot {
  start: string;
  end: string;
}

interface DaySchedule {
  dayOfWeek: number;
  dayName: string;
  isAvailable: boolean;
  workingHours: TimeSlot;
  breakTime?: TimeSlot;
  maxAppointments: number;
}

const AvailabilityManagement: React.FC = () => {
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<any[]>([]);
  const [appointmentDuration, setAppointmentDuration] = useState(30);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [editingDay, setEditingDay] = useState<number | null>(null);

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  // Initialize weekly schedule
  useEffect(() => {
    const defaultSchedule: DaySchedule[] = daysOfWeek.map((dayName, index) => ({
      dayOfWeek: index,
      dayName,
      isAvailable: index >= 1 && index <= 5, // Monday to Friday
      workingHours: { start: '09:00', end: '17:00' },
      breakTime: { start: '12:00', end: '13:00' },
      maxAppointments: 16
    }));

    setWeeklySchedule(defaultSchedule);

    // Mock leave requests
    setLeaveRequests([
      {
        id: 1,
        startDate: '2024-02-15',
        endDate: '2024-02-16',
        reason: 'Medical Conference',
        status: 'approved'
      },
      {
        id: 2,
        startDate: '2024-03-01',
        endDate: '2024-03-01',
        reason: 'Personal Leave',
        status: 'pending'
      }
    ]);
  }, []);

  const updateDaySchedule = (dayOfWeek: number, updates: Partial<DaySchedule>) => {
    setWeeklySchedule(prev =>
      prev.map(day =>
        day.dayOfWeek === dayOfWeek ? { ...day, ...updates } : day
      )
    );
  };

  const calculateAvailableSlots = (day: DaySchedule) => {
    if (!day.isAvailable) return 0;
    
    const startTime = new Date(`2024-01-01T${day.workingHours.start}:00`);
    const endTime = new Date(`2024-01-01T${day.workingHours.end}:00`);
    const breakStart = day.breakTime ? new Date(`2024-01-01T${day.breakTime.start}:00`) : null;
    const breakEnd = day.breakTime ? new Date(`2024-01-01T${day.breakTime.end}:00`) : null;
    
    let totalMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60);
    
    if (breakStart && breakEnd) {
      const breakDuration = (breakEnd.getTime() - breakStart.getTime()) / (1000 * 60);
      totalMinutes -= breakDuration;
    }
    
    return Math.floor(totalMinutes / appointmentDuration);
  };

  const LeaveRequestForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">Request Leave</h3>
          <button
            onClick={() => setShowLeaveForm(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              placeholder="Enter reason for leave..."
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Submit Request
            </button>
            <button
              type="button"
              onClick={() => setShowLeaveForm(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Availability Management</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your working hours and schedule preferences</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setShowLeaveForm(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Request Leave</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Global Settings */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Global Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Appointment Duration
            </label>
            <select
              value={appointmentDuration}
              onChange={(e) => setAppointmentDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
          
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buffer Time Between Appointments
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
              <option value={0}>No buffer</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
            </select>
          </div>
          
          <div className="w-full sm:col-span-2 lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Advance Booking Limit
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
              <option value={7}>1 week</option>
              <option value={14}>2 weeks</option>
              <option value={30}>1 month</option>
              <option value={60}>2 months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Weekly Schedule Template</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Default</span>
            </button>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {weeklySchedule.map((day) => (
              <div
                key={day.dayOfWeek}
                className={`p-4 border rounded-lg transition-colors ${
                  day.isAvailable ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                  <div className="flex flex-col space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={day.isAvailable}
                        onChange={(e) => updateDaySchedule(day.dayOfWeek, { isAvailable: e.target.checked })}
                        className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-base sm:text-lg font-semibold text-gray-900 min-w-0 flex-1">
                        {day.dayName}
                      </span>
                    </div>
                    
                    {day.isAvailable && (
                      <div className="flex flex-col space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Working Hours:</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={day.workingHours.start}
                              onChange={(e) => updateDaySchedule(day.dayOfWeek, {
                                workingHours: { ...day.workingHours, start: e.target.value }
                              })}
                              className="px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-gray-500 text-xs sm:text-sm">to</span>
                            <input
                              type="time"
                              value={day.workingHours.end}
                              onChange={(e) => updateDaySchedule(day.dayOfWeek, {
                                workingHours: { ...day.workingHours, end: e.target.value }
                              })}
                              className="px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        
                        {day.breakTime && (
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Break:</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="time"
                                value={day.breakTime.start}
                                onChange={(e) => updateDaySchedule(day.dayOfWeek, {
                                  breakTime: { ...day.breakTime!, start: e.target.value }
                                })}
                                className="px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <span className="text-gray-500 text-xs sm:text-sm">to</span>
                              <input
                                type="time"
                                value={day.breakTime.end}
                                onChange={(e) => updateDaySchedule(day.dayOfWeek, {
                                  breakTime: { ...day.breakTime!, end: e.target.value }
                                })}
                                className="px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {day.isAvailable && (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="text-left sm:text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {calculateAvailableSlots(day)} slots available
                        </div>
                        <div className="text-xs text-gray-500">
                          Max {day.maxAppointments} appointments
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingDay(editingDay === day.dayOfWeek ? null : day.dayOfWeek)}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors self-start sm:self-center"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                
                {editingDay === day.dayOfWeek && day.isAvailable && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Appointments
                        </label>
                        <input
                          type="number"
                          value={day.maxAppointments}
                          onChange={(e) => updateDaySchedule(day.dayOfWeek, { maxAppointments: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                          min="1"
                          max="50"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => setEditingDay(null)}
                          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Leave Requests</h2>
        </div>
        <div className="p-4 sm:p-6">
          {leaveRequests.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {leaveRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg space-y-3 sm:space-y-0"
                >
                  <div>
                    <div className="font-semibold text-gray-900 text-sm sm:text-base">{request.reason}</div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {request.startDate} to {request.endDate}
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-3">
                    <span className={`px-3 py-1 text-xs sm:text-sm rounded-full ${
                      request.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : request.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                    <button className="text-red-600 hover:text-red-800 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">No leave requests</p>
            </div>
          )}
        </div>
      </div>

      {/* Leave Request Form Modal */}
      {showLeaveForm && <LeaveRequestForm />}
    </div>
  );
};

export default AvailabilityManagement;