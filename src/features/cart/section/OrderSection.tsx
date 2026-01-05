'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useRef, useState, useEffect } from 'react';
import { requestPurchase, urgentRequestPurchase } from '@/features/purchase/api/purchase.api';
import { cartApi } from '@/features/cart/api/cart.api';
import { useToast } from '@/hooks/useToast';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import type { OrderCompletedItem } from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import OrderTem from '../template/OrderTem/OrderTem';
import { adaptCartItemToOrderItem } from '../utils/cart.utils';

const OrderSection = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();
  const requestMessageRef = useRef<string>('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPurchaseSuccess, setIsPurchaseSuccess] = useState(false);

  // URL에서 선택된 cartItemIds 가져오기
  const cartItemIdsParam = searchParams.get('items');
  const cartItemIds = useMemo(() => {
    if (!cartItemIdsParam) return [];
    try {
      return cartItemIdsParam.split(',').filter(Boolean);
    } catch {
      return [];
    }
  }, [cartItemIdsParam]);

  // 선택된 항목이 있으면 모든 항목을 가져오기 위해 큰 limit 사용
  // 선택된 항목이 없으면 기본 페이지네이션 사용
  const shouldFetchAll = cartItemIds.length > 0;
  const page = 1;
  const limit = shouldFetchAll ? 1000 : 10; // 선택된 항목이 있으면 충분히 큰 limit 사용

  // 장바구니 조회
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart', page, limit, cartItemIdsParam || 'all'],
    queryFn: () => cartApi.getMyCart(page, limit),
    enabled: true, // 항상 활성화
  });

  // 선택된 아이템만 필터링
  const selectedItems = useMemo(() => {
    if (!cartData?.data) return [];
    const items = cartData.data.map(adaptCartItemToOrderItem);
    return items.filter((item) => cartItemIds.includes(String(item.cartItemId)));
  }, [cartData, cartItemIds]);

  // OrderCompletedItem 형식으로 변환
  const orderItems: OrderCompletedItem[] = useMemo(
    () =>
      selectedItems.map((item) => ({
        id: item.productId,
        name: item.name,
        unitPrice: item.price,
        quantity: item.quantity,
        imageSrc: item.imageSrc,
      })),
    [selectedItems]
  );

  // 구매 요청 mutation
  const requestPurchaseMutation = useMutation({
    mutationFn: ({ requestMessage, isUrgent }: { requestMessage: string; isUrgent: boolean }) => {
      requestMessageRef.current = requestMessage;
      const items = selectedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      const requestBody = {
        items,
        shippingFee: 0,
        requestMessage: requestMessage || undefined,
      };

      if (isUrgent) {
        return urgentRequestPurchase(requestBody);
      }
      return requestPurchase(requestBody);
    },
    onSuccess: async (data) => {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[OrderSection] 구매 요청 성공:', { data, hasId: !!data?.id, id: data?.id });
      }
      // 구매 요청 완료 후 completed 페이지로 이동 (purchase ID 전달)
      // router.push를 먼저 실행하여 리다이렉트를 방지
      if (companyId && data?.id) {
        setIsPurchaseSuccess(true); // POST 성공 플래그 설정
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(
            '[OrderSection] Order Completed 페이지로 이동:',
            `/${companyId}/order/completed?id=${data.id}`
          );
        }
        router.push(`/${companyId}/order/completed?id=${data.id}`);
        // router.push 후에 카트 무효화 (비동기로 실행되어도 문제없음)
        await queryClient.invalidateQueries({ queryKey: ['cart'] });
        triggerToast('success', '구매 요청이 완료되었습니다.');
      } else {
        // purchase ID가 없으면 에러 처리
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[OrderSection] Purchase ID가 없습니다:', data);
        }
        setErrorMessage('구매 요청 응답에 문제가 있습니다.');
        setIsErrorModalOpen(true);
      }
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '구매 요청에 실패했습니다.';
      setErrorMessage(message);
      setIsErrorModalOpen(true);
    },
  });

  // 선택된 아이템이 없으면 장바구니로 리다이렉트 (렌더링 중 router.push 방지)
  // 장바구니 데이터가 로드된 후에만 리다이렉트
  // 단, 구매 요청 성공 후에는 리다이렉트하지 않음 (Order Completed 페이지로 이동 중)
  useEffect(() => {
    if (!isLoading && cartData && selectedItems.length === 0 && companyId && !isPurchaseSuccess) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[OrderSection] 선택된 아이템이 없어서 장바구니로 리다이렉트');
      }
      router.push(`/${companyId}/cart`);
    }
  }, [isLoading, cartData, selectedItems.length, companyId, router, isPurchaseSuccess]);

  // 구매 요청 핸들러
  const handlePurchaseRequest = (requestMessage: string, isUrgent = false) => {
    if (selectedItems.length === 0) {
      triggerToast('error', '선택된 상품이 없습니다.');
      return;
    }
    requestPurchaseMutation.mutate({ requestMessage, isUrgent });
  };

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

  // 에러 모달 닫기
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  // 에러 모달 확인 버튼 클릭 - 장바구니로 이동
  const handleErrorModalConfirm = () => {
    setIsErrorModalOpen(false);
    if (companyId) {
      router.push(`/${companyId}/cart`);
    }
  };

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

  // 선택된 아이템이 없으면 렌더링하지 않음 (리다이렉트 중)
  // 장바구니 데이터가 로드된 후에만 체크
  if (!isLoading && cartData && selectedItems.length === 0) {
    return null;
  }

  return (
    <>
      <OrderTem
        items={orderItems}
        shippingFee={0}
        onGoCart={handleGoCart}
        onGoOrderHistory={handleGoOrderHistory}
        onPurchaseRequest={handlePurchaseRequest}
      />
      <CustomModal
        open={isErrorModalOpen}
        type="purchase-failed"
        description={`구매 요청에 실패했습니다.\n나중에 다시 시도해주세요.\n\n${errorMessage}`}
        onClose={handleCloseErrorModal}
        onConfirm={handleErrorModalConfirm}
      />
    </>
  );
};

export default OrderSection;
