/**
 * 알림 targetType에 따른 URL 생성 유틸
 */
import { PATHNAME } from '@/constants';
import {
  NOTIFICATION_TARGET_TYPE,
  type NotificationTargetType,
} from '@/constants/notification.constants';

/**
 * targetType과 targetId를 기반으로 이동할 URL 생성
 * @param companyId - 회사 ID
 * @param targetType - 알림 대상 타입
 * @param targetId - 알림 대상 ID (UUID)
 * @returns 이동할 URL 또는 null (이동 불가능한 경우)
 */
export function getNotificationTargetUrl(
  companyId: string,
  targetType: NotificationTargetType,
  targetId: string
): string | null {
  switch (targetType) {
    // 구매 요청 상세 페이지 (관리자용 상세)
    case NOTIFICATION_TARGET_TYPE.PURCHASE_REQUEST:
      return PATHNAME.MANAGER_PURCHASE_REQUEST_DETAIL(companyId, targetId);
    // 승인 알림 → 내 구매 요청 상세
    case NOTIFICATION_TARGET_TYPE.APPROVAL_NOTICE:
      return PATHNAME.MY_PURCHASE_REQUEST_DETAIL(companyId, targetId);
    // 반려 알림 → 내 구매 요청 상세
    case NOTIFICATION_TARGET_TYPE.DENIAL_NOTICE:
      return PATHNAME.MY_PURCHASE_REQUEST_DETAIL(companyId, targetId);
    // 관리자 메시지 → 특별한 페이지 없음 (모달에서만 확인)
    case NOTIFICATION_TARGET_TYPE.ADMIN_MESSAGE:
      return null;
    // 일반 공지 → 특별한 페이지 없음
    case NOTIFICATION_TARGET_TYPE.GENERAL_NOTICE:
      return null;
    default:
      return null;
  }
}

/**
 * targetType에 대한 알림 타입 반환
 */
export function getNotificationTargetLabel(targetType: NotificationTargetType): string {
  switch (targetType) {
    case NOTIFICATION_TARGET_TYPE.PURCHASE_REQUEST:
      return '구매 요청';
    case NOTIFICATION_TARGET_TYPE.APPROVAL_NOTICE:
      return '승인 알림';
    case NOTIFICATION_TARGET_TYPE.DENIAL_NOTICE:
      return '반려 알림';
    case NOTIFICATION_TARGET_TYPE.ADMIN_MESSAGE:
      return '관리자 메시지';
    case NOTIFICATION_TARGET_TYPE.GENERAL_NOTICE:
      return '공지사항';
    default:
      return '알림';
  }
}
