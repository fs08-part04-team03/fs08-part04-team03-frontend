'use client';

import React, { useEffect, useRef, useState } from 'react';

import { clsx } from '@/utils/clsx';
import type { ParentCategoryKey } from '@/constants';
import type { GNBCategorySwitcherProps } from './GNBCategorySwitcherProps';

export const GNBCategorySwitcher: React.FC<GNBCategorySwitcherProps> = ({
  categories,
  activeCategoryId,
  productCategoryId,
  onCategoryChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // 상품 상세 > productCategoryId 우선
  const effectiveCategoryId = productCategoryId ?? activeCategoryId;

  const activeOption = categories.find((c) => c.id === effectiveCategoryId) ?? categories[0];

  const handleToggle = () => {
    if (!categories.length) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (id: ParentCategoryKey) => {
    onCategoryChange(id);
    setIsOpen(false);
  };

  // ESC로 닫기
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!categories.length || !activeOption) {
    return null;
  }

  return (
    <>
      {/* GNB 상단 버튼 (모바일 전용) */}
      <div className={clsx('relative flex items-center justify-start tablet:hidden', className)}>
        <button
          ref={triggerRef}
          type="button"
          className={clsx(
            'flex justify-end items-center gap-10',
            'px-8 py-4 rounded-999',
            'text-16 font-medium text-gray-950',
            'active:scale-[0.97] transition-transform'
          )}
          onClick={handleToggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="카테고리 선택"
        >
          <span>{activeOption.label}</span>
          <img
            src="/icons/arrow-down.svg"
            alt=""
            className={clsx('w-12 h-7 transition-transform duration-200', isOpen && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* 드롭다운 오버레이 */}
      <div
        className={clsx(
          'fixed inset-0 z-tooltip tablet:hidden',
          'transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('[role="dialog"]') === null) {
            setIsOpen(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false);
        }}
        role="button"
        tabIndex={-1}
        aria-label="오버레이 닫기"
      >
        <div
          className={clsx(
            'absolute left-0 right-0 top-56',
            'bg-white/95 backdrop-blur-sm',
            'py-24',
            'transform transition-transform duration-200 ease-out',
            isOpen ? 'translate-y-0' : '-translate-y-full'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="카테고리 선택"
        >
          <div className="px-24">
            {/* 대분류 리스트만 표시 */}
            <ul
              className="flex flex-col gap-10 max-h-[60vh] overflow-y-auto"
              role="listbox"
              aria-label="카테고리 목록"
            >
              {categories.map((category) => {
                const isActive = category.id === effectiveCategoryId;

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      className={clsx(
                        'w-full text-center text-16 py-5',
                        'transition-colors',
                        isActive
                          ? 'font-semibold text-gray-950'
                          : 'font-normal text-gray-400 hover:text-gray-800'
                      )}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => handleSelect(category.id)}
                    >
                      {category.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
