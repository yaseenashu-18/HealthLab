import React from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps {
  name: string;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  showBadge = false,
  className,
}) => {
  const getInitials = (n: string) => {
    if (!n) return 'U';
    const parts = n.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return n.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const badgeSizeClasses = {
    sm: 'w-2.5 h-2.5 right-0 bottom-0 ring-1',
    md: 'w-3 h-3 right-0 bottom-0 ring-2',
    lg: 'w-3.5 h-3.5 right-0.5 bottom-0.5 ring-2',
    xl: 'w-4 h-4 right-1 bottom-1 ring-2',
  };

  return (
    <div className="relative inline-block select-none">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full object-cover border border-slate-200 dark:border-slate-700 shadow-2xs',
            sizeClasses[size],
            className
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-bold flex items-center justify-center border border-emerald-400/30 shadow-health-sm',
            sizeClasses[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}

      {showBadge && (
        <span
          className={cn(
            'absolute rounded-full bg-emerald-500 ring-white dark:ring-slate-900',
            badgeSizeClasses[size]
          )}
          title="Online"
        />
      )}
    </div>
  );
};
