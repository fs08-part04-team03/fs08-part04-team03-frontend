import type { UserRole } from '@/constants/roles';
import { ROUTES, type AppRouteKey } from '@/constants/routes';

/** 역할별 GNB 노출 메뉴 키 */
export const ROLE_NAV_KEYS: Record<UserRole, AppRouteKey[]> = {
  user: ['product-list', 'purchase-request-list', 'product-register-list'],
  manager: [
    'product-list',
    'purchase-request-list',
    'product-register-list',
    'purchase-request-manage',
    'purchase-history-check',
  ],
  admin: [
    'product-list',
    'purchase-request-list',
    'product-register-list',
    'purchase-request-manage',
    'purchase-history-check',
    'management',
  ],
};

export interface GNBPrimaryNavItem {
  key: AppRouteKey;
  label: string;
  href: string;
}

/** 역할별 메뉴 라우트 조회 */
const getPrimaryNavItemsByRole = (role: UserRole): GNBPrimaryNavItem[] =>
  ROLE_NAV_KEYS[role].map((key) => ROUTES[key]);

/** GNB 메뉴 config 생성 */
export const getGNBPrimaryNavConfig = (role: UserRole): GNBPrimaryNavItem[] =>
  getPrimaryNavItemsByRole(role).map((route) => ({
    key: route.key,
    label: route.label,
    href: route.href,
  }));

/**
 * 현재 경로가 해당 메뉴에 속하는지 확인
 * - companyId 제거 후 비교
 * - 하위 경로도 active 처리
 */
export const isNavActive = (currentPath: string, targetHref: string): boolean => {
  if (!currentPath || !targetHref) return false;

  const normalizePattern = (href: string) => href.replace('/[companyId]', '') || '/';

  const normalizeCurrent = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length <= 1) return '/';
    return `/${segments.slice(1).join('/')}`;
  };

  const target = normalizePattern(targetHref);
  const current = normalizeCurrent(currentPath);

  return current === target || current.startsWith(`${target}/`);
};

/**
 * GNBCategorySwitcher 노출 여부
 *
 * - ProductListPage:        /[companyId]/products(/...)
 * - ProductDetailPage:      /[companyId]/products/[productId]
 * - MyPurchaseRequestList:  /[companyId]/purchase-request(/...)
 * - MyPurchaseRequestDetail:/[companyId]/purchase-request/[id]
 * - WishlistPage:           /[companyId]/wishlist
 * - PurchaseHistoryPage:    /[companyId]/my/purchase-requests(/...)
 */
export const shouldShowCategorySwitcher = (currentPath: string): boolean => {
  if (!currentPath) return false;

  const segments = currentPath.split('/').filter(Boolean);
  // segments[0] = companyId, segments[1] = 1차 섹션
  if (segments.length < 2) return false;

  const section = segments[1];
  const subSection = segments[2];

  if (section === 'products') return true;
  if (section === 'purchase-request') return true;
  if (section === 'wishlist') return true;
  if (section === 'my' && subSection === 'purchase-requests') return true;

  return false;
};
