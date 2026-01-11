import { useCallback } from 'react';
import { useAddWishlist, useRemoveWishlist } from '@/features/wishlist/queries/wishlist.queries';
import type { GetWishlistResponse } from '@/features/wishlist/api/wishlist.api';

/**
 * 위시리스트 토글 기능을 제공하는 훅
 */
export const useWishlistToggle = (wishlistData?: GetWishlistResponse) => {
  const addWishlistMutation = useAddWishlist();
  const removeWishlistMutation = useRemoveWishlist();

  const isProductLiked = useCallback(
    (productId: number) => {
      if (!wishlistData?.data) return false;
      return wishlistData.data.some((item) => item.product.id === productId);
    },
    [wishlistData]
  );

  const handleToggleLike = useCallback(
    (productId: number, isLiked: boolean) => {
      if (isLiked) {
        removeWishlistMutation.mutate(productId);
      } else {
        addWishlistMutation.mutate(productId);
      }
    },
    [addWishlistMutation, removeWishlistMutation]
  );

  return {
    isProductLiked,
    handleToggleLike,
  };
};
