import type { Option } from '@/components/atoms/DropDown/DropDown';

// 경로(Path) 상수
export const PATHNAME = {
  ROOT: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  INVITE_SIGNUP: (token: string) => `/invite?token=${token}`,

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
  PROFILE: (companyId: string) => `/${companyId}/my/profile`,
  MYPAGE: (companyId: string) => `/${companyId}/my/profile`, // alias

  //  장바구니
  CART: (companyId: string) => `/${companyId}/cart`,

  //  구매요청 폼 페이지 (장바구니에서 넘어오는 페이지)
  PURCHASE_REQUEST: (companyId: string) => `/${companyId}/purchase-request`,
  PURCHASE_REQUEST_COMPLETED: (companyId: string) => `/${companyId}/purchase-request/completed`,

  //  주문 완료 (장바구니 구매 완료 - 관리자/최고관리자)
  ORDER_COMPLETED: (companyId: string) => `/${companyId}/order/completed`,

  //  내 구매요청 내역 (모든 유저가 자신이 요청한 구매 목록을 볼 수 있는 페이지)
  MY_PURCHASE_REQUESTS: (companyId: string) => `/${companyId}/my/purchase-requests`,
  MY_PURCHASE_REQUEST_DETAIL: (companyId: string, requestId: string) =>
    `/${companyId}/my/purchase-requests/${requestId}`,

  //  관리자 (manager 이상) - 구매 요청 관리
  MANAGER_PURCHASE_REQUESTS: (companyId: string) => `/${companyId}/requests`,
  MANAGER_PURCHASE_REQUEST_DETAIL: (companyId: string, requestId: string) =>
    `/${companyId}/requests/${requestId}`,
  //  관리자 (manager 이상) - 구매 내역 확인
  MANAGER_PURCHASE_HISTORY: (companyId: string) => `/${companyId}/purchase-history`,
  MANAGER_PURCHASE_HISTORY_DETAIL: (companyId: string, orderId: string) =>
    `/${companyId}/purchase-history/${orderId}`,

  //  최고관리자 (admin)
  ADMIN_ROOT: (companyId: string) => `/${companyId}/admin`,
  ADMIN_USERS: (companyId: string) => `/${companyId}/admin/users`,
  ADMIN_BUDGET: (companyId: string) => `/${companyId}/admin/budget`,
} as const;

// 공통 Breadcrumb 아이템
export const BREADCRUMB_ITEMS = {
  PRODUCTS: {
    label: '상품',
    href: (companyId: string) => PATHNAME.PRODUCTS(companyId),
  },
  MY_PURCHASE_REQUESTS: {
    label: '구매 요청 내역',
    href: (companyId: string) => PATHNAME.MY_PURCHASE_REQUESTS(companyId),
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
export { getGNBPrimaryNavConfig, isNavActive, type GNBPrimaryNavItem } from './navigation';

// 카테고리 관련 상수 및 함수 re-export
export { PARENT_CATEGORIES, CHILD_CATEGORIES } from './categories/categories.constants';

export {
  PARENT_CATEGORY_OPTIONS,
  getParentById,
  getParentByKey,
  getChildById,
  getChildrenByParentId,
  buildProductBreadcrumb,
  CATEGORY_SECTIONS,
  getCategoryLabelById,
  getSubCategoryLabelById,
} from './categories/categories.utils';

export type {
  ParentCategory,
  ChildCategory,
  ParentCategoryId,
  ChildCategoryId,
  ParentCategoryKey,
  ChildCategoryKey,
  ParentCategoryOption,
  CategoryOption,
  CategorySection,
  CategoryBreadcrumbItem,
} from './categories/categories.constants';

// 상태 필터 옵션 : 구매요청페이지 사용
export const PURCHASE_REQUEST_STATUS_OPTIONS: Option[] = [
  { key: 'ALL', label: '전체' },
  { key: 'PENDING', label: '대기중' },
  { key: 'URGENT', label: '즉시요청' },
  { key: 'APPROVED', label: '승인됨' },
  { key: 'REJECTED', label: '반려됨' },
  { key: 'CANCELLED', label: '취소됨' },
] as const;

// Auth API 관련 상수 re-export (Feature-Sliced Design에 따라 features/auth/utils로 이동)
export {
  AUTH_API_PATHS,
  DEFAULT_API_URL,
  DEFAULT_TIMEOUT,
  ENV_KEYS,
  HTTP_HEADERS,
} from '@/features/auth/utils/constants';

// Purchase API 관련 상수 re-export (Feature-Sliced Design에 따라 features/purchase/constants로 이동)
export {
  PURCHASE_API_PATHS,
  BUDGET_API_PATHS,
  PURCHASE_REQUEST_STATUS_LABEL,
} from '@/features/purchase/constants';

// 타이밍 관련 상수 re-export
export { TOAST_AUTO_CLOSE_DURATION, QUERY_STALE_TIME_BUDGET, MAX_IMAGE_FILE_SIZE } from './timing';

// 메시지 관련 상수 re-export
export {
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  PURCHASE_ERROR_MESSAGES,
  AUTH_ERROR_MESSAGES,
  FILE_ERROR_MESSAGES,
  VALIDATION_MESSAGES,
} from './messages';
