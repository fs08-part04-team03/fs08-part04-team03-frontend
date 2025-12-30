'use client';

import { useEffect, useState } from 'react';
import { requestPurchase } from '@/features/purchase/api/purchase.api';
import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import ShoppingCartTem from '../template/ShoppingCartTem/ShoppingCartTem';
import { cartApi } from '../api/cart.api';
import { adaptCartItemToOrderItem } from '../utils/cart.utils';

const ShoppingCartSection = () => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false); // 🔹 로딩 상태

  /** 장바구니 조회 */
  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await cartApi.getMyCart();
      setItems(res.data.map(adaptCartItemToOrderItem));
    } catch (err) {
      console.error('장바구니 조회 실패', err);
    } finally {
      setIsLoading(false);
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
    setIsLoading(true);
    try {
      await cartApi.updateQuantity(cartItemId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('수량 변경 실패', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** 선택 삭제 */
  const handleDeleteSelected = async (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) return;
    setIsLoading(true);
    try {
      await cartApi.deleteMultiple(cartItemIds);
      await fetchCart();
    } catch (err) {
      console.error('선택 삭제 실패', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** 구매 요청 */
  const handleSubmit = async (cartItemIds: string[]) => {
    const selectedItems = items.filter((item) => cartItemIds.includes(item.cartItemId));

    if (selectedItems.length === 0) return;

    setIsLoading(true);
    try {
      const results = await Promise.allSettled(
        selectedItems.map((item) =>
          requestPurchase({
            productId: String(item.productId),
            quantity: item.quantity,
          }).then(
            () => ({ item }),
            (reason) =>
              // ✅ Promise.reject에 Error 객체 전달
              Promise.reject(
                new Error(
                  JSON.stringify({
                    item,
                    reason: reason instanceof Error ? reason.message : String(reason),
                  })
                )
              )
          )
        )
      );

      const failedResults = results.filter(
        (r): r is PromiseRejectedResult => r.status === 'rejected'
      );

      if (failedResults.length > 0) {
        console.error(
          `${failedResults.length}건의 구매 요청 실패`,
          failedResults.map((r) => {
            // ✅ 타입 단언: r.reason은 Error임
            const err = r.reason as Error;
            const parsed = JSON.parse(err.message) as {
              item: OrderItem;
              reason: string;
            };
            return {
              cartItemId: parsed.item.cartItemId,
              productId: parsed.item.productId,
              reason: parsed.reason,
            };
          })
        );
      }

      await fetchCart();
    } catch (err) {
      console.error('구매 요청 처리 중 예외 발생', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ShoppingCartTem
      cartRole="user"
      items={items}
      loading={isLoading} // 🔹 로딩 상태 전달
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
