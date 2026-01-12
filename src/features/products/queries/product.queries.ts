'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllProducts,
  getProductById,
  getMyProductById,
  getMyRegisteredProducts,
  updateMyProduct,
  deleteProduct,
} from '@/features/products/api/products.api';
import { useAuthStore } from '@/lib/store/authStore';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

import type { BackendProduct } from '@/features/products/utils/product.utils';
import type {
  GetAllProductsResponse,
  GetRegisteredProductsResponse,
  UpdateMyProductData,
  UpdateMyProductOptions,
} from '@/features/products/api/products.api';
import { STALE_TIME } from '@/constants/staleTime';

import { productKeys } from './product.keys';

/**
 * 전체 상품 목록 조회 훅
 */
export function useProducts(params?: {
  categoryId?: number | null;
  sort?: string;
  searchQuery?: string;
  enabled?: boolean;
}) {
  const { accessToken } = useAuthStore();
  const { categoryId, sort, searchQuery, enabled = true } = params || {};

  return useQuery<GetAllProductsResponse>({
    queryKey: productKeys.list(
      categoryId ?? null,
      sort ?? 'latest',
      searchQuery ?? '',
      !!accessToken
    ),
    queryFn: async () => {
      const result = await getAllProducts({
        sort: sort ?? undefined,
        categoryId: categoryId ?? undefined,
        accessToken,
        q: searchQuery ?? undefined,
      });
      return result;
    },
    staleTime: STALE_TIME.ONE_MINUTE, // 1분간 캐시 유지
    enabled,
    refetchOnMount: true, // 페이지 마운트 시 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch (다른 페이지에서 돌아올 때 최신 데이터 반영)
  });
}

/**
 * 상품 상세 조회 훅
 */
export function useProduct(productId: string | number, options?: { enabled?: boolean }) {
  return useQuery<BackendProduct>({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProductById(productId),
    enabled: options?.enabled ?? !!productId,
    staleTime: STALE_TIME.NONE, // 캐시 없이 항상 최신 데이터 가져오기 (이미지 업데이트 반영)
    refetchOnMount: true, // 페이지 마운트 시 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch
  });
}

/**
 * 내가 등록한 상품 상세 조회 훅
 */
export function useMyProduct(productId: string | number, options?: { enabled?: boolean }) {
  return useQuery<BackendProduct>({
    queryKey: productKeys.myDetail(productId),
    queryFn: () => getMyProductById(productId),
    enabled: options?.enabled ?? !!productId,
    staleTime: STALE_TIME.NONE, // 캐시 없이 항상 최신 데이터 가져오기 (이미지 업데이트 반영)
    refetchOnMount: true, // 페이지 마운트 시 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // 윈도우 포커스 시 refetch
  });
}

/**
 * 내가 등록한 상품 목록 조회 훅
 */
export function useMyRegisteredProducts(
  params: {
    page: number;
    pageSize: number;
    sort: string;
  },
  options?: { enabled?: boolean }
) {
  const { page, pageSize, sort } = params;
  const { enabled = true } = options || {};

  return useQuery<GetRegisteredProductsResponse>({
    queryKey: productKeys.myRegistered(page, pageSize, sort),
    queryFn: async () => {
      const sortParam = sort === 'all' ? undefined : (sort as 'latest' | 'lowprice' | 'highprice');

      const response = await getMyRegisteredProducts({
        page,
        size: pageSize,
        sort: sortParam,
      });

      return response;
    },
    enabled,
    staleTime: STALE_TIME.ONE_MINUTE, // 1분간 캐시 유지
  });
}

/**
 * 상품 수정 mutation 훅
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<
    BackendProduct,
    Error,
    {
      productId: string | number;
      data: UpdateMyProductData;
      options?: UpdateMyProductOptions;
    }
  >({
    mutationFn: async ({ productId, data, options }) => updateMyProduct(productId, data, options),
    onSuccess: async (_, variables) => {
      const { productId } = variables;

      // 상품 상세와 목록 모두 invalidate하여 최신 데이터 보장
      await queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });
      await queryClient.invalidateQueries({ queryKey: productKeys.all }); // 모든 상품 관련 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: productKeys.lists() }); // 상품 리스트 쿼리 명시적 무효화
      await queryClient.invalidateQueries({ queryKey: productKeys.myDetail(productId) });

      // 상품 리스트 쿼리를 즉시 refetch하여 변경사항 즉시 반영
      await queryClient.refetchQueries({ queryKey: productKeys.lists() }).catch(() => {
        // 에러는 무시 (백그라운드 작업)
      });

      triggerToast('success', '상품이 수정되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '상품 수정에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}

/**
 * 상품 삭제 mutation 훅 (MANAGER 이상)
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<void, Error, { productId: string | number; companyId: string }>({
    mutationFn: async ({ productId }) => deleteProduct(productId),
    onSuccess: async (_, variables) => {
      const { productId } = variables;

      triggerToast('success', '상품이 삭제되었습니다.');

      // 서버와 재동기화: 모든 관련 쿼리 무효화 및 reset
      // resetQueries를 먼저 호출하여 모든 캐시를 제거
      await queryClient.resetQueries({ queryKey: productKeys.all }).catch((err) => {
        logger.error('[useDeleteProduct] Failed to reset product queries:', err);
      });
      await queryClient
        .resetQueries({ queryKey: productKeys.detail(productId) })
        .catch((err: unknown) => {
          logger.error('[useDeleteProduct] Failed to reset product detail query:', {
            error: err,
            productId,
          });
        });

      // invalidateQueries로 모든 쿼리를 무효화
      await queryClient.invalidateQueries({ queryKey: productKeys.all }).catch((err) => {
        logger.error('[useDeleteProduct] Failed to invalidate product queries:', err);
      });
      await queryClient
        .invalidateQueries({ queryKey: productKeys.detail(productId) })
        .catch((err: unknown) => {
          logger.error('[useDeleteProduct] Failed to invalidate product detail query:', {
            error: err,
            productId,
          });
        });
    },
    onError: async (err: unknown, variables) => {
      const { productId } = variables;

      // 에러 발생 시 모든 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: productKeys.all });
      await queryClient.invalidateQueries({ queryKey: productKeys.detail(productId) });

      const message = err instanceof Error ? err.message : '상품 삭제에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}
