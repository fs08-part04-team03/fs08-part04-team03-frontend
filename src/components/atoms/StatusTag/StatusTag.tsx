'use client';

import React, { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export type StatusTagVariant = 'approved' | 'rejected' | 'cancelled' | 'pending' | 'urgent';

export interface StatusTagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusTagVariant;
  className?: string;
}

const variantStyles: Record<StatusTagVariant, string> = {
  approved: clsx('bg-blue-100', 'text-blue-200'),
  rejected: clsx('bg-red-100', 'text-red'),
  cancelled: clsx('bg-black-100', 'text-gray-50'),
  pending: clsx('bg-gray-100', 'text-gray-950'),
  urgent: clsx('bg-[#F2F6FF]', 'text-[#4C8AE1]'),
};

/**
 * 각 variant별 아이콘 컴포넌트
 */
const CheckCircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.0254 13.7617L7.92676 10.5732L6.85156 11.6182L11.0107 15.8984L17.4023 9.50684L16.3418 8.44629L11.0254 13.7617Z"
      fill="currentColor"
    />
  </svg>
);

const CloseCircleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.999 10.9395L8.28711 7.22656L7.22559 8.28809L10.9385 12L7.22559 15.7119L8.28711 16.7734L11.999 13.0605L15.7109 16.7734L16.7715 15.7119L13.0596 12L16.7715 8.28809L15.7109 7.22656L11.999 10.9395Z"
      fill="currentColor"
    />
  </svg>
);

const TimeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5V22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22V20.5C16.6944 20.5 20.5 16.6944 20.5 12Z"
      fill="currentColor"
    />
    <path d="M11.25 6.90527H12.75V11.25H16.3281V12.75H11.25V6.90527Z" fill="currentColor" />
  </svg>
);

const CloseCircleWhiteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.999 10.9395L8.28711 7.22656L7.22559 8.28809L10.9385 12L7.22559 15.7119L8.28711 16.7734L11.999 13.0605L15.7109 16.7734L16.7715 15.7119L13.0596 12L16.7715 8.28809L15.7109 7.22656L11.999 10.9395Z"
      fill="white"
    />
  </svg>
);

const variantIcons: Record<StatusTagVariant, React.ReactNode | null> = {
  approved: <CheckCircleIcon />,
  rejected: <CloseCircleIcon />,
  cancelled: <CloseCircleWhiteIcon />,
  pending: <TimeIcon />,
  urgent: null,
};

const variantLabels: Record<StatusTagVariant, string> = {
  approved: '승인',
  rejected: '거절',
  cancelled: '취소',
  pending: '대기중',
  urgent: '즉시 요청',
};

const StatusTag = forwardRef<HTMLSpanElement, StatusTagProps>(
  ({ variant = 'pending', className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(
        'flex',
        'w-72 h-30',
        'px-8 py-6',
        'justify-center items-center',
        'gap-4',
        'rounded-100',
        'text-13 font-bold leading-normal tracking--0.3px',
        variantStyles[variant],
        className
      )}
      style={{
        fontFamily: 'SUIT, var(--font-family-base), sans-serif',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {variantIcons[variant] && <span className="shrink-0">{variantIcons[variant]}</span>}
      <span>{children || variantLabels[variant]}</span>
    </span>
  )
);

StatusTag.displayName = 'StatusTag';

export default StatusTag;
