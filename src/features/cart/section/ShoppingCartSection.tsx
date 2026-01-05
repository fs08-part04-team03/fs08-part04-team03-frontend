'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type {
  OrderItem,
  CartRole,
} from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import { useToast } from '@/hooks/useToast';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import { fetchWithAuth } from '@/utils/api';
import { adaptCartItemToOrderItem } from '../utils/cart.utils';
import ShoppingCartTem from '../template/ShoppingCartTem/ShoppingCartTem';
import { cartApi } from '../api/cart.api';

const ShoppingCartSection = () => {
  const params = useParams();
  const router = useRouter();
  const companyId = typeof params?.companyId === 'string' ? params.companyId : '';
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();
  const { user } = useAuthStore();
  const [currentPage] = useState(1);
  const [pageSize] = useState(10);

  // 사용자 역할에 따른 cartRole 결정
  const cartRole: CartRole = useMemo(() => {
    if (!user?.role) return 'user';
    return ROLE_LEVEL[user.role] >= ROLE_LEVEL.manager ? 'manager' : 'user';
  }, [user?.role]);

  // 장바구니 조회
  const {
    data: cartData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['cart', currentPage, pageSize],
    queryFn: () => cartApi.getMyCart(currentPage, pageSize),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  // 월 예산 조회 (manager만)
  const isAdminRole = cartRole === 'manager';
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: budgetData, isLoading: isBudgetLoading } = useQuery({
    queryKey: ['budget', year, month],
    queryFn: async () => {
      const response = await fetchWithAuth(`/api/v1/budget?year=${year}&month=${month}`, {
        method: 'GET',
      });
      if (!response.ok) {
        return 0;
      }
      const result = (await response.json()) as {
        success: boolean;
        data?: Array<{ amount: number }>;
      };
      // 현재 월 예산이 있으면 첫 번째 항목의 amount를 반환, 없으면 0
      if (result.success && result.data && result.data.length > 0) {
        const firstItem = result.data[0];
        return firstItem ? firstItem.amount : 0;
      }
      return 0;
    },
    enabled: isAdminRole,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  const budget = budgetData ?? 0;

  // 수량 변경 mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: string; quantity: number }) =>
      cartApi.updateQuantity(cartItemId, quantity),
    onSuccess: () => {
      // 캐시 즉시 제거하여 최신 데이터 보장
      queryClient.removeQueries({ queryKey: ['cart'] });
      triggerToast('success', '수량이 변경되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '수량 변경에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 선택 삭제 mutation
  const deleteMultipleMutation = useMutation({
    mutationFn: (cartItemIds: string[]) => cartApi.deleteMultiple(cartItemIds),
    onSuccess: () => {
      // 캐시 즉시 제거하여 최신 데이터 보장
      queryClient.removeQueries({ queryKey: ['cart'] });
      triggerToast('success', '선택한 상품이 삭제되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '삭제에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 수량 변경 핸들러
  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantityMutation.mutate({ cartItemId, quantity });
  };

  // 선택 삭제 핸들러
  const handleDeleteSelected = (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) return;
    deleteMultipleMutation.mutate(cartItemIds);
  };

  // 구매 요청 핸들러 - OrderPage로 이동
  const handleSubmit = (cartItemIds: string[]) => {
    if (cartItemIds.length === 0) {
      triggerToast('error', '선택된 상품이 없습니다.');
      return;
    }
    // 선택된 아이템 ID를 쿼리 파라미터로 전달하여 OrderPage로 이동
    if (companyId) {
      const itemsParam = cartItemIds.join(',');
      router.push(`/${companyId}/order?items=${itemsParam}`);
    }
  };

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // 데이터 변환
  const items: OrderItem[] = cartData?.data.map(adaptCartItemToOrderItem) || [];

  // 계속 쇼핑하기 핸들러
  const handleContinueShopping = () => {
    if (companyId) {
      router.push(`/${companyId}/products`);
    }
  };

  return (
    <ShoppingCartTem
      cartRole={cartRole}
      items={items}
      budget={budget}
      loading={
        isBudgetLoading ||
        updateQuantityMutation.isPending ||
        deleteMultipleMutation.isPending
      }
      onQuantityChange={handleQuantityChange}
      onDeleteSelected={handleDeleteSelected}
      onSubmit={handleSubmit}
      onContinueShopping={handleContinueShopping}
    />
  );
};

export default ShoppingCartSection;
