'use client';

import Link from 'next/link';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { clsx } from '@/utils/clsx';

export interface UseProfileProps {
  name: string;
  avatarSrc?: string;
  profileHref?: string;
  className?: string;
}

const UseProfile = ({
  name,
  avatarSrc,
  profileHref = '/me/profile',
  className,
}: UseProfileProps) => (
  <Link
    href={profileHref}
    className={clsx(
      'hidden tablet:flex items-center gap-8 hover:opacity-80 transition-opacity',
      className
    )}
  >
    <Avatar src={avatarSrc} alt={name} size={24} />
    <span className={clsx('text-16 font-normal text-gray-900')}>{name}</span>
  </Link>
);

export default UseProfile;
