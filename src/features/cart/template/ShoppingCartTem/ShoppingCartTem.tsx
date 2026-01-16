'use client';

import StepBreadcrumb from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import CartSummaryBlockOrg, {
  CartRole,
  OrderItem,
} from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import { CART_USER_STEPS, CART_MANAGER_ADMIN_STEPS } from '@/features/cart/constants/steps';

interface ShoppingCartTemProps {
  dataState: {
    cartRole: CartRole;
    items: OrderItem[];
    budget?: number;
    loading?: boolean;
  };
  actionHandlers?: {
    onDeleteSelected?: (ids: string[]) => void;
    onSubmit?: (itemIds: string[]) => void;
    onGoBudgetManage?: () => void;
    onQuantityChange?: (cartItemId: string, quantity: number) => void;
    onContinueShopping?: () => void;
  };
}

/**
 * ShoppingCartTem
 * - 순수 UI 조립 레이어
 * - header / list / row / footer 컴포지션만 담당
 * - props 기반 렌더링만 수행
 */
const ShoppingCartTem = ({ dataState, actionHandlers }: ShoppingCartTemProps) => {
  const { cartRole } = dataState;
  const isUser = cartRole === 'user';
  const currentStep = 1;

  return (
    <div className="mx-auto">
      <div className="mx-auto mt-60 tablet:mt-60 desktop:mt-80 w-327 tablet:w-696 desktop:w-1200 desktop:px-25">
        <div className="flex justify-center mb-40 tablet:mb-70">
          <StepBreadcrumb
            steps={isUser ? CART_USER_STEPS : CART_MANAGER_ADMIN_STEPS}
            currentStep={currentStep}
          />
        </div>

        <CartSummaryBlockOrg dataState={dataState} actionHandlers={actionHandlers} />
      </div>
    </div>
  );
};

export default ShoppingCartTem;
