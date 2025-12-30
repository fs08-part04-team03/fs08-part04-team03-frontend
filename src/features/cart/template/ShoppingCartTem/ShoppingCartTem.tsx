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

  /** ✅ cartItemId(UUID) 기준 */
  onDeleteSelected?: (ids: string[]) => void;
  onSubmit?: (itemIds: string[]) => void;
  onGoBudgetManage?: () => void;

  /** ✅ 수량 변경 */
  onQuantityChange?: (cartItemId: string, quantity: number) => void;
}

/** StepBreadcrumb 설정 */
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
  onGoBudgetManage,
  onQuantityChange, // ✅ 추가
}: ShoppingCartTemProps) => {
  const isUser = role === 'user';
  const currentStep = 1;

  return (
    <div className="mx-auto">
      <div
        className="
          mx-auto
          mt-60 tablet:mt-60 desktop:mt-80
          w-327 tablet:w-696 desktop:w-1200
          desktop:px-25
        "
      >
        <div className="flex justify-center mb-40 tablet:mb-70">
          <StepBreadcrumb
            steps={isUser ? USER_STEPS : MANAGER_ADMIN_STEPS}
            currentStep={currentStep}
          />
        </div>

        <CartSummaryBlockOrg
          role={role}
          items={items}
          budget={budget}
          onDeleteSelected={onDeleteSelected}
          onSubmit={onSubmit}
          onGoBudgetManage={onGoBudgetManage}
          onQuantityChange={onQuantityChange} // ✅ 그대로 패스
        />
      </div>
    </div>
  );
};

export default ShoppingCartTem;
