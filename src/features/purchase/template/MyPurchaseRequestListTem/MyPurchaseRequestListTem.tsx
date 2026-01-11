// 내 구매 요청 내역 - MyPurchaseRequestListPage [내가 요청한 내역들만 보이는곳, 유저, 메니저, 어드민]
// GET /api/v1/purchase/user/getMyPurchases

'use client';

import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import { Divider } from '@/components/atoms/Divider/Divider';
import PurchaseRequestItemListOrg from '@/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg';
import DropDown, { type Option } from '@/components/atoms/DropDown/DropDown';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import ListSkeletonUI from '@/components/molecules/ListSkeletonUI/ListSkeletonUI';
import {
  formatDate,
  formatItemDescription,
  getStatusTagVariant,
  calculateTotalPrice,
} from '@/features/purchase/utils/purchase.utils';
import {
  PURCHASE_DEFAULTS,
  PURCHASE_TABLE_STYLES,
  PURCHASE_SPACING,
  PURCHASE_HEIGHTS,
  PURCHASE_PADDING,
  PURCHASE_TEXT_SIZES,
  PURCHASE_LABELS,
  PURCHASE_EMPTY_MESSAGES,
} from '@/features/purchase/constants';

const TABLE_CELL_BASE_STYLES = {
  header: PURCHASE_TABLE_STYLES.CELL_BASE.HEADER,
  cell: PURCHASE_TABLE_STYLES.CELL_BASE.CELL,
} as const;

const COLUMN_WIDTHS = {
  date: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.DATE,
  product: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.PRODUCT,
  price: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.PRICE,
  status: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.STATUS,
  actions: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.ACTIONS,
} as const;

/**
 * MyPurchaseRequestListTem Props
 */
export interface MyPurchaseRequestListTemProps {
  purchaseList?: PurchaseRequestItem[];
  className?: string;
  onCancelClick?: (purchaseRequestId: string) => void;
  cancelModalOpen?: boolean;
  cancelTargetItem?: PurchaseRequestItem | null;
  onCancelModalClose?: () => void;
  onCancelConfirm?: () => void | Promise<void>;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (option: Option) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (option: Option) => void;
  isLoading?: boolean;
  onNavigateToProducts?: () => void;
  onRowClick?: (purchaseRequestId: string) => void;
  onProductClick?: (productId: number) => void;
  companyId?: string;
}

interface PurchaseRequestTableRowProps {
  item: PurchaseRequestItem;
  onCancelClick?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
}

const TableHeaderCell = ({
  children,
  widthClass,
}: {
  children: React.ReactNode;
  widthClass?: string;
}) => <div className={clsx(TABLE_CELL_BASE_STYLES.header, widthClass)}>{children}</div>;

/**
 * 테이블 컬럼 헤더 (공통)
 */
const TableColumnHeaders = () => (
  <div
    className={clsx(
      'flex items-center w-full justify-between',
      PURCHASE_HEIGHTS.TABLE_HEADER,
      'tablet:border-b tablet:border-gray-200 desktop:border-b desktop:border-gray-200'
    )}
  >
    <TableHeaderCell widthClass={COLUMN_WIDTHS.date}>
      {PURCHASE_LABELS.TABLE_HEADERS.DATE}
    </TableHeaderCell>
    <TableHeaderCell widthClass={COLUMN_WIDTHS.product}>
      {PURCHASE_LABELS.TABLE_HEADERS.PRODUCT}
    </TableHeaderCell>
    <TableHeaderCell widthClass={COLUMN_WIDTHS.price}>
      {PURCHASE_LABELS.TABLE_HEADERS.PRICE}
    </TableHeaderCell>
    <TableHeaderCell widthClass={COLUMN_WIDTHS.status}>
      {PURCHASE_LABELS.TABLE_HEADERS.STATUS}
    </TableHeaderCell>
    <TableHeaderCell widthClass={COLUMN_WIDTHS.actions}>
      {PURCHASE_LABELS.TABLE_HEADERS.ACTIONS}
    </TableHeaderCell>
  </div>
);

interface FilterHeaderProps {
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (option: Option) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (option: Option) => void;
  isTablet?: boolean;
}

