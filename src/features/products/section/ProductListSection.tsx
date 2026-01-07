'use client';

import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const { accessToken } = useAuthStore();

  // URL 쿼리 파라미터에서 categoryId 읽기
  const categoryIdFromUrl = useMemo(() => {
    const param = searchParams?.get('categoryId');
    return param ? Number.parseInt(param, 10) : null;
  }, [searchParams]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<Option>({
    key: 'latest',
    label: '최신순',
  });
  const [isInitialized, setIsInitialized] = useState(false);

  // 페이지 마운트 시 URL에서 categoryId 제거 (필터 초기화)
  useEffect(() => {
    if (!isInitialized && searchParams?.has('categoryId')) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('categoryId');
      const newUrl = `/${companyId}/products${params.toString() ? `?${params.toString()}` : ''}`;
      router.replace(newUrl);
      setIsInitialized(true);
    } else if (!isInitialized) {
      setIsInitialized(true);
    }
  }, [isInitialized, searchParams, companyId, router]);

  // URL 쿼리 파라미터가 변경되면 state 동기화 (초기화 후에만)
  // categoryId가 URL에 명시적으로 있을 때만 필터 적용
  useEffect(() => {
    if (isInitialized) {
      setSelectedCategoryId(categoryIdFromUrl);
    }
  }, [categoryIdFromUrl, isInitialized]);

  // 카테고리 변경 핸들러 - URL 쿼리 파라미터 업데이트
  const handleCategoryChange = (categoryId: number | null) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (categoryId === null) {
      params.delete('categoryId');
    } else {
      params.set('categoryId', String(categoryId));
    }
    const newUrl = `/${companyId}/products${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategoryId, selectedSort.key],
    queryFn: async () => {
      // 초기 진입 시 categoryId가 null이면 필터링 없이 전체 상품 조회
      const result = await getAllProducts({
        sort: selectedSort.key,
        categoryId: selectedCategoryId, // null이면 쿼리 파라미터에 포함되지 않음
        accessToken,
      });
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: !!companyId && isInitialized, // 초기화 완료 후에만 쿼리 실행
    refetchOnMount: true, // 마운트 시 refetch (삭제 후 리다이렉트 시 최신 데이터 보장)
  });

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
      />
    </div>
  );
};

export default ProductListSection;
