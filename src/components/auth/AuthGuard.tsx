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
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const refreshAttemptedRef = useRef(false);

  useEffect(() => {
    if (!isHydrated) return;

    // accessToken이 없으면 refreshToken(httpOnly 쿠키)로 복구 시도
    if (!accessToken) {
      if (refreshAttemptedRef.current) return;
      refreshAttemptedRef.current = true;
      (async () => {
        try {
          const newToken = await tryRefreshToken();
          if (!newToken) {
            // refresh token 만료/없음(401)이어도 여기서 localStorage를 지우면
            // "포커스 복귀 시 갑자기 로그아웃"처럼 보일 수 있음 → 리다이렉트만 수행
            const loginUrl = `${PATHNAME.LOGIN}?redirect=${encodeURIComponent(pathname)}`;
            router.push(loginUrl);
          }
        } catch {
          // 일시 장애(네트워크/타임아웃)로 refresh 실패 시에는 localStorage를 지우지 않음
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
