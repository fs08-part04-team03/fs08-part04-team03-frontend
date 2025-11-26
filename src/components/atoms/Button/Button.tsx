'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { clsx } from '@/utils/clsx';

type ButtonVariant = 'primary' | 'secondary' | 'signup';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  inactive?: boolean;
  rightIcon?: ReactNode;
}

const baseClass = clsx(
  'inline-flex items-center justify-center',
  'font-bold',
  'transition-colors duration-150',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-500',
  'disabled:opacity-40 disabled:cursor-not-allowed'
);

const variantClass: Record<ButtonVariant, string> = {
  primary: clsx('bg-gray-950 text-gray-50', 'hover:bg-gray-800', 'rounded-default'),
  secondary: clsx(
    'bg-white text-gray-900',
    'border border-gray-900',
    'hover:bg-gray-25',
    'rounded-default'
  ),
  signup: clsx('bg-black text-white', 'hover:bg-gray-700'),
};

const inactiveClass = clsx(
  'bg-gray-100 text-gray-300 border border-gray-200',
  'cursor-not-allowed',
  'rounded-default'
);

const sizeClass: Record<ButtonSize, string> = {
  sm: clsx('h-40 text-13 px-16'),
  md: clsx('h-44 text-14 px-20'),
  lg: clsx('h-64 text-16 px-24'),
};

const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  inactive,
  rightIcon,
  children,
  className,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  id,
  style,
  tabIndex,
  role,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
}: ButtonProps) => {
  // signup variant는 자체 스타일을 가짐
  const isSignup = variant === 'signup';

  return (
    <button
      type="button"
      id={id}
      disabled={inactive}
      className={clsx(
        baseClass,
        inactive ? inactiveClass : variantClass[variant],
        !isSignup && sizeClass[size],
        isSignup && 'w-160 h-44 text-16 px-20 rounded-100',
        fullWidth && 'w-full',
        className
      )}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      style={style}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
    >
      <span>{children}</span>
      {rightIcon}
    </button>
  );
};

export default Button;

// 상품등록 버튼 (variant='signup' 고정)
export const SignupButton = ({
  inactive,
  rightIcon,
  children,
  className,
  onClick,
  onFocus,
  onBlur,
  id,
  'aria-label': ariaLabel,
}: Omit<ButtonProps, 'variant'>) => (
  <Button
    variant="signup"
    inactive={inactive}
    rightIcon={rightIcon}
    className={clsx('gap-4', className)}
    onClick={onClick}
    onFocus={onFocus}
    onBlur={onBlur}
    id={id}
    aria-label={ariaLabel}
  >
    {children}
  </Button>
);
