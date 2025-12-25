'use client';

import { useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import { Divider } from '@/components/atoms/Divider/Divider';
import PurchaseRequestItemListOrg from '@/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg';
import DropDown, { type Option } from '@/components/atoms/DropDown/DropDown';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import ApprovalRequestModal from '@/components/molecules/ApprovalRequestModal/ApprovalRequestModal';
import { formatDate, formatItemDescription } from '@/features/purchase/utils/purchase.utils';

const TABLE_CELL_BASE_STYLES = {
  header: 'text-left text-gray-700 text-14 font-bold shrink-0 py-20 tablet:px-0 desktop:px-40',
  cell: 'shrink-0 text-left py-20 tablet:px-0 desktop:px-40',
} as const;

const COLUMN_WIDTHS = {
  date: 'tablet:w-100 desktop:w-180',
  product: 'tablet:w-140 desktop:w-260',
  price: 'tablet:w-100 desktop:w-180',
  requester: 'tablet:w-100 desktop:w-180',
} as const;

export interface PurchaseRequestListTemProps {
  purchaseList: PurchaseRequestItem[];
  className?: string;
  onRejectClick?: (purchaseRequestId: string) => void;
  onApproveClick?: (purchaseRequestId: string) => void;
  selectedRequestId?: string | null;
  approveModalOpen?: boolean;
  rejectModalOpen?: boolean;
  onApproveModalClose?: () => void;
  onRejectModalClose?: () => void;
  onApproveSubmit?: (message: string) => void | Promise<void>;
  onRejectSubmit?: (message: string) => void | Promise<void>;
  budget?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (sort: string | undefined) => void;
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (status: string | undefined) => void;
}

interface PurchaseRequestTableRowProps {
  item: PurchaseRequestItem;
  onRejectClick?: (purchaseRequestId: string) => void;
  onApproveClick?: (purchaseRequestId: string) => void;
}

const TableHeaderCell = ({
  children,
  widthClass,
}: {
  children: React.ReactNode;
  widthClass?: string;
}) => <div className={clsx(TABLE_CELL_BASE_STYLES.header, widthClass)}>{children}</div>;

const PurchaseRequestTableHeaderTablet = () => (
  <div className="w-full">
    <div className="flex items-center w-full gap-16 tablet:gap-24 desktop:gap-32">
      <TableHeaderCell widthClass={COLUMN_WIDTHS.date}>구매 요청일</TableHeaderCell>
      <TableHeaderCell widthClass={COLUMN_WIDTHS.product}>상품 정보</TableHeaderCell>
      <TableHeaderCell widthClass={COLUMN_WIDTHS.price}>주문 금액</TableHeaderCell>
      <TableHeaderCell widthClass={COLUMN_WIDTHS.requester}>요청인</TableHeaderCell>
      <TableHeaderCell>비고</TableHeaderCell>
    </div>
  </div>
);

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
    <div className="w-full">
      <div className="flex items-center justify-between w-full text-left text-gray-700 text-18 font-bold py-20">
        <p>구매 요청 내역</p>
        <div className="flex items-center gap-12">
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
      <div className="flex items-center w-full gap-16 tablet:gap-24 desktop:gap-32">
        <TableHeaderCell widthClass={COLUMN_WIDTHS.date}>구매 요청일</TableHeaderCell>
        <TableHeaderCell widthClass={COLUMN_WIDTHS.product}>상품 정보</TableHeaderCell>
        <TableHeaderCell widthClass={COLUMN_WIDTHS.price}>주문 금액</TableHeaderCell>
        <TableHeaderCell widthClass={COLUMN_WIDTHS.requester}>요청인</TableHeaderCell>
        <TableHeaderCell>비고</TableHeaderCell>
      </div>
    </div>
  );
};

