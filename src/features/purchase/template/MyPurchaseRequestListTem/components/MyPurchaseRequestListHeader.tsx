/**
 * 내 구매 요청 목록 헤더
 * - 제목, 상태 필터, 정렬 드롭다운
 */

import { clsx } from '@/utils/clsx';
import DropDown from '@/components/atoms/DropDown/DropDown';
import { Divider } from '@/components/atoms/Divider/Divider';
import {
  PURCHASE_TEXT_SIZES,
  PURCHASE_PADDING,
  PURCHASE_SPACING,
  PURCHASE_LABELS,
} from '@/features/purchase/constants';
import type {
  MyPurchaseSortState,
  MyPurchaseFilterState,
} from '@/features/purchase/types/my-purchase-list.types';

interface MyPurchaseRequestListHeaderProps {
  sortState?: MyPurchaseSortState;
  filterState?: MyPurchaseFilterState;
  showDivider?: boolean;
  isTablet?: boolean;
}

export const MyPurchaseRequestListHeader = ({
  sortState,
  filterState,
  showDivider = true,
  isTablet = false,
}: MyPurchaseRequestListHeaderProps) => (
  <div className={clsx('w-full', isTablet && 'tablet:px-24')}>
    <div
      className={clsx(
        'flex items-center justify-between w-full',
        'text-left text-gray-700',
        PURCHASE_TEXT_SIZES.MEDIUM,
        'font-bold',
        PURCHASE_PADDING.CELL_Y
      )}
    >
      <p>{PURCHASE_LABELS.TITLE}</p>
      <div className={clsx('flex items-center', PURCHASE_SPACING.GAP_MEDIUM)}>
        {/* 상태 필터 */}
        {filterState?.statusOptions && (
          <div className="relative z-dropdown">
            <DropDown
              items={filterState.statusOptions}
              placeholder="전체"
              selected={filterState.selectedStatusOption}
              onSelect={(option) => {
                filterState.onStatusChange?.(option);
              }}
            />
          </div>
        )}
        {/* 정렬 */}
        {sortState?.sortOptions && (
          <div className="relative z-dropdown">
            <DropDown
              items={sortState.sortOptions}
              placeholder={PURCHASE_LABELS.SORT_PLACEHOLDER}
              selected={sortState.selectedSortOption}
              onSelect={(option) => {
                sortState.onSortChange?.(option);
              }}
            />
          </div>
        )}
      </div>
    </div>
    {showDivider && <Divider variant="thin" className="w-full" />}
  </div>
);
