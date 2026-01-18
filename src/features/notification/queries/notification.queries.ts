'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  notificationApi,
  type NotificationListResponse,
  type NotificationUnreadCountResponse,
} from '@/features/notification/api/notification.api';
import { useToast } from '@/hooks/useToast';
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
  const { triggerToast } = useToast();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: async () => {
      // 알림 관련 캐시 모두 무효화
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '알림 읽음 처리에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}

/**
 * 전체 알림 발송 mutation
 */
export function useBroadcastNotification() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation({
    mutationFn: (content: string) => notificationApi.broadcastNotification(content),
    onSuccess: async (data) => {
      triggerToast(
        'success',
        `알림이 전송되었습니다. (생성: ${data.data.createdCount}, 발송: ${data.data.deliveredCount})`
      );
      // 자신이 받은 알림도 갱신될 수 있으므로 목록 query invalidate
      await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '알림 전송에 실패했습니다.';
      triggerToast('error', message);
    },
  });
}
