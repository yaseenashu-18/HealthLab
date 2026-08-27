export type UserRole = 'user' | 'doctor' | 'lab_technician' | 'pharmacy';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}
