'use client';

import { fetchWithAuth, getApiUrl, AuthExpiredError } from '@/utils/api';
import type { RegisteredProductOrgItem } from '@/features/products/components/RegisteredProductOrg/RegisteredProductOrg';
import type { BackendProduct } from '@/features/products/utils/product.utils';
import { getChildById, getParentById } from '@/constants/categories/categories.utils';
import { logger } from '@/utils/logger';

/**
 * 백엔드 API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 등록된 상품 조회 파라미터
 */
export interface GetRegisteredProductsParams {
  page?: number;
  size?: number;
  sort?: 'latest' | 'lowprice' | 'highprice';
}

/**
 * 등록된 상품 조회 응답 타입
 */
export interface GetRegisteredProductsResponse {
  products: RegisteredProductOrgItem[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}

/**
 * 카테고리 ID로 카테고리 이름 찾기 (부모 > 자식 형식)
 */
const getCategoryLabel = (categoryId: number | null | undefined): string => {
  try {
    if (!categoryId) return '미분류';
    const childCategory = getChildById(categoryId);
    if (!childCategory) return '미분류';

    const parentCategory = getParentById(childCategory.parentId);
    if (!parentCategory) return childCategory.name;

    return `${parentCategory.name} > ${childCategory.name}`;
  } catch (error) {
    logger.error('Category label generation error', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      hasCategoryId: !!categoryId,
    });
    return '미분류';
  }
};

/**
 * 백엔드 Product를 RegisteredProductOrgItem으로 변환
 */
const mapBackendProductToRegisteredItem = (product: BackendProduct): RegisteredProductOrgItem => {
  const imageSrc = product.image ? `${getApiUrl()}/uploads/${product.image}` : '';

  return {
    id: product.id,
    categoryLabel: getCategoryLabel(product.categoryId),
    name: product.name,
    price: product.price,
    imageSrc,
    link: product.link || '',
  };
};

/**
 * 내가 등록한 상품 목록 조회
 * @param params - 조회 파라미터 (page, size, sort)
 * @returns 등록된 상품 목록과 페이지네이션 정보
 */
export async function getMyRegisteredProducts(
  params?: GetRegisteredProductsParams
): Promise<GetRegisteredProductsResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page !== undefined) queryParams.append('page', params.page.toString());
  if (params?.size !== undefined) queryParams.append('limit', params.size.toString());

  // 정렬 파라미터 변환
  if (params?.sort) {
    const sortMap: Record<string, string> = {
      latest: 'latest',
      lowprice: 'priceAsc',
      highprice: 'priceDesc',
    };
    queryParams.append('sort', sortMap[params.sort] || 'latest');
  }

  const queryString = queryParams.toString();
  const url = `/api/v1/product/my${queryString ? `?${queryString}` : ''}`;

  // 개발 환경에서 요청 URL 로깅 제거 (의미 없는 디버그 로그)

  try {
    const response = await fetchWithAuth(url, {
      method: 'GET',
    });

    if (!response.ok) {
      let errorMessage = `등록된 상품을 불러오는데 실패했습니다. (상태 코드: ${response.status})`;
      let errorDetails: unknown = null;

      try {
        const errorText = await response.text();
        if (errorText) {
          try {
            const errorJson = JSON.parse(errorText) as {
              message?: string;
              error?: string;
              errors?: unknown;
              code?: string;
              details?: Array<{ field?: string; message?: string }>;
              [key: string]: unknown;
            };
            errorDetails = errorJson;

            // details 배열에서 상세 에러 메시지 추출
            let detailsMessage = '';
            if (Array.isArray(errorJson.details) && errorJson.details.length > 0) {
              detailsMessage = errorJson.details
                .map((detail) => {
                  if (detail.field && detail.message) {
                    return `${detail.field}: ${detail.message}`;
                  }
                  return detail.message || '';
                })
                .filter(Boolean)
                .join(', ');
            }

            // 다양한 에러 메시지 필드 확인
            const baseMessage =
              errorJson.message ||
              errorJson.error ||
              (typeof errorJson.errors === 'string' ? errorJson.errors : null) ||
              '';

            // details 메시지가 있으면 추가
            if (detailsMessage) {
              errorMessage = baseMessage ? `${baseMessage} (${detailsMessage})` : detailsMessage;
            } else {
              errorMessage = baseMessage || errorMessage;
            }

            // 에러 객체가 복잡한 경우 JSON.stringify로 변환
            const defaultErrorMsg = `등록된 상품을 불러오는데 실패했습니다. (상태 코드: ${response.status})`;
            if (errorMessage === defaultErrorMsg && errorJson) {
              try {
                const errorStr = JSON.stringify(errorJson, null, 2);
                errorMessage = `${errorMessage}\n${errorStr}`;
              } catch {
                // JSON.stringify 실패 시 무시
              }
            }
          } catch {
            // JSON 파싱 실패 시 텍스트 그대로 사용
            errorMessage = errorText || errorMessage;
          }
        }
      } catch {
        // 텍스트 읽기 실패 시 기본 메시지 사용
      }

      // errorMessage가 객체인 경우 문자열로 변환
      let finalErrorMessage = errorMessage;
      if (typeof errorMessage !== 'string') {
        try {
          finalErrorMessage = JSON.stringify(errorMessage, null, 2);
        } catch {
          finalErrorMessage = String(errorMessage);
        }
      }

      // 개발 환경에서 상세 에러 로깅
      logger.error('Failed to fetch registered products', {
        status: response.status,
        statusText: response.statusText,
        hasErrorMessage: !!finalErrorMessage,
        hasErrorDetails: !!errorDetails,
      });

      throw new Error(finalErrorMessage);
    }

    const result = (await response.json()) as ApiResponse<BackendProduct[]>;

    if (!result.success) {
      throw new Error(result.message || '등록된 상품을 불러오는데 실패했습니다.');
    }

    if (!Array.isArray(result.data)) {
      throw new Error('등록된 상품 데이터 형식이 올바르지 않습니다.');
    }

    return {
      products: result.data.map((product) => mapBackendProductToRegisteredItem(product)),
      totalItems: result.pagination?.total || result.data.length,
      currentPage: result.pagination?.page || 1,
      totalPages: result.pagination?.totalPages || 1,
    };
  } catch (error) {
    logger.error('API error in getMyRegisteredProducts', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
    });
    throw error;
  }
}

