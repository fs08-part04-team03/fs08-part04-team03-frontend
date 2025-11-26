'use client';

import { useState } from 'react';
import { clsx } from '@/utils/clsx';

interface Option {
  key: string;
  label: string;
}

export type SelectVariant = 'small' | 'medium' | 'large';

export interface DropDownProps {
  items: Option[];
  placeholder?: string;
  className?: string;
  variant?: SelectVariant;
  disabled?: boolean;
}

const DropDown: React.FC<DropDownProps> = ({
  items,
  placeholder = '선택해 주세요',
  className = '',
  variant,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const toggleOpen = () => !disabled && setOpen((prev) => !prev);
  const handleSelect = (item: Option) => {
    setSelected(item);
    setOpen(false);
  };

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

  const fontClasses = 'font-SUIT font-normal text-16 tracking--0.4';

  const optionHeightClasses = {
    small: 'h-44',
    medium: 'h-56',
    large: 'h-44',
  };

  return (
    <div className={clsx('relative inline-block', className)}>
      {/* 선택 박스 */}
      <button
        type="button"
        onClick={toggleOpen}
        disabled={disabled}
        className={clsx(
          'border border-gray-300 rounded-8 bg-white flex items-center justify-between px-12',
          sizeClasses[appliedVariant],
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
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
          className={clsx(
            'absolute left-0 mt-4 w-full bg-white border border-gray-300 shadow-lg rounded-8 z-dropdown max-h-200 overflow-y-auto'
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style>{`
            ul::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {items.map((item) => (
            <li
              key={item.key}
              role="option"
              tabIndex={0}
              aria-selected={selected?.key === item.key}
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSelect(item);
              }}
              className={clsx(
                'flex items-center px-12 cursor-pointer hover:bg-gray-100',
                fontClasses,
                textColorClasses[appliedVariant],
                optionHeightClasses[appliedVariant]
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
