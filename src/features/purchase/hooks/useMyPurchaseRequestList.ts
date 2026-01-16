/**
 * 내 구매 요청 목록을 위한 통합 커스텀 훅
 * Props Drilling 개선 - 상태와 핸들러를 그룹화하여 관리
 */

import { useState, useCallback } from 'react';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import { usePurchaseNavigation } from '@/features/purchase/handlers/usePurchaseNavigation';
import { useCancelPurchaseRequest } from '@/features/purchase/queries/purchase.queries';
import type {
  MyPurchaseCancelModalState,
  MyPurchaseCancelModalHandlers,
  MyPurchasePaginationState,
  MyPurchaseSortState,
  MyPurchaseFilterState,
  MyPurchaseNavigationHandlers,
} from '@/features/purchase/types/my-purchase-list.types';

interface UseMyPurchaseRequestListParams {
  companyId: string | undefined;
  defaultSize: number;
  defaultSortKey: string;
  triggerToast: (variant: 'error' | 'success' | 'custom', message: string) => void;
  sortOptions: Option[];
  statusOptions: Option[];
  purchaseList: PurchaseRequestItem[] | undefined;
  sort?: string;
  status?: string;
  successMessage: string;
  errorMessage: string;
}

/**
 * 내 구매 요청 목록의 모든 상태와 핸들러를 통합 관리하는 훅
 */
export const useMyPurchaseRequestList = ({
  companyId,
  defaultSize,
  defaultSortKey,
  triggerToast,
  sortOptions,
  statusOptions,
  purchaseList,
  sort,
  status,
  successMessage,
  errorMessage,
}: UseMyPurchaseRequestListParams) => {
  // 페이지네이션
  const {
    params: paginationParams,
    handlePageChange,
    handleSortChange: handleSortChangeBase,
    handleStatusChange: handleStatusChangeBase,
  } = usePaginationParams({ defaultSize, defaultSortKey });

  // 모달 상태
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTargetItem, setCancelTargetItem] = useState<PurchaseRequestItem | null>(null);

  // Mutation
  const cancelMutation = useCancelPurchaseRequest();

  // 네비게이션
  const navigation = usePurchaseNavigation(companyId);

  // 정렬 옵션 선택
  const selectedSortOption =
    sort && sort !== defaultSortKey
      ? sortOptions.find((opt) => opt.key === sort)
      : sortOptions.find((opt) => opt.key === defaultSortKey);

  // 상태 옵션 선택
  const selectedStatusOption =
    status && status !== 'ALL'
      ? statusOptions.find((opt) => opt.key === status)
      : statusOptions.find((opt) => opt.key === 'ALL');

  // 취소 모달 핸들러
  const handleCancelClick = useCallback(
    (purchaseRequestId: string) => {
      if (!purchaseList) return;
      const item = purchaseList.find((p) => p.id === purchaseRequestId);
      if (item) {
        setCancelTargetItem(item);
        setCancelModalOpen(true);
      }
    },
    [purchaseList]
  );

  const handleCancelModalClose = useCallback(() => {
    setCancelModalOpen(false);
    setCancelTargetItem(null);
  }, []);

  const handleCancelConfirm = useCallback(() => {
    if (!cancelTargetItem) return;

    cancelMutation.mutate(
      { purchaseRequestId: cancelTargetItem.id },
      {
        onSuccess: () => {
          setCancelModalOpen(false);
          setCancelTargetItem(null);
          triggerToast('custom', successMessage);
        },
        onError: () => {
          triggerToast('error', errorMessage);
          setCancelModalOpen(false);
          setCancelTargetItem(null);
        },
      }
    );
  }, [cancelTargetItem, cancelMutation, triggerToast, successMessage, errorMessage]);

  // 정렬 변경
  const handleSortChange = useCallback(
    (option: Option) => {
      const sortKey = option.key === defaultSortKey ? undefined : option.key;
      handleSortChangeBase(sortKey);
    },
    [handleSortChangeBase, defaultSortKey]
  );

  // 필터 변경
  const handleStatusChange = useCallback(
    (option: Option) => {
      const statusKey = option.key === 'ALL' ? undefined : option.key;
      handleStatusChangeBase(statusKey);
    },
    [handleStatusChangeBase]
  );

  // 네비게이션 핸들러
  // onRowClick과 onProductClick은 각 컴포넌트에서 직접 hook을 사용하므로 제거됨
  const handleNavigateToProducts = useCallback(() => {
    navigation.goToProducts();
  }, [navigation]);

  // 모달 상태 그룹
  const cancelModalState: MyPurchaseCancelModalState = {
    cancelModalOpen,
    cancelTargetItem,
  };

  // 모달 핸들러 그룹
  const cancelModalHandlers: MyPurchaseCancelModalHandlers = {
    onCancelClick: handleCancelClick,
    onCancelModalClose: handleCancelModalClose,
    onCancelConfirm: handleCancelConfirm,
  };

  // 페이지네이션 상태 그룹
  const paginationState: MyPurchasePaginationState = {
    onPageChange: handlePageChange,
  };

  // 정렬 상태 그룹
  const sortState: MyPurchaseSortState = {
    sortOptions,
    selectedSortOption,
    onSortChange: handleSortChange,
  };

  // 필터 상태 그룹
  const filterState: MyPurchaseFilterState = {
    statusOptions,
    selectedStatusOption,
    onStatusChange: handleStatusChange,
  };

  // 네비게이션 핸들러 그룹
  // onRowClick과 onProductClick은 각 컴포넌트에서 직접 hook을 사용하므로 제거됨
  const navigationHandlers: MyPurchaseNavigationHandlers = {
    onNavigateToProducts: handleNavigateToProducts,
  };

  return {
    // 기존 반환값 (백엔드 쿼리용)
    paginationParams,

    // 그룹화된 상태와 핸들러
    cancelModalState,
    cancelModalHandlers,
    paginationState,
    sortState,
    filterState,
    navigationHandlers,
  };
};
