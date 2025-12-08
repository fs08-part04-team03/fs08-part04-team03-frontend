// 경로(Path) 상수
export const PATHNAME = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  INVITE_SIGNUP: (token: string) => `/invite/${token}`,

  // 회사 스코프
  COMPANY_ROOT: (companyId: string) => `/${companyId}`,
  HOME: (companyId: string) => `/${companyId}/products`,

  //  상품 리스트, 상품상세, 내상품등록내역
  PRODUCTS: (companyId: string) => `/${companyId}/products`,
  PRODUCT_DETAIL: (companyId: string, productId: string) => `/${companyId}/products/${productId}`,
  PRODUCT_MINE: (companyId: string) => `/${companyId}/products/my`, // /products/my

  //  위시리스트
  WISHLIST: (companyId: string) => `/${companyId}/wishlist`,

  //  프로필
  PROFILE: (companyId: string) => `/${companyId}/profile`,
  MYPAGE: (companyId: string) => `/${companyId}/profile`, // alias

  //  장바구니
  CART: (companyId: string) => `/${companyId}/cart`,

  //  구매요청내역, 구매요청내역상세 (유저용)
  PURCHASE_REQUEST: (companyId: string) => `/${companyId}/purchase-request`,
  PURCHASE_REQUEST_COMPLETED: (companyId: string) => `/${companyId}/purchase-request/completed`,

  //  주문 완료 (장바구니 구매 완료 - 관리자/최고관리자)
  ORDER_COMPLETED: (companyId: string) => `/${companyId}/order/completed`,

  //  내구매요청내역, 구매요청관리, 구매요청관리상세
  MY_PURCHASE_REQUESTS: (companyId: string) => `/${companyId}/my/purchase-requests`,
  PURCHASE_REQUESTS: (companyId: string) => `/${companyId}/my/purchase-requests`, // alias
  MY_PURCHASE_REQUEST_DETAIL: (companyId: string, requestId: string) =>
    `/${companyId}/my/purchase-requests/${requestId}`,

  //  관리자 (manager)
  MANAGER_REQUESTS: (companyId: string) => `/${companyId}/manager/requests`,
  MANAGER_REQUEST_DETAIL: (companyId: string, requestId: string) =>
    `/${companyId}/manager/requests/${requestId}`,
  MANAGER_PURCHASE_HISTORY: (companyId: string) => `/${companyId}/manager/purchase-history`,
  MANAGER_PURCHASE_HISTORY_DETAIL: (companyId: string, orderId: string) =>
    `/${companyId}/manager/purchase-history/${orderId}`,

  //  최고관리자 (admin)
  ADMIN_ROOT: (companyId: string) => `/${companyId}/admin`,
  ADMIN_USERS: (companyId: string) => `/${companyId}/admin/users`,
  ADMIN_BUDGET: (companyId: string) => `/${companyId}/admin/budget`,
} as const;

// 공통 Breadcrumb 아이템
export const BREADCRUMB_ITEMS = {
  HOME: {
    label: '홈',
    href: (companyId: string) => PATHNAME.HOME(companyId),
  },
  PRODUCTS: {
    label: '상품',
    href: (companyId: string) => PATHNAME.PRODUCTS(companyId),
  },
  PURCHASE_REQUESTS: {
    label: '구매 요청 내역',
    href: (companyId: string) => PATHNAME.PURCHASE_REQUESTS(companyId),
  },
  CART: {
    label: '장바구니',
    href: (companyId: string) => PATHNAME.CART(companyId),
  },
  MYPAGE: {
    label: '마이페이지',
    href: (companyId: string) => PATHNAME.MYPAGE(companyId),
  },
} as const;

// API 서버 기본 URL
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const API_VERSION = 'v1';
export const API = `${BASE_URL}/api/${API_VERSION}`;

// re-export
export type { UserRole } from './roles';
export type { AppRouteKey } from './routes';
export { ROUTES } from './routes';
export { getGNBPrimaryNavConfig, isNavActive } from './navigation';
