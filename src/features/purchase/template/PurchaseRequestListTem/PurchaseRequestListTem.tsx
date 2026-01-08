'use client';

import { useMemo } from 'react';
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
import ListSkeletonUI from '@/components/molecules/ListSkeletonUI/ListSkeletonUI';
import { formatDate, formatItemDescription } from '@/features/purchase/utils/purchase.utils';

const TABLE_CELL_BASE_STYLES = {
  header: 'text-left text-gray-700 text-14 font-bold shrink-0 py-20 pl-20',
  cell: 'shrink-0 text-left py-20 pl-20',
} as const;

const COLUMN_WIDTHS = {
  date: 'tablet:w-100 desktop:w-140',
  product: 'tablet:w-200 desktop:flex-1',
  price: 'tablet:w-100 desktop:w-140',
  requester: 'tablet:w-100 desktop:w-140',
  actions: 'tablet:w-140 desktop:w-180 desktop:max-w-180',
} as const;

export interface PurchaseRequestListTemProps {
  purchaseList: PurchaseRequestItem[];
  companyId: string;
  className?: string;
  onRejectClick?: (purchaseRequestId: string) => void;
  onApproveClick?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
  onNavigateToProducts?: () => void;
  selectedRequestId?: string | null;
  selectedRequestDetail?: PurchaseRequestItem; // 모달용 상세 데이터
  isModalDetailLoading?: boolean; // 모달 상세 데이터 로딩 중
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
  isLoading?: boolean;
}

interface PurchaseRequestTableRowProps {
  item: PurchaseRequestItem;
  companyId: string;
  onRejectClick?: (purchaseRequestId: string) => void;
  onApproveClick?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
}

const TableHeaderCell = ({
  children,
  widthClass,
}: {
  children: React.ReactNode;
  widthClass?: string;
}) => <div className={clsx(TABLE_CELL_BASE_STYLES.header, widthClass)}>{children}</div>;

