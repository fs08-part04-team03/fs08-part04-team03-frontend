'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import { getApiUrl } from '@/utils/api';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import type { OrderCompletedItem } from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import OrderConfirmedTem from '../template/OrderConfirmedTem/OrderConfirmedTem';

const OrderConfirmedSection = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';
  const purchaseId = searchParams.get('id');

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
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[OrderConfirmedSection] Purchase 조회 성공:', result);
        }
        return result;
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[OrderConfirmedSection] Purchase 조회 실패:', err);
        }
        throw err;
      }
    },
    enabled: !!purchaseId,
    retry: false, // 에러 시 재시도하지 않음
  });

  // PurchaseRequestItem을 OrderCompletedItem으로 변환
  const items: OrderCompletedItem[] = useMemo(() => {
    if (!purchaseData?.purchaseItems) return [];

    return purchaseData.purchaseItems.map((item) => ({
      id: item.products.id,
      name: item.products.name,
      unitPrice: item.priceSnapshot,
      quantity: item.quantity,
      imageSrc: item.products.image ? `${getApiUrl()}/uploads/${item.products.image}` : undefined,
    }));
  }, [purchaseData]);

  const requestMessage = purchaseData?.requestMessage || '';

  // 디버깅 로그
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[OrderConfirmedSection] 상태:', {
        purchaseId,
        isLoading,
        hasError: !!error,
        error,
        hasData: !!purchaseData,
        itemsLength: items.length,
      });
    }
  }, [purchaseId, isLoading, error, purchaseData, items]);

  // purchase ID가 없거나 에러가 발생하거나 데이터가 없으면 장바구니로 리다이렉트
  useEffect(() => {
    if (!purchaseId) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[OrderConfirmedSection] Purchase ID가 없어서 장바구니로 리다이렉트');
      }
      if (companyId) {
        router.push(`/${companyId}/cart`);
      }
      return;
    }
    if (error && !isLoading) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[OrderConfirmedSection] Purchase 조회 에러:', error);
      }
      if (companyId) {
        router.push(`/${companyId}/cart`);
      }
      return;
    }
    // 데이터가 로드되었지만 purchaseItems가 없거나 비어있으면 리다이렉트
    if (
      !isLoading &&
      purchaseData &&
      (!purchaseData.purchaseItems || purchaseData.purchaseItems.length === 0)
    ) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(
          '[OrderConfirmedSection] PurchaseItems가 없어서 장바구니로 리다이렉트:',
          purchaseData
        );
      }
      if (companyId) {
        router.push(`/${companyId}/cart`);
      }
    }
  }, [purchaseId, error, isLoading, purchaseData, companyId, router]);

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

  // 장바구니로 이동
  const handleGoCart = () => {
    if (companyId) {
      router.push(`/${companyId}/cart`);
    }
  };

  // 구매 내역 확인으로 이동
  const handleGoOrderHistory = () => {
    if (companyId) {
      router.push(`/${companyId}/my/purchase-requests`);
    }
  };

  return (
    <OrderConfirmedTem
      cartRole="user"
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
