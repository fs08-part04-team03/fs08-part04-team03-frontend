import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

/**
 * Purchase API 관련 상수
 */

// API 경로
export const PURCHASE_API_PATHS = {
  // 관리자 API
  ADMIN_GET_ALL_PURCHASES: '/api/v1/purchase/admin/getAllPurchases',
  ADMIN_PURCHASE_NOW: '/api/v1/purchase/admin/purchaseNow',
  ADMIN_MANAGE_PURCHASE_REQUESTS: '/api/v1/purchase/admin/managePurchaseRequests',
  ADMIN_GET_PURCHASE_REQUEST_DETAIL: '/api/v1/purchase/admin/getPurchaseRequestDetail',
  ADMIN_APPROVE_PURCHASE_REQUEST: '/api/v1/purchase/admin/approvePurchaseRequest',
  ADMIN_REJECT_PURCHASE_REQUEST: '/api/v1/purchase/admin/rejectPurchaseRequest',
  ADMIN_EXPENSE_STATISTICS: '/api/v1/purchase/admin/expenseStatistics',
  ADMIN_PURCHASE_DASHBOARD: '/api/v1/purchase/admin/purchaseDashboard',

  // 사용자 API
  USER_GET_MY_PURCHASES: '/api/v1/purchase/user/getMyPurchases',
  USER_GET_MY_PURCHASE_DETAIL: '/api/v1/purchase/user/getMyPurchaseDetail',
  USER_REQUEST_PURCHASE: '/api/v1/purchase/user/requestPurchase',
  USER_URGENT_REQUEST_PURCHASE: '/api/v1/purchase/user/urgentRequestPurchase',
  USER_CANCEL_PURCHASE_REQUEST: '/api/v1/purchase/user/cancelPurchaseRequest',
} as const;

// 예산 API 경로
export const BUDGET_API_PATHS = {
  GET_BUDGET: '/api/v1/budget',
} as const;

// 구매 요청 상태 라벨
export const PURCHASE_REQUEST_STATUS_LABEL: Record<PurchaseRequestItem['status'], string> = {
  PENDING: '대기중',
  APPROVED: '요청 승인',
  REJECTED: '구매 반려',
  CANCELLED: '요청 취소',
};
