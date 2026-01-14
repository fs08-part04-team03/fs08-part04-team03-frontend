import { useCallback } from 'react';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { logger } from '@/utils/logger';

/**
 * 구매 요청 행 클릭 핸들러 훅
 */
export const usePurchaseRowHandlers = (
  item: PurchaseRequestItem,
  onRowClick?: (purchaseRequestId: string) => void,
  companyId?: string
) => {
  const handleRowClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      if (onRowClick) {
        onRowClick(item.id);
      } else if (companyId) {
        logger.warn('[PurchaseRowHandlers] onRowClick callback이 없습니다. 핸들러를 전달해주세요.');
      }
    },
    [item.id, onRowClick, companyId]
  );

  const handleRowKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (onRowClick) {
          onRowClick(item.id);
        } else if (companyId) {
          logger.warn(
            '[PurchaseRowHandlers] onRowClick callback이 없습니다. 핸들러를 전달해주세요.'
          );
        }
      }
    },
    [item.id, onRowClick, companyId]
  );

  return { handleRowClick, handleRowKeyDown };
};
