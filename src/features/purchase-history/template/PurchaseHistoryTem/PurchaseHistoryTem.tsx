'use client';

import { useRouter } from 'next/navigation';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
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
  selectedSort?: Option;
  onSortChange?: (option: Option) => void;

  // BottomOrg props
  items: PurchaseRequestItem[];
  companyId: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const PurchaseHistoryTem = ({
  thisMonthBudget,
  lastMonthBudget,
  thisMonthSpending,
  lastMonthSpending,
  thisYearTotalSpending,
  lastYearTotalSpending,
  selectedSort,
  onSortChange,
  items,
  companyId,
  currentPage,
  totalPages,
  onPageChange,
}: PurchaseHistoryTemProps) => {
  const isEmpty = items.length === 0;
  const router = useRouter();

  const handleProductNavigation = () => {
    router.push(`/${companyId}/products`);
  };

  // 데스크톱: 최대 4개, 태블릿/모바일: 최대 3개
  const desktopItems = items.slice(0, 4);
  const mobileTabletItems = items.slice(0, 3);

  return (
    <div className="flex flex-col gap-34 tablet:gap-25 desktop:mt-71">
      <PurchaseHistoryListTopOrg
        thisMonthBudget={thisMonthBudget}
        lastMonthBudget={lastMonthBudget}
        thisMonthSpending={thisMonthSpending}
        lastMonthSpending={lastMonthSpending}
        thisYearTotalSpending={thisYearTotalSpending}
        lastYearTotalSpending={lastYearTotalSpending}
        selectedSort={selectedSort}
        onSortChange={onSortChange}
      />
      {isEmpty ? (
        <div className="flex justify-center items-center min-h-[calc(100vh-400px)]">
          <StatusNotice
            title="구매 내역이 없어요"
            description={`구매 요청을 승인하고
상품을 주문해 보세요`}
            buttonText="상품으로 이동"
            onButtonClick={handleProductNavigation}
          />
        </div>
      ) : (
        <>
          {/* Desktop: 최대 4개 */}
          <div className="hidden desktop:block">
            <PurchaseHistoryListOrg
              items={desktopItems}
              companyId={companyId}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
          {/* Mobile/Tablet: 최대 3개 */}
          <div className="block desktop:hidden">
            <PurchaseHistoryListOrg
              items={mobileTabletItems}
              companyId={companyId}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseHistoryTem;
