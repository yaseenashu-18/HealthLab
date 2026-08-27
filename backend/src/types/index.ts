import { Request } from 'express';

export type UserRole = 'user' | 'doctor' | 'lab_technician' | 'pharmacy';

export interface IUserPayload {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: IUserPayload;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}
