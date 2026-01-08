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
import { useAuthStore } from '@/lib/store/authStore';
import { getAllProducts } from '@/features/products/api/products.api';
import { getWishlist } from '@/features/wishlist/api/wishlist.api';
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
  const { accessToken } = useAuthStore();
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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', selectedCategoryId, selectedSort.key, searchQuery],
    queryFn: async () => {
      // 초기 진입 시 categoryId가 null이면 필터링 없이 전체 상품 조회
      const result = await getAllProducts({
        sort: selectedSort.key,
        categoryId: selectedCategoryId, // null이면 쿼리 파라미터에 포함되지 않음
        accessToken,
        q: searchQuery,
      });
      return result;
    },
    staleTime: 0, // 캐시 없이 항상 최신 데이터 가져오기
    enabled: !!companyId, // companyId가 있을 때만 쿼리 실행
    refetchOnMount: 'always', // ✅ 마운트 시 항상 refetch (어떤 경로에서 와도)
    refetchOnWindowFocus: true, // ✅ 윈도우 포커스 시 refetch
  });

  // 컴포넌트가 마운트되거나 경로가 변경될 때마다 강제로 refetch
  // GNB에서 상품 페이지로 이동하거나 새로고침할 때 항상 최신 데이터를 보장
  useEffect(() => {
    if (!companyId || !pathname?.includes('/products')) {
      return;
    }

    // 모든 products 쿼리를 무효화하고 현재 쿼리만 refetch
    // 이렇게 하면 GNB에서 상품 페이지로 이동할 때도 항상 최신 데이터를 가져옵니다
    queryClient.invalidateQueries({ queryKey: ['products'] }).catch(() => {
      // 에러는 무시 (이미 useQuery에서 처리됨)
    });

    // 현재 쿼리 파라미터에 맞는 쿼리만 refetch
    refetch().catch(() => {
      // 에러는 무시 (이미 useQuery에서 처리됨)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId, pathname]); // pathname 변경만 감지 (queryKey 변경은 useQuery가 자동 처리)

  // 위시리스트 목록 조회
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
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
