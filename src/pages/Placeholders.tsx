import React from 'react';
import { TopHeader } from '../components/layout/TopHeader';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, CalendarPlus, Bot, User, Lock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const ModulePlaceholder: React.FC<{
  title: string;
  description: string;
  icon: React.ElementType;
  phase: string;
}> = ({ title, description, icon: Icon, phase }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-12">
      <TopHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 text-center space-y-6">
        <Card className="p-8 sm:p-12 space-y-6 bg-white shadow-health-md border-slate-200">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-2xs">
            <Icon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Phase 1 Architecture Ready • {phase}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">{description}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-900 max-w-md mx-auto flex items-center gap-3 text-left">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Authentication Phase 1 is complete! This module will be fully built out in the upcoming phase as instructed.
            </span>
          </div>

          <div>
            <Link to="/home">
              <Button variant="primary" size="md">
                Return to Home Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export const ReportsPlaceholder: React.FC = () => (
  <ModulePlaceholder
    title="Medical Reports Center"
    description="Access your lab results, download official diagnostic reports, view abnormal indicators, and share secure PDFs with doctors."
    icon={FileText}
    phase="Phase 2 Module"
  />
);

export const BookTestPlaceholder: React.FC = () => (
  <ModulePlaceholder
    title="Diagnostic Tests & Packages"
    description="Browse individual blood tests, full body packages, select sample collection address, choose time slots, and track lab collection."
    icon={CalendarPlus}
    phase="Phase 3 Module"
  />
);

export const HealthAiPlaceholder: React.FC = () => (
  <ModulePlaceholder
    title="Health AI Assistant"
    description="Ask symptom questions, interpret diagnostic parameters, review medicine information, and track health vitals with AI insights."
    icon={Bot}
    phase="Phase 4 Module"
  />
);

export const ProfilePlaceholder: React.FC = () => (
  <ModulePlaceholder
    title="User Profile & Health Settings"
    description="Manage personal account info, health profile, consultation history, prescriptions, insurance, and billing methods."
    icon={User}
    phase="Phase 5 Module"
  />
);
