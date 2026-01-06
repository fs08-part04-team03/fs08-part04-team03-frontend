'use client';

import { clsx } from '@/utils/clsx';
import ProductCardSkeleton from '@/components/molecules/ProductCard/ProductCardSkeleton';

interface ProductListTemSkeletonProps {
  itemsPerPage: number;
}

const ProductListTemSkeleton = ({ itemsPerPage }: ProductListTemSkeletonProps) => (
  <div
    className={clsx(
      'grid',
      'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
      'desktop:gap-x-40 tablet:gap-x-14 gap-x-16',
      'desktop:gap-y-60 tablet:gap-y-50 gap-y-40'
    )}
  >
    {Array.from({ length: itemsPerPage }).map((_, index) => (
      <ProductCardSkeleton key={`skeleton-${String(index)}`} variant="product" />
    ))}
  </div>
);

export default ProductListTemSkeleton;
