/**
 * Products 도메인 위시리스트 액션 핸들러
 */

import { useMemo, useCallback } from 'react';
import {
  useWishlist,
  useAddWishlist,
  useRemoveWishlist,
} from '@/features/wishlist/queries/wishlist.queries';

/**
 * 상품 위시리스트 관련 액션 훅
 */
export function useProductWishlistActions(productId?: string | number) {
  const { data: wishlistData } = useWishlist();
  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  // 현재 상품이 위시리스트에 있는지 확인
  const isLiked = useMemo(() => {
    if (!wishlistData?.data || !productId) return false;
    return wishlistData.data.some((item) => item.product.id === Number(productId));
  }, [wishlistData, productId]);

  // 위시리스트 토글 핸들러
  const handleToggleLike = useCallback(() => {
    if (!productId) return;

    if (isLiked) {
      removeWishlistMutation.mutate(productId);
    } else {
      addWishlistMutation.mutate(productId);
    }
  }, [isLiked, productId, addWishlistMutation, removeWishlistMutation]);

  // 특정 상품이 위시리스트에 있는지 확인하는 함수
  const isProductLiked = useCallback(
    (id: number) => {
      if (!wishlistData?.data) return false;
      return wishlistData.data.some((item) => item.product.id === id);
    },
    [wishlistData]
  );

  // 특정 상품의 위시리스트 토글 핸들러
  const handleToggleProductLike = useCallback(
    (id: number) => {
      if (isProductLiked(id)) {
        removeWishlistMutation.mutate(id);
      } else {
        addWishlistMutation.mutate(id);
      }
    },
    [isProductLiked, addWishlistMutation, removeWishlistMutation]
  );

  return {
    wishlistData,
    isLiked,
    handleToggleLike,
    isProductLiked,
    handleToggleProductLike,
  };
}
