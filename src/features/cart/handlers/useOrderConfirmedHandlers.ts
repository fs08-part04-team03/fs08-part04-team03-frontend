'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { logger } from '@/utils/logger';
import { CART_ROUTES } from '../constants/routes';

interface UseOrderConfirmedHandlersProps {
  companyId: string;
}

/**
 * OrderConfirmedSection용 핸들러 훅
 * - 이벤트/핸들러 조합 레이어
 * - navigate 처리
 */
export function useOrderConfirmedHandlers({ companyId }: UseOrderConfirmedHandlersProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  /** 장바구니로 이동 */
  const handleGoCart = () => {
    router.push(CART_ROUTES.CART(companyId));
  };

  /** 구매 내역 확인으로 이동 */
  const handleGoOrderHistory = () => {
    queryClient.invalidateQueries({ queryKey: ['myPurchases'] }).catch((catchError) => {
      logger.error('Failed to invalidate myPurchases queries', {
        hasError: true,
        errorType: catchError instanceof Error ? catchError.constructor.name : 'Unknown',
      });
    });
    queryClient
      .refetchQueries({ queryKey: ['myPurchases'], type: 'active' })
      .catch((catchError) => {
        logger.error('Failed to refetch myPurchases queries', {
          hasError: true,
          errorType: catchError instanceof Error ? catchError.constructor.name : 'Unknown',
        });
      });
    router.push(CART_ROUTES.PURCHASE_REQUESTS(companyId));
    router.refresh();
  };

  return {
    handleGoCart,
    handleGoOrderHistory,
  };
}
