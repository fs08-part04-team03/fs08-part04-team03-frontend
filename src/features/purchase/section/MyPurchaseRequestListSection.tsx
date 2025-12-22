'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { getMyPurchases, cancelPurchaseRequest } from '@/features/purchase/api/purchase.api';
import PurchaseRequestList from '@/features/purchase/template/PurchaseRequestList';
import type { Option } from '@/components/atoms/DropDown/DropDown';

const MyPurchaseRequestListSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const size = Math.max(
    1,
    Math.min(100, Number.parseInt(searchParams.get('size') || '10', 10) || 10)
  );
  const status = searchParams.get('status') || undefined;
  const sort = searchParams.get('sort') || undefined;

  // 정렬 옵션 정의
  const sortOptions: Option[] = [
    { key: 'LATEST', label: '최신순' },
    { key: 'PRICE_LOW', label: '낮은 가격순' },
    { key: 'PRICE_HIGH', label: '높은 가격순' },
  ];

  const selectedSortOption =
    sort && sort !== 'LATEST'
      ? sortOptions.find((opt) => opt.key === sort)
      : sortOptions.find((opt) => opt.key === 'LATEST');

  // 상태 필터 옵션 정의
  const statusOptions: Option[] = [
    { key: 'ALL', label: '전체' },
    { key: 'PENDING', label: '대기중' },
    { key: 'APPROVED', label: '승인됨' },
    { key: 'REJECTED', label: '반려됨' },
    { key: 'CANCELLED', label: '취소됨' },
  ];

  const selectedStatusOption =
    status && status !== 'ALL'
      ? statusOptions.find((opt) => opt.key === status)
      : statusOptions.find((opt) => opt.key === 'ALL');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['myPurchases', page, size, status, sort],
    queryFn: () => getMyPurchases({ page, size, status, sort }),
  });

  const handleCancel = useCallback(
    async (purchaseRequestId: string) => {
      try {
        await cancelPurchaseRequest(purchaseRequestId);
        await refetch();
      } catch (cancelError) {
        // 에러 처리: 사용자에게 피드백 제공
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('구매 요청 취소 실패:', cancelError);
        }
        // TODO: Toast나 다른 알림 컴포넌트로 사용자에게 에러 메시지 표시
        throw cancelError; // 상위 컴포넌트에서도 처리할 수 있도록 에러 전파
      }
    },
    [refetch]
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
      if (newSort && newSort !== 'LATEST') {
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
      <PurchaseRequestList
        purchaseList={data.purchaseList}
        onCancel={handleCancel}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        sortOptions={sortOptions}
        selectedSortOption={selectedSortOption}
        onSortChange={handleSortChange}
        statusOptions={statusOptions}
        selectedStatusOption={selectedStatusOption}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default MyPurchaseRequestListSection;