/**
 * 전체 상품 목록 조회 파라미터
 */
export interface GetAllProductsParams {
  sort?: string | null;
  categoryId?: number | null;
  accessToken?: string | null;
}

/**
 * 전체 상품 목록 조회 응답 타입
 */
export interface GetAllProductsResponse {
  data: BackendProduct[];
  error?: {
    code?: string;
    message?: string;
  };
}

/**
 * 전체 상품 목록 조회 (카테고리 필터링 및 정렬 지원)
 * @param params - 조회 파라미터 (sort, categoryId, accessToken)
 * @returns 상품 목록 데이터
 */
export async function getAllProducts(
  params?: GetAllProductsParams
): Promise<GetAllProductsResponse> {
  const { sort, categoryId, accessToken } = params || {};
  const qs = new URLSearchParams();

  // 백엔드 API 스펙에 맞게 파라미터 설정
  if (sort) {
    const SORT_MAP: Record<string, string> = {
      latest: 'latest',
      sell: 'sales',
      'price-asc': 'priceAsc',
      'price-desc': 'priceDesc',
      sales: 'sales',
      priceAsc: 'priceAsc',
      priceDesc: 'priceDesc',
    };
    qs.set('sort', SORT_MAP[sort] ?? sort);
  }

  if (categoryId != null) qs.set('categoryId', String(categoryId));

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  // 백엔드 API 스펙에 맞게 엔드포인트 변경: /api/v1/product
  const res = await fetch(`/api/v1/product?${qs.toString()}`, {
    headers,
    credentials: 'include',
  });

  if (!res.ok) {
    const bodyText = await res.text();
    let parsed: GetAllProductsResponse | null = null;

    try {
      parsed = JSON.parse(bodyText) as GetAllProductsResponse;
    } catch {
      // ignore
    }

    // 429 Too Many Requests 에러 처리
    if (res.status === 429) {
      throw new Error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
    }

    // 401 Unauthorized 에러 처리 (재시도 없이 즉시 에러 반환)
    if (res.status === 401) {
      throw new AuthExpiredError(
        '인증이 필요합니다. 다시 로그인해주세요.',
        res.status,
        res,
        parsed as unknown
      );
    }

    const isAuthExpired = parsed?.error?.code === 'AUTH_TOKEN_EXPIRED';

    if (isAuthExpired) {
      const retryRes = await fetch(`/api/v1/product?${qs.toString()}`, {
        headers: { Accept: 'application/json' },
        credentials: 'include',
      });

      // 재시도 시에도 에러 체크
      if (!retryRes.ok) {
        // 429 Too Many Requests 에러 처리
        if (retryRes.status === 429) {
          throw new Error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
        }

        // 401 에러는 재시도하지 않고 즉시 반환
        if (retryRes.status === 401) {
          throw new AuthExpiredError(
            '인증이 필요합니다. 다시 로그인해주세요.',
            retryRes.status,
            retryRes,
            null
          );
        }

        const retryText = await retryRes.text();
        let retryParsed: GetAllProductsResponse | null = null;

        try {
          retryParsed = JSON.parse(retryText) as GetAllProductsResponse;
        } catch {
          // ignore
        }

        const isRetryAuthExpired = retryParsed?.error?.code === 'AUTH_TOKEN_EXPIRED';

        if (isRetryAuthExpired) {
          throw new AuthExpiredError(
            '인증이 만료되었습니다.',
            retryRes.status,
            retryRes,
            retryParsed as unknown
          );
        }

        throw new Error(`product fetch failed: ${retryRes.status} ${retryText}`);
      }

      const retryBodyText = await retryRes.text();
      let retryParsed: GetAllProductsResponse | null = null;

      try {
        retryParsed = JSON.parse(retryBodyText) as GetAllProductsResponse;
      } catch {
        throw new Error('product fetch failed: invalid JSON response');
      }

      if (!retryParsed) {
        throw new Error('product fetch failed: invalid JSON response');
      }

      return retryParsed;
    }

    throw new Error(`product fetch failed: ${res.status} ${bodyText}`);
  }

  return (await res.json()) as GetAllProductsResponse;
}

