'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Divider } from '@/components/atoms/Divider/Divider';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

type NotificationSize = 32;

export interface NotificationItem {
  id: number | string;
  content: React.ReactNode;
  time: string;
  isRead?: boolean;
}

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: NotificationSize;
  notifications?: NotificationItem[];
}

const PAGE_SIZE = 4;

const sizeClass: Record<NotificationSize, string> = {
  32: 'w-32 h-32',
};

const sortByRead = (list: NotificationItem[]) =>
  [...list].sort((a, b) => Number(a.isRead ?? false) - Number(b.isRead ?? false));

export const Notification = ({ size = 32, className, notifications = [] }: NotificationProps) => {
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [items, setItems] = useState<NotificationItem[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < items.length;
  const visibleItems = items.slice(0, visibleCount);

  useEffect(() => {
    if (open) {
      setVisibleCount(PAGE_SIZE);
      setItems(sortByRead(notifications));
    }
    return undefined; // ✅ consistent-return
  }, [open, notifications]);

  useEffect(() => {
    if (!open) return undefined;

    const handleOutsideClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el || !hasMore) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 16) {
      setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
    }
  };

  const handleRead = (id: NotificationItem['id']) => {
    setItems((prev) =>
      sortByRead(prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)))
    );
  };

  const handleDelete = (id: NotificationItem['id']) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setVisibleCount((prev) => Math.max(PAGE_SIZE, prev - 1));
  };

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      {/* Notification Button */}
      <div
        className={clsx(
          'inline-flex items-center justify-center',
          sizeClass[size],
          'rounded-full cursor-pointer',
          'hover:bg-gray-100 active:bg-gray-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
        role="button"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        <Image
          src={open ? '/icons/notification-black.svg' : '/icons/notification.svg'}
          alt=""
          width={size}
          height={size}
          aria-hidden="true"
        />
      </div>

      {open && (
        <div
          className={clsx(
            'absolute right-0 top-full mt-10 z-toast',
            'w-327 max-h-394',
            'rounded-[24px]',
            'border border-gray-200 bg-white',
            'shadow-[2px_2px_16px_0_rgba(0,0,0,0.06)]',
            'flex flex-col'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-34 py-25">
            <span className="text-18 font-bold text-gray-950">알림</span>

            <IconButton size="md" onClick={() => setOpen(false)}>
              <Image
                src="/icons/close-white.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
                className="cursor-pointer"
              />
            </IconButton>
          </div>

          {/* List */}
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto scrollbar-none px-16 pb-0"
          >
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center pb-50">
                <span className="text-20 text-gray-400">알림이 없습니다</span>
              </div>
            ) : (
              <div className="flex flex-col">
                {visibleItems.map((item, index) => {
                  const isUnread = !(item.isRead ?? false);

                  return (
                    <div key={item.id} className="group">
                      <div
                        className="px-24 py-16 h-105 flex flex-col justify-between cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleRead(item.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleRead(item.id);
                          }
                        }}
                      >
                        <p
                          className={clsx(
                            'text-16 line-clamp-2 [&>*]:inline',
                            isUnread ? 'text-gray-950 font-medium' : 'text-gray-500'
                          )}
                        >
                          {item.content}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span
                            className={clsx(
                              'text-14',
                              isUnread ? 'text-gray-400' : 'text-gray-300'
                            )}
                          >
                            {item.time}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Image
                              src="/icons/trash.svg"
                              alt=""
                              width={16}
                              height={16}
                              aria-hidden="true"
                              className="cursor-pointer"
                            />
                          </button>
                        </div>
                      </div>

                      {index < visibleItems.length - 1 && (
                        <div className="mx-24">
                          <Divider />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Notification.displayName = 'Notification';
