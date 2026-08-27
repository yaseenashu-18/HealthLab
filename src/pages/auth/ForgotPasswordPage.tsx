import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthHeader } from '../../components/auth/AuthHeader';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { forgotPasswordSchema } from '../../utils/validation';
import { authService } from '../../services/authService';
import { useToast } from '../../hooks/useToast';

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const res = await authService.forgotPassword(email);
    setIsSubmitting(false);

    if (res.success) {
      setIsSubmitted(true);
      showToast('Reset Instructions Sent', 'Check your inbox for password reset link.', 'success');
    } else {
      setError(res.message || 'Unable to process reset request.');
    }
  };

  return (
    <AuthLayout>
      <AuthHeader
        title="Reset Password"
        subtitle="Enter your registered email address and we'll send you instructions to reset your password."
      />

      {isSubmitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-emerald-950">Instructions Sent</h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            We have sent password reset instructions to <strong>{email}</strong>. Please check your email inbox and spam folder.
          </p>
          <div className="pt-2">
            <Link to="/signin">
              <Button variant="outline" size="sm" className="w-full">
                Return to Sign In
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Registered Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            error={error}
            leftIcon={<Mail className="w-4 h-4" />}
            autoComplete="email"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
          >
            {isSubmitting ? 'Sending instructions...' : 'Send Reset Link'}
          </Button>
        </form>
      )}

      <div className="text-center pt-2">
        <Link
          to="/signin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </AuthLayout>
  );
};
