'use client';

import { useRouter } from 'next/navigation';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import ListSkeletonUI from '@/components/molecules/ListSkeletonUI/ListSkeletonUI';
import PurchaseHistoryListTopOrg from '../../components/PurchaseHistoryListTopOrg/PurchaseHistoryListTopOrg';
import PurchaseHistoryListOrg from '../../components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg';

interface PurchaseHistoryTemProps {
  // TopOrg props
  thisMonthBudget: number;
  lastMonthBudget: number;
  thisMonthSpending: number;
  lastMonthSpending: number;
  thisYearTotalSpending: number;
  lastYearTotalSpending: number;
  spendingPercentage?: number; // 백엔드에서 계산된 진행률
  currentBudget?: number; // 백엔드에서 계산된 남은 예산
  lastBudget?: number; // 백엔드에서 계산된 지난 달 남은 예산
  selectedSort?: Option;
  onSortChange?: (option: Option) => void;

  // BottomOrg props
  items: PurchaseRequestItem[];
  companyId: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

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
  companyId,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PurchaseHistoryTemProps) => {
  const safeItems = items || [];
  const isEmpty = safeItems.length === 0;
  const router = useRouter();

  const handleProductNavigation = () => {
    router.push(`/${companyId}/products`);
  };

  // 화면에 최대 4개만 표시
  const displayItems = safeItems.slice(0, 4);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="w-full">
          <div className="hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-60 w-full desktop:border-b desktop:border-gray-200">
            <span className="text-16 text-gray-700 pl-40">구매 요청일</span>
            <span className="text-16 text-gray-700">요청인</span>
            <span className="text-16 text-gray-700">구매 물품</span>
            <span className="text-16 text-gray-700">총 금액</span>
            <span className="text-16 text-gray-700">구매 승인일</span>
            <span className="text-16 text-gray-700">담당자</span>
          </div>
          <ListSkeletonUI rows={4} />
        </div>
      );
    }

    if (isEmpty) {
      return (
        <div className="flex justify-center items-center min-h-[calc(100vh-400px)]">
          <StatusNotice
            title="구매 내역이 없어요"
            description={`구매 요청을 승인하고
상품을 주문해 보세요`}
            buttonText="상품으로 이동"
            onButtonClick={handleProductNavigation}
          />
        </div>
      );
    }

    return (
      <PurchaseHistoryListOrg
        items={displayItems}
        companyId={companyId}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
  };

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
      {renderContent()}
    </div>
  );
};

export default PurchaseHistoryTem;
