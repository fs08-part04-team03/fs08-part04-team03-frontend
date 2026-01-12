import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PATHNAME } from '@/constants';

/**
 * 구매 요청 상세 페이지의 네비게이션을 처리하는 훅
 */
export const usePurchaseRequestNavigation = (companyId: string | undefined) => {
  const router = useRouter();

  const goHome = useCallback(() => {
    if (companyId) {
      router.push(PATHNAME.COMPANY_ROOT(companyId));
    }
  }, [companyId, router]);

  const goToPurchaseHistory = useCallback(() => {
    if (companyId) {
      router.push(PATHNAME.MANAGER_PURCHASE_HISTORY(companyId));
    }
  }, [companyId, router]);

  const goToPurchaseRequests = useCallback(() => {
    if (companyId) {
      router.push(PATHNAME.MANAGER_PURCHASE_REQUESTS(companyId));
    }
  }, [companyId, router]);

  return {
    goHome,
    goToPurchaseHistory,
    goToPurchaseRequests,
  };
};