const PurchaseRequestTableRowDesktop = ({
  item,
  companyId,
  onRejectClick,
  onApproveClick,
  onRowClick,
}: PurchaseRequestTableRowProps) => {
  const isUrgent = item.urgent === true;
  const totalPrice = (item.itemsTotalPrice ?? item.totalPrice ?? 0) + item.shippingFee;

  const handleRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRowClick?.(item.id);
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onRowClick?.(item.id);
    }
  };

  const handleRejectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRejectClick?.(item.id);
  };

  const handleApproveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApproveClick?.(item.id);
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

      <div className={clsx(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.requester)}>
        <UserProfile
          name={item.requester.name}
          company={{ name: item.requester.company || '' }}
          profileHref={`/${companyId}/my/profile`}
          variant="nameOnly"
        />
      </div>

      <div className={clsx(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.actions, 'flex gap-8')}>
        {onRejectClick && onApproveClick && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRejectClick}
              className="w-60 py-8 px-0 text-10!"
            >
              반려
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApproveClick}
              className="w-60 py-8 px-0 text-10!"
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
  companyId,
  className,
  onRejectClick,
  onApproveClick,
  onRowClick,
  onNavigateToProducts,
  selectedRequestId,
  selectedRequestDetail,
  isModalDetailLoading = false,
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
  isLoading = false,
}: PurchaseRequestListTemProps) => {
  const finalTotalPages = totalPages ?? 1;

  // 모달용 상세 데이터가 있으면 우선 사용, 없으면 목록에서 찾기
  const selectedRequest =
    selectedRequestDetail ||
    (selectedRequestId ? purchaseList.find((item) => item.id === selectedRequestId) : null);

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
      items: selectedRequest.purchaseItems.map((item, index) => {
        // 프록시 API를 통해 이미지 로드 (CORS 방지)
        const imageSrc = item.products.image
          ? `/api/product/image?key=${encodeURIComponent(item.products.image)}`
          : '';
        return {
          id: index,
          title: item.products.name,
          price: item.priceSnapshot,
          quantity: item.quantity,
          imageSrc,
        };
      }),
      deliveryFee: selectedRequest.shippingFee,
      budget,
    };
  }, [selectedRequest, budget]);

  const isEmpty = purchaseList.length === 0;
  const shouldShowTableHeader = isLoading || !isEmpty;

  const renderTableContent = () => {
    if (isLoading) {
      return <ListSkeletonUI rows={6} />;
    }

    if (isEmpty) {
      return (
        <div className="w-full mt-200 flex justify-center">
          <StatusNotice
            title="요청 내역이 없어요"
            description="상품 리스트를 둘러보고
상품을 담아보세요"
            buttonText="상품 리스트로 이동"
            onButtonClick={onNavigateToProducts}
          />
        </div>
      );
    }

    return (
      <div className="w-full">
        {purchaseList.map((item) => (
          <PurchaseRequestTableRowDesktop
            key={item.id}
            item={item}
            companyId={companyId}
            onRejectClick={onRejectClick}
            onApproveClick={onApproveClick}
            onRowClick={onRowClick}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={clsx('w-full', className)}>
      {/* 모바일 뷰 */}
      <div className="tablet:hidden">
        {(() => {
          if (isLoading) return <ListSkeletonUI rows={6} />;
          if (isEmpty) {
            return (
              <div className="w-full mt-200 flex justify-center">
                <StatusNotice
                  title="구매 요청한 내역이 없어요"
                  description={`상품 리스트를 둘러보고\n관리자에게 요청해보세요`}
                  buttonText="상품 리스트로 이동"
                  onButtonClick={onNavigateToProducts}
                />
              </div>
            );
          }
          return (
            <PurchaseRequestItemListOrg
              purchaseList={purchaseList}
              onReject={onRejectClick}
              onApprove={onApproveClick}
              onRowClick={onRowClick}
              companyId={companyId}
            />
          );
        })()}
      </div>

      {/* 태블릿/데스크톱 뷰 */}
      <div className="hidden tablet:block overflow-x-auto">
        <div className="w-full">
          {/* 헤더 - 항상 표시 (빈 리스트일 때는 제목과 드롭다운만) */}
          <div className="hidden tablet:block desktop:hidden">
            <div className="w-full">
              <div className="flex items-center justify-between w-full text-left text-gray-700 text-18 font-bold py-20">
                <p>구매 요청 내역</p>
                <div className="flex items-center gap-12">
                  {sortOptions && (
                    <div className="relative z-dropdown">
                      <DropDown
                        items={sortOptions}
                        placeholder="최신순"
                        selected={selectedSortOption}
                        onSelect={(option) => {
                          // 백엔드 API 스펙에 맞게 createdAt, updatedAt, totalPrice 값 그대로 전달
                          onSortChange?.(option.key);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {shouldShowTableHeader && (
                <>
                  <Divider variant="thin" className="w-full" />
                  <div className="flex items-center w-full justify-between h-60 tablet:border-b tablet:border-gray-200">
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.date}>구매 요청일</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.product}>상품 정보</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.price}>주문 금액</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.requester}>요청인</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.actions}>비고</TableHeaderCell>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hidden desktop:block">
            <div className="w-full">
              <div className="flex items-center justify-between w-full text-left text-gray-700 text-18 font-bold py-20">
                <p>구매 요청 내역</p>
                <div className="flex items-center gap-12">
                  {sortOptions && (
                    <div className="relative z-dropdown">
                      <DropDown
                        items={sortOptions}
                        placeholder="최신순"
                        selected={selectedSortOption}
                        onSelect={(option) => {
                          // 백엔드 API 스펙에 맞게 createdAt, updatedAt, totalPrice 값 그대로 전달
                          onSortChange?.(option.key);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {shouldShowTableHeader && (
                <>
                  <Divider variant="thin" className="w-full" />
                  <div className="flex items-center w-full justify-between h-60 tablet:border-b tablet:border-gray-200 desktop:border-b desktop:border-gray-200">
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.date}>구매 요청일</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.product}>상품 정보</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.price}>주문 금액</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.requester}>요청인</TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.actions}>비고</TableHeaderCell>
                  </div>
                </>
              )}
            </div>
          </div>

          {renderTableContent()}
        </div>
      </div>

      {/* 페이지네이션 */}
      {!isEmpty && !isLoading && finalTotalPages > 0 && onPageChange && (
        <div className="flex justify-start mt-20">
          <PaginationBlock
            current={currentPage}
            total={finalTotalPages}
            onPrev={onPageChange}
            onNext={onPageChange}
          />
        </div>
      )}

      {/* 승인 모달 */}
      {modalData && !isModalDetailLoading && (
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

      {/* 반려 모달 */}
      {modalData && !isModalDetailLoading && (
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
