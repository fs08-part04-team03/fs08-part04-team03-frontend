'use client';

import React from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { clsx } from '@/utils/clsx';

export type UserProfileVariant = 'default' | 'secondary';

export interface UserProfileBaseProps {
  name: string;
  company: {
    name: string;
  };
  avatarSrc?: string;
  profileHref?: string;
  className?: string;
}

export interface UserProfileProps extends UserProfileBaseProps {
  variant?: UserProfileVariant;
}

// 모바일 전용 (아바타만 표시)
export const UserProfileMobile: React.FC<UserProfileBaseProps> = ({
  name,
  avatarSrc,
  profileHref = '/me/profile',
  className,
  company: _company, // 모바일에서 사용하지 않지만 props 타입 일관성을 위해 유지
}) => (
  <Link
    href={profileHref}
    aria-label={`View ${name}'s profile`}
    className={clsx('flex items-center gap-8 hover:opacity-80 transition-opacity', className)}
  >
    <Avatar src={avatarSrc} alt={name} size={32} />
  </Link>
);

// 태블릿 전용
export const UserProfileTablet: React.FC<UserProfileBaseProps> = ({
  name,
  company,
  avatarSrc,
  profileHref = '/me/profile',
  className,
}) => (
  <Link
    href={profileHref}
    aria-label={`View ${name}'s profile`}
    className={clsx('flex items-center gap-8 hover:opacity-80 transition-opacity', className)}
  >
    <Avatar src={avatarSrc} alt={name} size={32} />
    <div className={clsx('flex flex-col leading-tight')}>
      <span className={clsx('text-14 font-normal text-gray-900')}>{name}</span>
      <span className={clsx('text-12 font-normal text-gray-900 truncate max-w-120')}>
        {company.name}
      </span>
    </div>
  </Link>
);

// 데스크탑 전용
export const UserProfileDesktop: React.FC<UserProfileBaseProps> = ({
  name,
  company,
  avatarSrc,
  profileHref = '/me/profile',
  className,
}) => (
  <Link
    href={profileHref}
    aria-label={`View ${name}'s profile`}
    className={clsx('flex items-center gap-8 hover:opacity-80 transition-opacity', className)}
  >
    <Avatar src={avatarSrc} alt={name} size={32} />
    <div className={clsx('flex flex-col leading-tight')}>
      <span className={clsx('text-14 font-normal text-gray-900')}>{name}</span>
      <span className={clsx('text-12 font-normal text-gray-900 truncate max-w-120')}>
        {company.name}
      </span>
    </div>
  </Link>
);

// UserProfileDefault: 모든 뷰포트에서 사용, 모바일에서도 아바타와 이름, 회사명 표시
// 사이즈 고정: 아바타 32x32, 이름 text-15
export const UserProfileDefault: React.FC<UserProfileBaseProps> = ({
  name,
  company,
  avatarSrc,
  profileHref = '/me/profile',
  className,
}) => (
  <Link
    href={profileHref}
    aria-label={`View ${name}'s profile`}
    className={clsx('flex items-center gap-8 hover:opacity-80 transition-opacity', className)}
  >
    <Avatar src={avatarSrc} alt={name} size={32} />
    <div className={clsx('flex flex-col leading-tight')}>
      <span className={clsx('text-15 font-normal text-gray-900')}>{name}</span>
      <span className={clsx('text-12 font-normal text-gray-900 truncate max-w-120')}>
        {company.name}
      </span>
    </div>
  </Link>
);

// Main UserProfile Component (통합 컴포넌트)
const UserProfile: React.FC<UserProfileProps> = ({
  name,
  company,
  avatarSrc,
  profileHref = '/me/profile',
  variant = 'secondary',
  className,
}) => {
  // variant가 'default'이면 모든 뷰포트에서 동일하게 표시
  if (variant === 'default') {
    return (
      <UserProfileDefault
        name={name}
        company={company}
        avatarSrc={avatarSrc}
        profileHref={profileHref}
        className={className}
      />
    );
  }

  // variant가 'secondary'이면 모바일 숨김, 태블릿/데스크탑에서만 표시
  return (
    <>
      {/* 태블릿 (744px ~ 1199px) */}
      <div className={clsx('hidden tablet:flex desktop:hidden', className)}>
        <UserProfileTablet
          name={name}
          company={company}
          avatarSrc={avatarSrc}
          profileHref={profileHref}
        />
      </div>

      {/* 데스크탑 (1200px ~) */}
      <div className={clsx('hidden desktop:flex', className)}>
        <UserProfileDesktop
          name={name}
          company={company}
          avatarSrc={avatarSrc}
          profileHref={profileHref}
        />
      </div>
    </>
  );
};

export default UserProfile;
