'use client';

import { getApiUrl, fetchWithAuth as fetchWithAuthUtil } from '@/utils/api';
import { PURCHASE_API_PATHS, BUDGET_API_PATHS } from '@/features/purchase/utils/constants';

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
    const responseText = await response.text();
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('API 응답 형식 오류:', {
        status: response.status,
        statusText: response.statusText,
        contentType,
        body: responseText,
      });
    }
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<T>;
  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch (parseError) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('JSON 파싱 오류:', parseError);
    }
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    // 400 Bad Request 등 클라이언트 에러의 경우 상세 정보 로깅
    if (process.env.NODE_ENV === 'development') {
      const apiUrl = getApiUrl();
      // eslint-disable-next-line no-console
      console.error('API 요청 실패:', {
        status: response.status,
        statusText: response.statusText,
        url: `${apiUrl}${url}`,
        method: options.method || 'GET',
        requestBody: options.body,
        result,
        message: result.message,
        fullResponse: result,
      });
    }

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
  sort?: string;
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
  if (params?.sort) queryParams.append('sort', params.sort);

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
 * 백엔드 API 문서에 따르면 별도의 상세 조회 엔드포인트가 없으므로,
 * managePurchaseRequests API를 사용하여 해당 ID의 항목을 조회합니다.
 */
export async function getPurchaseRequestDetail(
  purchaseRequestId: string
): Promise<PurchaseRequestItem> {
  // managePurchaseRequests API를 사용하여 여러 페이지를 순회하며 해당 ID의 항목을 찾습니다.
  // TODO: 백엔드에서 상세 조회 엔드포인트가 추가되면 해당 엔드포인트를 사용하도록 변경 필요
  const pageSize = 50; // 페이지당 50개씩 조회
  let currentPage = 1;
  let totalPages = 1;

  do {
    const queryParams = new URLSearchParams();
    queryParams.append('page', currentPage.toString());
    queryParams.append('size', pageSize.toString());

    const url = `${PURCHASE_API_PATHS.ADMIN_MANAGE_PURCHASE_REQUESTS}?${queryParams.toString()}`;

    // eslint-disable-next-line no-await-in-loop
    const result = await fetchWithAuth<PurchaseRequestItem[]>(url, {
      method: 'GET',
    });

    // 배열에서 해당 ID의 항목 찾기
    const foundItem = result.data?.find((item) => item.id === purchaseRequestId);

    if (foundItem) {
      return foundItem;
    }

    // 다음 페이지가 있는지 확인
    totalPages = result.pagination?.totalPages || 1;
    currentPage += 1;
  } while (currentPage <= totalPages);

  throw new Error('구매 요청을 찾을 수 없습니다.');
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
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  totalExpense: number;
  monthlyExpense: number;
  recentPurchases: PurchaseItem[];
  topProducts: Array<{
    productId: string;
    productName: string;
    purchaseCount: number;
  }>;
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

  // 개발 환경에서 요청 정보 로깅
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[getMyPurchases] 요청 정보:', {
      url,
      params,
      status: params?.status,
      hasStatusParam: !!params?.status,
    });
  }

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
 * 구매 요청
 */
export interface RequestPurchaseRequest {
  productId: string;
  quantity: number;
  reason?: string;
}

export interface RequestPurchaseResponse {
  purchaseRequestId: string;
  message: string;
}

