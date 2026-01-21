'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
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
 * - 초기화(refreshToken으로 복원)는 providers.tsx에서 처리됨
 */
export const AuthGuard = ({ children, companyId }: AuthGuardProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    // 초기화 완료 전에는 대기 (providers.tsx에서 로딩 표시 중)
    if (!isInitialized) return;

    // 초기화 완료 후 accessToken이 없으면 로그인 필요
    if (!accessToken) {
      const loginUrl = `${PATHNAME.LOGIN}?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
      return;
    }

    // user 정보가 없으면 로그인 필요
    if (!user) {
      const loginUrl = `${PATHNAME.LOGIN}?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
      return;
    }

    // 다른 회사 사용자는 자신의 회사 페이지로 리다이렉트
    if (user.companyId !== companyId) {
      router.push(PATHNAME.PRODUCTS(user.companyId));
      return;
    }

    // 권한이 없으면 상품 페이지로 리다이렉트
    if (!hasAccess(user.role, pathname)) {
      router.push(PATHNAME.PRODUCTS(user.companyId));
    }
  }, [user, accessToken, companyId, pathname, router, isInitialized]);

  // 초기화 완료 전에는 null 반환 (providers.tsx에서 로딩 표시 중)
  if (!isInitialized) {
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
