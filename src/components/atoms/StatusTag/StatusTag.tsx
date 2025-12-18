'use client';

import React, { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from '@/utils/clsx';

export type StatusTagVariant = 'approved' | 'rejected' | 'urgent' | 'pending';

export interface StatusTagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: StatusTagVariant;
  className?: string;
}

const variantStyles: Record<StatusTagVariant, string> = {
  approved: clsx('bg-blue-100', 'text-blue-200'),
  rejected: clsx('bg-black-100', 'text-gray-50'),
  urgent: clsx('bg-red-100', 'text-red'),
  pending: clsx('bg-gray-100', 'text-gray-950'),
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

const UrgentIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 17.305261285189772 14.846161464987745"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.204633864022981,13.767933914716195L9.267567209482877.350705479572753c-.276616767358064-.467607306096397-.953256366417918-.467607306096397-1.229873133775982,0L.100627421165882,13.767933914716195c-.281740519237246.476268761567553.061563582425151,1.078227550271549.61492571830513,1.078227550271549h15.874155006247747c.553362135880889,0,.896666237542377-.601958788703996.614925718304221-1.078227550271549ZM9.297161892594886,4.251984218893995l-.1875,6.2386474609375h-.9130859375l-.1884765625-6.2386474609375h1.2890625ZM8.652630642594886,13.155548672018995c-.4697265625,0-.7919921875-.3507080078125-.7919921875-.805419921875,0-.46795654296875.3359375-.806396484375.7919921875-.806396484375.4833984375,0,.79248046875.33843994140625.79248046875.806396484375,0,.4547119140625-.30908203125.805419921875-.79248046875.805419921875Z"
      fill="currentColor"
    />
  </svg>
);

const variantIcons: Record<StatusTagVariant, React.ReactNode> = {
  approved: <CheckCircleIcon />,
  rejected: <CloseCircleIcon />,
  urgent: <UrgentIcon />,
  pending: <TimeIcon />,
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
        'text-14 font-bold leading-normal tracking--0.3px',
        variantStyles[variant],
        className
      )}
      style={{
        fontFamily: 'SUIT, var(--font-family-base), sans-serif',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <span className="shrink-0">{variantIcons[variant]}</span>
      <span>{children}</span>
    </span>
  )
);

StatusTag.displayName = 'StatusTag';

export default StatusTag;
