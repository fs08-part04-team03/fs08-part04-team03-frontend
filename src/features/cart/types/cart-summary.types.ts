/**
 * 장바구니 요약 Props 타입 정의
 * Props Drilling 개선을 위한 그룹화된 타입
 */

import type {
  CartRole,
  OrderItem,
} from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';

/**
 * 장바구니 데이터 상태
 */
export interface CartSummaryDataState {
  cartRole: CartRole;
  items: OrderItem[];
  budget?: number;
  loading?: boolean;
}

/**
 * 장바구니 액션 핸들러
 */
export interface CartSummaryActionHandlers {
  onDeleteSelected?: (cartItemIds: string[]) => void;
  onSubmit?: (cartItemIds: string[]) => void;
  onGoBudgetManage?: () => void;
  onQuantityChange?: (cartItemId: string, quantity: number) => void;
  onContinueShopping?: () => void;
}
