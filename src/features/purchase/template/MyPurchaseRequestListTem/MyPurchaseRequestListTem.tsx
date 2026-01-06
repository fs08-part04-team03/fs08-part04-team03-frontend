// 내 구매 요청 내역 - MyPurchaseRequestListPage [내가 요청한 내역들만 보이는곳, 유저, 메니저, 어드민]
// GET /api/v1/purchase/user/getMyPurchases

'use client';

import { useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
} from '@/features/purchase/utils/purchase.utils';

const TABLE_CELL_BASE_STYLES = {
  header: 'text-left text-gray-700 text-14 font-bold shrink-0 py-20 pl-20',
  cell: 'shrink-0 text-left py-20 pl-20',
} as const;

const COLUMN_WIDTHS = {
  date: 'tablet:w-100 desktop:w-140',
  product: 'tablet:w-200 desktop:flex-1',
  price: 'tablet:w-100 desktop:w-140',
  status: 'tablet:w-100 desktop:w-140',
  actions: 'tablet:w-140 desktop:w-180 desktop:max-w-180',
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
  onSortChange?: (sort: string | undefined) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (status: string | undefined) => void;
  isLoading?: boolean;
}

interface PurchaseRequestTableRowProps {
  item: PurchaseRequestItem;
  onCancelClick?: (purchaseRequestId: string) => void;
}

const TableHeaderCell = ({
  children,
  widthClass,
}: {
  children: React.ReactNode;
  widthClass?: string;
}) => <div className={clsx(TABLE_CELL_BASE_STYLES.header, widthClass)}>{children}</div>;

/**
 * 테이블 헤더 (태블릿)
 */
