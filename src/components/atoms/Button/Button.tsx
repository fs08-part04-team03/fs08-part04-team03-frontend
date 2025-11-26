'use client';

/* eslint-disable react/button-has-type */
import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';

type ButtonVariant = 'primary' | 'secondary' | 'signup';
type ButtonSize =
  | '5xs'
  | '4xs'
  | '3xs'
  | '2xs'
  | 'xs'
  | 'sm'
  | 'base'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  inactive?: boolean;
  rightIcon?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
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
  signup: clsx('bg-black text-white', 'hover:bg-gray-800', 'w-130 h-44 text-16 rounded-100'),
};

const inactiveClass = clsx(
  'bg-gray-100 text-gray-300',
  'border border-gray-200',
  'cursor-not-allowed',
  'rounded-default'
);

const sizeClass: Record<ButtonSize, string> = {
  '5xs': clsx('w-88 h-40 text-13'),
  '4xs': clsx('w-99 h-44 text-13'),
  '3xs': clsx('w-105 h-44 text-14'),
  '2xs': clsx('w-153 h-64 text-16'),
  xs: clsx('w-216 h-64 text-16'),
  sm: clsx('w-296 h-64 text-16'),
  md: clsx('w-328 h-64 text-16'),
  lg: clsx('w-480 h-64 text-16'),
  xl: clsx('w-496 h-64 text-16'),
  '2xl': clsx('w-610 h-64 text-16'),
  '3xl': clsx('w-1180 h-64 text-16'),
  base: clsx('w-300 h-64 text-16'),
};

const Button = ({
  variant = 'primary',
  size = 'lg',
  inactive,
  rightIcon,
  className,
  children,
  type = 'button',
  id,
  'aria-label': ariaLabel,
  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
  onKeyUp,
  style,
  tabIndex,
  role,
  'aria-describedby': ariaDescribedBy,
  'aria-labelledby': ariaLabelledBy,
}: ButtonProps) => {
  // signup variant는 자체적으로 크기를 포함하므로 size를 무시
  const shouldApplySize = variant !== 'signup';

  return (
    <button
      type={type}
      id={id}
      disabled={inactive}
      className={clsx(
        baseClass,
        inactive ? inactiveClass : variantClass[variant],
        shouldApplySize && sizeClass[size],
        className
      )}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-labelledby={ariaLabelledBy}
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
    >
      <span>{children}</span>
      {rightIcon}
    </button>
  );
};

export default Button;

// 더보기 버튼 (variant='secondary' 고정)
export const MoreButton = ({
  size = 'md',
  inactive,
  className,
  onClick,
  onFocus,
  onBlur,
  id,
  'aria-label': ariaLabel,
}: Omit<ButtonProps, 'variant' | 'rightIcon' | 'children'>) => (
  <Button
    variant="secondary"
    size={size}
    inactive={inactive}
    rightIcon={
      <Image src="/icons/arrow-down.svg" alt="" width={12} height={7} className="shrink-0" />
    }
    className={clsx('gap-8', className)}
    onClick={onClick}
    onFocus={onFocus}
    onBlur={onBlur}
    id={id}
    aria-label={ariaLabel}
  >
    더보기
  </Button>
);

// 상품등록 버튼 (variant='signup' 고정, size는 variant에 포함됨)
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
}: Omit<ButtonProps, 'variant' | 'size'>) => (
  <Button
    variant="signup"
    inactive={inactive}
    rightIcon={rightIcon}
    className={className}
    onClick={onClick}
    onFocus={onFocus}
    onBlur={onBlur}
    id={id}
    aria-label={ariaLabel}
  >
    {children}
  </Button>
);
