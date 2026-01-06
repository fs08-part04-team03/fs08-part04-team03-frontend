'use client';

import { fetchWithAuth as fetchWithAuthUtil } from '@/utils/api';
import { PURCHASE_API_PATHS } from '@/features/purchase/utils/constants';
import { logger } from '@/utils/logger';

/**
 * 백엔드 API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 공통 API 요청 헬퍼 함수
 * refreshToken 자동 갱신 로직이 포함된 utils/api.ts의 fetchWithAuth 사용
 */
async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  // utils/api.ts의 fetchWithAuth 사용 (refreshToken 자동 갱신 포함)
  const response = await fetchWithAuthUtil(url, options);

  // 429 Too Many Requests 에러 처리
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    let errorMessage = '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.';

    // Retry-After 헤더가 있으면 더 구체적인 안내 제공
    if (retryAfter) {
      const retrySeconds = Number.parseInt(retryAfter, 10);
      if (Number.isFinite(retrySeconds)) {
        const retryMinutes = Math.ceil(retrySeconds / 60);
        errorMessage += ` (약 ${retryMinutes}분 후 재시도 가능)`;
      }
    }

    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    await response.text();
    logger.error('API response format error', {
      status: response.status,
      statusText: response.statusText,
      hasContentType: !!contentType,
    });
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<T>;
  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch (parseError) {
    logger.error('JSON parsing error', {
      hasError: true,
      errorType: parseError instanceof Error ? parseError.constructor.name : 'Unknown',
    });
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    // 400 Bad Request 등 클라이언트 에러의 경우 상세 정보 로깅
    logger.error('API request failed', {
      status: response.status,
      statusText: response.statusText,
      method: options.method || 'GET',
      hasResult: !!result,
    });

    // 에러 메시지 추출 (백엔드에서 보내는 상세 메시지 사용)
    // result.error?.message 또는 result.message 확인
    const errorMessage =
      (result as { error?: { message?: string } }).error?.message ||
      result.message ||
      (response.status === 400
        ? '잘못된 요청입니다. 입력값을 확인해주세요.'
        : '요청에 실패했습니다.');

    throw new Error(errorMessage);
  }

  return result;
}

// ==================== 관리자 API ====================

/**
 * 전체 구매 내역 목록 조회 (관리자)
 */
export interface GetAllPurchasesParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface PurchaseItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  status: string;
  requestedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  requestedBy: {
    id: string;
    name: string;
    email: string;
  };
}

export interface GetAllPurchasesResponse {
  purchases: PurchaseItem[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export async function getAllPurchases(
  params?: GetAllPurchasesParams
): Promise<GetAllPurchasesResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.sort) queryParams.append('sort', params.sort);

  const queryString = queryParams.toString();
  const url = `${PURCHASE_API_PATHS.ADMIN_GET_ALL_PURCHASES}${queryString ? `?${queryString}` : ''}`;

  const result = await fetchWithAuth<GetAllPurchasesResponse>(url, {
    method: 'GET',
  });

  return result.data;
}

/**
 * 즉시 구매 (관리자)
 */
export interface PurchaseNowRequest {
  productId: string;
  quantity: number;
}

export interface PurchaseNowResponse {
  purchaseId: string;
  message: string;
}

export async function purchaseNow(request: PurchaseNowRequest): Promise<PurchaseNowResponse> {
  const result = await fetchWithAuth<PurchaseNowResponse>(PURCHASE_API_PATHS.ADMIN_PURCHASE_NOW, {
    method: 'POST',
    body: JSON.stringify(request),
  });

  return result.data;
}

/**
 * 구매 요청 확인 (관리자)
 */
export interface ManagePurchaseRequestsParams {
  page?: number;
  size?: number;
  status?: string;
  sortBy?: 'createdAt' | 'totalPrice'; // 백엔드 API 스펙에 맞게 수정
  order?: 'asc' | 'desc'; // 정렬 순서 (기본값: desc)
}

export interface PurchaseRequest {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  status: string;
  requestedAt: string;
  requestedBy: {
    id: string;
    name: string;
    email: string;
  };
  reason?: string;
}

// 구매 요청 아이템 타입 (실제 API 응답 구조) - PurchaseRequestItem을 먼저 정의
export interface PurchaseRequestItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  shippingFee: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestMessage?: string;
  rejectReason?: string;
  urgent?: boolean;
  purchaseItems: Array<{
    id: string;
    quantity: number;
    priceSnapshot: number;
    products: {
      id: number;
      name: string;
      image?: string;
      link?: string;
    };
  }>;
  requester: {
    id: string;
    name: string;
    email: string;
    company?: string;
    avatarSrc?: string;
  };
  approver?: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * 구매 요청 목록 응답 타입 (관리자)
 */
