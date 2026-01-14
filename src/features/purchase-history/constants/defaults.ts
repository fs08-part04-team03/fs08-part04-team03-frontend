/**
 * Purchase History 도메인 기본값 상수
 */

// 페이지네이션
export const PURCHASE_HISTORY_DEFAULTS = {
  PAGE_SIZE: 4, // 페이지당 아이템 수
  INITIAL_PAGE: 1,
  DISPLAY_ITEMS_COUNT: 4, // 화면에 표시할 최대 아이템 수
} as const;
