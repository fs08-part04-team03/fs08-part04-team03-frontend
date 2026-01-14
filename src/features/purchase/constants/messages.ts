/**
 * Purchase 도메인 메시지 상수
 */

export const PURCHASE_MESSAGES = {
  COMPANY_NOT_SELECTED: '회사가 선택되지 않았습니다.',
  NO_ITEMS_TO_ADD: '담을 상품이 없습니다.',
  ADD_TO_CART_SUCCESS: '장바구니에 상품을 담았습니다.',
  ADD_TO_CART_FAILED: '장바구니 담기에 실패했습니다.',
  ADD_TO_CART_PARTIAL: (count: number) =>
    `${count}개 상품만 담겼습니다. 일부 상품 추가에 실패했습니다.`,
  BUDGET_REQUEST_NOT_AVAILABLE: '예산 증액 요청 기능은 준비 중입니다.',
  COMPANY_NOT_FOUND: '회사 정보를 찾을 수 없습니다.',
} as const;

export const PURCHASE_EMPTY_MESSAGES = {
  ADMIN_NO_REQUESTS: {
    TITLE: '요청 내역이 없어요',
    DESCRIPTION: '상품 리스트를 둘러보고\n상품을 담아보세요',
  },
  USER_NO_REQUESTS: {
    TITLE: '구매 요청한 내역이 없어요',
    DESCRIPTION: '상품 리스트를 둘러보고\n관리자에게 요청해보세요',
  },
} as const;

export const PURCHASE_RESULT_MESSAGES = {
  APPROVED: '승인되었습니다.',
} as const;
