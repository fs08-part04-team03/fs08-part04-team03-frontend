'use client';

import { clsx } from '@/utils/clsx';

export interface CarouselIndicatorProps {
  count: number;
  activeIndex: number;
  onSelect?: (index: number) => void;
  ariaLabelPrefix?: string;
  className?: string;
}

/**
 * CarouselIndicator (Atom)
 * - 점(dot) 인디케이터를 렌더링합니다.
 * - onSelect가 있으면 클릭으로 이동(네비게이션) 가능합니다.
 */
export const CarouselIndicator = ({
  count,
  activeIndex,
  onSelect,
  ariaLabelPrefix = '캐러셀',
  className,
}: CarouselIndicatorProps) => {
  if (count <= 1) return null;

  const isClickable = typeof onSelect === 'function';
  const dots = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={clsx('flex justify-center gap-6', className)} aria-hidden={!isClickable}>
      {dots.map((dotIndex) => {
        const dotClassName = clsx(
          'h-6 w-6 rounded-full transition-colors',
          dotIndex === activeIndex ? 'bg-gray-900' : 'bg-gray-200'
        );

        if (!isClickable) return <span key={dotIndex} className={dotClassName} />;

        return (
          <button
            key={dotIndex}
            type="button"
            aria-label={`${ariaLabelPrefix} ${dotIndex + 1}번째로 이동`}
            onClick={() => onSelect(dotIndex)}
            className={dotClassName}
          />
        );
      })}
    </div>
  );
};
