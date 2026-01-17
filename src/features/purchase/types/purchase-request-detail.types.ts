/**
 * PurchaseRequestDetailTem 그룹화된 Props 타입
 */

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

/**
 * 예산 상태
 */
export interface PurchaseDetailBudgetState {
  budget: number;
  monthlySpending: number;
  remainingBudget: number;
  isBudgetSufficient: boolean;
}

/**
 * 모달 상태
 */
export interface PurchaseDetailModalState {
  approveModalOpen: boolean;
  rejectModalOpen: boolean;
}

/**
 * 모달 핸들러
 */
export interface PurchaseDetailModalHandlers {
  onApproveClick: () => void;
  onRejectClick: () => void;
  onApproveModalClose: () => void;
  onRejectModalClose: () => void;
  onApproveSubmit: (message: string) => void | Promise<void>;
  onRejectSubmit: (message: string) => void | Promise<void>;
}

/**
 * 그룹화된 Props
 */
export interface PurchaseRequestDetailTemGroupedProps {
  purchaseRequest: PurchaseRequestItem;
  companyId: string;
  budgetState: PurchaseDetailBudgetState;
  modalState: PurchaseDetailModalState;
  modalHandlers: PurchaseDetailModalHandlers;
}
