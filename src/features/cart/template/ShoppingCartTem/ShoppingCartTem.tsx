'use client';

import StepBreadcrumb, {
  StepBreadcrumbStep,
} from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import CartSummaryBlockOrg, {
  CartRole,
  OrderItem,
} from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';

interface ShoppingCartTemProps {
  role: CartRole;
  items: OrderItem[];
  budget?: number;

  onDeleteSelected?: (ids: number[]) => void;
  onSubmit?: (itemIds: number[]) => void;
  onItemPurchase?: (params: { itemId: number; action: 'BUY_NOW' }) => void;
  onGoBudgetManage?: () => void;
}

/** =====================
 * StepBreadcrumb 설정
 ====================== */
const USER_STEPS: StepBreadcrumbStep[] = [
  { label: 'Shopping Cart' },
  { label: 'Order' },
  { label: 'Order Confirmed' },
];

const MANAGER_ADMIN_STEPS: StepBreadcrumbStep[] = [
  { label: 'Shopping Cart' },
  { label: 'Order Confirmed' },
];

const ShoppingCartTem = ({
  role,
  items,
  budget,
  onDeleteSelected,
  onSubmit,
  onItemPurchase,
  onGoBudgetManage,
}: ShoppingCartTemProps) => {
  const isUser = role === 'user';

  const steps = isUser ? USER_STEPS : MANAGER_ADMIN_STEPS;

  /**
   * 현재 페이지는 "Shopping Cart"
   * - StepBreadcrumb은 1-based index
   */
  const currentStep = 1;

  return (
    <div className="mx-auto">
      {/* ✅ 페이지 콘텐츠 컨테이너 */}
      <div
        className="
          mx-auto
          mt-60 tablet:mt-60 desktop:mt-80
          w-327
          tablet:w-696
          desktop:w-1150
        "
      >
        {/* ✅ StepBreadcrumb – 여백은 Template에서만 관리 */}
        <div className="flex justify-center mb-40 tablet:mb-70 desktop:mb-70">
          <StepBreadcrumb steps={steps} currentStep={currentStep} />
        </div>

        {/* ✅ Cart Summary (하단 버튼 포함) */}
        <CartSummaryBlockOrg
          role={role}
          items={items}
          budget={budget}
          onDeleteSelected={onDeleteSelected}
          onSubmit={onSubmit}
          onItemPurchase={onItemPurchase}
          onGoBudgetManage={onGoBudgetManage}
        />
      </div>
    </div>
  );
};

export default ShoppingCartTem;
