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
import { usePurchaseNavigationDirect } from '@/features/purchase/hooks/usePurchaseNavigationDirect';
import {
  PURCHASE_DEFAULTS,
  PURCHASE_TABLE_STYLES,
  PURCHASE_BUTTON_STYLES,
  PURCHASE_SPACING,
  PURCHASE_HEIGHTS,
  PURCHASE_PADDING,
  PURCHASE_TEXT_SIZES,
  PURCHASE_MARGINS,
  PURCHASE_LABELS,
  PURCHASE_EMPTY_MESSAGES,
} from '@/features/purchase/constants';
import type { PurchaseRequestListTemGroupedProps } from '@/features/purchase/types/purchase-request-list.types';

const TABLE_CELL_BASE_STYLES = {
  header: PURCHASE_TABLE_STYLES.CELL_BASE.HEADER,
  cell: PURCHASE_TABLE_STYLES.CELL_BASE.CELL,
} as const;

const COLUMN_WIDTHS = {
  date: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.DATE,
  product: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.PRODUCT,
  price: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.PRICE,
  requester: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.REQUESTER,
  actions: PURCHASE_TABLE_STYLES.COLUMN_WIDTHS.ACTIONS,
} as const;

export interface PurchaseRequestListTemLegacyProps {
  purchaseList: PurchaseRequestItem[];
  companyId: string;
  className?: string;
  onRejectClick?: (purchaseRequestId: string) => void;
  onApproveClick?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
  onNavigateToProducts?: () => void;
  selectedRequestId?: string | null;
  selectedRequestDetail?: PurchaseRequestItem;
  isModalDetailLoading?: boolean;
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
  onSortChange?: (option: Option) => void;
  isLoading?: boolean;
}

export type PurchaseRequestListTemProps =
  | PurchaseRequestListTemLegacyProps
  | PurchaseRequestListTemGroupedProps;

function isGroupedProps(
  props: PurchaseRequestListTemProps
): props is PurchaseRequestListTemGroupedProps {
  return 'tableState' in props && 'sortState' in props && 'modalState' in props;
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

  // Props Depth 1단계: 직접 hook 사용 (하위 호환성을 위해 onRowClick도 지원)
  const navigation = usePurchaseNavigationDirect();

  const handleRowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRowClick) {
      onRowClick(item.id);
    } else {
      navigation.goToPurchaseRequestDetail(item.id);
    }
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

      <div
        className={clsx(
          TABLE_CELL_BASE_STYLES.cell,
          COLUMN_WIDTHS.actions,
          PURCHASE_SPACING.GAP_SMALL,
          'flex'
        )}
      >
        {onRejectClick && onApproveClick && (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRejectClick}
              className={PURCHASE_BUTTON_STYLES.ACTION_BUTTON}
            >
              {PURCHASE_LABELS.BUTTONS.REJECT}
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApproveClick}
              className={PURCHASE_BUTTON_STYLES.ACTION_BUTTON}
            >
              {PURCHASE_LABELS.BUTTONS.APPROVE}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

