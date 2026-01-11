/**
 * Cart 도메인 기본값 상수
 */

/** 페이지네이션 기본값 */
export const CART_PAGE_DEFAULTS = {
  /** 기본 페이지 번호 */
  PAGE: 1,
  /** 기본 페이지 크기 */
  PAGE_SIZE: 10,
  /** 전체 조회 시 사용하는 큰 limit */
  LARGE_LIMIT: 100,
} as const;
