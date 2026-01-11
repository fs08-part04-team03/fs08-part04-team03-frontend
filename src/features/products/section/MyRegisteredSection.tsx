'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RegisteredProductTem from '@/features/products/template/RegisteredProductTem/RegisteredProductTem';
import ProductModal from '@/components/molecules/ProductModal/ProductModal';
import { useMyRegisteredProducts } from '@/features/products/queries/product.queries';
import { ERROR_MESSAGES } from '@/constants';
import { REGISTERED_PRODUCT_SORT_OPTIONS, DEFAULT_REGISTERED_PRODUCT_SORT } from '@/constants/sort';
import { logger } from '@/utils/logger';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { useProductResponsivePageSize } from '@/features/products/handlers/useProductResponsivePageSize';
import { useProductPaginationHandlers } from '@/features/products/handlers/useProductPaginationHandlers';
import { useProductModalHandlers } from '@/features/products/handlers/useProductModalHandlers';
import { useProductNavigation } from '@/features/products/handlers/useProductNavigation';
import { PRODUCT_DEFAULTS } from '@/features/products/constants/defaults';

const MyRegisteredSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  // 상태 관리
  const [selectedSort, setSelectedSort] = useState<Option>(DEFAULT_REGISTERED_PRODUCT_SORT);

  // 핸들러 훅 사용
  const navigation = useProductNavigation(companyId || '');
  const pagination = useProductPaginationHandlers(undefined, PRODUCT_DEFAULTS.INITIAL_PAGE);
  const pageSize = useProductResponsivePageSize(pagination.resetPage);
  const modalHandlers = useProductModalHandlers(pagination.currentPage, pageSize, selectedSort.key);

  // 데이터 패칭
  const {
    data,
    isLoading,
    error: queryError,
  } = useMyRegisteredProducts(
    {
      page: pagination.currentPage,
      pageSize,
      sort: selectedSort.key,
    },
    { enabled: !!companyId }
  );

  // 로깅
  useEffect(() => {
    if (data) {
      logger.info('[MyRegisteredSection] API 응답:', {
        totalItems: data.totalItems,
        productsLength: data.products.length,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      });
    }
  }, [data]);

  // 페이지네이션 계산
  const totalPage = data ? data.totalPages : 1;
  const totalCount = data ? data.totalItems : 0;

  // API에서 이미 정렬 및 페이지네이션된 데이터를 받음
  const pagedProducts = data ? data.products : [];

  // 정렬 변경 핸들러 (페이지 리셋 포함)
  const handleSortChange = useCallback(
    (option: Option) => {
      setSelectedSort(option);
      pagination.resetPage();
    },
    [pagination]
  );

  // 에러 상태 분기
  if (queryError) {
    const errorMessage =
      queryError instanceof Error ? queryError.message : ERROR_MESSAGES.FETCH_ERROR;
    logger.error('[MyRegisteredSection] API 에러:', queryError);
    return (
      <section className="w-full bg-white">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <RegisteredProductTem
        products={pagedProducts}
        totalCount={totalCount}
        isLoading={isLoading}
        sortOptions={REGISTERED_PRODUCT_SORT_OPTIONS}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
        currentPage={pagination.currentPage}
        totalPage={totalPage}
        onPageChange={pagination.setCurrentPage}
        onRegisterClick={modalHandlers.handleOpenModal}
        onProductClick={(productId) => navigation.goToProductDetail(productId)}
      />
      <ProductModal
        open={modalHandlers.modalOpen}
        onClose={modalHandlers.handleCloseModal}
        onSubmit={modalHandlers.handleModalSubmit}
        initialName=""
        initialPrice=""
        initialLink=""
        initialImage={null}
        initialCategory={null}
        initialSubCategory={null}
      />
    </>
  );
};

export default MyRegisteredSection;
