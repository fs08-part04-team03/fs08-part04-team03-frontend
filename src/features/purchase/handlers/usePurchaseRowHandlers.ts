import { useCallback } from 'react';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { usePurchaseNavigationDirect } from '@/features/purchase/hooks/usePurchaseNavigationDirect';

/**
 * 구매 요청 행 클릭 핸들러 훅
 * Props Depth 1단계: 직접 hook 사용 (하위 호환성을 위해 onRowClick도 지원)
 */
export const usePurchaseRowHandlers = (
  item: PurchaseRequestItem,
  onRowClick?: (purchaseRequestId: string) => void
) => {
  // Props Depth 1단계: 직접 hook 사용
  const navigation = usePurchaseNavigationDirect();

  const handleRowClick = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.stopPropagation();
      }
      if (onRowClick) {
        onRowClick(item.id);
      } else {
        navigation.goToPurchaseRequestDetail(item.id);
      }
    },
    [item.id, onRowClick, navigation]
  );

  const handleRowKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (onRowClick) {
          onRowClick(item.id);
        } else {
          navigation.goToPurchaseRequestDetail(item.id);
        }
      }
    },
    [item.id, onRowClick, navigation]
  );

  return { handleRowClick, handleRowKeyDown };
};