/**
 * 테이블 헤더 (태블릿/데스크탑 공통)
 */
const PurchaseRequestTableHeader = ({
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
  isTablet = false,
}: FilterHeaderProps) => {
  const handleSortSelect = (option: Option) => {
    onSortChange?.(option);
  };

  const handleStatusSelect = (option: Option) => {
    onStatusChange?.(option);
  };

  return (
    <div className={clsx('w-full', isTablet && 'tablet:px-24')}>
      <div
        className={clsx(
          'flex items-center justify-between w-full',
          'text-left',
          'text-gray-700',
          PURCHASE_TEXT_SIZES.MEDIUM,
          'font-bold',
          PURCHASE_PADDING.CELL_Y
        )}
      >
        <p>{PURCHASE_LABELS.TITLE}</p>
        <div className={clsx('flex items-center', PURCHASE_SPACING.GAP_MEDIUM)}>
          {statusOptions && (
            <div className="relative z-dropdown">
              <DropDown
                items={statusOptions}
                placeholder="전체"
                selected={selectedStatusOption}
                onSelect={handleStatusSelect}
              />
            </div>
          )}
          {sortOptions && (
            <div className="relative z-dropdown">
              <DropDown
                items={sortOptions}
                placeholder={PURCHASE_LABELS.SORT_PLACEHOLDER}
                selected={selectedSortOption}
                onSelect={handleSortSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * 테이블 헤더 섹션 (필터 + 컬럼 헤더)
 */
interface TableHeaderSectionProps extends FilterHeaderProps {
  shouldShowTableHeader: boolean;
}

const TableHeaderSection = ({
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
  isTablet = false,
  shouldShowTableHeader,
}: TableHeaderSectionProps) => (
  <>
    <PurchaseRequestTableHeader
      sortOptions={sortOptions}
      selectedSortOption={selectedSortOption}
      onSortChange={onSortChange}
      statusOptions={statusOptions}
      selectedStatusOption={selectedStatusOption}
      onStatusChange={onStatusChange}
      isTablet={isTablet}
    />
    {shouldShowTableHeader && (
      <>
        <Divider variant="thin" className="w-full" />
        <TableColumnHeaders />
      </>
    )}
  </>
);

/**
 * 테이블 행 컴포넌트 (태블릿/데스크탑)
 */
const PurchaseRequestTableRowDesktop = ({
  item,
  onCancelClick,
  onRowClick,
}: PurchaseRequestTableRowProps) => {
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = calculateTotalPrice(item);

  const handleRowClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;
    onRowClick?.(item.id);
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onRowClick?.(item.id);
    }
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // row 클릭 이벤트 전파 방지
    if (!onCancelClick) return;
    onCancelClick(item.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        'flex items-center w-full justify-between',
        'cursor-pointer hover:bg-gray-50',
        'tablet:border-b tablet:border-gray-200 desktop:border-b desktop:border-gray-200',
        PURCHASE_HEIGHTS.TABLE_ROW,
        isUrgent && 'bg-red-100'
      )}
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
    >
      <div
        className={clsx(
          TABLE_CELL_BASE_STYLES.cell,
          COLUMN_WIDTHS.date,
          'text-gray-700 text-14 font-bold'
        )}
      >
        {formatDate(item.createdAt)}
      </div>

      <div
        className={clsx(
          TABLE_CELL_BASE_STYLES.cell,
          COLUMN_WIDTHS.product,
          'text-gray-700 text-14 min-w-0 line-clamp-2 wrap-break-word',
          'cursor-pointer',
          'hover:underline',
          'hover:text-primary-500'
        )}
      >
        {formatItemDescription(item.purchaseItems)}
      </div>

      <div className={clsx(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.price)}>
        <PriceText value={totalPrice} showUnit className="text-gray-700 text-14 font-normal" />
      </div>

      <div className={clsx(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.status)}>
        <StatusTag variant={getStatusTagVariant(item.status)} />
      </div>

      <div className={clsx(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.actions)}>
        {isPending && (
          <Button variant="secondary" onClick={handleCancelClick} className="w-126 h-40 text-12">
            {PURCHASE_LABELS.BUTTONS.CANCEL}
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * 구매 요청 목록 테이블 컴포넌트
 */
/**
 * MyPurchaseRequestListTem
 * 순수 UI 조립 레이어
 * - header / list / row / footer 컴포지션만 담당
 * - props 기반 렌더링만 수행
 */
const MyPurchaseRequestListTem = ({
  purchaseList,
  className,
  onCancelClick,
  cancelModalOpen = false,
  cancelTargetItem,
  onCancelModalClose,
  onCancelConfirm,
  currentPage,
  totalPages,
  onPageChange,
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
  isLoading = false,
  onNavigateToProducts,
  onRowClick,
  onProductClick,
  companyId,
}: MyPurchaseRequestListTemProps) => {
  const isEmpty = !purchaseList || purchaseList.length === 0;
  const shouldShowTableHeader = isLoading || !isEmpty;

  const renderEmptyState = (isMobile = false) => (
    <div
      className={clsx(
        'w-full',
        'flex justify-center',
        isMobile ? 'items-center min-h-[calc(100vh-80px)]' : 'mt-200'
      )}
    >
      <StatusNotice
        title={PURCHASE_EMPTY_MESSAGES.USER_NO_REQUESTS.TITLE}
        description={PURCHASE_EMPTY_MESSAGES.USER_NO_REQUESTS.DESCRIPTION}
        buttonText={PURCHASE_LABELS.BUTTONS.NAVIGATE_TO_PRODUCTS}
        onButtonClick={onNavigateToProducts}
      />
    </div>
  );

  const renderMobileContent = () => {
    if (isLoading) return <ListSkeletonUI rows={PURCHASE_DEFAULTS.SKELETON_ROWS} />;
    if (isEmpty) return renderEmptyState(true);

    return (
      <PurchaseRequestItemListOrg
        purchaseList={purchaseList}
        onCancel={onCancelClick}
        onRowClick={onRowClick}
        companyId={companyId}
        onProductClick={onProductClick}
      />
    );
  };

  const renderTableContent = () => {
    if (isLoading) return <ListSkeletonUI rows={PURCHASE_DEFAULTS.SKELETON_ROWS} />;
    if (isEmpty) return renderEmptyState(false);

    return (
      <div className={clsx('w-full')}>
        {purchaseList.map((item) => (
          <PurchaseRequestTableRowDesktop
            key={item.id}
            item={item}
            onCancelClick={onCancelClick}
            onRowClick={onRowClick}
          />
        ))}
      </div>
    );
  };

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
      {/* 모바일 레이아웃 */}
      <div className={clsx('tablet:hidden')}>{renderMobileContent()}</div>

      {/* 태블릿/데스크탑 레이아웃 - 테이블 */}
      <div className={clsx('hidden tablet:block', 'overflow-x-auto')}>
        <div className={clsx('w-full')}>
          {/* 헤더 - 태블릿/데스크탑 공통 */}
          <div className={clsx('hidden tablet:block')}>
            <TableHeaderSection
              sortOptions={sortOptions}
              selectedSortOption={selectedSortOption}
              onSortChange={onSortChange}
              statusOptions={statusOptions}
              selectedStatusOption={selectedStatusOption}
              onStatusChange={onStatusChange}
              isTablet
              shouldShowTableHeader={shouldShowTableHeader}
            />
          </div>

          {renderTableContent()}
        </div>
      </div>

      {/* 페이지네이션 */}
      {currentPage !== undefined && totalPages !== undefined && totalPages > 0 && onPageChange && (
        <div className={clsx('flex justify-start', 'mt-20')}>
          <PaginationBlock
            current={currentPage}
            total={totalPages}
            onPrev={onPageChange}
            onNext={onPageChange}
          />
        </div>
      )}

      {/* 취소 확인 모달 */}
      {cancelModalOpen && cancelTargetItem && onCancelModalClose && (
        <CustomModal
          open={cancelModalOpen}
          type="cancel"
          productName={cancelTargetItem.purchaseItems[0]?.products.name}
          cancelCount={Math.max(0, cancelTargetItem.purchaseItems.length - 1)}
          onClose={onCancelModalClose}
          onConfirm={onCancelConfirm}
        />
      )}
    </div>
  );
};

export default MyPurchaseRequestListTem;
