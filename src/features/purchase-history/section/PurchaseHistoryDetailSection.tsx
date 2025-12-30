'use client';

import { useState, useEffect } from 'react';
import { getMyPurchaseDetail, type MyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import PurchaseHistoryDetailTem from '@/features/purchase-history/template/PurchaseHistoryDetailTem/PurchaseHistoryDetailTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { PURCHASE_REQUEST_STATUS_LABEL } from '@/features/purchase/utils/constants';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

interface PurchaseHistoryDetailSectionProps {
  orderId: string;
}

/**
 * PurchaseHistoryDetailSection
 * 구매 내역 상세 비즈니스 로직을 담당하는 섹션 컴포넌트
 * - 구매 내역 상세 API 호출
 * - 승인 정보 변환
 * - Toast 관리
 */
const PurchaseHistoryDetailSection = ({ orderId }: PurchaseHistoryDetailSectionProps) => {
  const [purchaseDetail, setPurchaseDetail] = useState<MyPurchaseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useToast 훅 사용
  const { showToast, toastMessage, triggerToast, closeToast } = useToast();

  // 구매 내역 상세 조회
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        logger.info('[PurchaseHistoryDetail] 구매 내역 상세 조회 시작:', { orderId });

        const detail = await getMyPurchaseDetail(orderId);

        logger.info('[PurchaseHistoryDetail] 구매 내역 상세 조회 성공:', {
          id: detail.id,
          status: detail.status,
        });

        setPurchaseDetail(detail);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : '구매 내역 상세 정보를 불러오는데 실패했습니다.';
        logger.error('[PurchaseHistoryDetail] 구매 내역 상세 조회 실패:', {
          message: errorMessage,
          orderId,
        });
        triggerToast('custom', errorMessage);
      } finally {
        setIsLoading(false);
      }
    })().catch(() => {
      // 에러는 이미 catch 블록에서 처리됨
    });
  }, [orderId, triggerToast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  if (!purchaseDetail) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500">구매 내역을 찾을 수 없습니다.</div>
      </div>
    );
  }

  // 승인 정보 변환
  const { status } = purchaseDetail;
  const approvedInfo = {
    approverName: purchaseDetail.approver?.name || '관리자',
    approvalDate: purchaseDetail.updatedAt,
    statusLabel: PURCHASE_REQUEST_STATUS_LABEL[status],
    resultMessage:
      status === 'APPROVED' ? '구매 요청이 승인되었습니다.' : purchaseDetail.rejectReason || '',
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
