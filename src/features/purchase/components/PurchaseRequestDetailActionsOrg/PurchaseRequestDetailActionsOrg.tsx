'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button/Button';
import { Toast } from '@/components/molecules/Toast/Toast';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PURCHASE_LABELS, PURCHASE_TIMERS, PURCHASE_MESSAGES } from '@/features/purchase/constants';
import { usePurchaseCartActions } from '@/features/purchase/handlers/usePurchaseCartActions';
import { usePurchaseNavigation } from '@/features/purchase/handlers/usePurchaseNavigation';

export interface PurchaseRequestDetailActionsOrgProps {
  companyId?: string;
  actionType?: 'user' | 'admin';
  onApproveClick?: () => void;
  onRejectClick?: () => void;
  isBudgetSufficient?: boolean;
  /** 장바구니 다시 담기에 필요한 구매 요청 데이터 (user actionType에서만 사용) */
  purchaseRequest?: PurchaseRequestItem;
  /** 목록으로 이동 핸들러 (user actionType에서만 사용) */
  onGoToList?: () => void;
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
}: ActionButtonGroupProps) => {
  const buttonClassName = 'flex-1 max-w-338 h-50';

  return (
    <>
      {/* 모바일/태블릿용: 고정 하단 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center w-full gap-16 text-16 bg-white p-16 border-t border-gray-200 desktop:hidden">
        <Button
          variant="secondary"
          size="sm"
          className={buttonClassName}
          onClick={onSecondaryClick}
        >
          {secondaryLabel}
        </Button>
        <Button
          variant="primary"
          size="sm"
          className={buttonClassName}
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
          className={buttonClassName}
          onClick={onSecondaryClick}
        >
          {secondaryLabel}
        </Button>
        <Button
          variant="primary"
          size="sm"
          className={buttonClassName}
          onClick={onPrimaryClick}
          inactive={isPrimaryDisabled}
        >
          {primaryLabel}
        </Button>
      </div>
    </>
  );
};

const PurchaseRequestDetailActionsOrg = ({
  companyId,
  actionType = 'user',
  onApproveClick,
  onRejectClick,
  isBudgetSufficient = true,
  purchaseRequest,
  onGoToList,
}: PurchaseRequestDetailActionsOrgProps) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState<'error' | 'success'>('error');

  const navigation = usePurchaseNavigation(companyId);

  const { isAddingToCart, handleAddToCart } = usePurchaseCartActions({
    companyId,
    purchaseRequest,
    onSuccess: () => {
      setToastVariant('success');
      setToastMessage(PURCHASE_MESSAGES.ADD_TO_CART_SUCCESS);
      setShowToast(true);
      // 잠시 후 장바구니로 이동
      setTimeout(() => {
        navigation.goToCart();
      }, PURCHASE_TIMERS.CART_REDIRECT_DELAY);
    },
    onError: (message) => {
      setToastVariant('error');
      setToastMessage(message);
      setShowToast(true);
    },
  });

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, PURCHASE_TIMERS.TOAST_DURATION);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showToast]);

  const handleGoToList = () => {
    if (onGoToList) {
      onGoToList();
    } else {
      navigation.goToMyPurchaseRequests();
    }
  };

  // 관리자용 버튼 세트
  if (actionType === 'admin') {
    return (
      <ActionButtonGroup
        primaryLabel={PURCHASE_LABELS.BUTTONS.APPROVE_ACTION}
        secondaryLabel={PURCHASE_LABELS.BUTTONS.REJECT_ACTION}
        onPrimaryClick={onApproveClick}
        onSecondaryClick={onRejectClick}
        isPrimaryDisabled={!isBudgetSufficient}
      />
    );
  }

  // 사용자용 버튼 세트
  const isDisabled = !companyId || isAddingToCart || !purchaseRequest;

  return (
    <>
      <ActionButtonGroup
        primaryLabel={
          isAddingToCart
            ? PURCHASE_LABELS.BUTTONS.ADDING_TO_CART
            : PURCHASE_LABELS.BUTTONS.ADD_TO_CART
        }
        secondaryLabel={PURCHASE_LABELS.BUTTONS.GO_TO_LIST}
        onPrimaryClick={() => {
          Promise.resolve(handleAddToCart()).catch(() => {});
        }}
        onSecondaryClick={handleGoToList}
        isPrimaryDisabled={isDisabled}
      />
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast
            variant={toastVariant}
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
    </>
  );
};

export default PurchaseRequestDetailActionsOrg;
