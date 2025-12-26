'use client';

import { useState, useRef, useEffect } from 'react';
import { clsx } from '@/utils/clsx';

export interface Option {
  key: string;
  label: string;
}

export type SelectVariant = 'small' | 'medium' | 'large';

export interface DropDownProps {
  items: Option[];
  placeholder?: string;
  variant?: SelectVariant;
  disabled?: boolean;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  onSelect?: (item: Option) => void;
  selected?: Option; // ← 외부에서 선택된 값을 받는 prop
}

const DropDown: React.FC<DropDownProps> = ({
  items,
  placeholder = '선택',
  variant,
  disabled = false,
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  onSelect,
  selected: externalSelected, // ← 외부 selected
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(externalSelected ?? null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => !disabled && setOpen((prev) => !prev);

  const handleSelect = (item: Option) => {
    setSelected(item);
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  // 외부 selected prop 변경 시 내부 상태 동기화
  useEffect(() => {
    setSelected(externalSelected ?? null);
  }, [externalSelected]);

  // 외부 클릭 + Escape 키 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const appliedVariant: SelectVariant = variant ?? 'small';

  const sizeClasses = {
    small: `w-110 h-44`,
    medium: `mobile:w-153 tablet:w-216 desktop:w-216 h-56`,
    large: `mobile:w-327 tablet:w-480 desktop:w-480 h-44`,
  };

  const textColorClasses = {
    small: 'text-gray-950',
    medium: 'text-gray-500',
    large: 'text-gray-950',
  };

  const fontClasses = 'font-sans font-normal text-16 tracking--0.4';

  const optionHeightClasses = {
    small: 'h-44',
    medium: 'h-56',
    large: 'h-44',
  };

  return (
    <div ref={dropdownRef} className="relative z-20 inline-block">
      {/* 선택 박스 */}
      <button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={clsx(
          'border border-gray-300 rounded-8 bg-white flex items-center justify-between px-12',
          sizeClasses[appliedVariant],
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
          buttonClassName
        )}
      >
        <span className={clsx(fontClasses, textColorClasses[appliedVariant])}>
          {selected ? selected.label : placeholder}
        </span>

        <img
          src="/icons/arrow-down.svg"
          alt="arrow"
          className={clsx('w-12 h-12 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {/* 옵션 드롭다운 */}
      {open && (
        <ul
          role="listbox"
          aria-label={placeholder}
          className={clsx(
            'absolute left-0 mt-4 w-full bg-white border border-gray-300 shadow-lg rounded-8 z-dropdown max-h-200 overflow-y-auto scrollbar-none',
            dropdownClassName
          )}
        >
          {items.map((item) => (
            <li
              key={item.key}
              role="option"
              aria-selected={selected?.key === item.key}
              tabIndex={0}
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelect(item);
                }
              }}
              className={clsx(
                'flex items-center px-12 cursor-pointer hover:bg-gray-100',
                fontClasses,
                textColorClasses[appliedVariant],
                optionHeightClasses[appliedVariant],
                selected?.key === item.key && 'bg-gray-50',
                optionClassName
              )}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
