import { clsx } from '@/utils/clsx';

export interface SkeletonProps {
  className?: string;
}

const SkeletonUI = ({ className }: SkeletonProps) => (
  <div className={clsx('animate-shimmer rounded-md bg-gray-200', className)} />
);

export { SkeletonUI };
