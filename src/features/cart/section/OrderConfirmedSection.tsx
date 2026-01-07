'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { logger } from '@/utils/logger';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import type {
  OrderCompletedItem,
  CartRole,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import OrderConfirmedTem from '../template/OrderConfirmedTem/OrderConfirmedTem';

const OrderConfirmedSection = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';
  const purchaseId = searchParams.get('id');
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

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
    retry: false, // 에러 시 재시도하지 않음
  });

  // 프록시 API를 통해 이미지 로드 (CORS 방지, SSR 하이드레이션 불일치 방지)
  const imageUrls = useMemo(() => {
    if (!purchaseData?.purchaseItems) return {};

    return purchaseData.purchaseItems.reduce<Record<string, string>>((acc, item) => {
      if (item.products.image) {
        acc[item.products.id] = `/api/product/image?key=${encodeURIComponent(item.products.image)}`;
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

  // purchase ID가 없거나 에러가 발생하거나 데이터가 없으면 장바구니로 리다이렉트
  useEffect(() => {
    if (!purchaseId) {
      if (companyId) {
        router.push(`/${companyId}/cart`);
      }
      return;
    }
    if (error && !isLoading) {
      logger.error('Purchase fetch error in OrderConfirmedSection', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      });
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
      // 구매 요청 목록 쿼리 invalidate 및 refetch
      queryClient.invalidateQueries({ queryKey: ['myPurchases'] }).catch(() => {
        // 에러 무시
      });
      queryClient.refetchQueries({ queryKey: ['myPurchases'], type: 'active' }).catch(() => {
        // 에러 무시
      });
      // 페이지 이동 후 리프레시
      router.push(`/${companyId}/my/purchase-requests`);
      router.refresh();
    }
  };

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
