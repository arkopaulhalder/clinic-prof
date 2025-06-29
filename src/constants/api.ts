export const API_BASE_URL = 'http://13.201.22.79:8000/api';

export const API_ENDPOINTS = {
  REQUEST_OTP: '/requestOTP',
  REGISTER: '/register',
  LOGIN: '/login',
  GET_USER: '/me',
  PATIENTS: '/patients',
  APPOINTMENTS: '/appointments',
  PRESCRIPTIONS: '/prescriptions',
  MEDICAL_RECORDS: '/medical-records',
  DOCTOR_AVAILABILITY: '/doctor-availability',
  NOTIFICATIONS: '/notifications',
  UPLOAD: '/upload',
  STATS: '/stats'
} as const;

export const ROLES = {
  DOCTOR: 'doctor',
  RECEPTIONIST: 'receptionist',
  ADMIN: 'admin'
} as const;

export const APPOINTMENT_STATUSES = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show'
} as const;

export const APPOINTMENT_TYPES = {
  CONSULTATION: 'consultation',
  FOLLOW_UP: 'follow-up',
  EMERGENCY: 'emergency',
  CHECKUP: 'checkup'
} as const;

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
} as const;