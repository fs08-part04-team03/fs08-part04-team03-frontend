import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type AvatarSize = 24 | 32;
type AvatarBgColor = 'gray-100' | 'gray-50';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  bgColor?: AvatarBgColor;
}

const sizeClass: Record<AvatarSize, string> = {
  24: 'w-24 h-24',
  32: 'w-32 h-32',
};

const iconSizeClass: Record<AvatarSize, number> = {
  24: 12,
  32: 16,
};

const bgColorClass: Record<AvatarBgColor, string> = {
  'gray-100': 'bg-gray-100',
  'gray-50': 'bg-gray-50',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'avatar',
  name,
  size = 32,
  bgColor = 'gray-100',
  className,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  style,
  id,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
    }
    onKeyDown?.(event);
  };

  const renderContent = () => {
    if (src) {
      return <img src={src} alt={alt} className="h-full w-full object-cover rounded-full" />;
    }
    if (name) {
      const firstChar = name.charAt(0).toUpperCase();
      const fontSize = size === 24 ? 'text-10' : 'text-14';
      return (
        <span className={clsx('font-medium text-gray-950 tracking--0.25', fontSize)}>
          {firstChar}
        </span>
      );
    }
    return (
      <Image
        src="/icons/user-default.svg"
        alt="Default user avatar"
        width={iconSizeClass[size]}
        height={iconSizeClass[size]}
        className="shrink-0"
      />
    );
  };

  const baseClassName = clsx(
    'relative flex items-center justify-center overflow-hidden rounded-full',
    sizeClass[size],
    bgColorClass[bgColor],
    className
  );

  if (onClick) {
    return (
      <div
        className={baseClassName}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        role="button"
        tabIndex={0}
      >
        {renderContent()}
      </div>
    );
  }

  if (onKeyDown) {
    return (
      <div
        className={baseClassName}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={style}
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        role="button"
        tabIndex={0}
      >
        {renderContent()}
      </div>
    );
  }

  return (
    <div
      className={baseClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {renderContent()}
    </div>
  );
};
