'use client';

import React, { useEffect } from 'react';
import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

export interface SideBarMenuProps {
  /** 사이드바 열림/닫힘 상태 */
  open: boolean;

  /** 사이드바 닫기 콜백 */
  onClose: () => void;

  /** 사이드바 내부 컨텐츠 */
  children: React.ReactNode;

  /** 추가 스타일링용 className */
  className?: string;
}

export const SideBarMenu: React.FC<SideBarMenuProps> = ({ open, onClose, children, className }) => {
  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // ESC 키로 닫기
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/40 transition-opacity duration-200 z-modal',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={clsx(
          'fixed top-0 right-0 z-modal',
          'w-225 h-full bg-white shadow-lg',
          'transform transition-transform duration-250 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="사이드바 메뉴"
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end items-center p-12">
          <IconButton
            aria-label="메뉴 닫기"
            size="md"
            variant="default"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            <img src="/icons/close-white.svg" alt="" className="w-24 h-24" aria-hidden="true" />
          </IconButton>
        </div>

        {/* 컨텐츠 */}
        <div className="flex flex-col justify-center gap-8 my-16 mx-24">{children}</div>
      </aside>
    </>
  );
};