const PurchaseRequestTableRowDesktop = ({
  item,
  onRejectClick,
  onApproveClick,
  companyId,
}: PurchaseRequestTableRowProps & { companyId?: string }) => {
  const router = useRouter();
  const isUrgent = item.urgent === true;
  const totalPrice = item.totalPrice + item.shippingFee;

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

  const handleRejectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onRejectClick) return;
    onRejectClick(item.id);
  };

  const handleApproveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onApproveClick) return;
    onApproveClick(item.id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        'flex items-center w-full gap-16 tablet:gap-24 desktop:gap-32',
        'cursor-pointer hover:bg-gray-50',
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

      <div className={clsx(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.requester)}>
        <UserProfile
          name={item.requester.name}
          company={{ name: item.requester.company || '' }}
          profileHref={companyId ? `/${companyId}/my/profile` : undefined}
          variant="nameOnly"
        />
      </div>

      <div className={clsx(TABLE_CELL_BASE_STYLES.cell, 'flex gap-8')}>
        {onRejectClick && onApproveClick && (
          <>
            <Button
              variant="secondary"
              onClick={handleRejectClick}
              className="h-44 tablet:w-80 desktop:w-80"
            >
              반려
            </Button>
            <Button
              variant="primary"
              onClick={handleApproveClick}
              className="h-44 tablet:w-80 desktop:w-80"
            >
              승인
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const PurchaseRequestListTem = ({
  purchaseList,
  className,
  onRejectClick,
  onApproveClick,
  selectedRequestId,
  approveModalOpen = false,
  rejectModalOpen = false,
  onApproveModalClose,
  onRejectModalClose,
  onApproveSubmit,
  onRejectSubmit,
  budget = 2000000,
  currentPage = 1,
  totalPages,
  onPageChange,
  sortOptions,
  selectedSortOption,
  onSortChange,
  statusOptions,
  selectedStatusOption,
  onStatusChange,
}: PurchaseRequestListTemProps) => {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  const finalTotalPages = totalPages ?? 1;

  const handleNavigateToProducts = useCallback(() => {
    if (!companyId) return;
    router.push(`/${companyId}/products`);
  }, [router, companyId]);

  const selectedRequest = selectedRequestId
    ? purchaseList.find((item) => item.id === selectedRequestId)
    : null;

  const modalData = useMemo(() => {
    if (!selectedRequest) return null;

    return {
      user: {
        name: selectedRequest.requester.name,
        company: {
          name:
            'company' in selectedRequest.requester &&
            selectedRequest.requester.company &&
            typeof selectedRequest.requester.company === 'string'
              ? selectedRequest.requester.company
              : '',
        },
        avatarSrc:
          'avatarSrc' in selectedRequest.requester &&
          selectedRequest.requester.avatarSrc &&
          typeof selectedRequest.requester.avatarSrc === 'string'
            ? selectedRequest.requester.avatarSrc
            : undefined,
      },
      items: selectedRequest.purchaseItems.map((item, index) => ({
        id: index,
        title: item.products.name,
        price: item.priceSnapshot,
        quantity: item.quantity,
      })),
      deliveryFee: selectedRequest.shippingFee,
      budget,
    };
  }, [selectedRequest, budget]);

  return (
    <div className={clsx('w-full desktop:max-w-1400 desktop:mx-auto', className)}>
      <div className="tablet:hidden">
        {purchaseList.length === 0 ? (
          <div className="w-full mt-200 flex justify-center">
            <StatusNotice
              title="구매 요청한 내역이 없어요"
              description={`상품 리스트를 둘러보고\n관리자에게 요청해보세요`}
              buttonText="상품 리스트로 이동"
              onButtonClick={handleNavigateToProducts}
            />
          </div>
        ) : (
          <PurchaseRequestItemListOrg
            purchaseList={purchaseList}
            onReject={onRejectClick}
            onApprove={onApproveClick}
            companyId={companyId}
          />
        )}
      </div>

      <div className="hidden tablet:block overflow-x-auto">
        <div className="w-full">
          {purchaseList.length === 0 ? (
            <>
              <div className="hidden desktop:block">
                <div className="w-full">
                  <div className="flex items-center justify-between w-full text-left text-gray-700 text-18 font-bold py-20">
                    <p>구매 요청 내역</p>
                    <div className="flex items-center gap-12">
                      {statusOptions && (
                        <div className="relative z-dropdown">
                          <DropDown
                            items={statusOptions}
                            placeholder="전체"
                            selected={selectedStatusOption}
                            onSelect={(option) => {
                              const status = option.key === 'ALL' ? undefined : option.key;
                              onStatusChange?.(status);
                            }}
                          />
                        </div>
                      )}
                      {sortOptions && (
                        <div className="relative z-dropdown">
                          <DropDown
                            items={sortOptions}
                            placeholder="최신순"
                            selected={selectedSortOption}
                            onSelect={(option) => {
                              const sort = option.key === 'LATEST' ? undefined : option.key;
                              onSortChange?.(sort);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-200 flex justify-center">
                <StatusNotice
                  title="구매 요청한 내역이 없어요"
                  description={`상품 리스트를 둘러보고\n관리자에게 요청해보세요`}
                  buttonText="상품 리스트로 이동"
                  onButtonClick={handleNavigateToProducts}
                />
              </div>
            </>
          ) : (
            <>
              <div className="hidden tablet:block desktop:hidden">
                <PurchaseRequestTableHeaderTablet />
              </div>

              <div className="hidden desktop:block">
                <PurchaseRequestTableHeaderDesktop
                  sortOptions={sortOptions}
                  selectedSortOption={selectedSortOption}
                  onSortChange={onSortChange}
                  statusOptions={statusOptions}
                  selectedStatusOption={selectedStatusOption}
                  onStatusChange={onStatusChange}
                />
              </div>

              <Divider variant="thin" className="w-full" />

              <div className="w-full">
                {purchaseList.map((item) => (
                  <PurchaseRequestTableRowDesktop
                    key={item.id}
                    item={item}
                    onRejectClick={onRejectClick}
                    onApproveClick={onApproveClick}
                    companyId={companyId}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {purchaseList.length > 0 && finalTotalPages > 0 && onPageChange && (
        <div className="flex justify-start mt-20">
          <PaginationBlock
            current={currentPage}
            total={finalTotalPages}
            onPrev={onPageChange}
            onNext={onPageChange}
          />
        </div>
      )}

      {modalData && (
        <ApprovalRequestModal
          open={approveModalOpen}
          onClose={onApproveModalClose || (() => {})}
          onSubmit={onApproveSubmit || (async () => {})}
          user={modalData.user}
          items={modalData.items}
          deliveryFee={modalData.deliveryFee}
          budget={modalData.budget}
          action="approve"
        />
      )}

      {modalData && (
        <ApprovalRequestModal
          open={rejectModalOpen}
          onClose={onRejectModalClose || (() => {})}
          onSubmit={onRejectSubmit || (async () => {})}
          user={modalData.user}
          items={modalData.items}
          deliveryFee={modalData.deliveryFee}
          budget={modalData.budget}
          action="reject"
        />
      )}
    </div>
  );
};

export default PurchaseRequestListTem;
