import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { TopHeader } from '../../components/layout/TopHeader';
import { BottomNavigation } from '../../components/layout/BottomNavigation';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Input } from '../../components/ui/Input';
import { PasswordInput } from '../../components/ui/PasswordInput';
import { RoleSelector } from '../../components/ui/RoleSelector';
import { GoogleButton } from '../../components/ui/GoogleButton';
import { signInSchema, signUpSchema } from '../../utils/validation';
import { useToast } from '../../hooks/useToast';
import { UserRole } from '../../types';
import {
  Heart,
  Moon,
  Footprints,
  Flame,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  User as UserIcon,
  Mail,
  CheckCircle2,
  Home as HomeIcon,
  Truck,
  UserCheck,
  Sun,
  ShoppingCart,
  Droplet,
  FileSpreadsheet,
  Calendar,
  MapPin,
  Lock,
} from 'lucide-react';

interface HomePageProps {
  initialAuthMode?: 'signin' | 'signup';
}

export const HomePage: React.FC<HomePageProps> = ({ initialAuthMode = 'signin' }) => {
  const { user, isAuthenticated, signIn, signUp } = useAuth();
  const { showToast } = useToast();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>(initialAuthMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Active Hero Slide Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form states
  const [signInData, setSignInData] = useState<{
    role: UserRole;
    emailOrPhone: string;
    password: string;
    rememberMe: boolean;
  }>({
    role: 'user',
    emailOrPhone: '',
    password: '',
    rememberMe: true,
  });

  const [signUpData, setSignUpData] = useState<{
    role: UserRole;
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    acceptTerms: true;
  }>({
    role: 'user',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-play feature advertising slides every 6s
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = signInSchema.safeParse(signInData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const res = await signIn(signInData);
    setIsSubmitting(false);

    if (res.success) {
      showToast('Welcome back!', `Signed in as ${signInData.role}.`, 'success');
    } else {
      setServerError(res.message || 'Invalid credentials.');
      showToast('Sign In Failed', res.message || 'Unable to sign in.', 'error');
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const validation = signUpSchema.safeParse(signUpData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    const res = await signUp(signUpData);
    setIsSubmitting(false);

    if (res.success) {
      showToast('Account Created', `Registered successfully as ${signUpData.role}.`, 'success');
    } else {
      setServerError(res.message || 'Failed to create account.');
      showToast('Registration Error', res.message || 'Unable to register.', 'error');
    }
  };

  // 3 Feature Advertising Slides for Hero Banner
  const featureSlides = [
    {
      id: 1,
      badge: 'Health Check, Simplified',
      titleHighlight: 'Accurate Tests',
      titleRest: 'Trusted Results',
      description: 'At-home sample collection by certified professionals with 24-hr turnaround.',
      actionText: 'Book a Test',
      actionPath: '/book-test',
      tags: ['Certified Labs', 'Home Collection', 'Fast Reports'],
      image: '/assets/images/doctor_sample_collection.png',
    },
    {
      id: 2,
      badge: 'HealthLab AI Assistant',
      titleHighlight: 'Instant Insights',
      titleRest: 'Smart AI Reports',
      description: 'Upload lab reports to receive instant plain-language explanations and personalized health guidance.',
      actionText: 'Consult Health AI',
      actionPath: '/health-ai',
      tags: ['AI Analysis', 'Instant Summaries', '24/7 Available'],
      image: '/assets/images/doctor_sample_collection.png',
    },
    {
      id: 3,
      badge: 'Express Medicine Delivery',
      titleHighlight: 'Doorstep Pharmacy',
      titleRest: 'Genuine Medicines',
      description: 'Upload prescriptions & receive verified pharmacy medicines delivered directly to your doorstep in 2 hours.',
      actionText: 'Upload Prescription',
      actionPath: '/reports',
      tags: ['Fast Delivery', 'Pharmacist Verified', '100% Genuine'],
      image: '/assets/images/doctor_sample_collection.png',
    },
  ];

  // Quick Actions (Floating direct outline SVG icons + text, NO card background)
  const quickActions = [
    {
      id: 'doctor',
      label: 'Consult Doctor',
      renderIcon: () => (
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M19 11v6" />
          <path d="M16 14h6" />
        </svg>
      ),
    },
    {
      id: 'medicines',
      label: 'Order Medicines',
      renderIcon: () => (
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="3" width="10" height="18" rx="3" />
          <path d="M7 9h10" />
          <path d="M12 13v4" />
          <path d="M10 15h4" />
        </svg>
      ),
    },
    {
      id: 'prescription',
      label: 'Upload Prescription',
      renderIcon: () => (
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 13h2a1.5 1.5 0 0 0 0-3H9v6" />
          <path d="M11 13l2.5 3" />
          <rect x="15" y="14" width="4" height="4" rx="1" />
        </svg>
      ),
    },
    {
      id: 'reports',
      label: 'My Reports',
      renderIcon: () => (
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 12v6" />
          <path d="M9 15h6" />
        </svg>
      ),
    },
    {
      id: 'packages',
      label: 'Health Packages',
      renderIcon: () => (
        <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
  ];

  // Health Overview Metrics List (No bright colorful boxes)
  const healthMetrics = [
    { name: 'Heart Rate', value: '72', unit: 'bpm', status: 'Normal', icon: Heart, sparklineColor: '#f43f5e' },
    { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Normal', icon: Droplet, sparklineColor: '#0284c7' },
    { name: 'Sleep', value: '7h 30m', unit: 'Good', status: 'Good', icon: Moon, sparklineColor: '#a855f7' },
    { name: 'Steps', value: '8,245', unit: 'steps', status: 'Good', icon: Footprints, sparklineColor: '#10b981' },
    { name: 'Calories', value: '420', unit: 'kcal', status: 'Good', icon: Flame, sparklineColor: '#f59e0b' },
  ];

  // Recommendations List
  const recommendations = [
    {
      id: 1,
      title: 'Vitamin D Test',
      subtitle: 'Essential for strong bones & immunity',
      price: '₹599',
      tag: 'Popular',
      icon: Sun,
    },
    {
      id: 2,
      title: 'Full Body Checkup',
      subtitle: 'Complete health analysis',
      price: '₹1499',
      tag: null,
      icon: UserCheck,
    },
    {
      id: 3,
      title: 'Thyroid Profile (T3, T4, TSH)',
      subtitle: 'Assess thyroid function',
      price: '₹699',
      tag: null,
      icon: Heart,
    },
    {
      id: 4,
      title: 'Diabetes Screening',
      subtitle: 'Early detection is better',
      price: '₹499',
      tag: null,
      icon: Droplet,
    },
  ];

  const slide = featureSlides[currentSlide];

  return (
    <div className="relative min-h-screen bg-slate-50/60 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 transition-colors duration-200 pb-24 md:pb-12">
      {/* Background Image when Unauthenticated */}
      {!isAuthenticated && (
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
      )}

      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        {/* Top Liquid Glass Navigation Header */}
        <TopHeader />

        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-6">
          {/* 
            UNAUTHENTICATED: Single Screen (No Scroll, Clean Floating Layout)
          */}
          {!isAuthenticated ? (
            <div className="w-full max-w-md mx-auto space-y-3.5 px-2 my-auto">
              {/* Title & Subtitle */}
              <div className="text-center space-y-0.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  {authMode === 'signup'
                    ? 'Join HealthLab AI and take control of your health today'
                    : 'Sign in to access your reports, consultations & orders'}
                </p>
              </div>

              {serverError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in">
                  {serverError}
                </div>
              )}

              {/* Sign In Form */}
              {authMode === 'signin' && (
                <form onSubmit={handleSignInSubmit} className="space-y-3" noValidate>
                  <RoleSelector
                    label="Account Role"
                    value={signInData.role}
                    onChange={(role) => setSignInData({ ...signInData, role })}
                    forceLightMode={true}
                  />

                  <Input
                    label="Email"
                    name="emailOrPhone"
                    placeholder="Enter your email"
                    value={signInData.emailOrPhone}
                    onChange={(e) => {
                      setSignInData({ ...signInData, emailOrPhone: e.target.value });
                      if (errors.emailOrPhone) setErrors({ ...errors, emailOrPhone: '' });
                    }}
                    error={errors.emailOrPhone}
                    leftIcon={<Mail className="w-4 h-4 text-emerald-600 stroke-[1.5]" />}
                    forceLightMode={true}
                  />

                  <PasswordInput
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    value={signInData.password}
                    onChange={(e) => {
                      setSignInData({ ...signInData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    error={errors.password}
                    forceLightMode={true}
                  />

                  <div className="flex items-center justify-between text-xs pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={signInData.rememberMe}
                        onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                      />
                      <span>Remember me</span>
                    </label>

                    <a href="#forgot" className="font-semibold text-emerald-700 hover:underline">
                      Forgot Password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-11 shadow-sm font-bold text-sm mt-1"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              )}

              {/* Sign Up Form */}
              {authMode === 'signup' && (
                <form onSubmit={handleSignUpSubmit} className="space-y-2.5" noValidate>
                  <RoleSelector
                    label="Account Role"
                    value={signUpData.role}
                    onChange={(role) => setSignUpData({ ...signUpData, role })}
                    forceLightMode={true}
                  />

                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={signUpData.name}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    error={errors.name}
                    leftIcon={<UserIcon className="w-4 h-4 text-emerald-600 stroke-[1.5]" />}
                    forceLightMode={true}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    value={signUpData.email}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, email: e.target.value, phone: signUpData.phone || e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    error={errors.email}
                    leftIcon={<Mail className="w-4 h-4 text-emerald-600 stroke-[1.5]" />}
                    forceLightMode={true}
                  />

                  <PasswordInput
                    label="Password"
                    placeholder="Create a password"
                    value={signUpData.password}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    error={errors.password}
                    forceLightMode={true}
                  />

                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => {
                      setSignUpData({ ...signUpData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    error={errors.confirmPassword}
                    forceLightMode={true}
                  />

                  <div className="pt-0.5">
                    <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 select-none">
                      <input
                        type="checkbox"
                        checked={signUpData.acceptTerms}
                        onChange={() => {}}
                        className="mt-0.5 w-3.5 h-3.5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
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
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-11 shadow-sm font-bold text-sm mt-1"
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              )}

              {/* Social Login Divider */}
              <div className="relative my-2 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200/80" />
                </div>
                <span className="relative bg-white/90 px-3 text-[11px] text-slate-400 font-medium">
                  {authMode === 'signup' ? 'or sign up with' : 'or sign in with'}
                </span>
              </div>

              {/* Google Button */}
              <GoogleButton
                label="Continue with Google"
                onClick={() => showToast('Google Sign In', 'Google single sign-on enabled.', 'info')}
              />

              {/* Security Shield Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 stroke-[1.5]" />
                <span>Your data is <strong>secure</strong> with end-to-end encryption</span>
              </div>

              {/* Mode Toggle Links */}
              <div className="text-center text-xs text-slate-600 pt-0.5">
                {authMode === 'signup' ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setErrors({});
                        setServerError(null);
                      }}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      Log In
                    </button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setErrors({});
                        setServerError(null);
                      }}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      Sign Up
                    </button>
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* 
              AUTHENTICATED HOME DASHBOARD (Apple Minimalist Aesthetic: White/Zinc-Dark, Clean Outline Icons, No Blue Tint)
            */
            <div className="space-y-6">
              {/* 1. Feature Advertising Hero Banner (3 Interactive Feature Slides) */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 p-6 sm:p-8 shadow-2xs transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3.5 z-10 animate-in fade-in duration-300">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/60 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" />
                      <span>{slide.badge}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                      {slide.titleHighlight} <br className="hidden sm:inline" />
                      <span className="text-emerald-600 dark:text-emerald-400">{slide.titleRest}</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-md font-normal leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="pt-1">
                      <Button variant="primary" size="md" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold gap-2">
                        <span>{slide.actionText}</span>
                        <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                      </Button>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-slate-700 dark:text-zinc-300">
                      {slide.tags.map((tag, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Doctor / Feature Image */}
                  <div className="md:col-span-5 flex justify-center z-10">
                    <img
                      src={slide.image}
                      alt={slide.titleHighlight}
                      className="max-h-56 sm:max-h-64 object-contain rounded-2xl drop-shadow-md select-none"
                    />
                  </div>
                </div>

                {/* Carousel Controls (Previous / Next Arrows & Slide Dots) */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-zinc-800/80 mt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentSlide((prev) => (prev === 0 ? featureSlides.length - 1 : prev - 1))}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
                  </button>

                  <div className="flex items-center gap-2">
                    {featureSlides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-200 rounded-full ${
                          currentSlide === index
                            ? 'w-6 h-2 bg-emerald-600 dark:bg-emerald-400'
                            : 'w-2 h-2 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % featureSlides.length)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[1.5]" />
                  </button>
                </div>
              </div>

              {/* 2. Quick Actions (DIRECT ON SCREEN FLOATING, NO CARD CONTAINER, HIGHLIGHT ONLY ICON & TEXT ON SELECT) */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Quick Actions</h3>
                  <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => showToast(action.label, `Navigating to ${action.label}...`, 'info')}
                      className="flex flex-col items-center justify-center text-center p-3 rounded-2xl transition-all group select-none hover:scale-105 active:scale-95 bg-transparent border-none shadow-none"
                    >
                      <div className="mb-2 transition-colors duration-200">
                        {action.renderIcon()}
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 leading-tight">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* 3. Upload Prescription or Lab Reports Section */}
              <div className="bg-white dark:bg-[#121215] rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Upload Prescription or Lab Reports</h3>
                      <p className="text-xs text-slate-600 dark:text-zinc-400 max-w-lg leading-relaxed">
                        Upload your prescription or lab reports and get medicines delivered to your doorstep.
                      </p>
                    </div>
                  </div>

                  <Button variant="primary" size="md" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold gap-1.5 shrink-0">
                    <span>Upload Now</span>
                    <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800/80 pt-3">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" /> Secure & Private
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" /> Pharmacist Reviewed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" /> Fast Delivery
                  </span>
                </div>
              </div>

              {/* 4. Health Overview */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Health Overview</h3>
                  <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
                    <span>View More</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {healthMetrics.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <Card key={idx} className="p-4 space-y-2 bg-white dark:bg-[#121215]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">{metric.name}</span>
                          <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400">
                            <Icon className="w-4 h-4 stroke-[1.5]" />
                          </div>
                        </div>

                        <div>
                          <span className="text-xl font-extrabold text-slate-900 dark:text-white">{metric.value}</span>
                          <span className="text-xs text-slate-500 dark:text-zinc-400 ml-1 font-medium">{metric.unit}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            {metric.status}
                          </span>
                          <svg className="w-12 h-4" viewBox="0 0 50 16" fill="none">
                            <path d="M0 12 Q 10 4, 20 10 T 40 6 T 50 12" stroke={metric.sparklineColor} strokeWidth="2" fill="none" />
                          </svg>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>

              {/* 5. Upcoming Appointments */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Upcoming Appointments</h3>
                  <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>

                <Card className="p-5 bg-white dark:bg-[#121215] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center shrink-0">
                        <Calendar className="w-6 h-6 stroke-[1.5]" />
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Full Body Checkup</h4>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1 font-medium">
                          <span>28 May 2025</span>
                          <span>•</span>
                          <span>10:00 AM</span>
                        </p>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1 pt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[1.5]" /> HealthLab Diagnostic Center
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <StatusBadge status="active" label="Confirmed" size="sm" />
                      <ChevronRight className="w-5 h-5 text-slate-400 dark:text-zinc-500 stroke-[1.5]" />
                    </div>
                  </div>
                </Card>
              </section>

              {/* 6. Recommendations for You */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Recommendations for You</h3>
                  <button type="button" className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommendations.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Card key={item.id} hoverable className="p-4 bg-white dark:bg-[#121215] flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400">
                              <Icon className="w-5 h-5 stroke-[1.5]" />
                            </div>
                            {item.tag && (
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full uppercase">
                                {item.tag}
                              </span>
                            )}
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-xs text-slate-500 dark:text-zinc-400 font-normal leading-relaxed mt-0.5">{item.subtitle}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                          <span className="text-base font-extrabold text-slate-900 dark:text-white">{item.price}</span>
                          <button
                            type="button"
                            onClick={() => showToast('Added to Cart', `${item.title} added to booking cart.`, 'success')}
                            className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 transition-colors"
                            aria-label={`Add ${item.title} to cart`}
                          >
                            <ShoppingCart className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </main>

        <BottomNavigation />
      </div>
    </div>
  );
};
