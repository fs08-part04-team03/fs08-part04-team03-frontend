'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getMyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestDetailTem from '@/features/purchase/template/MyPurchaseRequestDetailTem/MyPurchaseRequestDetailTem';

const MyPurchaseRequestDetailSection = () => {
  const params = useParams();
  const requestId = params?.requestId as string | undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ['myPurchaseDetail', requestId],
    queryFn: () => {
      if (!requestId) {
        throw new Error('Request ID is required');
      }
      return getMyPurchaseDetail(requestId);
    },
    enabled: !!requestId,
  });

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

  return <MyPurchaseRequestDetailTem purchaseRequest={data} />;
};

export default MyPurchaseRequestDetailSection;
