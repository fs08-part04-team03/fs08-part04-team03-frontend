'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { PATHNAME } from '@/constants';
import { clsx } from '@/utils/clsx';

import type { CartButtonProps } from './CartButtonProps';

/**
 * CartButton
 *
 * - 장바구니 아이콘 + 숫자 뱃지 Molecule
 * - 뷰포트 상관 없이(모바일/태블릿/데스크탑) 항상 노출
 * - 숫자 폰트: 9px, text-gray-950
 * - 아이콘 크기: 24px
 */
export const CartButton = ({
  companyId,
  count,
  className,
  onClick,
  ariaLabel,
}: CartButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const href = PATHNAME.CART(companyId);
  const displayCount = count < 0 ? 0 : count;
  const label = ariaLabel ?? `장바구니 (${displayCount}개)`;

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    onClick?.();
  };

  return (
    <Link
      href={href}
      aria-label={label}
      onClick={handleClick}
      className={clsx(
        'inline-flex items-center justify-center',
        'w-32 h-32 rounded-full',
        'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
        className
      )}
    >
      <div className="relative inline-flex items-center justify-center">
        <Image
          src="/icons/cart.svg"
          alt=""
          width={24}
          height={24}
          className={clsx('transition-transform duration-300 ease-out', isAnimating && 'scale-125')}
          aria-hidden="true"
        />

        {/* 숫자 뱃지: count가 0보다 클 때만 표시 */}
        {displayCount > 0 && (
          <span
            className={clsx(
              'pointer-events-none',
              'absolute',
              'top-9 left-4.5',
              'min-w-14 h-14',
              'flex justify-center items-center',
              'text-11 font-bold text-gray-950'
            )}
          >
            {displayCount > 99 ? '99' : displayCount}
          </span>
        )}
      </div>
    </Link>
  );
};

CartButton.displayName = 'CartButton';
