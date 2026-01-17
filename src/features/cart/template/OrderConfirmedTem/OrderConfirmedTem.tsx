'use client';

import StepBreadcrumb from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import type { CartRole } from '@/features/cart/types/cart-summary.types';
import OrderCompletedSummaryOrg, {
  OrderCompletedItem,
  UserType,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import { clsx } from '@/utils/clsx';
import { CART_USER_STEPS, CART_MANAGER_ADMIN_STEPS } from '@/features/cart/constants/steps';
import type { OrderConfirmedTemGroupedProps } from '@/features/cart/types/order.types';

interface OrderConfirmedTemLegacyProps {
  cartRole: CartRole;
  userType?: UserType;
  items: OrderCompletedItem[];
  shippingFee: number;
  requestMessage?: string;
  onGoCart?: () => void;
  onGoOrderHistory?: () => void;
}

type OrderConfirmedTemProps = OrderConfirmedTemLegacyProps | OrderConfirmedTemGroupedProps;

function isGroupedProps(props: OrderConfirmedTemProps): props is OrderConfirmedTemGroupedProps {
  return 'dataState' in props && 'roleState' in props && 'navigationHandlers' in props;
}

/**
 * OrderConfirmedTem
 * - 순수 UI 조립 레이어
 * - props 기반 렌더링만 수행
 */
const OrderConfirmedTem = (props: OrderConfirmedTemProps) => {
  // Props 정규화
  /* eslint-disable react/destructuring-assignment */
  const { cartRole, userType, items, shippingFee, requestMessage, onGoCart, onGoOrderHistory } =
    isGroupedProps(props)
      ? {
          cartRole: props.roleState.cartRole,
          userType: props.roleState.userType,
          items: props.dataState.items,
          shippingFee: props.dataState.shippingFee,
          requestMessage: props.dataState.requestMessage,
          onGoCart: props.navigationHandlers.onGoCart,
          onGoOrderHistory: props.navigationHandlers.onGoOrderHistory,
        }
      : {
          ...props,
          userType: props.userType ?? 'default',
        };
  /* eslint-enable react/destructuring-assignment */

  const isUser = cartRole === 'user';
  const steps = isUser ? CART_USER_STEPS : CART_MANAGER_ADMIN_STEPS;
  const currentStep = steps.length;

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
        <div
          className={clsx(
            'flex justify-center',
            isUser ? 'mb-40 tablet:mb-70 desktop:mb-70' : 'mb-24 tablet:mb-32'
          )}
        >
          <StepBreadcrumb steps={steps} currentStep={currentStep} />
        </div>

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
