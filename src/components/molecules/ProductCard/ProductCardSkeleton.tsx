import { clsx } from '@/utils/clsx';
import { SkeletonUI } from '../../atoms/SkeletonUI/SkeletonUI';

type ProductCardVariant = 'product' | 'order' | 'wishlist';

interface ProductCardSkeletonProps {
  variant?: ProductCardVariant;
  className?: string;
}

const ProductCardSkeleton = ({ variant = 'product', className }: ProductCardSkeletonProps) => {
  const rootClasses = clsx(
    'flex flex-col overflow-hidden',
    'rounded-default bg-white text-left',
    'shadow-card',

    // Product / Order
    (variant === 'product' || variant === 'order') &&
      'w-155 h-241 tablet:w-156 tablet:h-252 desktop:w-367 desktop:h-439',

    // Wishlist
    variant === 'wishlist' && 'w-155 h-251 tablet:w-219 tablet:h-315 desktop:w-373 desktop:h-445',

    className
  );

  return (
    <div className={rootClasses}>
      {/* Image */}
      <div
        className={clsx(
          'relative rounded-default bg-gray-50 flex items-center justify-center overflow-hidden',
          (variant === 'product' || variant === 'order') &&
            'w-155 h-241 tablet:w-156 tablet:h-252 desktop:w-367 desktop:h-439',
          variant === 'wishlist' &&
            'w-155 h-155 tablet:w-219 tablet:h-219 desktop:w-373 desktop:h-373'
        )}
      >
        <div className="relative w-full h-full">
          <SkeletonUI className="absolute inset-0 w-full h-full" />
        </div>

        {/* Heart 버튼 */}
        <div className="absolute bottom-10 right-10 w-17 h-17 desktop:bottom-20 desktop:right-20 desktop:w-25 desktop:h-25">
          <SkeletonUI className="w-full h-full rounded-full" />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2">
        {/* ProductTile Skeleton */}
        {variant === 'product' || variant === 'wishlist' ? (
          <>
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
          </>
        ) : (
          <>
            {/* 모바일 + 태블릿 */}
            <div className="flex flex-col gap-2 desktop:hidden">
              <SkeletonUI className="h-22 w-3/4" />
              <SkeletonUI className="h-22 w-1/2" />
              <SkeletonUI className="h-18 w-2/5" />
            </div>

            {/* 데스크톱 */}
            <div className="hidden desktop:flex desktop:flex-col desktop:gap-2">
              <div className="flex flex-row items-center gap-8">
                <SkeletonUI className="h-24 w-3/5" />
                <SkeletonUI className="h-22 w-1/3" />
              </div>
              <SkeletonUI className="h-24 w-1/2" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
