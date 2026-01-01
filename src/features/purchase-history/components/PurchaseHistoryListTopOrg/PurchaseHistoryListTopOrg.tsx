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

export const PurchaseHistoryListTopOrg = ({
  thisMonthBudget,
  lastMonthBudget,
  thisMonthSpending,
  lastMonthSpending,
  thisYearTotalSpending,
  lastYearTotalSpending,
  selectedSort,
  onSortChange,
}: PurchaseHistoryListTopOrgProps) => {
  // 진행률 계산 (지출액 / 예산 * 100)
  const spendingPercentage =
    thisMonthBudget > 0 ? Math.round((thisMonthSpending / thisMonthBudget) * 100) : 0;

  // 남은 예산 계산 (음수 방지)
  const currentBudget = Math.max(0, thisMonthBudget - thisMonthSpending);
  const lastBudget = Math.max(0, lastMonthBudget - lastMonthSpending);

  // 작년 대비 지출 차이
  const yearOverYearDiff = thisYearTotalSpending - lastYearTotalSpending;

  return (
    <div className="flex flex-col gap-16 tablet:gap-20 desktop:gap-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-18">구매 내역 확인</h1>
        {selectedSort && onSortChange && (
          <DropDown
            items={COMMON_SORT_OPTIONS}
            placeholder="정렬"
            variant="small"
            selected={selectedSort}
            onSelect={onSortChange}
          />
        )}
      </div>

      {/* Cards Grid */}
      <div className="flex flex-col gap-12 tablet:grid tablet:grid-cols-3 desktop:grid-cols-3 tablet:gap-16 desktop:gap-20">
        {/* 상단 2개 카드 (모바일) */}
        <div className="grid grid-cols-2 gap-12 tablet:contents desktop:contents">
          {/* 이번 달 예산 카드 */}
          <div className="flex flex-col gap-8 tablet:gap-10 desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-gray-50 rounded-8">
            <div className="desktop:flex desktop:justify-between desktop:items-center">
              <h2 className="text-16 tablet:text-16 desktop:text-18 font-semibold text-gray-700">
                이번 달 예산
              </h2>
              <PriceText
                value={thisMonthBudget}
                className="text-18 tablet:text-18 desktop:text-24"
              />
            </div>
            <p className="text-14 tablet:text-14 desktop:text-16 text-gray-600">
              지난 달 예산은
              <br />
              <PriceText value={lastMonthBudget} className="text-gray-600" /> 이었어요
            </p>
          </div>

          {/* 이번 달 지출액 카드 */}
          <div className="flex flex-col desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-gray-50 rounded-8">
            <div className="desktop:flex desktop:justify-between desktop:items-center">
              <h2 className="text-16 tablet:text-16 desktop:text-18 font-semibold text-gray-700">
                이번 달 지출액
              </h2>
              <PriceText
                value={thisMonthSpending}
                className="text-18 tablet:text-18 desktop:text-24"
              />
            </div>
            <p className="text-14 tablet:text-14 desktop:text-16 text-gray-600 tablet:pt-10 pt-10">
              지난 달: <PriceText value={lastMonthSpending} className="text-gray-600" />
            </p>
            <div className="mt-4 tablet:mt-6 desktop:mt-8 w-full">
              <ProgressBar
                value={spendingPercentage}
                currentBudget={currentBudget}
                lastBudget={lastBudget}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* 올해 총 지출액 카드 */}
        <div className="flex flex-col gap-8 tablet:gap-10 desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-gray-50 rounded-8">
          <div className="desktop:flex desktop:justify-between desktop:items-center">
            <h2 className="text-16 tablet:text-16 desktop:text-18 font-semibold text-gray-700">
              올해 총 지출액
            </h2>
            <PriceText
              value={thisYearTotalSpending}
              className="text-18 tablet:text-18 desktop:text-24"
            />
          </div>
          <p className="text-14 tablet:text-14 desktop:text-16 text-gray-600">
            {yearOverYearDiff > 0 && (
              <>
                작년보다
                <br />
                <PriceText value={yearOverYearDiff} className="text-gray-600" /> 더 지출했어요
              </>
            )}
            {yearOverYearDiff < 0 && (
              <>
                작년보다
                <br />
                <PriceText value={Math.abs(yearOverYearDiff)} className="text-gray-600" /> 덜
                지출했어요
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
