import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';

/**
 * 구매 관련 네비게이션 핸들러 훅
 */
export const usePurchaseNavigation = (companyId: string | undefined) => {
  const router = useRouter();

  const goHome = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}`);
    }
  }, [companyId, router]);

  const goToPurchaseHistory = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/purchase-history`);
    }
  }, [companyId, router]);

  const goToPurchaseRequests = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/requests`);
    }
  }, [companyId, router]);

  const goToMyPurchaseRequests = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/my/purchase-requests`);
    } else {
      logger.warn(
        '[PurchaseNavigation] companyId가 없어서 내 구매 요청 목록으로 이동할 수 없습니다.'
      );
    }
  }, [companyId, router]);

  const goToMyPurchaseRequestDetail = useCallback(
    (requestId: string) => {
      if (companyId && requestId) {
        router.push(`/${companyId}/my/purchase-requests/${requestId}`);
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
        router.push(`/${companyId}/requests/${requestId}`);
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
      router.push(`/${companyId}/products`);
    }
  }, [companyId, router]);

  const goToProductDetail = useCallback(
    (productId: string) => {
      if (companyId && productId) {
        router.push(`/${companyId}/products/${productId}`);
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
      router.push(`/${companyId}/cart`);
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
