import React from 'react';
import { cn } from '../../utils/cn';

interface StatusBadgeProps {
  status: 'verified' | 'pending' | 'unverified' | 'active' | 'completed' | 'urgent';
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md', className }) => {
  const styles = {
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    completed: 'bg-sky-50 text-sky-700 border-sky-200/70',
    pending: 'bg-amber-50 text-amber-700 border-amber-200/70',
    unverified: 'bg-slate-100 text-slate-600 border-slate-200',
    urgent: 'bg-rose-50 text-rose-700 border-rose-200/70',
  };

  const defaultLabels = {
    verified: 'Verified',
    active: 'Active',
    completed: 'Completed',
    pending: 'Pending Review',
    unverified: 'Unverified',
    urgent: 'Urgent',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border shadow-2xs select-none',
        styles[status],
        sizeClasses[size],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />
      <span>{label || defaultLabels[status]}</span>
    </span>
  );
};
