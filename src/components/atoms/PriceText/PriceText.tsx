import React from 'react';
import { clsx } from '@/utils/clsx';

interface PriceTextProps {
  value: number;
  className?: string;
}

const PriceText: React.FC<PriceTextProps> = ({ value, className }) => {
  const isValid = Number.isFinite(value) && value >= 0;
  const displayText = isValid ? `${value.toLocaleString('ko-KR')}원` : '-';

  return <span className={clsx('font-bold text-gray-950', className)}>{displayText}</span>;
};

export default PriceText;
