'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams, usePathname } from 'next/navigation';
import ProductListTem from '@/features/products/template/ProductListTem/ProductListTem';
import { CATEGORY_SECTIONS, BREADCRUMB_ITEMS, ERROR_MESSAGES } from '@/constants';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import {
  mapBackendProductToTemplate,
  type TemplateProduct,
} from '@/features/products/utils/product.utils';
import { useProducts } from '@/features/products/queries/product.queries';
import { productKeys } from '@/features/products/queries/product.keys';
import { useWishlist } from '@/features/wishlist/queries/wishlist.queries';
import { getChildById } from '@/constants/categories/categories.utils';
import { useProductNavigation } from '@/features/products/handlers/useProductNavigation';
import { PRODUCT_SORT_OPTIONS, DEFAULT_PRODUCT_SORT } from '@/features/products/constants/options';

const ProductListSection = ({ companyId }: { companyId: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const pathnameRef = useRef<string | null>(null);

  // 핸들러 훅 사용
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

  const { data, isLoading, error, refetch } = useProducts({
    categoryId: selectedCategoryId,
    sort: selectedSort.key,
    searchQuery,
    enabled: !!companyId,
  });

  // breadcrumb에서 "상품" 클릭 시 같은 경로로 이동할 때 refetch
  // URL 전체(경로 + 쿼리) 변경을 감지하여 페이지 진입 시마다 최신 데이터 가져오기
  useEffect(() => {
    if (!pathname) return undefined;

    // 상품 리스트 페이지 경로인지 확인
    const isProductListPage = pathname.includes('/products') && !pathname.includes('/products/');

    if (isProductListPage) {
      // 현재 URL 전체를 문자열로 생성 (경로 + 쿼리 파라미터)
      const currentUrl = `${pathname}?${searchParams?.toString() || ''}`;

      // 이전 URL과 다르거나 처음 마운트된 경우 refetch
      if (pathnameRef.current !== currentUrl) {
        pathnameRef.current = currentUrl;
        // 약간의 지연을 두어 라우팅 완료 후 refetch
        const timeoutId = setTimeout(() => {
          refetch().catch(() => {
            // 에러는 무시 (백그라운드 작업)
          });
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
    return undefined;
  }, [pathname, searchParams, refetch]);

  // 상품 등록 성공 핸들러
  // Note: 상품 등록 후 캐시를 무효화하여 새로 등록된 상품이 즉시 표시되도록 함
  const handleProductRegister = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: productKeys.all }).catch(() => {
      // 에러는 무시 (백그라운드 작업)
    });
  }, [queryClient]);

  // 위시리스트 목록 조회
  const { data: wishlistData } = useWishlist();

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
        onChangeCategory={navigation.handleCategoryChange}
        breadcrumbItems={breadcrumbItems}
        sortOptions={PRODUCT_SORT_OPTIONS}
        selectedSort={selectedSort}
        onChangeSort={setSelectedSort}
        products={isLoading ? [] : products}
        companyId={companyId}
        wishlistData={wishlistData}
        isLoading={isLoading}
        searchQuery={searchQuery}
        onSearch={navigation.handleSearch}
        onProductClick={navigation.goToProductDetail}
        onProductRegister={handleProductRegister}
      />
    </div>
  );
};

export default ProductListSection;
