'use client';

import StepBreadcrumb, {
  StepBreadcrumbStep,
} from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import CartSummaryBlockOrg, {
  CartRole,
  OrderItem,
} from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';

interface ShoppingCartTemProps {
  cartRole: CartRole; // 🔥 변경
  items: OrderItem[];
  budget?: number;

  onDeleteSelected?: (ids: string[]) => void;
  onSubmit?: (itemIds: string[]) => void;
  onGoBudgetManage?: () => void;
  onQuantityChange?: (cartItemId: string, quantity: number) => void;
}

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
  cartRole,
  items,
  budget,
  onDeleteSelected,
  onSubmit,
  onGoBudgetManage,
  onQuantityChange,
}: ShoppingCartTemProps) => {
  const isUser = cartRole === 'user';
  const currentStep = 1;

  return (
    <div className="mx-auto">
      <div className="mx-auto mt-60 tablet:mt-60 desktop:mt-80 w-327 tablet:w-696 desktop:w-1200 desktop:px-25">
        <div className="flex justify-center mb-40 tablet:mb-70">
          <StepBreadcrumb
            steps={isUser ? USER_STEPS : MANAGER_ADMIN_STEPS}
            currentStep={currentStep}
          />
        </div>

        <CartSummaryBlockOrg
          cartRole={cartRole} // 🔥 같이 변경 (권장)
          items={items}
          budget={budget}
          onDeleteSelected={onDeleteSelected}
          onSubmit={onSubmit}
          onGoBudgetManage={onGoBudgetManage}
          onQuantityChange={onQuantityChange}
        />
      </div>
    </div>
  );
};

export default ShoppingCartTem;
