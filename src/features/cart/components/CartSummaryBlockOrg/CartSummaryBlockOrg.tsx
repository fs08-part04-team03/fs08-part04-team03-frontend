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
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  shippingCost: number;
  imageSrc?: string;
}

interface CartSummaryBlockOrgProps {
  role: CartRole;
  items: OrderItem[];
  budget?: number;

  onDeleteSelected?: (ids: number[]) => void;
  onSubmit?: (itemIds: number[]) => void;
  onItemPurchase?: (params: { itemId: number; action: 'BUY_NOW' }) => void;
  onGoBudgetManage?: () => void;
}

const CartSummaryBlockOrg = ({
  role,
  items,
  budget = 0,
  onDeleteSelected,
  onSubmit,
  onItemPurchase,
  onGoBudgetManage,
}: CartSummaryBlockOrgProps) => {
  /** =====================
   * 상태
   ====================== */
  const [cartItems, setCartItems] = useState<OrderItem[]>(items);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [showBudgetToast, setShowBudgetToast] = useState(false);

  useEffect(() => {
    setCartItems(items);
    setCheckedIds((prev) => prev.filter((id) => items.some((i) => i.id === id)));
  }, [items]);

  /** =====================
   * 파생 상태
   ====================== */
  const allChecked = cartItems.length > 0 && checkedIds.length === cartItems.length;

  const selectedItems = useMemo(
    () => cartItems.filter((item) => checkedIds.includes(item.id)),
    [cartItems, checkedIds]
  );

  const totalProductPrice = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [selectedItems]
  );

  const shippingFee = useMemo(() => {
    if (selectedItems.length === 0) return 0;
    return Math.max(...selectedItems.map((item) => item.shippingCost));
  }, [selectedItems]);

  const totalPrice = totalProductPrice + shippingFee;
  const remainBudget = budget - totalPrice;
  const isBudgetExceeded = role !== 'user' && remainBudget < 0;

  /** =====================
   * 핸들러
   ====================== */
  const handleToggleAll = (checked: boolean) => {
    setCheckedIds(checked ? cartItems.map((i) => i.id) : []);
  };

  const handleToggleItem = (id: number, checked: boolean) => {
    setCheckedIds((prev) => (checked ? [...prev, id] : prev.filter((v) => v !== id)));
  };

  const handleQuantityChange = (id: number, option: Option) => {
    const quantity = Number(option.key);
    if (Number.isNaN(quantity)) return;

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleDeleteSelected = () => {
    setCartItems((prev) => prev.filter((item) => !checkedIds.includes(item.id)));
    onDeleteSelected?.(checkedIds);
    setCheckedIds([]);
  };

  const handleSubmitClick = () => {
    if (role === 'manager' && isBudgetExceeded) {
      setShowBudgetToast(true);
      return;
    }

    if (role === 'admin' && isBudgetExceeded) {
      onGoBudgetManage?.();
      return;
    }

    onSubmit?.(checkedIds);
  };

  /** =====================
   * 렌더
   ====================== */
  return (
    <>
      <div className="mx-auto w-327 tablet:w-696 desktop:w-1150">
        <div className="rounded-default bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.12)] overflow-hidden flex flex-col">
          {/* 상단 */}
          <div className="flex items-center justify-between px-12 py-16 tablet:px-16 desktop:px-20 shrink-0">
            <div className="flex items-center gap-10">
              <Checkbox checked={allChecked} onChange={handleToggleAll} aria-label="전체 선택" />
              <span className="text-black font-bold text-16 tablet:text-18 tracking--0.4 tablet:tracking--0.45">
                전체 선택 ({cartItems.length}개)
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

          {/* 상품 리스트 */}
          <div className="flex flex-col gap-12 overflow-y-auto scrollbar-none max-h-349 tablet:max-h-516 desktop:max-h-540">
            {cartItems.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              const showPurchaseButton = isChecked;

              let purchaseButtonLabel: string | undefined;
              if (role === 'user') {
                purchaseButtonLabel = '바로 요청';
              } else if (showPurchaseButton) {
                purchaseButtonLabel = '즉시 구매';
              }

              const purchaseButtonDisabled = role === 'user' || !isChecked || isBudgetExceeded;

              const handlePurchaseClick =
                role !== 'user' && showPurchaseButton && !isBudgetExceeded
                  ? () =>
                      onItemPurchase?.({
                        itemId: item.id,
                        action: 'BUY_NOW',
                      })
                  : undefined;

              return (
                <OrderItemCard
                  key={item.id}
                  name={item.name}
                  unitPrice={item.unitPrice}
                  quantity={item.quantity}
                  shippingCost={item.shippingCost}
                  imageSrc={item.imageSrc}
                  checked={isChecked}
                  onCheckboxChange={(checked) => handleToggleItem(item.id, checked)}
                  onQuantityChange={(option) => handleQuantityChange(item.id, option)}
                  purchaseButtonLabel={purchaseButtonLabel}
                  purchaseButtonDisabled={purchaseButtonDisabled}
                  onPurchaseClick={handlePurchaseClick}
                />
              );
            })}
          </div>
        </div>

        {/* 하단 */}
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

            {role !== 'user' && (
              <p className="font-bold text-18 tracking--0.45 text-gray-700">
                {isBudgetExceeded ? '전체 예산 금액' : '남은 예산 금액'}{' '}
                <PriceText value={isBudgetExceeded ? budget : remainBudget} />
              </p>
            )}
          </div>

          <div
            className={`flex flex-col items-center gap-16 ${
              role === 'user' ? 'tablet:gap-20' : 'tablet:gap-34'
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
              inactive={checkedIds.length === 0 && !(role === 'admin' && isBudgetExceeded)}
              onClick={handleSubmitClick}
            >
              {role === 'admin' && isBudgetExceeded ? '예산 관리' : '구매 요청'}
            </Button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showBudgetToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast
            variant="error"
            amount={remainBudget.toString()}
            onClose={() => setShowBudgetToast(false)}
          />
        </div>
      )}
    </>
  );
};

export default CartSummaryBlockOrg;
