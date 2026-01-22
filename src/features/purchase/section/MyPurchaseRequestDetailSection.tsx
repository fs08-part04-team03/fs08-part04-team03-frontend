'use client';

import { useParams } from 'next/navigation';
import MyPurchaseRequestDetailTem from '@/features/purchase/template/MyPurchaseRequestDetailTem/MyPurchaseRequestDetailTem';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { useMyPurchaseDetail } from '@/features/purchase/queries/purchase.queries';
import { usePurchaseNavigation } from '@/features/purchase/handlers/usePurchaseNavigation';
import { usePageTitle } from '@/hooks/usePageTitle';

/**
 * MyPurchaseRequestDetailSection
 * 내 구매 요청 상세 데이터/상태 결정 레이어
 * - 내 구매 요청 상세 API 호출
 * - loading / error 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const MyPurchaseRequestDetailSection = () => {
  usePageTitle('구매 요청 상세', { includeUserName: true });
  const params = useParams();
  const requestId = params?.requestId as string | undefined;
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  // 핸들러 훅 사용 - Hook은 항상 최상위에서 호출
  const { goToMyPurchaseRequests } = usePurchaseNavigation(companyId);

  const {
    data,
    isLoading,
    error: queryError,
  } = useMyPurchaseDetail(requestId, { enabled: !!requestId });

  // loading 분기
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // error 분기
  if (queryError) {
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

  return (
    <MyPurchaseRequestDetailTem
      purchaseRequest={data}
      companyId={companyId}
      onGoToList={goToMyPurchaseRequests}
    />
  );
};

export default MyPurchaseRequestDetailSection;
