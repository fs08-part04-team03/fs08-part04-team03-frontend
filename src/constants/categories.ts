/**
 * CategoryPanel용 카테고리 상수
 * @/domains/category의 데이터를 기반으로 CategoryPanel에서 사용할 수 있는 형태로 변환
 */

import { PARENT_CATEGORIES, getChildrenByParentId } from '@/domains/category';

export interface CategoryOption {
  value: number; // ChildCategory의 id (숫자) - breadcrumb과 동일하게
  label: string;
  count?: number;
  key?: string; // ChildCategory의 key (참조용)
}

export interface CategorySection {
  id: number; // ParentCategory의 id (숫자) - breadcrumb과 동일하게
  title: string;
  key?: string; // ParentCategory의 key (참조용)
  icon?: React.ReactNode;
  description?: React.ReactNode;
  options: CategoryOption[];
}

/**
 * @/domains/category의 데이터를 CategoryPanel 형식으로 변환
 * breadcrumb과 동일하게 숫자 ID를 사용하여 동일하게 작동
 */
export const CATEGORY_SECTIONS: CategorySection[] = PARENT_CATEGORIES.map((parent) => {
  const children = getChildrenByParentId(parent.id);
  return {
    id: parent.id, // ParentCategory의 id를 사용 (breadcrumb과 동일)
    key: parent.key, // 참조용
    title: parent.name,
    options: children.map((child) => ({
      value: child.id, // ChildCategory의 id를 사용 (breadcrumb과 동일)
      key: child.key, // 참조용
      label: child.name,
    })),
  };
});

/**
 * 카테고리 ID로 라벨 찾기 (breadcrumb과 동일)
 * @param categoryId ParentCategory의 id
 * @returns 카테고리 라벨
 */
export const getCategoryLabelById = (categoryId: number): string | undefined => {
  const category = CATEGORY_SECTIONS.find((section) => section.id === categoryId);
  return category?.title;
};

/**
 * 서브 카테고리 ID로 라벨 찾기 (breadcrumb과 동일)
 * @param subCategoryId ChildCategory의 id
 * @returns 서브 카테고리 라벨
 */
export const getSubCategoryLabelById = (subCategoryId: number): string | undefined => {
  const section = CATEGORY_SECTIONS.find((s) =>
    s.options.some((opt) => opt.value === subCategoryId)
  );
  return section?.options.find((opt) => opt.value === subCategoryId)?.label;
};
