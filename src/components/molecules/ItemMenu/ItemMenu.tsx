'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';

const ItemMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 바깥 클릭 시 드롭다운 닫기
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (
      dropdownRef.current &&
      target &&
      !dropdownRef.current.contains(target) &&
      buttonRef.current &&
      !buttonRef.current.contains(target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleItemClick = () => {
    setOpen(false);
  };

  // if/else로 드롭다운 표시 여부
  let dropdownVisibilityClass = '';
  if (open) {
    dropdownVisibilityClass = 'flex';
  } else {
    dropdownVisibilityClass = 'hidden';
  }

  return (
    <div className="relative w-95 h-100">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex w-24 h-24 justify-center items-center p-1 bg-transparent border-none cursor-pointer"
      >
        <Image src="/icons/ic-more.svg" alt="더보기" width={24} height={24} />
      </button>

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className={clsx(
          'absolute top-0 right-full flex-col bg-white shadow-dropdown rounded overflow-hidden z-dropdown w-100',
          dropdownVisibilityClass
        )}
      >
        <div
          role="button"
          tabIndex={0}
          className="flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer"
          onClick={handleItemClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick();
            }
          }}
        >
          상품 수정
        </div>

        <div
          role="button"
          tabIndex={0}
          className="flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer"
          onClick={handleItemClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick();
            }
          }}
        >
          상품 삭제
        </div>
      </div>
    </div>
  );
};

export default ItemMenu;
