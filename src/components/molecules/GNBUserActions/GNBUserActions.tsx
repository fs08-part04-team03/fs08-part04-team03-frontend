'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import { PATHNAME } from '@/constants';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { CartButton } from '@/components/molecules/CartButton/CartButton';

/**
 * 공통 베이스 Props
 */
interface GNBUserActionsBaseProps {
  /** 회사 스코프 라우팅에 사용할 companyId */
  companyId: string;

  /** 장바구니에 담긴 상품 개수 */
  cartCount?: number;

  className?: string;
}

/**
 * Mobile 전용 Props
 * - 장바구니, 햄버거 메뉴
 */
export interface GNBUserActionsMobileProps extends GNBUserActionsBaseProps {
  /** 햄버거 메뉴 클릭 시 호출되는 콜백 */
  onMenuClick?: () => void;
}

/**
 * Tablet 전용 Props
 * - 장바구니, 유저프로필, 햄버거 메뉴
 */
export interface GNBUserActionsTabletProps extends GNBUserActionsBaseProps {
  /** GNB 우측에 표시할 유저 프로필 컴포넌트 */
  userProfile?: React.ReactNode;

  /** 햄버거 메뉴 클릭 시 호출되는 콜백 */
  onMenuClick?: () => void;
}

/**
 * Desktop 전용 Props
 * - 장바구니, 찜목록, 유저프로필, 구분선, 로그아웃
 */
export interface GNBUserActionsDesktopProps extends GNBUserActionsBaseProps {
  /** GNB 우측에 표시할 유저 프로필 컴포넌트 */
  userProfile?: React.ReactNode;

  /** 로그아웃 클릭 시 호출되는 콜백 */
  onLogout?: () => void;
}

// Mobile Component
export const GNBUserActionsMobile: React.FC<GNBUserActionsMobileProps> = ({
  companyId,
  cartCount = 0,
  onMenuClick,
  className,
}) => (
  <div className={clsx('flex items-center gap-8', className)}>
    {/* 장바구니 */}
    <CartButton companyId={companyId} count={cartCount} />

    {/* 햄버거 메뉴 */}
    {onMenuClick && (
      <IconButton
        aria-label="메뉴 열기"
        size="md"
        variant="default"
        className="flex items-center justify-center"
        onClick={onMenuClick}
      >
        <img src="/icons/hamburger.svg" alt="" className="w-20 h-20" aria-hidden="true" />
      </IconButton>
    )}
  </div>
);

// Tablet Component
export const GNBUserActionsTablet: React.FC<GNBUserActionsTabletProps> = ({
  companyId,
  userProfile,
  cartCount = 0,
  onMenuClick,
  className,
}) => (
  <div className={clsx('flex items-center gap-12', className)}>
    {/* 장바구니 */}
    <CartButton companyId={companyId} count={cartCount} />

    {/* 유저 프로필 */}
    {userProfile && <div className="flex items-center">{userProfile}</div>}

    {/* 햄버거 메뉴 */}
    {onMenuClick && (
      <IconButton
        aria-label="메뉴 열기"
        size="md"
        variant="default"
        className="flex items-center justify-center"
        onClick={onMenuClick}
      >
        <img src="/icons/hamburger.svg" alt="" className="w-20 h-20" aria-hidden="true" />
      </IconButton>
    )}
  </div>
);

// Desktop Component
export const GNBUserActionsDesktop: React.FC<GNBUserActionsDesktopProps> = ({
  companyId,
  userProfile,
  cartCount = 0,
  onLogout,
  className,
}) => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  const wishlistHref = PATHNAME.WISHLIST(companyId);
  const isWishlistPage = pathname?.includes('/wishlist') ?? false;
  const wishlistIconSrc = isWishlistPage ? '/icons/heart.svg' : '/icons/heart-outline.svg';

  const handleWishlistClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={clsx('flex items-center gap-16', className)}>
      {/* 장바구니 */}
      <CartButton companyId={companyId} count={cartCount} />

      {/* 찜목록 */}
      <Link
        href={wishlistHref}
        aria-label="찜목록"
        onClick={handleWishlistClick}
        className={clsx(
          'inline-flex items-center justify-center',
          'w-32 h-32 rounded-full',
          'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
          'transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
        )}
      >
        <img
          src={wishlistIconSrc}
          alt=""
          className={clsx(
            'w-24 h-24 transition-transform duration-300 ease-out',
            isAnimating && 'scale-125'
          )}
          aria-hidden="true"
        />
      </Link>

      {/* 유저 프로필 */}
      {userProfile && <div className="flex items-center">{userProfile}</div>}

      {/* 구분선 */}
      {userProfile && <div className="w-px h-20 bg-gray-200" />}

      {/* 로그아웃 버튼 */}
      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className={clsx(
            'inline-flex',
            'text-16 text-gray-700 hover:text-gray-900',
            'px-8 py-4 rounded-999 hover:bg-gray-50 transition-colors'
          )}
        >
          로그아웃
        </button>
      )}
    </div>
  );
};

// Main GNBUserActions Component (통합 컴포넌트)
export interface GNBUserActionsProps {
  /** 회사 스코프 라우팅에 사용할 companyId */
  companyId: string;

  /** GNB 우측에 표시할 유저 프로필 컴포넌트 (태블릿/데스크탑에서만 사용) */
  userProfile?: React.ReactNode;

  /** 장바구니에 담긴 상품 개수 */
  cartCount?: number;

  /** 로그아웃 클릭 시 호출되는 콜백 (데스크탑 Only) */
  onLogout?: () => void;

  /** 햄버거 메뉴 클릭 시 호출되는 콜백 (모바일/태블릿) */
  onMenuClick?: () => void;

  className?: string;
}

/**
 * GNBUserActions
 *
 * 반응형 사용자 액션 컴포넌트
 * - 모바일: 장바구니, 햄버거메뉴
 * - 태블릿: 장바구니, 유저프로필, 햄버거메뉴
 * - 데스크탑: 장바구니, 찜목록, 유저프로필, 구분선, 로그아웃
 */
export const GNBUserActions: React.FC<GNBUserActionsProps> = ({
  companyId,
  userProfile,
  cartCount = 0,
  onLogout,
  onMenuClick,
  className,
}) => (
  <>
    {/* 모바일 */}
    <div className={clsx('tablet:hidden', className)}>
      <GNBUserActionsMobile companyId={companyId} cartCount={cartCount} onMenuClick={onMenuClick} />
    </div>

    {/* 태블릿 (744px ~ 1199px) */}
    <div className={clsx('hidden tablet:flex desktop:hidden', className)}>
      <GNBUserActionsTablet
        companyId={companyId}
        cartCount={cartCount}
        userProfile={userProfile}
        onMenuClick={onMenuClick}
      />
    </div>

    {/* 데스크탑 */}
    <div className={clsx('hidden desktop:flex', className)}>
      <GNBUserActionsDesktop
        companyId={companyId}
        cartCount={cartCount}
        userProfile={userProfile}
        onLogout={onLogout}
      />
    </div>
  </>
);
