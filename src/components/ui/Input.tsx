import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  forceLightMode?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, forceLightMode = false, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className={cn("block text-xs font-semibold uppercase tracking-wider", forceLightMode ? "text-slate-700" : "text-slate-700 dark:text-slate-300")}>
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className={cn("absolute left-3.5 pointer-events-none", forceLightMode ? "text-slate-400" : "text-slate-400 dark:text-slate-500")}>
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full text-sm rounded-xl border py-2.5 px-3.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs',
              forceLightMode
                ? 'bg-white text-slate-900 placeholder:text-slate-400 border-slate-200 focus:border-emerald-600'
                : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 border-slate-200 dark:border-slate-800 focus:border-emerald-600 dark:focus:border-emerald-500',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-rose-500 focus:ring-rose-500/20 focus:border-rose-500',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className={cn("absolute right-3.5", forceLightMode ? "text-slate-400" : "text-slate-400 dark:text-slate-500")}>
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs font-medium text-rose-600">{error}</p>
        ) : helperText ? (
          <p className={cn("text-xs", forceLightMode ? "text-slate-500" : "text-slate-500 dark:text-slate-400")}>{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
