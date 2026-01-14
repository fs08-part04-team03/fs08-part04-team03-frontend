'use client';

import { useRouter } from 'next/navigation';
import { useUpdateCartQuantity, useDeleteMultipleCartItems } from '../queries/cart.queries';
import { CART_ROUTES } from '../constants/routes';

interface UseShoppingCartHandlersProps {
  companyId: string;
}

/**
 * ShoppingCartSection용 핸들러 훅
 * - 이벤트/핸들러 조합 레이어
 * - navigate, mutation 트리거, 성공/실패 후처리
 */
export function useShoppingCartHandlers({ companyId }: UseShoppingCartHandlersProps) {
  const router = useRouter();
  const updateQuantityMutation = useUpdateCartQuantity();
  const deleteMultipleMutation = useDeleteMultipleCartItems();

  /** 수량 변경 핸들러 */
  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantityMutation.mutate({ cartItemId, quantity });
  };

  /** 선택 삭제 핸들러 */
  const handleDeleteSelected = (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) return;
    deleteMultipleMutation.mutate(cartItemIds);
  };

  /** 구매 요청 핸들러 - OrderPage로 이동 */
  const handleSubmit = (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) return;
    const itemsParam = cartItemIds.join(',');
    router.push(CART_ROUTES.ORDER_WITH_ITEMS(companyId, itemsParam));
  };

  /** 계속 쇼핑하기 핸들러 */
  const handleContinueShopping = () => {
    router.push(CART_ROUTES.PRODUCTS(companyId));
  };

  return {
    handleQuantityChange,
    handleDeleteSelected,
    handleSubmit,
    handleContinueShopping,
    updateQuantityMutation,
    deleteMultipleMutation,
  };
}
