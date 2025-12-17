'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

/**
 * Mobile 전용 Props
 * - 로그인, 기업가입 (짧은 텍스트)
 */
export interface AuthUserActionsMobileProps {
  className?: string;
}

/**
 * Tablet 전용 Props
 * - 로그인, 기업 담당자 회원가입
 */
export interface AuthUserActionsTabletProps {
  className?: string;
}

/**
 * Desktop 전용 Props
 * - 로그인, 기업 담당자 회원가입
 */
export interface AuthUserActionsDesktopProps {
  className?: string;
}

// Mobile Component
export const AuthUserActionsMobile: React.FC<AuthUserActionsMobileProps> = ({ className }) => {
  const pathname = usePathname();
  const isLoginPage = pathname?.startsWith('/login');
  const isSignupPage = pathname?.startsWith('/signup');

  return (
    <div className={clsx('flex items-center gap-8', className)}>
      {!isLoginPage && (
        <Link
          className="flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950"
          href="/login"
        >
          <IconButton aria-label="로그인" size="md" variant="default">
            <Image alt="Login" height={24} src="/icons/lock.svg" width={24} />
          </IconButton>
          로그인
        </Link>
      )}
      {!isSignupPage && (
        <Link
          className="flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950"
          href="/signup"
        >
          <IconButton aria-label="기업가입" size="md" variant="default">
            <Image alt="Signup" height={24} src="/icons/user-manager.svg" width={24} />
          </IconButton>
          기업가입
        </Link>
      )}
    </div>
  );
};

// Tablet Component
export const AuthUserActionsTablet: React.FC<AuthUserActionsTabletProps> = ({ className }) => {
  const pathname = usePathname();
  const isLoginPage = pathname?.startsWith('/login');
  const isSignupPage = pathname?.startsWith('/signup');

  return (
    <div className={clsx('flex items-center gap-12', className)}>
      {!isLoginPage && (
        <Link
          className="flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950"
          href="/login"
        >
          <IconButton aria-label="로그인" size="md" variant="default">
            <Image alt="Login" height={24} src="/icons/lock.svg" width={24} />
          </IconButton>
          로그인
        </Link>
      )}
      {!isSignupPage && (
        <Link
          className="flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950"
          href="/signup"
        >
          <IconButton aria-label="기업 담당자 회원가입" size="md" variant="default">
            <Image alt="Signup" height={24} src="/icons/user-manager.svg" width={24} />
          </IconButton>
          기업 담당자 회원가입
        </Link>
      )}
    </div>
  );
};

// Desktop Component
export const AuthUserActionsDesktop: React.FC<AuthUserActionsDesktopProps> = ({ className }) => {
  const pathname = usePathname();
  const isLoginPage = pathname?.startsWith('/login');
  const isSignupPage = pathname?.startsWith('/signup');

  return (
    <div className={clsx('flex items-center gap-16', className)}>
      {!isLoginPage && (
        <Link
          className="flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950"
          href="/login"
        >
          <IconButton aria-label="로그인" size="md" variant="default">
            <Image alt="Login" height={24} src="/icons/lock.svg" width={24} />
          </IconButton>
          로그인
        </Link>
      )}
      {!isSignupPage && (
        <Link
          className="flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950"
          href="/signup"
        >
          <IconButton aria-label="기업 담당자 회원가입" size="md" variant="default">
            <Image alt="Signup" height={24} src="/icons/user-manager.svg" width={24} />
          </IconButton>
          기업 담당자 회원가입
        </Link>
      )}
    </div>
  );
};

// Main AuthUserActions Component (통합 컴포넌트)
export interface AuthUserActionsProps {
  className?: string;
}

/**
 * AuthUserActions
 *
 * 반응형 인증 사용자 액션 컴포넌트
 * - 모바일: 로그인, 기업가입 (짧은 텍스트)
 * - 태블릿: 로그인, 기업 담당자 회원가입
 * - 데스크탑: 로그인, 기업 담당자 회원가입
 */
export const AuthUserActions: React.FC<AuthUserActionsProps> = ({ className }) => (
  <>
    {/* 모바일 */}
    <div className={clsx('tablet:hidden', className)}>
      <AuthUserActionsMobile />
    </div>

    {/* 태블릿 (744px ~ 1199px) */}
    <div className={clsx('hidden tablet:flex desktop:hidden', className)}>
      <AuthUserActionsTablet />
    </div>

    {/* 데스크탑 */}
    <div className={clsx('hidden desktop:flex', className)}>
      <AuthUserActionsDesktop />
    </div>
  </>
);
