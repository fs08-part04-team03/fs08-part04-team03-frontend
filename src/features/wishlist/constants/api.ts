/**
 * Wishlist API 경로 상수
 */
export const WISHLIST_API_PATHS = {
  // 위시리스트 상태 확인
  CHECK_WISHLIST_STATUS: (productId: string | number) => `/api/v1/product/${productId}/wishlist`,

  // 위시리스트 추가/제거
  ADD_TO_WISHLIST: (productId: string | number) => `/api/v1/wishlist/${productId}`,
  REMOVE_FROM_WISHLIST: (productId: string | number) => `/api/v1/wishlist/${productId}`,

  // 위시리스트 목록 조회
  GET_MY_WISHLIST: '/api/v1/wishlist/my',
} as const;
