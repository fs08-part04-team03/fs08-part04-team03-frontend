'use client';

import { fetchWithAuth, AuthExpiredError } from '@/utils/api';
import { useAuthStore } from '@/lib/store/authStore';
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
 * SSR 하이드레이션 불일치를 방지하기 위해 상대 경로만 반환
 * 클라이언트 사이드에서 전체 URL을 구성해야 함
 */
const mapBackendProductToRegisteredItem = (product: BackendProduct): RegisteredProductOrgItem => {
  // 상대 경로만 반환 (클라이언트에서 origin 추가)
  const imageSrc: string = product.image
    ? `/api/product/image?key=${encodeURIComponent(product.image)}`
    : '';

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
  q?: string | null;
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
 * @param params - 조회 파라미터 (sort, categoryId, accessToken, q)
 * @returns 상품 목록 데이터
 */
export async function getAllProducts(
  params?: GetAllProductsParams
): Promise<GetAllProductsResponse> {
  const { sort, categoryId, accessToken, q } = params || {};
  const qs = new URLSearchParams();

  // 모든 상품을 가져오기 위해 all=true 사용
  qs.set('all', 'true');

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
  if (q) qs.set('q', q);

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  // Next.js API route를 통해 모든 상품 조회: /api/product?all=true
  const res = await fetch(`/api/product?${qs.toString()}`, {
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
      const retryRes = await fetch(`/api/product?${qs.toString()}`, {
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
      let retryParsed: {
        success?: boolean;
        data?: BackendProduct[];
        pagination?: unknown;
        message?: string;
      } | null = null;

      try {
        retryParsed = JSON.parse(retryBodyText) as {
          success?: boolean;
          data?: BackendProduct[];
          pagination?: unknown;
          message?: string;
        };
      } catch {
        throw new Error('product fetch failed: invalid JSON response');
      }

      if (!retryParsed || typeof retryParsed !== 'object') {
        throw new Error('product fetch failed: invalid JSON response');
      }

      // Next.js API route 응답 형식 변환: { success: true, data: [...] } -> { data: [...] }
      if ('data' in retryParsed && Array.isArray(retryParsed.data)) {
        return {
          data: retryParsed.data,
        } as GetAllProductsResponse;
      }

      return retryParsed as GetAllProductsResponse;
    }

    throw new Error(`product fetch failed: ${res.status} ${bodyText}`);
  }

  const result = (await res.json()) as {
    success?: boolean;
    data?: BackendProduct[];
    pagination?: unknown;
    message?: string;
  };

  // Next.js API route 응답 형식 변환: { success: true, data: [...] } -> { data: [...] }
  if (result && typeof result === 'object' && 'data' in result && Array.isArray(result.data)) {
    return {
      data: result.data,
    } as GetAllProductsResponse;
  }

  return result as GetAllProductsResponse;
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
 * 이미지 업로드 응답 타입
 */
interface ImageUploadResponse {
  key: string;
  url: string;
  signedUrl: string;
  expiresIn: number;
  originalName: string;
  size: number;
  mimeType: string;
}

/**
 * 이미지 업로드
 * @param file - 업로드할 이미지 파일
 * @param folder - 이미지를 저장할 폴더 (products, users, companies, misc)
 * @returns 업로드된 이미지의 S3 key
 */
export async function uploadProductImage(
  file: File,
  folder: 'products' | 'users' | 'companies' | 'misc' = 'products'
): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const { accessToken } = useAuthStore.getState();

  // 브라우저에서는 상대 경로 사용 (Next.js rewrites를 통해)
  // 서버 사이드에서는 절대 URL 사용
  const isBrowserEnv = typeof window !== 'undefined';
  let uploadUrl: string;

  if (isBrowserEnv) {
    // 브라우저에서는 상대 경로 사용
    uploadUrl = `/api/product/image?folder=${encodeURIComponent(folder)}`;
  } else {
    // 서버 사이드에서는 절대 URL 사용
    const baseUrl = process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || '';
    uploadUrl = `${baseUrl}/api/product/image?folder=${encodeURIComponent(folder)}`;
  }

  // fetchWithAuth를 사용하여 401 처리 및 토큰 갱신 로직 활용
  // FormData는 fetchWithAuth에서 자동으로 처리됨 (Content-Type 자동 제거)
  // accessToken이 null이면 undefined로 변환
  const response = await fetchWithAuth(
    uploadUrl,
    {
      method: 'POST',
      body: formData,
    },
    accessToken || undefined
  );

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = '이미지 업로드에 실패했습니다.';
    try {
      const errorJson = JSON.parse(errorText) as {
        message?: string;
        error?: { message?: string };
      };
      errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
    } catch {
      // JSON 파싱 실패 시 기본 메시지 사용
    }
    throw new Error(errorMessage);
  }

  const result = (await response.json()) as ApiResponse<ImageUploadResponse>;

  if (!result.success || !result.data) {
    throw new Error('이미지 업로드 응답 형식이 올바르지 않습니다.');
  }

  // S3 key 반환 (상품 API에서 사용)
  return result.data.key;
}

/**
 * 프로필 이미지 업로드
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지의 S3 key
 */
export async function uploadProfileImage(file: File): Promise<string> {
  return uploadProductImage(file, 'users');
}

/**
 * 회사 이미지 업로드
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지의 S3 key
 */
export async function uploadCompanyImage(file: File): Promise<string> {
  return uploadProductImage(file, 'companies');
}

/**
 * 이미지 URL 조회
 * @param key - S3 객체 키 (URL 인코딩 필요)
 * @param download - 다운로드 모드 활성화 여부
 * @returns 이미지의 Signed URL
 */
export async function getImageUrl(
  key: string,
  download = false
): Promise<{ key: string; url: string; expiresIn: number }> {
  // S3 key를 URL 인코딩
  const encodedKey = encodeURIComponent(key);
  let urlPath = `/api/v1/upload/image/${encodedKey}`;
  if (download) {
    urlPath += '?download=true';
  }

  const response = await fetchWithAuth(urlPath, {
    method: 'GET',
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('이미지를 찾을 수 없습니다.');
    }
    throw new Error('이미지 URL 조회에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<{
    key: string;
    url: string;
    expiresIn: number;
  }>;

  if (!result.success || !result.data) {
    throw new Error('이미지 URL 조회 응답 형식이 올바르지 않습니다.');
  }

  return result.data;
}

/**
 * 유효한 S3 이미지 키인지 검증
 * @param key - 검증할 이미지 키
 * @returns 유효하면 true, 유효하지 않으면 false
 */
function isValidImageKey(key: string): boolean {
  if (!key || typeof key !== 'string' || key.trim().length === 0) {
    return false;
  }

  // URL 형식은 유효하지 않음
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return false;
  }

  // 테스트용 키나 잘못된 형식은 유효하지 않음
  // 예: http_test_a.png 같은 테스트 키는 유효하지 않음
  if (key.startsWith('http_') || key.startsWith('test_') || key.includes('_test_')) {
    return false;
  }

  // 유효한 S3 키는 보통 특정 prefix로 시작 (예: products/, uploads/ 등)
  // 또는 파일 확장자를 가진 파일명 형식
  const hasValidExtension = /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(key);
  const hasValidPrefix = key.includes('/') || hasValidExtension;

  return hasValidPrefix;
}

/**
 * 이미지 삭제
 * S3에서 이미지를 삭제합니다.
 *
 * 권한: 파일 소유자 또는 같은 회사의 관리자(MANAGER/ADMIN)만 삭제 가능
 *
 * @param key - S3 객체 키 (URL 인코딩 필요, 예: products/123-abc.jpg)
 * @throws {Error} 403 - 이미지 삭제 권한이 없습니다
 * @throws {Error} 400 - 잘못된 요청 (키 없음)
 * @throws {Error} 401 - 인증 실패
 * @throws {Error} 500 - 이미지 삭제 실패
 */
export async function deleteImage(key: string): Promise<void> {
  // 유효하지 않은 키는 삭제하지 않음
  if (!isValidImageKey(key)) {
    // 유효하지 않은 키는 조용히 무시 (에러를 던지지 않음)
    return;
  }

  // S3 key를 URL 인코딩 (예: products/123-abc.jpg → products%2F123-abc.jpg)
  const encodedKey = encodeURIComponent(key);

  const response = await fetchWithAuth(`/api/v1/upload/image/${encodedKey}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    // 403 Forbidden: 권한 없음 (관리자만 삭제 가능)
    if (response.status === 403) {
      throw new Error('이미지 삭제 권한이 없습니다.');
    }
    // 401 Unauthorized: 인증 실패
    if (response.status === 401) {
      throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
    }
    // 400 Bad Request: 잘못된 요청 (키 없음)
    if (response.status === 400) {
      // 이미 검증했지만 백엔드에서도 거부할 수 있음
      // 조용히 무시 (이미 삭제되었거나 유효하지 않은 키)
      return;
    }
    // 404 Not Found: 이미 삭제된 경우이므로 성공으로 처리
    if (response.status === 404) {
      return; // 이미 삭제된 경우 성공으로 간주
    }
    // 500 Internal Server Error: 이미지 삭제 실패
    if (response.status === 500) {
      throw new Error('이미지 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
    // 기타 에러
    throw new Error('이미지 삭제에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<unknown>;

  if (!result.success) {
    throw new Error(result.message || '이미지 삭제에 실패했습니다.');
  }
}

/**
 * 내가 등록한 상품 수정
 * @param productId - 상품 ID
 * @param data - 수정할 상품 데이터
 * @param options - 추가 옵션 (이미지 파일, 이미지 삭제 여부)
 * @returns 수정된 상품 데이터
 */
export interface UpdateMyProductData {
  name: string;
  price: number;
  link: string;
  categoryId: number;
}

export interface UpdateMyProductOptions {
  imageFile?: File; // 새 이미지 파일 (multipart/form-data로 전송)
  removeImage?: boolean; // 이미지 삭제 여부 (removeImage=true 쿼리 파라미터)
}

export async function updateMyProduct(
  productId: string | number,
  data: UpdateMyProductData,
  options?: UpdateMyProductOptions
): Promise<BackendProduct> {
  // multipart/form-data로 전송
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('price', String(data.price));
  formData.append('link', data.link);
  formData.append('categoryId', String(data.categoryId));

  // 새 이미지 파일이 있으면 추가
  if (options?.imageFile) {
    formData.append('image', options.imageFile);
  }

  // URL에 removeImage 쿼리 파라미터 추가
  let url = `/api/v1/product/${productId}`;
  if (options?.removeImage) {
    url += '?removeImage=true';
  }

  const response = await fetchWithAuth(url, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    // 에러 응답을 자세히 확인
    const errorText = await response.text();
    let errorMessage = '상품 수정에 실패했습니다.';
    try {
      const errorJson = JSON.parse(errorText) as {
        message?: string;
        error?: { message?: string };
      };
      errorMessage = errorJson.error?.message || errorJson.message || errorMessage;
    } catch {
      // JSON 파싱 실패 시 기본 메시지 사용
    }

    // 개발 환경에서 상세 정보 로깅
    if (process.env.NODE_ENV === 'development') {
      logger.error('Product update failed', {
        status: response.status,
        statusText: response.statusText,
        errorText,
        hasImageFile: !!options?.imageFile,
        removeImage: options?.removeImage,
      });
    }

    throw new Error(errorMessage);
  }

  const result = (await response.json()) as ApiResponse<BackendProduct>;

  if (!result.success || !result.data) {
    throw new Error(result.message || '상품 수정 데이터 형식이 올바르지 않습니다.');
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
