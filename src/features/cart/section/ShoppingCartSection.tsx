'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import type {
  OrderItem,
  CartRole,
} from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import { adaptCartItemToOrderItem } from '../utils/cart.utils';
import { useShoppingCartHandlers } from '../handlers/useShoppingCartHandlers';
import { CART_PAGE_DEFAULTS } from '../constants/defaults';
import { useCart, useBudget } from '../queries/cart.queries';
import ShoppingCartTem from '../template/ShoppingCartTem/ShoppingCartTem';

/**
 * ShoppingCartSection
 * - 데이터/상태 결정 레이어
 * - query로 데이터 가져오기
 * - loading / error / empty 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const ShoppingCartSection = () => {
  const params = useParams();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';
  const user = useAuthStore((state) => state.user);

  // 사용자 역할에 따른 cartRole 결정
  const cartRole: CartRole = useMemo(() => {
    if (!user?.role) return 'user';
    return ROLE_LEVEL[user.role] >= ROLE_LEVEL.manager ? 'manager' : 'user';
  }, [user?.role]);

  // 장바구니 조회
  const {
    data: cartData,
    isLoading,
    error,
  } = useCart({
    page: CART_PAGE_DEFAULTS.PAGE,
    pageSize: CART_PAGE_DEFAULTS.PAGE_SIZE,
  });

  // 월 예산 조회 (manager만)
  const isAdminRole = cartRole === 'manager';
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: budgetData, isLoading: isBudgetLoading } = useBudget(year, month, {
    enabled: isAdminRole,
  });

  const budget = budgetData ?? 0;

  // 핸들러 훅
  const {
    handleQuantityChange,
    handleDeleteSelected,
    handleSubmit,
    handleContinueShopping,
    updateQuantityMutation,
    deleteMultipleMutation,
  } = useShoppingCartHandlers({ companyId });

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

  // 데이터 변환
  const items: OrderItem[] = cartData?.data.map(adaptCartItemToOrderItem) || [];

  return (
    <ShoppingCartTem
      dataState={{
        cartRole,
        items,
        budget,
        loading:
          isBudgetLoading || updateQuantityMutation.isPending || deleteMultipleMutation.isPending,
      }}
      actionHandlers={{
        onQuantityChange: handleQuantityChange,
        onDeleteSelected: handleDeleteSelected,
        onSubmit: handleSubmit,
        onContinueShopping: handleContinueShopping,
      }}
    />
  );
};

export default ShoppingCartSection;
