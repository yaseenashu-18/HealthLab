import React, { createContext, useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types';
import { authService } from '../services/authService';
import { SignUpFormData, SignInFormData } from '../utils/validation';

interface AuthContextType extends AuthState {
  signIn: (data: SignInFormData) => Promise<{ success: boolean; message?: string }>;
  signUp: (data: SignUpFormData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('healthlab_token'),
    isAuthenticated: false,
    isLoading: true,
  });

  // Verify stored session on app mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('healthlab_token');
      if (!storedToken) {
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
        return;
      }

      try {
        const response = await authService.getMe();
        if (response.success && response.data?.user) {
          setState({
            user: response.data.user,
            token: storedToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          // Invalid token, clear local state
          localStorage.removeItem('healthlab_token');
          setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
        }
      } catch (err) {
        localStorage.removeItem('healthlab_token');
        setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
      }
    };

    initAuth();
  }, []);

  const signIn = async (data: SignInFormData) => {
    try {
      const response = await authService.signIn(data);
      if (response.success && response.data) {
        const { token, user } = response.data;
        localStorage.setItem('healthlab_token', token);
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        return { success: true, message: response.message || 'Signed in successfully' };
      }
      return { success: false, message: response.message || 'Failed to sign in' };
    } catch (error: any) {
      return { success: false, message: error.message || 'An unexpected error occurred' };
    }
  };

  const signUp = async (data: SignUpFormData) => {
    try {
      const response = await authService.signUp(data);
      if (response.success && response.data) {
        const { token, user } = response.data;
        localStorage.setItem('healthlab_token', token);
        setState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        return { success: true, message: response.message || 'Account created successfully' };
      }
      return { success: false, message: response.message || 'Failed to create account' };
    } catch (error: any) {
      return { success: false, message: error.message || 'An unexpected error occurred' };
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('healthlab_token');
    authService.logout().catch(() => {});
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
