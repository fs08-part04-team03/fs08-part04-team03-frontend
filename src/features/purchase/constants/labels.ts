import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

/**
 * Purchase 도메인 라벨 상수
 */

// 구매 요청 상태 라벨
export const PURCHASE_REQUEST_STATUS_LABEL: Record<PurchaseRequestItem['status'], string> = {
  PENDING: '대기중',
  APPROVED: '요청 승인',
  REJECTED: '구매 반려',
  CANCELLED: '요청 취소',
};

// 텍스트 라벨
export const PURCHASE_LABELS: {
  TITLE: string;
  SORT_PLACEHOLDER: string;
  TABLE_HEADERS: {
    DATE: string;
    PRODUCT: string;
    PRICE: string;
    REQUESTER: string;
    STATUS: string;
    ACTIONS: string;
  };
  BUTTONS: {
    REJECT: string;
    APPROVE: string;
    APPROVE_ACTION: string;
    REJECT_ACTION: string;
    CANCEL: string;
    NAVIGATE_TO_PRODUCTS: string;
    ADD_TO_CART: string;
    ADDING_TO_CART: string;
    GO_TO_LIST: string;
    BACK_TO_LIST: string;
  };
} = {
  TITLE: '구매 요청 내역',
  SORT_PLACEHOLDER: '최신순',
  TABLE_HEADERS: {
    DATE: '구매 요청일',
    PRODUCT: '상품 정보',
    PRICE: '주문 금액',
    REQUESTER: '요청인',
    STATUS: '상태',
    ACTIONS: '비고',
  },
  BUTTONS: {
    REJECT: '반려',
    APPROVE: '승인',
    APPROVE_ACTION: '요청 승인',
    REJECT_ACTION: '요청 반려',
    CANCEL: '요청 취소',
    NAVIGATE_TO_PRODUCTS: '상품 리스트로 이동',
    ADD_TO_CART: '장바구니 다시 담기',
    ADDING_TO_CART: '담는 중...',
    GO_TO_LIST: '목록 보기',
    BACK_TO_LIST: '구매 요청 목록으로 돌아가기',
  },
};
