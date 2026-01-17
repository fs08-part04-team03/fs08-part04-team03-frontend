'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  type GetWishlistResponse,
} from '@/features/wishlist/api/wishlist.api';
import { useToast } from '@/hooks/useToast';
import { QUERY_DEFAULTS } from '@/lib/query/queryDefaults';
import { wishlistKeys } from './wishlist.keys';

/**
 * 위시리스트 목록 조회 훅
 */
export function useWishlist(options?: { enabled?: boolean }) {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const { enabled = true } = options || {};

  return useQuery<GetWishlistResponse>({
    ...QUERY_DEFAULTS.list,
    queryKey: wishlistKeys.all(companyId),
    queryFn: () => getWishlist(),
    enabled: enabled && !!companyId,
  });
}

/**
 * 위시리스트 추가 mutation 훅
 */
export function useAddWishlist() {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<void, Error, string | number>({
    mutationFn: (productId: string | number) => addToWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: wishlistKeys.all(companyId) });
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
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<void, Error, string | number>({
    mutationFn: (productId: string | number) => removeFromWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: wishlistKeys.all(companyId) });
      triggerToast('success', '위시리스트에서 제거되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 제거에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}
