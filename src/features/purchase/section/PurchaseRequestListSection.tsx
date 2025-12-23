'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  managePurchaseRequests,
  approvePurchaseRequest,
  rejectPurchaseRequest,
} from '@/features/purchase/api/purchase.api';
import PurchaseRequestListTem from '@/features/purchase/template/PurchaseRequestListTem/PurchaseRequestListTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { PURCHASE_REQUEST_STATUS_OPTIONS } from '@/constants';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';

const PurchaseRequestListSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<'success' | 'error' | 'custom'>('success');
  const [toastMessage, setToastMessage] = useState('');
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

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

  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const size = Math.max(
    1,
    Math.min(100, Number.parseInt(searchParams.get('size') || '10', 10) || 10)
  );
  const status = searchParams.get('status') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const selectedSortOption =
    sort && sort !== DEFAULT_SORT_KEY
      ? COMMON_SORT_OPTIONS.find((opt) => opt.key === sort)
      : COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);

  const selectedStatusOption =
    status && status !== 'ALL'
      ? PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === status)
      : PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === 'ALL');

  const { data, isLoading, error } = useQuery({
    queryKey: ['purchaseRequests', page, size, status, sort],
    queryFn: () => managePurchaseRequests({ page, size, status }),
  });

  const handleRejectClick = useCallback((purchaseRequestId: string) => {
    setSelectedRequestId(purchaseRequestId);
    setRejectModalOpen(true);
  }, []);

  const handleApproveClick = useCallback((purchaseRequestId: string) => {
    setSelectedRequestId(purchaseRequestId);
    setApproveModalOpen(true);
  }, []);

  const handleRejectModalClose = useCallback(() => {
    setRejectModalOpen(false);
    setSelectedRequestId(null);
  }, []);

  const handleApproveModalClose = useCallback(() => {
    setApproveModalOpen(false);
    setSelectedRequestId(null);
  }, []);

  const handleRejectSubmit = useCallback(
    async (message: string) => {
      if (!selectedRequestId) return;
      try {
        await rejectPurchaseRequest(selectedRequestId, { reason: message });
        // 리패치: 관련 쿼리 무효화
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
        setRejectModalOpen(false);
        setSelectedRequestId(null);
        setToastVariant('custom');
        setToastMessage('구매 요청이 반려되었습니다.');
        setShowToast(true);
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
    [selectedRequestId, queryClient]
  );

  const handleApproveSubmit = useCallback(
    async (_message: string) => {
      if (!selectedRequestId) return;
      try {
        await approvePurchaseRequest(selectedRequestId);
        // 리패치: 관련 쿼리 무효화
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
        setApproveModalOpen(false);
        setSelectedRequestId(null);
        setToastVariant('custom');
        setToastMessage('구매 요청이 승인되었습니다.');
        setShowToast(true);
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
    [selectedRequestId, queryClient]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleSortChange = useCallback(
    (newSort: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newSort && newSort !== DEFAULT_SORT_KEY) {
        params.set('sort', newSort);
      } else {
        params.delete('sort');
      }
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  const handleStatusChange = useCallback(
    (newStatus: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (newStatus && newStatus !== 'ALL') {
        params.set('status', newStatus);
      } else {
        params.delete('status');
      }
      params.set('page', '1');
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
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

  if (!data || !data.purchaseRequests) {
    return null;
  }

  // API 응답이 이미 PurchaseRequestItem 형식과 동일하므로 그대로 사용
  const purchaseList = data.purchaseRequests;

  return (
    <div className="w-full">
      <PurchaseRequestListTem
        purchaseList={purchaseList}
        onRejectClick={handleRejectClick}
        onApproveClick={handleApproveClick}
        selectedRequestId={selectedRequestId}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveModalClose={handleApproveModalClose}
        onRejectModalClose={handleRejectModalClose}
        onApproveSubmit={handleApproveSubmit as (message: string) => void | Promise<void>}
        onRejectSubmit={handleRejectSubmit as (message: string) => void | Promise<void>}
        budget={2000000}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        sortOptions={COMMON_SORT_OPTIONS}
        selectedSortOption={selectedSortOption}
        onSortChange={handleSortChange}
        statusOptions={PURCHASE_REQUEST_STATUS_OPTIONS}
        selectedStatusOption={selectedStatusOption}
        onStatusChange={handleStatusChange}
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

export default PurchaseRequestListSection;
