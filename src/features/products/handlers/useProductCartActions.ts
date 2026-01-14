/**
 * Products 도메인 장바구니 액션 핸들러
 */

import { useCallback } from 'react';
import { useAddToCart } from '@/features/cart/queries/cart.queries';
import { useToast } from '@/hooks/useToast';
import { PRODUCT_MESSAGES } from '@/features/products/constants/messages';

/**
 * 상품 장바구니 관련 액션 훅
 */
export function useProductCartActions(
  productId?: string | number,
  onSuccess?: () => void,
  onError?: () => void
) {
  const addToCartMutation = useAddToCart();
  const { triggerToast } = useToast();

  // 장바구니 담기 핸들러
  const handleAddToCart = useCallback(
    (qty: number) => {
      if (!productId) {
        triggerToast('error', PRODUCT_MESSAGES.ERROR.FETCH_PRODUCT);
        return;
      }

      addToCartMutation.mutate(
        { productId: Number(productId), quantity: qty },
        {
          onSuccess: () => {
            onSuccess?.();
          },
          onError: () => {
            onError?.();
          },
        }
      );
    },
    [productId, addToCartMutation, triggerToast, onSuccess, onError]
  );

  return {
    handleAddToCart,
    isLoading: addToCartMutation.isPending,
  };
}
