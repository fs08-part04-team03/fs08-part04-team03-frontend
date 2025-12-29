'use client';

import { useState, useEffect } from 'react';
import { getMyPurchaseDetail, type MyPurchaseDetail } from '@/features/purchase/api/purchase.api';
import PurchaseHistoryDetailTem from '@/features/purchase-history/template/PurchaseHistoryDetailTem/PurchaseHistoryDetailTem';
import { Toast } from '@/components/molecules/Toast/Toast';

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  // 구매 내역 상세 조회
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[PurchaseHistoryDetail] 구매 내역 상세 조회 시작:', { orderId });
        }

        const detail = await getMyPurchaseDetail(orderId);

        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[PurchaseHistoryDetail] 구매 내역 상세 조회 성공:', detail);
        }

        setPurchaseDetail(detail);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[PurchaseHistoryDetail] 구매 내역 상세 조회 실패:', error);
        }
        const errorMessage =
          error instanceof Error ? error.message : '구매 내역 상세 정보를 불러오는데 실패했습니다.';
        setToastMessage(errorMessage);
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    })().catch(() => {
      // 에러는 이미 catch 블록에서 처리됨
    });
  }, [orderId]);

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
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'APPROVED':
        return '승인됨';
      case 'PENDING':
        return '대기중';
      case 'REJECTED':
        return '거부됨';
      case 'CANCELLED':
        return '취소됨';
      default:
        return status;
    }
  };

  const approvedInfo = {
    approverName: purchaseDetail.approver?.name || '관리자',
    approvalDate: purchaseDetail.updatedAt,
    statusLabel: getStatusLabel(purchaseDetail.status),
    resultMessage:
      purchaseDetail.status === 'APPROVED'
        ? '구매 요청이 승인되었습니다.'
        : purchaseDetail.rejectReason || '',
  };

  return (
    <>
      <PurchaseHistoryDetailTem purchaseRequest={purchaseDetail} approvedInfo={approvedInfo} />
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-toast">
          <Toast variant="custom" message={toastMessage} onClose={() => setShowToast(false)} />
        </div>
      )}
    </>
  );
};

export default PurchaseHistoryDetailSection;
