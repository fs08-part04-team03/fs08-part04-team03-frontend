/**
 * URL 파라미터 유틸리티
 * - URLSearchParams 조작을 단순화
 * - 빈 값 자동 제거
 */

/**
 * ReadonlyURLSearchParams 타입 (Next.js에서 사용)
 */
type ReadonlyURLSearchParams = {
  get: (key: string) => string | null;
  toString: () => string;
};

type ParamValue = string | number | boolean | undefined | null;

interface ParamUpdates {
  [key: string]: ParamValue;
}

/**
 * URL 파라미터를 업데이트하고 문자열로 반환
 * - 빈 값(null, undefined, '')은 자동으로 제거
 * - 숫자와 boolean은 자동으로 문자열로 변환
 *
 * @param searchParams - 현재 URLSearchParams 또는 쿼리 문자열
 * @param updates - 업데이트할 파라미터 객체
 * @returns 업데이트된 쿼리 문자열
 *
 * @example
 * ```ts
 * // 단일 파라미터 업데이트
 * updateUrlParams(searchParams, { page: 2 })
 * // 결과: "page=2&sort=latest"
 *
 * // 여러 파라미터 동시 업데이트
 * updateUrlParams(searchParams, { page: 1, sort: 'price' })
 * // 결과: "page=1&sort=price"
 *
 * // 파라미터 제거 (null 또는 undefined)
 * updateUrlParams(searchParams, { status: null, page: 1 })
 * // 결과: "page=1" (status 파라미터 제거)
 * ```
 */
export function updateUrlParams(
  searchParams: URLSearchParams | ReadonlyURLSearchParams | string,
  updates: ParamUpdates
): string {
  const params =
    typeof searchParams === 'string'
      ? new URLSearchParams(searchParams)
      : new URLSearchParams(searchParams.toString());

  Object.entries(updates).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

/**
 * URL 파라미터에서 숫자 파싱 (기본값 및 범위 지정 가능)
 *
 * @param searchParams - URLSearchParams
 * @param key - 파라미터 키
 * @param defaultValue - 기본값
 * @param options - min, max 범위 옵션
 * @returns 파싱된 숫자
 */
export function getNumberParam(
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  key: string,
  defaultValue: number,
  options?: { min?: number; max?: number }
): number {
  const value = searchParams.get(key);
  if (!value) return defaultValue;

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return defaultValue;

  const { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY } = options || {};
  return Math.max(min, Math.min(max, parsed));
}

/**
 * URL 파라미터에서 문자열 파싱 (기본값 지정 가능)
 *
 * @param searchParams - URLSearchParams
 * @param key - 파라미터 키
 * @param defaultValue - 기본값
 * @returns 파싱된 문자열
 */
export function getStringParam(
  searchParams: URLSearchParams | ReadonlyURLSearchParams,
  key: string,
  defaultValue?: string
): string | undefined {
  const value = searchParams.get(key);
  return value || defaultValue;
}

/**
 * 전체 URL을 빌드 (pathname + params)
 *
 * @param pathname - 경로
 * @param params - 파라미터
 * @returns 완전한 URL
 */
export function buildUrl(pathname: string, params: string): string {
  return params ? `${pathname}?${params}` : pathname;
}
