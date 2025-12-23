'use client';

import { useAuthStore } from '@/lib/store/authStore';

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
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다.');
  }

  const { accessToken } = useAuthStore.getState();
  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  const timeout = Number.parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000', 10);
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
  const url = `/api/v1/purchase/admin/getAllPurchases${queryString ? `?${queryString}` : ''}`;

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
  const result = await fetchWithAuth<PurchaseNowResponse>('/api/v1/purchase/admin/purchaseNow', {
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

export async function managePurchaseRequests(
  params?: ManagePurchaseRequestsParams
): Promise<ManagePurchaseRequestsResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('size', params.size.toString());
  if (params?.status) queryParams.append('status', params.status);
  if (params?.sort) queryParams.append('sort', params.sort);

  const queryString = queryParams.toString();
  const url = `/api/v1/purchase/admin/managePurchaseRequests${queryString ? `?${queryString}` : ''}`;

  const result = await fetchWithAuth<ManagePurchaseRequestsResponse>(url, {
    method: 'GET',
  });

  return result.data;
}

/**
 * 구매 요청 승인 (관리자)
 */
export interface ApprovePurchaseRequestResponse {
  data: PurchaseRequestItem;
}

export async function approvePurchaseRequest(
  purchaseRequestId: string
): Promise<ApprovePurchaseRequestResponse> {
  const result = await fetchWithAuth<ApprovePurchaseRequestResponse>(
    `/api/v1/purchase/admin/approvePurchaseRequest/${purchaseRequestId}`,
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

export async function rejectPurchaseRequest(
  purchaseRequestId: string,
  request: RejectPurchaseRequestRequest
): Promise<RejectPurchaseRequestResponse> {
  const result = await fetchWithAuth<RejectPurchaseRequestResponse>(
    `/api/v1/purchase/admin/rejectPurchaseRequest/${purchaseRequestId}`,
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
    '/api/v1/purchase/admin/expenseStatistics',
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

export async function getPurchaseDashboard(): Promise<PurchaseDashboardResponse> {
  const result = await fetchWithAuth<PurchaseDashboardResponse>(
    '/api/v1/purchase/admin/purchaseDashboard',
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
  const url = `/api/v1/purchase/user/getMyPurchases${queryString ? `?${queryString}` : ''}`;

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
    `/api/v1/purchase/user/getMyPurchaseDetail/${purchaseRequestId}`,
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
    '/api/v1/purchase/user/requestPurchase',
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
    '/api/v1/purchase/user/urgentRequestPurchase',
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

export async function cancelPurchaseRequest(
  purchaseRequestId: string
): Promise<CancelPurchaseRequestResponse> {
  const result = await fetchWithAuth<CancelPurchaseRequestResponse>(
    `/api/v1/purchase/user/cancelPurchaseRequest/${purchaseRequestId}`,
    {
      method: 'PATCH',
    }
  );

  return result.data;
}
