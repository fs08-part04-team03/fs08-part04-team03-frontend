'use client';

import { useParams } from 'next/navigation';
import PurchaseHistoryDetailTem from '@/features/purchase-history/template/PurchaseHistoryDetailTem/PurchaseHistoryDetailTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { PURCHASE_REQUEST_STATUS_LABEL } from '@/features/purchase/constants';
import { useToast } from '@/hooks/useToast';
import { usePurchaseHistoryDetail } from '@/features/purchase-history/queries/purchase-history.queries';
import { usePurchaseHistoryHandlers } from '@/features/purchase-history/handlers/usePurchaseHistoryHandlers';
import {
  PURCHASE_HISTORY_MESSAGES,
  PURCHASE_HISTORY_LABELS,
} from '@/features/purchase-history/constants';

interface PurchaseHistoryDetailSectionProps {
  orderId: string;
}

/**
 * PurchaseHistoryDetailSection
 * 구매 내역 상세 데이터/상태 결정 레이어
 * - 구매 내역 상세 API 호출
 * - loading / error 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const PurchaseHistoryDetailSection = ({ orderId }: PurchaseHistoryDetailSectionProps) => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';

  // useToast 훅 사용
  const { showToast, toastMessage, closeToast } = useToast();

  // 핸들러 훅 사용
  const { handleNavigateToList } = usePurchaseHistoryHandlers(companyId);

  // 구매 내역 상세 조회
  const {
    data: purchaseDetail,
    isLoading,
    error,
  } = usePurchaseHistoryDetail(orderId, { enabled: !!orderId });

  // loading 분기
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">{PURCHASE_HISTORY_MESSAGES.LOADING.DEFAULT}</div>
      </div>
    );
  }

  // error 분기
  if (error || !purchaseDetail) {
    const isNotFoundError = error instanceof Error && error.message.includes('찾을 수 없습니다');

    const errorMessage =
      error instanceof Error && error.message
        ? error.message
        : PURCHASE_HISTORY_MESSAGES.ERROR.NOT_FOUND;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-20">
        <p className="text-16 text-gray-900">{errorMessage}</p>
        {isNotFoundError && companyId && (
          <button
            type="button"
            onClick={handleNavigateToList}
            className="px-20 py-10 bg-primary-500 text-white rounded-8 hover:bg-primary-600 transition-colors"
          >
            {PURCHASE_HISTORY_LABELS.BACK_TO_LIST}
          </button>
        )}
      </div>
    );
  }

  // purchaseDetail이 없으면 렌더링하지 않음 (위에서 이미 처리됨)
  if (!purchaseDetail) {
    return null;
  }

  // 승인 정보 변환
  const { status } = purchaseDetail;
  const approvedInfo = {
    approverName: purchaseDetail.approver?.name || '관리자',
    approvalDate: purchaseDetail.updatedAt,
    statusLabel: PURCHASE_REQUEST_STATUS_LABEL[status],
    resultMessage:
      status === 'APPROVED'
        ? PURCHASE_HISTORY_MESSAGES.RESULT.APPROVED
        : purchaseDetail.rejectReason || '',
  };

  return (
    <>
      <PurchaseHistoryDetailTem purchaseRequest={purchaseDetail} approvedInfo={approvedInfo} />
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-toast">
          <Toast variant="custom" message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </>
  );
};

export default PurchaseHistoryDetailSection;
