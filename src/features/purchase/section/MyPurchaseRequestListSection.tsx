'use client';

/**
 * MyPurchaseRequestListSection - 개선된 버전
 * Props Drilling 개선 - 통합 훅 사용
 */

import { useParams } from 'next/navigation';
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
import { useMyPurchases } from '@/features/purchase/queries/purchase.queries';
import { PURCHASE_DEFAULTS } from '@/features/purchase/constants/defaults';
import { useMyPurchaseRequestList } from '@/features/purchase/hooks/useMyPurchaseRequestList';
import { usePageTitle } from '@/hooks/usePageTitle';

/**
 * MyPurchaseRequestListSection - 개선된 버전
 * 통합 훅을 사용하여 Props Drilling 최소화
 */
const MyPurchaseRequestListSection = () => {
  usePageTitle('구매 요청', { includeUserName: true });
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  // Toast
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // 🎯 통합 훅 사용 - 모든 상태와 핸들러를 그룹화하여 관리
  // 먼저 hook을 호출하여 paginationParams를 얻음
  const hookResult = useMyPurchaseRequestList({
    companyId,
    defaultSize: PURCHASE_DEFAULTS.DISPLAY_ITEM_COUNT,
    defaultSortKey: DEFAULT_SORT_KEY,
    triggerToast,
    sortOptions: COMMON_SORT_OPTIONS,
    statusOptions: PURCHASE_REQUEST_STATUS_OPTIONS,
    purchaseList: undefined, // API 호출 후 업데이트됨
    successMessage: SUCCESS_MESSAGES.PURCHASE_CANCELLED,
    errorMessage: PURCHASE_ERROR_MESSAGES.CANCEL_FAILED,
  });

  const {
    paginationParams,
    cancelModalState,
    cancelModalHandlers,
    paginationState,
    sortState,
    filterState,
    navigationHandlers,
  } = hookResult;

  const { page, size, status, sort } = paginationParams;

  // API 호출 - paginationParams를 사용
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

  if (queryError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  const displayList = data?.purchaseList || [];

  // 🎯 그룹화된 Props 준비
  const updatedPaginationState = {
    ...paginationState,
    currentPage: data?.currentPage,
    totalPages: data?.totalPages,
  };

  return (
    <div className="w-full">
      {/* 🎯 깔끔하게 그룹화된 Props 전달 */}
      <MyPurchaseRequestListTem
        purchaseList={displayList}
        companyId={companyId}
        isLoading={isLoading}
        cancelModalState={cancelModalState}
        cancelModalHandlers={cancelModalHandlers}
        paginationState={updatedPaginationState}
        sortState={sortState}
        filterState={filterState}
        navigationHandlers={navigationHandlers}
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
