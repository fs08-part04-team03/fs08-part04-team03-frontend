'use client';

import StepBreadcrumb, {
  StepBreadcrumbStep,
} from '@/components/molecules/StepBreadcrumb/StepBreadcrumb';
import OrderCompletedSummaryOrg, {
  OrderCompletedItem,
} from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';

interface OrderTemProps {
  items: OrderCompletedItem[];
  shippingFee: number;

  onGoCart?: () => void;
  onGoOrderHistory?: () => void;
}

const steps: StepBreadcrumbStep[] = [
  { label: 'Shopping Cart' },
  { label: 'Order' },
  { label: 'Order Confirmed' },
];

const OrderTem = ({ items, shippingFee, onGoCart, onGoOrderHistory }: OrderTemProps) => (
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
        <StepBreadcrumb steps={steps} currentStep={2} />
      </div>

      {/* ✅ User 구매 요청 전용 */}
      <OrderCompletedSummaryOrg
        cartRole="user"
        userType="request"
        items={items}
        shippingFee={shippingFee}
        onGoCart={onGoCart}
        onGoOrderHistory={onGoOrderHistory}
      />
    </div>
  </div>
);

export default OrderTem;
