import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import type { CartItem } from '../api/cart.api';

/**
 * 서버 CartItem → UI OrderItem
 *
 * 주의
 * - API 명세에 없는 필드는 절대 생성하지 않음
 * - 식별자는 cartItemId로 의미를 명확히 함
 * - 가격 필드는 price 기준으로 통일
 */
export const adaptCartItemToOrderItem = (item: CartItem): OrderItem => {
  const imageSrc = item.product.imageUrl?.trim();

  return {
    cartItemId: item.id, // cartItemId (UUID)
    productId: item.product.id, // 구매 API 계약
    name: item.product.name,
    price: item.product.price, // unitPrice → price
    quantity: item.quantity,
    // 상대 경로 사용 (SSR 하이드레이션 불일치 방지)
    // 타임스탬프는 컴포넌트 레벨에서 추가 (캐시 무효화)
    imageSrc: imageSrc && imageSrc.length > 0 ? imageSrc : '',
  };
};
