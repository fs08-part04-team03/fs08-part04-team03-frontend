'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { clearAuthCookies } from '@/utils/cookies';
import { logout } from '@/features/auth/api/auth.api';
import { getCompany } from '@/features/profile/api/company.api';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import GNB from './GNB';

/**
 * GNBWrapper
 *
 * GNB를 실제 서비스 맥락에 맞게 동작시키는 컨트롤러
 * - 인증 상태 조회 및 role 주입
 * - 로그아웃 핸들러
 * - Cart count, User profile 등 데이터 주입
 */
export const GNBWrapper: React.FC = () => {
  const { user, accessToken, clearAuth } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const [companyName, setCompanyName] = useState<string>('');

  // 회사 정보 조회 (GNB에 표시할 회사명)
  // Authorization 헤더를 포함하여 API 호출
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!accessToken) return;

      try {
        const company = await getCompany(accessToken);
        setCompanyName(company.name);
      } catch (error) {
        // 네트워크 에러는 조용히 처리 (개발 환경에서만 로그)
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[GNBWrapper] 회사 정보 조회 실패:', error);
        }
        // 실패 시 기본값 사용 (사용자에게는 에러를 표시하지 않음)
        setCompanyName('SNACK');
      }
    };

    // eslint-disable-next-line no-void
    void fetchCompanyData();
  }, [accessToken]);

  // 로그아웃 핸들러 (비동기 작업을 수행하지만 void를 반환)
  const handleLogout = () => {
    // 비동기 작업을 시작하지만 Promise를 반환하지 않음
    (async () => {
      try {
        // 서버 측 쿠키 삭제
        await clearAuthCookies();
        // 로그아웃 API 호출 (백엔드 세션 정리)
        await logout();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('로그아웃 처리 중 오류:', error);
        // 에러가 발생해도 클라이언트 상태는 정리
      } finally {
        // 클라이언트 상태 정리
        clearAuth();
        router.push('/login');
      }
    })().catch(() => {
      // Promise rejection 처리 (이미 catch 블록에서 처리되지만 린터를 위해 추가)
    });
  };

  // TODO: Cart API 연결 후 실제 데이터로 교체
  // const { data: cartData } = useCartQuery();
  // const cartCount = cartData?.totalItems || 0;

  const companyId = (params?.companyId as string) || user?.companyId || '';
  const userProfile = user ? (
    <UserProfile
      name={user.name}
      company={{ name: companyName }}
      profileHref={`/${companyId}/my/profile`}
      variant="secondary"
    />
  ) : null;

  // TODO: 상품 페이지에서 Category 관련 로직 추가
  // const pathname = usePathname();
  // const isProductPage = pathname?.includes('/products');
  // const categoryProps = isProductPage ? {
  //   categories: PARENT_CATEGORIES,
  //   activeCategoryId: currentCategory,
  //   onCategoryChange: handleCategoryChange,
  // } : {};

  return (
    <GNB
      role={user?.role || 'user'}
      cartCount={0}
      onLogout={handleLogout}
      userProfile={userProfile}
      // {...categoryProps}
    />
  );
};

export default GNBWrapper;
