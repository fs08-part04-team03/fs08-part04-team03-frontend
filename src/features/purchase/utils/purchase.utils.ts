import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { StatusTagVariant } from '@/components/atoms/StatusTag/StatusTag';
import { formatDate } from '@/utils/formatDate';
import { logger } from '@/utils/logger';

// formatDate는 공통 유틸리티로 이동 (src/utils/formatDate.ts)
// 기존 형식(공백 포함)에서 일관된 형식(공백 없음)으로 변경
export { formatDate };

/**
 * 구매 아이템 목록에서 첫 번째 아이템 이름과 나머지 개수 반환
 */
export function formatItemDescription(purchaseItems: PurchaseRequestItem['purchaseItems']): string {
  if (!purchaseItems || purchaseItems.length === 0) {
    logger.warn('formatItemDescription: purchaseItems가 비어있습니다.');
    return '상품 정보 없음';
  }
  const firstItem = purchaseItems[0];
  if (!firstItem || !firstItem.products) {
    logger.warn('formatItemDescription: firstItem 또는 products가 없습니다.');
    return '상품 정보 없음';
  }

  const productName = firstItem.products.name || '이름 없음';

  if (purchaseItems.length === 1) {
    return productName;
  }

  const remainingCount = purchaseItems.length - 1;
  return `${productName} 외 ${remainingCount}건`;
}

/**
 * 상태에 따른 StatusTag variant 반환
 */
export function getStatusTagVariant(status: PurchaseRequestItem['status']): StatusTagVariant {
  if (status === 'APPROVED') {
    return 'approved';
  }
  if (status === 'REJECTED') {
    return 'rejected';
  }
  if (status === 'PENDING') {
    return 'pending';
  }
  if (status === 'CANCELLED') {
    return 'cancelled';
  }
  return 'pending';
}

/**
 * 구매 요청 항목의 총 가격 계산
 * finalTotalPrice를 우선 사용하고, 없으면 itemsTotalPrice + shippingFee 사용
 * 레거시 totalPrice도 지원
 */
export function calculateTotalPrice(item: PurchaseRequestItem): number {
  // 최종 가격이 있으면 그것을 사용
  if (item.finalTotalPrice) {
    return item.finalTotalPrice;
  }

  // itemsTotalPrice가 있으면 배송비를 더해서 반환
  if (item.itemsTotalPrice !== undefined) {
    return item.itemsTotalPrice + (item.shippingFee ?? 0);
  }

  // 레거시 totalPrice 지원 (deprecated)
  if (item.totalPrice !== undefined && item.totalPrice > 0) {
    return item.totalPrice + (item.shippingFee ?? 0);
  }

  // 그것도 없으면 purchaseItems에서 직접 계산
  const calculatedPrice =
    item.purchaseItems?.reduce(
      (sum, purchaseItem) => sum + (purchaseItem.priceSnapshot || 0) * (purchaseItem.quantity || 0),
      0
    ) || 0;

  return calculatedPrice + (item.shippingFee ?? 0);
}
