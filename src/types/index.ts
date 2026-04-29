// User types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Patient types
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  condition: string;
  lastVisit: string;
  status: 'active' | 'discharged' | 'critical';
  contactNumber: string;
  email: string;
  avatar?: string;
  bloodType?: string;
  roomNumber?: string;
}

// View mode for patient list
export type ViewMode = 'grid' | 'list';

// Analytics types
export interface AnalyticsData {
  totalPatients: number;
  activePatients: number;
  criticalPatients: number;
  dischargedToday: number;
  appointmentsToday: number;
  monthlyData: MonthlyData[];
  conditionDistribution: ConditionData[];
}

export interface MonthlyData {
  month: string;
  patients: number;
  appointments: number;
}

export interface ConditionData {
  name: string;
  value: number;
  color: string;
}

// Notification types
export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

// Auth state
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}
