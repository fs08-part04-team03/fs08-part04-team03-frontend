/**
 * 상품 목록을 위한 통합 커스텀 훅
 * Props Drilling 개선 - 상태와 핸들러를 그룹화하여 관리
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { CATEGORY_SECTIONS, BREADCRUMB_ITEMS } from '@/constants';
import { getChildById } from '@/constants/categories/categories.utils';
import { useProductNavigation } from '@/features/products/handlers/useProductNavigation';
import { PRODUCT_SORT_OPTIONS, DEFAULT_PRODUCT_SORT } from '@/features/products/constants/options';
import { productKeys } from '@/features/products/queries/product.keys';
import type {
  ProductCategoryState,
  ProductSortSearchState,
  ProductActionHandlers,
} from '@/features/products/types/product-list.types';

interface UseProductListStateParams {
  companyId: string;
}

/**
 * 상품 목록의 모든 상태와 핸들러를 통합 관리하는 훅
 */
export const useProductListState = ({ companyId }: UseProductListStateParams) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const navigation = useProductNavigation(companyId);

  // URL 쿼리 파라미터에서 categoryId, q 읽기
  const categoryIdFromUrl = useMemo(() => {
    const param = searchParams?.get('categoryId');
    return param ? Number.parseInt(param, 10) : null;
  }, [searchParams]);

  const searchQueryFromUrl = searchParams?.get('q') || '';

  // URL에서 초기값 설정 (딥 링킹 지원)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(categoryIdFromUrl);
  const [searchQuery, setSearchQuery] = useState(searchQueryFromUrl);
  const [selectedSort, setSelectedSort] = useState<Option>(DEFAULT_PRODUCT_SORT);

  // URL 쿼리 파라미터가 변경되면 state 동기화
  useEffect(() => {
    setSelectedCategoryId(categoryIdFromUrl);
    setSearchQuery(searchQueryFromUrl);
  }, [categoryIdFromUrl, searchQueryFromUrl]);

  // 상품 등록 성공 핸들러
  const handleProductRegister = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: productKeys.lists() }).catch(() => {
      // 에러는 무시 (백그라운드 작업)
    });
  }, [queryClient]);

  // 선택된 categoryId에서 대분류(ParentCategory) ID 찾기
  const activeSectionId = useMemo(() => {
    if (!selectedCategoryId) return CATEGORY_SECTIONS[0]?.id ?? null;

    const childCategory = getChildById(selectedCategoryId);
    if (childCategory) {
      return childCategory.parentId;
    }

    return CATEGORY_SECTIONS[0]?.id ?? null;
  }, [selectedCategoryId]);

  const breadcrumbItems = [
    {
      label: BREADCRUMB_ITEMS.PRODUCTS.label,
      href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
    },
  ];

  // 카테고리 상태 그룹
  const categoryState: ProductCategoryState = {
    categorySections: CATEGORY_SECTIONS,
    activeSectionId,
    selectedCategoryId,
    onChangeCategory: navigation.handleCategoryChange,
  };

  // 정렬/검색 상태 그룹
  const sortSearchState: ProductSortSearchState = {
    breadcrumbItems,
    sortOptions: PRODUCT_SORT_OPTIONS,
    selectedSort,
    onChangeSort: setSelectedSort,
    searchQuery,
    onSearch: navigation.handleSearch,
  };

  // 상품 액션 핸들러 그룹
  // onProductClick은 ProductCard가 productId를 통해 직접 hook을 사용하므로 제거됨
  const actionHandlers: ProductActionHandlers = {
    onProductRegister: handleProductRegister,
  };

  return {
    // API 호출용 파라미터
    selectedCategoryId,
    selectedSort,
    searchQuery,

    // 그룹화된 상태와 핸들러
    categoryState,
    sortSearchState,
    actionHandlers,
  };
};
