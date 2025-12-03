// atoms/PriceText/PriceText.tsx
import React from 'react';
import { clsx } from '@/utils/clsx';

interface PriceTextProps {
  value: number;
  className?: string;
}

const PriceText: React.FC<PriceTextProps> = ({ value, className }) => (
  <span className={clsx('font-bold text-gray-950', className)}>
    {value.toLocaleString('ko-KR')}원
  </span>
);

export default PriceText;
