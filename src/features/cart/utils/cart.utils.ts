import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import type { CartItem } from '../api/cart.api';

/**
 * 서버 CartItem → UI OrderItem
 *
 * ⚠️ 주의
 * - API 명세에 없는 필드는 절대 생성하지 않음
 * - 식별자는 cartItemId로 의미를 명확히 함
 * - 가격 필드는 price 기준으로 통일
 */
export const adaptCartItemToOrderItem = (item: CartItem): OrderItem => {
  // 이미지 키 정규화 (products/ 접두사 확인)
  let imageKey: string | undefined;
  if (item.product.image) {
    const image = item.product.image.trim();
    // trim 후 빈 문자열이면 undefined로 설정 (잘못된 프록시 URL 생성 방지)
    if (!image) {
      imageKey = undefined;
    } else if (image.startsWith('http://') || image.startsWith('https://')) {
      // 이미 URL 형식이면 그대로 사용
      imageKey = image;
    } else {
      // S3 키 형식이면 products/ 접두사 확인
      const normalizedKey = image.startsWith('products/') ? image : `products/${image}`;
      imageKey = `/api/product/image?key=${encodeURIComponent(normalizedKey)}`;
    }
  }

  return {
    cartItemId: item.id, // ✅ cartItemId (UUID)
    productId: item.product.id, // ✅ 구매 API 계약
    name: item.product.name,
    price: item.product.price, // ✅ unitPrice → price
    quantity: item.quantity,
    // 상대 경로 사용 (SSR 하이드레이션 불일치 방지)
    // 타임스탬프는 컴포넌트 레벨에서 추가 (캐시 무효화)
    imageSrc: imageKey || '',
  };
};
