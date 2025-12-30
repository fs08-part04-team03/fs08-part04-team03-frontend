'use client';

import React, { forwardRef, useState, useId } from 'react';
import { clsx } from '@/utils/clsx';

export interface FloatingLabelInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'className'
> {
  label: string;
  error?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
}

const FloatingLabelInput = forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  (
    {
      className,
      label,
      error = false,
      showPasswordToggle = false,
      type = 'text',
      value,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const [showPassword, setShowPassword] = useState(false);
    const hasValue = value !== undefined && value !== '';
    const isDisabled = props.disabled;

    const inputId = id || generatedId;

    let inputType = type;
    if (showPasswordToggle) {
      inputType = showPassword ? 'text' : 'password';
    }

    const getBorderColor = () => {
      if (error) return 'border-error-500';
      if (isDisabled) return 'border-gray-200';
      if (hasValue) return 'border-gray-950';
      return 'border-gray-600';
    };

    const getTextColor = () => {
      if (isDisabled) return 'text-gray-300 cursor-not-allowed';
      if (hasValue) return 'text-gray-950';
      return 'text-gray-500 placeholder:text-gray-500';
    };

    return (
      <div
        className={clsx(
          'relative flex h-56 px-4 py-8',
          'border-b border-t-0 border-l-0 border-r-0',
          getBorderColor(),
          hasValue || isDisabled ? 'flex-col justify-between' : 'items-center justify-between',
          className
        )}
      >
        {(hasValue || isDisabled) && (
          <label
            htmlFor={inputId}
            className={clsx(
              'text-12 tracking--0.3 leading-normal',
              isDisabled ? 'text-gray-500' : 'text-gray-600'
            )}
          >
            {label}
          </label>
        )}
        <div className="flex items-center justify-between w-full gap-4">
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={value}
            placeholder={hasValue || isDisabled ? undefined : label}
            className={clsx(
              'flex-1 bg-transparent outline-none border-none p-0',
              'text-16 tracking--0.4 leading-normal',
              getTextColor()
            )}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
          {showPasswordToggle && !isDisabled && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="flex items-center justify-center w-20 h-20 shrink-0"
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {showPassword ? (
                  <>
                    <path
                      d="M2.5 10C2.5 10 5 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.5 10 15 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10Z"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ) : (
                  <>
                    <path
                      d="M2.5 2.5L17.5 17.5"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.82 8.82C8.42848 9.21151 8.20312 9.74696 8.20312 10.305C8.20312 10.863 8.42848 11.3985 8.82 11.79C9.21151 12.1815 9.74696 12.4069 10.305 12.4069C10.863 12.4069 11.3985 12.1815 11.79 11.79"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.4167 14.4167C13.0833 15.4167 11.5833 15.8333 10 15.8333C5 15.8333 2.5 10 2.5 10C3.25 8.41667 4.25 7.08333 5.58333 5.58333M8.33333 4.58333C8.88333 4.41667 9.43333 4.16667 10 4.16667C15 4.16667 17.5 10 17.5 10C17.0833 10.9167 16.5833 11.75 16 12.5"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

export default FloatingLabelInput;
