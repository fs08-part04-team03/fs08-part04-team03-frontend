'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import type { ReactNode } from 'react';
import Image from 'next/image';

export interface SideBarMenuProps {
  /** 사이드바 열림/닫힘 상태 */
  open: boolean;

  /** 사이드바 닫기 콜백 */
  onClose: () => void;

  /** 사이드바 내부 컨텐츠 */
  children: ReactNode;

  /** 추가 스타일링용 className */
  className?: string;
}

export const SideBarMenu = ({ open, onClose, children, className }: SideBarMenuProps) => {
  // 클라이언트 마운트 상태 추적 (SSR-safe)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const content = (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/40 transition-opacity duration-200 z-menu',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={clsx(
          'fixed top-0 right-0 z-menu',
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
            <Image src="/icons/close-white.svg" alt="" width={24} height={24} aria-hidden="true" />
          </IconButton>
        </div>

        {/* 컨텐츠 */}
        <div className="flex flex-col justify-center gap-8 my-16 mx-24">{children}</div>
      </aside>
    </>
  );

  // 클라이언트 마운트 전에는 렌더링하지 않음 (hydration mismatch 방지)
  if (!isMounted) {
    return null;
  }

  // Portal을 사용하여 body에 렌더링
  return createPortal(content, document.body);
};
