'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  placeholder?: string;
  error?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', placeholder, error = false, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={clsx(
        'text-16 tracking-[-0.4px]',
        'h-56 px-1 py-2 bg-transparent',
        'border-b',
        error ? 'border-error-500' : 'border-gray-600',
        'text-gray-950 placeholder:text-gray-500',
        'focus:outline-none',
        error ? 'focus:border-error-500' : 'focus:border-gray-950',
        'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed',
        'w-full',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
);

Input.displayName = 'Input';

export default Input;
