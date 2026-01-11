/**
 * Products 도메인 React Query Key 상수
 * 순수 객체/함수만 포함
 */

export const productKeys = {
  /**
   * 전체 상품 목록 조회
   * @param categoryId - 카테고리 ID (optional)
   * @param sort - 정렬 옵션 (optional)
   * @param searchQuery - 검색어 (optional)
   */
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (categoryId: number | null, sort: string, searchQuery: string) =>
    [...productKeys.lists(), categoryId, sort, searchQuery] as const,

  /**
   * 상품 상세 조회
   * @param productId - 상품 ID
   */
  detail: (productId: string | number) => ['product', productId] as const,

  /**
   * 내가 등록한 상품 상세 조회
   * @param productId - 상품 ID
   */
  myDetail: (productId: string | number) => ['myProduct', productId] as const,

  /**
   * 내가 등록한 상품 목록 조회
   * @param page - 페이지 번호
   * @param pageSize - 페이지 크기
   * @param sort - 정렬 옵션
   */
  myRegistered: (page: number, pageSize: number, sort: string) =>
    ['myRegisteredProducts', page, pageSize, sort] as const,
};
