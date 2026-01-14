/**
 * Wishlist 도메인 React Query Key 상수
 * 순수 객체/함수만 포함
 */

export const wishlistKeys = {
  /**
   * 위시리스트 목록 조회
   * @param companyId - 회사 ID (테넌트 구조 반영)
   */
  all: (companyId: string) => ['wishlist', companyId] as const,
};
