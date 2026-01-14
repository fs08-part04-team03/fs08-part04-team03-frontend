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
          // 페이지 이동 전에 카트 아이템 삭제 (user role일 때)
          // 비동기 작업을 시작하지만 Promise를 기다리지 않음
          if (cartItemIds.length > 0) {
            cartApi
              .deleteMultiple(cartItemIds)
              .then(() => {
                logger.info('Cart items deleted before navigation', {
                  deletedCount: cartItemIds.length,
                });
                // 모든 카트 쿼리 무효화 (GNB의 카트 아이콘도 refetch됨)
                return queryClient.invalidateQueries({ queryKey: cartKeys.all });
              })
              .then(() =>
                // GNB의 카트 쿼리도 명시적으로 refetch
                queryClient.refetchQueries({ queryKey: cartKeys.all })
              )
              .catch((deleteError) => {
                logger.error('Failed to delete cart items before navigation', {
                  hasError: true,
                  errorType:
                    deleteError instanceof Error ? deleteError.constructor.name : 'Unknown',
                  cartItemIds,
                });
                // 카트 삭제 실패해도 구매 요청은 성공했으므로 계속 진행
              });
          }

          triggerToast('success', '구매 요청이 완료되었습니다.');
          router.push(CART_ROUTES.ORDER_COMPLETED(companyId, data.id));

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
