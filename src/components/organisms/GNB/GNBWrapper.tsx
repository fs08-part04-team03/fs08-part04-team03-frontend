'use client';

import React, { useMemo } from 'react';
import { useRouter, useParams, usePathname, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { PATHNAME } from '@/constants';
import { clearAuthCookies } from '@/utils/cookies';
import { logout } from '@/features/auth/api/auth.api';
import { getCompany } from '@/features/profile/api/company.api';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import {
  PARENT_CATEGORY_OPTIONS,
  CATEGORY_SECTIONS,
  type ParentCategoryKey,
  type AppRouteKey,
} from '@/constants';
import { getChildById } from '@/constants/categories/categories.utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductById } from '@/features/products/api/products.api';
import { cartApi } from '@/features/cart/api/cart.api';
import { getMyProfile } from '@/features/profile/api/profile.api';
import { logger } from '@/utils/logger';
import { STALE_TIME } from '@/constants/staleTime';
import { profileKeys } from '@/features/profile/queries/profile.keys';
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  // 회사 정보 조회 (React Query로 관리)
  const { data: companyData } = useQuery({
    queryKey: profileKeys.company(),
    queryFn: () => {
      if (!accessToken) throw new Error('No access token');
      return getCompany(accessToken);
    },
    enabled: !!accessToken,
    staleTime: STALE_TIME.FIVE_MINUTES,
    retry: 1,
    // 에러 발생 시 기본값 사용
    placeholderData: { id: '', name: 'SNACK' },
  });

  const companyName = companyData?.name || 'SNACK';

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
        logger.error('Logout process error', {
          hasError: true,
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        });
        // 에러가 발생해도 클라이언트 상태는 정리
      } finally {
        // 클라이언트 상태 정리
        clearAuth();
        router.push(PATHNAME.LOGIN);
      }
    })().catch(() => {
      // Promise rejection 처리 (이미 catch 블록에서 처리되지만 린터를 위해 추가)
    });
  };

  const companyId = (params?.companyId as string) || user?.companyId || '';

  // 장바구니 아이템 개수 조회
  const { data: cartData } = useQuery({
    queryKey: ['cart', 1, 1], // 장바구니 페이지와 동일한 queryKey 패턴 사용
    queryFn: () => cartApi.getMyCart(1, 1), // 최소한의 데이터만 조회 (summary만 필요)
    enabled: !!companyId && !!user, // companyId와 user가 있을 때만 조회
    staleTime: STALE_TIME.NONE, // 캐시 없이 항상 최신 데이터 사용
    refetchOnWindowFocus: true, // 창 포커스 시 자동 refetch
    refetchOnMount: true, // 마운트 시 항상 refetch
  });

  const cartCount = cartData?.summary?.totalItems || 0;

  // 사용자 프로필 정보 조회 (profileImage 포함)
  const { data: myProfile } = useQuery({
    queryKey: profileKeys.myProfile(),
    queryFn: () => getMyProfile(),
    enabled: !!user && !!accessToken,
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });

  // 프로필 이미지 URL 생성
  // profileImage가 URL 형식이면 그대로 사용, S3 키 형식이면 프록시 API URL로 변환
  const avatarSrc = (() => {
    if (!myProfile?.profileImage) {
      return undefined;
    }
    const { profileImage } = myProfile;

    // 이미 URL 형식이면 그대로 사용
    if (profileImage.startsWith('http://') || profileImage.startsWith('https://')) {
      return profileImage;
    }
    // S3 키 형식이면 프록시 API URL로 변환
    // users/ 접두사가 없으면 추가 (프록시 API가 자동으로 처리하지만 명시적으로 추가)
    const imageKey = profileImage.startsWith('users/') ? profileImage : `users/${profileImage}`;
    return `/api/product/image?key=${encodeURIComponent(imageKey)}`;
  })();

  const userProfile = user ? (
    <UserProfile
      name={user.name}
      company={{ name: companyName }}
      avatarSrc={avatarSrc}
      profileHref={`/${companyId}/my/profile`}
      variant="secondary"
    />
  ) : null;

  // 상품 페이지 또는 위시리스트 페이지에서만 카테고리 스위처 표시
  const isProductOrWishlistPage = useMemo(() => {
    if (!pathname) return false;
    return pathname.includes('/products') || pathname.includes('/wishlist');
  }, [pathname]);

  // 상품 디테일 페이지인지 확인
  const isProductDetailPage = useMemo(() => {
    if (!pathname) return false;
    // /products/[productId] 또는 /products/my/[productId] 형식
    return (
      pathname.match(/\/products\/[^/]+$/) !== null ||
      pathname.match(/\/products\/my\/[^/]+$/) !== null
    );
  }, [pathname]);

  // 상품 ID 추출 (디테일 페이지인 경우)
  const productId = useMemo(() => {
    if (!isProductDetailPage) return null;
    const pathSegments = pathname?.split('/') || [];
    return pathSegments[pathSegments.length - 1] || null;
  }, [isProductDetailPage, pathname]);

  // 상품 정보 조회 (디테일 페이지인 경우)
  const { data: productData } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId!),
    enabled: !!productId && isProductDetailPage,
    staleTime: STALE_TIME.FIVE_MINUTES,
  });

  // 상품의 대분류 ID (디테일 페이지용)
  const productCategoryId = useMemo(() => {
    if (!productData?.categoryId) return undefined;
    const childCategory = getChildById(productData.categoryId);
    if (!childCategory) return undefined;
    const parentCategory = PARENT_CATEGORY_OPTIONS.find(
      (c) => c.parentId === childCategory.parentId
    );
    return parentCategory?.id;
  }, [productData]);

  // 현재 선택된 카테고리 ID (URL 쿼리 파라미터에서 가져오거나 상품 카테고리 사용)
  const activeCategoryId = useMemo(() => {
    if (!isProductOrWishlistPage) return undefined;

    // 디테일 페이지인 경우 상품의 카테고리 사용
    if (isProductDetailPage && productCategoryId) {
      return productCategoryId;
    }

    // categoryId 쿼리 파라미터가 없으면 "all" (모든 상품)
    const categoryIdParam = searchParams?.get('categoryId');
    const categoryParam = searchParams?.get('category');

    // categoryId나 category 파라미터가 없으면 "all" 반환
    if (!categoryIdParam && !categoryParam) {
      return 'all' as ParentCategoryKey;
    }

    // categoryId 쿼리 파라미터에서 소분류 ID를 읽어서 대분류 찾기
    if (categoryIdParam) {
      const childCategoryId = Number.parseInt(categoryIdParam, 10);
      // 소분류 ID로 대분류 찾기
      const childCategory = CATEGORY_SECTIONS.find((section) =>
        section.options.some((opt) => opt.value === childCategoryId)
      );
      if (childCategory) {
        const parentCategory = PARENT_CATEGORY_OPTIONS.find((c) => c.parentId === childCategory.id);
        return parentCategory?.id;
      }
    }

    // category 파라미터로 대분류 찾기
    if (categoryParam) {
      const categoryId = Number.parseInt(categoryParam, 10);
      const parentCategory = PARENT_CATEGORY_OPTIONS.find((c) => c.parentId === categoryId);
      if (parentCategory) {
        return parentCategory.id;
      }
    }

    // 기본값: "all" (모든 상품)
    return 'all' as ParentCategoryKey;
  }, [isProductOrWishlistPage, isProductDetailPage, productCategoryId, searchParams]);

  // 카테고리 변경 핸들러 (대분류)
  const handleCategoryChange = (categoryKey: ParentCategoryKey | 'all') => {
    if (!isProductOrWishlistPage) return;

    // "all" 선택 시 모든 상품 보기 (쿼리 파라미터 없이)
    if (categoryKey === 'all') {
      // products 쿼리 무효화 (active observer가 있으면 자동으로 refetch됨)
      queryClient.invalidateQueries({ queryKey: ['products'] }).catch(() => {});
      router.push(PATHNAME.PRODUCTS(companyId));
      return;
    }

    const category = PARENT_CATEGORY_OPTIONS.find((c) => c.id === categoryKey);
    if (category) {
      // products 쿼리 무효화 (active observer가 있으면 자동으로 refetch됨)
      queryClient.invalidateQueries({ queryKey: ['products'] }).catch(() => {});
      // 상품 페이지로 이동하면서 카테고리 쿼리 파라미터 추가
      router.push(`${PATHNAME.PRODUCTS(companyId)}?category=${category.parentId}`);
    }
  };

  // 소분류 카테고리 변경 핸들러
  const handleSubCategoryChange = (subCategoryId: number) => {
    if (!isProductOrWishlistPage) return;
    // products 쿼리 무효화 (active observer가 있으면 자동으로 refetch됨)
    queryClient.invalidateQueries({ queryKey: ['products'] }).catch(() => {});
    // 소분류 ID로 필터링하기 위해 categoryId 쿼리 파라미터 업데이트
    router.push(`${PATHNAME.PRODUCTS(companyId)}?categoryId=${subCategoryId}`);
  };

  // 네비게이션 아이템 클릭 핸들러 (상품 페이지로 이동 시 refetch)
  const handleNavItemClick = (key: AppRouteKey) => {
    // 상품 페이지로 이동하는 경우 products 쿼리 refetch
    if (key === 'product-list') {
      queryClient.refetchQueries({ queryKey: ['products'] }).catch(() => {});
    }
  };

  return (
    <GNB
      role={user?.role || 'user'}
      cartCount={cartCount}
      onLogout={handleLogout}
      userProfile={userProfile}
      categories={isProductOrWishlistPage && activeCategoryId ? PARENT_CATEGORY_OPTIONS : undefined}
      activeCategoryId={isProductOrWishlistPage && activeCategoryId ? activeCategoryId : undefined}
      productCategoryId={isProductDetailPage ? productCategoryId : undefined}
      onCategoryChange={
        isProductOrWishlistPage && activeCategoryId ? handleCategoryChange : undefined
      }
      onSubCategoryChange={
        isProductOrWishlistPage && activeCategoryId ? handleSubCategoryChange : undefined
      }
      onNavItemClick={handleNavItemClick}
    />
  );
};

export default GNBWrapper;
