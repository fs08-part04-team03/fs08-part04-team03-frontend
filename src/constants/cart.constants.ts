// cart.constants.ts

/* =====================
 * API BASE
 ====================== */
export const CART_API_BASE = '/api/v1/cart';

/* =====================
 * API ENDPOINTS
 ====================== */
export const CART_API = {
  ADD_TO_CART: `${CART_API_BASE}/addToCart`,
  GET_MY_CART: `${CART_API_BASE}/getMyCart`,
  UPDATE_QUANTITY: `${CART_API_BASE}/updateQuantity`,
  DELETE_FROM_CART: `${CART_API_BASE}/deleteFromCart`,
  DELETE_MULTIPLE: `${CART_API_BASE}/deleteMultiple`,
} as const;

/* =====================
 * SUCCESS MESSAGES
 ====================== */
export const CART_SUCCESS_MESSAGE = {
  ADD_NEW: '장바구니에 상품이 추가되었습니다.',
  INCREASE_QUANTITY: '장바구니 상품의 수량이 증가했습니다.',
  UPDATE_QUANTITY: '장바구니 상품 수량이 수정되었습니다.',
  DELETE_SINGLE: '장바구니에서 상품이 삭제되었습니다.',
  DELETE_MULTIPLE: (count: number) => `${count}개의 상품이 장바구니에서 삭제되었습니다.`,
  GET_MY_CART: '내 장바구니 조회에 성공했습니다.',
} as const;

/* =====================
 * ERROR CODES (HTTP)
 ====================== */
export const CART_ERROR_CODE = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
} as const;

/* =====================
 * ERROR MESSAGES
 ====================== */
export const CART_ERROR_MESSAGE = {
  INVALID_REQUEST: '잘못된 요청입니다.',
  UNAUTHORIZED: '인증에 실패했습니다.',
  PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다.',
  CART_ITEM_NOT_FOUND: '장바구니 항목을 찾을 수 없습니다.',
  FORBIDDEN_CART_ITEM: '본인의 장바구니 항목만 처리할 수 있습니다.',
  INVALID_QUANTITY: '수량은 1 이상이어야 합니다.',
  INACTIVE_PRODUCT: '비활성화된 상품은 장바구니에 추가할 수 없습니다.',
  DIFFERENT_COMPANY_PRODUCT: '같은 회사의 상품만 장바구니에 추가할 수 있습니다.',
  EMPTY_DELETE_LIST: '삭제할 장바구니 상품을 선택해주세요.',
} as const;

/* =====================
 * RESPONSE FLAGS
 ====================== */
export const CART_RESPONSE_FLAG = {
  IS_NEW: {
    TRUE: true, // 새 상품 추가
    FALSE: false, // 기존 상품 수량 증가
  },
} as const;

/* =====================
 * PAGINATION DEFAULTS
 ====================== */
export const CART_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
} as const;

/* TYPES (Optional Helper) */
export type CartApiEndpoint = (typeof CART_API)[keyof typeof CART_API];
