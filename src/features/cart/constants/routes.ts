/**
 * Cart 도메인 라우팅 경로 상수
 */

export const CART_ROUTES = {
  /** 장바구니 페이지 */
  CART: (companyId: string) => `/${companyId}/cart`,

  /** 주문 페이지 */
  ORDER: (companyId: string) => `/${companyId}/order`,

  /** 주문 페이지 (선택 상품 포함) */
  ORDER_WITH_ITEMS: (companyId: string, items: string) => `/${companyId}/order?items=${items}`,

  /** 주문 완료 페이지 */
  ORDER_COMPLETED: (companyId: string, id?: string) => {
    const base = `/${companyId}/order/completed`;
    return id ? `${base}?id=${id}` : base;
  },

  /** 상품 목록 페이지 */
  PRODUCTS: (companyId: string) => `/${companyId}/products`,

  /** 구매 요청 내역 페이지 */
  PURCHASE_REQUESTS: (companyId: string) => `/${companyId}/my/purchase-requests`,
} as const;
