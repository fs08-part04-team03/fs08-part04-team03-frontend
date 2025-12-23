'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import PurchaseRequestDetailTem from '@/features/purchase/template/PurchaseRequestDetailTem/PurchaseRequestDetailTem';
import {
  managePurchaseRequests,
  approvePurchaseRequest,
  rejectPurchaseRequest,
} from '@/features/purchase/api/purchase.api';
import { Toast } from '@/components/molecules/Toast/Toast';

const PurchaseRequestDetailSection = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const requestId = params?.requestId as string | undefined;
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<'success' | 'error' | 'custom'>('success');
  const [toastMessage, setToastMessage] = useState('');
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

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

  const handleApproveClick = useCallback(() => {
    setApproveModalOpen(true);
  }, []);

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
        setToastVariant('custom');
        setToastMessage('구매 요청이 승인되었습니다.');
        setShowToast(true);
        // 목록 페이지로 이동
        const companyId = params?.companyId ? String(params.companyId) : undefined;
        if (companyId) {
          router.push(`/${companyId}/purchase-requests`);
        }
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
    [requestId, queryClient, params, router]
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
        setToastVariant('custom');
        setToastMessage('구매 요청이 반려되었습니다.');
        setShowToast(true);
        // 목록 페이지로 이동
        const companyId = params?.companyId ? String(params.companyId) : undefined;
        if (companyId) {
          router.push(`/${companyId}/purchase-requests`);
        }
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
    [requestId, queryClient, params, router]
  );

  if (isLoading) {
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

  return (
    <div className="w-full">
      <PurchaseRequestDetailTem
        purchaseRequest={data}
        budget={2000000}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveClick={handleApproveClick}
        onRejectClick={handleRejectClick}
        onApproveModalClose={handleApproveModalClose}
        onRejectModalClose={handleRejectModalClose}
        onApproveSubmit={handleApproveSubmit}
        onRejectSubmit={handleRejectSubmit}
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
    </div>
  );
};

export default PurchaseRequestDetailSection;
