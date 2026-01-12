'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import Button from '@/components/atoms/Button/Button';
import OrderItemCard from '@/components/molecules/OrderItemCard/OrderItemCard';
import PriceText from '@/components/atoms/PriceText/PriceText';
import { Toast } from '@/components/molecules/Toast/Toast';
import { PATHNAME } from '@/constants';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

import {
  purchaseNow,
  purchaseNowMultiple,
  urgentRequestPurchase,
  type RequestPurchaseResponseData,
} from '@/features/purchase/api/purchase.api';
import { cartApi } from '@/features/cart/api/cart.api';
import { cartKeys } from '@/features/cart/queries/cart.keys';

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
  loading?: boolean;
  onDeleteSelected?: (cartItemIds: string[]) => void;
  onSubmit?: (cartItemIds: string[]) => void;
  onGoBudgetManage?: () => void;
  onQuantityChange?: (cartItemId: string, quantity: number) => void;
  onContinueShopping?: () => void;
}

const CartSummaryBlockOrg = ({
  cartRole,
  items,
  budget = 0,
  loading = false,
  onDeleteSelected,
  onSubmit,
  onGoBudgetManage,
  onQuantityChange,
  onContinueShopping,
}: CartSummaryBlockOrgProps) => {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';

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

  useEffect(() => {
    if (!isAdminRole) return;
    setShowBudgetToast(isBudgetExceeded);
  }, [isBudgetExceeded, isAdminRole]);

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
    if (!loading && !isPurchasing) onDeleteSelected?.(checkedIds);
    setCheckedIds([]);
  };

  /** 관리자 즉시 구매 */
  const handleAdminPurchaseNow = async (item: OrderItem) => {
    if (
      !isAdminRole ||
      !checkedIds.includes(item.cartItemId) ||
      isBudgetExceeded ||
      loading ||
      isPurchasing
    )
      return;

    try {
      setIsPurchasing(true);

      await purchaseNow({
        productId: item.productId,
        quantity: item.quantity,
      });

      await cartApi.deleteMultiple([item.cartItemId]);
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });

      onSubmit?.([item.cartItemId]);
    } catch (error) {
      logger.error('[CartSummaryBlock] 즉시 구매 실패', {
        message: error instanceof Error ? error.message : '알 수 없는 오류',
      });
      setErrorMessage('즉시 구매에 실패했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  };

  /** 매니저 긴급 구매 요청 */
  const handleManagerUrgentPurchase = async () => {
    if (checkedIds.length === 0 || loading || isPurchasing) return;

    try {
      setIsPurchasing(true);
      const cartItemIdsToDelete = [...checkedIds];

      const result = await urgentRequestPurchase({
        items: selectedItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingFee: 0,
        requestMessage: '긴급 구매 요청',
      });

      await cartApi.deleteMultiple(cartItemIdsToDelete);
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });

      if (companyId && result?.id) {
        router.push(`${PATHNAME.ORDER_COMPLETED(companyId)}?id=${result.id}`);
        triggerToast('success', '긴급 구매 요청이 완료되었습니다.');
      }
    } catch (error) {
      logger.error('Urgent purchase request failed', { error });
      setErrorMessage('긴급 구매 요청에 실패했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  };

  /** 매니저 이상 구매 요청 */
  const handleManagerPurchaseRequest = async () => {
    if (checkedIds.length === 0 || loading || isPurchasing) return;

    try {
      setIsPurchasing(true);
      const cartItemIdsToDelete = [...checkedIds];

      const result: RequestPurchaseResponseData = await purchaseNowMultiple({
        items: selectedItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        shippingFee: 0,
      });

      await cartApi.deleteMultiple(cartItemIdsToDelete);
      await queryClient.invalidateQueries({ queryKey: cartKeys.all });

      if (companyId && result?.id) {
        router.push(`${PATHNAME.ORDER_COMPLETED(companyId)}?id=${result.id}`);
        triggerToast('success', '구매 요청이 완료되었습니다.');
      }
    } catch (error) {
      logger.error('Purchase request failed', { error });
      setErrorMessage('구매 요청에 실패했습니다.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleSubmit = async () => {
    if (loading || isPurchasing) return;

    if (cartRole === 'admin' && isBudgetExceeded) {
      onGoBudgetManage?.();
      return;
    }

    if (cartRole === 'manager' && isBudgetExceeded) {
      await handleManagerUrgentPurchase();
      return;
    }

    if (isAdminRole && !isBudgetExceeded) {
      await handleManagerPurchaseRequest();
      return;
    }

    onSubmit?.(checkedIds);
  };

  const handleSubmitClick = () => {
    handleSubmit().catch(() => {
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
              disabled={loading || isPurchasing} // 🔹 로딩/구매 중 비활성화
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
                cartRole === 'user' || !isChecked || isBudgetExceeded || isPurchasing || loading; // 🔹 로딩 포함

              return (
                <OrderItemCard
                  key={item.cartItemId}
                  name={item.name}
                  unitPrice={item.price}
                  quantity={item.quantity}
                  shippingCost={0}
                  imageSrc={item.imageSrc}
                  productId={item.productId} // ✅ 상품 상세 페이지 이동을 위한 productId 전달
                  checked={isChecked}
                  onCheckboxChange={(checked) => handleToggleItem(item.cartItemId, checked)}
                  onQuantityChange={(option) => handleQuantityChange(item.cartItemId, option)}
                  purchaseButtonLabel={purchaseButtonLabel}
                  purchaseButtonDisabled={purchaseButtonDisabled}
                  onPurchaseClick={() => {
                    if (!purchaseButtonDisabled) {
                      handleAdminPurchaseNow(item).catch((err) => {
                        logger.error('[CartSummaryBlock] 즉시 구매 실패', {
                          message: err instanceof Error ? err.message : '알 수 없는 오류',
                        });
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

            {cartRole !== 'user' && budget > 0 && (
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
              inactive={loading || isPurchasing} // 🔹 로딩 시 비활성화
              onClick={onContinueShopping}
            >
              계속 쇼핑하기
            </Button>

            <Button
              variant="primary"
              className="w-327 h-64 text-14 cursor-pointer font-bold tracking--0.4 tablet:w-296 tablet:text-16"
              inactive={checkedIds.length === 0 || loading || isPurchasing} // 🔹 로딩 포함
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
          <Toast variant="custom" message={errorMessage} onClose={() => setErrorMessage(null)} />
        </div>
      )}
    </>
  );
};

export default CartSummaryBlockOrg;
