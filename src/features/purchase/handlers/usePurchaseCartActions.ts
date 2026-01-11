import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/features/cart/api/cart.api';
import { cartKeys } from '@/features/cart/queries/cart.keys';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PURCHASE_MESSAGES, PURCHASE_TIMERS } from '@/features/purchase/constants';
import { logger } from '@/utils/logger';

interface UsePurchaseCartActionsParams {
  companyId: string | undefined;
  purchaseRequest: PurchaseRequestItem | undefined;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

/**
 * 구매 요청 장바구니 액션 핸들러 훅
 */
export const usePurchaseCartActions = ({
  companyId,
  purchaseRequest,
  onSuccess,
  onError,
}: UsePurchaseCartActionsParams) => {
  const queryClient = useQueryClient();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const validateAddToCart = useCallback((): boolean => {
    if (!companyId) {
      logger.warn('companyId missing in validateAddToCart', {
        hasCompanyId: false,
      });
      onError?.(PURCHASE_MESSAGES.COMPANY_NOT_SELECTED);
      return false;
    }

    if (!purchaseRequest || !purchaseRequest.purchaseItems?.length) {
      logger.warn('purchaseRequest missing or empty in validateAddToCart', {
        hasPurchaseRequest: !!purchaseRequest,
        itemCount: purchaseRequest?.purchaseItems?.length ?? 0,
      });
      onError?.(PURCHASE_MESSAGES.NO_ITEMS_TO_ADD);
      return false;
    }

    return true;
  }, [companyId, purchaseRequest, onError]);

  const addItemsToCart = useCallback(async (): Promise<{
    success: boolean;
    successCount: number;
  }> => {
    if (!purchaseRequest) {
      throw new Error('purchaseRequest is required');
    }

    const results = await Promise.allSettled(
      purchaseRequest.purchaseItems.map((item) =>
        cartApi.addToCart(item.products.id, item.quantity)
      )
    );

    const failures = results.filter((r) => r.status === 'rejected');
    const successCount = results.length - failures.length;

    return { success: failures.length === 0, successCount };
  }, [purchaseRequest]);

  const handleAddToCart = useCallback(async () => {
    if (!validateAddToCart()) {
      return;
    }

    setIsAddingToCart(true);

    try {
      const { success, successCount } = await addItemsToCart();

      // 장바구니 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });

      if (!success) {
        if (successCount > 0) {
          const partialMessage = PURCHASE_MESSAGES.ADD_TO_CART_PARTIAL(successCount);
          onError?.(partialMessage);
          return;
        }
        throw new Error(PURCHASE_MESSAGES.ADD_TO_CART_FAILED);
      }

      onSuccess?.();
    } catch (error) {
      logger.error('Failed to add items to cart', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      });
      onError?.(error instanceof Error ? error.message : PURCHASE_MESSAGES.ADD_TO_CART_FAILED);
    } finally {
      setIsAddingToCart(false);
    }
  }, [validateAddToCart, addItemsToCart, queryClient, onSuccess, onError]);

  return {
    isAddingToCart,
    handleAddToCart,
  };
};
