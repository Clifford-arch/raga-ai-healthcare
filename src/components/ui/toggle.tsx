'use client';

import { cn } from '@/lib/utils';

interface ToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ToggleProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Toggle({ options, value, onChange, className }: ToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center p-1 rounded-lg bg-gray-100 dark:bg-gray-800',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
            value === option.value
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
