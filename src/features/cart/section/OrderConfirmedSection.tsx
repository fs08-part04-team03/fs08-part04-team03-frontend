'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { logger } from '@/utils/logger';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import type {
  OrderCompletedItem,
  CartRole,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import { getMyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import { useOrderConfirmedHandlers } from '../handlers/useOrderConfirmedHandlers';
import { CART_ROUTES } from '../constants/routes';
import OrderConfirmedTem from '../template/OrderConfirmedTem/OrderConfirmedTem';

interface OrderConfirmedSectionProps {
  id?: string;
}

/**
 * OrderConfirmedSection
 * - 데이터/상태 결정 레이어
 * - query로 데이터 가져오기
 * - loading / error / empty 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const OrderConfirmedSection = ({ id: purchaseIdProp }: OrderConfirmedSectionProps) => {
  const params = useParams();
  const searchParams = useSearchParams();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';
  const { user } = useAuthStore();

  // URL 쿼리 파라미터에서 id를 가져오거나 props로 전달된 id 사용
  const purchaseId = purchaseIdProp || searchParams.get('id') || undefined;

  // 사용자 역할에 따른 cartRole 결정
  const cartRole: CartRole = useMemo(() => {
    if (!user?.role) return 'user';
    return ROLE_LEVEL[user.role] >= ROLE_LEVEL.manager ? 'manager' : 'user';
  }, [user?.role]);

  // purchase ID로 구매 요청 상세 조회
  const {
    data: purchaseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['purchase', purchaseId],
    queryFn: async () => {
      if (!purchaseId) {
        throw new Error('Purchase ID is required');
      }
      try {
        const result = await getMyPurchaseDetail(purchaseId);
        return result;
      } catch (err) {
        logger.error('Failed to fetch purchase detail', {
          hasError: true,
          errorType: err instanceof Error ? err.constructor.name : 'Unknown',
        });
        throw err;
      }
    },
    enabled: !!purchaseId,
    retry: false,
  });

  // 프록시 API를 통해 이미지 로드
  const imageUrls = useMemo(() => {
    if (!purchaseData?.purchaseItems) return {};

    return purchaseData.purchaseItems.reduce<Record<string, string>>((acc, item) => {
      if (item.products.image) {
        const image = item.products.image.trim();
        if (!image) return acc;
        acc[item.products.id] = image;
      }
      return acc;
    }, {});
  }, [purchaseData]);

  // PurchaseRequestItem을 OrderCompletedItem으로 변환
  const items: OrderCompletedItem[] = useMemo(() => {
    if (!purchaseData?.purchaseItems) return [];

    return purchaseData.purchaseItems.map((item) => ({
      id: item.products.id,
      name: item.products.name,
      unitPrice: item.priceSnapshot,
      quantity: item.quantity,
      imageSrc: imageUrls[item.products.id] || '',
    }));
  }, [purchaseData, imageUrls]);

  const requestMessage = purchaseData?.requestMessage || '';

  // 핸들러 훅
  const { handleGoCart, handleGoOrderHistory } = useOrderConfirmedHandlers({ companyId });

  // purchase ID가 없거나 에러가 발생하거나 데이터가 없으면 장바구니로 리다이렉트
  useEffect(() => {
    if (!purchaseId) {
      if (companyId) {
        window.location.href = CART_ROUTES.CART(companyId);
      }
      return;
    }
    if (error && !isLoading) {
      logger.error('Purchase fetch error in OrderConfirmedSection', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      });
      if (companyId) {
        window.location.href = CART_ROUTES.CART(companyId);
      }
      return;
    }
    if (
      !isLoading &&
      purchaseData &&
      (!purchaseData.purchaseItems || purchaseData.purchaseItems.length === 0)
    ) {
      if (companyId) {
        window.location.href = CART_ROUTES.CART(companyId);
      }
    }
  }, [purchaseId, error, isLoading, purchaseData, companyId]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // items가 없으면 렌더링하지 않음 (리다이렉트 중)
  if (!isLoading && items.length === 0) {
    return null;
  }

  return (
    <OrderConfirmedTem
      cartRole={cartRole}
      userType="default"
      items={items}
      shippingFee={purchaseData?.shippingFee || 0}
      requestMessage={requestMessage}
      onGoCart={handleGoCart}
      onGoOrderHistory={handleGoOrderHistory}
    />
  );
};

export default OrderConfirmedSection;
