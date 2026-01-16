'use client';

/**
 * 내 구매 요청 목록 Template
 * Props Drilling 개선 - 그룹화된 Props 사용
 */

import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type {
  MyPurchaseCancelModalState,
  MyPurchaseCancelModalHandlers,
  MyPurchasePaginationState,
  MyPurchaseSortState,
  MyPurchaseFilterState,
  MyPurchaseNavigationHandlers,
} from '@/features/purchase/types/my-purchase-list.types';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import { MyPurchaseRequestListHeader } from './components/MyPurchaseRequestListHeader';
import { MyPurchaseRequestTable } from './components/MyPurchaseRequestTable';
import { MyPurchaseCancelModal } from './components/MyPurchaseCancelModal';

/**
 * 개선된 Props 인터페이스 - 그룹화된 타입 사용
 */
export interface MyPurchaseRequestListTemProps {
  purchaseList?: PurchaseRequestItem[];
  companyId?: string;
  className?: string;
  isLoading?: boolean;

  // 그룹화된 Props
  cancelModalState?: MyPurchaseCancelModalState;
  cancelModalHandlers?: MyPurchaseCancelModalHandlers;
  paginationState?: MyPurchasePaginationState;
  sortState?: MyPurchaseSortState;
  filterState?: MyPurchaseFilterState;
  navigationHandlers?: MyPurchaseNavigationHandlers;
}

/**
 * 개선된 내 구매 요청 목록 Template - 깔끔하고 단순한 조립 레이어
 */
const MyPurchaseRequestListTem = ({
  purchaseList,
  companyId,
  className,
  isLoading = false,
  cancelModalState,
  cancelModalHandlers,
  paginationState,
  sortState,
  filterState,
  navigationHandlers,
}: MyPurchaseRequestListTemProps) => {
  const currentPage = paginationState?.currentPage;
  const totalPages = paginationState?.totalPages;

  return (
    <div
      className={clsx(
        'w-full',
        'mt-30',
        'tablet:mt-20',
        'desktop:max-w-1400',
        'desktop:mx-auto',
        'desktop:mt-80',
        className
      )}
    >
      {/* 헤더 - 태블릿/데스크탑만 */}
      <div className="hidden tablet:block">
        <MyPurchaseRequestListHeader sortState={sortState} filterState={filterState} isTablet />
      </div>

      {/* 테이블 */}
      <MyPurchaseRequestTable
        purchaseList={purchaseList}
        companyId={companyId}
        isLoading={isLoading}
        cancelModalHandlers={cancelModalHandlers}
        navigationHandlers={navigationHandlers}
      />

      {/* 페이지네이션 */}
      {currentPage !== undefined &&
        totalPages !== undefined &&
        totalPages > 0 &&
        paginationState?.onPageChange && (
          <div className="flex justify-start mt-20">
            <PaginationBlock
              current={currentPage}
              total={totalPages}
              onPrev={paginationState.onPageChange}
              onNext={paginationState.onPageChange}
            />
          </div>
        )}

      {/* 취소 모달 */}
      <MyPurchaseCancelModal
        cancelModalState={cancelModalState}
        cancelModalHandlers={cancelModalHandlers}
      />
    </div>
  );
};

export default MyPurchaseRequestListTem;
