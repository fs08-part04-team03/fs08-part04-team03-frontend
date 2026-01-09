'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import ProductListTem from '@/features/products/template/ProductListTem/ProductListTem';
import { CATEGORY_SECTIONS, BREADCRUMB_ITEMS, ERROR_MESSAGES } from '@/constants';
import { Option } from '@/components/atoms/DropDown/DropDown';
import {
  mapBackendProductToTemplate,
  type TemplateProduct,
} from '@/features/products/utils/product.utils';
import { useProducts } from '@/features/products/queries/product.queries';
import { productKeys } from '@/features/products/queries/product.keys';
import { getWishlist } from '@/features/wishlist/api/wishlist.api';
import { STALE_TIME } from '@/constants/staleTime';
import { getChildById } from '@/constants/categories/categories.utils';

const SORT_OPTIONS: Option[] = [
  { key: 'latest', label: '최신순' },
  { key: 'sell', label: '판매량순' },
  { key: 'price-asc', label: '가격 낮은순' },
  { key: 'price-desc', label: '가격 높은순' },
];

const ProductListSection = ({ companyId }: { companyId: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  // URL 쿼리 파라미터에서 categoryId, q 읽기
  const categoryIdFromUrl = useMemo(() => {
    const param = searchParams?.get('categoryId');
    return param ? Number.parseInt(param, 10) : null;
  }, [searchParams]);

  const searchQueryFromUrl = searchParams?.get('q') || '';

  // URL에서 초기값 설정 (딥 링킹 지원)
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(categoryIdFromUrl);
  const [searchQuery, setSearchQuery] = useState(searchQueryFromUrl);
  const [selectedSort, setSelectedSort] = useState<Option>({
    key: 'latest',
    label: '최신순',
  });

  // URL 쿼리 파라미터가 변경되면 state 동기화
  useEffect(() => {
    setSelectedCategoryId(categoryIdFromUrl);
    setSearchQuery(searchQueryFromUrl);
  }, [categoryIdFromUrl, searchQueryFromUrl]);

  // 카테고리 변경 핸들러 - URL 쿼리 파라미터 업데이트
  const handleCategoryChange = (categoryId: number | null) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (categoryId === null) {
      params.delete('categoryId');
    } else {
      params.set('categoryId', String(categoryId));
    }

    // 카테고리 변경 시 검색어 초기화
    params.delete('q');

    const newUrl = `/${companyId}/products${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  };

  // 검색 핸들러
  const handleSearch = useCallback(
    (query: string) => {
      const currentQuery = searchParams?.get('q') || '';
      if (currentQuery === query) return;

      const params = new URLSearchParams(searchParams?.toString() || '');
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      const newUrl = `/${companyId}/products${params.toString() ? `?${params.toString()}` : ''}`;
      router.push(newUrl);
    },
    [companyId, router, searchParams]
  );

  const { data, isLoading, error } = useProducts({
    categoryId: selectedCategoryId,
    sort: selectedSort.key,
    searchQuery,
    enabled: !!companyId,
  });

  // 상품 페이지 진입 시 모든 products 쿼리를 무효화하여 최신 데이터 보장
  // invalidateQueries는 활성 쿼리를 자동으로 refetch하므로 수동 refetch 불필요
  useEffect(() => {
    if (!companyId || !pathname?.includes('/products')) {
      return;
    }

    // 상품 페이지 진입 시 모든 products 쿼리를 무효화하여 최신 데이터 보장
    // invalidateQueries는 활성 쿼리를 자동으로 refetch하므로 수동 refetch 불필요
    // eslint-disable-next-line no-void
    void queryClient.invalidateQueries({ queryKey: productKeys.all });
  }, [companyId, pathname, queryClient]);

  // 위시리스트 목록 조회
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
  });

  const products: TemplateProduct[] = useMemo(() => {
    if (!data) return [];
    return data.data.map(mapBackendProductToTemplate);
  }, [data]);

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
      label: BREADCRUMB_ITEMS.HOME.label,
      href: BREADCRUMB_ITEMS.HOME.href(companyId),
    },
    {
      label: BREADCRUMB_ITEMS.PRODUCTS.label,
      href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
    },
  ];

  // 에러 발생 시
  if (error) {
    return (
      <div className="mt-12 md:mt-20 flex items-center justify-center min-h-screen">
        <p className="text-red-600">{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  return (
    <div className="mt-12 md:mt-20">
      <ProductListTem
        categorySections={CATEGORY_SECTIONS}
        activeSectionId={activeSectionId}
        selectedCategoryId={selectedCategoryId}
        onChangeCategory={handleCategoryChange}
        breadcrumbItems={breadcrumbItems}
        sortOptions={SORT_OPTIONS}
        selectedSort={selectedSort}
        onChangeSort={setSelectedSort}
        products={isLoading ? [] : products}
        companyId={companyId}
        wishlistData={wishlistData}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default ProductListSection;
