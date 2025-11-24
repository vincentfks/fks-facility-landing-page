import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/25 border border-transparent',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 shadow-lg shadow-secondary-500/25 border border-transparent',
        accent: 'bg-accent-600 text-white hover:bg-accent-700 shadow-lg shadow-accent-500/25 border border-transparent',
        outline: 'bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-200 hover:bg-primary-50/50 hover:text-primary-700',
        ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-14 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.memo(React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
));

Button.displayName = 'Button';

export { Button, buttonVariants };
