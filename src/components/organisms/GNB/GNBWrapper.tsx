'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
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
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  // 로그아웃 핸들러
  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  // TODO: Cart API 연결 후 실제 데이터로 교체
  // const { data: cartData } = useCartQuery();
  // const cartCount = cartData?.totalItems || 0;

  // TODO: UserProfile 컴포넌트 구현 후 추가
  // const userProfile = user ? (
  //   <UserProfileAvatar
  //     name={user.name}
  //     avatar={user.avatar}
  //   />
  // ) : null;

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
      // userProfile={userProfile}
      // {...categoryProps}
    />
  );
};

export default GNBWrapper;
