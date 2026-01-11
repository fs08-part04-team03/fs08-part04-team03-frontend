'use client';

import StepBreadcrumb from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import OrderCompletedSummaryOrg, {
  OrderCompletedItem,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import { CART_ORDER_STEPS } from '@/features/cart/constants/steps';

interface OrderTemProps {
  items: OrderCompletedItem[];
  shippingFee: number;

  onGoCart?: () => void;
  onGoOrderHistory?: () => void;
  onPurchaseRequest?: (requestMessage: string, isUrgent?: boolean) => void;
}

/**
 * OrderTem
 * - 순수 UI 조립 레이어
 * - header / list / row / footer 컴포지션만 담당
 * - props 기반 렌더링만 수행
 */

const OrderTem = ({
  items,
  shippingFee,
  onGoCart,
  onGoOrderHistory,
  onPurchaseRequest,
}: OrderTemProps) => (
  <div className="mx-auto">
    {/* ✅ 페이지 콘텐츠 컨테이너 */}
    <div
      className="
          mx-auto
          mt-60 tablet:mt-60 desktop:mt-80
          w-327
          tablet:w-696
          desktop:w-1200
        "
    >
      {/* ✅ StepBreadcrumb – 여백은 Template에서만 관리 */}
      <div className="flex justify-center mb-40 tablet:mb-70 desktop:mb-70">
        <StepBreadcrumb steps={CART_ORDER_STEPS} currentStep={2} />
      </div>

      {/* ✅ User 구매 요청 전용 */}
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

export default OrderTem;
