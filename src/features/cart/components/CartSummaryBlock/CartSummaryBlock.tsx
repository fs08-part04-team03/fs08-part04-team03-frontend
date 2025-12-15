'use client';

import { useEffect, useMemo, useState } from 'react';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import Button from '@/components/atoms/Button/Button';
import OrderItemCard from '@/components/molecules/OrderItemCard/OrderItemCard';
import PriceText from '@/components/atoms/PriceText/PriceText';
import type { Option } from '@/components/atoms/DropDown/DropDown';

interface OrderItem {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  shippingCost: number;
  imageSrc?: string;
}

interface CartSummaryBlockProps {
  items: OrderItem[];
  budget: number;
  onDeleteSelected?: (ids: number[]) => void;
  onSubmit?: () => void;
}

const CartSummaryBlock = ({ items, budget, onDeleteSelected, onSubmit }: CartSummaryBlockProps) => {
  /** =====================
   * 상태
   ====================== */
  const [cartItems, setCartItems] = useState<OrderItem[]>(items);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  /** =====================
   * 🔁 props → state 동기화
   ====================== */
  useEffect(() => {
    setCartItems(items);

    // items 변경 시, 더 이상 존재하지 않는 체크 id 제거
    setCheckedIds((prev) => prev.filter((id) => items.some((item) => item.id === id)));
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
  const isBudgetLackForSelected = remainBudget < 0;

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

  /** =====================
   * 렌더
   ====================== */
  return (
    <div
      className="
        mx-auto
        w-327
        tablet:w-696
        desktop:w-1150
      "
    >
      {/* 카드 영역 */}
      <div
        className="
          rounded-default
          bg-white
          shadow-[0_0_10px_0_rgba(0,0,0,0.12)]
          overflow-hidden
          flex flex-col
        "
      >
        {/* 상단 전체 선택 */}
        <div className="flex items-center justify-between px-12 py-16 tablet:px-16 desktop:px-20 shrink-0">
          <div className="flex items-center gap-10">
            <Checkbox checked={allChecked} onChange={handleToggleAll} aria-label="전체 선택" />
            <span
              className="
                text-black font-bold
                text-16 tablet:text-18
                tracking--0.4 tablet:tracking--0.45
              "
            >
              전체 선택 ({cartItems.length}개)
            </span>
          </div>

          <button
            type="button"
            onClick={handleDeleteSelected}
            className="
              text-gray-600 underline
              text-14 tablet:text-16
              tracking--0.35 tablet:tracking--0.4
            "
          >
            선택 삭제
          </button>
        </div>

        {/* 상품 리스트 (스크롤 영역) */}
        <div
          className="
            flex flex-col gap-12
            overflow-y-auto
            scrollbar-none
            max-h-[60vh]
            tablet:max-h-[70vh]
          "
        >
          {cartItems.map((item) => {
            const isItemChecked = checkedIds.includes(item.id);

            const purchaseButtonLabel =
              !isItemChecked || !isBudgetLackForSelected ? '즉시 구매' : '바로 요청';

            return (
              <OrderItemCard
                key={item.id}
                name={item.name}
                unitPrice={item.unitPrice}
                quantity={item.quantity}
                shippingCost={item.shippingCost}
                imageSrc={item.imageSrc}
                checked={isItemChecked}
                onCheckboxChange={(checked) => handleToggleItem(item.id, checked)}
                onQuantityChange={(option) => handleQuantityChange(item.id, option)}
                purchaseButtonLabel={purchaseButtonLabel}
                onPurchaseClick={() => {
                  if (isItemChecked && isBudgetLackForSelected) {
                    onSubmit?.();
                  }
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 하단 영역 */}
      <div
        className="
          mt-40
          flex flex-col
          tablet:flex-row
          tablet:justify-between
          tablet:items-start
          gap-40
          tablet:mt-70
        "
      >
        {/* 금액 정보 */}
        <div className="flex flex-col gap-14 text-left">
          <p
            className="
              font-bold text-gray-950
              text-24 tablet:text-30
              tracking--0.6
            "
          >
            총 주문금액 <PriceText value={totalPrice} />
          </p>

          <p className="text-16 text-gray-400 tracking--0.4">
            주문 상품은 {totalProductPrice.toLocaleString()}원
          </p>

          <p className="text-16 text-gray-400 tracking--0.4">
            배송비는 {shippingFee.toLocaleString()}원입니다.
          </p>

          <p
            className={`
              font-bold text-18 tracking--0.45
              ${isBudgetLackForSelected ? 'text-red-500' : 'text-gray-700'}
            `}
          >
            남은 예산 금액 <PriceText value={remainBudget} />
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex flex-col items-center gap-16 tablet:gap-20">
          <Button
            variant="secondary"
            className="
              w-327 h-64 text-14 font-bold tracking--0.4 cursor-pointer
              tablet:w-296 tablet:text-16
            "
          >
            계속 쇼핑하기
          </Button>

          <Button
            variant="primary"
            className="
              w-327 h-64 text-14 font-bold tracking--0.4 cursor-pointer
              tablet:w-296 tablet:text-16
            "
            onClick={onSubmit}
            inactive={checkedIds.length === 0 || isBudgetLackForSelected}
          >
            구매 요청
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryBlock;
