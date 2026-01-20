/**
 * 레이아웃 스페이싱 토큰
 * 반응형 여백을 일관되게 관리하기 위한 유틸리티
 */

/** 섹션 상단 마진 (mt) */
export const SECTION_MARGIN_TOP = 'mt-30 tablet:mt-40 desktop:mt-80';

/** 섹션 하단 마진 (mb) */
export const SECTION_MARGIN_BOTTOM = 'mb-20';

/** 페이지 상단 패딩 (pt) */
export const PAGE_PADDING_TOP = 'pt-30 tablet:pt-40 desktop:pt-80';

/** 페이지 하단 패딩 (pb) */
export const PAGE_PADDING_BOTTOM = 'pb-20';

/**
 * 레이아웃 스페이싱 객체
 * 확장 가능한 구조
 */
export const LAYOUT_SPACING = {
  section: {
    marginTop: SECTION_MARGIN_TOP,
    marginBottom: SECTION_MARGIN_BOTTOM,
  },
  page: {
    paddingTop: PAGE_PADDING_TOP,
    paddingBottom: PAGE_PADDING_BOTTOM,
  },
  /** 카드 간격 */
  card: {
    gap: 'gap-10 tablet:gap-20 desktop:gap-30',
    marginBottom: 'mb-10 tablet:mb-20 desktop:mb-30',
  },
} as const;
