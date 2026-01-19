'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import {
  useNotifications,
  useMarkNotificationAsRead,
} from '@/features/notification/queries/notification.queries';
import {
  getNotificationTargetUrl,
  getNotificationTargetLabel,
} from '@/features/notification/utils/notificationUrl';
import { NOTIFICATION_PAGINATION } from '@/constants/notification.constants';
import type { NotificationItem } from '@/features/notification/api/notification.api';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/molecules/Toast/Toast';

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * NotificationModal
 *
 * 알림 목록을 표시하는 모달 컴포넌트
 * - 알림 클릭 시 읽음 처리 + 해당 URL로 이동
 * - 빈 상태 UI 제공
 */
export const NotificationModal = ({ open, onClose }: NotificationModalProps) => {
  const router = useRouter();
  const params = useParams();
  const companyId = (params?.companyId as string) || '';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const {
    data: notificationsData,
    isLoading,
    refetch,
  } = useNotifications({
    page: NOTIFICATION_PAGINATION.DEFAULT_PAGE,
    limit: NOTIFICATION_PAGINATION.MODAL_LIMIT,
    enabled: open,
  });

  const { mutate: markAsRead } = useMarkNotificationAsRead();

  // Toast 상태
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', handleEsc);
      // 모달 열릴 때 데이터 새로고침
      refetch().catch(() => {});
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose, refetch]);

  // 알림 클릭 핸들러
  const handleNotificationClick = useCallback(
    (notification: NotificationItem) => {
      // 읽지 않은 알림이면 읽음 처리
      if (!notification.isRead) {
        markAsRead(notification.id, {
          onError: (err: unknown) => {
            const message = err instanceof Error ? err.message : '알림 읽음 처리에 실패했습니다.';
            triggerToast('error', message);
          },
        });
      }

      // targetType에 따른 URL로 이동 (companyId가 없으면 URL 이동 불가 -> 긴급 알림/공지 등)
      if (!companyId) {
        onClose();
        return;
      }

      const targetUrl = getNotificationTargetUrl(
        companyId,
        notification.targetType,
        notification.targetId
      );

      if (targetUrl) {
        onClose();
        router.push(targetUrl);
      }
    },
    [companyId, markAsRead, onClose, router, triggerToast]
  );

  // 시간 포맷
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;

    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
  };

  // 배경 클릭 감지 (document event)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // 모달 내부 클릭은 무시
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return;
      }
      onClose();
    };

    if (open) {
      // 캡처링 단계에서 이벤트를 잡아내어 처리
      document.addEventListener('mousedown', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  // 읽지 않은 알림만 표시
  const notifications = (notificationsData?.data ?? []).filter(
    (notification) => !notification.isRead
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-40">
          <div className="animate-spin w-24 h-24 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-40 text-gray-500">
          <Image
            src="/icons/notification.svg"
            alt="알림 없음"
            width={48}
            height={48}
            className="mb-12"
          />
          <p className="text-14">알림이 없습니다</p>
        </div>
      );
    }

    return (
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <button
              type="button"
              onClick={() => handleNotificationClick(notification)}
              className={clsx(
                'w-full text-left px-16 py-12',
                'border-b border-gray-100',
                'transition-colors hover:bg-gray-50 cursor-pointer',
                !notification.isRead && 'bg-blue-50'
              )}
            >
              <div className="flex items-start gap-12">
                {/* 읽지 않음 표시 */}
                {!notification.isRead && (
                  <span className="mt-6 w-8 h-8 rounded-full bg-red-500 flex-shrink-0" />
                )}
                {notification.isRead && <span className="w-8 flex-shrink-0" />}

                <div className="flex-1 min-w-0">
                  {/* 타입 레이블 */}
                  <span className="text-11 text-gray-500 font-medium">
                    {getNotificationTargetLabel(notification.targetType)}
                  </span>

                  {/* 알림 내용 */}
                  <p
                    className={clsx(
                      'text-14 mt-2 line-clamp-2',
                      notification.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'
                    )}
                  >
                    {notification.content}
                  </p>

                  {/* 시간 */}
                  <span className="text-12 text-gray-400 mt-4 block">
                    {formatTime(notification.createdAt)}
                  </span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const modalContent = createPortal(
    <div
      className={clsx(
        'fixed inset-0 z-[var(--z-overlay)] flex items-start justify-end pointer-events-none'
      )}
      role="dialog"
      aria-modal="true"
      aria-label="알림"
    >
      {/* 모달 컨테이너 */}
      <div
        ref={modalRef}
        role="presentation"
        className={clsx(
          'bg-white pointer-events-auto flex flex-col',
          'fixed inset-0 w-full h-full z-[var(--z-overlay-content)]',
          'tablet:static tablet:z-auto',
          'tablet:w-full tablet:max-w-360 tablet:h-full tablet:max-h-[80vh]',
          'tablet:mt-56 tablet:mr-24',
          'tablet:rounded-12 tablet:shadow-xl tablet:border tablet:border-gray-200',
          'overflow-hidden'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-16 py-14 border-b border-gray-200">
          <h2 className="text-16 font-bold text-gray-900">알림</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-4 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="닫기"
          >
            <Image src="/icons/close-white.svg" alt="" width={20} height={20} aria-hidden="true" />
          </button>
        </div>

        {/* 알림 목록 */}
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>,
    document.body
  );

  return (
    <>
      {modalContent}
      {/* Toast 렌더링 */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[var(--z-toast)]">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </>
  );
};

NotificationModal.displayName = 'NotificationModal';
