'use client';

import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PriceText from '@/components/atoms/PriceText/PriceText';
import {
  formatDate,
  formatItemDescription,
  calculateTotalPrice,
} from '@/features/purchase/utils/purchase.utils';
import { PURCHASE_ITEM_LIST_STYLES } from '@/features/purchase/constants';
import { usePurchaseRowHandlers } from '@/features/purchase/handlers/usePurchaseRowHandlers';
import { ProductLink } from './ProductLink';
import { ActionButtons } from './ActionButtons';

interface PurchaseRequestItemRowDesktopProps {
  item: PurchaseRequestItem;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
  companyId?: string;
  onProductClick?: (productId: number) => void;
}

/**
 * 태블릿/데스크탑 레이아웃 아이템 행
 */
export const PurchaseRequestItemRowDesktop = ({
  item,
  onReject,
  onApprove,
  onCancel,
  onRowClick,
  companyId,
  onProductClick,
}: PurchaseRequestItemRowDesktopProps) => {
  const isPending = item.status === 'PENDING';
  const isUrgent = item.urgent === true;
  const totalPrice = calculateTotalPrice(item);
  const { handleRowClick, handleRowKeyDown } = usePurchaseRowHandlers(item, onRowClick, companyId);

  return (
    <div
      role="button"
      tabIndex={0}
      className={clsx(
        PURCHASE_ITEM_LIST_STYLES.ROW.DESKTOP.BASE,
        PURCHASE_ITEM_LIST_STYLES.ROW.DESKTOP.GAP,
        isUrgent && PURCHASE_ITEM_LIST_STYLES.ROW.DESKTOP.URGENT,
        PURCHASE_ITEM_LIST_STYLES.ROW.DESKTOP.HOVER
      )}
      onClick={(e) => handleRowClick(e)}
      onKeyDown={handleRowKeyDown}
    >
      {/* 구매 요청일 */}
      <div
        className={clsx(
          PURCHASE_ITEM_LIST_STYLES.CELL.DATE.BASE,
          PURCHASE_ITEM_LIST_STYLES.CELL.DATE.TABLET,
          PURCHASE_ITEM_LIST_STYLES.CELL.DATE.DESKTOP
        )}
      >
        {formatDate(item.createdAt)}
      </div>

      {/* 상품 정보 - 클릭 가능 */}
      <ProductLink
        item={item}
        className={clsx(
          PURCHASE_ITEM_LIST_STYLES.CELL.PRODUCT.BASE,
          PURCHASE_ITEM_LIST_STYLES.CELL.PRODUCT.TABLET,
          PURCHASE_ITEM_LIST_STYLES.CELL.PRODUCT.DESKTOP
        )}
        onProductClick={onProductClick}
      >
        {formatItemDescription(item.purchaseItems)}
      </ProductLink>

      {/* 주문 금액 */}
      <div
        className={clsx(
          PURCHASE_ITEM_LIST_STYLES.CELL.PRICE.BASE,
          PURCHASE_ITEM_LIST_STYLES.CELL.PRICE.TABLET,
          PURCHASE_ITEM_LIST_STYLES.CELL.PRICE.DESKTOP
        )}
      >
        <PriceText
          value={totalPrice}
          showUnit
          className={clsx(
            PURCHASE_ITEM_LIST_STYLES.CELL.TEXT,
            PURCHASE_ITEM_LIST_STYLES.CELL.NORMAL
          )}
        />
      </div>

      {/* 비고 */}
      {isPending && (
        <div
          className={clsx(
            PURCHASE_ITEM_LIST_STYLES.CELL.ACTIONS.BASE,
            PURCHASE_ITEM_LIST_STYLES.CELL.ACTIONS.TABLET,
            PURCHASE_ITEM_LIST_STYLES.CELL.ACTIONS.DESKTOP
          )}
        >
          <ActionButtons
            isPending={isPending}
            onReject={onReject}
            onApprove={onApprove}
            onCancel={onCancel}
            purchaseRequestId={item.id}
            variant="desktop"
          />
        </div>
      )}
    </div>
  );
};
