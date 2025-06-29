import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, FileText, AlertTriangle, TrendingUp, Bell, Phone, Video, MessageSquare, CheckCircle, ArrowUp, ArrowDown, Ban } from 'lucide-react';
import { Appointment, Patient, DashboardStats } from '../../types';
import { format, isToday, parseISO, differenceInMinutes } from 'date-fns';

const DoctorDashboard: React.FC = () => {
  // Mock user data
  const user = {
    id: 'doc_1',
    name: 'Dr. Sarah Johnson',
    role: 'doctor' as const,
    specialization: 'Cardiology'
  };

  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    todayAppointments: 0,
    completedAppointments: 0,
    pendingAppointments: 0,
    cancelledAppointments: 0,
    revenue: 0,
    newPatients: 0,
  });

  const [nextPatient, setNextPatient] = useState<Appointment | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [patientQueue, setPatientQueue] = useState<Appointment[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock data
  useEffect(() => {
    const mockStats: DashboardStats = {
      totalPatients: 247,
      todayAppointments: 12,
      completedAppointments: 8,
      pendingAppointments: 4,
      cancelledAppointments: 1,
      revenue: 156000, // In rupees
      newPatients: 3,
    };

    const mockAppointments: Appointment[] = [
      {
        id: '1',
        patientId: 'p1',
        doctorId: user?.id || '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        duration: 30,
        type: 'consultation',
        status: 'waiting',
        symptoms: 'Chest pain, shortness of breath',
        priority: 'high',
        createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        updatedAt: new Date().toISOString(),
        patient: {
          id: 'p1',
          firstName: 'Rajesh',
          lastName: 'Kumar',
          email: 'rajesh.kumar@email.com',
          phone: '+91 98765 43210',
          dateOfBirth: '1985-06-15',
          gender: 'male',
          address: {
            street: '123 MG Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001'
          },
          emergencyContact: {
            name: 'Priya Kumar',
            phone: '+91 98765 43211',
            relationship: 'Wife'
          },
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
        doctorId: user?.id || '',
        date: new Date().toISOString().split('T')[0],
        time: '10:30',
        duration: 30,
        type: 'follow-up',
        status: 'confirmed',
        symptoms: 'Follow-up for diabetes management',
        priority: 'medium',
        createdAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        updatedAt: new Date().toISOString(),
        patient: {
          id: 'p2',
          firstName: 'Priya',
          lastName: 'Sharma',
          email: 'priya.sharma@email.com',
          phone: '+91 87654 32109',
          dateOfBirth: '1978-03-22',
          gender: 'female',
          address: {
            street: '456 Park Street',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110001'
          },
          emergencyContact: {
            name: 'Amit Sharma',
            phone: '+91 87654 32108',
            relationship: 'Husband'
          },
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
        doctorId: user?.id || '',
        date: new Date().toISOString().split('T')[0],
        time: '11:00',
        duration: 45,
        type: 'consultation',
        status: 'confirmed',
        symptoms: 'Routine checkup',
        priority: 'low',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        patient: {
          id: 'p3',
          firstName: 'Anita',
          lastName: 'Singh',
          email: 'anita.singh@email.com',
          phone: '+91 76543 21098',
          dateOfBirth: '1990-08-12',
          gender: 'female',
          address: {
            street: '789 Brigade Road',
            city: 'Bangalore',
            state: 'Karnataka',
            zipCode: '560001'
          },
          emergencyContact: {
            name: 'Vikram Singh',
            phone: '+91 76543 21097',
            relationship: 'Brother'
          },
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

    setStats(mockStats);
    setTodayAppointments(mockAppointments);
    setNextPatient(mockAppointments[0]);
    setPatientQueue(mockAppointments.filter(apt => apt.status === 'waiting' || apt.status === 'confirmed'));
  }, [user]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-[#A8D5BA] text-[#4A4A4A] border-green-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#D6EAF8] text-[#143D6F] border-blue-200';
      case 'waiting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'in-progress':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'completed':
        return 'bg-[#A8D5BA] text-[#4A4A4A] border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAppointmentTypeColor = (type: string) => {
    return type === 'clinic' 
      ? 'bg-blue-100 text-blue-800 border-blue-200'
      : 'bg-green-100 text-green-800 border-green-200';
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateWaitingTime = (createdAt: string) => {
    const waitingMinutes = differenceInMinutes(currentTime, new Date(createdAt));
    if (waitingMinutes < 60) {
      return `${waitingMinutes} min`;
    }
    const hours = Math.floor(waitingMinutes / 60);
    const minutes = waitingMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const markPatientAttended = (appointmentId: string) => {
    setPatientQueue(prev => prev.filter(apt => apt.id !== appointmentId));
    setTodayAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'completed' as const }
          : apt
      )
    );
  };

  const postponeAppointment = (appointmentId: string) => {
    setPatientQueue(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'confirmed' as const }
        : apt
    ));
  };

  const cancelAppointment = (appointmentId: string) => {
    setPatientQueue(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'cancelled' as const }
        : apt
    ));
  };

  const movePatientUp = (index: number) => {
    if (index > 0) {
      const newQueue = [...patientQueue];
      [newQueue[index], newQueue[index - 1]] = [newQueue[index - 1], newQueue[index]];
      setPatientQueue(newQueue);
    }
  };

  const movePatientDown = (index: number) => {
    if (index < patientQueue.length - 1) {
      const newQueue = [...patientQueue];
      [newQueue[index], newQueue[index + 1]] = [newQueue[index + 1], newQueue[index]];
      setPatientQueue(newQueue);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#4A4A4A]">
            Good morning, {user?.name}
          </h1>
          <p className="text-[#AFAFAF] mt-1 text-sm sm:text-base">
            {format(new Date(), 'EEEE, MMMM d, yyyy')} • {stats.todayAppointments} appointments today
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Start Consultation</span>
          </button>
          <button className="bg-[#A8D5BA] hover:bg-green-600 text-[#4A4A4A] hover:text-white px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>New Prescription</span>
          </button>
        </div>
      </div>

      {/* Next Patient Widget */}
      {nextPatient && (
        <div className="bg-gradient-to-r from-[#D6EAF8] to-[#EDF9FC] border border-[#D0D0D0] rounded-xl p-4 sm:p-6">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#143D6F] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg sm:text-xl font-bold text-white">
                  {nextPatient.patient?.firstName?.charAt(0)}{nextPatient.patient?.lastName?.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#4A4A4A]">Next Patient</h3>
                <p className="text-base sm:text-lg font-semibold text-[#143D6F] truncate">
                  {nextPatient.patient?.firstName} {nextPatient.patient?.lastName}
                </p>
                <p className="text-[#AFAFAF] text-sm sm:text-base">
                  Age {calculateAge(nextPatient.patient?.dateOfBirth || '')} • {nextPatient.time} • {nextPatient.duration} min
                </p>
                <p className="text-[#4A4A4A] font-medium mt-1 text-sm sm:text-base">
                  Chief Complaint: {nextPatient.symptoms}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full border ${getAppointmentTypeColor(nextPatient.patient?.appointmentType || 'clinic')}`}>
                    {nextPatient.patient?.appointmentType === 'clinic' ? 'Clinic Visit' : 'Personal Visit'}
                  </span>
                  <span className="text-xs text-[#AFAFAF] truncate">
                    {nextPatient.patient?.clinicAssociation}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </button>
              <button className="bg-[#A8D5BA] hover:bg-green-600 text-[#4A4A4A] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                <Video className="w-4 h-4" />
                <span>Start</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-[#D0D0D0] hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-[#D6EAF8] rounded-lg flex-shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#143D6F]" />
            </div>
            <div className="ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-[#AFAFAF]">Today's Appointments</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4A4A4A]">{stats.todayAppointments}</p>
              <p className="text-xs text-[#A8D5BA] font-medium">+2 from yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-[#D0D0D0] hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-[#A8D5BA] rounded-lg flex-shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#4A4A4A]" />
            </div>
            <div className="ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-[#AFAFAF]">Total Patients</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4A4A4A]">{stats.totalPatients}</p>
              <p className="text-xs text-[#A8D5BA] font-medium">+{stats.newPatients} new this week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-[#D0D0D0] hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg flex-shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <div className="ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-[#AFAFAF]">Completed Today</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4A4A4A]">{stats.completedAppointments}</p>
              <p className="text-xs text-[#AFAFAF]">{stats.pendingAppointments} pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-[#D0D0D0] hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg flex-shrink-0">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            </div>
            <div className="ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-[#AFAFAF]">Monthly Revenue</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4A4A4A]">₹{stats.revenue.toLocaleString('en-IN')}</p>
              <p className="text-xs text-orange-600 font-medium">+12% this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Queue - Responsive Design */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D0D0D0]">
        <div className="p-4 sm:p-6 border-b border-[#D0D0D0]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-bold text-[#4A4A4A]">Patient Queue</h2>
            <span className="bg-[#D6EAF8] text-[#143D6F] px-3 py-1 rounded-full text-sm font-medium self-start sm:self-center">
              {patientQueue.filter(apt => apt.status !== 'cancelled').length} waiting
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="max-h-96 sm:max-h-[500px] overflow-y-auto">
            <div className="space-y-3 sm:space-y-4">
              {patientQueue.filter(apt => apt.status !== 'cancelled').map((appointment, index) => (
                <div
                  key={appointment.id}
                  className={`p-4 sm:p-6 border rounded-xl transition-all hover:shadow-md ${
                    index === 0 
                      ? 'border-blue-300 bg-blue-50 shadow-sm' 
                      : 'border-[#D0D0D0] bg-white'
                  }`}
                >
                  <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-1 min-w-0">
                      {/* Token Number */}
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0 ${
                        index === 0 ? 'bg-[#143D6F]' : 'bg-gray-400'
                      }`}>
                        #{index + 1}
                      </div>

                      {/* Patient Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <h3 className="text-lg sm:text-xl font-bold text-[#4A4A4A] truncate">
                            {appointment.patient?.firstName} {appointment.patient?.lastName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-[#AFAFAF]">
                            <span>Age {calculateAge(appointment.patient?.dateOfBirth || '')}</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="capitalize">{appointment.patient?.gender}</span>
                          </div>
                        </div>
                        
                        <p className="text-[#4A4A4A] mb-3 font-medium text-sm sm:text-base">
                          Chief Complaint: {appointment.symptoms}
                        </p>
                        
                        <div className="flex flex-col space-y-2 sm:space-y-3 mb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-[#AFAFAF] flex-shrink-0" />
                              <span className="text-sm text-[#AFAFAF] truncate">{appointment.patient?.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-[#AFAFAF] flex-shrink-0" />
                              <span className="text-sm text-[#AFAFAF]">
                                Scheduled: {appointment.time} ({appointment.duration} min)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border ${getPriorityColor(appointment.priority)}`}>
                            {appointment.priority} priority
                          </span>
                          <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full border ${getAppointmentTypeColor(appointment.patient?.appointmentType || 'clinic')}`}>
                            {appointment.patient?.appointmentType === 'clinic' ? 'Clinic Visit' : 'Personal Visit'}
                          </span>
                          <span className="text-xs sm:text-sm text-[#AFAFAF] truncate">
                            {appointment.patient?.clinicAssociation}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-purple-600">
                            Waiting: {calculateWaitingTime(appointment.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-3 sm:space-y-2 lg:w-auto">
                      {/* Queue Management */}
                      <div className="flex justify-center lg:justify-start space-x-1">
                        <button
                          onClick={() => movePatientUp(index)}
                          disabled={index === 0}
                          className="p-2 text-[#AFAFAF] hover:text-[#4A4A4A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          title="Move up in queue"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => movePatientDown(index)}
                          disabled={index === patientQueue.filter(apt => apt.status !== 'cancelled').length - 1}
                          className="p-2 text-[#AFAFAF] hover:text-[#4A4A4A] disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                          title="Move down in queue"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Communication */}
                      <div className="flex space-x-2">
                        <button className="bg-[#143D6F] hover:bg-[#0F2A4F] text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 min-w-[44px] min-h-[44px]">
                          <Phone className="w-4 h-4" />
                          <span className="hidden sm:inline">Call</span>
                        </button>
                        <button className="bg-[#A8D5BA] hover:bg-green-600 text-[#4A4A4A] hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 min-w-[44px] min-h-[44px]">
                          <MessageSquare className="w-4 h-4" />
                          <span className="hidden sm:inline">SMS</span>
                        </button>
                      </div>

                      {/* Patient Management */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => postponeAppointment(appointment.id)}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 min-w-[44px] min-h-[44px]"
                        >
                          <Clock className="w-4 h-4" />
                          <span className="hidden sm:inline">Postpone</span>
                        </button>
                        <button
                          onClick={() => cancelAppointment(appointment.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 min-w-[44px] min-h-[44px]"
                        >
                          <Ban className="w-4 h-4" />
                          <span className="hidden sm:inline">Cancel</span>
                        </button>
                      </div>

                      {/* Mark Attended */}
                      <button
                        onClick={() => markPatientAttended(appointment.id)}
                        className="bg-[#A8D5BA] hover:bg-green-600 text-[#4A4A4A] hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 min-w-[44px] min-h-[44px]"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark Attended</span>
                      </button>
                    </div>
                  </div>

                  {/* Medical Alerts */}
                  {appointment.patient?.allergies && appointment.patient.allergies.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm font-medium text-red-800">Allergies:</span>
                        <span className="text-sm text-red-700">
                          {appointment.patient.allergies.join(', ')}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {patientQueue.filter(apt => apt.status !== 'cancelled').length === 0 && (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-[#AFAFAF] mx-auto mb-4" />
                  <p className="text-[#AFAFAF] text-sm sm:text-base">No patients in queue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-[#D0D0D0]">
        <div className="p-4 sm:p-6 border-b border-[#D0D0D0]">
          <h2 className="text-lg sm:text-xl font-bold text-[#4A4A4A]">Recent Activity</h2>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#A8D5BA] rounded-full flex-shrink-0 mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-[#4A4A4A]">Completed consultation with Rajesh Kumar</p>
                <p className="text-xs sm:text-sm text-[#AFAFAF]">2 hours ago • Prescribed Lisinopril 10mg</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-[#143D6F] rounded-full flex-shrink-0 mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-[#4A4A4A]">Updated availability schedule for next week</p>
                <p className="text-xs sm:text-sm text-[#AFAFAF]">4 hours ago • Added 3 new slots</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm sm:text-base text-[#4A4A4A]">Reviewed lab results for Priya Sharma</p>
                <p className="text-xs sm:text-sm text-[#AFAFAF]">6 hours ago • Blood work normal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;