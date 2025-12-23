'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button/Button';
import { Toast } from '@/components/molecules/Toast/Toast';

export interface PurchaseRequestDetailActionsOrgProps {
  companyId?: string;
  actionType?: 'user' | 'admin';
  onApproveClick?: () => void;
  onRejectClick?: () => void;
}

const PurchaseRequestDetailActionsOrg: React.FC<PurchaseRequestDetailActionsOrgProps> = ({
  companyId,
  actionType = 'user',
  onApproveClick,
  onRejectClick,
}) => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  const handleGoToList = () => {
    if (!companyId) {
      // eslint-disable-next-line no-console
      console.warn('companyId missing');
      setToastMessage('회사가 선택되지 않았습니다.');
      setShowToast(true);
      return;
    }
    router.push(`/${companyId}/my/purchase-requests`);
  };

  const handleAddToCart = () => {
    if (!companyId) {
      // eslint-disable-next-line no-console
      console.warn('companyId missing');
      setToastMessage('회사가 선택되지 않았습니다.');
      setShowToast(true);
      return;
    }
    router.push(`/${companyId}/cart`);
  };

  // 관리자용 버튼 세트 (요청 반려, 요청 승인)
  if (actionType === 'admin') {
    return (
      <>
        {/* 모바일/태블릿용: 고정 하단 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center w-full gap-16 text-16 bg-white p-16 border-t border-gray-200 desktop:hidden">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 max-w-338 h-50"
            onClick={onRejectClick}
          >
            요청 반려
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1 max-w-338 h-50"
            onClick={onApproveClick}
          >
            요청 승인
          </Button>
        </div>
        {/* 데스크톱용: 일반 레이아웃 */}
        <div className="hidden desktop:flex justify-center items-center w-full gap-16 text-16">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1 max-w-338 h-50"
            onClick={onRejectClick}
          >
            요청 반려
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1 max-w-338 h-50"
            onClick={onApproveClick}
          >
            요청 승인
          </Button>
        </div>
      </>
    );
  }

  // 사용자용 버튼 세트 (목록 보기, 장바구니 다시 담기)
  const isDisabled = !companyId;

  return (
    <>
      {/* 모바일/태블릿용: 고정 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center w-full gap-16 text-16 bg-white p-16 border-t border-gray-200 desktop:hidden">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 max-w-338 h-50"
          onClick={handleGoToList}
          inactive={isDisabled}
        >
          목록 보기
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1 max-w-338 h-50"
          onClick={handleAddToCart}
          inactive={isDisabled}
        >
          장바구니 다시 담기
        </Button>
      </div>
      {/* 데스크톱용: 일반 레이아웃 */}
      <div className="hidden desktop:flex justify-center items-center w-full gap-16 text-16">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 max-w-338 h-50"
          onClick={handleGoToList}
          inactive={isDisabled}
        >
          목록 보기
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="flex-1 max-w-338 h-50"
          onClick={handleAddToCart}
          inactive={isDisabled}
        >
          장바구니 다시 담기
        </Button>
      </div>
      {/* Toast */}
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant="error" message={toastMessage} onClose={() => setShowToast(false)} />
        </div>
      )}
    </>
  );
};

export default PurchaseRequestDetailActionsOrg;
