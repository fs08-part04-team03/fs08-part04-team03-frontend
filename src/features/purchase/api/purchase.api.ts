/**
 * Purchase 도메인 API - 통합 Export 파일
 *
 * 이 파일은 모든 Purchase API를 re-export하는 인덱스 파일입니다.
 * 기존 코드와의 호환성을 위해 유지되며, 새로운 코드에서는 개별 파일을 직접 import하는 것을 권장합니다.
 */

// 타입 정의
export type {
  ApiResponse,
  PurchaseRequestItem,
  RequestPurchaseResponseData,
} from './purchase.types';

// 관리자 API
export {
  purchaseNow,
  purchaseNowMultiple,
  managePurchaseRequests,
  getPurchaseRequestDetail,
  approvePurchaseRequest,
  rejectPurchaseRequest,
  getPurchaseDashboard,
} from './purchase.admin.api';

export type {
  PurchaseNowRequest,
  PurchaseNowResponse,
  PurchaseNowMultipleRequest,
  ManagePurchaseRequestsParams,
  ManagePurchaseRequestsResponse,
  PurchaseRequest,
  RejectPurchaseRequestRequest,
  PurchaseDashboardResponse,
} from './purchase.admin.api';

// 사용자 API
export {
  getMyPurchases,
  getMyPurchaseDetail,
  requestPurchase,
  urgentRequestPurchase,
  cancelPurchaseRequest,
} from './purchase.user.api';

export type {
  GetMyPurchasesParams,
  GetMyPurchasesResponse,
  RequestPurchaseItem,
  RequestPurchaseRequest,
  UrgentRequestPurchaseRequest,
  UrgentRequestPurchaseResponse,
  CancelPurchaseRequestResponse,
} from './purchase.user.api';

// 예산 API
export { getBudget } from './purchase.budget.api';

export type { BudgetItem, GetBudgetResponse } from './purchase.budget.api';
