'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export interface StatusTagProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const StatusTag = forwardRef<HTMLSpanElement, StatusTagProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(
        'flex',
        'w-[72px] h-[30px]',
        'px-[8px] py-[6px]',
        'justify-center items-center gap-[4px]',
        'rounded-[100px]',
        'bg-gray-100',
        'text-12 font-medium leading-normal tracking-[-0.3px]',
        'text-gray-700',
        className
      )}
      style={{
        background: 'var(--gray-primary-100, #E5E5E5)',
        fontFamily: 'SUIT, var(--font-family-base), sans-serif',
      }}
      {...props}
    >
      {children}
    </span>
  )
);

StatusTag.displayName = 'StatusTag';

export default StatusTag;

