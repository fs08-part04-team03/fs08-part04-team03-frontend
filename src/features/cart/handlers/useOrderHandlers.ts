'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';
import {
  useRequestPurchase,
  useUrgentRequestPurchase,
} from '@/features/purchase/queries/purchase.queries';
import { cartApi } from '../api/cart.api';
import { cartKeys } from '../queries/cart.keys';
import { CART_ROUTES } from '../constants/routes';
import type { OrderItem } from '../components/CartSummaryBlockOrg/CartSummaryBlockOrg';

interface UseOrderHandlersProps {
  companyId: string;
  selectedItems: OrderItem[];
  cartItemIds: string[];
  onSuccess?: (purchaseId: string) => void;
  onError?: (errorMessage: string) => void;
}

/**
 * OrderSection용 핸들러 훅
 * - 이벤트/핸들러 조합 레이어
 * - navigate, mutation 트리거, 성공/실패 후처리
 */
export function useOrderHandlers({
  companyId,
  selectedItems,
  cartItemIds,
  onSuccess,
  onError,
}: UseOrderHandlersProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();
  const requestPurchaseMutation = useRequestPurchase();
  const urgentRequestPurchaseMutation = useUrgentRequestPurchase();

  /** 구매 요청 핸들러 */
  const handlePurchaseRequest = (requestMessage: string, isUrgent = false) => {
    if (selectedItems.length === 0) {
      triggerToast('error', '선택된 상품이 없습니다.');
      return;
    }

    const items = selectedItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const requestBody = {
      items,
      shippingFee: 0,
      requestMessage: requestMessage || undefined,
    };

    const mutation = isUrgent ? urgentRequestPurchaseMutation : requestPurchaseMutation;

    mutation.mutate(requestBody, {
      onSuccess: (data) => {
        if (data?.id) {
          triggerToast('success', '구매 요청이 완료되었습니다.');
          router.push(CART_ROUTES.ORDER_COMPLETED(companyId, data.id));

          // 페이지 이동 후 카트 아이템 삭제
          if (cartItemIds.length > 0) {
            setTimeout(() => {
              (async () => {
                try {
                  await cartApi.deleteMultiple(cartItemIds);
                  logger.info('Cart items deleted after purchase request', {
                    deletedCount: cartItemIds.length,
                  });
                  await queryClient.invalidateQueries({ queryKey: cartKeys.all });
                } catch (deleteError) {
                  logger.error('Failed to delete cart items after purchase request', {
                    hasError: true,
                    errorType:
                      deleteError instanceof Error ? deleteError.constructor.name : 'Unknown',
                    cartItemIds,
                  });
                }
              })().catch(() => {
                // 에러는 이미 catch 블록에서 처리됨
              });
            }, 100);
          }

          onSuccess?.(data.id);
        } else {
          const errorMessage = '구매 요청 응답에 문제가 있습니다.';
          logger.error('Purchase request completed but missing purchase ID', {
            hasData: !!data,
            hasId: !!data?.id,
          });
          onError?.(errorMessage);
        }
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : '구매 요청에 실패했습니다.';
        onError?.(message);
      },
    });
  };

  /** 장바구니로 이동 */
  const handleGoCart = () => {
    router.push(CART_ROUTES.CART(companyId));
  };

  /** 구매 내역 확인으로 이동 */
  const handleGoOrderHistory = () => {
    router.push(CART_ROUTES.PURCHASE_REQUESTS(companyId));
  };

  return {
    handlePurchaseRequest,
    handleGoCart,
    handleGoOrderHistory,
  };
}
