/**
 * Purchase 도메인 공통 유틸리티 함수
 */

import { fetchWithAuth as fetchWithAuthUtil } from '@/utils/api';
import { logger } from '@/utils/logger';
import type { ApiResponse } from './purchase.types';

/**
 * 공통 API 요청 헬퍼 함수
 * refreshToken 자동 갱신 로직이 포함된 utils/api.ts의 fetchWithAuth 사용
 */
export async function fetchWithAuth<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
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
