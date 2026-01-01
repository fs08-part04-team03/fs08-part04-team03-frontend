'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { getMyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestDetailTem from '@/features/purchase/template/MyPurchaseRequestDetailTem/MyPurchaseRequestDetailTem';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { logger } from '@/utils/logger';

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
      logger.info('[MyPurchaseRequestDetail] 구매 요청 상세 조회 시작:', { requestId });
      return getMyPurchaseDetail(requestId);
    },
    enabled: !!requestId,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // 에러 로깅
  useEffect(() => {
    if (queryError) {
      logger.error('[MyPurchaseRequestDetail] 구매 요청 상세 조회 실패:', {
        error: queryError,
        errorName: queryError instanceof Error ? queryError.name : undefined,
        errorMessage: queryError instanceof Error ? queryError.message : String(queryError),
        errorStack: queryError instanceof Error ? queryError.stack : undefined,
        requestId,
        companyId,
      });
    }
  }, [queryError, requestId, companyId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  if (queryError) {
    const errorMessage =
      queryError instanceof Error ? queryError.message : ERROR_MESSAGES.FETCH_ERROR;
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{ERROR_MESSAGES.FETCH_ERROR}</p>
          <p className="text-sm text-gray-600">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (!data || !companyId) {
    return null;
  }

  return <MyPurchaseRequestDetailTem purchaseRequest={data} companyId={companyId} />;
};

export default MyPurchaseRequestDetailSection;
