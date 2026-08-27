import { api } from './api';
import { User, ApiResponse } from '../types';
import { SignUpFormData, SignInFormData } from '../utils/validation';

export interface AuthResponseData {
  token: string;
  user: User;
}

export const authService = {
  async signUp(data: SignUpFormData): Promise<ApiResponse<AuthResponseData>> {
    return api.post<AuthResponseData>('/auth/signup', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  },

  async signIn(data: SignInFormData): Promise<ApiResponse<AuthResponseData>> {
    return api.post<AuthResponseData>('/auth/signin', {
      role: data.role,
      emailOrPhone: data.emailOrPhone,
      password: data.password,
    });
  },

  async getMe(): Promise<ApiResponse<{ user: User }>> {
    return api.get<{ user: User }>('/auth/me');
  },

  async logout(): Promise<ApiResponse<void>> {
    return api.post<void>('/auth/logout', {});
  },

  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return api.post<void>('/auth/forgot-password', { email });
  },
};
