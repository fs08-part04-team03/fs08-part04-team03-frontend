'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { clsx } from '@/utils/clsx';

type ButtonVariant = 'primary' | 'secondary' | 'signup';
type ButtonSize = 'sm' | 'md' | 'lg';

// ✨ type 허용: 'button' | 'submit' | 'reset'
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  type?: 'button' | 'submit' | 'reset';
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
  size,
  fullWidth = false,
  inactive,
  rightIcon,
  children,
  className,
  type = 'button', // ✨ 기본 button
  ...rest
}: ButtonProps) => {
  const isSignup = variant === 'signup';

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={inactive}
      className={clsx(
        baseClass,
        inactive ? inactiveClass : variantClass[variant],
        !isSignup && size && sizeClass[size],
        isSignup && 'w-160 h-44 text-14 px-20 rounded-100',
        fullWidth && 'w-full',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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
  type = 'button', // ✨ signup도 type 적용 가능
  'aria-label': ariaLabel,
  fullWidth,
}: Omit<ButtonProps, 'variant'>) => (
  <Button
    type={type}
    variant="signup"
    inactive={inactive}
    rightIcon={rightIcon}
    fullWidth={fullWidth}
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
