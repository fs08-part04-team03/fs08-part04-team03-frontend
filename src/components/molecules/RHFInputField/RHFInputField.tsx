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
}: RHFInputFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <div>
        <InputField
          id={id}
          label={label}
          placeholder={placeholder}
          type={type}
          value={field.value ?? ''}
          onChange={(value) => {
            field.onChange(value);
          }}
          minLength={minLength}
          maxLength={maxLength}
          compareWith={compareWith}
        />
        {fieldState.error && (
          <div className="text-14 text-error-500 font-normal tracking--0.35 mt-4">
            {fieldState.error.message}
          </div>
        )}
      </div>
    )}
  />
);

export default RHFInputField;
