'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams, usePathname, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { clearAuthCookies } from '@/utils/cookies';
import { logout } from '@/features/auth/api/auth.api';
import { getCompany } from '@/features/profile/api/company.api';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import { PARENT_CATEGORY_OPTIONS, CATEGORY_SECTIONS, type ParentCategoryKey } from '@/constants';
import { getChildById } from '@/constants/categories/categories.utils';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/features/products/api/products.api';
import { logger } from '@/utils/logger';
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
        logger.error('Failed to fetch company information', {
          hasError: true,
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        });
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
        logger.error('Logout process error', {
          hasError: true,
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        });
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
    staleTime: 5 * 60 * 1000,
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

    // categoryId 쿼리 파라미터에서 소분류 ID를 읽어서 대분류 찾기
    const categoryIdParam = searchParams?.get('categoryId');
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

    // 기본값: 첫 번째 카테고리
    return PARENT_CATEGORY_OPTIONS[0]?.id;
  }, [isProductOrWishlistPage, isProductDetailPage, productCategoryId, searchParams]);

  // 카테고리 변경 핸들러 (대분류)
  const handleCategoryChange = (categoryKey: ParentCategoryKey) => {
    if (!isProductOrWishlistPage) return;
    const category = PARENT_CATEGORY_OPTIONS.find((c) => c.id === categoryKey);
    if (category) {
      // 상품 페이지로 이동하면서 카테고리 쿼리 파라미터 추가
      router.push(`/${companyId}/products?category=${category.parentId}`);
    }
  };

  // 소분류 카테고리 변경 핸들러
  const handleSubCategoryChange = (subCategoryId: number) => {
    if (!isProductOrWishlistPage) return;
    // 소분류 ID로 필터링하기 위해 categoryId 쿼리 파라미터 업데이트
    router.push(`/${companyId}/products?categoryId=${subCategoryId}`);
  };

  return (
    <GNB
      role={user?.role || 'user'}
      cartCount={0}
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
    />
  );
};

export default GNBWrapper;
