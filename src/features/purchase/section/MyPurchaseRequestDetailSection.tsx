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
      // 개발 환경에서만 로깅 (보안)
      if (process.env.NODE_ENV === 'development') {
        logger.info('[MyPurchaseRequestDetail] 구매 요청 상세 조회 시작:', { requestId });
      }
      return getMyPurchaseDetail(requestId);
    },
    enabled: !!requestId,
    // 401 에러 시 재시도 방지
    retry: false,
    // 창 포커스 시 재요청 방지 (구매 요청 상세 데이터는 승인/거절 상태 변경 가능하므로 자동 갱신 비활성화)
    refetchOnWindowFocus: false,
  });

  // 에러 로깅 (개발 환경에서만)
  useEffect(() => {
    if (queryError && process.env.NODE_ENV === 'development') {
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
    // 사용자에게는 일관된 사용자 친화적 메시지만 표시 (보안)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{ERROR_MESSAGES.FETCH_ERROR}</p>
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
