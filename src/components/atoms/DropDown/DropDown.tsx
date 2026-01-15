'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
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
  selected?: Option;
  inModal?: boolean;
}

const DropDown = ({
  items,
  placeholder = '선택',
  variant,
  disabled = false,
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  onSelect,
  selected: externalSelected,
  inModal = false,
}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<Option | null>(externalSelected ?? null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleOpen = () => !disabled && setOpen((prev) => !prev);

  const handleSelect = (item: Option) => {
    setSelected(item);
    setOpen(false);

    // 닫힘 렌더를 먼저 반영한 뒤 콜백 실행
    queueMicrotask(() => {
      onSelect?.(item);
    });
  };

  useEffect(() => {
    setSelected(externalSelected ?? null);
  }, [externalSelected]);

  /** 위치 계산 */
  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [open]);

  /** 외부 클릭 + ESC */
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const appliedVariant: SelectVariant = variant ?? 'small';

  const sizeClasses = {
    small: 'w-110 h-44',
    medium: 'mobile:w-153 tablet:w-216 desktop:w-216 h-56',
    large: 'mobile:w-327 tablet:w-480 desktop:w-480 h-44',
  };

  const textColorClasses = {
    small: 'text-gray-950',
    medium: 'text-gray-500',
    large: 'text-gray-950',
  };

  const fontClasses = 'font-sans font-normal text-15 tracking--0.4';

  const optionHeightClasses = {
    small: 'h-44',
    medium: 'h-56',
    large: 'h-44',
  };

  /** ✅ z-index 클래스 */
  const zIndexClass = inModal ? 'z-[var(--z-modaldropdown)]' : 'z-[var(--z-dropdown)]';

  return (
    <>
      <button
        ref={buttonRef}
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

        <Image
          src="/icons/arrow-down.svg"
          alt=""
          aria-hidden
          width={12}
          height={12}
          className={clsx('w-12 h-12 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {mounted &&
        open &&
        createPortal(
          <ul
            ref={dropdownRef}
            role="listbox"
            aria-label={placeholder}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className={clsx(
              zIndexClass,
              'bg-white border border-gray-300 shadow-lg rounded-8 max-h-200 overflow-y-auto scrollbar-none',
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
          </ul>,
          document.body
        )}
    </>
  );
};

export default DropDown;
