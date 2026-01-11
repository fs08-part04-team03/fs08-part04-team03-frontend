'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import type { OrderCompletedItem } from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import OrderTem from '../template/OrderTem/OrderTem';
import { adaptCartItemToOrderItem } from '../utils/cart.utils';
import { useOrderHandlers } from '../handlers/useOrderHandlers';
import { CART_PAGE_DEFAULTS } from '../constants/defaults';
import { CART_ROUTES } from '../constants/routes';
import { useCart } from '../queries/cart.queries';
import type { OrderItem } from '../components/CartSummaryBlockOrg/CartSummaryBlockOrg';

/**
 * OrderSection
 * - 데이터/상태 결정 레이어
 * - query로 데이터 가져오기
 * - loading / error / empty 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const OrderSection = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';
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
  const shouldFetchAll = cartItemIds.length > 0;
  const page = CART_PAGE_DEFAULTS.PAGE;
  const limit = shouldFetchAll ? CART_PAGE_DEFAULTS.LARGE_LIMIT : CART_PAGE_DEFAULTS.PAGE_SIZE;

  // 장바구니 조회
  const {
    data: cartData,
    isLoading,
    error,
  } = useCart({
    page,
    pageSize: limit,
    cartItemIdsParam,
    enabled: true,
  });

  // 선택된 아이템만 필터링
  const selectedItems: OrderItem[] = useMemo(() => {
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

  // 핸들러 훅
  const { handlePurchaseRequest, handleGoCart, handleGoOrderHistory } = useOrderHandlers({
    companyId,
    selectedItems,
    cartItemIds,
    onSuccess: () => {
      setIsPurchaseSuccess(true);
    },
    onError: (message) => {
      setErrorMessage(message);
      setIsErrorModalOpen(true);
    },
  });

  // 선택된 아이템이 없으면 장바구니로 리다이렉트
  useEffect(() => {
    if (!isLoading && cartData && selectedItems.length === 0 && companyId && !isPurchaseSuccess) {
      window.location.href = CART_ROUTES.CART(companyId);
    }
  }, [isLoading, cartData, selectedItems.length, companyId, isPurchaseSuccess]);

  // 에러 모달 닫기
  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  // 에러 모달 확인 버튼 클릭 - 장바구니로 이동
  const handleErrorModalConfirm = () => {
    setIsErrorModalOpen(false);
    window.location.href = CART_ROUTES.CART(companyId);
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
