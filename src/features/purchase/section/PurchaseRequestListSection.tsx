'use client';

import { useCallback, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PurchaseRequestListTem from '@/features/purchase/template/PurchaseRequestListTem/PurchaseRequestListTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import { logger } from '@/utils/logger';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import {
  usePurchaseRequests,
  usePurchaseRequestDetailForModal,
  usePurchaseBudget,
} from '@/features/purchase/queries/purchase.queries';
import { PURCHASE_DEFAULTS } from '@/features/purchase/constants/defaults';
import { usePurchaseNavigation } from '@/features/purchase/handlers/usePurchaseNavigation';
import {
  usePurchaseSortHandlers,
  getSortParams,
} from '@/features/purchase/handlers/usePurchaseSortHandlers';
import { usePurchaseModalHandlers } from '@/features/purchase/handlers/usePurchaseModalHandlers';

/**
 * PurchaseRequestListSection
 * 구매 요청 목록 데이터/상태 결정 레이어
 * - 구매 요청 목록 API 호출
 * - 예산 정보 API 호출
 * - loading / error / empty 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const PurchaseRequestListSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // usePaginationParams 훅 사용
  const {
    params: paginationParams,
    handlePageChange,
    handleSortChange: handleSortChangeBase,
  } = usePaginationParams({ defaultSize: PURCHASE_DEFAULTS.DISPLAY_ITEM_COUNT });

  const { page, size, sort } = paginationParams;

  // 핸들러 훅 사용
  const navigation = usePurchaseNavigation(companyId);
  const { handleSortChange } = usePurchaseSortHandlers(handleSortChangeBase);
  const modalHandlers = usePurchaseModalHandlers({ companyId, triggerToast });

  // requests 페이지에서는 PENDING 상태만 조회 (현재 요청되어 있는 것들만)
  const effectiveStatus = 'PENDING';

  // 프론트엔드 드롭다운 옵션 (사용자 친화적인 레이블)
  const purchaseRequestSortOptions: Option[] = [
    { key: 'createdAt', label: '최신순' },
    { key: 'totalPriceAsc', label: '낮은 가격순' },
    { key: 'totalPriceDesc', label: '높은 가격순' },
  ];

  const { sortBy: effectiveSortBy, order: effectiveOrder } = getSortParams(sort);

  const selectedSortOption =
    sort && purchaseRequestSortOptions.find((opt) => opt.key === sort)
      ? purchaseRequestSortOptions.find((opt) => opt.key === sort)
      : purchaseRequestSortOptions.find((opt) => opt.key === 'createdAt');

  // 모달용 상세 데이터 조회 (모달이 열릴 때만 호출)
  const { data: modalDetailData, isLoading: isModalDetailLoading } =
    usePurchaseRequestDetailForModal(
      modalHandlers.selectedRequestId,
      (modalHandlers.approveModalOpen || modalHandlers.rejectModalOpen) &&
        !!modalHandlers.selectedRequestId
    );

  const {
    data,
    isLoading,
    error: queryError,
  } = usePurchaseRequests({
    page,
    size,
    status: effectiveStatus,
    sortBy: effectiveSortBy,
    order: effectiveOrder,
  });

  // 예산 조회
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = usePurchaseBudget(companyId, { enabled: !!companyId });

  // 디버깅: 로딩 상태와 에러 상태 로깅
  useEffect(() => {
    logger.info('[PurchaseRequestList] 상태:', {
      isLoading,
      isBudgetLoading,
      hasData: !!data,
      hasBudgetData: !!budgetData,
      hasError: !!queryError,
      hasBudgetError: !!budgetError,
      errorMessage: queryError instanceof Error ? queryError.message : undefined,
      budgetErrorMessage: budgetError instanceof Error ? budgetError.message : undefined,
    });
  }, [isLoading, isBudgetLoading, data, budgetData, queryError, budgetError]);

  // 401 에러 처리 (리다이렉트는 fetchWithAuth에서 처리됨)
  useEffect(() => {
    if (queryError instanceof Error && queryError.message.includes('인증이 만료되었습니다')) {
      logger.info('[PurchaseRequestList] 인증 만료로 리다이렉트됨');
    } else if (queryError) {
      logger.error('[PurchaseRequestList] 구매 요청 조회 실패:', queryError);
    }
  }, [queryError]);

  // 예산 조회 에러 처리
  useEffect(() => {
    if (budgetError instanceof Error && budgetError.message.includes('인증이 만료되었습니다')) {
      logger.info('[PurchaseRequestList] 예산 조회 중 인증 만료로 리다이렉트됨');
    } else if (budgetError) {
      logger.error('[PurchaseRequestList] 예산 조회 실패:', budgetError);
    }
  }, [budgetError]);

  const handleProductNavigation = useCallback(() => {
    navigation.goToProducts();
  }, [navigation]);

  const handleRowClick = useCallback(
    (purchaseRequestId: string) => {
      navigation.goToPurchaseRequestDetail(purchaseRequestId);
    },
    [navigation]
  );

  // companyId 필수 체크
  if (!companyId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{VALIDATION_MESSAGES.COMPANY_ID_REQUIRED}</p>
      </div>
    );
  }

  // 에러가 발생하면 먼저 표시 (401 에러는 리다이렉트되므로 제외)
  if (queryError || budgetError) {
    const isAuthError =
      (queryError instanceof Error && queryError.message.includes('인증이 만료되었습니다')) ||
      (budgetError instanceof Error && budgetError.message.includes('인증이 만료되었습니다'));

    // 401 에러는 이미 리다이렉트 처리 중이므로 표시하지 않음
    if (isAuthError) {
      return null;
    }

    logger.error('[PurchaseRequestList] 에러 발생:', { queryError, budgetError });
    let errorMessage: string = ERROR_MESSAGES.FETCH_ERROR;
    if (queryError instanceof Error) {
      errorMessage = queryError.message;
    } else if (budgetError instanceof Error) {
      errorMessage = budgetError.message;
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{errorMessage}</p>
      </div>
    );
  }

  const purchaseList = data?.purchaseRequests || [];
  // 무조건 6개까지만 표시
  const displayList = purchaseList.slice(0, PURCHASE_DEFAULTS.DISPLAY_ITEM_COUNT);

  return (
    <div className="w-full mt-20 tablet:mt-20 desktop:mt-80">
      <PurchaseRequestListTem
        purchaseList={displayList}
        companyId={companyId}
        onRejectClick={modalHandlers.handleRejectClick}
        onApproveClick={modalHandlers.handleApproveClick}
        onRowClick={handleRowClick}
        selectedRequestId={modalHandlers.selectedRequestId}
        selectedRequestDetail={modalDetailData || undefined}
        isModalDetailLoading={isModalDetailLoading}
        approveModalOpen={modalHandlers.approveModalOpen}
        rejectModalOpen={modalHandlers.rejectModalOpen}
        onApproveModalClose={modalHandlers.handleApproveModalClose}
        onRejectModalClose={modalHandlers.handleRejectModalClose}
        onApproveSubmit={modalHandlers.handleApproveSubmit}
        onRejectSubmit={modalHandlers.handleRejectSubmit}
        budget={budgetData?.budget ?? 0}
        currentPage={data?.currentPage}
        totalPages={data?.totalPages}
        onPageChange={handlePageChange}
        sortOptions={purchaseRequestSortOptions}
        selectedSortOption={selectedSortOption}
        onSortChange={handleSortChange}
        onNavigateToProducts={handleProductNavigation}
        isLoading={isLoading}
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

export default PurchaseRequestListSection;
