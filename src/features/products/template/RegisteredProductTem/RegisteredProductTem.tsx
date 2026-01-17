'use client';

import DropDown, { type Option } from '@/components/atoms/DropDown/DropDown';
import { Divider } from '@/components/atoms/Divider/Divider';
import RegisteredProductOrg, {
  type RegisteredProductOrgItem,
} from '@/features/products/components/RegisteredProductOrg/RegisteredProductOrg';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import { clsx } from '@/utils/clsx';
import { PRODUCT_LABELS } from '@/features/products/constants/labels';
import type { RegisteredProductTemGroupedProps } from '@/features/products/types/my-registered.types';

/** =====================
 * Props
 ====================== */
interface RegisteredProductTemLegacyProps {
  products: RegisteredProductOrgItem[];
  totalCount: number;
  isLoading?: boolean;
  sortOptions: Option[];
  selectedSort: Option;
  onSortChange: (sort: Option) => void;
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  onRegisterClick: () => void;
}

type RegisteredProductTemProps = RegisteredProductTemLegacyProps | RegisteredProductTemGroupedProps;

function isGroupedProps(
  props: RegisteredProductTemProps
): props is RegisteredProductTemGroupedProps {
  return 'listState' in props && 'sortState' in props && 'paginationState' in props;
}

const RegisteredProductTem = (props: RegisteredProductTemProps) => {
  // Props 정규화
  /* eslint-disable react/destructuring-assignment */
  const {
    products,
    totalCount,
    isLoading,
    sortOptions,
    selectedSort,
    onSortChange,
    currentPage,
    totalPage,
    onPageChange,
    onRegisterClick,
  } = isGroupedProps(props)
    ? {
        products: props.listState.products,
        totalCount: props.listState.totalCount,
        isLoading: props.listState.isLoading,
        sortOptions: props.sortState.sortOptions,
        selectedSort: props.sortState.selectedSort,
        onSortChange: props.sortState.onSortChange,
        currentPage: props.paginationState.currentPage,
        totalPage: props.paginationState.totalPage,
        onPageChange: props.paginationState.onPageChange,
        onRegisterClick: props.onRegisterClick,
      }
    : {
        ...props,
        isLoading: props.isLoading ?? false,
      };
  /* eslint-enable react/destructuring-assignment */

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
          products={products}
          totalCount={totalCount}
          onRegisterClick={onRegisterClick}
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
};

export default RegisteredProductTem;
