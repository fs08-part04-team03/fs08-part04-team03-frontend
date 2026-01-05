import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import { getApiUrl } from '@/utils/api';
import type { CartItem } from '../api/cart.api';

/**
 * 서버 CartItem → UI OrderItem
 *
 * ⚠️ 주의
 * - API 명세에 없는 필드는 절대 생성하지 않음
 * - 식별자는 cartItemId로 의미를 명확히 함
 * - 가격 필드는 price 기준으로 통일
 */
export const adaptCartItemToOrderItem = (item: CartItem): OrderItem => ({
  cartItemId: item.id, // ✅ cartItemId (UUID)
  productId: item.product.id, // ✅ 구매 API 계약
  name: item.product.name,
  price: item.product.price, // ✅ unitPrice → price
  quantity: item.quantity,
  imageSrc: item.product.image ? `${getApiUrl()}/uploads/${item.product.image}` : undefined,
});
