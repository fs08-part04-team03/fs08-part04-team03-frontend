import type { UserRole } from '@/constants/roles';

/**
 * 라우트 경로별 필요한 최소 권한
 * - user: 일반 사용자
 * - manager: 관리자 (manager, admin 모두 접근 가능)
 * - admin: 최고관리자만 접근 가능
 *
 * 이 객체의 key는 "정규화된 경로 패턴"입니다.
 *   예) '/[companyId]/admin', '/[companyId]/manager/requests'
 */
export const ROUTE_PERMISSIONS: Record<string, UserRole> = {
  // 최고관리자 (admin) 전용
  '/[companyId]/admin': 'admin',
  '/[companyId]/admin/users': 'admin',
  '/[companyId]/admin/budget': 'admin',

  // 관리자 (manager) 전용
  '/[companyId]/manager': 'manager',
  '/[companyId]/manager/requests': 'manager',
  '/[companyId]/manager/purchase-history': 'manager',

  // 사용자 (user) 이상
  '/[companyId]/purchase-request': 'user',
  '/[companyId]/my': 'user',
  '/[companyId]/products/my': 'user',
} as const;

/**
 * 역할별 권한 레벨
 * - 숫자가 높을수록 더 높은 권한
 */
export const ROLE_LEVEL: Record<UserRole, number> = {
  user: 1,
  manager: 2,
  admin: 3,
};

/**
 * 경로에서 첫 번째 세그먼트 추출
 * - 예: '/123/admin/users' → '123'
 * - 예: '/login' → 'login'
 *
 * 실제로 이 값이 companyId인지 여부는
 * 호출하는 쪽(middleware 등)에서 보장해야 한다.
 */
export const extractCompanyId = (pathname: string): string | null => {
  const match = pathname.match(/^\/([^/]+)/);
  return match?.[1] ?? null;
};

/**
 * 경로 정규화 (companyId를 [companyId]로 변환)
 *
 * - 예: '/123/admin' → '/[companyId]/admin'
 * - 예: '/123/manager/requests' → '/[companyId]/manager/requests'
 * - 세그먼트가 2개 이상인 경우에만 변환한다.
 *   (예: '/login', '/signup', '/invite' 등은 그대로 유지)
 */
export const normalizePath = (pathname: string): string => {
  if (!pathname.startsWith('/')) return pathname;

  const segments = pathname.split('/'); // ['', '123', 'admin', 'users']

  // 세그먼트가 2개 이하이면 (/ 또는 /something) 그대로 반환
  if (segments.length < 3) {
    return pathname;
  }

  // 첫 번째 실제 세그먼트를 [companyId]로 치환
  segments[1] = '[companyId]';

  return segments.join('/');
};

/**
 * 사용자가 해당 경로에 접근할 수 있는지 확인
 *
 * @param userRole   현재 사용자 역할 (user | manager | admin | null)
 * @param path       실제 경로 (예: '/123/admin/users')
 */
export const hasAccess = (userRole: UserRole | null, path: string): boolean => {
  if (!userRole) return false;

  // 1) 먼저 정규화된 경로로 정확 매칭 시도
  const normalizedPath = normalizePath(path);
  const exactPermission = ROUTE_PERMISSIONS[normalizedPath];

  if (exactPermission) {
    return ROLE_LEVEL[userRole] >= ROLE_LEVEL[exactPermission];
  }

  // 2) 정의된 패턴들에 대해 동적 라우트 매칭
  const matchedRoute = Object.entries(ROUTE_PERMISSIONS).find(([routePattern]) => {
    // routePattern: '/[companyId]/admin/users'
    // → '/[^/]+/admin/users' 로 변환
    const pattern = routePattern.replace(/\[(\w+)\]/g, '[^/]+');
    const regex = new RegExp(`^${pattern}(?:/|$)`);
    return regex.test(path);
  });

  if (matchedRoute) {
    const [, requiredRole] = matchedRoute;
    return ROLE_LEVEL[userRole] >= ROLE_LEVEL[requiredRole];
  }

  // 3) 권한이 명시되지 않은 경로는 "인증된 사용자면 모두 접근 가능"으로 처리
  return true;
};
