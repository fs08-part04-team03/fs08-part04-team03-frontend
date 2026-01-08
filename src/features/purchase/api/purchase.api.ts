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

  // 404 Not Found 에러 처리
  if (response.status === 404) {
    let errorMessage = '구매 내역을 찾을 수 없습니다.';
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      try {
        const errorResult = (await response.json()) as { message?: string };
        errorMessage = errorResult.message || errorMessage;
      } catch (parseError) {
        // JSON 파싱 실패 시 기본 메시지 사용
        logger.warn('Failed to parse 404 error response', {
          hasError: true,
          errorType: parseError instanceof Error ? parseError.constructor.name : 'Unknown',
        });
      }
    }
    throw new Error(errorMessage);
  }

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
 * 즉시 구매 (관리자) - 단일 상품
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
 * 구매 요청 응답 데이터 (공통 타입)
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
 * 즉시 구매 (관리자) - 여러 상품
 */
export interface PurchaseNowMultipleRequest {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  shippingFee: number;
}

export async function purchaseNowMultiple(
  request: PurchaseNowMultipleRequest
): Promise<RequestPurchaseResponseData> {
  const result = await fetchWithAuth<RequestPurchaseResponseData>(
    PURCHASE_API_PATHS.ADMIN_PURCHASE_NOW,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );

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
  approvedAt?: string; // 승인일 (새로운 필드)
  itemsTotalPrice: number; // 상품 금액 (API 스펙에 맞게 변경)
  shippingFee: number;
  finalTotalPrice: number; // 최종 금액 (새로운 필드)
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestMessage?: string;
  rejectReason?: string;
  urgent?: boolean;
  purchaseItems: Array<{
    id: string;
    quantity: number;
    priceSnapshot: number;
    itemTotal: number; // 항목 소계 (새로운 필드)
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
  // 하위 호환성을 위한 필드 (기존 코드 지원)
  totalPrice?: number; // itemsTotalPrice의 별칭 (deprecated)
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
 * GET /api/v1/purchase/admin/getPurchaseRequestDetail/{purchaseRequestId}
 */
export async function getPurchaseRequestDetail(
  purchaseRequestId: string
): Promise<PurchaseRequestItem> {
  try {
    // API 응답 타입 (실제 백엔드 응답 구조)
    interface ApiPurchaseRequestDetail {
      id: string;
      createdAt: string;
      updatedAt: string;
      approvedAt?: string;
      itemsTotalPrice: number;
      shippingFee: number;
      finalTotalPrice: number;
      status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
      requestMessage?: string;
      rejectReason?: string;
      purchaseItems: Array<{
        id: string;
        quantity: number;
        priceSnapshot: number;
        itemTotal: number;
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

    const result = await fetchWithAuth<ApiPurchaseRequestDetail>(
      `${PURCHASE_API_PATHS.ADMIN_GET_PURCHASE_REQUEST_DETAIL}/${purchaseRequestId}`,
      {
        method: 'GET',
      }
    );

    // API 응답을 PurchaseRequestItem 타입으로 변환 (하위 호환성 유지)
    const purchaseRequestItem: PurchaseRequestItem = {
      ...result.data,
      // itemsTotalPrice를 totalPrice로도 매핑 (기존 코드 호환성)
      totalPrice: result.data.itemsTotalPrice,
    };

    return purchaseRequestItem;
  } catch (error) {
    // 404 에러는 fetchWithAuth에서 이미 처리되지만, 추가로 명확한 메시지 제공
    if (error instanceof Error && error.message.includes('찾을 수 없습니다')) {
      throw new Error(`구매 요청을 찾을 수 없습니다. (ID: ${purchaseRequestId})`);
    }
    throw error;
  }
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

/**
 * 내 구매 내역 조회
 * GET /api/v1/purchase/user/getMyPurchases
 */
export interface GetMyPurchasesParams {
  page?: number; // 페이지 번호 (기본값: 1)
  limit?: number; // 페이지당 항목 수 (기본값: 10)
  sortBy?: 'createdAt' | 'updatedAt' | 'totalPrice'; // 정렬 기준 (기본값: createdAt)
  order?: 'asc' | 'desc'; // 정렬 순서 (기본값: desc)
  status?: string; // 상태 필터 (스펙에 없지만 하위 호환성을 위해 유지)
}

/**
 * API 응답 타입 (백엔드 실제 응답 구조)
 */
interface ApiMyPurchasesResponse {
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
 * 구매 요청 목록 응답 타입 (프론트엔드에서 사용하는 구조)
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
  if (params?.limit !== undefined) queryParams.append('limit', params.limit.toString());
  if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params?.order) queryParams.append('order', params.order);
  // status는 스펙에 없지만 하위 호환성을 위해 유지
  if (params?.status && params.status !== 'ALL' && params.status !== undefined) {
    queryParams.append('status', params.status);
  }

  const queryString = queryParams.toString();
  const url = `${PURCHASE_API_PATHS.USER_GET_MY_PURCHASES}${queryString ? `?${queryString}` : ''}`;

  try {
    const result = await fetchWithAuth<ApiMyPurchasesResponse[]>(url, {
      method: 'GET',
    });

    // 응답 데이터 검증
    if (!Array.isArray(result.data)) {
      logger.error('getMyPurchases: 응답 데이터가 배열이 아닙니다.', { data: result.data });
      throw new Error('서버 응답 형식이 올바르지 않습니다.');
    }

    // 개발 환경에서 응답 데이터 로깅 (디버깅용)
    if (process.env.NODE_ENV === 'development' && result.data.length > 0) {
      const sampleItem = result.data[0];
      logger.info('getMyPurchases: API 응답 샘플 데이터', {
        sampleItem,
        purchaseItems: sampleItem?.purchaseItems,
        purchaseItemsLength: sampleItem?.purchaseItems?.length,
        firstPurchaseItem: sampleItem?.purchaseItems?.[0],
        firstProduct: sampleItem?.purchaseItems?.[0]?.products,
        totalItems: result.data.length,
      });
      // logger.info는 개발 환경에서만 동작하므로 console.log는 제거
    }

    // API 응답을 PurchaseRequestItem 타입으로 변환 (안전하게)
    const purchaseList: PurchaseRequestItem[] = result.data
      .filter((item) => {
        // 필수 필드 검증
        if (!item?.id || !item.createdAt || !item.updatedAt) {
          logger.warn('getMyPurchases: 필수 필드가 없는 항목을 건너뜁니다.', { item });
          return false;
        }
        return true;
      })
      .map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        itemsTotalPrice: item.totalPrice ?? 0,
        shippingFee: item.shippingFee ?? 0,
        finalTotalPrice: (item.totalPrice ?? 0) + (item.shippingFee ?? 0),
        status: item.status,
        requestMessage: item.requestMessage,
        rejectReason: item.rejectReason,
        // 하위 호환성을 위한 필드
        totalPrice: item.totalPrice ?? 0,
        purchaseItems: Array.isArray(item.purchaseItems)
          ? (item.purchaseItems
              .map((purchaseItem, index) => {
                // purchaseItem과 products가 없으면 경고하고 빈 값 반환
                if (!purchaseItem) {
                  logger.warn('getMyPurchases: purchaseItem이 없습니다.', {
                    itemId: item.id,
                    index,
                  });
                  return null;
                }

                if (!purchaseItem.products) {
                  logger.warn('getMyPurchases: products가 없습니다.', {
                    purchaseItem,
                    itemId: item.id,
                    index,
                  });
                  return null;
                }

                const productName = purchaseItem.products.name;
                if (!productName || productName.trim() === '') {
                  logger.warn('getMyPurchases: 상품 이름이 없습니다.', {
                    purchaseItem,
                    itemId: item.id,
                    index,
                    products: purchaseItem.products,
                  });
                }

                return {
                  id: purchaseItem.id ?? '',
                  quantity: purchaseItem.quantity ?? 0,
                  priceSnapshot: purchaseItem.priceSnapshot ?? 0,
                  itemTotal: (purchaseItem.quantity ?? 0) * (purchaseItem.priceSnapshot ?? 0),
                  products: {
                    id: purchaseItem.products.id ?? 0,
                    name: productName ?? '이름 없음',
                    image: purchaseItem.products.image ?? '',
                    link: purchaseItem.products.link ?? '',
                  },
                };
              })
              .filter(
                (filteredItem) => filteredItem !== null
              ) as PurchaseRequestItem['purchaseItems'])
          : [],
        requester: {
          id: item.requester?.id ?? '',
          name: item.requester?.name ?? '',
          email: item.requester?.email ?? '',
        },
        approver: item.approver
          ? {
              id: item.approver.id,
              name: item.approver.name ?? '',
              email: item.approver.email ?? '',
            }
          : undefined,
      }));

    // 백엔드 응답 구조: { success, data: [], pagination: { page, limit, total, totalPages } }
    // 프론트엔드 응답 구조로 변환
    return {
      purchaseList,
      currentPage: result.pagination?.page || 1,
      totalPages: result.pagination?.totalPages || 1,
      totalItems: result.pagination?.total || 0,
      itemsPerPage: result.pagination?.limit || 10,
      hasNextPage: result.pagination
        ? result.pagination.page < result.pagination.totalPages
        : false,
      hasPreviousPage: result.pagination ? result.pagination.page > 1 : false,
    };
  } catch (error) {
    logger.error('getMyPurchases: API 호출 중 오류 발생', {
      error: error instanceof Error ? error.message : String(error),
      url,
      params,
    });
    throw error;
  }
}

/**
 * 내 구매 상세 조회
 * GET /api/v1/purchase/user/getMyPurchaseDetail/{purchaseRequestId}
 */
export async function getMyPurchaseDetail(purchaseRequestId: string): Promise<PurchaseRequestItem> {
  try {
    // API 응답 타입 (실제 백엔드 응답 구조)
    interface ApiMyPurchaseDetail {
      id: string;
      createdAt: string;
      updatedAt: string;
      totalPrice: number;
      shippingFee: number;
      status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
      requestMessage: string;
      rejectReason: string;
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

    const result = await fetchWithAuth<ApiMyPurchaseDetail>(
      `${PURCHASE_API_PATHS.USER_GET_MY_PURCHASE_DETAIL}/${purchaseRequestId}`,
      {
        method: 'GET',
      }
    );

    // 개발 환경에서 응답 데이터 로깅 (디버깅용)
    if (process.env.NODE_ENV === 'development') {
      logger.info('getMyPurchaseDetail: API 응답 데이터', {
        purchaseRequestId,
        data: result.data,
        purchaseItems: result.data.purchaseItems,
      });
    }

    // API 응답을 PurchaseRequestItem 타입으로 변환 (안전하게)
    const purchaseRequestItem: PurchaseRequestItem = {
      id: result.data.id,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
      itemsTotalPrice: result.data.totalPrice ?? 0,
      shippingFee: result.data.shippingFee ?? 0,
      finalTotalPrice: (result.data.totalPrice ?? 0) + (result.data.shippingFee ?? 0),
      status: result.data.status,
      requestMessage: result.data.requestMessage ?? '',
      rejectReason: result.data.rejectReason ?? '',
      // 하위 호환성을 위한 필드
      totalPrice: result.data.totalPrice ?? 0,
      purchaseItems: Array.isArray(result.data.purchaseItems)
        ? (result.data.purchaseItems
            .map((item) => {
              if (!item || !item.products) {
                logger.warn('getMyPurchaseDetail: purchaseItem 또는 products가 없습니다.', {
                  item,
                  purchaseRequestId,
                });
                return null;
              }
              return {
                id: item.id ?? '',
                quantity: item.quantity ?? 0,
                priceSnapshot: item.priceSnapshot ?? 0,
                itemTotal: (item.quantity ?? 0) * (item.priceSnapshot ?? 0),
                products: {
                  id: item.products.id ?? 0,
                  name: item.products.name ?? '',
                  image: item.products.image ?? '',
                  link: item.products.link ?? '',
                },
              };
            })
            .filter((item) => item !== null) as PurchaseRequestItem['purchaseItems'])
        : [],
      requester: {
        id: result.data.requester?.id ?? '',
        name: result.data.requester?.name ?? '',
        email: result.data.requester?.email ?? '',
      },
      approver: result.data.approver
        ? {
            id: result.data.approver.id ?? '',
            name: result.data.approver.name ?? '',
            email: result.data.approver.email ?? '',
          }
        : undefined,
    };

    return purchaseRequestItem;
  } catch (error) {
    // 404 에러는 fetchWithAuth에서 이미 처리되지만, 추가로 명확한 메시지 제공
    if (error instanceof Error && error.message.includes('찾을 수 없습니다')) {
      throw new Error(`구매 요청을 찾을 수 없습니다. (ID: ${purchaseRequestId})`);
    }
    throw error;
  }
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
