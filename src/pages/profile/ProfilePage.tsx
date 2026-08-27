import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopHeader } from '../../components/layout/TopHeader';
import { BottomNavigation } from '../../components/layout/BottomNavigation';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import {
  User as UserIcon,
  Stethoscope,
  CreditCard,
  Watch,
  Bell,
  Lock,
  Settings,
  ShieldAlert,
  HelpCircle,
  LogOut,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  FileText,
  Calendar,
  Heart,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Signed Out', 'You have been logged out successfully.', 'info');
    navigate('/signin');
  };

  const menuSections = [
    {
      id: 'health-profile',
      title: 'Health Profile',
      subtitle: 'Edit your personal details, health profile and goals',
      icon: UserIcon,
    },
    {
      id: 'health-management',
      title: 'Health Management',
      subtitle: 'Consultations, appointments, tests, prescriptions, reports and downloads',
      icon: Stethoscope,
    },
    {
      id: 'payments',
      title: 'Payments & Billing',
      subtitle: 'Payment methods, history, invoices, membership and plans',
      icon: CreditCard,
    },
    {
      id: 'tracking',
      title: 'Tracking & Devices',
      subtitle: 'Connected devices and health metrics tracking',
      icon: Watch,
    },
    {
      id: 'notifications',
      title: 'Notifications & Reminders',
      subtitle: 'Manage alerts, reminders and communication preferences',
      icon: Bell,
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      subtitle: 'Privacy settings, security, data and permissions',
      icon: Lock,
    },
    {
      id: 'preferences',
      title: 'Preferences',
      subtitle: 'Appearance, language, units and other app preferences',
      icon: Settings,
    },
    {
      id: 'insurance',
      title: 'Insurance & Healthcare',
      subtitle: 'Insurance details, emergency contact and providers',
      icon: ShieldAlert,
    },
    {
      id: 'support',
      title: 'Support & About',
      subtitle: 'Help, FAQs, feedback and app information',
      icon: HelpCircle,
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-24 md:pb-12">
      <TopHeader />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* 1. Module Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Manage your health and account
          </p>
        </div>

        {/* 2. User Info Card */}
        <Card className="p-6 bg-white dark:bg-slate-900 space-y-5">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <Avatar name={user?.name || 'Yaseen Ashu'} src={user?.avatar} size="xl" showBadge={false} />

            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name || 'Yaseen Ashu'}</h2>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user?.email || 'yaseen.ashu@gmail.com'}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Vadodara, Gujarat</span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 hidden sm:block" />
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-center">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1 stroke-[1.5]" />
              <div className="text-base font-extrabold text-slate-900 dark:text-white">12</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tests Done</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-center">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1 stroke-[1.5]" />
              <div className="text-base font-extrabold text-slate-900 dark:text-white">5</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Appointments</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-center">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1 stroke-[1.5]" />
              <div className="text-base font-extrabold text-slate-900 dark:text-white">8</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Reports</div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-center">
              <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1 stroke-[1.5]" />
              <div className="text-base font-extrabold text-slate-900 dark:text-white">2</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Health Goals</div>
            </div>
          </div>
        </Card>

        {/* 3. List Menu Options */}
        <Card className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800 p-2">
          {menuSections.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => showToast(item.title, item.subtitle, 'info')}
                className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl transition-all text-left group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{item.subtitle}</div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </button>
            );
          })}

          {/* Logout Option */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-3.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-2xl transition-all text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <LogOut className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400">Log Out</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Sign out from your account</div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};
