'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { hasAccess, extractCompanyId, ROLE_LEVEL } from '@/utils/auth';
import { PATHNAME } from '@/constants';
import { useAuthStore } from '@/lib/auth';
import type { UserRole } from '@/constants/roles';

interface RoleGuardProps {
  children: React.ReactNode;
  /** 이 컴포넌트에 필요한 최소 역할 (명시적 권한 체크) */
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, requiredRole, fallback }) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (isLoading) return;

    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!user) {
      router.replace(PATHNAME.LOGIN);
      return;
    }

    // 1) requiredRole이 명시된 경우: 명시적 권한 체크
    if (requiredRole) {
      const userRole = user.role;

      // 알 수 없는 역할에 대한 명시적 검증
      if (!userRole || !(userRole in ROLE_LEVEL) || !(requiredRole in ROLE_LEVEL)) {
        console.warn(
          `[RoleGuard] 알 수 없는 역할 감지: userRole=${userRole}, requiredRole=${requiredRole}`
        );
        const companyId = user.companyId || extractCompanyId(pathname);
        if (companyId) {
          router.replace(PATHNAME.PRODUCTS(companyId));
        } else {
          router.replace(PATHNAME.LOGIN);
        }
        return;
      }

      // 알려진 역할에 대한 숫자 비교
      if (ROLE_LEVEL[userRole] < ROLE_LEVEL[requiredRole]) {
        const companyId = user.companyId || extractCompanyId(pathname);
        if (companyId) {
          router.replace(PATHNAME.PRODUCTS(companyId));
        } else {
          router.replace(PATHNAME.LOGIN);
        }
        return;
      }
    }

    // 2) requiredRole이 없는 경우: 경로 기반 권한 체크
    if (!hasAccess(user.role, pathname)) {
      const companyId = user.companyId || extractCompanyId(pathname);
      if (companyId) {
        router.replace(PATHNAME.PRODUCTS(companyId));
      } else {
        router.replace(PATHNAME.LOGIN);
      }
    }
  }, [isLoading, user, pathname, router, requiredRole]);

  if (isLoading) return null;

  // 인증되지 않은 사용자는 아무것도 렌더링하지 않음 (이미 useEffect에서 리다이렉트 처리)
  if (!user) {
    return null;
  }

  // 렌더링 레벨에서도 권한 체크
  // 1) requiredRole이 명시된 경우: 명시적 권한 체크
  if (requiredRole) {
    // user.role이 없으면 접근 거부
    if (!user.role) {
      return fallback ?? <div>접근 권한이 없습니다.</div>;
    }

    const userRole: UserRole = user.role;
    const requiredRoleValue: UserRole = requiredRole;

    // user.role이 ROLE_LEVEL에 존재하는지 확인 (없으면 접근 거부)
    if (!(userRole in ROLE_LEVEL)) {
      console.warn(`[RoleGuard] 알 수 없는 사용자 역할 감지: userRole=${userRole}`);
      return fallback ?? <div>접근 권한이 없습니다.</div>;
    }

    // requiredRole이 ROLE_LEVEL에 존재하는지 확인
    if (!(requiredRoleValue in ROLE_LEVEL)) {
      console.warn(`[RoleGuard] 알 수 없는 필수 역할 감지: requiredRole=${requiredRoleValue}`);
      return fallback ?? <div>접근 권한이 없습니다.</div>;
    }

    // 권한 레벨 비교 (부족하면 접근 거부)
    if (ROLE_LEVEL[userRole] < ROLE_LEVEL[requiredRoleValue]) {
      return fallback ?? <div>접근 권한이 없습니다.</div>;
    }

    // requiredRole 체크를 통과했으므로 children 반환 (hasAccess 호출하지 않음)
    return children;
  }

  // 2) requiredRole이 없는 경우: 경로 기반 권한 체크
  if (!hasAccess(user.role, pathname)) {
    return fallback ?? <div>접근 권한이 없습니다.</div>;
  }

  return children;
};

export default RoleGuard;
