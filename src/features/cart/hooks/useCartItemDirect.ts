/**
 * useCartItemDirect
 * Props Depth 1단계 달성을 위한 직접 접근 훅
 * cartItemId만 받아서 수량 변경을 직접 처리
 */

import { useUpdateCartQuantity } from '../queries/cart.queries';

/**
 * 장바구니 아이템 수량 변경을 직접 처리하는 훅
 * 컴포넌트에서 cartItemId만 받아서 사용 가능
 */
export const useCartItemDirect = (cartItemId: string | undefined) => {
  const updateQuantityMutation = useUpdateCartQuantity();

  const handleQuantityChange = (quantity: number) => {
    if (!cartItemId || quantity < 1) return;
    updateQuantityMutation.mutate({ cartItemId, quantity });
  };

  return {
    handleQuantityChange,
    isLoading: updateQuantityMutation.isPending,
  };
};
