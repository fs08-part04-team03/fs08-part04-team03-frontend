'use client';

import { forwardRef, type LabelHTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={clsx(
      'self-stretch',
      'text-gray-500',
      'text-12 font-normal leading-normal tracking-[-0.3px]',
      'font-[var(--font-family-base)]',
      className
    )}
    style={{ color: 'var(--gray-primary-500, #878787)', fontFamily: 'SUIT, var(--font-family-base), sans-serif' }}
    {...props}
  >
    {children}
  </label>
));

Label.displayName = 'Label';

export default Label;

