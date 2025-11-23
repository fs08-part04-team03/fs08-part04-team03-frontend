'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { clsx } from '@/utils/clsx';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'signup';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  inactive?: boolean;
  rightIcon?: ReactNode;
}

const baseClass = clsx(
  'inline-flex items-center justify-center',
  'border rounded-default',
  'font-bold',
  'transition-colors duration-150',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-500',
  'disabled:opacity-40 disabled:cursor-not-allowed'
);

const variantClass: Record<ButtonVariant, string> = {
  primary: clsx('bg-gray-950 text-gray-50', 'hover:bg-gray-800', 'rounded-default'),
  secondary: clsx('bg-gray-300 text-gray-900', 'hover:bg-gray-50'),
};

const inactiveClass = clsx('bg-gray-100 text-gray-300 border-gray-200', 'cursor-not-allowed');

const sizeClass: Record<ButtonSize, string> = {
  xxs: clsx('w-105 h-44 text-14'),
  xs: clsx('w-153 h-64 text-16'),
  sm: clsx('w-216 h-64 text-16'),
  md: clsx('w-300 h-64 text-16'),
  lg: clsx('w-480 h-64 text-16'),
  xl: clsx('w-496 h-64 text-16'),
  xxl: clsx('w-610 h-64 text-16'),
  signup: clsx('w-130 h-44 text-16 rounded-100'),
};

const Button = ({
  variant = 'primary',
  size = 'lg',
  inactive,
  rightIcon,
  children,
  className,
  onClick,
  onFocus,
  onBlur,
  id,
  'aria-label': ariaLabel,
}: ButtonProps) => (
  <button
    type="button"
    id={id}
    className={clsx(
      baseClass,
      inactive ? inactiveClass : variantClass[variant],
      sizeClass[size],
      {
        'cursor-not-allowed': inactive,
      },
      className
    )}
    aria-label={ariaLabel}
    onClick={inactive ? undefined : onClick}
    onFocus={inactive ? undefined : onFocus}
    onBlur={inactive ? undefined : onBlur}
  >
    <span>{children}</span>
    {rightIcon}
  </button>
);

export default Button;
