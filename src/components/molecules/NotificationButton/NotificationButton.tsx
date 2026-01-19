'use client';

import Image from 'next/image';
import { clsx } from '@/utils/clsx';

// 알림 버튼 컴포넌트
export interface NotificationButtonProps {
  unreadCount: number;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * NotificationButton
 *
 * - 종 모양 알림 아이콘 + 빨간 점 뱃지
 * - unreadCount > 0: 빨간 점 + 숫자 표시
 * - unreadCount === 0: 테두리만 있는 아이콘 (bell-outline)
 */
export const NotificationButton = ({
  unreadCount,
  onClick,
  className,
  ariaLabel,
}: NotificationButtonProps): JSX.Element => {
  const hasUnread = unreadCount > 0;
  const displayCount = unreadCount < 0 ? 0 : unreadCount;
  const label = ariaLabel ?? `알림 (${displayCount}개)`;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center',
        'w-32 h-32 rounded-full',
        'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="relative inline-flex items-center justify-center">
        {/* 알림 아이콘 - 읽지 않은 알림 유무에 따라 아이콘 변경 */}
        <Image
          src={hasUnread ? '/icons/notification-black.svg' : '/icons/notification.svg'}
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />

        {/* 빨간 점 뱃지: unreadCount가 0보다 클 때만 표시 */}
        {hasUnread && (
          <span
            className={clsx(
              'pointer-events-none',
              'absolute',
              '-top-1 -right-1',
              'min-w-16 h-16 px-4',
              'flex justify-center items-center',
              'bg-red-500 text-white',
              'text-10 font-bold',
              'rounded-full'
            )}
          >
            {displayCount > 99 ? '99+' : displayCount}
          </span>
        )}
      </div>
    </button>
  );
};
