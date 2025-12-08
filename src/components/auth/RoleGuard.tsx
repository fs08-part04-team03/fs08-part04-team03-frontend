'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { hasAccess, extractCompanyId } from '@/utils/auth';
import { PATHNAME } from '@/constants';
import { useAuthStore, type User } from '@/lib/auth';

interface RoleGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * RoleGuard
 *
 * 1. zustand(authStore)에서 accessToken / user 상태를 읽는다.
 * 2. user가 없지만 accessToken은 있으면 /auth/me를 호출해서 user 정보를 가져온다.
 * 3. user.role과 현재 pathname을 가지고 hasAccess로 권한을 확인한다.
 * 4. 권한이 없으면 회사 홈(/[companyId]/products) 또는 /login으로 리다이렉트한다.
 *
 * ※ 실제 프로젝트에서 middleware로 1차 방어를 하고,
 *    RoleGuard는 UI 레벨에서 2차 방어 + fallback UI를 주는 용도로 사용하면 좋다.
 */
const RoleGuard: React.FC<RoleGuardProps> = ({ children, fallback }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user, accessToken, isLoading, setAuth, clearAuth, startLoading, finishLoading } =
    useAuthStore();

  /**
   * 1) user가 없고 accessToken만 있는 경우,
   *    서버에 /auth/me를 호출해서 user 정보를 채운다.
   */
  useEffect(() => {
    const hydrateUserFromToken = async () => {
      // 이미 로딩 중이거나 accessToken이 없으면 아무것도 하지 않음
      if (isLoading || !accessToken) return;

      // user가 이미 있으면 굳이 /auth/me 재호출하지 않음
      if (user) return;

      try {
        startLoading();

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: 'include', // refreshToken 쿠키를 함께 보내고 싶다면 유지
        });

        if (!res.ok) {
          // 토큰이 만료되었거나 유효하지 않으면 로그아웃 처리
          clearAuth();
          router.replace('/login');
          return;
        }

        const data = (await res.json()) as User;

        // user + accessToken 동시 세팅
        setAuth({ user: data, accessToken });
      } catch {
        clearAuth();
        router.replace('/login');
      } finally {
        finishLoading();
      }
    };

    hydrateUserFromToken().catch(() => {
      // 에러는 hydrateUserFromToken 내부에서 처리되므로 여기서는 무시
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, clearAuth, finishLoading, isLoading, router, setAuth, startLoading, user]);

  /**
   * 2) user가 있고(또는 /auth/me까지 끝났고), 권한 체크 로직
   */
  useEffect(() => {
    if (isLoading) return;

    // 아직 로그인 안 된 상태라면 여기서 바로 리다이렉트할지,
    // 미들웨어에 맡길지는 정책에 따라 결정
    if (!user) {
      // 미들웨어가 이미 1차로 막는 구조라면 그냥 return만 하고
      // 여기서 리다이렉트는 안 해도 됨.
      return;
    }

    // 현재 pathname에 대해 hasAccess로 권한 체크
    if (!hasAccess(user.role, pathname)) {
      const companyId = user.companyId || extractCompanyId(pathname);

      if (companyId) {
        router.replace(PATHNAME.PRODUCTS(companyId));
      } else {
        router.replace('/login');
      }
    }
  }, [isLoading, pathname, router, user]);

  /**
   * 렌더링 분기
   */

  // global auth 로딩 중
  if (isLoading) {
    return null; // 또는 <Spinner /> 같은 로딩 컴포넌트
  }

  // 아직 user가 없다면 (미들웨어가 이미 비인증 사용자를 거르고 있다고 가정)
  if (!user) {
    return fallback || null;
  }

  // 클라이언트 렌더링 레벨에서도 한 번 더 권한 체크
  // user가 존재하면 user.role은 항상 UserRole 타입이지만, 타입 체크를 위해 명시적으로 처리
  if (!user.role || !hasAccess(user.role, pathname)) {
    return fallback || <div>접근 권한이 없습니다.</div>;
  }

  return children;
};

export default RoleGuard;
