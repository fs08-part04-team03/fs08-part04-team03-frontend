'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import { type UserRole, type AppRouteKey, getGNBPrimaryNavConfig, isNavActive } from '@/constants';

/**
 * Desktop 전용 Props
 * - 네비게이션 링크들
 */
export interface GNBPrimaryNavDesktopProps {
  /** 사용자 역할 (user | manager | admin) */
  role: UserRole;

  /** 현재 활성 경로 (pathname 대신 사용 가능) */
  activePath?: string;

  /** 네비게이션 아이템 클릭 시 호출되는 콜백 */
  onItemClick?: (key: AppRouteKey) => void;

  /** 네비게이션 메뉴 className */
  navClassName?: string;

  className?: string;
}

// Desktop Component
export const GNBPrimaryNavDesktop: React.FC<GNBPrimaryNavDesktopProps> = ({
  role,
  activePath,
  onItemClick,
  navClassName,
  className,
}) => {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? '';

  const items = getGNBPrimaryNavConfig(role);

  return (
    <nav
      aria-label="주요 페이지"
      className={clsx('flex items-center gap-32', navClassName, className)}
    >
      {items.map((item) => {
        const active = isNavActive(currentPath, item.href);

        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => onItemClick?.(item.key)}
            aria-current={active ? 'page' : undefined}
            className={clsx(
              'text-14 leading-22 transition-colors',
              active ? 'font-semibold text-black' : 'text-gray-500 hover:text-black'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

// Main GNBPrimaryNav Component (통합 컴포넌트)
export interface GNBPrimaryNavProps {
  /** 사용자 역할 (user | manager | admin) */
  role: UserRole;

  /** 현재 활성 경로 (pathname 대신 사용 가능) */
  activePath?: string;

  /** 네비게이션 아이템 클릭 시 호출되는 콜백 */
  onItemClick?: (key: AppRouteKey) => void;

  /** 데스크탑 네비게이션 메뉴 className */
  navClassName?: string;

  className?: string;
}

/**
 * GNBPrimaryNav
 *
 * 반응형 GNB 상단 네비게이션 컴포넌트
 * - 데스크탑 (1024px ~): 네비게이션 링크들
 */
const GNBPrimaryNav: React.FC<GNBPrimaryNavProps> = ({
  role,
  activePath,
  onItemClick,
  navClassName,
  className,
}) => (
  <div className={clsx('hidden desktop:flex', className)}>
    <GNBPrimaryNavDesktop
      role={role}
      activePath={activePath}
      onItemClick={onItemClick}
      navClassName={navClassName}
    />
  </div>
);

export default GNBPrimaryNav;

/**
 * Sidebar 전용 Props
 * - 네비게이션 링크들 + 마이페이지 + 로그아웃
 */
export interface GNBPrimaryNavSidebarProps {
  /** 사용자 역할 (user | manager | admin) */
  role: UserRole;

  /** 회사 스코프 라우팅에 사용할 companyId */
  companyId: string;

  /** 현재 활성 경로 (pathname 대신 사용 가능) */
  activePath?: string;

  /** 네비게이션 아이템 클릭 시 호출되는 콜백 */
  onItemClick?: (key: AppRouteKey) => void;

  /** 마이페이지 클릭 시 호출되는 콜백 */
  onProfileClick?: () => void;

  /** 로그아웃 클릭 시 호출되는 콜백 */
  onLogout?: () => void;

  /** 네비게이션 메뉴 className */
  navClassName?: string;

  className?: string;
}

/**
 * GNBPrimaryNavSidebar
 *
 * 사이드바 메뉴용 네비게이션 컴포넌트
 * - 기본 네비게이션 아이템들
 * - 마이페이지(프로필)
 * - 로그아웃
 */
export const GNBPrimaryNavSidebar: React.FC<GNBPrimaryNavSidebarProps> = ({
  role,
  companyId,
  activePath,
  onItemClick,
  onProfileClick,
  onLogout,
  navClassName,
  className,
}) => {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? '';

  const items = getGNBPrimaryNavConfig(role);
  const profileHref = `/${companyId}/profile`;
  const isProfileActive = isNavActive(currentPath, '/[companyId]/profile');

  return (
    <nav
      aria-label="주요 페이지"
      className={clsx('flex flex-col justify-center gap-36', navClassName, className)}
    >
      {/* 기본 네비게이션 아이템들 */}
      {items.map((item) => {
        const href = item.href.replace('[companyId]', companyId);
        const active = isNavActive(currentPath, item.href);

        return (
          <Link
            key={item.key}
            href={href}
            onClick={() => onItemClick?.(item.key)}
            aria-current={active ? 'page' : undefined}
            className={clsx(
              'flex items-center justify-center',
              'text-16 leading-22 transition-colors',
              active ? 'font-semibold text-black' : 'text-gray-500 hover:text-black'
            )}
          >
            {item.label}
          </Link>
        );
      })}

      {/* 마이페이지 */}
      <Link
        href={profileHref}
        onClick={onProfileClick}
        aria-current={isProfileActive ? 'page' : undefined}
        className={clsx(
          'flex items-center justify-center',
          'text-16 leading-22 transition-colors',
          isProfileActive ? 'font-semibold text-black' : 'text-gray-500 hover:text-black'
        )}
      >
        마이페이지
      </Link>

      {/* 로그아웃 */}
      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className={clsx(
            'flex items-center justify-center',
            'text-16 leading-22 transition-colors',
            'text-gray-500 hover:text-black'
          )}
        >
          로그아웃
        </button>
      )}
    </nav>
  );
};
