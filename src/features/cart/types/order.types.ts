/**
 * Order 관련 그룹화된 Props 타입
 */

import type { OrderCompletedItem } from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import type { CartRole } from '@/features/cart/types/cart-summary.types';

/**
 * 주문 데이터 상태
 */
export interface OrderDataState {
  items: OrderCompletedItem[];
  shippingFee: number;
  requestMessage?: string;
}

/**
 * 주문 역할 상태
 */
export interface OrderRoleState {
  cartRole: CartRole;
  userType: 'default' | 'request';
}

/**
 * 주문 네비게이션 핸들러
 */
export interface OrderNavigationHandlers {
  onGoCart: () => void;
  onGoOrderHistory: () => void;
  onPurchaseRequest?: (requestMessage: string, isUrgent?: boolean) => void;
}

/**
 * OrderConfirmedTem 그룹화된 Props
 */
export interface OrderConfirmedTemGroupedProps {
  dataState: OrderDataState;
  roleState: OrderRoleState;
  navigationHandlers: OrderNavigationHandlers;
}

/**
 * OrderTem 그룹화된 Props
 */
export interface OrderTemGroupedProps {
  dataState: OrderDataState;
  navigationHandlers: OrderNavigationHandlers;
}
