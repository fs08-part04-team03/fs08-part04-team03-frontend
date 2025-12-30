'use client';

import { useEffect, useMemo, useState } from 'react';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import Button from '@/components/atoms/Button/Button';
import OrderItemCard from '@/components/molecules/OrderItemCard/OrderItemCard';
import PriceText from '@/components/atoms/PriceText/PriceText';
import { Toast } from '@/components/molecules/Toast/Toast';
import type { Option } from '@/components/atoms/DropDown/DropDown';

export type CartRole = 'user' | 'manager' | 'admin';

export interface OrderItem {
  cartItemId: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageSrc?: string;
}

interface CartSummaryBlockOrgProps {
  cartRole: CartRole;
  items: OrderItem[];
  budget?: number;
  onDeleteSelected?: (cartItemIds: string[]) => void;
  onSubmit?: (cartItemIds: string[]) => void;
  onGoBudgetManage?: () => void;
  onQuantityChange?: (cartItemId: string, quantity: number) => void;
}

interface PurchaseResponse {
  success: boolean;
  message?: string;
}

const CartSummaryBlockOrg = ({
  cartRole,
  items,
  budget = 0,
  onDeleteSelected,
  onSubmit,
  onGoBudgetManage,
  onQuantityChange,
}: CartSummaryBlockOrgProps) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [showBudgetToast, setShowBudgetToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const isAdminRole = cartRole === 'manager' || cartRole === 'admin';

  useEffect(() => {
    setCheckedIds((prev) => prev.filter((id) => items.some((i) => i.cartItemId === id)));
  }, [items]);

  const allChecked = items.length > 0 && checkedIds.length === items.length;

  const selectedItems = useMemo(
    () => items.filter((item) => checkedIds.includes(item.cartItemId)),
    [items, checkedIds]
  );

  const totalProductPrice = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [selectedItems]
  );

  const shippingFee = 0;
  const totalPrice = totalProductPrice + shippingFee;
  const remainBudget = budget - totalPrice;
  const isBudgetExceeded = isAdminRole && remainBudget < 0;

  const submitButtonLabel = useMemo(() => {
    if (cartRole === 'admin' && isBudgetExceeded) return '예산 관리';
    if (cartRole === 'manager' && isBudgetExceeded) return '긴급 구매 요청';
    return '구매 요청';
  }, [cartRole, isBudgetExceeded]);

  const handleToggleAll = (checked: boolean) => {
    setCheckedIds(checked ? items.map((i) => i.cartItemId) : []);
  };

  const handleToggleItem = (cartItemId: string, checked: boolean) => {
    setCheckedIds((prev) =>
      checked ? [...prev, cartItemId] : prev.filter((v) => v !== cartItemId)
    );
  };

  const handleQuantityChange = (cartItemId: string, option: Option) => {
    const quantity = Number(option.key);
    if (Number.isNaN(quantity)) return;
    onQuantityChange?.(cartItemId, quantity);
  };

  const handleDeleteSelected = () => {
    onDeleteSelected?.(checkedIds);
    setCheckedIds([]);
  };

  const handleAdminPurchaseNow = async (item: OrderItem) => {
    if (!isAdminRole || !checkedIds.includes(item.cartItemId) || isBudgetExceeded) return;

    try {
      setIsPurchasing(true);

      const response = await fetch('/api/v1/purchase/admin/purchaseNow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ productId: item.productId, quantity: item.quantity }],
          shippingFee: 0,
        }),
      });

      if (!response.ok) throw new Error('즉시 구매 실패');

      const result = (await response.json()) as PurchaseResponse;
      if (!result.success) throw new Error(result.message ?? '즉시 구매 실패');

      onSubmit?.([item.cartItemId]);
    } catch (error) {
      console.error(error);
      setErrorMessage('즉시 구매에 실패했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleManagerUrgentPurchase = async () => {
    if (checkedIds.length === 0) return;

    try {
      setIsPurchasing(true);

      const response = await fetch('/api/v1/purchase/user/urgentRequestPurchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: selectedItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
          shippingFee: 0,
          requestMessage: '긴급 구매 요청',
        }),
      });

      if (!response.ok) throw new Error('긴급 구매 요청 실패');

      const result = (await response.json()) as PurchaseResponse;
      if (!result.success) throw new Error(result.message ?? '긴급 구매 요청 실패');

      onSubmit?.(checkedIds);
    } catch (error) {
      console.error(error);
      setErrorMessage('긴급 구매 요청에 실패했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleSubmit = async () => {
    if (cartRole === 'admin' && isBudgetExceeded) {
      onGoBudgetManage?.();
      return;
    }

    if (cartRole === 'manager' && isBudgetExceeded) {
      await handleManagerUrgentPurchase();
      return;
    }

    onSubmit?.(checkedIds);
  };

  const handleSubmitClick = () => {
    handleSubmit().catch((err) => {
      console.error(err);
      setErrorMessage('요청 처리 중 오류가 발생했습니다.');
    });
  };

  return (
    <>
      <div className="mx-auto w-327 tablet:w-696 desktop:w-1150">
        <div className="rounded-default bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-12 py-16 tablet:px-16 desktop:px-20 shrink-0">
            <div className="flex items-center gap-10">
              <Checkbox checked={allChecked} onChange={handleToggleAll} aria-label="전체 선택" />
              <span className="text-black font-bold text-16 tablet:text-18 tracking--0.4 tablet:tracking--0.45">
                전체 선택 ({items.length}개)
              </span>
            </div>

            <button
              type="button"
              onClick={handleDeleteSelected}
              className="text-gray-600 underline text-14 tablet:text-16 tracking--0.35 tablet:tracking--0.4 cursor-pointer"
            >
              선택 삭제
            </button>
          </div>

          <div className="flex flex-col gap-12 overflow-y-auto scrollbar-none max-h-349 tablet:max-h-516 desktop:max-h-540">
            {items.map((item) => {
              const isChecked = checkedIds.includes(item.cartItemId);

              const purchaseButtonLabel = cartRole === 'user' ? '바로 요청' : '즉시 구매';
              const purchaseButtonDisabled =
                cartRole === 'user' || !isChecked || isBudgetExceeded || isPurchasing;

              return (
                <OrderItemCard
                  key={item.cartItemId}
                  name={item.name}
                  unitPrice={item.price}
                  quantity={item.quantity}
                  shippingCost={0}
                  imageSrc={item.imageSrc}
                  checked={isChecked}
                  onCheckboxChange={(checked) => handleToggleItem(item.cartItemId, checked)}
                  onQuantityChange={(option) => handleQuantityChange(item.cartItemId, option)}
                  purchaseButtonLabel={purchaseButtonLabel}
                  purchaseButtonDisabled={purchaseButtonDisabled}
                  onPurchaseClick={() => {
                    if (!purchaseButtonDisabled) {
                      handleAdminPurchaseNow(item).catch((err) => {
                        console.error(err);
                        setErrorMessage('즉시 구매 실패');
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-40 flex flex-col tablet:flex-row tablet:justify-between tablet:items-start gap-40 tablet:mt-70">
          <div className="flex flex-col gap-14">
            <p className="font-bold text-gray-950 text-24 tablet:text-30 tracking--0.6">
              총 주문금액 <PriceText value={totalPrice} />
            </p>

            <p className="text-16 text-gray-400 tracking--0.4">
              주문 상품은 {totalProductPrice.toLocaleString()}원
            </p>

            <p className="text-16 text-gray-400 tracking--0.4">
              배송비는 {shippingFee.toLocaleString()}원입니다.
            </p>

            {cartRole !== 'user' && (
              <p className="font-bold text-18 tracking--0.45 text-gray-700">
                {isBudgetExceeded ? '전체 예산 금액' : '남은 예산 금액'}{' '}
                <PriceText value={isBudgetExceeded ? budget : remainBudget} />
              </p>
            )}
          </div>

          <div
            className={`flex flex-col items-center gap-16 ${
              cartRole === 'user' ? 'tablet:gap-20' : 'tablet:gap-34'
            }`}
          >
            <Button
              variant="secondary"
              className="w-327 h-64 text-14 cursor-pointer font-bold tracking--0.4 tablet:w-296 tablet:text-16"
            >
              계속 쇼핑하기
            </Button>

            <Button
              variant="primary"
              className="w-327 h-64 text-14 cursor-pointer font-bold tracking--0.4 tablet:w-296 tablet:text-16"
              inactive={checkedIds.length === 0}
              onClick={handleSubmitClick}
            >
              {submitButtonLabel}
            </Button>
          </div>
        </div>
      </div>

      {showBudgetToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast
            variant="error"
            amount={remainBudget.toString()}
            onClose={() => setShowBudgetToast(false)}
          />
        </div>
      )}

      {errorMessage && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant="error" amount={errorMessage} onClose={() => setErrorMessage(null)} />
        </div>
      )}
    </>
  );
};

export default CartSummaryBlockOrg;
