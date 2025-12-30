'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getMyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestDetailTem from '@/features/purchase/template/MyPurchaseRequestDetailTem/MyPurchaseRequestDetailTem';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';

const MyPurchaseRequestDetailSection = () => {
  const params = useParams();
  const requestId = params?.requestId as string | undefined;
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
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
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  if (!data || !companyId) {
    return null;
  }

  return <MyPurchaseRequestDetailTem purchaseRequest={data} companyId={companyId} />;
};

export default MyPurchaseRequestDetailSection;
