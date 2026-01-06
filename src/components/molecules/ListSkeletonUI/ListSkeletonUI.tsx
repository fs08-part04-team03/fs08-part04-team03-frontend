import { clsx } from '@/utils/clsx';
import { SkeletonUI } from '../../atoms/SkeletonUI/SkeletonUI';

interface ListSkeletonUIProps {
  rows?: number;
  className?: string;
}

const ListSkeleton = ({ rows = 5, className }: ListSkeletonUIProps) => (
  <div className={clsx('w-full', className)}>
    {/* Mobile/Tablet Skeleton */}
    <div className="desktop:hidden">
      {Array.from({ length: rows }, (_, index) => (
        <div key={`mobile-skeleton-${index}`} className="py-20 tablet:py-30">
          <SkeletonUI className="h-16 w-80 mb-10" />
          <div className="flex gap-20">
            <SkeletonUI className="w-90 h-90 shrink-0" />
            <div className="flex flex-col gap-6 flex-1">
              <SkeletonUI className="h-12 w-100" />
              <SkeletonUI className="h-14 w-full tablet:h-16" />
              <SkeletonUI className="h-14 w-60" />
              <SkeletonUI className="h-14 w-full" />
            </div>
          </div>
          {index < rows - 1 && <div className="mt-30 h-1 bg-gray-200" />}
        </div>
      ))}
    </div>

    {/* Desktop Skeleton */}
    <div className="hidden desktop:block">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={`desktop-skeleton-${index}`}
          className="flex items-center desktop:px-40 desktop:gap-16 desktop:h-100 border-b border-gray-200"
        >
          <div className="flex-1 flex items-center gap-20">
            <SkeletonUI className="w-40 h-40 shrink-0" />
            <SkeletonUI className="h-16 w-200" />
          </div>
          <SkeletonUI className="w-120 h-16" />
          <SkeletonUI className="w-180 h-16" />
          <SkeletonUI className="w-160 h-16" />
          <SkeletonUI className="w-180 h-16" />
        </div>
      ))}
    </div>
  </div>
);

export default ListSkeleton;
