'use client';

import { useEffect, useState } from 'react';
import { requestPurchase } from '@/features/purchase/api/purchase.api';
import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import { Toast } from '@/components/molecules/Toast/Toast';
import ShoppingCartTem from '../template/ShoppingCartTem/ShoppingCartTem';
import { cartApi } from '../api/cart.api';
import { adaptCartItemToOrderItem } from '../utils/cart.utils';

const ShoppingCartSection = () => {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /** 장바구니 조회 */
  const fetchCart = async () => {
    setIsLoading(true);
    setErrorMessage(null); // ✅ 이전 에러 초기화
    try {
      const res = await cartApi.getMyCart();
      setItems(res.data.map(adaptCartItemToOrderItem));
    } catch (err) {
      console.error('장바구니 조회 실패', err);
      setErrorMessage('장바구니 조회에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  /** 초기 로드 */
  useEffect(() => {
    fetchCart().catch(console.error);
  }, []);

  /** 수량 변경 */
  const handleQuantityChange = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setIsLoading(true);
    setErrorMessage(null); // ✅ 이전 에러 초기화
    try {
      await cartApi.updateQuantity(cartItemId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('수량 변경 실패', err);
      setErrorMessage('수량 변경에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  /** 선택 삭제 */
  const handleDeleteSelected = async (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) return;
    setIsLoading(true);
    setErrorMessage(null); // ✅ 이전 에러 초기화
    try {
      await cartApi.deleteMultiple(cartItemIds);
      await fetchCart();
    } catch (err) {
      console.error('선택 삭제 실패', err);
      setErrorMessage('선택 삭제에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  /** 구매 요청 */
  const handleSubmit = async (cartItemIds: string[]) => {
    const selectedItems = items.filter((item) => cartItemIds.includes(item.cartItemId));
    if (selectedItems.length === 0) return;

    setIsLoading(true);
    setErrorMessage(null); // ✅ 이전 에러 초기화
    try {
      const results = await Promise.all(
        selectedItems.map(async (item) => {
          try {
            await requestPurchase({
              productId: String(item.productId),
              quantity: item.quantity,
            });
            return { success: true, item };
          } catch (error) {
            return {
              success: false,
              item,
              error: error instanceof Error ? error.message : String(error),
            };
          }
        })
      );

      const failedResults = results.filter(
        (r): r is { success: false; item: OrderItem; error: string } => !r.success
      );

      if (failedResults.length > 0) {
        console.error(
          `${failedResults.length}건의 구매 요청 실패`,
          failedResults.map((r) => ({
            cartItemId: r.item.cartItemId,
            productId: r.item.productId,
            reason: r.error,
          }))
        );
        setErrorMessage(`${failedResults.length}건의 구매 요청에 실패했습니다.`);
      } else {
        // ✅ 선택사항: 성공 피드백
        console.log('모든 구매 요청이 성공했습니다.');
      }

      await fetchCart();
    } catch (err) {
      console.error('구매 요청 처리 중 예외 발생', err);
      setErrorMessage('구매 요청 처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ShoppingCartTem
        cartRole="user"
        items={items}
        loading={isLoading}
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

      {errorMessage && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast">
          <Toast variant="custom" message={errorMessage} onClose={() => setErrorMessage(null)} />
        </div>
      )}
    </>
  );
};

export default ShoppingCartSection;
