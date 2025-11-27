'use client';

import { useState, useEffect } from 'react';
import { clsx } from '@/utils/clsx';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  className = '',
  'aria-label': ariaLabel = '체크박스',
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  // checked prop 변화 동기화
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const toggle = () => {
    if (disabled) return;
    const newState = !isChecked;
    setIsChecked(newState);
    onChange?.(newState);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      role="checkbox"
      aria-checked={isChecked}
      aria-label={ariaLabel}
      className={clsx(
        'mobile:w-20 mobile:h-20 tablet:w-24 tablet:h-24 flex items-center justify-center rounded-[var(--radius-default)] border transition-colors duration-200 relative',
        isChecked ? 'bg-gray-950 border-gray-950' : 'bg-white border-gray-950',
        !disabled && 'cursor-pointer',
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      <span
        className={clsx(
          'absolute w-16 h-16 flex items-center justify-center',
          'transition-transform duration-200 ease-linear',
          isChecked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        )}
      >
        <img src="/icons/check.svg" alt="check" className="w-full h-full" />
      </span>
    </button>
  );
};

export default Checkbox;
