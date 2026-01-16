/**
 * 장바구니 요약 Props 타입 정의
 * Props Drilling 개선을 위한 그룹화된 타입
 */

/**
 * 장바구니 역할 타입
 */
export type CartRole = 'user' | 'manager' | 'admin';

/**
 * 장바구니 아이템 타입
 */
export interface OrderItem {
  cartItemId: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageSrc?: string;
}

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
  onContinueShopping?: () => void;
}
