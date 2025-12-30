'use client';

import { type Control, type FieldValues, type Path, Controller } from 'react-hook-form';
import FloatingLabelInput from '@/components/atoms/FloatingLabelInput/FloatingLabelInput';
import { clsx } from '@/utils/clsx';

interface RHFFloatingLabelInputProps<T extends FieldValues, TName extends Path<T> = Path<T>> {
  control: Control<T>;
  name: TName;
  label: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  showPasswordToggle?: boolean;
  className?: string;
  errorLines?: number;
}

const RHFFloatingLabelInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = 'text',
  disabled,
  showPasswordToggle = false,
  className,
  errorLines = 1,
}: RHFFloatingLabelInputProps<T>) => {
  const errorSlotHeight = errorLines === 1 ? 'h-24' : 'h-48';
  const errorSlotClassName = clsx(
    'flex items-start',
    'text-14 text-error-500 tracking--0.35',
    errorSlotHeight
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={className}>
          <FloatingLabelInput
            label={label}
            type={type}
            value={String(field.value ?? '')}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled}
            showPasswordToggle={showPasswordToggle}
            error={!!fieldState.error}
          />
          <div className={errorSlotClassName} aria-live="polite">
            {fieldState.error?.message ?? '\u00A0'}
          </div>
        </div>
      )}
    />
  );
};

export default RHFFloatingLabelInput;
