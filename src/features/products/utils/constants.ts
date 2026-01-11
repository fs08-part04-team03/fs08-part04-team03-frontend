/**
 * Products feature 관련 상수
 */

// 페이지네이션 설정
export const PRODUCT_LIST_ITEMS_PER_PAGE = {
  MOBILE: 4,
  TABLET: 6,
  DESKTOP: 9,
} as const;

// 반응형 브레이크포인트
export const PRODUCT_LIST_BREAKPOINTS = {
  TABLET: '(min-width: 768px)',
  DESKTOP: '(min-width: 1024px)',
} as const;

// UI 스타일
export const PRODUCT_LIST_STYLES = {
  BUTTON: {
    BASE: 'flex items-center justify-center gap-6',
    HEIGHT: 'h-56 tablet:h-44',
    PADDING: 'px-16',
    ROUNDED: 'rounded-4',
    BACKGROUND: 'bg-[#222]',
    TEXT: 'text-white',
    FONT: 'font-semibold text-[14px] tracking--0.35',
    SHADOW: 'shadow-[0_4px_6px_rgba(0,0,0,0.02)]',
    BACKDROP: 'backdrop-blur-[15px]',
    CURSOR: 'cursor-pointer',
  },
  GRID: {
    BASE: 'grid',
    COLUMNS: 'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
    GAP_X: 'desktop:gap-x-40 tablet:gap-x-14 gap-x-16',
    GAP_Y: 'desktop:gap-y-60 tablet:gap-y-50 gap-y-40',
  },
} as const;

// 레이아웃 너비
export const PRODUCT_LIST_LAYOUT = {
  MOBILE_WIDTH: 'mobile:w-325',
  TABLET_WIDTH: 'tablet:w-180',
  CONTENT_MOBILE: 'mobile:w-325',
  CONTENT_TABLET: 'tablet:w-496',
  CONTENT_DESKTOP: 'desktop:w-1180',
  SEARCH_MOBILE: 'w-full',
  SEARCH_TABLET: 'tablet:w-320',
  SEARCH_DESKTOP: 'desktop:w-366',
} as const;

// 빈 상태 메시지
export const PRODUCT_LIST_EMPTY = {
  TITLE: '등록된 상품이 없습니다',
  DESCRIPTION: '상품을 등록하면\n여기에 표시됩니다.',
  BUTTON_TEXT: '상품 등록',
} as const;

// 검색바 설정
export const PRODUCT_LIST_SEARCH = {
  PLACEHOLDER: '상품명으로 검색하세요',
} as const;

// 빈 상태 높이
export const PRODUCT_LIST_EMPTY_HEIGHT = {
  MOBILE: 'h-522',
  TABLET: 'h-604',
  DESKTOP: 'h-938',
} as const;
