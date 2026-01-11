'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import ListSkeletonUI from '@/components/molecules/ListSkeletonUI/ListSkeletonUI';
import PurchaseHistoryListTopOrg from '../../components/PurchaseHistoryListTopOrg/PurchaseHistoryListTopOrg';
import PurchaseHistoryListOrg from '../../components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg';
import { PurchaseHistoryTableHeader } from '../../components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader';
import { PURCHASE_HISTORY_DEFAULTS } from '../../constants/defaults';

interface PurchaseHistoryTemProps {
  // TopOrg props
  thisMonthBudget: number;
  lastMonthBudget: number;
  thisMonthSpending: number;
  lastMonthSpending: number;
  thisYearTotalSpending: number;
  lastYearTotalSpending: number;
  spendingPercentage?: number;
  currentBudget?: number;
  lastBudget?: number;
  selectedSort?: Option;
  onSortChange?: (option: Option) => void;

  // BottomOrg props
  items: PurchaseRequestItem[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  isEmpty?: boolean;
  onNavigateToProducts?: () => void;
  onItemClick?: (orderId: string) => void;
  emptyMessage?: {
    TITLE: string;
    DESCRIPTION: string;
    BUTTON_TEXT: string;
  };
}

/**
 * PurchaseHistoryTem
 * 순수 UI 조립 레이어
 * - header / list / row / footer 컴포지션만 담당
 * - props 기반 렌더링만 수행
 */
export const PurchaseHistoryTem = ({
  thisMonthBudget,
  lastMonthBudget,
  thisMonthSpending,
  lastMonthSpending,
  thisYearTotalSpending,
  lastYearTotalSpending,
  spendingPercentage,
  currentBudget,
  lastBudget,
  selectedSort,
  onSortChange,
  items,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  isEmpty = false,
  onNavigateToProducts,
  onItemClick,
  emptyMessage,
}: PurchaseHistoryTemProps) => {
  const safeItems = items || [];
  // 화면에 최대 4개만 표시
  const displayItems = safeItems.slice(0, PURCHASE_HISTORY_DEFAULTS.DISPLAY_ITEMS_COUNT);

  return (
    <div className="flex flex-col gap-34 tablet:gap-25 mt-24 tablet:mt-14 desktop:mt-71">
      <PurchaseHistoryListTopOrg
        thisMonthBudget={thisMonthBudget}
        lastMonthBudget={lastMonthBudget}
        thisMonthSpending={thisMonthSpending}
        lastMonthSpending={lastMonthSpending}
        thisYearTotalSpending={thisYearTotalSpending}
        lastYearTotalSpending={lastYearTotalSpending}
        spendingPercentage={spendingPercentage}
        currentBudget={currentBudget}
        lastBudget={lastBudget}
        selectedSort={selectedSort}
        onSortChange={onSortChange}
      />

      {/* Loading 상태 */}
      {isLoading && (
        <div className="w-full">
          <PurchaseHistoryTableHeader />
          <ListSkeletonUI rows={PURCHASE_HISTORY_DEFAULTS.DISPLAY_ITEMS_COUNT} />
        </div>
      )}

      {/* Empty 상태 */}
      {!isLoading && isEmpty && emptyMessage && (
        <div className="flex justify-center items-center min-h-[calc(100vh-400px)]">
          <StatusNotice
            title={emptyMessage.TITLE}
            description={emptyMessage.DESCRIPTION}
            buttonText={emptyMessage.BUTTON_TEXT}
            onButtonClick={onNavigateToProducts}
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
          onItemClick={onItemClick}
        />
      )}
    </div>
  );
};

export default PurchaseHistoryTem;
