import React from 'react';
import { UserRole } from '../../types';
import { User, Stethoscope, TestTube2, Building2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
  label?: string;
  forceLightMode?: boolean;
}

export const rolesList: { id: UserRole; label: string; icon: React.ElementType }[] = [
  { id: 'user', label: 'User', icon: User },
  { id: 'doctor', label: 'Doctor', icon: Stethoscope },
  { id: 'lab_technician', label: 'Lab Technicians', icon: TestTube2 },
  { id: 'pharmacy', label: 'Pharmacies', icon: Building2 },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  value,
  onChange,
  label = 'Select Account Role',
  forceLightMode = false,
}) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className={cn("block text-[11px] font-semibold uppercase tracking-wider", forceLightMode ? "text-slate-700" : "text-slate-700 dark:text-slate-300")}>
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {rolesList.map((item) => {
          const Icon = item.icon;
          const isSelected = value === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={cn(
                'flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl border text-[11px] font-medium transition-all duration-150 select-none',
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-semibold'
                  : forceLightMode
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-300'
                  : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600'
              )}
            >
              <Icon className={cn('w-3.5 h-3.5 stroke-[1.5] shrink-0', isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400')} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
