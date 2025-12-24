'use client';

import { useEffect, useMemo, useState } from 'react';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import { Divider } from '@/components/atoms/Divider/Divider';
import RegisteredProductOrg, {
  RegisteredProductOrgItem,
} from '@/features/products/components/RegisteredProductOrg/RegisteredProductOrg';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import { clsx } from '@/utils/clsx';

/** =====================
 * Props
 ====================== */
interface RegisteredProductTemProps {
  date: string;
  products: RegisteredProductOrgItem[];
  address: string;
}

const sortOptions: Option[] = [
  { key: 'all', label: '전체' },
  { key: 'latest', label: '최신순' },
  { key: 'lowprice', label: '낮은 가격순' },
  { key: 'highprice', label: '높은 가격순' },
];

const getPageSize = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth >= 1024) return 6; // desktop
  return 4; // mobile & tablet
};

const RegisteredProductTem = ({ date, products, address }: RegisteredProductTemProps) => {
  const totalCount = products.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<Option>(sortOptions[0]!);
  const [pageSize, setPageSize] = useState(4);

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
     정렬된 상품
  ====================== */
  const sortedProducts = useMemo(() => {
    const copied = [...products];

    switch (selectedSort.key) {
      case 'latest':
        return copied.reverse(); // 최신순 (임시 기준)
      case 'lowprice':
        return copied.sort((a, b) => a.price - b.price);
      case 'highprice':
        return copied.sort((a, b) => b.price - a.price);
      default:
        return copied;
    }
  }, [products, selectedSort]);

  /* =====================
     페이지네이션 계산
  ====================== */
  const totalPage = Math.max(1, Math.ceil(sortedProducts.length / pageSize));

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, pageSize]);

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
            'desktop:max-w-1400 desktop:px-0 desktop:mt-80 desktop:mb-40'
          )}
        >
          <h2 className="text-gray-950 font-suit text-18 font-bold tracking--0.45">
            상품 등록 내역
          </h2>

          <DropDown
            items={sortOptions}
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
      <div className="px-24">
        <RegisteredProductOrg
          date={date}
          products={pagedProducts}
          address={address}
          totalCount={totalCount}
        />
      </div>

      {/* =====================
          Pagination (항상 노출)
      ====================== */}
      <div className="flex justify-center mt-20 tablet:mt-30">
        <PaginationBlock
          current={currentPage}
          total={totalPage}
          onPrev={setCurrentPage}
          onNext={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default RegisteredProductTem;
