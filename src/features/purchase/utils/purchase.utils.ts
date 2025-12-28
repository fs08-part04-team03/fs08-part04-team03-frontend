import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { StatusTagVariant } from '@/components/atoms/StatusTag/StatusTag';
import { formatDate } from '@/utils/formatDate';

// formatDate는 공통 유틸리티로 이동 (src/utils/formatDate.ts)
// 기존 형식(공백 포함)에서 일관된 형식(공백 없음)으로 변경
export { formatDate };

/**
 * 구매 아이템 목록에서 첫 번째 아이템 이름과 나머지 개수 반환
 */
export function formatItemDescription(purchaseItems: PurchaseRequestItem['purchaseItems']): string {
  if (purchaseItems.length === 0) return '';
  const firstItem = purchaseItems[0];
  if (!firstItem) return '';
  if (purchaseItems.length === 1) return firstItem.products.name;
  const firstItemName = firstItem.products.name;
  const remainingCount = purchaseItems.length - 1;
  return `${firstItemName} 외 ${remainingCount}건`;
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
