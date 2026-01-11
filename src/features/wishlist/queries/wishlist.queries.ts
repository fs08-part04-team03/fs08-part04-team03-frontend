'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  type GetWishlistResponse,
} from '@/features/wishlist/api/wishlist.api';
import { useToast } from '@/hooks/useToast';
import { STALE_TIME } from '@/constants/staleTime';
import { wishlistKeys } from './wishlist.keys';

/**
 * 위시리스트 목록 조회 훅
 */
export function useWishlist(options?: { enabled?: boolean }) {
  const { enabled = true } = options || {};

  return useQuery<GetWishlistResponse>({
    queryKey: wishlistKeys.all,
    queryFn: () => getWishlist(),
    staleTime: STALE_TIME.ONE_MINUTE, // 1분간 캐시 유지
    enabled,
  });
}

/**
 * 위시리스트 추가 mutation 훅
 */
export function useAddWishlist() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<void, Error, string | number>({
    mutationFn: (productId: string | number) => addToWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
      triggerToast('success', '위시리스트에 추가되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 추가에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}

/**
 * 위시리스트 제거 mutation 훅
 */
export function useRemoveWishlist() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<void, Error, string | number>({
    mutationFn: (productId: string | number) => removeFromWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
      triggerToast('success', '위시리스트에서 제거되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 제거에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}
