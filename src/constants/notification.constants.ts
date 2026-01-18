/**
 * 알림 관련 상수
 */

// 알림 API 엔드포인트
export const NOTIFICATION_API = {
  STREAM: '/api/v1/notification/stream',
  LIST: '/api/v1/notification',
  UNREAD_COUNT: '/api/v1/notification/unread-count',
  READ: (id: string) => `/api/v1/notification/${id}/read`,
  BROADCAST: '/api/v1/notification/broadcast',
} as const;

// 알림 대상 타입
export const NOTIFICATION_TARGET_TYPE = {
  PURCHASE_REQUEST: 'PURCHASE_REQUEST',
  APPROVAL_NOTICE: 'APPROVAL_NOTICE',
  DENIAL_NOTICE: 'DENIAL_NOTICE',
  ADMIN_MESSAGE: 'ADMIN_MESSAGE',
  GENERAL_NOTICE: 'GENERAL_NOTICE',
} as const;

export type NotificationTargetType =
  (typeof NOTIFICATION_TARGET_TYPE)[keyof typeof NOTIFICATION_TARGET_TYPE];

// SSE 연결 설정
export const SSE_CONFIG = {
  HEARTBEAT_TIMEOUT: 3_600_000, // Heartbeat timeout 시간 (1시간)
  RECONNECT_DELAY: 5_000, // 재연결 대기 시간
  POLLING_INTERVAL: 60_000, // SSE 미연결 시 polling 주기 (1분)
} as const;

// 알림 페이지네이션 기본값
export const NOTIFICATION_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MODAL_LIMIT: 20, // 모달에서 표시할 알림 개수
} as const;
