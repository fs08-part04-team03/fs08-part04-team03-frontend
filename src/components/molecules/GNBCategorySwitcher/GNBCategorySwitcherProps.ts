/**
 * GNBCategorySwitcherProps
 *
 * 모바일 GNB 상단에서 노출되는 "대분류 카테고리 선택 드롭다운" 컴포넌트의 Props 정의.
 * ProductListPage, ProductDetailPage, WishlistPage 등
 * 유저 도메인의 여러 페이지에서 재사용한다.
 */

import type { ParentCategoryKey, ParentCategoryOption } from '@/constants'; // or '@/domains/category'

/**
 * CategoryOption
 *
 * 카테고리 도메인에서 정의한 ParentCategoryOption을 그대로 재사용한다.
 * (id: 'snack' | 'drink' | ..., label: '스낵' | '음료' | ...)
 */
export type CategoryOption = ParentCategoryOption;

export interface GNBCategorySwitcherProps {
  /**
   * 대분류 카테고리 리스트
   * 예: [{ id: 'drink', label: '음료' }]
   */
  categories: CategoryOption[];

  /**
   * 현재 선택된 카테고리 ID
   * 예: "drink"
   */
  activeCategoryId: ParentCategoryKey;

  /**
   * 상품의 대분류 ID (상품 상세 페이지에서 사용)
   * 이 값이 있으면 activeCategoryId보다 우선적으로 표시됩니다.
   * 예: "drink"
   */
  productCategoryId?: ParentCategoryKey;

  /**
   * 카테고리 변경 시 호출되는 콜백
   * 카테고리 클릭 → 부모(GNB 또는 페이지)에서 URL 업데이트 or 상태 업데이트 처리
   */
  onCategoryChange: (id: ParentCategoryKey) => void;

  /**
   * 추가 스타일링용 className
   * (모바일 전용 노출: 'mobile:flex tablet:hidden' 과 함께 사용 가능)
   */
  className?: string;
}
