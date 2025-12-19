'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { getMyPurchases, cancelPurchaseRequest } from '@/features/purchase/api/purchase.api';
import PurchaseRequestList from '@/features/purchase/template/PurchaseRequestList';

const MyPurchaseRequestListSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Number.parseInt(searchParams.get('page') || '1', 10);
  const size = Number.parseInt(searchParams.get('size') || '10', 10);
  const status = searchParams.get('status') || undefined;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['myPurchases', page, size, status],
    queryFn: () => getMyPurchases({ page, size, status }),
  });

  const handleCancel = useCallback(
    async (purchaseRequestId: string) => {
      await cancelPurchaseRequest(purchaseRequestId);
      await refetch();
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
      />
    </div>
  );
};

export default MyPurchaseRequestListSection;
