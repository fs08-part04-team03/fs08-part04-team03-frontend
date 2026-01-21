'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { hasAccess, extractCompanyId, ROLE_LEVEL } from '@/utils/auth';
import { PATHNAME } from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';
import type { UserRole } from '@/constants/roles';

interface RoleGuardProps {
  children: ReactNode;
  /** 이 컴포넌트에 필요한 최소 역할 (명시적 최소 권한 체크) */
  requiredRole?: UserRole;
  fallback?: ReactNode;
}

export const RoleGuard = ({ children, requiredRole, fallback }: RoleGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const isRoleKnown = (role: UserRole | undefined): role is UserRole =>
    !!role && role in ROLE_LEVEL;

  const redirectToSafePage = useCallback(() => {
    const companyId = user?.companyId || extractCompanyId(pathname);
    if (companyId) {
      router.replace(PATHNAME.PRODUCTS(companyId));
      return;
    }
    router.replace(PATHNAME.LOGIN);
  }, [user?.companyId, pathname, router]);

  const hasRequiredRole = useCallback(() => {
    if (!requiredRole) return true;
    if (!user?.role) return false;
    if (!isRoleKnown(user.role) || !isRoleKnown(requiredRole)) return false;
    return ROLE_LEVEL[user.role] >= ROLE_LEVEL[requiredRole];
  }, [requiredRole, user?.role]);

  const passesRoutePolicy = useCallback(() => {
    if (!user?.role) return false;
    return hasAccess(user.role, pathname);
  }, [user?.role, pathname]);

  useEffect(() => {
    // 초기화 완료 전에는 리다이렉트하지 않음 (providers.tsx에서 로딩 표시 중)
    if (!isInitialized) return;

    if (!accessToken || !user) {
      router.replace(PATHNAME.LOGIN);
      return;
    }

    // 1) requiredRole(최소 권한) 체크
    if (!hasRequiredRole()) {
      redirectToSafePage();
      return;
    }

    // 2) 경로 기반 정책 체크 (ROUTE_PERMISSIONS / hasAccess)
    if (!passesRoutePolicy()) {
      redirectToSafePage();
    }
  }, [
    isInitialized,
    user,
    accessToken,
    router,
    hasRequiredRole,
    passesRoutePolicy,
    redirectToSafePage,
  ]);

  // 초기화 완료 전에는 null 반환 (providers.tsx에서 로딩 표시 중)
  if (!isInitialized) {
    return null;
  }

  if (!accessToken || !user) return null;

  // 렌더링 레벨에서도 동일하게 2중 체크
  if (!hasRequiredRole()) {
    return fallback ?? <div>접근 권한이 없습니다.</div>;
  }

  if (!passesRoutePolicy()) {
    return fallback ?? <div>접근 권한이 없습니다.</div>;
  }

  return children;
};

export default RoleGuard;
