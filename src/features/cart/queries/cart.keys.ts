/**
 * Cart 도메인 React Query Key 상수
 * 순수 객체/함수만 포함
 */

export const cartKeys = {
  /**
   * 장바구니 조회
   * @param page - 페이지 번호
   * @param pageSize - 페이지 크기
   * @param cartItemIdsParam - 선택된 cartItemIds 파라미터 (optional)
   */
  all: ['cart'] as const,
  lists: () => [...cartKeys.all, 'list'] as const,
  list: (page: number, pageSize: number, cartItemIdsParam?: string | null) =>
    [...cartKeys.lists(), page, pageSize, cartItemIdsParam || 'all'] as const,

  /**
   * 월 예산 조회
   * @param year - 연도
   * @param month - 월
   */
  budget: (year: number, month: number) => ['budget', year, month] as const,
};
