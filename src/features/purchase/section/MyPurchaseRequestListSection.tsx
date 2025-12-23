'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getMyPurchases, cancelPurchaseRequest } from '@/features/purchase/api/purchase.api';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestListTem from '@/features/purchase/template/MyPurchaseRequestListTem/MyPurchaseRequestListTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { PURCHASE_REQUEST_STATUS_OPTIONS } from '@/constants';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';

const MyPurchaseRequestListSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<'success' | 'error' | 'custom'>('success');
  const [toastMessage, setToastMessage] = useState('');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTargetItem, setCancelTargetItem] = useState<PurchaseRequestItem | null>(null);

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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['myPurchases', page, size, status, sort],
    queryFn: () => getMyPurchases({ page, size, status, sort }),
  });

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

  const handleCancelConfirm = useCallback(async () => {
    if (!cancelTargetItem) return;

    try {
      await cancelPurchaseRequest(cancelTargetItem.id);
      await refetch();
      setCancelModalOpen(false);
      setCancelTargetItem(null);
      // 성공 토스트 표시
      setToastVariant('custom');
      setToastMessage('구매 요청이 취소되었습니다.');
      setShowToast(true);
    } catch (cancelError) {
      // 에러 처리: 사용자에게 피드백 제공
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('구매 요청 취소 실패:', cancelError);
      }
      // 실패 토스트 표시
      setToastVariant('error');
      setToastMessage('구매 요청 취소가 실패했습니다. 잠시 후 다시 시도해주세요.');
      setShowToast(true);
      // 에러 발생 시에도 모달을 닫아 사용자 혼란 방지
      setCancelModalOpen(false);
      setCancelTargetItem(null);
    }
  }, [cancelTargetItem, refetch]);

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
      params.set('page', '1'); // 정렬 변경 시 첫 페이지로 이동
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
      params.set('page', '1'); // 상태 변경 시 첫 페이지로 이동
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

  if (!data) {
    return null;
  }

  return (
    <div className="w-full">
      <MyPurchaseRequestListTem
        purchaseList={data.purchaseList}
        onCancelClick={handleCancelClick}
        cancelModalOpen={cancelModalOpen}
        cancelTargetItem={cancelTargetItem}
        onCancelModalClose={handleCancelModalClose}
        onCancelConfirm={handleCancelConfirm}
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

export default MyPurchaseRequestListSection;
