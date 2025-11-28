'use client';

import { useId } from 'react';
import { clsx } from '@/utils/clsx';

export interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  'aria-label': string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
}) => {
  const id = useId(); // React가 자동으로 고유 ID 생성

  const toggle = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  return (
    <label
      htmlFor={id}
      className={clsx(
        'relative mobile:w-20 mobile:h-20 tablet:w-24 tablet:h-24 flex items-center justify-center rounded-[var(--radius-default)] border transition-colors duration-200',
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
          checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        )}
      >
        <img src="/icons/check.svg" alt="check" className="w-full h-full" />
      </span>
    </label>
  );
};

export default Checkbox;
