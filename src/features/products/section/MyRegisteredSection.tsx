'use client';

import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import { Divider } from '@/components/atoms/Divider/Divider';
import RegisteredProductOrg from '@/features/products/components/RegisteredProductOrg/RegisteredProductOrg';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import ProductModal from '@/components/molecules/ProductModal/ProductModal';
import { clsx } from '@/utils/clsx';
import { getMyRegisteredProducts } from '@/features/products/api/products.api';
import { ERROR_MESSAGES } from '@/constants';
import { REGISTERED_PRODUCT_SORT_OPTIONS, DEFAULT_REGISTERED_PRODUCT_SORT } from '@/constants/sort';
import { formatDate } from '@/utils/formatDate';
import { logger } from '@/utils/logger';

const getPageSize = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth >= 1024) return 6; // desktop
  return 4; // mobile & tablet
};

const MyRegisteredSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<Option>(DEFAULT_REGISTERED_PRODUCT_SORT);
  const [pageSize, setPageSize] = useState(4);
  const [modalOpen, setModalOpen] = useState(false);

  const queryClient = useQueryClient();

  /* =====================
     반응형 pageSize
  ====================== */
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
      setCurrentPage(1); // breakpoint 변경 시 페이지 리셋
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* =====================
     API 호출
  ====================== */
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['myRegisteredProducts', currentPage, pageSize, selectedSort.key],
    queryFn: async () => {
      const sortParam =
        selectedSort.key === 'all'
          ? undefined
          : (selectedSort.key as 'latest' | 'lowprice' | 'highprice');

      const response = await getMyRegisteredProducts({
        page: currentPage,
        size: pageSize,
        sort: sortParam,
      });

      logger.info('[MyRegisteredSection] API 응답:', {
        totalItems: response.totalItems,
        productsLength: response.products.length,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
      });

      return response;
    },
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnMount: true, // 마운트 시 refetch (삭제 후 리다이렉트 시 최신 데이터 보장)
  });

  /* =====================
     페이지네이션 계산
  ====================== */
  const totalPage = data ? data.totalPages : 1;
  const totalCount = data ? data.totalItems : 0;

  // API에서 이미 정렬 및 페이지네이션된 데이터를 받음
  const pagedProducts = data ? data.products : [];

  /* =====================
     날짜 포맷팅 (현재 날짜 사용)
  ====================== */
  const formattedDate = useMemo(() => formatDate(new Date()), []);

  // 에러 발생 시 에러 메시지만 표시
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
    <section className="w-full bg-white">
      {/* =====================
          Header
      ====================== */}
      <div className="w-full">
        <div
          className={clsx(
            'mx-auto flex items-center justify-between',
            'px-24 pt-10 pb-20 max-w-375',
            'tablet:max-w-744',
            'desktop:max-w-1200 desktop:px-0 desktop:mt-80 desktop:mb-40'
          )}
        >
          <h2 className="text-gray-950 font-suit text-18 font-bold tracking--0.45">
            상품 등록 내역
          </h2>

          <DropDown
            items={REGISTERED_PRODUCT_SORT_OPTIONS}
            selected={selectedSort}
            onSelect={(item) => {
              setSelectedSort(item);
              setCurrentPage(1); // 정렬 변경 시 1페이지로
            }}
            variant="small"
            buttonClassName="w-130"
          />
        </div>
      </div>

      <Divider className="mb-20 desktop:hidden" />

      {/* =====================
          Content
      ====================== */}
      <div className={clsx('px-24', 'desktop:px-0')}>
        <RegisteredProductOrg
          date={formattedDate}
          products={pagedProducts}
          totalCount={totalCount}
          companyId={companyId || ''}
          onRegisterClick={() => setModalOpen(true)}
          isLoading={isLoading}
        />
      </div>

      {/* =====================
          Pagination (데이터가 있을 때만 표시)
      ====================== */}
      {!isLoading && totalCount > 0 && (
        <div className="flex justify-center mt-20 tablet:mt-30">
          <PaginationBlock
            current={currentPage}
            total={totalPage}
            onPrev={setCurrentPage}
            onNext={setCurrentPage}
          />
        </div>
      )}

      {/* =====================
          Product Modal
      ====================== */}
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => {
          setModalOpen(false);
          // 캐시 즉시 제거하여 새로 등록된 상품이 즉시 표시되도록 보장
          queryClient.removeQueries({ queryKey: ['myRegisteredProducts'] });
        }}
        initialName=""
        initialPrice=""
        initialLink=""
        initialImage={null}
        initialCategory={null}
        initialSubCategory={null}
      />
    </section>
  );
};

export default MyRegisteredSection;
