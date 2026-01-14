/**
 * Purchase History 도메인 React Query Key 상수
 * 순수 객체/함수만 포함
 */

export const purchaseHistoryKeys = {
  /**
   * 구매 내역 목록 조회
   * @param sortBy - 정렬 기준 (createdAt | totalPrice)
   * @param order - 정렬 순서 (asc | desc)
   * @param page - 페이지 번호
   */
  all: ['purchaseHistory'] as const,
  lists: () => [...purchaseHistoryKeys.all, 'list'] as const,
  list: (sortBy?: 'createdAt' | 'totalPrice', order?: 'asc' | 'desc', page?: number) =>
    [...purchaseHistoryKeys.lists(), sortBy, order, page] as const,

  /**
   * 구매 내역 상세 조회
   * @param orderId - 주문 ID
   */
  detail: (orderId: string) => ['purchaseHistory', 'detail', orderId] as const,

  /**
   * 예산 조회
   * @param companyId - 회사 ID
   */
  budget: (companyId: string) => ['budget', companyId] as const,
};
