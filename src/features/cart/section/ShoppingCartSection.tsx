'use client';

import { useEffect, useState } from 'react';
import { requestPurchase } from '@/features/purchase/api/purchase.api';
import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import ShoppingCartTem from '../template/ShoppingCartTem/ShoppingCartTem';
import { cartApi } from '../api/cart.api';
import { adaptCartItemToOrderItem } from '../utils/cart.utils';

const ShoppingCartSection = () => {
  const [items, setItems] = useState<OrderItem[]>([]);

  /** 장바구니 조회 */
  const fetchCart = async () => {
    try {
      const res = await cartApi.getMyCart();
      setItems(res.data.map(adaptCartItemToOrderItem));
    } catch (err) {
      console.error('장바구니 조회 실패', err);
    }
  };

  /** 초기 로드 */
  useEffect(() => {
    const loadCart = async () => {
      await fetchCart();
    };
    loadCart().catch(console.error);
  }, []);

  /** 수량 변경 */
  const handleQuantityChange = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await cartApi.updateQuantity(cartItemId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('수량 변경 실패', err);
    }
  };

  /** 선택 삭제 */
  const handleDeleteSelected = async (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) return;
    try {
      await cartApi.deleteMultiple(cartItemIds);
      await fetchCart();
    } catch (err) {
      console.error('선택 삭제 실패', err);
    }
  };

  /** 구매 요청 */
  const handleSubmit = async (cartItemIds: string[]) => {
    const selectedItems = items.filter((item) => cartItemIds.includes(item.cartItemId));
    try {
      await Promise.all(
        selectedItems.map((item) =>
          requestPurchase({
            productId: String(item.productId),
            quantity: item.quantity,
          })
        )
      );
      await fetchCart();
    } catch (err) {
      console.error('구매 요청 실패', err);
    }
  };

  const cartProps = {
    role: 'user' as const,
  };

  return (
    <ShoppingCartTem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...cartProps}
      items={items}
      onQuantityChange={(id, qty) => {
        handleQuantityChange(id, qty).catch(console.error);
      }}
      onDeleteSelected={(ids) => {
        handleDeleteSelected(ids).catch(console.error);
      }}
      onSubmit={(ids) => {
        handleSubmit(ids).catch(console.error);
      }}
    />
  );
};

export default ShoppingCartSection;
