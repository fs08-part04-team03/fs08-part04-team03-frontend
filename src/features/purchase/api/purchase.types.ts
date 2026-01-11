/**
 * Purchase 도메인 공통 타입 정의
 */

/**
 * 백엔드 API 응답 타입
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 구매 요청 아이템 타입 (실제 API 응답 구조)
 */
export interface PurchaseRequestItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string; // 승인일 (새로운 필드)
  itemsTotalPrice: number; // 상품 금액 (API 스펙에 맞게 변경)
  shippingFee: number;
  finalTotalPrice: number; // 최종 금액 (새로운 필드)
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestMessage?: string;
  rejectReason?: string;
  urgent?: boolean;
  purchaseItems: Array<{
    id: string;
    quantity: number;
    priceSnapshot: number;
    itemTotal: number; // 항목 소계 (새로운 필드)
    products: {
      id: number;
      name: string;
      image?: string;
      link?: string;
    };
  }>;
  requester: {
    id: string;
    name: string;
    email: string;
    company?: string;
    avatarSrc?: string;
  };
  approver?: {
    id: string;
    name: string;
    email: string;
  };
  // 하위 호환성을 위한 필드 (기존 코드 지원)
  totalPrice?: number; // itemsTotalPrice의 별칭 (deprecated)
}

/**
 * 구매 요청 응답 데이터 (공통 타입)
 */
export interface RequestPurchaseResponseData {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  shippingFee: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  requestMessage: string;
  rejectReason?: string;
  purchaseItems: Array<{
    id: string;
    quantity: number;
    priceSnapshot: number;
    products: {
      id: number;
      name: string;
      image: string;
      link: string;
    };
  }>;
  requester: {
    id: string;
    name: string;
    email: string;
  };
  approver?: {
    id: string;
    name: string;
    email: string;
  };
}
