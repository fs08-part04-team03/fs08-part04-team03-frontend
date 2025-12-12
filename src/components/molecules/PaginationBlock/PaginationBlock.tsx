'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';
import { clsx } from '@/utils/clsx';

interface PaginationBlockProps {
  current: number;
  total: number;
  onPrev?: (newPage: number) => void;
  onNext?: (newPage: number) => void;
}

const PaginationBlock = ({ current, total, onPrev, onNext }: PaginationBlockProps) => {
  const [page, setPage] = useState(current);

  /**
   * current/total 변화 시 항상 안전한 page 값으로 보정
   * (필터로 total이 줄어드는 등 current > total 이 되는 경우 방지)
   */
  useEffect(() => {
    const safeTotal = Math.max(1, total);
    const safeCurrent = Math.min(Math.max(1, current), safeTotal);
    setPage(safeCurrent);
  }, [current, total]);

  const handlePrev = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPrev?.(newPage);
    }
  };

  const handleNext = () => {
    if (page < total) {
      const newPage = page + 1;
      setPage(newPage);
      onNext?.(newPage);
    }
  };

  const isPrevEnd = page === 1;
  const isNextEnd = page === total;

  return (
    <div
      className="flex items-center justify-between h-40 w-327 md:w-696 xl:w-1304"
      role="navigation"
      aria-label="페이지네이션"
    >
      {/* Page info */}
      <div className="text-gray-primary-500 text-16 font-normal tracking-tight font-suit">
        {page} of {total}
      </div>

      {/* Prev / Next Buttons */}
      <div className="flex items-center gap-30">
        {/* Prev */}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handlePrev}
          inactive={isPrevEnd}
          aria-label="이전 페이지로 이동"
          className="bg-transparent border-none shadow-none px-0 hover:cursor-pointer"
        >
          <div className="flex items-center gap-6">
            <div className={clsx('relative w-24 h-24', { 'opacity-50': isPrevEnd })}>
              <Image src="/icons/arrow-left.svg" alt="이전 페이지" fill />
            </div>
            <span
              className={clsx('text-16', {
                'text-gray-500': isPrevEnd,
                'text-gray-primary-500': !isPrevEnd,
              })}
            >
              Prev
            </span>
          </div>
        </Button>

        {/* Next */}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleNext}
          inactive={isNextEnd}
          aria-label="다음 페이지로 이동"
          className="bg-transparent border-none shadow-none px-0 hover:cursor-pointer"
        >
          <div className="flex items-center gap-6">
            <span
              className={clsx('text-16', {
                'text-gray-500': isNextEnd,
                'text-gray-950': !isNextEnd,
              })}
            >
              Next
            </span>
            <div className={clsx('relative w-24 h-24', { 'opacity-50': isNextEnd })}>
              <Image src="/icons/arrow-right.svg" alt="다음 페이지" fill />
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default PaginationBlock;
