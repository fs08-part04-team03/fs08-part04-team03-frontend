// 경로 상수
export const PATHNAME = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  PURCHASE_REQUESTS: '/purchase-requests',
  PURCHASE_REQUEST_DETAIL: (id: string) => `/purchase-requests/${id}`,
  CART: '/cart',
  MYPAGE: '/mypage',
} as const;

// 자주 사용되는 breadcrumb 아이템
export const BREADCRUMB_ITEMS = {
  HOME: { label: '홈', href: PATHNAME.HOME },
  PRODUCTS: { label: '상품', href: PATHNAME.PRODUCTS },
  PURCHASE_REQUESTS: { label: '구매 요청', href: PATHNAME.PURCHASE_REQUESTS },
  CART: { label: '장바구니', href: PATHNAME.CART },
  MYPAGE: { label: '마이페이지', href: PATHNAME.MYPAGE },
} as const;
