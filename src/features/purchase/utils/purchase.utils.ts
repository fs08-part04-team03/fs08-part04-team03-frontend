import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { StatusTagVariant } from '@/components/atoms/StatusTag/StatusTag';

/**
 * 날짜를 한국 형식으로 포맷팅 (YYYY. MM. DD)
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${day}`;
}

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
