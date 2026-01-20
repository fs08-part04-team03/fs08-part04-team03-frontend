'use client';

import { useEffect, useMemo, useState } from 'react';
import { clsx } from '@/utils/clsx';
import type { ReactNode } from 'react';

export interface CategoryFilterOption {
  value: number; // ChildCategory id
  label: string;
  count?: number;
}

export interface CategoryPanelSection {
  id: number; // ParentCategory id
  title: string;
  icon?: ReactNode;
  description?: ReactNode;
  options: CategoryFilterOption[];
}

export interface CategoryPanelProps {
  sections: CategoryPanelSection[];

  /** (모바일) GNB에서 선택된 대분류(ParentCategory) id */
  activeSectionId?: number | null;

  /** 현재 선택된 카테고리 (단일 선택) - ChildCategory id */
  selectedValue?: number | null;

  /** 옵션 클릭 시 callback (토글 포함) */
  onChange?: (value: number | null) => void;

  className?: string;
}

type InternalPanelProps = CategoryPanelProps;
type TabletDesktopPanelProps = Omit<CategoryPanelProps, 'activeSectionId'>;

/* =========================
   Mobile Panel
========================= */
const CategoryPanelMobile = ({
  sections,
  activeSectionId,
  selectedValue,
  onChange,
  className,
}: InternalPanelProps) => {
  const activeSection = useMemo(() => {
    if (!sections?.length) return null;

    // ✅ GNB에서 선택된 대분류가 있으면 그 섹션을 최우선으로 사용
    if (activeSectionId != null) {
      return sections.find((s) => s.id === activeSectionId) ?? sections[0];
    }

    // (fallback) selectedValue가 속한 섹션을 찾음
    if (selectedValue != null) {
      const found = sections.find((s) => s.options.some((o) => o.value === selectedValue));
      if (found) return found;
    }

    return sections[0];
  }, [sections, activeSectionId, selectedValue]);

  // ✅ GNB로 대분류가 바뀌었는데 selectedValue가 그 섹션에 없으면 선택 해제
  useEffect(() => {
    if (!activeSection) return;
    if (activeSectionId == null) return;
    if (!onChange) return;

    if (selectedValue == null) return;

    const belongsToActiveSection = activeSection.options.some((o) => o.value === selectedValue);
    if (!belongsToActiveSection) {
      onChange(null);
    }
  }, [activeSection, activeSectionId, selectedValue, onChange]);

  const handleClickOption = (value: number) => {
    if (!onChange) return;
    onChange(selectedValue === value ? null : value);
  };

  if (!activeSection) return null;

  return (
    <section className={clsx('w-full bg-white tablet:hidden', 'flex flex-col', className)}>
      <div
        className={clsx(
          'w-full overflow-x-auto border-b border-gray-200',
          'scroll-smooth scrollbar-none'
        )}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className={clsx('flex min-w-max px-16')}>
          {activeSection.options.map((option) => {
            const isActive = selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => handleClickOption(option.value)}
                className={clsx(
                  'px-16 py-14 whitespace-nowrap',
                  'text-14 transition-colors duration-150',
                  isActive
                    ? 'text-gray-950 font-bold'
                    : 'text-gray-500 font-normal hover:text-gray-700',
                  'cursor-pointer'
                )}
                aria-pressed={isActive}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* =========================
   Tablet Panel
========================= */
const CategoryPanelTablet = ({
  sections,
  selectedValue,
  onChange,
  className,
}: TabletDesktopPanelProps) => {
  const getSectionWithSelectedOption = () => {
    if (!selectedValue) return null;
    return sections.find((section) =>
      section.options.some((option) => option.value === selectedValue)
    );
  };

  const [openSectionId, setOpenSectionId] = useState<number | null>(
    getSectionWithSelectedOption()?.id ?? null
  );

  useEffect(() => {
    if (!selectedValue) return;
    const foundSection = sections.find((s) =>
      s.options.some((option) => option.value === selectedValue)
    );
    if (foundSection) setOpenSectionId(foundSection.id);
  }, [selectedValue, sections]);

  const handleToggleSection = (id: number) => {
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  const handleClickOption = (value: number) => {
    if (!onChange) return;
    if (selectedValue === value) {
      onChange(null);
      return;
    }
    onChange(value);

    const sectionWithOption = sections.find((s) =>
      s.options.some((option) => option.value === value)
    );
    if (sectionWithOption) setOpenSectionId(sectionWithOption.id);
  };

  if (!sections?.length) return null;

  return (
    <section
      className={clsx(
        'hidden tablet:flex desktop:hidden w-180 bg-white',
        'flex flex-col',
        className
      )}
    >
      {/* 카테고리 타이틀 */}
      <div className="mb-10 text-18 font-suit font-bold text-gray-primary-950 tracking-[-0.45px]">
        카테고리
      </div>

      {sections.map((section) => {
        const isOpen = openSectionId === section.id;

        return (
          <div key={section.id} className="flex flex-col">
            {isOpen && <div className="h-0.5 bg-gray-900" />}

            <button
              type="button"
              onClick={() => handleToggleSection(section.id)}
              className={clsx(
                'w-full p-14',
                'flex items-center justify-between',
                'transition-colors duration-150',
                'text-left',
                'cursor-pointer'
              )}
            >
              <span className={clsx('text-16 text-gray-900', isOpen ? 'font-bold' : 'font-normal')}>
                {section.title}
              </span>

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
                            'text-16 transition-colors duration-150',
                            isActive
                              ? 'text-gray-950 font-normal'
                              : 'text-gray-500 font-normal hover:text-gray-700',
                            'cursor-pointer'
                          )}
                          aria-pressed={isActive}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {isOpen && <div className="h-px bg-gray-100 mt-2" />}
          </div>
        );
      })}
    </section>
  );
};

/* =========================
   Desktop Panel
========================= */
const CategoryPanelDesktop = ({
  sections = [],
  selectedValue,
  onChange,
  className,
}: TabletDesktopPanelProps) => {
  const getSectionWithSelectedOption = () => {
    if (!selectedValue) return null;
    return sections.find((section) =>
      section.options.some((option) => option.value === selectedValue)
    );
  };

  const [openSectionId, setOpenSectionId] = useState<number | null>(
    getSectionWithSelectedOption()?.id ?? null
  );

  useEffect(() => {
    if (!selectedValue) return;
    const foundSection = sections.find((s) =>
      s.options.some((option) => option.value === selectedValue)
    );
    if (foundSection) setOpenSectionId(foundSection.id);
  }, [selectedValue, sections]);

  const handleToggleSection = (id: number) => {
    setOpenSectionId((prev) => (prev === id ? null : id));
  };

  const handleClickOption = (value: number) => {
    if (!onChange) return;
    if (selectedValue === value) {
      onChange(null);
      return;
    }
    onChange(value);

    const sectionWithOption = sections.find((s) =>
      s.options.some((option) => option.value === value)
    );
    if (sectionWithOption) setOpenSectionId(sectionWithOption.id);
  };

  if (!sections.length) return null;

  return (
    <section className={clsx('hidden desktop:flex w-180 bg-white', 'flex flex-col', className)}>
      {/* 카테고리 타이틀 */}
      <div className="mb-10 text-18 font-suit font-bold text-gray-primary-950 tracking-[-0.45px]">
        카테고리
      </div>

      {sections.map((section) => {
        const isOpen = openSectionId === section.id;

        return (
          <div key={section.id} className="flex flex-col">
            {isOpen && <div className="h-0.5 bg-gray-900" />}

            <button
              type="button"
              onClick={() => handleToggleSection(section.id)}
              className={clsx(
                'w-full p-14',
                'flex items-center justify-between',
                'transition-colors duration-150',
                'text-left',
                'cursor-pointer'
              )}
            >
              <span className={clsx('text-16 text-gray-900', isOpen ? 'font-bold' : 'font-normal')}>
                {section.title}
              </span>

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
                            'text-16 transition-colors duration-150',
                            isActive
                              ? 'text-gray-950 font-normal'
                              : 'text-gray-500 font-normal hover:text-gray-700',
                            'cursor-pointer'
                          )}
                          aria-pressed={isActive}
                        >
                          {option.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {isOpen && <div className="h-px bg-gray-100 mt-2" />}
          </div>
        );
      })}
    </section>
  );
};

/* =========================
   CategoryPanel Export
========================= */
export const CategoryPanel = ({
  sections,
  activeSectionId,
  selectedValue,
  onChange,
  className,
}: CategoryPanelProps) => (
  <>
    <CategoryPanelMobile
      sections={sections}
      activeSectionId={activeSectionId}
      selectedValue={selectedValue}
      onChange={onChange}
      className={className}
    />

    <CategoryPanelTablet
      sections={sections}
      selectedValue={selectedValue}
      onChange={onChange}
      className={className}
    />

    <CategoryPanelDesktop
      sections={sections}
      selectedValue={selectedValue}
      onChange={onChange}
      className={className}
    />
  </>
);
