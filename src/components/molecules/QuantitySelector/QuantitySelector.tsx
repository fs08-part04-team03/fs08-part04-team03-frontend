'use client';

import React, { useState, useEffect, useRef } from 'react';
import { clsx } from '@/utils/clsx';
import type { Option } from '@/components/atoms/DropDown/DropDown';

export type QuantitySelectorVariant = 'default' | 'secondary';

export interface QuantitySelectorProps {
  onQuantityChange?: (option: Option) => void;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  variant?: QuantitySelectorVariant;
  label?: string;
  className?: string;
}

const DEFAULT_OPTIONS: Option[] = [
  { key: '1', label: '1' },
  { key: '2', label: '2' },
  { key: '3', label: '3' },
  { key: '4', label: '4' },
  { key: '5', label: '5' },
  { key: '6', label: '6' },
  { key: '7', label: '7' },
  { key: '8', label: '8' },
  { key: '9', label: '9' },
  { key: '10+', label: '10+' },
];

const TEN_PLUS_OPTION: Option = { key: '10+', label: '10+' };

/**
 * QuantitySelector
 *
 * 수량을 선택할 수 있는 드롭다운 컴포넌트
 * 1~9까지 선택 가능하며, 10+를 선택하면 직접 입력 가능
 */
export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  onQuantityChange,
  value,
  defaultValue,
  min = 1,
  max = 999,
  variant = 'default',
  label,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentValue = value ?? defaultValue ?? 1;
  const foundOption = DEFAULT_OPTIONS.find((opt) => opt.key === String(currentValue));
  const selectedOption: Option =
    currentValue <= 9 ? (foundOption ?? DEFAULT_OPTIONS[0]!) : TEN_PLUS_OPTION;

  const displayLabel = isCustomInput ? customValue || String(currentValue) : selectedOption.label;

  useEffect(() => {
    if (value !== undefined && value > 9) {
      setIsCustomInput(true);
      setCustomValue(String(value));
    } else if (value !== undefined && value <= 9) {
      setIsCustomInput(false);
      setCustomValue('');
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setIsCustomInput(false);
      }
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

  useEffect(() => {
    if (isCustomInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCustomInput]);

  const handleSelect = (option: Option) => {
    if (option.key === '10+') {
      setIsCustomInput(true);
      setCustomValue(String(currentValue > 9 ? currentValue : '10'));
      setOpen(false);
    } else {
      const numValue = Number(option.key);
      setIsCustomInput(false);
      setCustomValue('');
      setOpen(false);
      onQuantityChange?.({
        key: option.key,
        label: `${numValue}개`,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setCustomValue('');
      return;
    }

    const parsed = Number(inputValue);
    if (Number.isNaN(parsed)) return;

    let next = parsed;
    if (next < min) next = min;
    if (next > max) next = max;

    setCustomValue(String(next));

    onQuantityChange?.({
      key: String(next),
      label: `${next}개`,
    });
  };

  const handleInputBlur = () => {
    if (customValue === '' || Number(customValue) < min) {
      const fallback = min;
      setCustomValue(String(fallback));
      onQuantityChange?.({
        key: String(fallback),
        label: `${fallback}개`,
      });
    }
  };

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleInputClick = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const isSecondary = variant === 'secondary';

  const borderClass = isSecondary ? '' : 'border border-gray-300';
  const paddingClass = isSecondary ? 'px-4' : 'px-12';
  // 뷰포트별 크기: 모바일/태블릿은 w-72 h-40, 데스크탑은 w-99 h-44
  const sizeClass = isSecondary ? 'w-72 h-40 desktop:w-99 desktop:h-44' : 'w-99 h-44';
  // 드롭다운 옵션 너비: default와 secondary 모두 동일하게 뷰포트별 설정
  const dropdownWidthClass = isSecondary ? 'w-40 desktop:w-99' : 'w-40 desktop:w-99';
  const textAlignClass = 'text-right';
  const justifyClass = 'justify-end';
  const inputWidthClass = isSecondary ? 'w-auto flex-shrink-0' : 'w-full';
  const gapClass = isSecondary ? 'gap-20' : 'gap-20';

  return (
    <div className={clsx('flex items-center gap-16', className)}>
      {label && <span className="text-14 leading-22 tracking--0.35 text-gray-950">{label}</span>}
      <div ref={dropdownRef} className="relative inline-block">
        {isCustomInput ? (
          <div
            className={clsx(
              'relative rounded-8 bg-white flex items-center',
              sizeClass,
              borderClass,
              paddingClass,
              justifyClass,
              gapClass
            )}
          >
            <input
              ref={inputRef}
              type="number"
              min={min}
              max={max}
              value={customValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onClick={handleInputClick}
              className={clsx(
                'border-none outline-none',
                'font-sans font-normal text-16 tracking--0.4 text-gray-950',
                'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                'bg-transparent',
                inputWidthClass,
                textAlignClass
              )}
              aria-label="수량 입력"
            />
            <button
              type="button"
              onClick={toggleOpen}
              className="shrink-0"
              aria-label="드롭다운 열기"
            >
              <img
                src="/icons/arrow-down.svg"
                alt="arrow"
                className={clsx(
                  'w-12 h-12 transition-transform duration-200',
                  open && 'rotate-180'
                )}
              />
            </button>
            {/* 옵션 드롭다운 */}
            {open && (
              <ul
                role="listbox"
                aria-label="수량 선택"
                className={clsx(
                  'absolute left-0 top-full mt-4 bg-white border border-gray-300 shadow-lg rounded-8 z-dropdown max-h-200 overflow-y-auto scrollbar-none',
                  dropdownWidthClass
                )}
              >
                {DEFAULT_OPTIONS.map((item) => (
                  <li
                    key={item.key}
                    role="option"
                    aria-selected={selectedOption.key === item.key}
                    tabIndex={0}
                    onClick={() => handleSelect(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(item);
                      }
                    }}
                    className={clsx(
                      'flex items-center px-12 h-44 cursor-pointer hover:bg-gray-100',
                      'font-sans font-normal text-16 tracking--0.4 text-gray-950',
                      selectedOption.key === item.key && 'bg-gray-50'
                    )}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <>
            {/* 선택 박스 */}
            <button
              type="button"
              onClick={toggleOpen}
              aria-haspopup="listbox"
              aria-expanded={open}
              className={clsx(
                'rounded-8 bg-white',
                'flex items-center',
                sizeClass,
                borderClass,
                paddingClass,
                justifyClass,
                gapClass,
                'cursor-pointer'
              )}
            >
              <span
                className={clsx(
                  'font-sans font-normal text-16 tracking--0.4 text-gray-950',
                  textAlignClass
                )}
              >
                {displayLabel}
              </span>

              <img
                src="/icons/arrow-down.svg"
                alt="arrow"
                className={clsx(
                  'w-12 h-12 transition-transform duration-200',
                  open && 'rotate-180'
                )}
              />
            </button>

            {/* 옵션 드롭다운 */}
            {open && (
              <ul
                role="listbox"
                aria-label="수량 선택"
                className={clsx(
                  'absolute left-0 mt-4 bg-white border border-gray-300 shadow-lg rounded-8 z-dropdown max-h-200 overflow-y-auto scrollbar-none',
                  dropdownWidthClass
                )}
              >
                {DEFAULT_OPTIONS.map((item) => (
                  <li
                    key={item.key}
                    role="option"
                    aria-selected={selectedOption.key === item.key}
                    tabIndex={0}
                    onClick={() => handleSelect(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(item);
                      }
                    }}
                    className={clsx(
                      'flex items-center px-12 h-44 cursor-pointer hover:bg-gray-100',
                      'font-sans font-normal text-16 tracking--0.4 text-gray-950',
                      selectedOption.key === item.key && 'bg-gray-50'
                    )}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuantitySelector;
