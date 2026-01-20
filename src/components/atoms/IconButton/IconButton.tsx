import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';

type IconButtonVariant = 'default' | 'filled' | 'outline';
type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
};

const baseClass =
  'inline-flex items-center justify-center rounded-full cursor-pointer transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ' +
  'disabled:opacity-40 disabled:cursor-not-allowed';

const variantClass: Record<IconButtonVariant, string> = {
  default: 'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
  outline: 'border border-gray-200 text-gray-900 hover:bg-gray-50 active:bg-gray-100',
  filled: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700',
};

const sizeClass: Record<IconButtonSize, string> = {
  sm: 'w-20 h-20 text-xs',
  md: 'w-32 h-32 text-sm',
  lg: 'w-36 h-36 text-base',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(baseClass, variantClass[variant], sizeClass[size], className)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </button>
  )
);

IconButton.displayName = 'IconButton';
