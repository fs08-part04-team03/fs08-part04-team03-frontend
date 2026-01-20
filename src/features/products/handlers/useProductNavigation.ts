/**
 * Products 도메인 네비게이션 핸들러
 */

import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { PATHNAME } from '@/constants';
import { cartKeys } from '@/features/cart/queries/cart.keys';
import { logger } from '@/utils/logger';

/**
 * 상품 관련 네비게이션 핸들러 훅
 */
export function useProductNavigation(companyId: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  /**
   * 카테고리 변경 핸들러
   */
  const handleCategoryChange = useCallback(
    (categoryId: number | null) => {
      const params = new URLSearchParams(searchParams?.toString() || '');
      if (categoryId === null) {
        params.delete('categoryId');
      } else {
        params.set('categoryId', String(categoryId));
      }

      // 카테고리 변경 시 검색어 초기화
      params.delete('q');

      const newUrl = `${PATHNAME.PRODUCTS(companyId)}${params.toString() ? `?${params.toString()}` : ''}`;
      router.push(newUrl);
    },
    [companyId, router, searchParams]
  );

  /**
   * 검색 핸들러
   */
  const handleSearch = useCallback(
    (query: string) => {
      const currentQuery = searchParams?.get('q') || '';
      if (currentQuery === query) return;

      const params = new URLSearchParams(searchParams?.toString() || '');
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      const newUrl = `${PATHNAME.PRODUCTS(companyId)}${params.toString() ? `?${params.toString()}` : ''}`;
      router.push(newUrl);
    },
    [companyId, router, searchParams]
  );

  /**
   * 상품 상세 페이지로 이동
   */
  const goToProductDetail = useCallback(
    (productId: number) => {
      router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
    },
    [companyId, router]
  );

  /**
   * 카테고리별 상품 목록으로 이동
   */
  const goToProductsByCategory = useCallback(
    (categoryId: number | null) => {
      if (categoryId === null) {
        router.push(PATHNAME.PRODUCTS(companyId));
        return;
      }
      router.push(`${PATHNAME.PRODUCTS(companyId)}?categoryId=${categoryId}`);
    },
    [companyId, router]
  );

  /**
   * 상품 목록으로 이동
   */
  const goToProducts = useCallback(() => {
    router.push(PATHNAME.PRODUCTS(companyId));
  }, [companyId, router]);

  /**
   * 내 상품 목록으로 이동
   */
  const goToMyProducts = useCallback(() => {
    router.push(PATHNAME.PRODUCT_MINE(companyId));
  }, [companyId, router]);

  /**
   * 장바구니로 이동 (캐시 무효화 포함)
   */
  const goToCart = useCallback(async () => {
    try {
      // 장바구니 캐시를 무효화하여 최신 데이터를 가져오도록 함 (refetchOnMount로 자동 갱신)
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });
      router.push(PATHNAME.CART(companyId));
    } catch (error) {
      // 에러 발생 시 로그만 남기고 계속 진행
      logger.error('Failed to invalidate cart before navigation', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      });
      // 에러가 발생해도 페이지 이동은 진행
      router.push(PATHNAME.CART(companyId));
    }
  }, [companyId, router, queryClient]);

  return useMemo(
    () => ({
      handleCategoryChange,
      handleSearch,
      goToProductDetail,
      goToProductsByCategory,
      goToProducts,
      goToMyProducts,
      goToCart,
    }),
    [
      handleCategoryChange,
      handleSearch,
      goToProductDetail,
      goToProductsByCategory,
      goToProducts,
      goToMyProducts,
      goToCart,
    ]
  );
}
