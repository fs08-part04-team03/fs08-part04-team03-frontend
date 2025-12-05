'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { type UserRole, type AppRouteKey, getGNBPrimaryNavConfig, isNavActive } from '@/constants';

/**
 * GNB 상단의 텍스트 네비게이션 바
 * - role(user | manager | admin)에 따라 GNB 메뉴가 달라진다.
 * - 현재 경로(activePath 또는 pathname)를 기반으로 활성 상태를 판단한다.
 */
export interface GNBPrimaryNavProps {
  role: UserRole;
  activePath?: string;
  onItemClick?: (key: AppRouteKey) => void;
  onMenuClick?: () => void;

  /** 모바일 햄버거 버튼 className */
  menuButtonClassName?: string;

  /** 데스크탑 네비게이션 메뉴 className */
  navClassName?: string;

  /** 햄버거 메뉴 열림 여부 (컨트롤 모드) */
  isMenuOpen?: boolean;

  /** 햄버거 메뉴가 제어하는 요소의 ID (a11y 용) */
  menuControlsId?: string;
}

const GNBPrimaryNav: React.FC<GNBPrimaryNavProps> = ({
  role,
  activePath,
  onItemClick,
  onMenuClick,
  menuButtonClassName,
  navClassName,
  isMenuOpen,
  menuControlsId,
}) => {
  const pathname = usePathname();
  const currentPath = activePath ?? pathname ?? '';

  const items = getGNBPrimaryNavConfig(role);

  return (
    <>
      {/* 모바일: 햄버거 메뉴 */}
      <IconButton
        variant="default"
        size="md"
        onClick={onMenuClick}
        aria-label={isMenuOpen ? '메인 메뉴 닫기' : '메인 메뉴 열기'}
        aria-expanded={isMenuOpen ?? false}
        aria-controls={menuControlsId}
        className={clsx('desktop:hidden', menuButtonClassName)}
      >
        <Image src="/icons/hamburger.svg" alt="메인 메뉴" width={24} height={24} />
      </IconButton>

      {/* 데스크탑: 네비게이션 */}
      <nav
        aria-label="주요 페이지"
        className={clsx('hidden desktop:flex items-center gap-32', navClassName)}
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
    </>
  );
};

export default GNBPrimaryNav;
