// 경로(Path) 상수
export const PATHNAME = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  PURCHASE_REQUESTS: '/purchase-requests',
  PURCHASE_REQUEST_DETAIL: (id: string) => `/purchase-requests/${id}`,
  CART: '/cart',
  MYPAGE: '/mypage',
} as const;

// 공통 Breadcrumb 아이템
export const BREADCRUMB_ITEMS = {
  HOME: { label: '홈', href: PATHNAME.HOME },
  PRODUCTS: { label: '상품', href: PATHNAME.PRODUCTS },
  PURCHASE_REQUESTS: { label: '구매 요청', href: PATHNAME.PURCHASE_REQUESTS },
  CART: { label: '장바구니', href: PATHNAME.CART },
  MYPAGE: { label: '마이페이지', href: PATHNAME.MYPAGE },
} as const;

// API 서버 기본 URL
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const API_VERSION = 'v1';
export const API = `${BASE_URL}/api/${API_VERSION}`;

export type { UserRole } from './roles';
export type { AppRouteKey } from './routes';
export { ROUTES } from './routes';
export { getGNBPrimaryNavConfig, isNavActive } from './navigation';