export async function requestPurchase(
  request: RequestPurchaseRequest
): Promise<RequestPurchaseResponse> {
  const result = await fetchWithAuth<RequestPurchaseResponse>(
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
  productId: string;
  quantity: number;
  reason: string; // 긴급 사유 필수
}

export interface UrgentRequestPurchaseResponse {
  purchaseRequestId: string;
  message: string;
}

export async function urgentRequestPurchase(
  request: UrgentRequestPurchaseRequest
): Promise<UrgentRequestPurchaseResponse> {
  const result = await fetchWithAuth<UrgentRequestPurchaseResponse>(
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
 */
export interface GetBudgetResponse {
  budget: number;
  monthlySpending: number;
  remainingBudget: number;
}

/**
 * 주어진 회사의 예산과 지출 요약을 조회합니다.
 * 백엔드에서 예산 배열을 받아 현재 월 예산을 찾고,
 * 승인된 구매 요청을 조회하여 월별 지출액을 계산합니다.
 *
 * @param _companyId - (사용하지 않음) 호환성을 위해 유지, 토큰에서 회사 정보를 자동으로 추출
 * @returns 회사의 총 예산(`budget`), 해당 기간의 월별 지출(`monthlySpending`), 남은 예산(`remainingBudget`)을 포함한 객체
 */
export async function getBudget(_companyId: string): Promise<GetBudgetResponse> {
  // 1. 예산 목록 조회
  const budgetResult = await fetchWithAuth<BudgetItem[]>(BUDGET_API_PATHS.GET_BUDGET, {
    method: 'GET',
  });

  // 실제 API 응답 구조 확인을 위한 로깅
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[getBudget] 예산 API 응답:', {
      success: budgetResult.success,
      dataLength: Array.isArray(budgetResult.data) ? budgetResult.data.length : 0,
      data: budgetResult.data,
    });
  }

  // 현재 월의 예산 찾기
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1

  if (!Array.isArray(budgetResult.data)) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[getBudget] 예산 데이터가 배열이 아닙니다:', budgetResult.data);
    }
    return {
      budget: 0,
      monthlySpending: 0,
      remainingBudget: 0,
    };
  }

  const currentBudgetItem = budgetResult.data.find(
    (item) => item.year === currentYear && item.month === currentMonth
  );

  const budget = currentBudgetItem?.amount || 0;

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[getBudget] 현재 월 예산 찾기:', {
      currentYear,
      currentMonth,
      found: !!currentBudgetItem,
      budgetAmount: budget,
      allBudgetItems: budgetResult.data.map((item) => ({
        year: item.year,
        month: item.month,
        amount: item.amount,
      })),
    });
  }

  // 2. 승인된 구매 요청 조회하여 월별 지출액 계산
  let monthlySpending = 0;
  try {
    // 현재 월의 시작일과 종료일 계산
    const startOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfMonth = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

    // 승인된 구매 요청 조회 (모든 페이지를 가져와야 정확한 계산)
    let page = 1;
    let hasMore = true;
    const allApprovedRequests: PurchaseRequestItem[] = [];

    // eslint-disable-next-line no-await-in-loop
    while (hasMore) {
      // eslint-disable-next-line no-await-in-loop
      const purchaseResult = await managePurchaseRequests({
        page,
        size: 100,
        status: 'APPROVED',
      });

      allApprovedRequests.push(...purchaseResult.purchaseRequests);

      hasMore = purchaseResult.hasNextPage;
      page += 1;

      // 무한 루프 방지 (최대 100페이지)
      if (page > 100) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('[getBudget] 승인된 구매 요청이 너무 많아 일부만 계산합니다.');
        }
        break;
      }
    }

    // 현재 월에 승인된 구매 요청만 필터링하여 지출액 합산
    monthlySpending = allApprovedRequests
      .filter((request) => {
        // approver가 있으면 승인된 것으로 간주하고 updatedAt을 승인일로 사용
        if (!request.approver?.id) return false;

        const approvedDate = new Date(request.updatedAt);
        return approvedDate >= startOfMonth && approvedDate <= endOfMonth;
      })
      .reduce((sum, request) => {
        const totalPrice = request.totalPrice || 0;
        const shippingFee = request.shippingFee || 0;
        return sum + totalPrice + shippingFee;
      }, 0);
  } catch (error) {
    // 월별 지출액 계산 실패 시 0으로 처리 (예산 정보는 표시)
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[getBudget] 월별 지출액 계산 실패:', error);
    }
    monthlySpending = 0;
  }

  const remainingBudget = budget - monthlySpending;

  // 실제 API 응답 구조 확인을 위한 로깅
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[getBudget] 예산 정보:', {
      budget,
      monthlySpending,
      remainingBudget,
      currentYear,
      currentMonth,
    });
  }

  return {
    budget,
    monthlySpending,
    remainingBudget,
  };
}
