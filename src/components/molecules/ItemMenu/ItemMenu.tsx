'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

interface ItemMenuProps {
  onClick?: (action: 'edit' | 'delete') => void;
}

const ItemMenu = ({ onClick }: ItemMenuProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (action: 'edit' | 'delete') => {
    setOpen(false);
    onClick?.(action);
  };

  return (
    <div className="relative w-24 h-24">
      <IconButton
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="w-24 h-24 p-1 cursor-pointer"
      >
        <Image src="/icons/ic-more.svg" alt="더보기" width={24} height={24} unoptimized />
      </IconButton>

      <div
        ref={dropdownRef}
        className={clsx(
          'absolute top-0 flex-col bg-white shadow-dropdown rounded overflow-hidden z-dropdown w-100',
          'right-full xl:left-full xl:right-auto',
          open ? 'flex' : 'hidden'
        )}
      >
        <div
          role="button"
          tabIndex={0}
          className="flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer"
          onClick={() => handleItemClick('edit')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick('edit');
            }
          }}
        >
          상품 수정
        </div>

        <div
          role="button"
          tabIndex={0}
          className="flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer"
          onClick={() => handleItemClick('delete')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleItemClick('delete');
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
