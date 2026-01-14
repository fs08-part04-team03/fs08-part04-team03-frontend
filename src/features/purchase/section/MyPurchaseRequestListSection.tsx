'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import MyPurchaseRequestListTem from '@/features/purchase/template/MyPurchaseRequestListTem/MyPurchaseRequestListTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import {
  PURCHASE_REQUEST_STATUS_OPTIONS,
  SUCCESS_MESSAGES,
  PURCHASE_ERROR_MESSAGES,
  ERROR_MESSAGES,
} from '@/constants';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';
import { useToast } from '@/hooks/useToast';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import {
  useMyPurchases,
  useCancelPurchaseRequest,
} from '@/features/purchase/queries/purchase.queries';
import { PURCHASE_DEFAULTS } from '@/features/purchase/constants/defaults';
import { usePurchaseNavigation } from '@/features/purchase/handlers/usePurchaseNavigation';

/**
 * MyPurchaseRequestListSection
 * 내 구매 요청 목록 데이터/상태 결정 레이어
 * - 내 구매 요청 목록 API 호출
 * - loading / error / empty 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const MyPurchaseRequestListSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;
  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // usePaginationParams 훅 사용
  const {
    params: paginationParams,
    handlePageChange,
    handleSortChange,
    handleStatusChange,
  } = usePaginationParams({ defaultSize: 6, defaultSortKey: 'LATEST' });

  const { page, size, status, sort } = paginationParams;

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTargetItem, setCancelTargetItem] = useState<PurchaseRequestItem | null>(null);

  // 핸들러 훅 사용
  const navigation = usePurchaseNavigation(companyId);

  const selectedSortOption =
    sort && sort !== DEFAULT_SORT_KEY
      ? COMMON_SORT_OPTIONS.find((opt) => opt.key === sort)
      : COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);

  const selectedStatusOption =
    status && status !== 'ALL'
      ? PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === status)
      : PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === 'ALL');

  const {
    data,
    isLoading,
    error: queryError,
  } = useMyPurchases({
    page,
    size,
    status,
    sort,
  });

  const cancelMutation = useCancelPurchaseRequest();

  const handleCancelClick = useCallback(
    (purchaseRequestId: string) => {
      if (!data) return;
      const item = data.purchaseList.find((p) => p.id === purchaseRequestId);
      if (item) {
        setCancelTargetItem(item);
        setCancelModalOpen(true);
      }
    },
    [data]
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
          // mutation의 onSuccess에서 이미 invalidateQueries를 호출하므로
          // 여기서는 추가 작업 없이 UI만 업데이트
          setCancelModalOpen(false);
          setCancelTargetItem(null);
          triggerToast('custom', SUCCESS_MESSAGES.PURCHASE_CANCELLED);
        },
        onError: () => {
          triggerToast('error', PURCHASE_ERROR_MESSAGES.CANCEL_FAILED);
          setCancelModalOpen(false);
          setCancelTargetItem(null);
        },
      }
    );
  }, [cancelTargetItem, cancelMutation, triggerToast]);

  const handleSortChangeWithOption = useCallback(
    (option: Option) => {
      const sortKey = option.key === 'LATEST' ? undefined : option.key;
      handleSortChange(sortKey);
    },
    [handleSortChange]
  );

  const handleStatusChangeWithOption = useCallback(
    (option: Option) => {
      const statusKey = option.key === 'ALL' ? undefined : option.key;
      handleStatusChange(statusKey);
    },
    [handleStatusChange]
  );

  const handleRowClick = useCallback(
    (purchaseRequestId: string) => {
      navigation.goToMyPurchaseRequestDetail(purchaseRequestId);
    },
    [navigation]
  );

  const handleProductClick = useCallback(
    (productId: number) => {
      navigation.goToProductDetail(String(productId));
    },
    [navigation]
  );

  if (queryError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // 페이지당 6개만 표시
  const displayList = data?.purchaseList.slice(0, PURCHASE_DEFAULTS.DISPLAY_ITEM_COUNT) || [];

  return (
    <div className="w-full">
      <MyPurchaseRequestListTem
        purchaseList={displayList}
        onCancelClick={handleCancelClick}
        cancelModalOpen={cancelModalOpen}
        cancelTargetItem={cancelTargetItem}
        onCancelModalClose={handleCancelModalClose}
        onCancelConfirm={handleCancelConfirm}
        currentPage={data?.currentPage}
        totalPages={data?.totalPages}
        onPageChange={handlePageChange}
        sortOptions={COMMON_SORT_OPTIONS}
        selectedSortOption={selectedSortOption}
        onSortChange={handleSortChangeWithOption}
        statusOptions={PURCHASE_REQUEST_STATUS_OPTIONS}
        selectedStatusOption={selectedStatusOption}
        onStatusChange={handleStatusChangeWithOption}
        isLoading={isLoading}
        onNavigateToProducts={navigation.goToProducts}
        onRowClick={handleRowClick}
        onProductClick={handleProductClick}
        companyId={companyId}
      />
      {/* Toast */}
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </div>
  );
};

export default MyPurchaseRequestListSection;
