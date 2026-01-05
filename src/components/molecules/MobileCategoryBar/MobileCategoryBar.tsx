'use client';

import { clsx } from '@/utils/clsx';
import { getParentById, getChildById } from '@/constants/categories/categories.utils';

export interface MobileCategoryBarProps {
  /** 선택된 카테고리 ID (대분류 or 소분류) */
  categoryId?: number | null;

  /** 클릭 핸들러 */
  onClick?: () => void;

  /** 추가 className */
  className?: string;
}

export const MobileCategoryBar = ({ categoryId, onClick, className }: MobileCategoryBarProps) => {
  if (!categoryId) return null;

  // 소분류인지 확인
  const childCategory = getChildById(categoryId);

  let displayText = '';

  if (childCategory) {
    // 소분류가 있으면 대분류 · 소분류 형식으로 표시
    const parentCategory = getParentById(childCategory.parentId);
    if (parentCategory) {
      displayText = `${parentCategory.name} · ${childCategory.name}`;
    } else {
      displayText = childCategory.name;
    }
  } else {
    // 대분류만 있으면 대분류만 표시
    const parentCategory = getParentById(categoryId);
    if (parentCategory) {
      displayText = parentCategory.name;
    }
  }

  if (!displayText) return null;

  return (
    <div
      className={clsx(
        'w-full bg-white border-b border-gray-200',
        'tablet:hidden', // 모바일 전용
        className
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          'w-full px-24 py-16',
          'flex items-center justify-between',
          'text-16 font-semibold text-gray-950',
          'hover:bg-gray-50 active:bg-gray-100',
          'transition-colors'
        )}
      >
        <span>{displayText}</span>
        <img src="/icons/arrow-down.svg" alt="" className="w-12 h-12" aria-hidden="true" />
      </button>
    </div>
  );
};
