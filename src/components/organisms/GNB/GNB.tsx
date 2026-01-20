'use client';

/**
 * GNB (Global Navigation Bar)
 * Props Drilling 개선 - 그룹화된 Props 사용
 */

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import type { AppRouteKey } from '@/constants';
import { CATEGORY_SECTIONS } from '@/constants';
import GNBBrand from '@/components/molecules/GNBBrand/GNBBrand';
import GNBPrimaryNav, {
  GNBPrimaryNavSidebar,
} from '@/components/molecules/GNBPrimaryNav/GNBPrimaryNav';
import { GNBUserActions } from '@/components/molecules/GNBUserActions/GNBUserActions';
import { GNBCategorySwitcher } from '@/components/molecules/GNBCategorySwitcher/GNBCategorySwitcher';
import { SideBarMenu } from '@/components/organisms/SideBarMenu/SideBarMenu';
import { NotificationModal } from '@/components/organisms/NotificationModal/NotificationModal';
import { useUnreadNotificationCount } from '@/features/notification/queries/notification.queries';
import { useNotificationSSE } from '@/features/notification/hooks/useNotificationSSE';
import type {
  GNBBaseState,
  GNBHandlers,
  GNBNavigationState,
  GNBCategoryState,
} from './types/gnb.types';

/**
 * 개선된 Props 인터페이스 - 그룹화된 타입 사용
 */
export interface GNBProps {
  // 그룹화된 Props
  baseState: GNBBaseState;
  handlers?: GNBHandlers;
  navigationState?: GNBNavigationState;
  categoryState?: GNBCategoryState;
}

/**
 * 개선된 GNB - 깔끔하고 단순한 조립 레이어
 */
const GNB = ({ baseState, handlers, navigationState, categoryState }: GNBProps) => {
  const params = useParams();
  const pathname = usePathname();
  const companyId = (params?.companyId as string) || '';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // 알림 관련 hooks
  const { data: unreadCountData } = useUnreadNotificationCount();
  const unreadCount = unreadCountData?.data?.count ?? 0;

  // SSE 실시간 알림 연결
  useNotificationSSE({ enabled: true });

  const { role, userProfile, cartCount = 0, className } = baseState;
  const currentActivePath = navigationState?.activePath ?? pathname ?? '';
  const categories = categoryState?.categories ?? [];

  // GNBCategorySwitcher를 보여줄 페이지인지 확인 (모바일 전용)
  // "내가 등록한 상품" 페이지(/products/my)는 제외
  const showCategorySwitcher = pathname
    ? pathname.includes('/products') &&
      !pathname.includes('/products/my') &&
      (pathname.match(/\/products$/) || // 상품 리스트
        pathname.match(/\/products\/[^/]+$/)) // 상품 상세
    : false;

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
    handlers?.onMenuClick?.();
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavItemClick = (key: AppRouteKey) => {
    closeSidebar();
    handlers?.onNavItemClick?.(key);
  };

  const handleSidebarLogout = () => {
    closeSidebar();
    handlers?.onLogout?.();
  };

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleNotificationModalClose = () => {
    setIsNotificationModalOpen(false);
  };

  return (
    <div
      className={clsx(
        'gnb-container',
        'w-full h-56',
        'bg-white border-b border-gray-200',
        'flex items-center justify-between',
        'px-14 tablet:px-24',
        className
      )}
    >
      <div className="flex items-center shrink-0 pr-5">
        <GNBBrand />
      </div>

      <div className="flex-1 flex items-center justify-start desktop:ml-10 translate-y-3">
        <GNBPrimaryNav
          role={role}
          companyId={companyId}
          activePath={currentActivePath}
          onItemClick={handlers?.onNavItemClick}
        />

        {showCategorySwitcher &&
          categories &&
          categories.length > 0 &&
          categoryState?.activeCategoryId &&
          categoryState?.onCategoryChange && (
            <div className="flex-1 flex items-center justify-center tablet:hidden">
              <GNBCategorySwitcher
                categories={categories}
                categorySections={CATEGORY_SECTIONS}
                activeCategoryId={categoryState.activeCategoryId}
                productCategoryId={categoryState.productCategoryId}
                onCategoryChange={categoryState.onCategoryChange}
                onSubCategoryChange={categoryState.onSubCategoryChange}
              />
            </div>
          )}
      </div>

      <div className="flex items-center shrink-0">
        <GNBUserActions
          companyId={companyId}
          userProfile={userProfile}
          cartCount={cartCount}
          notificationCount={unreadCount}
          onNotificationClick={handleNotificationClick}
          onLogout={handlers?.onLogout}
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
          onLogout={handlers?.onLogout ? handleSidebarLogout : undefined}
        />
      </SideBarMenu>

      {/* 알림 모달 */}
      <NotificationModal open={isNotificationModalOpen} onClose={handleNotificationModalClose} />
    </div>
  );
};

export default GNB;

// MobileCategoryBar를 별도로 export
export { MobileCategoryBar } from '@/components/molecules/MobileCategoryBar/MobileCategoryBar';
