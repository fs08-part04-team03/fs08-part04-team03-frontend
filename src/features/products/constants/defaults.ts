/**
 * Products 도메인 기본값 상수
 */

export const PRODUCT_DEFAULTS = {
  PAGE_SIZE: {
    MOBILE: 4,
    TABLET: 6,
    DESKTOP: 9,
    REGISTERED_MOBILE: 4,
    REGISTERED_DESKTOP: 6,
  },
  INITIAL_PAGE: 1,
  INITIAL_SORT: 'latest',
  IMAGE_REFRESH_INITIAL: 0,
} as const;
