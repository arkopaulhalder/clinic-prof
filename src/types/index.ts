export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'doctor' | 'receptionist' | 'admin';
  specialization?: string;
  licenseNumber?: string;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  bloodGroup?: string;
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  clinicAssociation?: string;
  appointmentType?: 'clinic' | 'personal';
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient?: Patient;
  doctorId: string;
  doctor?: User;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'emergency' | 'checkup';
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'waiting';
  notes?: string;
  symptoms?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  patient?: Patient;
  doctorId: string;
  doctor?: User;
  appointmentId: string;
  medications: {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    quantity: number;
  }[];
  diagnosis: string;
  notes?: string;
  isDispensed: boolean;
  createdAt: string;
  validUntil: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  type: 'consultation' | 'lab-report' | 'imaging' | 'procedure';
  title: string;
  description: string;
  findings: string;
  recommendations: string;
  attachments: string[];
  createdAt: string;
}

export interface DoctorAvailability {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
  isAvailable: boolean;
  maxAppointments: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment' | 'cancellation' | 'reminder' | 'urgent' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  requestOTP: (phone: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'doctor' | 'receptionist' | 'admin';
  specialization?: string;
  licenseNumber?: string;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  completedAppointments: number;
  pendingAppointments: number;
  cancelledAppointments: number;
  revenue: number;
  newPatients: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'appointment' | 'break' | 'unavailable';
  patient?: Patient;
  doctor?: User;
  status: string;
}