/**
 * 메타데이터 관련 유틸리티 모듈
 *
 * @example
 * import { buildPageMetadata, PAGE_KEYWORDS } from '@/lib/metadata';
 *
 * export const metadata = buildPageMetadata({
 *   title: '상품 목록',
 *   description: '다양한 간식을 확인하세요.',
 *   keywords: PAGE_KEYWORDS.products,
 * });
 */
export { buildPageMetadata, simpleMetadata, fallbackMetadata } from './buildMetadata';
export type { PageMetadataOptions } from './buildMetadata';
export { PAGE_KEYWORDS, combineKeywords } from './keywords';
