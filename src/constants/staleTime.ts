/**
 * React Query staleTime 상수
 * 밀리초 단위로 정의
 */

export const STALE_TIME = {
  /** 캐시 없음 - 항상 최신 데이터 가져오기 */
  NONE: 0,

  /** 30초 - 짧은 캐시 (장바구니 등 자주 변경되는 데이터) */
  SHORT: 30 * 1000,

  /** 1분 - 중간 캐시 (상품 목록 등) */
  ONE_MINUTE: 60 * 1000,

  /** 5분 - 긴 캐시 (예산 등 자주 변경되지 않는 데이터) */
  FIVE_MINUTES: 5 * 60 * 1000,
} as const;

export type StaleTimeValue = (typeof STALE_TIME)[keyof typeof STALE_TIME];
