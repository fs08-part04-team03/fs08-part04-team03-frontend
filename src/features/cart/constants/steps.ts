import type { StepBreadcrumbStep } from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';

/**
 * Cart 도메인 StepBreadcrumb 설정
 */

/** User용 Steps (3단계) */
export const CART_USER_STEPS: StepBreadcrumbStep[] = [
  { label: 'Shopping Cart' },
  { label: 'Order' },
  { label: 'Order Confirmed' },
];

/** Manager/Admin용 Steps (2단계) */
export const CART_MANAGER_ADMIN_STEPS: StepBreadcrumbStep[] = [
  { label: 'Shopping Cart' },
  { label: 'Order Confirmed' },
];

/** Order 페이지용 Steps */
export const CART_ORDER_STEPS: StepBreadcrumbStep[] = [
  { label: 'Shopping Cart' },
  { label: 'Order' },
  { label: 'Order Confirmed' },
];
