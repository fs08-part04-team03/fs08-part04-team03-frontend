/**
 * Purchase History 도메인 메시지 상수
 */

export const PURCHASE_HISTORY_MESSAGES = {
  EMPTY: {
    TITLE: '구매 내역이 없어요',
    DESCRIPTION: '구매 요청을 승인하고\n상품을 주문해 보세요',
    BUTTON_TEXT: '상품으로 이동',
  },
  ERROR: {
    NOT_FOUND: '구매 내역을 찾을 수 없습니다.',
    FETCH_ERROR: '구매 내역을 불러오는 중 오류가 발생했습니다.',
  },
  LOADING: {
    DEFAULT: '로딩 중...',
  },
  RESULT: {
    APPROVED: '구매 요청이 승인되었습니다.',
  },
} as const;
