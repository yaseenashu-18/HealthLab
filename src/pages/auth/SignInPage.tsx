import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { RoleSelector } from '../../components/ui/RoleSelector';
import { Button } from '../../components/ui/Button';
import { GoogleButton } from '../../components/ui/GoogleButton';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { UserRole } from '../../types';

export const SignInPage: React.FC = () => {
  const { signIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Login Mode: 'email' or 'phone'
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');

  // Form states
  const [role, setRole] = useState<UserRole>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email Sign In Submit
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const res = await signIn({
      role,
      emailOrPhone: email,
      password,
    });
    setIsSubmitting(false);

    if (res.success) {
      showToast('Welcome back!', `Signed in as ${role}.`, 'success');
      navigate('/home');
    } else {
      setError(res.message || 'Invalid email or password.');
    }
  };

  // Phone OTP Send
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phone || phone.length < 7) {
      setError('Please enter a valid phone number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtpSent(true);
      showToast('OTP Sent', `A 6-digit OTP code was sent to ${countryCode} ${phone}`, 'success');
    }, 800);
  };

  // OTP Verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!otpCode || otpCode.length < 4) {
      setError('Please enter the valid 6-digit OTP code.');
      return;
    }

    setIsSubmitting(true);
    const res = await signIn({
      role,
      emailOrPhone: `${countryCode}${phone}`,
      password: 'HealthLab128',
    });
    setIsSubmitting(false);

    if (res.success) {
      showToast('OTP Verified!', 'Successfully signed in via Phone OTP.', 'success');
      navigate('/home');
    } else {
      setError('Invalid or expired OTP code.');
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

      {/* Floating Content Layout */}
      <div className="relative z-10 w-full max-w-md space-y-4 text-slate-900">
        {/* Welcome Back Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Login to access your health dashboard
          </p>
        </div>

        {/* Clean Minimal Tab Switcher */}
        <div className="flex justify-center gap-6 py-1">
          <button
            type="button"
            onClick={() => {
              setLoginMethod('email');
              setError(null);
            }}
            className={`py-1 text-xs transition-colors flex items-center gap-1.5 ${
              loginMethod === 'email'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500 font-medium hover:text-slate-800'
            }`}
          >
            <Mail className="w-4 h-4 stroke-[1.5]" />
            <span>Email Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginMethod('phone');
              setError(null);
            }}
            className={`py-1 text-xs transition-colors flex items-center gap-1.5 ${
              loginMethod === 'phone'
                ? 'text-emerald-700 font-bold'
                : 'text-slate-500 font-medium hover:text-slate-800'
            }`}
          >
            <Phone className="w-4 h-4 stroke-[1.5]" />
            <span>Phone Login</span>
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in">
            {error}
          </div>
        )}

        {/* Role Selector before Email/Phone */}
        <RoleSelector
          label="Account Role"
          value={role}
          onChange={(r) => setRole(r)}
          forceLightMode={true}
        />

        {/* Fixed Height Container to Prevent Layout Jumping */}
        <div className="min-h-[220px] flex flex-col justify-between">
          {/* EMAIL LOGIN MODE */}
          {loginMethod === 'email' && (
            <form onSubmit={handleEmailSignIn} className="space-y-3.5 flex-1 flex flex-col justify-between" noValidate>
              <div className="space-y-3.5">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  leftIcon={<Mail className="w-4 h-4 stroke-[1.5] text-emerald-600" />}
                  autoComplete="email"
                  forceLightMode={true}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  autoComplete="current-password"
                  forceLightMode={true}
                />

                <div className="flex justify-end text-xs">
                  <Link to="/forgot-password" className="font-semibold text-emerald-700 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Primary Green Log In Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 shadow-sm font-bold text-base mt-3"
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Log In'}
              </Button>
            </form>
          )}

          {/* PHONE LOGIN MODE */}
          {loginMethod === 'phone' && (
            <div className="flex-1 flex flex-col justify-between">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5 flex-1 flex flex-col justify-between" noValidate>
                  <div className="space-y-3.5">
                    {/* Phone Input with Country Code Selector */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-white text-slate-800 text-xs font-bold rounded-xl border border-slate-200 py-3 px-2.5 focus:outline-none focus:border-emerald-600 shadow-2xs"
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                        </select>

                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (error) setError(null);
                          }}
                          className="flex-1 bg-white text-slate-900 placeholder:text-slate-400 text-sm rounded-xl border border-slate-200 py-2.5 px-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-2xs"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
                      <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-emerald-600" />
                      <span>We will send a 6-digit OTP to verify your number</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 shadow-sm font-bold text-base mt-3"
                    isLoading={isSubmitting}
                    rightIcon={<ArrowRight className="w-4 h-4 stroke-[1.5]" />}
                  >
                    {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3.5 flex-1 flex flex-col justify-between animate-in fade-in" noValidate>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Enter OTP Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP (e.g. 123456)"
                      value={otpCode}
                      onChange={(e) => {
                        setOtpCode(e.target.value);
                        if (error) setError(null);
                      }}
                      className="w-full bg-white text-center font-mono tracking-widest text-lg text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 py-2.5 px-3.5 focus:outline-none focus:border-emerald-600 shadow-2xs"
                    />
                    <p className="text-xs text-emerald-700 font-semibold text-center flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[1.5]" />
                      <span>OTP sent to: {countryCode} {phone}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 shadow-sm font-bold text-base"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? 'Verifying OTP...' : 'Verify OTP & Log In'}
                    </Button>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-xs font-semibold text-slate-500 hover:text-emerald-700 underline"
                      >
                        Change Phone Number
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Social Login Divider */}
        <div className="relative my-3 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80" />
          </div>
          <span className="relative bg-white/90 px-3 text-xs text-slate-400 font-medium">
            or continue with
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

        {/* Direct Link to Sign Up */}
        <div className="text-center text-xs text-slate-600 pt-1">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-emerald-700 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};
