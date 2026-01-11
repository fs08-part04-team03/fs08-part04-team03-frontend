'use client';

import { useRouter } from 'next/navigation';
import { AUTH_REDIRECT_PATHS } from '@/features/auth/utils/constants';
import type { User } from '@/lib/store/authStore';

/**
 * 인증 후 리다이렉트 훅
 * - 회원가입/로그인 후 상품 페이지로 리다이렉트
 */
export function useAuthRedirect() {
  const router = useRouter();

  const redirectToProducts = (user: User) => {
    const redirectPath = AUTH_REDIRECT_PATHS.PRODUCTS(user.companyId);
    router.push(redirectPath);
  };

  return {
    redirectToProducts,
  };
}
