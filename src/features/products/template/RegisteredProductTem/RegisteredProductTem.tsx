'use client';

import DropDown, { type Option } from '@/components/atoms/DropDown/DropDown';
import { Divider } from '@/components/atoms/Divider/Divider';
import RegisteredProductOrg, {
  type RegisteredProductOrgItem,
} from '@/features/products/components/RegisteredProductOrg/RegisteredProductOrg';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import { clsx } from '@/utils/clsx';
import { PRODUCT_LABELS } from '@/features/products/constants/labels';

/** =====================
 * Props
 ====================== */
interface RegisteredProductTemProps {
  date: string;
  products: RegisteredProductOrgItem[];
  totalCount: number;
  companyId: string;
  isLoading?: boolean;
  sortOptions: Option[];
  selectedSort: Option;
  onSortChange: (sort: Option) => void;
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  onRegisterClick: () => void;
  onProductClick?: (productId: number) => void;
}

const RegisteredProductTem = ({
  date,
  products,
  totalCount,
  companyId,
  isLoading = false,
  sortOptions,
  selectedSort,
  onSortChange,
  currentPage,
  totalPage,
  onPageChange,
  onRegisterClick,
  onProductClick,
}: RegisteredProductTemProps) => (
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
          {PRODUCT_LABELS.TITLE.MY_PRODUCT_LIST}
        </h2>

        <DropDown
          items={sortOptions}
          selected={selectedSort}
          onSelect={onSortChange}
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
        date={date}
        products={products}
        totalCount={totalCount}
        companyId={companyId}
        onRegisterClick={onRegisterClick}
        onProductClick={onProductClick}
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
          onPrev={onPageChange}
          onNext={onPageChange}
        />
      </div>
    )}
  </section>
);

export default RegisteredProductTem;
