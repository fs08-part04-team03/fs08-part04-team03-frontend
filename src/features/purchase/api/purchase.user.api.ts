/**
 * Purchase 도메인 - 사용자 API
 */

import { PURCHASE_API_PATHS } from '@/features/purchase/constants/api';
import { logger } from '@/utils/logger';
import { fetchWithAuth } from './purchase.utils';
import type { PurchaseRequestItem, RequestPurchaseResponseData } from './purchase.types';

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
      imageUrl?: string;
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
                    imageUrl: purchaseItem.products.imageUrl ?? purchaseItem.products.image ?? '',
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
      url: `${PURCHASE_API_PATHS.USER_GET_MY_PURCHASES}${queryString ? `?${queryString}` : ''}`,
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
      reason: string; // 승인 사유
      rejectReason: string;
      purchaseItems: Array<{
        id: string;
        quantity: number;
        priceSnapshot: number;
        products: {
          id: number;
          name: string;
          image: string;
          imageUrl?: string;
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
      reason: result.data.reason ?? '', // 승인 사유
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
                  imageUrl: item.products.imageUrl ?? item.products.image ?? '',
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
