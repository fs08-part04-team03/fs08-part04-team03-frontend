'use client';

import { useState, useRef, FormEvent } from 'react';
import OrderItemCard from '@/components/molecules/OrderItemCard/OrderItemCard';
import Button from '@/components/atoms/Button/Button';
import PriceText from '@/components/atoms/PriceText/PriceText';
import { clsx } from '@/utils/clsx';

export interface OrderCompletedItem {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  imageSrc?: string;
}

type Role = 'user' | 'manager' | 'admin';
type UserType = 'default' | 'request';

interface OrderCompletedSummaryOrgProps {
  role: Role;
  userType?: UserType;
  items: OrderCompletedItem[];
  shippingFee: number;
  requestMessage?: string;
  onGoCart?: () => void;
  onGoOrderHistory?: () => void;
}

const MAX_LENGTH = 50;

const OrderCompletedSummaryOrg: React.FC<OrderCompletedSummaryOrgProps> = ({
  role,
  userType = 'default',
  items,
  shippingFee,
  requestMessage = '',
  onGoCart,
  onGoOrderHistory,
}) => {
  const isUser = role === 'user';
  const isRequestUser = isUser && userType === 'request';
  const isDefaultUser = isUser && userType === 'default';

  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const orderPrice = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const totalPrice = orderPrice + shippingFee;

  const isMessageValid = message.trim().length > 0;
  const isSubmitDisabled = isUser && isRequestUser && !isMessageValid;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitDisabled) {
      setTouched(true);
      textAreaRef.current?.focus();
      return;
    }

    onGoOrderHistory?.();
  };

  const renderButtons = () => (
    <div
      className={clsx(
        'py-24 tablet:py-0 flex gap-16 tablet:gap-20 desktop:justify-center tablet:mt-50 desktop:mt-60',
        isUser ? 'mt-0' : 'mt-84'
      )}
    >
      <Button
        variant="secondary"
        className="cursor-pointer w-155.5 h-64 tablet:w-338 desktop:w-300"
        onClick={onGoCart}
      >
        장바구니로
      </Button>

      <Button
        className="cursor-pointer w-155.5 h-64 tablet:w-338 desktop:w-300"
        type={isRequestUser ? 'submit' : 'button'}
        inactive={isSubmitDisabled}
      >
        {isRequestUser ? '구매 요청' : '구매내역 확인'}
      </Button>
    </div>
  );

  return (
    <section className="w-327 tablet:w-696 desktop:w-1200 mx-auto">
      {!isRequestUser && (
        <h3 className="text-center font-bold text-24 tracking--0.6 text-gray-950 tablet:text-30 tablet:tracking--0.75 desktop:text-30 desktop:tracking--0.75">
          구매가 완료되었습니다
        </h3>
      )}

      <div className="mt-40 tablet:mt-70 flex items-center gap-6 px-12">
        <span className="font-bold text-16 tracking--0.4 text-gray-950">요청 품목</span>
        <span className="font-normal text-16 tracking--0.4 text-gray-950">총 {items.length}개</span>
      </div>

      <div className="mt-20 rounded-default bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.12)]">
        <div className="max-h-260 overflow-y-auto scrollbar-none tablet:max-h-360 tablet:px-14 tablet:pt-28 desktop:max-h-400 desktop:px-50 desktop:pt-44">
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <OrderItemCard
                key={item.id}
                variant="confirm"
                name={item.name}
                unitPrice={item.unitPrice}
                quantity={item.quantity}
                imageSrc={item.imageSrc}
              />
            ))}
          </div>
        </div>

        <div className="mt-32 px-12 pb-8 tablet:mt-28 desktop:mt-24 space-y-16 tablet:space-y-10 tablet:px-30 tablet:pb-30 desktop:px-70 desktop:pb-40">
          <div className="flex justify-between items-center">
            <span className="font-bold text-14 tracking--0.35 text-gray-700 tablet:text-16 tablet:tracking--0.4">
              주문 금액
            </span>
            <PriceText value={orderPrice} />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-14 tracking--0.35 text-gray-700 tablet:text-16 tablet:tracking--0.4">
              배송비
            </span>
            <PriceText value={shippingFee} />
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-18 tracking--0.45 text-gray-950">총 주문 금액</span>
            <PriceText
              value={totalPrice}
              className="font-bold text-18 tracking--0.45 text-gray-950"
            />
          </div>
        </div>
      </div>

      {isRequestUser && (
        <form onSubmit={handleSubmit}>
          <div className="mx-auto mt-40">
            <span
              id="order-request-label"
              className="block text-16 font-bold text-gray-950 tracking-tight mb-14 tablet:mb-20"
            >
              요청 사항
            </span>

            <textarea
              aria-labelledby="order-request-label"
              ref={textAreaRef}
              value={message}
              placeholder="메시지를 입력해주세요."
              onChange={(e) => {
                if (e.target.value.length <= MAX_LENGTH) {
                  setMessage(e.target.value);
                }
              }}
              onBlur={() => setTouched(true)}
              className={clsx(
                `
                  block
                  w-326.5 h-165
                  tablet:w-696 desktop:w-1200
                  px-12 py-8
                  text-16 tracking-tight
                  border rounded-default resize-none
                `,
                touched && !isMessageValid
                  ? 'border-error-500'
                  : 'border-gray-300 focus:border-gray-500'
              )}
            />

            <div className="flex justify-between mt-4 text-14">
              <span className="text-error-500">
                {touched && !isMessageValid ? '요청 사항을 입력해주세요 (최대 50자)' : '\u00A0'}
              </span>
              <span className="text-gray-400">
                {message.length}/{MAX_LENGTH}
              </span>
            </div>
          </div>

          {renderButtons()}
        </form>
      )}

      {isDefaultUser && (
        <div className="mx-auto mt-40">
          <span className="block text-16 font-bold text-gray-950 tracking-tight mb-14 tablet:mb-20">
            요청 사항
          </span>

          <div
            className="
              w-326.5 h-165
              tablet:w-696 desktop:w-1200
              px-12 py-8
              text-16 tracking-tight
              border border-gray-300 rounded-default
              bg-gray-50
              whitespace-pre-wrap
            "
          >
            {requestMessage || '요청 사항이 없습니다.'}
          </div>
        </div>
      )}

      {!isRequestUser && renderButtons()}
    </section>
  );
};

export default OrderCompletedSummaryOrg;
