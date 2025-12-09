'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import { PATHNAME } from '@/constants';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { CartButton } from '@/components/molecules/CartButton/CartButton';

export interface GNBUserActionsProps {
  /** 회사 스코프 라우팅에 사용할 companyId */
  companyId: string;

  /** GNB 우측에 표시할 유저 프로필 컴포넌트 (이미 만들어진 UserProfile 컴포넌트 전달) */
  userProfile: React.ReactNode;

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
 * - 데스크탑: 장바구니, 찜목록, 유저프로필, |, 로그아웃
 * - 태블릿:   장바구니, 유저프로필, 햄버거메뉴
 * - 모바일:   장바구니, 햄버거메뉴
 *
 * 공통:
 * - 장바구니 아이콘은 모든 뷰포트에서 노출
 * - 찜목록 아이콘(하트)은 데스크탑에서만 노출
 *   - 찜목록 페이지일 때는 heart.svg, 그 외에는 heart-outline.svg
 */
export const GNBUserActions: React.FC<GNBUserActionsProps> = ({
  companyId,
  userProfile,
  cartCount = 0,
  onLogout,
  onMenuClick,
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
    <div className={clsx('flex items-center gap-8 tablet:gap-12 desktop:gap-16', className)}>
      {/* 장바구니: 모든 뷰포트에서 노출 */}
      <CartButton companyId={companyId} count={cartCount} />

      {/* 찜목록: 데스크탑에서만 노출 */}
      <Link
        href={wishlistHref}
        aria-label="찜목록"
        onClick={handleWishlistClick}
        className="hidden desktop:inline-flex items-center justify-center"
      >
        <IconButton variant="default" size="md">
          <img
            src={wishlistIconSrc}
            alt=""
            className={clsx(
              'w-24 h-24 transition-transform duration-300 ease-out',
              isAnimating && 'scale-125'
            )}
            aria-hidden="true"
          />
        </IconButton>
      </Link>

      {/* 유저프로필: 태블릿 이상에서만 노출 (모바일에서는 숨김) */}
      <div className="hidden tablet:flex items-center">{userProfile}</div>

      {/* 구분선: 데스크탑에서만 노출 */}
      <div className="hidden desktop:block w-px h-20 bg-gray-200" />

      {/* 로그아웃 버튼: 데스크탑 Only */}
      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className={clsx(
            'hidden desktop:inline-flex',
            'text-16 text-gray-700 hover:text-gray-900',
            'px-8 py-4 rounded-999 hover:bg-gray-50 transition-colors'
          )}
        >
          로그아웃
        </button>
      )}

      {/* 햄버거 메뉴: 모바일 + 태블릿, 데스크탑에서는 숨김 */}
      {onMenuClick && (
        <IconButton
          aria-label="메뉴 열기"
          size="md"
          variant="default"
          className="flex tablet:flex desktop:hidden items-center justify-center"
          onClick={onMenuClick}
        >
          <img src="/icons/hamburger.svg" alt="" className="w-20 h-20" aria-hidden="true" />
        </IconButton>
      )}
    </div>
  );
};
