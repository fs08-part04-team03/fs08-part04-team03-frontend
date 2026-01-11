/**
 * Purchase 도메인 React Query Key 상수
 * 순수 객체/함수만 포함
 */

export const purchaseKeys = {
  /**
   * 구매 요청 목록 조회 (관리자)
   * @param page - 페이지 번호
   * @param size - 페이지 크기
   * @param status - 상태 (PENDING, APPROVED, REJECTED, CANCELLED)
   * @param sortBy - 정렬 기준 (createdAt | totalPrice)
   * @param order - 정렬 순서 (asc | desc)
   */
  all: ['purchaseRequests'] as const,
  lists: () => [...purchaseKeys.all, 'list'] as const,
  list: (
    page?: number,
    size?: number,
    status?: string,
    sortBy?: 'createdAt' | 'totalPrice',
    order?: 'asc' | 'desc'
  ) => [...purchaseKeys.lists(), page, size, status, sortBy, order] as const,

  /**
   * 구매 요청 상세 조회
   * @param requestId - 구매 요청 ID
   */
  detail: (requestId: string) => ['purchaseRequestDetail', requestId] as const,

  /**
   * 모달용 구매 요청 상세 조회
   * @param requestId - 구매 요청 ID
   */
  detailForModal: (requestId: string | null) =>
    ['purchaseRequestDetailForModal', requestId] as const,

  /**
   * 내 구매 요청 목록 조회
   * @param page - 페이지 번호
   * @param size - 페이지 크기
   * @param status - 상태 필터
   * @param sort - 정렬 옵션
   */
  myPurchases: (page?: number, size?: number, status?: string, sort?: string) =>
    ['myPurchases', page, size, status, sort] as const,

  /**
   * 예산 조회
   * @param companyId - 회사 ID
   */
  budget: (companyId: string) => ['budget', companyId] as const,

  /**
   * 내 구매 요청 상세 조회 (detail과 동일한 키 사용)
   * @param requestId - 구매 요청 ID
   */
  myDetail: (requestId: string) => purchaseKeys.detail(requestId),
};
