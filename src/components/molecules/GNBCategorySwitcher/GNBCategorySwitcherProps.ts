/**
 * GNBCategorySwitcherProps
 *
 * 모바일 GNB 상단에서 노출되는 "대분류 카테고리 선택 드롭다운" 컴포넌트의 Props 정의.
 * ProductListPage, ProductDetailPage, WishlistPage 등
 * 유저 도메인의 여러 페이지에서 재사용한다.
 */

import type { ParentCategoryKey, ParentCategoryOption, CategorySection } from '@/constants';

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
   * 대분류별 소분류 카테고리 섹션
   * 예: [{ id: 2, title: '음료', options: [{ value: 201, label: '탄산음료' }, ...] }]
   */
  categorySections?: CategorySection[];

  /**
   * ParentCategoryKey -> CategorySection.id(number) 매핑
   *
   * ParentCategoryKey는 문자열 키('drink')이고,
   * categorySections의 id는 number(2)인 구조이므로
   * "대분류 클릭 시 해당 섹션의 첫 소분류로 이동" UX를 구현하려면 매핑이 필요합니다.
   *
   * 예: { drink: 2, snack: 1 }
   */
  sectionIdByParentKey?: Partial<Record<ParentCategoryKey, number>>;

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
   * 소분류 카테고리 선택 시 호출되는 콜백 (선택 사항)
   */
  onSubCategoryChange?: (subCategoryId: number) => void;

  /**
   * 추가 스타일링용 className
   * (모바일 전용 노출: 'mobile:flex tablet:hidden' 과 함께 사용 가능)
   */
  className?: string;
}
