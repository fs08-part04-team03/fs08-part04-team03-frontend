/**
 * Purchase History 도메인 라벨 상수
 */

export const PURCHASE_HISTORY_LABELS = {
  PAGE_TITLE: '구매 내역 확인',
  SORT_PLACEHOLDER: '정렬',
  TABLE_HEADERS: {
    REQUEST_DATE: '구매 요청일',
    REQUESTER: '요청인',
    PRODUCTS: '구매 물품',
    TOTAL_PRICE: '총 금액',
    APPROVAL_DATE: '구매 승인일',
    MANAGER: '담당자',
  },
  ROW_LABELS: {
    REQUEST_DATE: '구매 요청일',
    REQUESTER: '요청인',
    APPROVAL_DATE: '구매 승인일',
    MANAGER: '담당자',
    TOTAL_QUANTITY: '총수량',
    TOTAL_QUANTITY_DESKTOP: '총 수량',
  },
  QUANTITY_UNIT: '개',
  TITLE: '구매 내역 확인',
  BACK_TO_LIST: '구매 내역 목록으로 돌아가기',
} as const;
