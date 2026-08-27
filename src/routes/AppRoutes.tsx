import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage } from '../pages/auth/SignInPage';
import { SignUpPage } from '../pages/auth/SignUpPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { HomePage } from '../pages/home/HomePage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { BookTestPage } from '../pages/book-test/BookTestPage';
import { HealthAiPage } from '../pages/health-ai/HealthAiPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Root path */}
      <Route path="/" element={<HomePage />} />

      {/* Auth Dedicated Routes */}
      <Route
        path="/signin"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <SignInPage />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <SignUpPage />}
      />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify" element={<Navigate to="/signin" replace />} />

      {/* Home Dashboard */}
      <Route path="/home" element={<HomePage />} />

      {/* Primary Module Routes */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book-test"
        element={
          <ProtectedRoute>
            <BookTestPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/health-ai"
        element={
          <ProtectedRoute>
            <HealthAiPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};
