/**
 * Products 도메인 메시지 상수
 */

export const PRODUCT_MESSAGES = {
  SUCCESS: {
    UPDATE: '상품이 수정되었습니다.',
    DELETE: '상품이 삭제되었습니다.',
    ADD_TO_CART: '장바구니에 상품이 추가되었습니다.',
    REGISTER: '상품이 등록되었습니다.',
  },
  ERROR: {
    UPDATE: '상품 수정에 실패했습니다.',
    DELETE: '상품 삭제에 실패했습니다.',
    FETCH_PRODUCT: '상품 정보를 불러올 수 없습니다.',
    ADD_TO_CART: '나중에 다시 시도해주세요.',
    REGISTER: '상품 등록에 실패했습니다.',
  },
  EMPTY: {
    NO_PRODUCTS: {
      TITLE: '등록된 상품이 없습니다',
      DESCRIPTION: '상품을 등록하면\n여기에 표시됩니다.',
    },
    NO_MY_PRODUCTS: {
      TITLE: '등록한 상품이 없습니다',
      DESCRIPTION: '상품을 등록하면\n여기에 표시됩니다.',
    },
  },
  MODAL: {
    CART_ADD_FAILED_DESCRIPTION: '나중에 다시 시도해주세요.',
    CART_ADD_SUCCESS_DESCRIPTION: '장바구니에 상품이 추가되었습니다.',
  },
} as const;
