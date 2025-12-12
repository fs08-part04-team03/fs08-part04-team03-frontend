'use client';

import React, { useState, useEffect } from 'react';
import { clsx } from '@/utils/clsx';

export interface CategoryFilterOption {
  value: number; // ChildCategory의 id (숫자) - breadcrumb과 동일하게
  label: string;
  count?: number;
}

export interface CategoryPanelSection {
  id: number; // ParentCategory의 id (숫자) - breadcrumb과 동일하게
  title: string;
  icon?: React.ReactNode;
  description?: React.ReactNode;
  options: CategoryFilterOption[];
}

export interface CategoryPanelProps {
  sections: CategoryPanelSection[];
  /** 현재 선택된 카테고리 (단일 선택) - ChildCategory의 id (숫자) */
  selectedValue?: number | null;
  /** 옵션 클릭 시 callback (토글 포함) */
  onChange?: (value: number | null) => void;
  className?: string;
}

export const CategoryPanel: React.FC<CategoryPanelProps> = ({
  sections,
  selectedValue,
  onChange,
  className,
}) => {
  // 선택된 옵션이 있는 섹션 찾기
  const getSectionWithSelectedOption = () => {
    if (!selectedValue) return null;
    return sections.find((section) =>
      section.options.some((option) => option.value === selectedValue)
    );
  };

  // 초기 상태: 선택된 옵션이 있는 섹션이 열려있음
  const [openSectionId, setOpenSectionId] = useState<number | null>(
    getSectionWithSelectedOption()?.id ?? null
  );

  // selectedValue가 변경될 때마다 선택된 섹션을 자동으로 열기
  useEffect(() => {
    if (!selectedValue) return;
    const foundSection = sections.find((s) =>
      s.options.some((option) => option.value === selectedValue)
    );
    if (foundSection) {
      setOpenSectionId(foundSection.id);
    }
  }, [selectedValue, sections]);

  const handleToggleSection = (id: number) => {
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  const handleClickOption = (value: number) => {
    if (!onChange) return;
    if (selectedValue === value) {
      onChange(null); // 같은 값 클릭 시 해제
    } else {
      onChange(value);
      // 선택된 옵션이 있는 섹션을 자동으로 열기
      const sectionWithOption = sections.find((s) =>
        s.options.some((option) => option.value === value)
      );
      if (sectionWithOption) {
        setOpenSectionId(sectionWithOption.id);
      }
    }
  };

  return (
    <section className={clsx('w-180 bg-white', 'flex flex-col', className)}>
      {sections.map((section) => {
        const isOpen = openSectionId === section.id;

        return (
          <div key={section.id} className="flex flex-col">
            {/* 카테고리 표시: 헤더 위 2px 구분선 - 대분류 클릭 시 바로 구분선 표시 */}
            {/* 헤더 클릭 시 구분선도 함께 움직임 */}
            {isOpen && <div className="h-0.5 bg-gray-900" />}

            {/* 헤더 버튼 */}
            <button
              type="button"
              onClick={() => handleToggleSection(section.id)}
              className={clsx(
                'w-full p-14',
                'flex items-center justify-between',
                'hover:bg-transparent',
                'transition-colors duration-150',
                'text-left'
              )}
            >
              <span className={clsx('text-16 text-gray-900', isOpen ? 'font-bold' : 'font-normal')}>
                {section.title}
              </span>

              {/* 열림/닫힘 화살표 */}
              <span
                className={clsx(
                  'inline-flex items-center justify-center transform transition-transform duration-200 ease-out text-gray-400 shrink-0 ml-2',
                  isOpen ? 'rotate-180' : 'rotate-0'
                )}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              className={clsx(
                'overflow-hidden',
                'transition-all duration-200 ease-out',
                isOpen ? 'max-h-500 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
              )}
            >
              <div className="p-14">
                <ul className="flex flex-col">
                  {section.options.map((option) => {
                    const isActive = selectedValue === option.value;

                    return (
                      <li key={option.value}>
                        <button
                          type="button"
                          onClick={() => handleClickOption(option.value)}
                          className={clsx(
                            'w-full text-left py-14 px-20',
                            'text-16',
                            'transition-colors duration-150',
                            isActive
                              ? 'text-gray-950 font-normal'
                              : 'text-gray-500 font-normal hover:text-gray-700'
                          )}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* 카테고리 표시 */}
            {isOpen && <div className="h-px bg-gray-100 mt-2" />}
          </div>
        );
      })}
    </section>
  );
};
