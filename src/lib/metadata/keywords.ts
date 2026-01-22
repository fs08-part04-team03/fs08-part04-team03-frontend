/**
 * 페이지별 SEO 키워드 상수
 *
 * @example
 * import { PAGE_KEYWORDS } from '@/lib/metadata/keywords';
 *
 * buildPageMetadata({
 *   title: '상품 목록',
 *   description: '다양한 간식을 확인하세요.',
 *   keywords: PAGE_KEYWORDS.products,
 * });
 */
export const PAGE_KEYWORDS = {
  /** 상품 목록 페이지 */
  products: ['간식', '음료', '스낵', '사내 복지', '구매', '상품 목록', 'B2B', '회사 간식'],

  /** 상품 상세 페이지 */
  productDetail: ['간식', '상품 상세', '가격', '구매', '장바구니', '위시리스트'],

  /** 장바구니 페이지 */
  cart: ['장바구니', '구매', '주문', '간식 주문', '구매 요청'],

  /** 위시리스트 페이지 */
  wishlist: ['위시리스트', '찜', '관심 상품', '좋아요', '찜 목록'],

  /** 구매 요청 페이지 */
  purchaseRequest: ['구매 요청', '승인', '결재', '요청 목록', '구매 승인'],

  /** 구매 내역 페이지 */
  purchaseHistory: ['구매 내역', '주문 내역', '이력', '구매 기록', '주문 기록'],

  /** 프로필 페이지 */
  profile: ['프로필', '내 정보', '계정 설정', '회원 정보'],

  /** 관리자 대시보드 */
  dashboard: ['대시보드', '관리자', '통계', '분석', '예산 관리'],

  /** 회원 관리 페이지 */
  users: ['회원 관리', '사용자 관리', '권한 관리', '멤버', '팀원', '관리자'],

  /** 예산 관리 페이지 */
  budget: ['예산 관리', '예산 설정', '비용 관리', '지출', '예산 한도'],

  /** 인증 (로그인/회원가입) */
  auth: ['로그인', '회원가입', '계정', 'B2B', '기업 회원'],
} as const;

/**
 * 키워드 배열을 합치는 유틸리티
 *
 * @example
 * combineKeywords(PAGE_KEYWORDS.products, PAGE_KEYWORDS.cart);
 */
export function combineKeywords(...keywordArrays: (readonly string[])[]): string[] {
  const combined = new Set<string>();
  keywordArrays.forEach((arr) => arr.forEach((k) => combined.add(k)));
  return Array.from(combined);
}