/**
 * 상품 디테일 조회 (일반 상품)
 * @param productId - 상품 ID
 * @returns 상품 디테일 데이터
 */
export async function getProductById(productId: string | number): Promise<BackendProduct> {
  const response = await fetchWithAuth(`/api/v1/product/${productId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    // 404 에러 처리
    if (response.status === 404) {
      throw new Error('상품을 찾을 수 없습니다. 삭제되었거나 존재하지 않는 상품입니다.');
    }
    // 401 에러 처리
    if (response.status === 401) {
      throw new AuthExpiredError(
        '인증이 필요합니다. 다시 로그인해주세요.',
        response.status,
        response,
        null
      );
    }
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<BackendProduct>;

  if (!result.success || !result.data) {
    throw new Error('상품 데이터 형식이 올바르지 않습니다.');
  }

  return result.data;
}

/**
 * 내가 등록한 상품 디테일 조회
 * @param productId - 상품 ID
 * @returns 상품 디테일 데이터
 */
export async function getMyProductById(productId: string | number): Promise<BackendProduct> {
  const response = await fetchWithAuth(`/api/v1/product/my/${productId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<BackendProduct>;

  if (!result.success || !result.data) {
    throw new Error('상품 데이터 형식이 올바르지 않습니다.');
  }

  return result.data;
}

/**
 * 내가 등록한 상품 수정
 * @param productId - 상품 ID
 * @param data - 수정할 상품 데이터
 * @returns 수정된 상품 데이터
 */
export interface UpdateMyProductData {
  name: string;
  price: number;
  link: string;
  categoryId: number;
  image?: string;
}

export async function updateMyProduct(
  productId: string | number,
  data: UpdateMyProductData
): Promise<BackendProduct> {
  const response = await fetchWithAuth(`/api/v1/product/${productId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('상품 수정에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<BackendProduct>;

  if (!result.success || !result.data) {
    throw new Error('상품 수정 데이터 형식이 올바르지 않습니다.');
  }

  return result.data;
}

/**
 * 내가 등록한 상품 삭제
 * @param productId - 상품 ID
 */
export async function deleteMyProduct(productId: string | number): Promise<void> {
  const response = await fetchWithAuth(`/api/v1/product/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('상품 삭제에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<unknown>;

  if (!result.success) {
    throw new Error('상품 삭제에 실패했습니다.');
  }
}

/**
 * 상품 삭제 (MANAGER 이상)
 * @param productId - 상품 ID
 */
export async function deleteProduct(productId: string | number): Promise<void> {
  const response = await fetchWithAuth(`/api/v1/product/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('상품 삭제에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<unknown>;

  if (!result.success) {
    throw new Error('상품 삭제에 실패했습니다.');
  }
}
