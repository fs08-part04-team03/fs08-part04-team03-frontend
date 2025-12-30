'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { getApiTimeout, getApiUrl } from '@/utils/api';
import { PURCHASE_API_PATHS, BUDGET_API_PATHS } from '@/features/purchase/utils/constants';

/**
 * 백엔드 API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * 공통 API 요청 헬퍼 함수
 */
async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  // API URL 설정 (환경 변수 또는 기본 배포 서버 URL)
  const apiUrl = getApiUrl();

  const { accessToken } = useAuthStore.getState();
  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  let response: Response;
  try {
    response = await fetch(`${apiUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
      signal: controller.signal,
    });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    }
    throw error;
  }

  clearTimeout(timeoutId);

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
    throw new Error(result.message || '요청에 실패했습니다.');
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

  const result = await fetchWithAuth<ManagePurchaseRequestsResponse>(url, {
    method: 'GET',
  });

  return result.data;
}

/**
 * 구매 요청 상세 조회 (관리자)
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
 * 구매 요청 승인 (관리자)
 */
export interface ApprovePurchaseRequestResponse {
  data: PurchaseRequestItem;
}

/**
 * 관리자 권한으로 지정된 구매 요청을 승인합니다.
 *
 * @param purchaseRequestId - 승인할 구매 요청의 식별자
 * @returns 승인된 구매 요청의 상세 정보를 담은 `PurchaseRequestItem`
 */
export async function approvePurchaseRequest(
  purchaseRequestId: string
): Promise<ApprovePurchaseRequestResponse> {
  const result = await fetchWithAuth<ApprovePurchaseRequestResponse>(
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
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sort) queryParams.append('sort', params.sort);

  const queryString = queryParams.toString();
  const url = `${PURCHASE_API_PATHS.USER_GET_MY_PURCHASES}${queryString ? `?${queryString}` : ''}`;

  const result = await fetchWithAuth<GetMyPurchasesResponse>(url, {
    method: 'GET',
  });

  return result.data;
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
 * 예산 조회
 */
export interface GetBudgetResponse {
  budget: number;
  monthlySpending: number;
  remainingBudget: number;
}

/**
 * 주어진 회사의 예산과 지출 요약을 조회합니다.
 *
 * @param companyId - 조회할 회사의 식별자
 * @returns 회사의 총 예산(`budget`), 해당 기간의 월별 지출(`monthlySpending`), 남은 예산(`remainingBudget`)을 포함한 객체
 */
export async function getBudget(companyId: string): Promise<GetBudgetResponse> {
  const result = await fetchWithAuth<GetBudgetResponse>(
    `${BUDGET_API_PATHS.GET_BUDGET}/${companyId}`,
    {
      method: 'GET',
    }
  );

  return result.data;
}
