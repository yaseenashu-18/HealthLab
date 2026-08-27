import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, CalendarPlus, Bot, User } from 'lucide-react';
import { cn } from '../../utils/cn';

export const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/book-test', label: 'Book a Test', icon: CalendarPlus },
  { path: '/health-ai', label: 'Health AI', icon: Bot, isAi: true },
  { path: '/profile', label: 'Profile', icon: User },
];

export const BottomNavigation: React.FC = () => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1.5"
      aria-label="Main Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center py-1 px-2 min-w-[64px] rounded-xl transition-all duration-200 text-xs font-medium',
                  isActive
                    ? item.isAi
                      ? 'text-teal-600 font-semibold'
                      : 'text-brand-primary font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      'p-1 rounded-xl transition-all duration-200',
                      isActive
                        ? item.isAi
                          ? 'bg-teal-50 text-teal-600 scale-105'
                          : 'bg-emerald-50 text-brand-primary scale-105'
                        : 'bg-transparent'
                    )}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="mt-0.5 text-[11px] leading-tight tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
