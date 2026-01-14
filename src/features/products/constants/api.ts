/**
 * Products API 경로 상수
 */
export const PRODUCT_API_PATHS = {
  // 상품 목록
  GET_PRODUCTS: '/api/v1/product',
  GET_MY_PRODUCTS: '/api/v1/product/my',
  GET_PRODUCT_BY_ID: (productId: string | number) => `/api/v1/product/${productId}`,
  GET_MY_PRODUCT_BY_ID: (productId: string | number) => `/api/v1/product/my/${productId}`,

  // 상품 등록/수정/삭제
  CREATE_PRODUCT: '/api/v1/product',
  UPDATE_PRODUCT: (productId: string | number) => `/api/v1/product/${productId}`,
  DELETE_PRODUCT: (productId: string | number) => `/api/v1/product/${productId}`,

  // 이미지 업로드
  UPLOAD_IMAGE: '/api/v1/upload/image',
  GET_IMAGE: (key: string) => `/api/v1/upload/image/${key}`,
  DELETE_IMAGE: (key: string) => `/api/v1/upload/image/${key}`,
} as const;
