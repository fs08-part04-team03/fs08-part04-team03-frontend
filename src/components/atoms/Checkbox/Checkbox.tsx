'use client';

import { useId } from 'react';
import { clsx } from '@/utils/clsx';
import Image from 'next/image';

export interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  'aria-label': string;
}

const Checkbox = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}: CheckboxProps) => {
  const id = useId();

  const toggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        'relative mobile:w-20 mobile:h-20 tablet:w-24 tablet:h-24 flex items-center justify-center rounded-default border transition-colors duration-200',
        checked ? 'bg-gray-950 border-gray-950' : 'bg-white border-gray-950',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={toggle}
        disabled={disabled}
        aria-label={ariaLabel}
        className="sr-only"
      />

      <span
        className={clsx(
          'absolute w-16 h-16 flex items-center justify-center transition-transform duration-200 ease-linear',
          'relative', // 🔥 next/image fill()을 위해 추가됨
          checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        )}
      >
        <Image src="/icons/check.svg" alt="check" fill unoptimized />
      </span>
    </label>
  );
};

export default Checkbox;
