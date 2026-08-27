import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HeartPulse, Bell, LogIn, UserPlus, Sun, Moon, Laptop, Check, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { useToast } from '../../hooks/useToast';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { navItems } from './BottomNavigation';
import { cn } from '../../utils/cn';

export const TopHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    showToast('Signed Out', 'You have been logged out successfully.', 'info');
    navigate('/signin');
  };

  const themeOptions: { id: ThemeMode; label: string; icon: React.ElementType }[] = [
    { id: 'light', label: 'Light Mode', icon: Sun },
    { id: 'dark', label: 'Dark Mode', icon: Moon },
    { id: 'system', label: 'System Default', icon: Laptop },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-[#09090b]/80 backdrop-blur-2xl border-b border-slate-200/60 dark:border-zinc-800/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Brand Logo */}
        <div className="flex items-center gap-6">
          <NavLink to="/home" className="flex items-center gap-2.5 group select-none">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-health-sm group-hover:bg-emerald-700 transition-colors">
              <HeartPulse className="w-5 h-5 stroke-[1.5]" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
              HealthLab <span className="text-emerald-600 dark:text-emerald-400">AI</span>
            </span>
          </NavLink>

          {/* Desktop Navigation Links (Highlight ONLY icon & text on selection, NO box background) */}
          <nav className="hidden md:flex items-center gap-2 ml-4" aria-label="Desktop Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 px-3 py-2 text-sm transition-colors duration-150 select-none bg-transparent border-none',
                      isActive
                        ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
                        : 'text-slate-600 dark:text-zinc-400 font-medium hover:text-slate-900 dark:hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={cn('w-4 h-4 stroke-[1.5]', isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-zinc-400')} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* 1. Notification Bell */}
          <button
            type="button"
            className="p-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors relative"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.5]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950" />
          </button>

          {/* 2. Theme Toggle Dropdown (AFTER NOTIFICATION ICON) */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              type="button"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="p-2 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/50 dark:hover:bg-zinc-800/50 rounded-xl transition-colors flex items-center justify-center"
              title={`Theme: ${theme}`}
              aria-label="Toggle Theme Options"
            >
              {resolvedTheme === 'dark' ? (
                <Moon className="w-5 h-5 stroke-[1.5] text-amber-400" />
              ) : (
                <Sun className="w-5 h-5 stroke-[1.5] text-amber-500" />
              )}
            </button>

            {/* Theme Dropdown Menu */}
            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl p-1.5 space-y-0.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                  Select Theme
                </div>
                {themeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setTheme(opt.id);
                        setIsThemeOpen(false);
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all',
                        isSelected
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                          : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/70'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 stroke-[1.5]" />
                        <span>{opt.label}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[2]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Profile Avatar Dropdown Menu (NO GREEN DOT, CLICK OPENS LOGOUT MENU) */}
          {isAuthenticated && user ? (
            <div className="relative" ref={profileDropdownRef}>
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="transition-transform hover:scale-105 active:scale-95 flex items-center justify-center focus:outline-none"
                aria-label="User Profile Menu"
              >
                <Avatar name={user.name} src={user.avatar} showBadge={false} size="sm" />
              </button>

              {/* Profile Dropdown Popup Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xl p-2 space-y-1 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-zinc-800 space-y-0.5">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 capitalize">{user.role?.replace('_', ' ')}</p>
                  </div>

                  <NavLink
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                  >
                    <UserIcon className="w-4 h-4 stroke-[1.5] text-slate-500" />
                    <span>View Profile</span>
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all"
                  >
                    <LogOut className="w-4 h-4 stroke-[1.5]" />
                    <span>Sign Out / Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/signin">
                <Button variant="outline" size="sm" className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200" leftIcon={<LogIn className="w-3.5 h-3.5" />}>
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/signup" className="hidden sm:inline-block">
                <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" leftIcon={<UserPlus className="w-3.5 h-3.5" />}>
                  Sign Up
                </Button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
