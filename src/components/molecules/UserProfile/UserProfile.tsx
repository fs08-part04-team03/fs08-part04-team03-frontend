'use client';

import Link from 'next/link';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { clsx } from '@/utils/clsx';

export interface UserProfileProps {
  name: string;
  company: {
    name: string;
  };
  avatarSrc?: string;
  profileHref?: string;
  className?: string;
}

const UserProfile = ({
  name,
  company,
  avatarSrc,
  profileHref = '/me/profile',
  className,
}: UserProfileProps) => (
  <Link
    href={profileHref}
    aria-label={`View ${name}'s profile`}
    className={clsx(
      'hidden tablet:flex items-center gap-8 hover:opacity-80 transition-opacity',
      className
    )}
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

export default UserProfile;
