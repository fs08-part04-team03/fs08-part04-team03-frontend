'use client';

import { fetchWithAuth } from '@/utils/api';

/**
 * 백엔드 API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * 위시리스트 상태 확인
 * @param productId - 상품 ID
 * @returns 위시리스트에 포함되어 있는지 여부
 */
export async function checkWishlistStatus(productId: string | number): Promise<boolean> {
  const response = await fetchWithAuth(`/api/v1/product/${productId}/wishlist`, {
    method: 'GET',
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as ApiResponse<{ isLiked: boolean }>;

  return result.success && result.data?.isLiked === true;
}

/**
 * 위시리스트에 상품 추가
 * @param productId - 상품 ID
 */
export async function addToWishlist(productId: string | number): Promise<void> {
  const response = await fetchWithAuth(`/api/v1/wishlist/${productId}`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('위시리스트 추가에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<unknown>;

  if (!result.success) {
    throw new Error('위시리스트 추가에 실패했습니다.');
  }
}

/**
 * 위시리스트에서 상품 제거
 * @param productId - 상품 ID
 */
export async function removeFromWishlist(productId: string | number): Promise<void> {
  const response = await fetchWithAuth(`/api/v1/wishlist/${productId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('위시리스트 제거에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<unknown>;

  if (!result.success) {
    throw new Error('위시리스트 제거에 실패했습니다.');
  }
}

/**
 * 백엔드 위시리스트 상품 타입
 */
export interface BackendWishlistProduct {
  id: string; // UUID
  createdAt: string;
  product: {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    imageUrl?: string | null;
    link?: string | null;
    isActive: boolean;
    createdAt: string;
  };
}

/**
 * 위시리스트 목록 조회 응답 타입
 */
export interface GetWishlistResponse {
  data: BackendWishlistProduct[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 위시리스트 목록 조회
 * @returns 위시리스트 상품 목록
 */
export async function getWishlist(): Promise<GetWishlistResponse> {
  const response = await fetchWithAuth('/api/v1/wishlist/my', {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('위시리스트 조회에 실패했습니다.');
  }

  const result = (await response.json()) as ApiResponse<BackendWishlistProduct[]> & {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };

  if (!result.success || !result.data) {
    throw new Error('위시리스트 데이터 형식이 올바르지 않습니다.');
  }

  return {
    data: result.data,
    pagination: result.pagination,
  };
}
