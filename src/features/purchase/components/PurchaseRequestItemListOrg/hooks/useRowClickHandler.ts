import { useRouter } from 'next/navigation';
import { logger } from '@/utils/logger';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

/**
 * 행 클릭 핸들러 훅
 */
export const useRowClickHandler = (
  item: PurchaseRequestItem,
  onRowClick?: (purchaseRequestId: string) => void,
  companyId?: string
) => {
  const router = useRouter();

  const navigateToDetail = () => {
    if (onRowClick) {
      onRowClick(item.id);
    } else if (companyId) {
      router.push(`/${companyId}/my/purchase-requests/${item.id}`);
    } else {
      logger.warn('companyId가 없어서 이동할 수 없습니다.');
    }
  };

  const handleRowClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    navigateToDetail();
  };

  const handleRowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      navigateToDetail();
    }
  };

  return { handleRowClick, handleRowKeyDown };
};
