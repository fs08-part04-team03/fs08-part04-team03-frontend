import { clsx } from '@/utils/clsx';
import { SkeletonUI } from '../../atoms/SkeletonUI/SkeletonUI';

interface ProductListRowSkeletonProps {
  rows?: number;
  className?: string;
}

const ProductListRowSkeleton = ({ rows = 6, className }: ProductListRowSkeletonProps) => (
  <div
    className={clsx(
      'grid',
      'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
      'desktop:gap-x-40 tablet:gap-x-14 gap-x-16',
      'desktop:gap-y-60 tablet:gap-y-50 gap-y-40',
      className
    )}
  >
    {Array.from({ length: rows }, (_, index) => (
      <div
        key={`product-row-skeleton-${index}`}
        className={clsx(
          'flex flex-col overflow-hidden',
          'rounded-default bg-white text-left',
          'shadow-card',
          // ProductCard와 동일한 반응형 aspect-ratio
          'w-full aspect-[155/241] tablet:aspect-[156/252] desktop:aspect-[367/439]'
        )}
      >
        {/* 이미지 영역 - ProductCard와 동일하게 정사각형 */}
        <div
          className={clsx(
            'relative rounded-default bg-gray-50 flex items-center justify-center overflow-hidden',
            'w-full aspect-square'
          )}
        >
          <div className="relative w-full h-full">
            <SkeletonUI className="absolute inset-0 w-full h-full" />
          </div>
          {/* 하트 버튼 */}
          <div className="absolute bottom-10 right-10 w-17 h-17 desktop:bottom-20 desktop:right-20 desktop:w-25 desktop:h-25">
            <SkeletonUI className="w-full h-full rounded-full" />
          </div>
        </div>
        {/* 텍스트 영역 */}
        <div className="flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2">
          {/* 모바일 + 태블릿 */}
          <div className="flex flex-col gap-2 desktop:hidden">
            <SkeletonUI className="h-22 w-3/4" />
            <SkeletonUI className="h-22 w-1/2" />
            <SkeletonUI className="h-18 w-1/3" />
          </div>
          {/* 데스크톱 */}
          <div className="hidden desktop:flex desktop:flex-col desktop:gap-2">
            <div className="flex flex-row items-center gap-8">
              <SkeletonUI className="h-24 w-3/5" />
              <SkeletonUI className="h-22 w-1/4" />
            </div>
            <SkeletonUI className="h-24 w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProductListRowSkeleton;
