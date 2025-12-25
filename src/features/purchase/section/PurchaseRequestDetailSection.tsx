'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import PurchaseRequestDetailTem from '@/features/purchase/template/PurchaseRequestDetailTem/PurchaseRequestDetailTem';
import {
  managePurchaseRequests,
  approvePurchaseRequest,
  rejectPurchaseRequest,
  getBudget,
} from '@/features/purchase/api/purchase.api';
import { Toast } from '@/components/molecules/Toast/Toast';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';

const PurchaseRequestDetailSection = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const requestId = params?.requestId as string | undefined;
  const companyId = params?.companyId ? String(params.companyId) : undefined;
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<'success' | 'error' | 'custom'>('success');
  const [toastMessage, setToastMessage] = useState('');
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalType, setSuccessModalType] = useState<'approved' | 'rejected'>('approved');
  const [budgetShortageModalOpen, setBudgetShortageModalOpen] = useState(false);

  // 토스트 자동 닫기 (3초 후)
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showToast]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['purchaseRequestDetail', requestId],
    queryFn: async () => {
      if (!requestId) {
        throw new Error('Request ID is required');
      }
      // TODO: 상세 조회 API가 있다면 사용, 현재는 목록에서 필터링
      const result = await managePurchaseRequests({ page: 1, size: 100 });
      const request = result.purchaseRequests.find((r) => r.id === requestId);
      if (!request) {
        throw new Error('Purchase request not found');
      }
      return request;
    },
    enabled: !!requestId,
  });

  // 예산 조회
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = useQuery({
    queryKey: ['budget', companyId],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }
      const result = await getBudget(companyId);
      return result;
    },
    enabled: !!companyId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  // 예산 값 (로딩 중이거나 에러 발생 시 fallback 값 사용)
  const budget: number = budgetData?.budget ?? 2000000;
  const monthlySpending: number = budgetData?.monthlySpending ?? 0;

  // 예산 검증
  const totalOrderAmount = data ? data.totalPrice + data.shippingFee : 0;
  const remainingBudget = budget - monthlySpending;
  const isBudgetSufficient = remainingBudget >= totalOrderAmount;

  const handleApproveClick = useCallback(() => {
    if (!isBudgetSufficient) {
      setToastVariant('error');
      setToastMessage('예산이 부족합니다.');
      setShowToast(true);
      setBudgetShortageModalOpen(true);
      return;
    }
    setApproveModalOpen(true);
  }, [isBudgetSufficient]);

  const handleRejectClick = useCallback(() => {
    setRejectModalOpen(true);
  }, []);

  const handleApproveModalClose = useCallback(() => {
    setApproveModalOpen(false);
  }, []);

  const handleRejectModalClose = useCallback(() => {
    setRejectModalOpen(false);
  }, []);

  const handleApproveSubmit = useCallback(
    async (_message: string) => {
      if (!requestId) return;
      try {
        await approvePurchaseRequest(requestId);
        // 리패치: 관련 쿼리 무효화
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequestDetail', requestId] });
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
        setApproveModalOpen(false);
        setSuccessModalType('approved');
        setSuccessModalOpen(true);
      } catch (approveError) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('구매 요청 승인 실패:', approveError);
        }
        setToastVariant('error');
        setToastMessage('구매 요청 승인이 실패했습니다. 잠시 후 다시 시도해주세요.');
        setShowToast(true);
      }
    },
    [requestId, queryClient]
  );

  const handleRejectSubmit = useCallback(
    async (message: string) => {
      if (!requestId) return;
      try {
        await rejectPurchaseRequest(requestId, { reason: message });
        // 리패치: 관련 쿼리 무효화
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequestDetail', requestId] });
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
        setRejectModalOpen(false);
        setSuccessModalType('rejected');
        setSuccessModalOpen(true);
      } catch (rejectError) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('구매 요청 반려 실패:', rejectError);
        }
        setToastVariant('error');
        setToastMessage('구매 요청 반려가 실패했습니다. 잠시 후 다시 시도해주세요.');
        setShowToast(true);
      }
    },
    [requestId, queryClient]
  );

  const handleSuccessModalClose = useCallback(() => {
    setSuccessModalOpen(false);
  }, []);

  const handleGoHome = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}`);
    }
  }, [companyId, router]);

  const handleGoToPurchaseHistory = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/my/orders`);
    }
  }, [companyId, router]);

  const handleGoToPurchaseRequests = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/purchase-requests`);
    }
  }, [companyId, router]);

  const handleBudgetShortageModalClose = useCallback(() => {
    setBudgetShortageModalOpen(false);
  }, []);

  const handleGoToBudgetRequest = useCallback(() => {
    // TODO: 예산 증액 요청 페이지 구현 예정
    // if (companyId) {
    //   router.push(`/${companyId}/budget-request`);
    // }
    setBudgetShortageModalOpen(false);
    setToastVariant('custom');
    setToastMessage('예산 증액 요청 기능은 준비 중입니다.');
    setShowToast(true);
  }, []);

  if (isLoading || isBudgetLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // 예산 로딩 실패 시 경고 로그 (UI는 fallback 값으로 계속 표시)
  if (budgetError && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn('예산 정보를 불러오는 중 오류가 발생했습니다. 기본값을 사용합니다.', budgetError);
  }

  return (
    <div className="w-full">
      <PurchaseRequestDetailTem
        purchaseRequest={data}
        budget={budget}
        monthlySpending={monthlySpending}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveClick={handleApproveClick}
        onRejectClick={handleRejectClick}
        onApproveModalClose={handleApproveModalClose}
        onRejectModalClose={handleRejectModalClose}
        onApproveSubmit={handleApproveSubmit}
        onRejectSubmit={handleRejectSubmit}
        isBudgetSufficient={isBudgetSufficient}
      />
      {/* Toast */}
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast
            variant={toastVariant}
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      {/* Success Modal */}
      <CustomModal
        open={successModalOpen}
        type={successModalType}
        onClose={handleSuccessModalClose}
        onHome={handleGoHome}
        onOrder={
          successModalType === 'approved' ? handleGoToPurchaseHistory : handleGoToPurchaseRequests
        }
      />
      {/* Budget Shortage Modal */}
      <CustomModal
        open={budgetShortageModalOpen}
        type="budget-shortage"
        onClose={handleBudgetShortageModalClose}
        onBudgetRequest={handleGoToBudgetRequest}
      />
    </div>
  );
};

export default PurchaseRequestDetailSection;
