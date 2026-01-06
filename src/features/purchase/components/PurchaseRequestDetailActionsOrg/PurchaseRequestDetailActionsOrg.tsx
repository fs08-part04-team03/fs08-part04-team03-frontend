'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button/Button';
import { Toast } from '@/components/molecules/Toast/Toast';
import { logger } from '@/utils/logger';

export interface PurchaseRequestDetailActionsOrgProps {
  companyId?: string;
  actionType?: 'user' | 'admin';
  onApproveClick?: () => void;
  onRejectClick?: () => void;
  isBudgetSufficient?: boolean;
}

// 버튼 그룹 컴포넌트
interface ActionButtonGroupProps {
  primaryLabel: string;
  secondaryLabel: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  isPrimaryDisabled?: boolean;
}

const ActionButtonGroup = ({
  primaryLabel,
  secondaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  isPrimaryDisabled = false,
}: ActionButtonGroupProps) => (
  <>
    {/* 모바일/태블릿용: 고정 하단 버튼 */}
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center w-full gap-16 text-16 bg-white p-16 border-t border-gray-200 desktop:hidden">
      <Button
        variant="secondary"
        size="sm"
        className="flex-1 max-w-338 h-50"
        onClick={onSecondaryClick}
      >
        {secondaryLabel}
      </Button>
      <Button
        variant="primary"
        size="sm"
        className="flex-1 max-w-338 h-50"
        onClick={onPrimaryClick}
        inactive={isPrimaryDisabled}
      >
        {primaryLabel}
      </Button>
    </div>
    {/* 데스크톱용: 일반 레이아웃 */}
    <div className="hidden desktop:flex justify-center items-center w-full gap-16 text-16 mt-24 tablet:mt-42 desktop:mt-70">
      <Button
        variant="secondary"
        size="sm"
        className="flex-1 max-w-338 h-50"
        onClick={onSecondaryClick}
      >
        {secondaryLabel}
      </Button>
      <Button
        variant="primary"
        size="sm"
        className="flex-1 max-w-338 h-50"
        onClick={onPrimaryClick}
        inactive={isPrimaryDisabled}
      >
        {primaryLabel}
      </Button>
    </div>
  </>
);

const PurchaseRequestDetailActionsOrg = ({
  companyId,
  actionType = 'user',
  onApproveClick,
  onRejectClick,
  isBudgetSufficient = true,
}: PurchaseRequestDetailActionsOrgProps) => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
      logger.warn('companyId missing in handleGoToList', {
        hasCompanyId: false,
      });
      setToastMessage('회사가 선택되지 않았습니다.');
      setShowToast(true);
      return;
    }
    router.push(`/${companyId}/my/purchase-requests`);
  };

  const handleAddToCart = () => {
    if (!companyId) {
      logger.warn('companyId missing in handleAddToCart', {
        hasCompanyId: false,
      });
      setToastMessage('회사가 선택되지 않았습니다.');
      setShowToast(true);
      return;
    }
    router.push(`/${companyId}/cart`);
  };

  // 관리자용 버튼 세트
  if (actionType === 'admin') {
    return (
      <ActionButtonGroup
        primaryLabel="요청 승인"
        secondaryLabel="요청 반려"
        onPrimaryClick={onApproveClick}
        onSecondaryClick={onRejectClick}
        isPrimaryDisabled={!isBudgetSufficient}
      />
    );
  }

  // 사용자용 버튼 세트
  const isDisabled = !companyId;

  return (
    <>
      <ActionButtonGroup
        primaryLabel="장바구니 다시 담기"
        secondaryLabel="목록 보기"
        onPrimaryClick={handleAddToCart}
        onSecondaryClick={handleGoToList}
        isPrimaryDisabled={isDisabled}
      />
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant="error" message={toastMessage} onClose={() => setShowToast(false)} />
        </div>
      )}
    </>
  );
};

export default PurchaseRequestDetailActionsOrg;
