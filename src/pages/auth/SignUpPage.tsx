import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { RoleSelector } from '../../components/ui/RoleSelector';
import { Button } from '../../components/ui/Button';
import { GoogleButton } from '../../components/ui/GoogleButton';
import { signUpSchema, SignUpFormData } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { UserRole } from '../../types';

export const SignUpPage: React.FC = () => {
  const { signUp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignUpFormData>({
    role: 'user' as UserRole,
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const res = await signUp(formData);
    setIsSubmitting(false);

    if (res.success) {
      showToast('Welcome to HealthLab AI!', 'Your account has been created successfully.', 'success');
      navigate('/home');
    } else {
      setServerError(res.message || 'Failed to create account.');
      showToast('Registration Error', res.message || 'Unable to create account.', 'error');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex flex-col justify-center items-center py-6 px-4 overflow-x-hidden select-none text-slate-900">
      {/* 
        Fixed Screen Background Image 
        Path: /assets/images/healthcare_sigin and signup.jpeg
        Protected against long click / drag / download
      */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-top bg-no-repeat pointer-events-none select-none z-0"
        style={{
          backgroundImage: `url('/assets/images/healthcare_sigin%20and%20signup.jpeg')`,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      {/* Top Left Floating Back Button to Home Dashboard */}
      <div className="fixed top-4 left-4 z-20">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md border border-slate-200 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          title="Back to Home Dashboard"
          aria-label="Back to Home Dashboard"
        >
          <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      {/* Floating Content Container */}
      <div className="relative z-10 w-full max-w-md space-y-4 text-slate-900">
        {/* Create Account Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Join HealthLab AI and take control of your health today
          </p>
        </div>

        {serverError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
          {/* 1. Account Role at the Top */}
          <RoleSelector
            label="Account Role"
            value={formData.role}
            onChange={(r) => setFormData((prev) => ({ ...prev, role: r }))}
            forceLightMode={true}
          />

          {/* 2. Full Name */}
          <Input
            label="Full Name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            leftIcon={<UserIcon className="w-4 h-4 stroke-[1.5] text-emerald-600" />}
            autoComplete="name"
            forceLightMode={true}
          />

          {/* 3. Email (Only Email) */}
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
              setFormData((prev) => ({ ...prev, phone: prev.phone || e.target.value }));
            }}
            error={errors.email}
            leftIcon={<Mail className="w-4 h-4 stroke-[1.5] text-emerald-600" />}
            autoComplete="email"
            forceLightMode={true}
          />

          {/* 4. Password */}
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            autoComplete="new-password"
            forceLightMode={true}
          />

          {/* 5. Confirm Password */}
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            autoComplete="new-password"
            forceLightMode={true}
          />

          {/* Terms Acceptance */}
          <div className="space-y-1 pt-0.5">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 select-none">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
              />
              <span>
                I agree to the{' '}
                <a href="#terms" className="text-emerald-700 font-semibold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-emerald-700 font-semibold hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-xs font-medium text-rose-600">{errors.acceptTerms}</p>
            )}
          </div>

          {/* Primary Green Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 shadow-sm font-bold text-base mt-2"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4 stroke-[1.5]" />}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        {/* Social Login Divider */}
        <div className="relative my-3 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80" />
          </div>
          <span className="relative bg-white/90 px-3 text-xs text-slate-400 font-medium">
            or sign up with
          </span>
        </div>

        {/* Google Button */}
        <GoogleButton
          label="Continue with Google"
          onClick={() => showToast('Google Sign In', 'Google single sign-on enabled.', 'info')}
        />

        {/* Security Shield Badge */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
          <ShieldCheck className="w-4 h-4 stroke-[1.5] text-emerald-600" />
          <span>Your data is <strong>secure</strong> with end-to-end encryption</span>
        </div>

        {/* Direct Link to Log In */}
        <div className="text-center text-xs text-slate-600 pt-1">
          Already have an account?{' '}
          <Link to="/signin" className="font-bold text-emerald-700 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
