'use client';

import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

import InputField, { type InputFieldType } from '@/components/molecules/InputField/InputField';

export interface RHFInputFieldProps<T extends FieldValues> {
  /** React Hook Form의 control 객체 */
  control: Control<T>;

  /** 필드 이름 (form의 필드 경로) */
  name: FieldPath<T>;

  /** InputField에 전달할 label */
  label: string;

  /** InputField에 전달할 placeholder */
  placeholder: string;

  /** InputField 타입 */
  type?: InputFieldType;

  /** InputField에 전달할 id (선택사항) */
  id?: string;

  /** InputField에 전달할 minLength (선택사항) */
  minLength?: number;

  /** InputField에 전달할 maxLength (선택사항) */
  maxLength?: number;

  /** passwordConfirm 타입일 때 비교할 값 (선택사항) */
  compareWith?: string;

  /** InputField를 비활성화할지 여부 (선택사항) */
  disabled?: boolean;

  /** wrapper className (선택사항) */
  className?: string;

  /**
   * 에러 영역 고정 줄 수 (기본 2줄)
   * - 1: 한 줄 고정 (truncate)
   * - 2: 두 줄 고정 (overflow-hidden)
   */
  errorLines?: 1 | 2;
}

/**
 * RHFInputField
 *
 * React Hook Form과 Zod를 사용하는 InputField 래퍼 컴포넌트
 * InputField를 React Hook Form의 Controller로 감싸서 사용
 */
const RHFInputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  id,
  minLength,
  maxLength,
  compareWith,
  disabled,
  className,
  errorLines = 2,
}: RHFInputFieldProps<T>) => {
  const errorSlotClassName =
    errorLines === 1
      ? 'mt-4 h-32 text-14 leading-16 font-normal tracking--0.35 text-error-500 truncate'
      : 'mt-4 h-32 text-14 leading-16 font-normal tracking--0.35 text-error-500 overflow-hidden';

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={className}>
          <InputField
            id={id}
            label={label}
            placeholder={placeholder}
            type={type}
            value={(field.value ?? '') as string}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            minLength={minLength}
            maxLength={maxLength}
            compareWith={compareWith}
            disabled={disabled}
          />

          {/* 에러 메시지 슬롯: 항상 동일 높이 */}
          <div className={errorSlotClassName} aria-live="polite">
            {fieldState.error?.message ?? '\u00A0'}
          </div>
        </div>
      )}
    />
  );
};

export default RHFInputField;
