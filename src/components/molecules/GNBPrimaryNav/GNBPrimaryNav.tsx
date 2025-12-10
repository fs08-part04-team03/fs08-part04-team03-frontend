'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { type UserRole, type AppRouteKey, getGNBPrimaryNavConfig, isNavActive } from '@/constants';

/**
 * Mobile/Tablet 공통 Props
 * - 햄버거 메뉴 버튼
 */
export interface GNBPrimaryNavToggleProps {
  /** 햄버거 메뉴 클릭 시 호출되는 콜백 */
  onMenuClick?: () => void;

  /** 햄버거 메뉴 열림 여부 (컨트롤 모드) */
  isMenuOpen?: boolean;

  /** 햄버거 메뉴가 제어하는 요소의 ID (a11y 용) */
  menuControlsId?: string;

  /** 햄버거 버튼 className */
  menuButtonClassName?: string;

  className?: string;
}

/** @deprecated GNBPrimaryNavToggleProps를 사용하세요 */
export type GNBPrimaryNavMobileProps = GNBPrimaryNavToggleProps;

/** @deprecated GNBPrimaryNavToggleProps를 사용하세요 */
export type GNBPrimaryNavTabletProps = GNBPrimaryNavToggleProps;

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

// Mobile Component
export const GNBPrimaryNavMobile: React.FC<GNBPrimaryNavToggleProps> = ({
  onMenuClick,
  isMenuOpen,
  menuControlsId,
  menuButtonClassName,
  className,
}) => (
  <div className={clsx('flex items-center', className)}>
    {/* 햄버거 메뉴 */}
    {onMenuClick && (
      <IconButton
        variant="default"
        size="md"
        onClick={onMenuClick}
        aria-label={isMenuOpen ? '메인 메뉴 닫기' : '메인 메뉴 열기'}
        aria-expanded={isMenuOpen ?? false}
        aria-controls={menuControlsId}
        className={menuButtonClassName}
      >
        <Image src="/icons/hamburger.svg" alt="메인 메뉴" width={24} height={24} />
      </IconButton>
    )}
  </div>
);

// Tablet Component
export const GNBPrimaryNavTablet: React.FC<GNBPrimaryNavToggleProps> = ({
  onMenuClick,
  isMenuOpen,
  menuControlsId,
  menuButtonClassName,
  className,
}) => (
  <div className={clsx('flex items-center', className)}>
    {/* 햄버거 메뉴 */}
    {onMenuClick && (
      <IconButton
        variant="default"
        size="md"
        onClick={onMenuClick}
        aria-label={isMenuOpen ? '메인 메뉴 닫기' : '메인 메뉴 열기'}
        aria-expanded={isMenuOpen ?? false}
        aria-controls={menuControlsId}
        className={menuButtonClassName}
      >
        <Image src="/icons/hamburger.svg" alt="메인 메뉴" width={24} height={24} />
      </IconButton>
    )}
  </div>
);

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
 * - 모바일 (~ 767px): 숨김
 * - 태블릿 (768px ~ 1023px): 숨김
 * - 데스크탑 (1024px ~): 네비게이션 링크들
 */
const GNBPrimaryNav: React.FC<GNBPrimaryNavProps> = ({
  role,
  activePath,
  onItemClick,
  navClassName,
  className,
}) => (
  <>
    {/* 데스크탑 (1024px ~) */}
    <div className={clsx('hidden desktop:flex', className)}>
      <GNBPrimaryNavDesktop
        role={role}
        activePath={activePath}
        onItemClick={onItemClick}
        navClassName={navClassName}
      />
    </div>
  </>
);

export default GNBPrimaryNav;