export interface ManagePurchaseRequestsResponse {
  purchaseRequests: PurchaseRequestItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * 관리자용 구매 요청 목록을 페이지, 크기, 상태, 정렬 기준으로 조회합니다.
 *
 * @param params - 조회에 사용할 선택적 쿼리 매개변수 (page, size, status, sort)
 * @returns 조회된 구매 요청 배열과 현재 페이지, 전체 페이지 수 등 페이징 메타데이터를 포함한 객체
 */
export async function managePurchaseRequests(
  params?: ManagePurchaseRequestsParams
): Promise<ManagePurchaseRequestsResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.order) queryParams.append('order', params.order); // 정렬 순서 (asc 또는 desc)

  const queryString = queryParams.toString();
  const url = `${PURCHASE_API_PATHS.ADMIN_MANAGE_PURCHASE_REQUESTS}${queryString ? `?${queryString}` : ''}`;

  const result = await fetchWithAuth<PurchaseRequestItem[]>(url, {
    method: 'GET',
  });

  // 백엔드 응답 구조: { success, data: [], pagination: { page, limit, total, totalPages } }
  // 프론트엔드 응답 구조로 변환
  return {
    purchaseRequests: result.data,
    currentPage: result.pagination?.page || 1,
    totalPages: result.pagination?.totalPages || 1,
    totalItems: result.pagination?.total || 0,
    itemsPerPage: result.pagination?.limit || 10,
    hasNextPage: result.pagination ? result.pagination.page < result.pagination.totalPages : false,
    hasPreviousPage: result.pagination ? result.pagination.page > 1 : false,
  };
}

/**
 * 구매 요청 상세 조회 (관리자)
 * GET /api/v1/purchase/admin/purchaseRequest/{id}
 */
export async function getPurchaseRequestDetail(
  purchaseRequestId: string
): Promise<PurchaseRequestItem> {
  const result = await fetchWithAuth<PurchaseRequestItem>(
    `${PURCHASE_API_PATHS.ADMIN_GET_PURCHASE_REQUEST_DETAIL}/${purchaseRequestId}`,
    {
      method: 'GET',
    }
  );

  return result.data;
}

/**
 * 관리자 권한으로 지정된 구매 요청을 승인합니다.
 *
 * @param purchaseRequestId - 승인할 구매 요청의 식별자
 * @returns 승인된 구매 요청의 상세 정보를 담은 `PurchaseRequestItem`
 */
export async function approvePurchaseRequest(
  purchaseRequestId: string
): Promise<PurchaseRequestItem> {
  const result = await fetchWithAuth<PurchaseRequestItem>(
    `${PURCHASE_API_PATHS.ADMIN_APPROVE_PURCHASE_REQUEST}/${purchaseRequestId}`,
    {
      method: 'PATCH',
    }
  );

  return result.data;
}

/**
 * 구매 요청 반려 (관리자)
 */
export interface RejectPurchaseRequestRequest {
  reason: string;
}

export interface RejectPurchaseRequestResponse {
  data: PurchaseRequestItem;
}

/**
 * 지정한 구매 요청을 주어진 사유로 거부하고 거부된 요청 항목을 반환합니다.
 *
 * @param purchaseRequestId - 거부할 구매 요청의 ID
 * @param request - 거부 사유를 포함한 요청 본문 (`reason` 필수)
 * @returns 거부 처리된 구매 요청 항목 (`PurchaseRequestItem`)
 */
