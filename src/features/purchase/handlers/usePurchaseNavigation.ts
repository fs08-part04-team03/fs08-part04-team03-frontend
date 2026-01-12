import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';
import { PATHNAME } from '@/constants';

/**
 * 구매 관련 네비게이션 핸들러 훅
 */
export const usePurchaseNavigation = (companyId: string | undefined) => {
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

  const goToMyPurchaseRequests = useCallback(() => {
    if (companyId) {
      router.push(PATHNAME.MY_PURCHASE_REQUESTS(companyId));
    } else {
      logger.warn(
        '[PurchaseNavigation] companyId가 없어서 내 구매 요청 목록으로 이동할 수 없습니다.'
      );
    }
  }, [companyId, router]);

  const goToMyPurchaseRequestDetail = useCallback(
    (requestId: string) => {
      if (companyId && requestId) {
        router.push(PATHNAME.MY_PURCHASE_REQUEST_DETAIL(companyId, requestId));
      } else {
        logger.warn(
          '[PurchaseNavigation] companyId 또는 requestId가 없어서 상세 페이지로 이동할 수 없습니다.'
        );
      }
    },
    [companyId, router]
  );

  const goToPurchaseRequestDetail = useCallback(
    (requestId: string) => {
      if (companyId && requestId) {
        router.push(PATHNAME.MANAGER_PURCHASE_REQUEST_DETAIL(companyId, requestId));
      } else {
        logger.warn(
          '[PurchaseNavigation] companyId 또는 requestId가 없어서 상세 페이지로 이동할 수 없습니다.'
        );
      }
    },
    [companyId, router]
  );

  const goToProducts = useCallback(() => {
    if (companyId) {
      router.push(PATHNAME.PRODUCTS(companyId));
    }
  }, [companyId, router]);

  const goToProductDetail = useCallback(
    (productId: string) => {
      if (companyId && productId) {
        router.push(PATHNAME.PRODUCT_DETAIL(companyId, productId));
      } else {
        logger.warn(
          '[PurchaseNavigation] companyId 또는 productId가 없어서 상품 상세 페이지로 이동할 수 없습니다.'
        );
      }
    },
    [companyId, router]
  );

  const goToCart = useCallback(() => {
    if (companyId) {
      router.push(PATHNAME.CART(companyId));
    }
  }, [companyId, router]);

  return {
    goHome,
    goToPurchaseHistory,
    goToPurchaseRequests,
    goToMyPurchaseRequests,
    goToMyPurchaseRequestDetail,
    goToPurchaseRequestDetail,
    goToProducts,
    goToProductDetail,
    goToCart,
  };
};
