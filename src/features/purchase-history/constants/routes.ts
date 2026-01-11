/**
 * Purchase History 도메인 라우팅 경로 상수
 */

export const PURCHASE_HISTORY_ROUTES = {
  /** 구매 내역 목록 페이지 */
  LIST: (companyId: string) => `/${companyId}/purchase-history`,
  /** 구매 내역 상세 페이지 */
  DETAIL: (companyId: string, orderId: string) => `/${companyId}/purchase-history/${orderId}`,
  /** 상품 목록 페이지 */
  PRODUCTS: (companyId: string) => `/${companyId}/products`,
} as const;
