import type { UserRole } from './roles';
import { ROUTES, type AppRouteKey } from './routes';

/**
 * 역할별로 GNB에서 보여줄 메뉴 목록
 */
const ROLE_NAV_KEYS: Record<UserRole, AppRouteKey[]> = {
  // 사용자: 상품 리스트 / 구매 요청 내역 / 상품 등록 내역
  user: ['product-list', 'purchase-request-list', 'product-register-list'],

  // 관리자: 유저 메뉴 + 구매 요청 관리 + 구매 내역 확인
  manager: [
    'product-list',
    'purchase-request-list',
    'product-register-list',
    'purchase-request-manage',
    'purchase-history-check',
  ],

  // 최고관리자: 모든 메뉴
  admin: [
    'product-list',
    'purchase-request-list',
    'product-register-list',
    'purchase-request-manage',
    'purchase-history-check',
    'management',
  ],
};

/**
 * 역할별로 라우트 객체 배열을 만들어주는 내부 함수
 */
const getPrimaryNavItemsByRole = (role: UserRole) => ROLE_NAV_KEYS[role].map((key) => ROUTES[key]);

/**
 * GNB에서 사용할 메뉴 config 반환
 */
export const getGNBPrimaryNavConfig = (role: UserRole) =>
  getPrimaryNavItemsByRole(role).map((route) => ({
    key: route.key,
    label: route.label,
    href: route.href,
  }));

/**
 * 현재 페이지가 특정 메뉴에 속하는지 판단하는 함수
 *
 * - /[companyId] 제거
 * - 하위 경로도 active 처리
 *
 * 예:
 * currentPath: /acme/products/mine
 * targetHref:  /[companyId]/products
 * → active = true
 */
export const isNavActive = (currentPath: string, targetHref: string): boolean => {
  if (!currentPath || !targetHref) return false;

  // /[companyId] 제거한 패턴
  const normalizePattern = (href: string) => href.replace('/[companyId]', '') || '/';

  // 실제 경로에서 회사 ID 제거
  const normalizeCurrent = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length <= 1) return '/';
    return `/${segments.slice(1).join('/')}`;
  };

  const target = normalizePattern(targetHref); // ex: /products
  const current = normalizeCurrent(currentPath); // ex: /products/mine

  return current === target || current.startsWith(`${target}/`);
};
