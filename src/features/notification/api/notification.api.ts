/**
 * 알림 API 모듈
 */
import { fetchWithAuth } from '@/utils/api';
import {
  NOTIFICATION_API,
  NOTIFICATION_PAGINATION,
  type NotificationTargetType,
} from '@/constants/notification.constants';

/** 전체 알림 응답 */
export interface BroadcastResponse {
  success: boolean;
  data: {
    createdCount: number;
    deliveredCount: number;
  };
  message: string;
}

/** 알림 아이템 */
export interface NotificationItem {
  id: string;
  content: string;
  targetType: NotificationTargetType;
  targetId: string;
  isRead: boolean;
  createdAt: string;
}

/** 페이지네이션 */
export interface NotificationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** 알림 목록 조회 응답 */
export interface NotificationListResponse {
  success: boolean;
  data: NotificationItem[];
  pagination: NotificationPagination;
  message: string;
}

/** 읽지 않은 알림 수 조회 응답 */
export interface NotificationUnreadCountResponse {
  success: boolean;
  data: { count: number };
  message: string;
}

/** 알림 읽음 처리 응답 */
export interface NotificationReadResponse {
  success: boolean;
  data: NotificationItem;
  message: string;
}

/* =====================
 * API
 ===================== */

export const notificationApi = {
  /** 알림 목록 조회 */
  getNotifications: async (
    page: number = NOTIFICATION_PAGINATION.DEFAULT_PAGE,
    limit: number = NOTIFICATION_PAGINATION.DEFAULT_LIMIT
  ): Promise<NotificationListResponse> => {
    const response = await fetchWithAuth(`${NOTIFICATION_API.LIST}?page=${page}&limit=${limit}`, {
      method: 'GET',
    });

    if (!response.ok) {
      let errorMessage = '알림 목록 조회 실패';
      try {
        const errorData = (await response.json()) as { message?: string };
        errorMessage = errorData.message || errorMessage;
      } catch {
        // 기본 메시지 사용
      }
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as NotificationListResponse;

    if (!data.success || !Array.isArray(data.data)) {
      throw new Error(data.message || '알림 데이터 형식이 올바르지 않습니다.');
    }

    return data;
  },

  /** 읽지 않은 알림 수 조회 */
  getUnreadCount: async (): Promise<NotificationUnreadCountResponse> => {
    const response = await fetchWithAuth(NOTIFICATION_API.UNREAD_COUNT, {
      method: 'GET',
    });

    if (!response.ok) {
      let errorMessage = '읽지 않은 알림 수 조회 실패';
      try {
        const errorData = (await response.json()) as { message?: string };
        errorMessage = errorData.message || errorMessage;
      } catch {
        // 기본 메시지 사용
      }
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as NotificationUnreadCountResponse;

    if (!data.success || typeof data.data?.count !== 'number') {
      throw new Error(data.message || '알림 수 데이터 형식이 올바르지 않습니다.');
    }

    return data;
  },

  /** 알림 읽음 처리 */
  markAsRead: async (id: string): Promise<NotificationReadResponse> => {
    const response = await fetchWithAuth(NOTIFICATION_API.READ(id), {
      method: 'PATCH',
    });

    if (!response.ok) {
      let errorMessage = '알림 읽음 처리 실패';
      try {
        const errorData = (await response.json()) as { message?: string };
        errorMessage = errorData.message || errorMessage;
      } catch {
        // 기본 메시지 사용
      }
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as NotificationReadResponse;

    if (!data.success || !data.data) {
      throw new Error(data.message || '알림 읽음 처리 응답 형식이 올바르지 않습니다.');
    }

    return data;
  },

  /** 전체 알림 발송 (Admin 전용) */
  broadcastNotification: async (content: string): Promise<BroadcastResponse> => {
    const response = await fetchWithAuth(NOTIFICATION_API.BROADCAST, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      let errorMessage = '전체 알림 발송 실패';
      try {
        const errorData = (await response.json()) as { message?: string };
        errorMessage = errorData.message || errorMessage;
      } catch {
        // 기본 메시지 사용
      }
      throw new Error(errorMessage);
    }

    const data = (await response.json()) as BroadcastResponse;
    if (!data.success) {
      throw new Error(data.message || '전체 알림 발송에 실패했습니다.');
    }

    return data;
  },
};
