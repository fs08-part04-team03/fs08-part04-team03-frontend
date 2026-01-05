import type { UserRole } from '@/constants/roles';
import { ROUTES, type AppRouteKey } from '@/constants/routes';

/** 역할별 GNB 노출 메뉴 키 */
export const ROLE_NAV_KEYS: Record<UserRole, AppRouteKey[]> = {
  user: ['product-list', 'my-purchase-request-list', 'product-register-list', 'wishlist'],
  manager: [
    'product-list',
    'my-purchase-request-list',
    'product-register-list',
    'purchase-request-list-manager',
    'purchase-history-check',
  ],
  admin: [
    'product-list',
    'my-purchase-request-list',
    'product-register-list',
    'purchase-request-list-manager',
    'purchase-history-check',
    'management',
  ],
};

export interface GNBPrimaryNavItem {
  key: AppRouteKey;
  label: string;
  href: string;
}

/** GNB 메뉴 config 생성 */
export const getGNBPrimaryNavConfig = (role: UserRole): GNBPrimaryNavItem[] =>
  ROLE_NAV_KEYS[role].map((key) => ({
    key,
    ...ROUTES[key],
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
 * - MyPurchaseRequestList:  /[companyId]/my
 * - MyPurchaseRequestDetail:/[companyId]/my/purchase-requests/[id]
 * - WishlistPage:           /[companyId]/wishlist
 * - PurchaseRequestPage:    /[companyId]/purchase-request(/...)
 */
export const shouldShowCategorySwitcher = (currentPath: string): boolean => {
  if (!currentPath) return false;

  const segments = currentPath.split('/').filter(Boolean);
  // segments[0] = companyId, segments[1] = 1차 섹션
  if (segments.length < 2) return false;

  const section = segments[1];

  if (section === 'products') return true;
  if (section === 'purchase-request') return true;
  if (section === 'wishlist') return true;
  if (section === 'my') return true;

  return false;
};
