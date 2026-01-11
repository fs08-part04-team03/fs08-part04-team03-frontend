import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

/**
 * Purchase API 관련 상수
 */

// API 경로
export const PURCHASE_API_PATHS = {
  // 관리자 API
  ADMIN_GET_ALL_PURCHASES: '/api/v1/purchase/admin/getAllPurchases',
  ADMIN_PURCHASE_NOW: '/api/v1/purchase/admin/purchaseNow',
  ADMIN_MANAGE_PURCHASE_REQUESTS: '/api/v1/purchase/admin/managePurchaseRequests',
  ADMIN_GET_PURCHASE_REQUEST_DETAIL: '/api/v1/purchase/admin/getPurchaseRequestDetail',
  ADMIN_APPROVE_PURCHASE_REQUEST: '/api/v1/purchase/admin/approvePurchaseRequest',
  ADMIN_REJECT_PURCHASE_REQUEST: '/api/v1/purchase/admin/rejectPurchaseRequest',
  ADMIN_EXPENSE_STATISTICS: '/api/v1/purchase/admin/expenseStatistics',
  ADMIN_PURCHASE_DASHBOARD: '/api/v1/purchase/admin/purchaseDashboard',

  // 사용자 API
  USER_GET_MY_PURCHASES: '/api/v1/purchase/user/getMyPurchases',
  USER_GET_MY_PURCHASE_DETAIL: '/api/v1/purchase/user/getMyPurchaseDetail',
  USER_REQUEST_PURCHASE: '/api/v1/purchase/user/requestPurchase',
  USER_URGENT_REQUEST_PURCHASE: '/api/v1/purchase/user/urgentRequestPurchase',
  USER_CANCEL_PURCHASE_REQUEST: '/api/v1/purchase/user/cancelPurchaseRequest',
} as const;

// 예산 API 경로
export const BUDGET_API_PATHS = {
  GET_BUDGET: '/api/v1/budget',
} as const;

// 구매 요청 상태 라벨
export const PURCHASE_REQUEST_STATUS_LABEL: Record<PurchaseRequestItem['status'], string> = {
  PENDING: '대기중',
  APPROVED: '요청 승인',
  REJECTED: '구매 반려',
  CANCELLED: '요청 취소',
};

/**
 * Purchase UI 관련 상수
 */

// 기본값
export const PURCHASE_DEFAULTS = {
  BUDGET: 2000000,
  DISPLAY_ITEM_COUNT: 6,
  SKELETON_ROWS: 6,
} as const;

// 테이블 스타일
export const PURCHASE_TABLE_STYLES = {
  CELL_BASE: {
    HEADER: 'text-left text-gray-700 text-14 font-bold shrink-0 py-20 pl-20',
    CELL: 'shrink-0 text-left py-20 pl-20',
  },
  COLUMN_WIDTHS: {
    DATE: 'tablet:w-100 desktop:w-140',
    PRODUCT: 'tablet:w-200 desktop:flex-1',
    PRICE: 'tablet:w-100 desktop:w-140',
    REQUESTER: 'tablet:w-100 desktop:w-140',
    STATUS: 'tablet:w-100 desktop:w-140',
    ACTIONS: 'tablet:w-140 desktop:w-180 desktop:max-w-180',
  },
} as const;

// 버튼 스타일
export const PURCHASE_BUTTON_STYLES = {
  ACTION_BUTTON: 'w-60 py-8 px-0 text-10!',
} as const;

// 간격
export const PURCHASE_SPACING = {
  GAP_SMALL: 'gap-8',
  GAP_MEDIUM: 'gap-12',
} as const;

// 높이
export const PURCHASE_HEIGHTS = {
  TABLE_HEADER: 'h-60',
  TABLE_ROW: 'h-100',
} as const;

// 패딩
export const PURCHASE_PADDING = {
  CELL_Y: 'py-20',
  CELL_X: 'pl-20',
} as const;

// 텍스트 크기
export const PURCHASE_TEXT_SIZES = {
  SMALL: 'text-14',
  MEDIUM: 'text-18',
} as const;

// 마진
export const PURCHASE_MARGINS = {
  EMPTY_STATE_TOP: 'mt-200',
} as const;

// 아이템 리스트 스타일
export const PURCHASE_ITEM_LIST_STYLES = {
  ROW: {
    MOBILE: {
      BASE: 'flex flex-col w-full py-16 border-b border-gray-200 gap-12',
      URGENT: 'bg-red-100',
      HOVER: 'cursor-pointer hover:bg-gray-50',
    },
    DESKTOP: {
      BASE: 'flex items-center w-full border-b border-gray-200',
      GAP: 'gap-16 tablet:gap-24 desktop:gap-32',
      URGENT: 'bg-red-100',
      HOVER: 'cursor-pointer hover:bg-gray-50',
    },
  },
  CELL: {
    TEXT: 'text-gray-700 text-14',
    BOLD: 'font-bold',
    NORMAL: 'font-normal',
    DATE: {
      BASE: 'text-gray-700 text-14 font-bold shrink-0',
      MOBILE: '',
      TABLET: 'tablet:w-100',
      DESKTOP: 'desktop:w-180 py-20 tablet:px-0 desktop:px-40',
    },
    PRODUCT: {
      BASE: 'text-gray-700 text-14 shrink-0',
      MOBILE: 'flex-1 min-w-0',
      TABLET: 'tablet:w-140',
      DESKTOP: 'desktop:w-260 min-w-0 py-20 tablet:px-0 desktop:px-40',
    },
    PRICE: {
      BASE: 'shrink-0 text-left',
      TABLET: 'tablet:w-100',
      DESKTOP: 'desktop:w-180 py-20 tablet:px-0 desktop:px-40',
    },
    ACTIONS: {
      BASE: 'shrink-0 text-left',
      TABLET: 'tablet:w-100',
      DESKTOP: 'desktop:w-180 py-20 tablet:px-0 desktop:px-40',
    },
  },
  BUTTON: {
    MOBILE: 'flex-1 h-40 tablet:w-auto tablet:h-44 text-10!',
    DESKTOP: 'h-44 w-126',
  },
  LINK: {
    HOVER: 'cursor-pointer hover:underline hover:text-primary-500',
  },
} as const;

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
  };
  MESSAGES: {
    COMPANY_NOT_SELECTED: string;
    NO_ITEMS_TO_ADD: string;
    ADD_TO_CART_SUCCESS: string;
    ADD_TO_CART_FAILED: string;
    ADD_TO_CART_PARTIAL: (count: number) => string;
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
  },
  MESSAGES: {
    COMPANY_NOT_SELECTED: '회사가 선택되지 않았습니다.',
    NO_ITEMS_TO_ADD: '담을 상품이 없습니다.',
    ADD_TO_CART_SUCCESS: '장바구니에 상품을 담았습니다.',
    ADD_TO_CART_FAILED: '장바구니 담기에 실패했습니다.',
    ADD_TO_CART_PARTIAL: (count: number) =>
      `${count}개 상품만 담겼습니다. 일부 상품 추가에 실패했습니다.`,
  },
};

// 타이머 상수
export const PURCHASE_TIMERS: {
  TOAST_DURATION: number;
  CART_REDIRECT_DELAY: number;
} = {
  TOAST_DURATION: 3000,
  CART_REDIRECT_DELAY: 1000,
};

// 빈 상태 메시지
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

// 결과 메시지
export const PURCHASE_RESULT_MESSAGES = {
  APPROVED: '승인되었습니다.',
} as const;
