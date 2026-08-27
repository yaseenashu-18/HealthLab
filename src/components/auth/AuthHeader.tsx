import React from 'react';
import { Activity } from 'lucide-react';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center sm:text-left space-y-2 mb-6">
      <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-2">
        <Activity className="w-4 h-4 text-emerald-600 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide uppercase">HealthLab AI</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-sm text-slate-600 leading-relaxed">{subtitle}</p>
    </div>
  );
};
