/**
 * 내 구매 요청 테이블
 * - 테이블 헤더와 행 렌더링
 */

import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import ListSkeletonUI from '@/components/molecules/ListSkeletonUI/ListSkeletonUI';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import PurchaseRequestItemListOrg from '@/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg';
import {
  formatDate,
  formatItemDescription,
  getStatusTagVariant,
  calculateTotalPrice,
} from '@/features/purchase/utils/purchase.utils';
import {
  PURCHASE_DEFAULTS,
  PURCHASE_TABLE_STYLES,
  PURCHASE_HEIGHTS,
  PURCHASE_LABELS,
  PURCHASE_EMPTY_MESSAGES,
} from '@/features/purchase/constants';
import type {
  MyPurchaseCancelModalHandlers,
  MyPurchaseNavigationHandlers,
} from '@/features/purchase/types/my-purchase-list.types';

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

interface MyPurchaseRequestTableProps {
  purchaseList?: PurchaseRequestItem[];
  companyId?: string;
  isLoading?: boolean;
  cancelModalHandlers?: MyPurchaseCancelModalHandlers;
  navigationHandlers?: MyPurchaseNavigationHandlers;
}

const TableHeaderCell = ({
  children,
  widthClass,
}: {
  children: React.ReactNode;
  widthClass?: string;
}) => <div className={clsx(TABLE_CELL_BASE_STYLES.header, widthClass)}>{children}</div>;

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

const PurchaseRequestTableRow = ({
  item,
  onCancelClick,
  onRowClick,
}: {
  item: PurchaseRequestItem;
  onCancelClick?: (id: string) => void;
  onRowClick?: (id: string) => void;
}) => {
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
    e.stopPropagation();
    onCancelClick?.(item.id);
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
          'cursor-pointer hover:underline hover:text-primary-500'
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

export const MyPurchaseRequestTable = ({
  purchaseList,
  companyId,
  isLoading = false,
  cancelModalHandlers,
  navigationHandlers,
}: MyPurchaseRequestTableProps) => {
  const isEmpty = !purchaseList || purchaseList.length === 0;
  const shouldShowTableHeader = isLoading || !isEmpty;

  const renderEmptyState = (isMobile = false) => (
    <div
      className={clsx(
        'w-full flex justify-center',
        isMobile ? 'items-center min-h-[calc(100vh-80px)]' : 'mt-200'
      )}
    >
      <StatusNotice
        title={PURCHASE_EMPTY_MESSAGES.USER_NO_REQUESTS.TITLE}
        description={PURCHASE_EMPTY_MESSAGES.USER_NO_REQUESTS.DESCRIPTION}
        buttonText={PURCHASE_LABELS.BUTTONS.NAVIGATE_TO_PRODUCTS}
        onButtonClick={navigationHandlers?.onNavigateToProducts}
      />
    </div>
  );

  const renderTableContent = () => {
    if (isLoading) return <ListSkeletonUI rows={PURCHASE_DEFAULTS.SKELETON_ROWS} />;
    if (isEmpty) return renderEmptyState(false);

    return (
      <div className="w-full">
        {purchaseList.map((item) => (
          <PurchaseRequestTableRow
            key={item.id}
            item={item}
            onCancelClick={cancelModalHandlers?.onCancelClick}
            onRowClick={navigationHandlers?.onRowClick}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* 모바일 뷰 */}
      <div className="tablet:hidden">
        {(() => {
          if (isLoading) return <ListSkeletonUI rows={PURCHASE_DEFAULTS.SKELETON_ROWS} />;
          if (isEmpty) return renderEmptyState(true);

          return (
            <PurchaseRequestItemListOrg
              purchaseList={purchaseList}
              onCancel={cancelModalHandlers?.onCancelClick}
              onRowClick={navigationHandlers?.onRowClick}
              companyId={companyId}
              onProductClick={navigationHandlers?.onProductClick}
            />
          );
        })()}
      </div>

      {/* 태블릿/데스크톱 뷰 */}
      <div className="hidden tablet:block overflow-x-auto">
        <div className="w-full">
          {shouldShowTableHeader && <TableColumnHeaders />}
          {renderTableContent()}
        </div>
      </div>
    </>
  );
};
