'use client';

import { useEffect, useState, useRef, FormEvent } from 'react';
import Image from 'next/image';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import TextAreaField from '@/components/molecules/TextAreaField/TextAreaField';
import Button from '@/components/atoms/Button/Button';
import { clsx } from '@/utils/clsx';

interface Item {
  id: number;
  title: string;
  price: number;
  quantity: number;
  icon?: React.ReactNode;
}

type ModalAction = 'approve' | 'reject';

interface ApprovalRequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void | Promise<void>;
  user: {
    name: string;
    company: { name: string };
    avatarSrc?: string;
  };
  items: Item[];
  deliveryFee: number;
  budget: number;
  action: ModalAction;
}

const ApprovalRequestModal = ({
  open,
  onClose,
  onSubmit,
  user,
  items,
  deliveryFee,
  budget,
  action,
}: ApprovalRequestModalProps) => {
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const calculatedItems = items.map((item) => ({
    ...item,
    totalPrice: item.price * item.quantity,
    icon: (
      <Image
        src="/images/zero-cola.svg"
        width={40}
        height={40}
        alt="아이템 아이콘"
        className="w-40 h-40 flex-shrink-0"
      />
    ),
  }));

  const orderAmount = calculatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const totalAmount = orderAmount + deliveryFee;
  const remainBudget = budget - totalAmount;

  const isScrollable = items.length >= 3;
  const isMessageValid = message.trim().length > 0;

  /* Escape 닫기 */
  useEffect(() => {
    if (!open) return undefined;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  /* autofocus */
  useEffect(() => {
    if (!open) return undefined;

    const modal = modalRef.current;
    if (!modal) return undefined;

    const firstAutofocus = modal.querySelector<HTMLElement>('[data-autofocus="true"]');
    if (firstAutofocus) firstAutofocus.focus();

    return undefined;
  }, [open]);

  /* Tab 키 포커스 트랩 */
  useEffect(() => {
    if (!open) return undefined;

    const modal = modalRef.current;
    if (!modal) return undefined;

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(modal.querySelectorAll<HTMLElement>(focusableSelectors));

    if (focusable.length === 0) return undefined;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open]);

  /* 메시지 리셋 */
  useEffect(() => {
    if (!open) {
      setMessage('');
      setTouched(false);
    }
    return undefined;
  }, [open]);

  /* Submit */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isMessageValid) {
      await onSubmit(message);
      return;
    }
    setTouched(true);
    textAreaRef.current?.focus();
  };

  if (!open) return null;

  const headerText = action === 'approve' ? '구매 요청 승인' : '구매 요청 반려';
  const labelText = action === 'approve' ? '승인 메시지' : '반려 메시지';
  const placeholderText =
    action === 'approve' ? '승인 메시지를 입력해주세요' : '반려 메시지를 입력해주세요';
  const buttonText = action === 'approve' ? '승인하기' : '반려하기';

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-modal flex items-center justify-center"
      onClick={onClose}
      onKeyDown={() => {}}
    >
      <div className="absolute inset-0 bg-black opacity-50" />

      <div
        ref={modalRef}
        role="presentation"
        className={clsx(
          'relative bg-white flex flex-col z-10 w-full h-full',
          'tablet:w-600 tablet:h-976',
          'desktop:w-600 desktop:h-976'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className={clsx(
            'flex flex-col w-full h-full pt-0 pb-24 px-24',
            'tablet:pt-40 tablet:px-60 tablet:pb-40',
            'desktop:pt-40 desktop:px-60 desktop:pb-40'
          )}
          onSubmit={(e) => {
            e.preventDefault();
            // 에러는 handleSubmit 내부의 onSubmit 호출자가 처리
            handleSubmit(e).catch(() => {
              // 에러는 호출자가 처리하도록 전파되지 않음 (의도적)
            });
          }}
        >
          <header className="flex flex-col items-center mb-12 py-16 px-8 tablet:mb-20 tablet:py-0 tablet:px-0 desktop:mb-20 desktop:py-0 desktop:px-0">
            <h2 className="text-18 font-bold tracking-tight">{headerText}</h2>
          </header>

          <section className="flex flex-col gap-20 mb-20">
            <UserProfile
              variant="default"
              name={user.name}
              company={user.company}
              avatarSrc={user.avatarSrc}
            />
            <div className="flex gap-6 items-baseline">
              <span className="text-16 font-bold text-gray-950 tracking-tight">요청 품목</span>
              <span className="text-14 tablet:text-16 text-gray-950 tracking-tight">
                총 {items.length}개
              </span>
            </div>
          </section>

          <section
            className={clsx(
              'w-full rounded-8 border border-gray-200 bg-white shadow-sm mb-20 p-20 flex flex-col gap-20',
              isScrollable && 'max-h-300 overflow-y-auto scrollbar-none'
            )}
          >
            <div className="flex flex-col w-full">
              {calculatedItems.map((item) => (
                <div key={item.id} className="w-full py-20 px-2 border-b border-gray-200">
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-12">
                      {item.icon}
                      <div className="flex flex-col">
                        <span className="text-14 tablet:text-16 text-gray-900">{item.title}</span>
                        <span className="text-14 tablet:text-16 text-gray-900">
                          {item.price.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                    <div
                      className={clsx(
                        'text-right flex flex-col',
                        'tablet:flex-row tablet:items-center tablet:gap-90'
                      )}
                    >
                      <span className="text-13 tablet:text-16 text-gray-500 whitespace-nowrap">
                        수량 {item.quantity}개
                      </span>
                      <span className="text-16 tablet:text-20 text-gray-700 whitespace-nowrap">
                        {item.totalPrice.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-10 text-16">
              <div className="flex justify-between items-center">
                <span className="text-16 text-gray-700 tablet:text-18">주문 금액</span>
                <span className="text-20 text-gray-700 tablet:text-24">
                  {orderAmount.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-16 text-gray-700 tablet:text-18">배송비</span>
                <span className="text-20 text-gray-700 tablet:text-24">
                  {deliveryFee.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between items-center font-bold mt-1">
                <span className="text-16 text-gray-950 tablet:text-18">총 주문 금액</span>
                <div className="text-20 text-gray-950 tablet:text-24 font-bold">
                  <span>{totalAmount.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full border border-gray-100 rounded-8 py-16 px-8 mb-20 flex justify-between items-center">
            <span className="text-16 tablet:text-18 font-bold">남은 예산 금액</span>
            <span className="text-20 tablet:text-24 font-bold">
              {remainBudget.toLocaleString()}원
            </span>
          </section>

          <section className="mb-18 tablet:mb-9 flex flex-col gap-1">
            <label
              htmlFor="approvalMessage"
              className="text-16 font-bold text-gray-950 tracking-tight mb-12"
            >
              {labelText}
            </label>

            <TextAreaField
              id="approvalMessage"
              ref={textAreaRef}
              placeholder={placeholderText}
              value={message}
              onFocus={() => setTouched(true)}
              onBlur={() => setTouched(true)}
              onChange={(e) => {
                if (e.target.value.length <= 50) setMessage(e.target.value);
              }}
              error={touched && !isMessageValid}
              label={undefined}
              className="scrollbar-none"
            />

            <div className="flex justify-between mt-1 text-14">
              <span className="text-red-500">
                {touched && !isMessageValid ? `${placeholderText} (최대 50자)` : '\u00A0'}
              </span>
              <span className="text-gray-400">{message.length}/50</span>
            </div>
          </section>

          <footer className="flex gap-20 w-full">
            <Button
              variant="secondary"
              size="lg"
              className="flex-1 h-56 cursor-pointer"
              type="button"
              onClick={onClose}
            >
              취소
            </Button>

            <Button
              variant="primary"
              size="lg"
              className="flex-1 h-56 cursor-pointer"
              type="submit"
              inactive={!isMessageValid}
            >
              {buttonText}
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default ApprovalRequestModal;
