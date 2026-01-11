/**
 * Purchase 도메인 스타일 상수
 */

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
