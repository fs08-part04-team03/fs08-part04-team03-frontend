'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { IconButton } from '@/components/atoms/IconButton/IconButton';

export type NumberInputVariant = 'default' | 'secondary';

export interface NumberInputProps {
  onQuantityChange?: (option: Option) => void;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  variant?: NumberInputVariant;
  label?: string;
  className?: string;
}

/**
 * NumberInput
 *
 * 수량을 선택할 수 있는 컴포넌트
 * 위/아래 화살표 버튼으로 수량을 조정하거나 직접 입력할 수 있습니다.
 */
export const NumberInput: React.FC<NumberInputProps> = ({
  onQuantityChange,
  value,
  defaultValue,
  min = 1,
  max = 999,
  variant = 'default',
  label,
  className,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const numericValue = Number(inputValue) || min;

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(String(value));
    } else if (defaultValue !== undefined) {
      setInputValue(String(defaultValue));
    } else {
      setInputValue(String(min));
    }
  }, [value, defaultValue, min]);

  const notifyChange = (newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    setInputValue(String(clampedValue));
    onQuantityChange?.({
      key: String(clampedValue),
      label: `${clampedValue}개`,
    });
  };

  const handleDecrease = () => {
    const newValue = Math.max(min, numericValue - 1);
    notifyChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, numericValue + 1);
    notifyChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    if (inputVal === '') {
      setInputValue('');
      return;
    }

    const parsed = Number(inputVal);
    if (Number.isNaN(parsed)) return;

    let next = parsed;
    if (next < min) next = min;
    if (next > max) next = max;

    setInputValue(String(next));
    notifyChange(next);
  };

  const handleInputBlur = () => {
    const numValue = Number(inputValue);
    if (Number.isNaN(numValue) || numValue < min) {
      notifyChange(min);
    } else if (numValue > max) {
      notifyChange(max);
    }
  };

  const isSecondary = variant === 'secondary';
  const borderClass = isSecondary ? '' : 'border border-gray-200';
  const paddingClass = isSecondary ? 'px-4' : 'px-8';
  const sizeClass = isSecondary ? 'w-72 h-40 desktop:w-99 desktop:h-44' : 'w-99 h-44';

  return (
    <div className={clsx('flex items-center gap-16', className)}>
      {label && (
        <span className="text-14 leading-22 tracking--0.35 text-gray-950 whitespace-nowrap shrink-0">
          {label}
        </span>
      )}
      <div
        className={clsx(
          'flex items-center justify-end rounded-default bg-white transition-colors',
          sizeClass,
          borderClass,
          paddingClass,
          'focus-within:bg-gray-50'
        )}
        role="spinbutton"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={numericValue}
      >
        <input
          ref={inputRef}
          type="number"
          min={min}
          max={max}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          inputMode="decimal"
          className={clsx(
            'flex-1 bg-transparent px-20 text-14 outline-none text-right',
            'font-sans font-normal text-16 tracking--0.4 text-gray-950',
            'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
          )}
          aria-label="수량 입력"
        />
        <div className="flex flex-col shrink-0 gap-0">
          <IconButton
            size="sm"
            variant="default"
            disabled={max !== undefined && numericValue >= max}
            onClick={handleIncrease}
            aria-label="값 증가"
            className={clsx('transition-transform active:scale-90 rounded-b-none -mb-1')}
          >
            <Image src="/icons/arrow-up.svg" alt="값 증가" width={10} height={10} />
          </IconButton>
          <IconButton
            size="sm"
            variant="default"
            disabled={min !== undefined && numericValue <= min}
            onClick={handleDecrease}
            aria-label="값 감소"
            className={clsx('transition-transform active:scale-90 rounded-t-none -mt-1')}
          >
            <Image src="/icons/arrow-down.svg" alt="값 감소" width={10} height={10} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
