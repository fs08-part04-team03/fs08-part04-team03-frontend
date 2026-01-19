'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  notificationApi,
  type NotificationListResponse,
  type NotificationUnreadCountResponse,
} from '@/features/notification/api/notification.api';
import { STALE_TIME } from '@/constants/staleTime';
import { SSE_CONFIG, NOTIFICATION_PAGINATION } from '@/constants/notification.constants';

// Query Keys
const notificationKeys = {
  all: ['notification'] as const,
  list: (page: number, limit: number) => [...notificationKeys.all, 'list', page, limit] as const,
  unreadCount: () => [...notificationKeys.all, 'unread-count'] as const,
};

export { notificationKeys };

/**
 * 알림 목록 조회
 */
export function useNotifications(params?: { page?: number; limit?: number; enabled?: boolean }) {
  const {
    page = NOTIFICATION_PAGINATION.DEFAULT_PAGE,
    limit = NOTIFICATION_PAGINATION.DEFAULT_LIMIT,
    enabled = true,
  } = params || {};

  return useQuery<NotificationListResponse>({
    queryKey: notificationKeys.list(page, limit),
    queryFn: () => notificationApi.getNotifications(page, limit),
    staleTime: STALE_TIME.SHORT, // 30초
    enabled,
  });
}

/**
 * 읽지 않은 알림 수 조회
 */
export function useUnreadNotificationCount(options?: { enabled?: boolean }) {
  const { enabled = true } = options || {};

  return useQuery<NotificationUnreadCountResponse>({
    queryKey: notificationKeys.unreadCount(),
    queryFn: () => notificationApi.getUnreadCount(),
    staleTime: STALE_TIME.SHORT, // 30초
    enabled,
    // 주기적으로 polling (SSE가 연결되지 않은 경우 대비)
    refetchInterval: SSE_CONFIG.POLLING_INTERVAL,
    refetchIntervalInBackground: false, // 백그라운드에서는 polling 비활성화
  });
}

/**
 * 알림 읽음 처리 mutation
 */
export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: async () => {
      // 알림 관련 캐시 모두 무효화
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    // onError는 컴포넌트 레벨에서 처리 (useToast 상태 연결을 위해)
  });
}

/**
 * 전체 알림 발송 mutation
 */
export function useBroadcastNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => notificationApi.broadcastNotification(content),
    onSuccess: async () => {
      // 자신이 받은 알림도 갱신될 수 있으므로 목록 query invalidate
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    // onSuccess/onError 토스트는 컴포넌트 레벨에서 처리 (useToast 상태 연결을 위해)
  });
}
