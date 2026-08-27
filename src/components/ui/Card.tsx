import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'flat';
  hoverable?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverable = false,
  className,
  ...props
}) => {
  const baseStyles = 'rounded-3xl transition-all duration-200';

  const variantStyles = {
    default: 'bg-white dark:bg-[#121215] border border-slate-200/80 dark:border-zinc-800/80 shadow-2xs text-slate-900 dark:text-zinc-100',
    outline: 'bg-transparent border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100',
    flat: 'bg-slate-100/80 dark:bg-zinc-800/80 border border-transparent text-slate-900 dark:text-zinc-100',
  };

  const hoverStyles = hoverable
    ? 'hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-600/60 hover:-translate-y-0.5'
    : '';

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};
