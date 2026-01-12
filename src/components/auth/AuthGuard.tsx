'use client';

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { tryRefreshToken } from '@/utils/api';
import { hasAccess } from '@/utils/auth';
import { PATHNAME } from '@/constants';

interface AuthGuardProps {
  children: React.ReactNode;
  companyId: string;
}

/**
 * AuthGuard - 클라이언트 사이드 인증 및 권한 검사 컴포넌트
 *
 * - 인증되지 않은 사용자를 로그인 페이지로 리다이렉트
 * - 권한이 없는 사용자를 홈으로 리다이렉트
 * - Zustand store의 인증 정보 사용
 */
export const AuthGuard = ({ children, companyId }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, accessToken, clearAuth, isHydrated } = useAuthStore();
  const refreshAttemptedRef = useRef(false);

  useEffect(() => {
    if (!isHydrated) return;

    // accessToken이 없으면 refreshToken(httpOnly 쿠키)로 복구 시도
    if (!accessToken) {
      if (refreshAttemptedRef.current) return;
      refreshAttemptedRef.current = true;
      (async () => {
        const newToken = await tryRefreshToken();
        if (!newToken) {
          clearAuth();
          const loginUrl = `${PATHNAME.LOGIN}?redirect=${encodeURIComponent(pathname)}`;
          router.push(loginUrl);
        }
      })().catch(() => {});
      return;
    }

    if (!user) {
      const loginUrl = `${PATHNAME.LOGIN}?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
      return;
    }

    if (user.companyId !== companyId) {
      router.push(PATHNAME.PRODUCTS(user.companyId));
      return;
    }

    if (!hasAccess(user.role, pathname)) {
      router.push(PATHNAME.PRODUCTS(user.companyId));
    }
  }, [user, accessToken, clearAuth, companyId, pathname, router, isHydrated]);

  // 하이드레이션 완료 전까지는 로딩 상태 표시
  if (!isHydrated) {
    return null;
  }

  // 인증 확인 중이거나 리다이렉트 중일 때는 아무것도 렌더링하지 않음
  if (!accessToken || !user || user.companyId !== companyId) {
    return null;
  }

  // 권한 확인
  if (!hasAccess(user.role, pathname)) {
    return null;
  }

  return children;
};

export default AuthGuard;
