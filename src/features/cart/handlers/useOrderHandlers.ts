'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';
import {
  useRequestPurchase,
  useUrgentRequestPurchase,
} from '@/features/purchase/queries/purchase.queries';
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
  cartItemIds: _cartItemIds,
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
          // 백엔드에서 구매 요청 시 자동으로 카트 아이템을 삭제하므로
          // 프론트엔드에서는 캐시만 무효화하여 최신 데이터를 가져옴
          queryClient
            .invalidateQueries({ queryKey: cartKeys.all })
            .then(() => {
              // GNB의 카트 쿼리도 명시적으로 refetch
              queryClient.refetchQueries({ queryKey: cartKeys.all }).catch(() => {
                // refetch 실패는 무시 (백그라운드 작업)
              });
            })
            .catch((error) => {
              logger.error('Failed to invalidate cart queries', {
                hasError: true,
                errorType: error instanceof Error ? error.constructor.name : 'Unknown',
              });
              // 캐시 무효화 실패해도 구매 요청은 성공했으므로 계속 진행
            });

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
