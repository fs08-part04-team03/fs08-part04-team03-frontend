'use client';

import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import StatusTag from '@/components/atoms/StatusTag/StatusTag';
import {
  formatDate,
  formatItemDescription,
  getStatusTagVariant,
  calculateTotalPrice,
} from '@/features/purchase/utils/purchase.utils';
import { PURCHASE_ITEM_LIST_STYLES, PURCHASE_SPACING } from '@/features/purchase/constants';
import { usePurchaseRowHandlers } from '@/features/purchase/handlers/usePurchaseRowHandlers';
import { ProductLink } from './ProductLink';
import { ActionButtons } from './ActionButtons';

interface PurchaseRequestItemRowMobileProps {
  item: PurchaseRequestItem;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
  companyId?: string;
  onProductClick?: (productId: number) => void;
}

/**
 * 모바일 레이아웃 아이템 행
 */
export const PurchaseRequestItemRowMobile = ({
  item,
  onReject,
  onApprove,
  onCancel,
  onRowClick,
  companyId,
  onProductClick,
}: PurchaseRequestItemRowMobileProps) => {
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = calculateTotalPrice(item);
  const { handleRowClick, handleRowKeyDown } = usePurchaseRowHandlers(item, onRowClick, companyId);

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        PURCHASE_ITEM_LIST_STYLES.ROW.MOBILE.BASE,
        isUrgent && PURCHASE_ITEM_LIST_STYLES.ROW.MOBILE.URGENT,
        PURCHASE_ITEM_LIST_STYLES.ROW.MOBILE.HOVER
      )}
      onClick={(e) => handleRowClick(e)}
      onKeyDown={handleRowKeyDown}
    >
      {/* 첫 번째 줄: 2개 컬럼 (왼쪽: 날짜/제목/금액, 오른쪽: 상태) */}
      <div className={clsx('flex items-start', 'w-full', PURCHASE_SPACING.GAP_MEDIUM)}>
        {/* 왼쪽 컬럼: 날짜, 제목, 금액 */}
        <div className={clsx('flex flex-col', 'flex-1', 'min-w-0', 'gap-4')}>
          {/* 날짜 */}
          <div
            className={clsx(
              PURCHASE_ITEM_LIST_STYLES.CELL.TEXT,
              PURCHASE_ITEM_LIST_STYLES.CELL.BOLD
            )}
          >
            {formatDate(item.createdAt)}
          </div>

          {/* 아이템 설명 - 클릭 가능 */}
          <ProductLink
            item={item}
            className={PURCHASE_ITEM_LIST_STYLES.CELL.TEXT}
            onProductClick={onProductClick}
          >
            {formatItemDescription(item.purchaseItems)}
          </ProductLink>

          {/* 가격 (모바일에서는 원 포함) */}
          <div>
            <PriceText
              value={totalPrice}
              showUnit
              className={clsx(
                PURCHASE_ITEM_LIST_STYLES.CELL.TEXT,
                PURCHASE_ITEM_LIST_STYLES.CELL.NORMAL
              )}
            />
          </div>
        </div>

        {/* 오른쪽 컬럼: 상태 태그 */}
        <div className={clsx('shrink-0', 'flex', 'items-start')}>
          <StatusTag variant={getStatusTagVariant(item.status)} />
        </div>
      </div>

      {/* 두 번째 줄 (반려/승인 버튼 또는 취소 버튼 - 대기중일 때만) */}
      <ActionButtons
        isPending={isPending}
        onReject={onReject}
        onApprove={onApprove}
        onCancel={onCancel}
        purchaseRequestId={item.id}
        variant="mobile"
      />
    </div>
  );
};
