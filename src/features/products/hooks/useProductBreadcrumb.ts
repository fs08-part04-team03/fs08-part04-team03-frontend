import { useMemo } from 'react';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import type { CategoryPanelSection } from '@/components/organisms/CategoryPanel/CategoryPanel';
import { BREADCRUMB_ITEMS } from '@/constants';

/**
 * 상품 목록 breadcrumb을 동적으로 생성하는 훅
 * 카테고리 선택 시에도 맨 앞에 "상품" breadcrumb을 추가하여 필터링 없는 상품 페이지로 이동 가능
 * 대분류는 클릭 불가 (href 없음)
 */
export const useProductBreadcrumb = (
  companyId: string,
  selectedCategoryId: number | null | undefined,
  categorySections: CategoryPanelSection[],
  defaultBreadcrumbItems: BreadcrumbItem[]
): BreadcrumbItem[] => {
  const breadcrumbForRender = useMemo<BreadcrumbItem[]>(() => {
    // "상품" breadcrumb 항목 생성 (필터링 없는 상품 페이지로 이동)
    const productsBreadcrumb: BreadcrumbItem = {
      label: BREADCRUMB_ITEMS.PRODUCTS.label,
      href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
    };

    if (selectedCategoryId == null) return defaultBreadcrumbItems;

    const matchedSection = categorySections.find((section) =>
      section.options.some((opt) => opt.value === selectedCategoryId)
    );

    if (!matchedSection) return defaultBreadcrumbItems;

    const matchedOption = matchedSection.options.find((opt) => opt.value === selectedCategoryId);

    if (!matchedOption) return defaultBreadcrumbItems;

    // "상품" > "대분류" > "소분류" 형식으로 breadcrumb 구성
    // 대분류는 클릭 불가 (href 없음)
    return [
      productsBreadcrumb, // 맨 앞에 "상품" 추가
      { label: matchedSection.title }, // 대분류는 클릭 불가
      { label: matchedOption.label },
    ];
  }, [selectedCategoryId, categorySections, defaultBreadcrumbItems, companyId]);

  return breadcrumbForRender;
};
