/**
 * Purchase 도메인 - 관리자 API
 */

import { PURCHASE_API_PATHS } from '@/features/purchase/constants/api';
import { fetchWithAuth } from './purchase.utils';
import type { PurchaseRequestItem, RequestPurchaseResponseData } from './purchase.types';

// ==================== 관리자 API ====================

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
