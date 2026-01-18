'use client';

import { useEffect, useRef, useCallback } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { getApiUrl } from '@/utils/api';
import { logger } from '@/utils/logger';
import { DEFAULT_API_URL } from '@/features/auth/utils/constants';
import { NOTIFICATION_API, SSE_CONFIG } from '@/constants/notification.constants';
import { notificationKeys } from '../queries/notification.queries';
import type { NotificationItem } from '../api/notification.api';

interface UseNotificationSSEOptions {
  enabled?: boolean;
}

/**
 * SSE를 통한 실시간 알림 스트림 연결
 *
 * - EventSourcePolyfill을 사용하여 Authorization 헤더 전송
 * - 연결 끊김 시 자동 재연결
 * - 새 알림 수신 시 TanStack Query 캐시 무효화
 */
export function useNotificationSSE(options?: UseNotificationSSEOptions) {
  const { enabled = true } = options ?? {};
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  const sseRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isConnectingRef = useRef(false);

  // SSE 연결
  const connect = useCallback(() => {
    // 이미 연결 중이거나 연결되어 있으면 무시
    if (isConnectingRef.current || sseRef.current?.readyState === EventSource.OPEN) {
      return;
    }

    // 토큰이 없으면 연결하지 않음
    if (!accessToken) {
      logger.info('[SSE] No access token, skipping connection');
      return;
    }

    isConnectingRef.current = true;

    // 기존 연결 정리
    if (sseRef.current) {
      sseRef.current.close();
      sseRef.current = null;
    }

    // API URL 구성
    const baseUrl = getApiUrl() || DEFAULT_API_URL || '';
    const streamUrl = `${baseUrl}${NOTIFICATION_API.STREAM}`;

    logger.info('[SSE] Connecting to notification stream', { streamUrl });

    try {
      // event source polyfill을 이용해 헤더에 토큰을 추가하여 연결
      sseRef.current = new EventSourcePolyfill(streamUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: SSE_CONFIG.HEARTBEAT_TIMEOUT,
      });

      sseRef.current.onopen = () => {
        isConnectingRef.current = false;
        logger.info('[SSE] Notification stream connected');
      };

      sseRef.current.onmessage = (event: MessageEvent) => {
        try {
          const notification = JSON.parse(event.data as string) as NotificationItem;
          logger.info('[SSE] New notification received', {
            id: notification.id,
            targetType: notification.targetType,
          });

          // unreadCount 캐시 무효화 → 자동 refetch로 뱃지 업데이트
          queryClient
            .invalidateQueries({
              queryKey: notificationKeys.unreadCount(),
            })
            .catch((err) => {
              logger.error('[SSE] Failed to invalidate unreadCount', err);
            });

          // 알림 목록 캐시도 무효화
          queryClient
            .invalidateQueries({
              queryKey: notificationKeys.all,
            })
            .catch((err) => {
              logger.error('[SSE] Failed to invalidate notification list', err);
            });
        } catch (err) {
          logger.warn('[SSE] Invalid notification payload', {
            error: err instanceof Error ? err.message : String(err),
          });
        }
      };

      sseRef.current.onerror = (err: Event) => {
        isConnectingRef.current = false;
        logger.warn('[SSE] Connection error', {
          readyState: sseRef.current?.readyState,
          error: err,
        });

        // 연결 닫기
        sseRef.current?.close();
        sseRef.current = null;

        // 재연결 예약 (토큰이 여전히 유효할 경우에만)
        if (enabled) {
          reconnectTimeoutRef.current = setTimeout(() => {
            const currentToken = useAuthStore.getState().accessToken;
            if (currentToken) {
              logger.info('[SSE] Reconneting');
              connect();
            } else {
              logger.info('[SSE] No valid token, skipping reconnection');
            }
          }, SSE_CONFIG.RECONNECT_DELAY);
        }
      };
    } catch (err) {
      isConnectingRef.current = false;
      logger.error('[SSE] Failed to create EventSource', {
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }, [accessToken, enabled, queryClient]);

  // SSE 연결 종료
  const disconnect = useCallback(() => {
    // 재연결 타이머 취소
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // SSE 연결 닫기
    if (sseRef.current) {
      logger.info('[SSE] Disconnecting notification stream');
      sseRef.current.close();
      sseRef.current = null;
    }

    isConnectingRef.current = false;
  }, []);

  // SSE 연결 관리
  useEffect(() => {
    if (!enabled || !accessToken) {
      disconnect();
      return undefined;
    }

    connect();

    return () => {
      disconnect();
    };
  }, [enabled, accessToken, connect, disconnect]);

  return { connect, disconnect };
}
