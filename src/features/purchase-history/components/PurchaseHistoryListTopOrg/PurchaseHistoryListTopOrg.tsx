'use client';

import PriceText from '@/components/atoms/PriceText/PriceText';
import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar';
import DropDown, { type Option } from '@/components/atoms/DropDown/DropDown';
import { COMMON_SORT_OPTIONS } from '@/constants/sort';

interface PurchaseHistoryListTopOrgProps {
  thisMonthBudget: number;
  lastMonthBudget: number;
  thisMonthSpending: number;
  lastMonthSpending: number;
  thisYearTotalSpending: number;
  lastYearTotalSpending: number;
  selectedSort?: Option;
  onSortChange?: (option: Option) => void;
}

export const PurchaseHistoryListTopOrg: React.FC<PurchaseHistoryListTopOrgProps> = ({
  thisMonthBudget,
  lastMonthBudget,
  thisMonthSpending,
  lastMonthSpending,
  thisYearTotalSpending,
  lastYearTotalSpending,
  selectedSort,
  onSortChange,
}) => {
  // 진행률 계산 (지출액 / 예산 * 100)
  const spendingPercentage =
    thisMonthBudget > 0 ? Math.round((thisMonthSpending / thisMonthBudget) * 100) : 0;

  // 작년 대비 지출 차이
  const yearOverYearDiff = thisYearTotalSpending - lastYearTotalSpending;

  return (
    <div className="flex flex-col gap-16 tablet:gap-20 desktop:gap-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-18 tablet:text-20 desktop:text-24">구매 내역 확인</h1>
        <DropDown
          items={COMMON_SORT_OPTIONS}
          placeholder="정렬"
          variant="small"
          selected={selectedSort}
          onSelect={onSortChange}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-12 tablet:gap-16 desktop:gap-20">
        {/* 이번 달 예산 카드 */}
        <div className="flex flex-col gap-8 tablet:gap-10 desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-white rounded-8 border border-gray-200">
          <h2 className="text-14 tablet:text-16 desktop:text-18 font-semibold text-gray-700">
            이번 달 예산
          </h2>
          <PriceText value={thisMonthBudget} className="text-24 tablet:text-28 desktop:text-32" />
          <p className="text-12 tablet:text-13 desktop:text-14 text-gray-500">
            지난 달 예산은 <PriceText value={lastMonthBudget} className="text-gray-500" />
            이었어요
          </p>
        </div>

        {/* 이번 달 지출액 카드 */}
        <div className="flex flex-col gap-8 tablet:gap-10 desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-white rounded-8 border border-gray-200">
          <h2 className="text-14 tablet:text-16 desktop:text-18 font-semibold text-gray-700">
            이번 달 지출액
          </h2>
          <PriceText value={thisMonthSpending} className="text-24 tablet:text-28 desktop:text-32" />
          <p className="text-12 tablet:text-13 desktop:text-14 text-gray-500">
            지난 달: <PriceText value={lastMonthSpending} className="text-gray-500" />
          </p>
          <div className="mt-4 tablet:mt-6 desktop:mt-8 w-full">
            <ProgressBar
              value={spendingPercentage}
              currentBudget={thisMonthBudget - thisMonthSpending}
              lastBudget={lastMonthBudget - lastMonthSpending}
              className="w-full"
            />
          </div>
        </div>

        {/* 올해 총 지출액 카드 */}
        <div className="flex flex-col gap-8 tablet:gap-10 desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-white rounded-8 border border-gray-200">
          <h2 className="text-14 tablet:text-16 desktop:text-18 font-semibold text-gray-700">
            올해 총 지출액
          </h2>
          <PriceText
            value={thisYearTotalSpending}
            className="text-24 tablet:text-28 desktop:text-32"
          />
          <p className="text-12 tablet:text-13 desktop:text-14 text-gray-500">
            {yearOverYearDiff > 0 && (
              <>
                작년보다 <PriceText value={yearOverYearDiff} className="text-gray-500" /> 더
                지출했어요
              </>
            )}
            {yearOverYearDiff < 0 && (
              <>
                작년보다 <PriceText value={Math.abs(yearOverYearDiff)} className="text-gray-500" />{' '}
                덜 지출했어요
              </>
            )}
            {yearOverYearDiff === 0 && <>작년과 동일하게 지출했어요</>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryListTopOrg;
