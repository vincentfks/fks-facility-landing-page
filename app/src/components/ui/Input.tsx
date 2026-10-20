import React from 'react';
import { cn } from '../../lib/cn';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.memo(React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full group">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2 group-focus-within:text-primary-600 transition-colors">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-base text-gray-900 transition-all duration-200',
            'placeholder:text-gray-400',
            'hover:bg-white hover:border-gray-300',
            'focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-red-50/30',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1">
            {error}
          </p>
        )}
      </div>
    );
  }
));

Input.displayName = 'Input';

export { Input };
