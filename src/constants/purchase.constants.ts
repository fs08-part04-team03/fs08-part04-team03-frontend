import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

export const PURCHASE_REQUEST_STATUS_LABEL: Record<PurchaseRequestItem['status'], string> = {
  PENDING: '대기중',
  APPROVED: '요청 승인',
  REJECTED: '구매 반려',
  CANCELLED: '요청 취소',
};
