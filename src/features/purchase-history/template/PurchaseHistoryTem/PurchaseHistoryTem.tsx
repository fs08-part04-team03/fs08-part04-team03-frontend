'use client';

/**
 * 구매 내역 Template
 * Props Drilling 개선 - 그룹화된 Props 사용
 */

import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import ListSkeletonUI from '@/components/molecules/ListSkeletonUI/ListSkeletonUI';
import type {
  PurchaseHistoryBudgetInfo,
  PurchaseHistorySortState,
  PurchaseHistoryTableState,
  PurchaseHistoryNavigationHandlers,
  PurchaseHistoryEmptyState,
} from '@/features/purchase-history/types/purchase-history.types';
import PurchaseHistoryListTopOrg from '../../components/PurchaseHistoryListTopOrg/PurchaseHistoryListTopOrg';
import PurchaseHistoryListOrg from '../../components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg';
import { PurchaseHistoryTableHeader } from '../../components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader';
import { PURCHASE_HISTORY_DEFAULTS } from '../../constants/defaults';

/**
 * 개선된 Props 인터페이스 - 그룹화된 타입 사용
 */
interface PurchaseHistoryTemProps {
  // 그룹화된 Props
  budgetInfo: PurchaseHistoryBudgetInfo;
  sortState?: PurchaseHistorySortState;
  tableState: PurchaseHistoryTableState;
  navigationHandlers?: PurchaseHistoryNavigationHandlers;
  emptyState?: PurchaseHistoryEmptyState;
}

/**
 * 개선된 구매 내역 Template - 깔끔하고 단순한 조립 레이어
 */
export const PurchaseHistoryTem = ({
  budgetInfo,
  sortState,
  tableState,
  navigationHandlers,
  emptyState,
}: PurchaseHistoryTemProps) => {
  const {
    items,
    currentPage,
    totalPages,
    onPageChange,
    isLoading = false,
    isEmpty = false,
  } = tableState;

  const safeItems = items || [];
  const displayItems = safeItems.slice(0, PURCHASE_HISTORY_DEFAULTS.DISPLAY_ITEMS_COUNT);

  return (
    <div className="flex flex-col gap-34 tablet:gap-25 mt-24 tablet:mt-14 desktop:mt-71">
      {/* 예산 정보 상단 */}
      <PurchaseHistoryListTopOrg
        thisMonthBudget={budgetInfo.thisMonthBudget}
        lastMonthBudget={budgetInfo.lastMonthBudget}
        thisMonthSpending={budgetInfo.thisMonthSpending}
        lastMonthSpending={budgetInfo.lastMonthSpending}
        thisYearTotalSpending={budgetInfo.thisYearTotalSpending}
        lastYearTotalSpending={budgetInfo.lastYearTotalSpending}
        spendingPercentage={budgetInfo.spendingPercentage}
        currentBudget={budgetInfo.currentBudget}
        lastBudget={budgetInfo.lastBudget}
        selectedSort={sortState?.selectedSort}
        onSortChange={sortState?.onSortChange}
      />

      {/* Loading 상태 */}
      {isLoading && (
        <div className="w-full">
          <PurchaseHistoryTableHeader />
          <ListSkeletonUI rows={PURCHASE_HISTORY_DEFAULTS.DISPLAY_ITEMS_COUNT} />
        </div>
      )}

      {/* Empty 상태 */}
      {!isLoading && isEmpty && emptyState?.emptyMessage && (
        <div className="flex justify-center items-center min-h-[calc(100vh-400px)]">
          <StatusNotice
            title={emptyState.emptyMessage.TITLE}
            description={emptyState.emptyMessage.DESCRIPTION}
            buttonText={emptyState.emptyMessage.BUTTON_TEXT}
            onButtonClick={navigationHandlers?.onNavigateToProducts}
          />
        </div>
      )}

      {/* Content 상태 */}
      {!isLoading && !isEmpty && (
        <PurchaseHistoryListOrg
          items={displayItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onItemClick={navigationHandlers?.onItemClick}
        />
      )}
    </div>
  );
};

export default PurchaseHistoryTem;
