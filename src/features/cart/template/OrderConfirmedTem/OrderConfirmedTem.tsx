'use client';

import StepBreadcrumb from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import type { CartRole } from '@/features/cart/types/cart-summary.types';
import OrderCompletedSummaryOrg, {
  OrderCompletedItem,
  UserType,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import { clsx } from '@/utils/clsx';
import { CART_USER_STEPS, CART_MANAGER_ADMIN_STEPS } from '@/features/cart/constants/steps';

interface OrderConfirmedTemProps {
  cartRole: CartRole;
  userType?: UserType;

  items: OrderCompletedItem[];
  shippingFee: number;
  requestMessage?: string;

  onGoCart?: () => void;
  onGoOrderHistory?: () => void;
}

/**
 * OrderConfirmedTem
 * - 순수 UI 조립 레이어
 * - header / list / row / footer 컴포지션만 담당
 * - props 기반 렌더링만 수행
 */

const OrderConfirmedTem = ({
  cartRole,
  userType = 'default',
  items,
  shippingFee,
  requestMessage,
  onGoCart,
  onGoOrderHistory,
}: OrderConfirmedTemProps) => {
  const isUser = cartRole === 'user';

  /**
   * 현재 페이지는 "Order Confirmed"
   * - StepBreadcrumb은 1-based index
   */
  const steps = isUser ? CART_USER_STEPS : CART_MANAGER_ADMIN_STEPS;
  const currentStep = steps.length; // 항상 마지막 단계

  return (
    <div className="mx-auto">
      <div
        className="
          mx-auto
          mt-60 tablet:mt-60 desktop:mt-80
          w-327
          tablet:w-696
          desktop:w-1150
        "
      >
        {/* ✅ StepBreadcrumb (모든 cartRole 노출, 여백은 Template에서만 제어) */}
        <div
          className={clsx(
            'flex justify-center',
            isUser ? 'mb-40 tablet:mb-70 desktop:mb-70' : 'mb-24 tablet:mb-32'
          )}
        >
          <StepBreadcrumb steps={steps} currentStep={currentStep} />
        </div>

        {/* ✅ Order Completed Summary */}
        <OrderCompletedSummaryOrg
          cartRole={cartRole}
          userType={userType}
          items={items}
          shippingFee={shippingFee}
          requestMessage={requestMessage}
          onGoCart={onGoCart}
          onGoOrderHistory={onGoOrderHistory}
        />
      </div>
    </div>
  );
};

export default OrderConfirmedTem;
