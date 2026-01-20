/**
 * GNB Props 타입 정의
 * Props Drilling 개선을 위한 그룹화된 타입
 */

import type { ReactNode } from 'react';
import type { UserRole, AppRouteKey, ParentCategoryKey, ParentCategoryOption } from '@/constants';

/**
 * 기본 GNB 정보
 */
export interface GNBBaseState {
  role: UserRole;
  userProfile?: ReactNode;
  cartCount?: number;
  className?: string;
  isLoadingProfile?: boolean;
}

/**
 * GNB 핸들러
 */
export interface GNBHandlers {
  onLogout?: () => void;
  onMenuClick?: () => void;
  onNavItemClick?: (key: AppRouteKey) => void;
}

/**
 * 네비게이션 상태
 */
export interface GNBNavigationState {
  activePath?: string;
}

/**
 * 카테고리 상태
 */
export interface GNBCategoryState {
  categories?: ParentCategoryOption[];
  activeCategoryId?: ParentCategoryKey;
  productCategoryId?: ParentCategoryKey;
  onCategoryChange?: (id: ParentCategoryKey) => void;
  onSubCategoryChange?: (id: number) => void;
}
