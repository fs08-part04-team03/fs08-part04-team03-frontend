'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export type RoleBadgeRole = 'user' | 'manager';

export interface RoleBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'role'> {
  role: RoleBadgeRole;
  className?: string;
}

const roleStyles: Record<RoleBadgeRole, string> = {
  user: clsx('bg-gray-50', 'text-gray-500'),
  manager: clsx('bg-gray-700', 'text-white'),
};

const RoleBadge = forwardRef<HTMLSpanElement, RoleBadgeProps>(
  ({ role, className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(
        'inline-flex',
        'justify-center items-center',
        'w-51 h-23 tablet:w-64 tablet:h-30 desktop:w-64 desktop:h-30',
        'rounded-100',
        'text-12 tablet:text-14 desktop:text-14',
        'font-bold leading-normal',
        roleStyles[role],
        className
      )}
      style={{
        fontFamily: 'SUIT, var(--font-family-base), sans-serif',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </span>
  )
);

RoleBadge.displayName = 'RoleBadge';

export default RoleBadge;
