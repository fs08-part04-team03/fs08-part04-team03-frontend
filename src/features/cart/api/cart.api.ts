// cart/api/cart.api.ts
import { CART_API } from '@/constants/cart.constants';
import { fetchWithAuth } from '@/utils/api';

/* =====================
 * Types
 ===================== */

/** 상품 정보 */
export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
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
  isNew?: boolean; // addToCart 응답에만 포함 (새로 추가된 상품인지 여부)
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

/** POST /addToCart 응답 */
export interface AddToCartResponse {
  success: boolean;
  data: CartItem;
  message: string;
}

/** DELETE /deleteFromCart 응답 */
export interface DeleteFromCartResponse {
  success: boolean;
  data: {
    id: string; // cartItemId (UUID)
  };
  message: string;
}

/* =====================
 * API
 ===================== */

export const cartApi = {
  /** 장바구니에 상품 추가 */
  addToCart: async (productId: number, quantity: number = 1): Promise<AddToCartResponse> => {
    const response = await fetchWithAuth(CART_API.ADD_TO_CART, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
      let errorMessage = '장바구니 추가 실패';
      try {
        const errorData = (await response.json()) as { message?: string };
        errorMessage = errorData.message || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 메시지 사용
      }
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as AddToCartResponse;

    if (!data.success || !data.data) {
      throw new Error(data.message || '장바구니 추가 응답 형식이 올바르지 않습니다.');
    }

    return data;
  },

  /** 내 장바구니 조회 */
  getMyCart: async (page: number = 1, limit: number = 10): Promise<GetMyCartResponse> => {
    const response = await fetchWithAuth(`${CART_API.GET_MY_CART}?page=${page}&limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      let errorMessage = '장바구니 조회 실패';
      try {
        const errorText = await response.text();
        if (errorText) {
          try {
            const errorData = JSON.parse(errorText) as { message?: string };
            errorMessage = errorData.message || errorMessage;
          } catch {
            // JSON 파싱 실패 시 텍스트 그대로 사용
            errorMessage = errorText || errorMessage;
          }
        }
      } catch {
        // 텍스트 읽기 실패 시 기본 메시지 사용
      }

      // 401 에러의 경우 특별 처리
      if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }

      throw new Error(errorMessage);
    }

    const data = (await response.json()) as GetMyCartResponse;

    if (!data.success || !Array.isArray(data.data)) {
      throw new Error(data.message || '장바구니 데이터 형식이 올바르지 않습니다.');
    }

    return data;
  },

  /** 장바구니 상품 수량 수정 */
  updateQuantity: async (cartItemId: string, quantity: number): Promise<UpdateQuantityResponse> => {
    const response = await fetchWithAuth(CART_API.UPDATE_QUANTITY, {
      method: 'PATCH',
      body: JSON.stringify({ cartItemId, quantity }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message?: string };
      throw new Error(errorData.message || '수량 수정 실패');
    }

    const data = (await response.json()) as UpdateQuantityResponse;

    if (!data.success || !data.data) {
      throw new Error(data.message || '수량 수정 응답 형식이 올바르지 않습니다.');
    }

    return data;
  },

  /** 장바구니에서 상품 삭제 */
  deleteFromCart: async (cartItemId: string): Promise<DeleteFromCartResponse> => {
    const response = await fetchWithAuth(CART_API.DELETE_FROM_CART, {
      method: 'DELETE',
      body: JSON.stringify({ cartItemId }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message?: string };
      throw new Error(errorData.message || '장바구니 삭제 실패');
    }

    const data = (await response.json()) as DeleteFromCartResponse;

    if (!data.success || !data.data) {
      throw new Error(data.message || '장바구니 삭제 응답 형식이 올바르지 않습니다.');
    }

    return data;
  },

  /** 장바구니 여러 상품 삭제 */
  deleteMultiple: async (cartItemIds: string[]): Promise<DeleteMultipleResponse> => {
    const response = await fetchWithAuth(CART_API.DELETE_MULTIPLE, {
      method: 'DELETE',
      body: JSON.stringify({ cartItemIds }),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message?: string };
      throw new Error(errorData.message || '장바구니 삭제 실패');
    }

    const data = (await response.json()) as DeleteMultipleResponse;

    if (!data.success || !data.data) {
      throw new Error(data.message || '장바구니 삭제 응답 형식이 올바르지 않습니다.');
    }

    return data;
  },
};
