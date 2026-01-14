'use client';

import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export interface TextAreaFieldProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'placeholder'
> {
  label?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, placeholder, error = false, className, ...props }, ref) => {
    const uniqueId = useId();
    const inputId = label ? `textarea-${uniqueId}` : undefined;

    return (
      <div className={clsx('flex flex-col', className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={clsx('text-16 font-bold text-gray-950 tracking-tight mb-1')}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          placeholder={placeholder}
          className={clsx(
            'w-full tablet:w-480 h-140',
            'px-12 py-8',
            'text-16 tracking-tight',
            'font-sans font-normal text-gray-950',
            'border border-gray-300 rounded-default',
            'bg-transparent',
            'resize-none',
            'focus:outline-none focus:border-gray-500',
            error && 'border-error-500 focus:border-error-500',
            'placeholder:text-gray-500',
            'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed'
          )}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
    );
  }
);

TextAreaField.displayName = 'TextAreaField';

export default TextAreaField;
