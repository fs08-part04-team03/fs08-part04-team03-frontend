'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi, type GetMyCartResponse } from '@/features/cart/api/cart.api';
import { useToast } from '@/hooks/useToast';
import { fetchWithAuth } from '@/utils/api';
import { STALE_TIME } from '@/constants/staleTime';
import { ADMIN_BUDGET_API_PATHS } from '@/features/admin/budget/constants/api';
import { cartKeys } from './cart.keys';

/**
 * 장바구니 조회 훅
 */
export function useCart(params?: {
  page?: number;
  pageSize?: number;
  cartItemIdsParam?: string | null;
  enabled?: boolean;
}) {
  const { page = 1, pageSize = 10, cartItemIdsParam, enabled = true } = params || {};

  return useQuery<GetMyCartResponse>({
    queryKey: cartKeys.list(page, pageSize, cartItemIdsParam),
    queryFn: () => cartApi.getMyCart(page, pageSize),
    staleTime: STALE_TIME.SHORT, // 30초간 캐시 유지 (이미지 업데이트 반영 + 성능 균형)
    refetchOnMount: true, // 페이지 마운트 시 항상 최신 데이터 가져오기
    enabled,
  });
}

/**
 * 월 예산 조회 훅 (manager만)
 */
export function useBudget(year: number, month: number, options?: { enabled?: boolean }) {
  const { enabled = true } = options || {};

  return useQuery<number>({
    queryKey: cartKeys.budget(year, month),
    queryFn: async () => {
      const response = await fetchWithAuth(
        `${ADMIN_BUDGET_API_PATHS.GET_BUDGET}?year=${year}&month=${month}`,
        {
          method: 'GET',
        }
      );
      if (!response.ok) {
        return 0;
      }
      const result = (await response.json()) as {
        success: boolean;
        data?: Array<{ amount: number }>;
      };
      // 현재 월 예산이 있으면 첫 번째 항목의 amount를 반환, 없으면 0
      if (result.success && result.data && result.data.length > 0) {
        const firstItem = result.data[0];
        return firstItem ? firstItem.amount : 0;
      }
      return 0;
    },
    enabled,
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
  });
}

/**
 * 장바구니에 상품 추가 mutation 훅
 */
export function useAddToCart() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity?: number }) =>
      cartApi.addToCart(productId, quantity),
    onSuccess: async () => {
      // 캐시 무효화하여 자동으로 최신 데이터를 다시 가져옴 (GNB 업데이트 포함)
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '장바구니 추가에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}

/**
 * 장바구니 수량 변경 mutation 훅
 */
export function useUpdateCartQuantity() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      cartApi.updateQuantity(cartItemId, quantity),
    onSuccess: async () => {
      // 캐시 무효화하여 자동으로 최신 데이터를 다시 가져옴
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });
      triggerToast('success', '수량이 변경되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '수량 변경에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}

/**
 * 장바구니 여러 상품 삭제 mutation 훅
 */
export function useDeleteMultipleCartItems() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation({
    mutationFn: (cartItemIds: string[]) => cartApi.deleteMultiple(cartItemIds),
    onSuccess: async () => {
      // 캐시 무효화하여 자동으로 최신 데이터를 다시 가져옴
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });
      triggerToast('success', '선택한 상품이 삭제되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '삭제에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}

/**
 * 장바구니에서 상품 삭제 mutation 훅 (단일)
 */
export function useDeleteFromCart() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation({
    mutationFn: (cartItemId: string) => cartApi.deleteFromCart(cartItemId),
    onSuccess: async () => {
      // 캐시 무효화하여 자동으로 최신 데이터를 다시 가져옴
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });
      triggerToast('success', '상품이 삭제되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '삭제에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}
