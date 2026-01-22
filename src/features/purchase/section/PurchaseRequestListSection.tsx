'use client';

import { useCallback, useEffect, useMemo } from 'react';
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
import { usePageTitle } from '@/hooks/usePageTitle';
import type {
  PurchaseListTableState,
  PurchaseListSortState,
  PurchaseListModalState,
  PurchaseListModalHandlers,
  PurchaseListRowHandlers,
  PurchaseListPaginationHandlers,
} from '@/features/purchase/types/purchase-request-list.types';

/**
 * PurchaseRequestListSection
 * 구매 요청 목록 데이터/상태 결정 레이어
 */
const PurchaseRequestListSection = () => {
  usePageTitle('구매 요청 관리');
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

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

  // requests 페이지에서는 PENDING 상태만 조회
  const effectiveStatus = 'PENDING';

  // 정렬 옵션
  const purchaseRequestSortOptions: Option[] = useMemo(
    () => [
      { key: 'createdAt', label: '최신순' },
      { key: 'totalPriceAsc', label: '낮은 가격순' },
      { key: 'totalPriceDesc', label: '높은 가격순' },
    ],
    []
  );

  const { sortBy: effectiveSortBy, order: effectiveOrder } = getSortParams(sort);

  const selectedSortOption = useMemo(
    () =>
      sort && purchaseRequestSortOptions.find((opt) => opt.key === sort)
        ? purchaseRequestSortOptions.find((opt) => opt.key === sort)
        : purchaseRequestSortOptions.find((opt) => opt.key === 'createdAt'),
    [sort, purchaseRequestSortOptions]
  );

  // 모달용 상세 데이터 조회
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

  // 디버깅 로깅
  useEffect(() => {
    logger.info('[PurchaseRequestList] 상태:', {
      isLoading,
      isBudgetLoading,
      hasData: !!data,
      hasBudgetData: !!budgetData,
      hasError: !!queryError,
      hasBudgetError: !!budgetError,
    });
  }, [isLoading, isBudgetLoading, data, budgetData, queryError, budgetError]);

  // 에러 처리
  useEffect(() => {
    if (queryError instanceof Error && queryError.message.includes('인증이 만료되었습니다')) {
      logger.info('[PurchaseRequestList] 인증 만료로 리다이렉트됨');
    } else if (queryError) {
      logger.error('[PurchaseRequestList] 구매 요청 조회 실패:', queryError);
    }
  }, [queryError]);

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

  // 에러 처리
  if (queryError || budgetError) {
    const isAuthError =
      (queryError instanceof Error && queryError.message.includes('인증이 만료되었습니다')) ||
      (budgetError instanceof Error && budgetError.message.includes('인증이 만료되었습니다'));

    if (isAuthError) {
      return null;
    }

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

  // 백엔드에서 페이지네이션된 데이터를 그대로 사용
  const purchaseList = data?.purchaseRequests || [];

  // 그룹화된 Props
  const tableState: PurchaseListTableState = {
    purchaseList,
    companyId,
    currentPage: data?.currentPage ?? 1,
    totalPages: data?.totalPages ?? 1,
    isLoading,
  };

  const sortState: PurchaseListSortState = {
    sortOptions: purchaseRequestSortOptions,
    selectedSortOption,
    onSortChange: handleSortChange,
  };

  const modalState: PurchaseListModalState = {
    selectedRequestId: modalHandlers.selectedRequestId,
    selectedRequestDetail: modalDetailData || undefined,
    isModalDetailLoading,
    approveModalOpen: modalHandlers.approveModalOpen,
    rejectModalOpen: modalHandlers.rejectModalOpen,
    budget: budgetData?.budget ?? 0,
  };

  const modalHandlersGrouped: PurchaseListModalHandlers = {
    onApproveModalClose: modalHandlers.handleApproveModalClose,
    onRejectModalClose: modalHandlers.handleRejectModalClose,
    onApproveSubmit: modalHandlers.handleApproveSubmit,
    onRejectSubmit: modalHandlers.handleRejectSubmit,
  };

  const rowHandlers: PurchaseListRowHandlers = {
    onRejectClick: modalHandlers.handleRejectClick,
    onApproveClick: modalHandlers.handleApproveClick,
    onRowClick: handleRowClick,
  };

  const paginationHandlers: PurchaseListPaginationHandlers = {
    onPageChange: handlePageChange,
    onNavigateToProducts: handleProductNavigation,
  };

  return (
    <div className="w-full mt-20 tablet:mt-20 desktop:mt-80">
      <PurchaseRequestListTem
        tableState={tableState}
        sortState={sortState}
        modalState={modalState}
        modalHandlers={modalHandlersGrouped}
        rowHandlers={rowHandlers}
        paginationHandlers={paginationHandlers}
      />
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </div>
  );
};

export default PurchaseRequestListSection;
