'use client';

import React, { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { clsx } from '@/utils/clsx';
import type { UserRole, AppRouteKey, ParentCategoryKey, ParentCategoryOption } from '@/constants';

import GNBBrand from '@/components/molecules/GNBBrand/GNBBrand';
import GNBPrimaryNav, {
  GNBPrimaryNavSidebar,
} from '@/components/molecules/GNBPrimaryNav/GNBPrimaryNav';
import { GNBUserActions } from '@/components/molecules/GNBUserActions/GNBUserActions';
import { GNBCategorySwitcher } from '@/components/molecules/GNBCategorySwitcher/GNBCategorySwitcher';
import { SideBarMenu } from '@/components/organisms/SideBarMenu/SideBarMenu';

export interface GNBProps {
  /** 사용자 역할 (user | manager | admin) */
  role: UserRole;

  /** GNB 우측에 표시할 유저 프로필 컴포넌트 (태블릿/데스크탑에서만 사용) */
  userProfile?: React.ReactNode;

  /** 장바구니에 담긴 상품 개수 */
  cartCount?: number;

  /** 로그아웃 클릭 시 호출되는 콜백 (데스크탑 Only) */
  onLogout?: () => void;

  /** 햄버거 메뉴 클릭 시 호출되는 콜백 (모바일/태블릿) */
  onMenuClick?: () => void;

  /** 네비게이션 아이템 클릭 시 호출되는 콜백 */
  onNavItemClick?: (key: AppRouteKey) => void;

  /** 현재 활성 경로 (pathname 대신 사용 가능) */
  activePath?: string;

  /** 대분류 카테고리 리스트 (모바일 카테고리 스위처용) */
  categories?: ParentCategoryOption[];

  /** 현재 선택된 카테고리 ID (모바일 카테고리 스위처용) */
  activeCategoryId?: ParentCategoryKey;

  /** 상품의 대분류 ID (상품 상세 페이지에서 사용) */
  productCategoryId?: ParentCategoryKey;

  /** 카테고리 변경 시 호출되는 콜백 */
  onCategoryChange?: (id: ParentCategoryKey) => void;

  /** GNB 컨테이너 className */
  className?: string;
}

/**
 * GNB (Global Navigation Bar)
 *
 * 반응형 전역 네비게이션 바 컴포넌트
 * - 모바일: Brand | CategorySwitcher | UserActions
 * - 태블릿/데스크탑: Brand | PrimaryNav | UserActions
 */
const GNB: React.FC<GNBProps> = ({
  role,
  userProfile,
  cartCount = 0,
  onLogout,
  onMenuClick,
  onNavItemClick,
  activePath,
  categories = [],
  activeCategoryId,
  productCategoryId,
  onCategoryChange,
  className,
}) => {
  const params = useParams();
  const pathname = usePathname();
  const companyId = (params?.companyId as string) || '';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // activePath가 없으면 pathname 사용
  const currentActivePath = activePath ?? pathname ?? '';

  const hasCategories = categories.length > 0 && activeCategoryId && onCategoryChange;

  // 데스크탑 뷰포트에서는 사이드바 자동 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // 초기 로드 시에도 체크
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
    onMenuClick?.();
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleNavItemClick = (key: AppRouteKey) => {
    handleSidebarClose();
    onNavItemClick?.(key);
  };

  const handleProfileClick = () => {
    handleSidebarClose();
  };

  const handleSidebarLogout = () => {
    handleSidebarClose();
    onLogout?.();
  };

  return (
    <div
      className={clsx(
        'sticky top-0 z-header',
        'w-full h-56',
        'bg-white border-b border-gray-200',
        'flex items-center justify-between',
        'px-16 tablet:px-24 desktop:px-32',
        className
      )}
    >
      {/* 왼쪽: Brand */}
      <div className="flex items-center shrink-0">
        <GNBBrand />
      </div>

      {/* 중앙: PrimaryNav (데스크탑) 또는 CategorySwitcher (모바일) */}
      <div className="flex-1 flex items-center justify-start desktop:ml-40">
        {/* 데스크탑: PrimaryNav */}
        <GNBPrimaryNav
          role={role}
          companyId={companyId}
          activePath={currentActivePath}
          onItemClick={onNavItemClick}
        />

        {/* 모바일: CategorySwitcher */}
        {hasCategories && (
          <div className="flex-1 flex items-center justify-center tablet:hidden">
            <GNBCategorySwitcher
              categories={categories}
              activeCategoryId={activeCategoryId}
              productCategoryId={productCategoryId}
              onCategoryChange={onCategoryChange}
            />
          </div>
        )}
      </div>

      {/* 오른쪽: UserActions */}
      <div className="flex items-center shrink-0">
        <GNBUserActions
          companyId={companyId}
          userProfile={userProfile}
          cartCount={cartCount}
          onLogout={onLogout}
          onMenuClick={handleMenuClick}
        />
      </div>

      {/* SideBarMenu (모바일/태블릿 전용) */}
      <div className="desktop:hidden">
        <SideBarMenu open={isSidebarOpen} onClose={handleSidebarClose}>
          <GNBPrimaryNavSidebar
            role={role}
            companyId={companyId}
            activePath={currentActivePath}
            onItemClick={handleNavItemClick}
            onProfileClick={handleProfileClick}
            onLogout={onLogout ? handleSidebarLogout : undefined}
          />
        </SideBarMenu>
      </div>
    </div>
  );
};

export default GNB;
