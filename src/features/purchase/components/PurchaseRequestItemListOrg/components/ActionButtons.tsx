'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';
import {
  PURCHASE_LABELS,
  PURCHASE_SPACING,
  PURCHASE_ITEM_LIST_STYLES,
} from '@/features/purchase/constants';

interface ActionButtonsProps {
  isPending: boolean;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  purchaseRequestId: string;
  variant?: 'mobile' | 'desktop';
}

/**
 * 액션 버튼 그룹 컴포넌트
 */
export const ActionButtons = ({
  isPending,
  onReject,
  onApprove,
  onCancel,
  purchaseRequestId,
  variant = 'mobile',
}: ActionButtonsProps) => {
  const handleClick = (e: React.MouseEvent, handler?: (id: string) => void) => {
    e.stopPropagation();
    handler?.(purchaseRequestId);
  };

  if (!isPending) return null;

  const isMobile = variant === 'mobile';
  const buttonClassName = isMobile
    ? PURCHASE_ITEM_LIST_STYLES.BUTTON.MOBILE
    : PURCHASE_ITEM_LIST_STYLES.BUTTON.DESKTOP;

  return (
    <>
      {onReject && onApprove && (
        <div className={clsx('w-full', 'flex', PURCHASE_SPACING.GAP_SMALL)}>
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => handleClick(e, onReject)}
            className={buttonClassName}
          >
            {PURCHASE_LABELS.BUTTONS.REJECT}
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => handleClick(e, onApprove)}
            className={buttonClassName}
          >
            {PURCHASE_LABELS.BUTTONS.APPROVE}
          </Button>
        </div>
      )}
      {onCancel && (
        <div className={clsx('w-full', 'flex', PURCHASE_SPACING.GAP_SMALL)}>
          <Button
            variant="secondary"
            onClick={(e) => handleClick(e, onCancel)}
            className={buttonClassName}
          >
            {PURCHASE_LABELS.BUTTONS.CANCEL}
          </Button>
        </div>
      )}
    </>
  );
};
