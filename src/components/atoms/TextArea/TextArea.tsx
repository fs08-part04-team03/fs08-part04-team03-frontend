'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export interface TextAreaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'placeholder'
> {
  placeholder?: string;
  error?: boolean;
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, placeholder, error = false, ...props }, ref) => (
    <textarea
      ref={ref}
      placeholder={placeholder}
      className={clsx(
        'flex',
        'w-570 h-165',
        'p-6',
        'items-start',
        'gap-2',
        'rounded-default',
        'border',
        error ? 'border-error-500' : 'border-[#D1D1D1]',
        'bg-white',
        'text-gray-950 placeholder:text-gray-500',
        'focus:outline-none',
        error ? 'focus:border-error-500' : 'focus:border-gray-950',
        'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed',
        'resize-none',
        className
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  )
);

TextArea.displayName = 'TextArea';

export default TextArea;
