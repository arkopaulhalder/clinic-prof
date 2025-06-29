import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Filter, Search, ChevronLeft, ChevronRight, Phone, MessageSquare, User, Plus } from 'lucide-react';
import { Appointment, Patient } from '../../types';
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO, startOfMonth, endOfMonth, getDay } from 'date-fns';

const MySchedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock appointments data with clinic associations
  useEffect(() => {
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        patientId: 'p1',
        doctorId: 'doc_1',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '09:00',
        duration: 30,
        type: 'consultation',
        status: 'confirmed',
        symptoms: 'Chest pain, shortness of breath',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        patient: {
          id: 'p1',
          firstName: 'Rajesh',
          lastName: 'Kumar',
          email: 'rajesh@example.com',
          phone: '+91 98765 43210',
          dateOfBirth: '1985-06-15',
          gender: 'male',
          address: { street: '123 Main St', city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
          emergencyContact: { name: 'Priya Kumar', phone: '+91 98765 43211', relationship: 'Wife' },
          medicalHistory: ['Hypertension', 'Diabetes'],
          allergies: ['Penicillin'],
          currentMedications: ['Metformin', 'Lisinopril'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          clinicAssociation: 'Apollo Hospital',
          appointmentType: 'clinic'
        }
      },
      {
        id: '2',
        patientId: 'p2',
        doctorId: 'doc_1',
        date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
        time: '10:30',
        duration: 45,
        type: 'follow-up',
        status: 'confirmed',
        symptoms: 'Follow-up for diabetes management',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        patient: {
          id: 'p2',
          firstName: 'Priya',
          lastName: 'Sharma',
          email: 'priya@example.com',
          phone: '+91 87654 32109',
          dateOfBirth: '1978-03-22',
          gender: 'female',
          address: { street: '456 Oak Ave', city: 'Delhi', state: 'Delhi', zipCode: '110001' },
          emergencyContact: { name: 'Amit Sharma', phone: '+91 87654 32108', relationship: 'Husband' },
          medicalHistory: ['Diabetes Type 2'],
          allergies: [],
          currentMedications: ['Metformin', 'Insulin'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          clinicAssociation: 'Personal Visit',
          appointmentType: 'personal'
        }
      },
      {
        id: '3',
        patientId: 'p3',
        doctorId: 'doc_1',
        date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
        time: '14:00',
        duration: 30,
        type: 'consultation',
        status: 'confirmed',
        symptoms: 'Annual physical examination',
        priority: 'low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        patient: {
          id: 'p3',
          firstName: 'Anita',
          lastName: 'Singh',
          email: 'anita@example.com',
          phone: '+91 76543 21098',
          dateOfBirth: '1990-08-12',
          gender: 'female',
          address: { street: '789 Pine St', city: 'Bangalore', state: 'Karnataka', zipCode: '560001' },
          emergencyContact: { name: 'Vikram Singh', phone: '+91 76543 21097', relationship: 'Brother' },
          medicalHistory: [],
          allergies: ['Shellfish'],
          currentMedications: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          clinicAssociation: 'Fortis Healthcare',
          appointmentType: 'clinic'
        }
      }
    ];

    setAppointments(mockAppointments);
    setFilteredAppointments(mockAppointments);
  }, []);

  // Filter appointments
  useEffect(() => {
    let filtered = appointments;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(apt => apt.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(apt =>
        apt.patient?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.patient?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.symptoms?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.patient?.clinicAssociation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  }, [appointments, statusFilter, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#D6EAF8] text-[#143D6F]';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-[#A8D5BA] text-[#4A4A4A]';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getClinicColor = (appointmentType: string) => {
    return appointmentType === 'clinic' 
      ? 'bg-blue-100 text-blue-800'
      : 'bg-green-100 text-green-800';
  };

  const getAppointmentsForDate = (date: Date) => {
    return filteredAppointments.filter(apt => 
      isSameDay(new Date(apt.date), date)
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    // Create header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dayAppointments = getAppointmentsForDate(day);
        const isCurrentMonth = isSameDay(day, currentDate) || (day >= monthStart && day <= monthEnd);
        const isToday = isSameDay(day, new Date());
        
        days.push(
          <div
            key={day.toString()}
            className={`min-h-24 sm:min-h-32 border border-[#D0D0D0] p-2 sm:p-3 ${
              !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
            } ${isToday ? 'bg-[#D6EAF8]' : ''}`}
          >
            <div className={`text-sm font-medium mb-2 ${isToday ? 'text-[#143D6F]' : 'text-[#4A4A4A]'}`}>
              {format(cloneDay, dateFormat)}
            </div>
            <div className="space-y-1">
              {dayAppointments.slice(0, 2).map((appointment) => (
                <div
                  key={appointment.id}
                  className={`text-xs p-1 rounded ${getStatusColor(appointment.status)} truncate`}
                >
                  {appointment.time} - {appointment.patient?.firstName}
                </div>
              ))}
              {dayAppointments.length > 2 && (
                <div className="text-xs text-[#AFAFAF]">
                  +{dayAppointments.length - 2} more
                </div>
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }

    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#D0D0D0]">
        <div className="p-4 sm:p-6 border-b border-[#D0D0D0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-[#4A4A4A]">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <button
                onClick={() => setCurrentDate(subDays(currentDate, 30))}
                className="p-2 hover:bg-[#D6EAF8] rounded-lg transition-colors text-[#4A4A4A] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-[#143D6F] text-white rounded-lg hover:bg-[#0F2A4F] transition-colors text-sm font-medium min-h-[44px]"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(addDays(currentDate, 30))}
                className="p-2 hover:bg-[#D6EAF8] rounded-lg transition-colors text-[#4A4A4A] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Days of week header */}
          <div className="grid grid-cols-7 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-[#AFAFAF]">
                {day}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {rows}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#D0D0D0]">
        <div className="p-4 sm:p-6 border-b border-[#D0D0D0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg sm:text-xl font-bold text-[#4A4A4A]">
              {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
            </h3>
            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <button
                onClick={() => setCurrentDate(subDays(currentDate, 7))}
                className="p-2 hover:bg-[#D6EAF8] rounded-lg transition-colors text-[#4A4A4A] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-[#143D6F] text-white rounded-lg hover:bg-[#0F2A4F] transition-colors text-sm font-medium min-h-[44px]"
              >
                This Week
              </button>
              <button
                onClick={() => setCurrentDate(addDays(currentDate, 7))}
                className="p-2 hover:bg-[#D6EAF8] rounded-lg transition-colors text-[#4A4A4A] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-7 gap-2 sm:gap-4 min-w-[640px]">
              {weekDays.map((day) => {
                const dayAppointments = getAppointmentsForDate(day);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div
                    key={day.toISOString()}
                    className={`p-3 sm:p-4 border rounded-lg min-h-48 ${
                      isToday ? 'border-[#143D6F] bg-[#D6EAF8]' : 'border-[#D0D0D0] bg-white'
                    }`}
                  >
                    <div className="text-center mb-3">
                      <div className="text-sm font-medium text-[#AFAFAF]">
                        {format(day, 'EEE')}
                      </div>
                      <div className={`text-lg font-bold ${
                        isToday ? 'text-[#143D6F]' : 'text-[#4A4A4A]'
                      }`}>
                        {format(day, 'd')}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-2 bg-white border border-[#D0D0D0] rounded text-xs"
                        >
                          <div className="font-medium text-[#4A4A4A] mb-1">
                            {appointment.time}
                          </div>
                          <div className="text-[#AFAFAF] truncate mb-1">
                            {appointment.patient?.firstName} {appointment.patient?.lastName}
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className={`px-1 py-0.5 rounded text-xs ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                            <span className={`px-1 py-0.5 rounded text-xs ${getClinicColor(appointment.patient?.appointmentType || 'clinic')}`}>
                              {appointment.patient?.appointmentType === 'clinic' ? 'Clinic' : 'Personal'}
                            </span>
                          </div>
                        </div>
                      ))}
                      {dayAppointments.length === 0 && (
                        <div className="text-xs text-[#AFAFAF] text-center py-4">
                          No appointments
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(currentDate);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-[#D0D0D0]">
        <div className="p-4 sm:p-6 border-b border-[#D0D0D0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg sm:text-xl font-bold text-[#4A4A4A]">
              {format(currentDate, 'EEEE, MMMM d, yyyy')}
            </h3>
            <div className="flex items-center justify-center sm:justify-end space-x-2">
              <button
                onClick={() => setCurrentDate(subDays(currentDate, 1))}
                className="p-2 hover:bg-[#D6EAF8] rounded-lg transition-colors text-[#4A4A4A] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-4 py-2 bg-[#143D6F] text-white rounded-lg hover:bg-[#0F2A4F] transition-colors text-sm font-medium min-h-[44px]"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(addDays(currentDate, 1))}
                className="p-2 hover:bg-[#D6EAF8] rounded-lg transition-colors text-[#4A4A4A] min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 sm:p-6">
          {dayAppointments.length > 0 ? (
            <div className="space-y-4">
              {dayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 sm:p-6 border border-[#D0D0D0] rounded-lg hover:shadow-md transition-shadow bg-gradient-to-r from-white to-[#EDF9FC]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#143D6F] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-white">
                          {appointment.patient?.firstName?.charAt(0)}{appointment.patient?.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-[#4A4A4A] truncate">
                          {appointment.patient?.firstName} {appointment.patient?.lastName}
                        </h3>
                        <p className="text-[#AFAFAF] text-sm sm:text-base truncate">
                          {appointment.patient?.clinicAssociation}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-bold text-[#143D6F]">{appointment.time}</div>
                      <div className="text-sm text-[#AFAFAF]">{appointment.duration} minutes</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-[#4A4A4A] mb-2 text-sm sm:text-base">Contact Information</h4>
                      <p className="text-sm text-[#AFAFAF] mb-1">📞 {appointment.patient?.phone}</p>
                      <p className="text-sm text-[#AFAFAF] truncate">✉️ {appointment.patient?.email}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#4A4A4A] mb-2 text-sm sm:text-base">Reason for Visit</h4>
                      <p className="text-sm text-[#4A4A4A]">{appointment.symptoms}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(appointment.status)}`}>
                        {appointment.status}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full ${getClinicColor(appointment.patient?.appointmentType || 'clinic')}`}>
                        {appointment.patient?.appointmentType === 'clinic' ? 'Clinic Visit' : 'Personal Visit'}
                      </span>
                      <span className="px-3 py-1 text-sm bg-[#EDF9FC] text-[#4A4A4A] rounded-full">
                        {appointment.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 min-w-[44px] min-h-[44px]">
                        <Phone className="w-4 h-4" />
                        <span>Call</span>
                      </button>
                      <button className="bg-[#A8D5BA] hover:bg-green-600 text-[#4A4A4A] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 min-w-[44px] min-h-[44px]">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-[#AFAFAF] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#4A4A4A] mb-2">No appointments scheduled</h3>
              <p className="text-[#AFAFAF] text-sm sm:text-base">You have no appointments for this day.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#4A4A4A]">Calendar</h1>
          <p className="text-[#AFAFAF] mt-1 text-sm sm:text-base">Manage your appointments and schedule</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex bg-[#EDF9FC] rounded-lg p-1 border border-[#D0D0D0]">
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                viewMode === 'month'
                  ? 'bg-white text-[#4A4A4A] shadow-sm'
                  : 'text-[#AFAFAF] hover:text-[#4A4A4A]'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                viewMode === 'week'
                  ? 'bg-white text-[#4A4A4A] shadow-sm'
                  : 'text-[#AFAFAF] hover:text-[#4A4A4A]'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${
                viewMode === 'day'
                  ? 'bg-white text-[#4A4A4A] shadow-sm'
                  : 'text-[#AFAFAF] hover:text-[#4A4A4A]'
              }`}
            >
              Day
            </button>
          </div>
          <button className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base min-h-[44px]">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-[#D0D0D0]">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#AFAFAF] w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search patients, clinics, or symptoms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] placeholder-[#AFAFAF] text-sm sm:text-base"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-[#D0D0D0] rounded-lg focus:ring-2 focus:ring-[#143D6F] focus:border-transparent bg-white text-[#4A4A4A] text-sm sm:text-base"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="waiting">Waiting</option>
          </select>
          
          <button className="flex items-center justify-center space-x-2 bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base min-w-[44px] min-h-[44px]">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">More Filters</span>
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === 'month' && renderMonthView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'day' && renderDayView()}
    </div>
  );
};

export default MySchedule;