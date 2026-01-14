import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';
import { PURCHASE_HISTORY_ROUTES } from '../constants/routes';

/**
 * 구매 내역 관련 이벤트 핸들러 훅
 * - 이벤트/핸들러 조합 레이어
 * - navigate 처리
 */
export const usePurchaseHistoryHandlers = (companyId: string) => {
  const router = useRouter();

  const handleNavigateToProducts = useCallback(() => {
    if (companyId) {
      router.push(PURCHASE_HISTORY_ROUTES.PRODUCTS(companyId));
    }
  }, [router, companyId]);

  const handleNavigateToDetail = useCallback(
    (orderId: string) => {
      if (companyId && orderId) {
        router.push(PURCHASE_HISTORY_ROUTES.DETAIL(companyId, orderId));
      } else {
        logger.warn('[PurchaseHistory] companyId 또는 orderId가 없어서 이동할 수 없습니다.');
      }
    },
    [router, companyId]
  );

  const handleNavigateToList = useCallback(() => {
    if (companyId) {
      router.push(PURCHASE_HISTORY_ROUTES.LIST(companyId));
    }
  }, [router, companyId]);

  return {
    handleNavigateToProducts,
    handleNavigateToDetail,
    handleNavigateToList,
  };
};
