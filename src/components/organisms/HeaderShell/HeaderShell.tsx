// src/components/organisms/HeaderShell/HeaderShell.tsx

'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import AuthHeader from '@/components/organisms/AuthHeader/AuthHeader';
import GNBWrapper from '@/components/organisms/GNB/GNBWrapper';

interface HeaderShellProps {
  className?: string;
}

const AUTH_HEADER_MATCHERS = [
  /^\/$/, // home
  /^\/login(?:\/|$)/,
  /^\/signup(?:\/|$)/,
  /^\/invite(?:\/|$)/,
];

const HIDDEN_HEADER_ROUTES: RegExp[] = [];

export const HeaderShell: React.FC<HeaderShellProps> = ({ className }) => {
  const pathname = usePathname();

  const isAuthRoute = useMemo(() => {
    if (!pathname) return false;
    return AUTH_HEADER_MATCHERS.some((re) => re.test(pathname));
  }, [pathname]);

  const shouldHideHeader = useMemo(() => {
    if (!pathname) return false;
    return HIDDEN_HEADER_ROUTES.some((re) => re.test(pathname));
  }, [pathname]);

  if (shouldHideHeader) return null;

  return (
    <header className={clsx(className)}>{isAuthRoute ? <AuthHeader /> : <GNBWrapper />}</header>
  );
};

export default HeaderShell;
