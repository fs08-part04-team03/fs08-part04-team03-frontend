'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { hasAccess } from '@/utils/auth';

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
  const { user, isHydrated } = useAuthStore();

  useEffect(() => {
    // 하이드레이션이 완료되지 않았으면 리다이렉트하지 않음
    if (!isHydrated) return;

    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!user) {
      const loginUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(loginUrl);
      return;
    }

    // 회사 ID 불일치 확인
    if (user.companyId !== companyId) {
      // 사용자의 실제 회사 페이지로 리다이렉트
      router.push(`/${user.companyId}/products`);
      return;
    }

    // 권한 확인
    if (!hasAccess(user.role, pathname)) {
      // 권한이 없으면 홈(상품 목록)으로 리다이렉트
      router.push(`/${user.companyId}/products`);
    }
  }, [user, companyId, pathname, router, isHydrated]);

  // 하이드레이션 완료 전까지는 로딩 상태 표시
  if (!isHydrated) {
    return null;
  }

  // 인증 확인 중이거나 리다이렉트 중일 때는 아무것도 렌더링하지 않음
  if (!user || user.companyId !== companyId) {
    return null;
  }

  // 권한 확인
  if (!hasAccess(user.role, pathname)) {
    return null;
  }

  return children;
};

export default AuthGuard;