export async function rejectPurchaseRequest(
  purchaseRequestId: string,
  request: RejectPurchaseRequestRequest
): Promise<RejectPurchaseRequestResponse> {
  const result = await fetchWithAuth<RejectPurchaseRequestResponse>(
    `${PURCHASE_API_PATHS.ADMIN_REJECT_PURCHASE_REQUEST}/${purchaseRequestId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(request),
    }
  );

  return result.data;
}

/**
 * 지출 통계 조회 (관리자)
 */
export interface ExpenseStatisticsResponse {
  totalExpense: number;
  monthlyExpense: number;
  categoryExpenses: Array<{
    categoryId: string;
    categoryName: string;
    expense: number;
  }>;
  period: {
    startDate: string;
    endDate: string;
  };
}

export async function getExpenseStatistics(): Promise<ExpenseStatisticsResponse> {
  const result = await fetchWithAuth<ExpenseStatisticsResponse>(
    PURCHASE_API_PATHS.ADMIN_EXPENSE_STATISTICS,
    {
      method: 'GET',
    }
  );

  return result.data;
}

/**
 * 구매 관리 대시보드 (관리자)
 */
export interface PurchaseDashboardResponse {
  expenses: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
  };
  budget: {
    thisMonthBudget: number;
    remainingBudget: number;
  };
  purchaseList: PurchaseRequestItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 구매 대시보드에 표시할 통계와 요약 정보를 가져옵니다.
 *
 * @returns 구매 대시보드 통계 및 요약을 담은 `PurchaseDashboardResponse`
 */
export async function getPurchaseDashboard(): Promise<PurchaseDashboardResponse> {
  const result = await fetchWithAuth<PurchaseDashboardResponse>(
    PURCHASE_API_PATHS.ADMIN_PURCHASE_DASHBOARD,
    {
      method: 'GET',
    }
  );

  return result.data;
}

// 사용자 API

// 내 구매 내역 조회
export interface GetMyPurchasesParams {
  page?: number;
  size?: number;
  status?: string;
  sort?: string;
}

/**
 * 구매 요청 목록 응답 타입 (실제 API 응답 구조)
 */
export interface GetMyPurchasesResponse {
  purchaseList: PurchaseRequestItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export async function getMyPurchases(
  params?: GetMyPurchasesParams
): Promise<GetMyPurchasesResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  // status가 undefined이거나 'ALL'일 때는 파라미터를 포함하지 않음 (모든 상태 조회)
  // 백엔드가 status 없을 때 모든 상태를 반환하도록 설계되어 있다고 가정
  if (params?.status && params.status !== 'ALL' && params.status !== undefined) {
    queryParams.append('status', params.status);
  }
  if (params?.sort) queryParams.append('sort', params.sort);

  const queryString = queryParams.toString();
  const url = `${PURCHASE_API_PATHS.USER_GET_MY_PURCHASES}${queryString ? `?${queryString}` : ''}`;

  // 개발 환경에서 요청 정보 로깅 제거 (의미 없는 디버그 로그)

  const result = await fetchWithAuth<PurchaseRequestItem[]>(url, {
    method: 'GET',
  });

  // 백엔드 응답 구조: { success, data: [], pagination: { page, limit, total, totalPages } }
  // 프론트엔드 응답 구조로 변환
  return {
    purchaseList: result.data,
    currentPage: result.pagination?.page || 1,
    totalPages: result.pagination?.totalPages || 1,
    totalItems: result.pagination?.total || 0,
    itemsPerPage: result.pagination?.limit || 10,
    hasNextPage: result.pagination ? result.pagination.page < result.pagination.totalPages : false,
    hasPreviousPage: result.pagination ? result.pagination.page > 1 : false,
  };
}

/**
 * 내 구매 상세 조회
 */
export interface MyPurchaseDetail extends PurchaseRequestItem {
  product: {
    id: string;
    name: string;
    description?: string;
    imageUrl?: string;
    price: number;
    categoryId: string;
    categoryName: string;
  };
  requestHistory: Array<{
    action: string;
    performedBy: string;
    performedAt: string;
    comment?: string;
  }>;
}

export async function getMyPurchaseDetail(purchaseRequestId: string): Promise<MyPurchaseDetail> {
  const result = await fetchWithAuth<MyPurchaseDetail>(
    `${PURCHASE_API_PATHS.USER_GET_MY_PURCHASE_DETAIL}/${purchaseRequestId}`,
    {
      method: 'GET',
    }
  );

  return result.data;
}

/**
 * 구매 요청 아이템
 */
export interface RequestPurchaseItem {
  productId: number;
  quantity: number;
}

/**
 * 구매 요청 요청 본문
 */
export interface RequestPurchaseRequest {
  items: RequestPurchaseItem[];
  shippingFee: number;
  requestMessage?: string;
}

/**
 * 구매 요청 응답 데이터
 */
export interface RequestPurchaseResponseData {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  shippingFee: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestMessage: string;
  rejectReason?: string;
  purchaseItems: Array<{
    id: string;
    quantity: number;
    priceSnapshot: number;
    products: {
      id: number;
      name: string;
      image: string;
      link: string;
    };
  }>;
  requester: {
    id: string;
    name: string;
    email: string;
  };
  approver?: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * 구매 요청 응답
 */
export interface RequestPurchaseResponse {
  success: boolean;
  data: RequestPurchaseResponseData;
  message: string;
}

/**
 * 구매 요청
 */
export async function requestPurchase(
  request: RequestPurchaseRequest
): Promise<RequestPurchaseResponseData> {
  const result = await fetchWithAuth<RequestPurchaseResponseData>(
    PURCHASE_API_PATHS.USER_REQUEST_PURCHASE,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );

  return result.data;
}

/**
 * 긴급 구매 요청 (예산 체크 우회)
 */
export interface UrgentRequestPurchaseRequest {
  items: RequestPurchaseItem[];
  shippingFee?: number;
  requestMessage?: string;
}

export interface UrgentRequestPurchaseResponse {
  success: boolean;
  data: RequestPurchaseResponseData;
  message: string;
}

export async function urgentRequestPurchase(
  request: UrgentRequestPurchaseRequest
): Promise<RequestPurchaseResponseData> {
  const result = await fetchWithAuth<RequestPurchaseResponseData>(
    PURCHASE_API_PATHS.USER_URGENT_REQUEST_PURCHASE,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );

  return result.data;
}

/**
 * 구매 요청 취소
 */
export interface CancelPurchaseRequestResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  shippingFee: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestMessage?: string;
  rejectReason?: string;
  purchaseItems: Array<{
    id: string;
    quantity: number;
    priceSnapshot: number;
    products: {
      id: number;
      name: string;
      image?: string;
      link?: string;
    };
  }>;
  requester: {
    id: string;
    name: string;
    email: string;
  };
  approver?: {
    id: string;
    name: string;
    email: string;
  };
}

/**
 * 지정한 구매 요청을 취소합니다.
 *
 * @param purchaseRequestId - 취소할 구매 요청의 ID
 * @returns 취소된 구매 요청의 상세 정보를 담은 응답 객체
 */
export async function cancelPurchaseRequest(
  purchaseRequestId: string
): Promise<CancelPurchaseRequestResponse> {
  const result = await fetchWithAuth<CancelPurchaseRequestResponse>(
    `${PURCHASE_API_PATHS.USER_CANCEL_PURCHASE_REQUEST}/${purchaseRequestId}`,
    {
      method: 'PATCH',
    }
  );

  return result.data;
}

/**
 * 예산 조회 API 응답 타입 (배열)
 * 백엔드 API는 월별 예산 목록을 배열로 반환합니다.
 */
export interface BudgetItem {
  id: string;
  companyId: string;
  year: number;
  month: number;
  amount: number;
  updatedAt: string;
}

/**
 * 예산 조회 응답 타입
 * 백엔드에서 계산된 모든 값들을 포함합니다.
 */
export interface GetBudgetResponse {
  budget: number; // 이번 달 예산
  monthlySpending: number; // 이번 달 지출액
  remainingBudget: number; // 남은 예산
  spendingPercentage: number; // 진행률 (%)
  lastMonthBudget: number; // 지난 달 예산
  lastMonthSpending: number; // 지난 달 지출액
  lastBudget: number; // 지난 달 남은 예산
  thisYearTotalSpending: number; // 올해 총 지출액
  lastYearTotalSpending: number; // 작년 총 지출액
}

/**
 * 주어진 회사의 예산과 지출 요약을 조회합니다.
 * 백엔드에서 계산된 모든 값들을 그대로 반환합니다.
 *
 * purchaseDashboard 엔드포인트를 사용하여 예산 정보를 조회합니다.
 *
 * @param _companyId - (사용하지 않음) 호환성을 위해 유지, 토큰에서 회사 정보를 자동으로 추출
 * @returns 백엔드에서 계산된 예산 및 지출 정보를 포함한 객체
 */
export async function getBudget(_companyId: string): Promise<GetBudgetResponse> {
  // purchaseDashboard 엔드포인트 사용
  const dashboardResult = await fetchWithAuth<PurchaseDashboardResponse>(
    PURCHASE_API_PATHS.ADMIN_PURCHASE_DASHBOARD,
    {
      method: 'GET',
    }
  );

  const dashboard = dashboardResult.data;

  // 진행률 계산 (이번 달 지출액 / 이번 달 예산 * 100)
  const spendingPercentage =
    dashboard.budget.thisMonthBudget > 0
      ? (dashboard.expenses.thisMonth / dashboard.budget.thisMonthBudget) * 100
      : 0;

  // PurchaseDashboardResponse를 GetBudgetResponse로 변환
  const budgetResponse: GetBudgetResponse = {
    budget: dashboard.budget.thisMonthBudget, // 이번 달 예산
    monthlySpending: dashboard.expenses.thisMonth, // 이번 달 지출액
    remainingBudget: dashboard.budget.remainingBudget, // 남은 예산
    spendingPercentage, // 진행률 (계산)
    lastMonthBudget: 0, // 지난 달 예산 (백엔드에서 제공하지 않음)
    lastMonthSpending: dashboard.expenses.lastMonth, // 지난 달 지출액
    lastBudget: 0, // 지난 달 남은 예산 (백엔드에서 제공하지 않음)
    thisYearTotalSpending: dashboard.expenses.thisYear, // 올해 총 지출액
    lastYearTotalSpending: dashboard.expenses.lastYear, // 작년 총 지출액
  };

  return budgetResponse;
}
