import React from 'react';
import { clsx } from '@/utils/clsx';

interface PriceTextProps {
  value: number;
  showUnit?: boolean; // "원" 표시 여부
  className?: string;
}

const PriceText: React.FC<PriceTextProps> = ({ value, showUnit = true, className }) => {
  const isValid = Number.isFinite(value) && value >= 0;
  const formattedValue = isValid ? value.toLocaleString('ko-KR') : '-';
  const displayText = isValid && showUnit ? `${formattedValue}원` : formattedValue;

  return <span className={clsx('font-bold text-gray-950', className)}>{displayText}</span>;
};

export default PriceText;
