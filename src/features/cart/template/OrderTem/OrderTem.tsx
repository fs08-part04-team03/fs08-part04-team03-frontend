'use client';

import StepBreadcrumb from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import OrderCompletedSummaryOrg, {
  OrderCompletedItem,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import { CART_ORDER_STEPS } from '@/features/cart/constants/steps';
import type { OrderTemGroupedProps } from '@/features/cart/types/order.types';

interface OrderTemLegacyProps {
  items: OrderCompletedItem[];
  shippingFee: number;
  onGoCart?: () => void;
  onGoOrderHistory?: () => void;
  onPurchaseRequest?: (requestMessage: string, isUrgent?: boolean) => void;
}

type OrderTemProps = OrderTemLegacyProps | OrderTemGroupedProps;

function isGroupedProps(props: OrderTemProps): props is OrderTemGroupedProps {
  return 'dataState' in props && 'navigationHandlers' in props;
}

/**
 * OrderTem
 * - 순수 UI 조립 레이어
 * - props 기반 렌더링만 수행
 */
const OrderTem = (props: OrderTemProps) => {
  // Props 정규화
  /* eslint-disable react/destructuring-assignment */
  const { items, shippingFee, onGoCart, onGoOrderHistory, onPurchaseRequest } = isGroupedProps(
    props
  )
    ? {
        items: props.dataState.items,
        shippingFee: props.dataState.shippingFee,
        onGoCart: props.navigationHandlers.onGoCart,
        onGoOrderHistory: props.navigationHandlers.onGoOrderHistory,
        onPurchaseRequest: props.navigationHandlers.onPurchaseRequest,
      }
    : props;
  /* eslint-enable react/destructuring-assignment */

  return (
    <div className="mx-auto">
      <div
        className="
          mx-auto
          mt-60 tablet:mt-60 desktop:mt-80
          w-327
          tablet:w-696
          desktop:w-1200
        "
      >
        <div className="flex justify-center mb-40 tablet:mb-70 desktop:mb-70">
          <StepBreadcrumb steps={CART_ORDER_STEPS} currentStep={2} />
        </div>

        <OrderCompletedSummaryOrg
          cartRole="user"
          userType="request"
          items={items}
          shippingFee={shippingFee}
          onGoCart={onGoCart}
          onGoOrderHistory={onGoOrderHistory}
          onPurchaseRequest={onPurchaseRequest}
        />
      </div>
    </div>
  );
};

export default OrderTem;