const PurchaseRequestListTem = (props: PurchaseRequestListTemProps) => {
  // Props 정규화 (그룹화/레거시 모두 지원)
  /* eslint-disable react/destructuring-assignment */
  const {
    purchaseList,
    companyId,
    className,
    onRejectClick,
    onApproveClick,
    onRowClick,
    onNavigateToProducts,
    selectedRequestId,
    selectedRequestDetail,
    isModalDetailLoading,
    approveModalOpen,
    rejectModalOpen,
    onApproveModalClose,
    onRejectModalClose,
    onApproveSubmit,
    onRejectSubmit,
    budget,
    currentPage,
    totalPages,
    onPageChange,
    sortOptions,
    selectedSortOption,
    onSortChange,
    isLoading,
  } = isGroupedProps(props)
    ? {
        purchaseList: props.tableState.purchaseList,
        companyId: props.tableState.companyId,
        className: props.className,
        onRejectClick: props.rowHandlers.onRejectClick,
        onApproveClick: props.rowHandlers.onApproveClick,
        onRowClick: props.rowHandlers.onRowClick,
        onNavigateToProducts: props.paginationHandlers.onNavigateToProducts,
        selectedRequestId: props.modalState.selectedRequestId,
        selectedRequestDetail: props.modalState.selectedRequestDetail,
        isModalDetailLoading: props.modalState.isModalDetailLoading,
        approveModalOpen: props.modalState.approveModalOpen,
        rejectModalOpen: props.modalState.rejectModalOpen,
        onApproveModalClose: props.modalHandlers.onApproveModalClose,
        onRejectModalClose: props.modalHandlers.onRejectModalClose,
        onApproveSubmit: props.modalHandlers.onApproveSubmit,
        onRejectSubmit: props.modalHandlers.onRejectSubmit,
        budget: props.modalState.budget,
        currentPage: props.tableState.currentPage,
        totalPages: props.tableState.totalPages,
        onPageChange: props.paginationHandlers.onPageChange,
        sortOptions: props.sortState.sortOptions,
        selectedSortOption: props.sortState.selectedSortOption,
        onSortChange: props.sortState.onSortChange,
        isLoading: props.tableState.isLoading,
      }
    : {
        ...props,
        isModalDetailLoading: props.isModalDetailLoading ?? false,
        approveModalOpen: props.approveModalOpen ?? false,
        rejectModalOpen: props.rejectModalOpen ?? false,
        budget: props.budget ?? PURCHASE_DEFAULTS.BUDGET,
        currentPage: props.currentPage ?? 1,
        isLoading: props.isLoading ?? false,
      };
  /* eslint-enable react/destructuring-assignment */
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
        const imageSrc = item.products.imageUrl ? item.products.imageUrl : '';
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
      return <ListSkeletonUI rows={PURCHASE_DEFAULTS.SKELETON_ROWS} />;
    }

    if (isEmpty) {
      return (
        <div className={clsx('w-full', PURCHASE_MARGINS.EMPTY_STATE_TOP, 'flex justify-center')}>
          <StatusNotice
            title={PURCHASE_EMPTY_MESSAGES.ADMIN_NO_REQUESTS.TITLE}
            description={PURCHASE_EMPTY_MESSAGES.ADMIN_NO_REQUESTS.DESCRIPTION}
            buttonText={PURCHASE_LABELS.BUTTONS.NAVIGATE_TO_PRODUCTS}
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
          if (isLoading) return <ListSkeletonUI rows={PURCHASE_DEFAULTS.SKELETON_ROWS} />;
          if (isEmpty) {
            return (
              <div
                className={clsx('w-full', PURCHASE_MARGINS.EMPTY_STATE_TOP, 'flex justify-center')}
              >
                <StatusNotice
                  title={PURCHASE_EMPTY_MESSAGES.USER_NO_REQUESTS.TITLE}
                  description={PURCHASE_EMPTY_MESSAGES.USER_NO_REQUESTS.DESCRIPTION}
                  buttonText={PURCHASE_LABELS.BUTTONS.NAVIGATE_TO_PRODUCTS}
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
              <div
                className={clsx(
                  'flex items-center justify-between w-full text-left text-gray-700',
                  PURCHASE_TEXT_SIZES.MEDIUM,
                  'font-bold',
                  PURCHASE_PADDING.CELL_Y
                )}
              >
                <p>{PURCHASE_LABELS.TITLE}</p>
                <div className={clsx('flex items-center', PURCHASE_SPACING.GAP_MEDIUM)}>
                  {sortOptions && (
                    <div className="relative z-dropdown">
                      <DropDown
                        items={sortOptions}
                        placeholder={PURCHASE_LABELS.SORT_PLACEHOLDER}
                        selected={selectedSortOption}
                        onSelect={(option) => {
                          onSortChange?.(option);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {shouldShowTableHeader && (
                <>
                  <Divider variant="thin" className="w-full" />
                  <div
                    className={clsx(
                      'flex items-center w-full justify-between',
                      PURCHASE_HEIGHTS.TABLE_HEADER,
                      'tablet:border-b tablet:border-gray-200'
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
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.requester}>
                      {PURCHASE_LABELS.TABLE_HEADERS.REQUESTER}
                    </TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.actions}>
                      {PURCHASE_LABELS.TABLE_HEADERS.ACTIONS}
                    </TableHeaderCell>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="hidden desktop:block">
            <div className="w-full">
              <div
                className={clsx(
                  'flex items-center justify-between w-full text-left text-gray-700',
                  PURCHASE_TEXT_SIZES.MEDIUM,
                  'font-bold',
                  PURCHASE_PADDING.CELL_Y
                )}
              >
                <p>{PURCHASE_LABELS.TITLE}</p>
                <div className={clsx('flex items-center', PURCHASE_SPACING.GAP_MEDIUM)}>
                  {sortOptions && (
                    <div className="relative z-dropdown">
                      <DropDown
                        items={sortOptions}
                        placeholder={PURCHASE_LABELS.SORT_PLACEHOLDER}
                        selected={selectedSortOption}
                        onSelect={(option) => {
                          onSortChange?.(option);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {shouldShowTableHeader && (
                <>
                  <Divider variant="thin" className="w-full" />
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
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.requester}>
                      {PURCHASE_LABELS.TABLE_HEADERS.REQUESTER}
                    </TableHeaderCell>
                    <TableHeaderCell widthClass={COLUMN_WIDTHS.actions}>
                      {PURCHASE_LABELS.TABLE_HEADERS.ACTIONS}
                    </TableHeaderCell>
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
