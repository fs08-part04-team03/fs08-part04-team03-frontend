// cart/api/cart.api.ts
import { CART_API } from '@/constants/cart.constants';

/* =====================
 * Types
 ===================== */

/** 상품 정보 */
export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image?: string;
  link?: string;
  isActive: boolean;
}

/** 장바구니 아이템 */
export interface CartItem {
  id: string; // cartItemId (UUID)
  quantity: number;
  updatedAt: string;
  subtotal: number;
  product: CartProduct;
}

/** 페이지네이션 */
export interface CartPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** 장바구니 요약 */
export interface CartSummary {
  totalItems: number;
  currentPageItemCount: number;
  currentPageTotalPrice: number;
  totalPrice: number;
}

/** GET /getMyCart 응답 */
export interface GetMyCartResponse {
  success: boolean;
  data: CartItem[];
  pagination: CartPagination;
  summary: CartSummary;
  message: string;
}

/** PATCH /updateQuantity 응답 */
export interface UpdateQuantityResponse {
  success: boolean;
  data: CartItem;
  message: string;
}

/** DELETE /deleteMultiple 응답 */
export interface DeleteMultipleResponse {
  success: boolean;
  data: {
    deletedCount: number;
    deletedIds: string[];
  };
  message: string;
}

/* =====================
 * API
 ===================== */

export const cartApi = {
  /** 내 장바구니 조회 */
  getMyCart: async (page: number = 1, limit: number = 10): Promise<GetMyCartResponse> => {
    const res = await fetch(`${CART_API.GET_MY_CART}?page=${page}&limit=${limit}`, {
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('장바구니 조회 실패');
    }

    const data = (await res.json()) as GetMyCartResponse;
    return data;
  },

  /** 장바구니 상품 수량 수정 */
  updateQuantity: async (cartItemId: string, quantity: number): Promise<UpdateQuantityResponse> => {
    const res = await fetch(CART_API.UPDATE_QUANTITY, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        cartItemId,
        quantity,
      }),
    });

    if (!res.ok) {
      throw new Error('수량 수정 실패');
    }

    const data = (await res.json()) as UpdateQuantityResponse;
    return data;
  },

  /** 장바구니 여러 상품 삭제 */
  deleteMultiple: async (cartItemIds: string[]): Promise<DeleteMultipleResponse> => {
    const res = await fetch(CART_API.DELETE_MULTIPLE, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        cartItemIds,
      }),
    });

    if (!res.ok) {
      throw new Error('장바구니 삭제 실패');
    }

    const data = (await res.json()) as DeleteMultipleResponse;
    return data;
  },
};
