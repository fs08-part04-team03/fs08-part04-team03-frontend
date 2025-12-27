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
  /** 사용자 역할 */
  role: UserRole;

  /** GNB 우측에 표시할 유저 프로필 컴포넌트 */
  userProfile?: React.ReactNode;

  /** 장바구니에 담긴 상품 개수 */
  cartCount?: number;

  /** 로그아웃 콜백 */
  onLogout?: () => void;

  /** 햄버거 메뉴 클릭 콜백 */
  onMenuClick?: () => void;

  /** 네비게이션 아이템 클릭 콜백 */
  onNavItemClick?: (key: AppRouteKey) => void;

  /** 현재 활성 경로 */
  activePath?: string;

  /** 대분류 카테고리 리스트 */
  categories?: ParentCategoryOption[];

  /** 현재 선택된 카테고리 ID */
  activeCategoryId?: ParentCategoryKey;

  /** 상품의 대분류 ID */
  productCategoryId?: ParentCategoryKey;

  /** 카테고리 변경 콜백 */
  onCategoryChange?: (id: ParentCategoryKey) => void;

  /** GNB 컨테이너 className */
  className?: string;
}

/**
 * GNB (Global Navigation Bar)
 *
 * 반응형 전역 네비게이션 바 컴포넌트
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

  const currentActivePath = activePath ?? pathname ?? '';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
    onMenuClick?.();
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavItemClick = (key: AppRouteKey) => {
    closeSidebar();
    onNavItemClick?.(key);
  };

  const handleSidebarLogout = () => {
    closeSidebar();
    onLogout?.();
  };

  return (
    <div
      className={clsx(
        'gnb-container',
        'sticky top-0 z-header',
        'w-full h-56',
        'bg-white border-b border-gray-200',
        'flex items-center justify-between',
        'px-14 tablet:px-24',
        className
      )}
    >
      <div className="flex items-center shrink-0">
        <GNBBrand />
      </div>

      <div className="flex-1 flex items-center justify-start desktop:ml-10">
        <GNBPrimaryNav
          role={role}
          companyId={companyId}
          activePath={currentActivePath}
          onItemClick={onNavItemClick}
        />

        {categories.length > 0 && activeCategoryId && onCategoryChange && (
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

      <div className="flex items-center shrink-0">
        <GNBUserActions
          companyId={companyId}
          userProfile={userProfile}
          cartCount={cartCount}
          onLogout={onLogout}
          onMenuClick={handleMenuClick}
        />
      </div>

      <SideBarMenu open={isSidebarOpen} onClose={closeSidebar}>
        <GNBPrimaryNavSidebar
          role={role}
          companyId={companyId}
          activePath={currentActivePath}
          onItemClick={handleNavItemClick}
          onProfileClick={closeSidebar}
          onLogout={onLogout ? handleSidebarLogout : undefined}
        />
      </SideBarMenu>
    </div>
  );
};

export default GNB;
