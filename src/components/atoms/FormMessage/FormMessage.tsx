'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export interface FormMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={clsx(
        'flex-1',
        'text-14 font-normal leading-normal tracking-[-0.35px]',
        'font-[var(--font-family-base)]',
        className
      )}
      style={{
        color: 'var(--Status-error-500, var(--error, #F31D1D))',
        background: 'var(--error, #F31D1D)',
        fontFamily: 'SUIT, var(--font-family-base), sans-serif',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </p>
  )
);

FormMessage.displayName = 'FormMessage';

export default FormMessage;
