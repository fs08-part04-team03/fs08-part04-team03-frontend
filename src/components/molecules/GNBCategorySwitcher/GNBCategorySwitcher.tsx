'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import type { ParentCategoryKey, CategorySection } from '@/constants';
import type { GNBCategorySwitcherProps } from './GNBCategorySwitcherProps';

export const GNBCategorySwitcher = ({
  categories,
  categorySections,
  sectionIdByParentKey,
  activeCategoryId,
  productCategoryId,
  onCategoryChange,
  onSubCategoryChange,
  className,
}: GNBCategorySwitcherProps) => {
  const sections = useMemo<CategorySection[]>(() => categorySections ?? [], [categorySections]);

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // 상품 상세 > productCategoryId 우선
  const effectiveCategoryId: ParentCategoryKey = productCategoryId ?? activeCategoryId;
  const activeOption = useMemo(
    () => categories.find((c) => c.id === effectiveCategoryId) ?? categories[0],
    [categories, effectiveCategoryId]
  );

  // categorySections에서 sectionIdByParentKey를 내부적으로 파생
  const derivedSectionIdByParentKey = useMemo(() => {
    const mapping: Partial<Record<ParentCategoryKey, number>> = {};
    sections.forEach((section) => {
      if (section.key) {
        mapping[section.key as ParentCategoryKey] = section.id;
      }
    });
    return mapping;
  }, [sections]);

  // 외부에서 전달된 sectionIdByParentKey가 있으면 우선 사용, 없으면 내부 파생값 사용
  const finalSectionIdByParentKey = sectionIdByParentKey ?? derivedSectionIdByParentKey;

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = () => {
    setIsOpen(false);

    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const handleToggle = () => {
    if (!categories.length) return;
    setIsOpen((prev) => !prev);
  };

  const findFirstSubCategoryValue = (parentKey: ParentCategoryKey): number | null => {
    const sectionId = finalSectionIdByParentKey[parentKey];
    if (!sectionId) return null;

    const section = sections.find((s) => s.id === sectionId);
    const first = section?.options?.[0];
    return first?.value ?? null;
  };

  const handleParentClick = (parentKey: ParentCategoryKey) => {
    // 1) 대분류 변경 (상위에서 URL/state 업데이트)
    onCategoryChange(parentKey);

    // 2) 기존 UX 유지: 해당 대분류의 첫 소분류로 필터링 (가능할 때만)
    const firstSubValue = findFirstSubCategoryValue(parentKey);

    close();

    if (firstSubValue != null && onSubCategoryChange) {
      queueMicrotask(() => {
        onSubCategoryChange(firstSubValue);
      });
    }
  };

  // ESC로 닫기
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // 오버레이 열렸을 때 바디 스크롤 락
  useEffect(() => {
    if (!isOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  if (!categories.length || !activeOption) return null;

  const overlay = (
    <div
      className={clsx(
        'fixed inset-0 z-menu tablet:hidden',
        'transition-opacity duration-200',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('[role="dialog"]') === null) close();
      }}
      role="button"
      tabIndex={0}
      aria-label="오버레이 닫기"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') close();
      }}
    >
      <div
        className={clsx(
          'absolute left-0 right-0 top-56 w-full',
          'bg-white/95 backdrop-blur-sm',
          'py-24',
          'shadow-lg',
          'transform transition-transform duration-200 ease-out',
          isOpen ? 'translate-y-0' : '-translate-y-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="카테고리 선택"
      >
        <div className="px-24">
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
                      'w-full text-center text-16 py-12',
                      'transition-colors',
                      isActive
                        ? 'font-semibold text-gray-950'
                        : 'font-normal text-gray-400 hover:text-gray-800',
                      'cursor-pointer'
                    )}
                    role="option"
                    aria-selected={isActive}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleParentClick(category.id);
                    }}
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
  );

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
            'active:scale-[0.97] transition-transform',
            'cursor-pointer'
          )}
          onClick={handleToggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="카테고리 선택"
        >
          <span>{activeOption.label}</span>
          <Image
            src="/icons/arrow-down.svg"
            alt=""
            width={12}
            height={7}
            className={clsx('transition-transform duration-200', isOpen && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Portal: 오버레이를 body에 직접 렌더링 */}
      {mounted && isOpen && createPortal(overlay, document.body)}
    </>
  );
};