const PurchaseRequestTableHeaderTablet = ({
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
}: {
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (sort: string | undefined) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (status: string | undefined) => void;
}) => {
  const handleSortSelect = (option: Option) => {
    const sort = option.key === 'LATEST' ? undefined : option.key;
    onSortChange?.(sort);
  };

  const handleStatusSelect = (option: Option) => {
    const status = option.key === 'ALL' ? undefined : option.key;
    onStatusChange?.(status);
  };

  return (
    <div className={clsx('w-full', 'tablet:px-24')}>
      <div
        className={clsx(
          'flex items-center justify-between w-full',
          'text-left',
          'text-gray-700',
          'text-18',
          'font-bold',
          'py-20'
        )}
      >
        <p>구매 요청 내역</p>
        <div className={clsx('flex items-center gap-12')}>
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
                placeholder="최신순"
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
 * 테이블 헤더 (데스크탑)
 */
const PurchaseRequestTableHeaderDesktop = ({
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
}: {
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (sort: string | undefined) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (status: string | undefined) => void;
}) => {
  const handleSortSelect = (option: Option) => {
    const sort = option.key === 'LATEST' ? undefined : option.key;
    onSortChange?.(sort);
  };

  const handleStatusSelect = (option: Option) => {
    const status = option.key === 'ALL' ? undefined : option.key;
    onStatusChange?.(status);
  };

  return (
    <div className={clsx('w-full')}>
      <div
        className={clsx(
          'flex items-center justify-between w-full',
          'text-left',
          'text-gray-700',
          'text-18',
          'font-bold',
          'py-20'
        )}
      >
        <p>구매 요청 내역</p>
        <div className={clsx('flex items-center gap-12')}>
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
                placeholder="최신순"
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
 * 테이블 행 컴포넌트 (태블릿/데스크탑)
 */
const PurchaseRequestTableRowDesktop = ({
  item,
  onCancelClick,
  companyId,
}: PurchaseRequestTableRowProps & { companyId?: string }) => {
  const router = useRouter();
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  // totalPrice가 0이거나 없을 경우 purchaseItems에서 계산
  const calculatedTotalPrice = item.purchaseItems.reduce(
    (sum, purchaseItem) => sum + purchaseItem.priceSnapshot * purchaseItem.quantity,
    0
  );
  const totalPrice =
    (item.totalPrice && item.totalPrice > 0 ? item.totalPrice : calculatedTotalPrice) +
    (item.shippingFee ?? 0);

  const handleRowClick = () => {
    if (!companyId) return;
    router.push(`/${companyId}/my/purchase-requests/${item.id}`);
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick();
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
        'h-100',
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
          'text-gray-700 text-14 min-w-0 line-clamp-2 wrap-break-word'
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
            요청 취소
          </Button>
        )}
      </div>
    </div>
  );
};

/**
 * 구매 요청 목록 테이블 컴포넌트
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
}: MyPurchaseRequestListTemProps) => {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  const handleNavigateToProducts = useCallback(() => {
    if (!companyId) return;
    router.push(`/${companyId}/products`);
  }, [router, companyId]);

  const isEmpty = !purchaseList || purchaseList.length === 0;
  const shouldShowTableHeader = isLoading || !isEmpty;

  const renderMobileContent = () => {
    if (isLoading) {
      return <ListSkeletonUI rows={6} />;
    }

    if (isEmpty) {
      return (
        <div
          className={clsx('w-full', 'flex justify-center items-center', 'min-h-[calc(100vh-80px)]')}
        >
          <StatusNotice
            title="구매 요청한 내역이 없어요"
            description={`상품 리스트를 둘러보고\n관리자에게 요청해보세요`}
            buttonText="상품 리스트로 이동"
            onButtonClick={handleNavigateToProducts}
          />
        </div>
      );
    }

    return (
      <PurchaseRequestItemListOrg
        purchaseList={purchaseList}
        onCancel={onCancelClick}
        companyId={companyId}
      />
    );
  };

  const renderTableContent = () => {
    if (isLoading) {
      return <ListSkeletonUI rows={6} />;
    }

    if (isEmpty) {
      return (
        <div className={clsx('w-full', 'mt-200', 'flex justify-center')}>
          <StatusNotice
            title="구매 요청한 내역이 없어요"
            description={`상품 리스트를 둘러보고\n관리자에게 요청해보세요`}
            buttonText="상품 리스트로 이동"
            onButtonClick={handleNavigateToProducts}
          />
        </div>
      );
    }

    return (
      <div className={clsx('w-full')}>
        {purchaseList.map((item) => (
          <PurchaseRequestTableRowDesktop
            key={item.id}
            item={item}
            onCancelClick={onCancelClick}
            companyId={companyId}
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
          {/* 태블릿 헤더 - 항상 표시 */}
          <div className={clsx('hidden tablet:block desktop:hidden')}>
            <PurchaseRequestTableHeaderTablet
              sortOptions={sortOptions}
              selectedSortOption={selectedSortOption}
              onSortChange={onSortChange}
              statusOptions={statusOptions}
              selectedStatusOption={selectedStatusOption}
              onStatusChange={onStatusChange}
            />
            {shouldShowTableHeader && (
              <>
                <Divider variant="thin" className="w-full" />
                <div className="flex items-center w-full justify-between h-60 tablet:border-b tablet:border-gray-200">
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.date}>구매 요청일</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.product}>상품 정보</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.price}>주문 금액</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.status}>상태</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.actions}>비고</TableHeaderCell>
                </div>
              </>
            )}
          </div>

          {/* 데스크탑 헤더 - 항상 표시 */}
          <div className={clsx('hidden desktop:block')}>
            <PurchaseRequestTableHeaderDesktop
              sortOptions={sortOptions}
              selectedSortOption={selectedSortOption}
              onSortChange={onSortChange}
              statusOptions={statusOptions}
              selectedStatusOption={selectedStatusOption}
              onStatusChange={onStatusChange}
            />
            {shouldShowTableHeader && (
              <>
                <Divider variant="thin" className="w-full" />
                <div className="flex items-center w-full justify-between h-60 tablet:border-b tablet:border-gray-200 desktop:border-b desktop:border-gray-200">
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.date}>구매 요청일</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.product}>상품 정보</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.price}>주문 금액</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.status}>상태</TableHeaderCell>
                  <TableHeaderCell widthClass={COLUMN_WIDTHS.actions}>비고</TableHeaderCell>
                </div>
              </>
            )}
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
      <CustomModal
        open={cancelModalOpen}
        type="cancel"
        productName={
          cancelTargetItem && cancelTargetItem.purchaseItems.length > 0
            ? cancelTargetItem.purchaseItems[0]?.products.name
            : undefined
        }
        cancelCount={
          cancelTargetItem && cancelTargetItem.purchaseItems.length > 1
            ? cancelTargetItem.purchaseItems.length - 1
            : 0
        }
        onClose={onCancelModalClose || (() => {})}
        onConfirm={
          onCancelConfirm
            ? ((async () => {
                await onCancelConfirm();
              }) as () => void | Promise<void>)
            : undefined
        }
      />
    </div>
  );
};

export default MyPurchaseRequestListTem;
