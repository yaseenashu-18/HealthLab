import React from 'react';
import { HeartPulse, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center lg:flex-row lg:items-stretch overflow-hidden select-none">
      {/* 
        Fixed screen background image layer 
        - pointer-events-none, user-select: none, -webkit-touch-callout: none
        - Prevents downloading/context menu on long-click or right-click
      */}
      <div
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat pointer-events-none select-none z-0"
        style={{
          backgroundImage: `url('/assets/images/Create_healthcare_website_backgr._2K_202608272126.jpeg')`,
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
        aria-hidden="true"
      />

      {/* Dark & Glassmorphism Overlay */}
      <div className="fixed inset-0 w-full h-full bg-slate-950/65 backdrop-blur-xs pointer-events-none z-0" />

      {/* Left side hero showcase (Desktop) */}
      <div className="relative z-10 hidden lg:flex lg:w-1/2 text-white p-12 flex-col justify-between overflow-hidden">
        {/* Top Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center backdrop-blur-md">
            <HeartPulse className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            HealthLab <span className="text-emerald-400">AI</span>
          </span>
        </div>

        {/* Central visual graphic card */}
        <div className="max-w-lg space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Next-Generation Healthcare Intelligence</span>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md">
            Integrated Diagnostics, Consultations & AI Insights.
          </h2>

          <p className="text-slate-200 text-base leading-relaxed font-normal drop-shadow-xs">
            Book diagnostic tests, access medical laboratory reports, consult certified doctors, and leverage intelligent Health AI guidance—all directly on your home dashboard.
          </p>

          {/* Quick feature highlights */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-slate-900/60 border border-white/15 rounded-2xl p-4 backdrop-blur-md shadow-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
              <h3 className="font-semibold text-sm text-white">HIPAA & Privacy First</h3>
              <p className="text-xs text-slate-300 mt-1">Encrypted medical records & confidential data protection.</p>
            </div>
            <div className="bg-slate-900/60 border border-white/15 rounded-2xl p-4 backdrop-blur-md shadow-lg">
              <Stethoscope className="w-5 h-5 text-teal-400 mb-2" />
              <h3 className="font-semibold text-sm text-white">Verified Doctors</h3>
              <p className="text-xs text-slate-300 mt-1">At-home sample collection and online video consultations.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-300 flex items-center justify-between border-t border-white/15 pt-4">
          <span>&copy; {new Date().getFullYear()} HealthLab AI. All rights reserved.</span>
          <span className="font-medium text-emerald-400">Fixed HD Visual System</span>
        </div>
      </div>

      {/* Right side form container (with Glassmorphism Card) */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12 min-h-screen lg:min-h-0">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
