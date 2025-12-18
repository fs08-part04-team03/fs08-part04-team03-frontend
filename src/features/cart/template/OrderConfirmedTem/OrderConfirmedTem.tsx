'use client';

import StepBreadcrumb, {
  StepBreadcrumbStep,
} from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import OrderCompletedSummaryOrg, {
  OrderCompletedItem,
  CartRole,
  UserType,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import { clsx } from '@/utils/clsx';

interface OrderConfirmedTemProps {
  cartRole: CartRole;
  userType?: UserType;

  items: OrderCompletedItem[];
  shippingFee: number;
  requestMessage?: string;

  onGoCart?: () => void;
  onGoOrderHistory?: () => void;
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
  const steps = isUser ? USER_STEPS : MANAGER_ADMIN_STEPS;
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
