'use client';

import { useState } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import Input from '@/components/atoms/Input/Input';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';

export type RHFInputFieldType = 'text' | 'email' | 'password';

export interface RHFInputFieldProps<T extends FieldValues> {
  /** React Hook Form의 control 객체 */
  control: Control<T>;

  /** 필드 이름 (form의 필드 경로) */
  name: FieldPath<T>;

  /** Input에 전달할 label */
  label: string;

  /** Input에 전달할 placeholder */
  placeholder: string;

  /** Input 타입 */
  type?: RHFInputFieldType;

  /** Input에 전달할 id (선택사항) */
  id?: string;

  /** Input에 전달할 className (선택사항) */
  className?: string;

  /** Input disabled 상태 (선택사항) */
  disabled?: boolean;
}

/**
 * RHFInputField
 *
 * React Hook Form과 Zod를 사용하는 Input 래퍼 컴포넌트
 * Input을 React Hook Form의 Controller로 감싸서 사용
 */
const RHFInputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  id,
  className,
  disabled = false,
}: RHFInputFieldProps<T>) => {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const isPassword = type === 'password';

  let inputType: 'text' | 'email' | 'password' = type;
  if (isPassword) {
    inputType = visible ? 'text' : 'password';
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => (
        <div className={clsx('flex flex-col w-327 tablet:w-480', className)}>
          {/* label */}
          <label htmlFor={inputId} className="text-12 text-gray-600 font-normal tracking--0.3 mb-1">
            {label}
          </label>

          {/* Input with password toggle */}
          <div className="relative flex items-center">
            <Input
              id={inputId}
              ref={field.ref}
              type={inputType}
              placeholder={placeholder}
              value={field.value ?? ''}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
              onBlur={field.onBlur}
              error={!!fieldState.error}
              className="w-full"
              disabled={disabled}
            />

            {/* Password visibility toggle */}
            {isPassword && (
              <div className="absolute right-0">
                <IconButton
                  variant="default"
                  size="sm"
                  onClick={() => setVisible((s) => !s)}
                  className="cursor-pointer"
                  disabled={disabled}
                >
                  <Image
                    src={visible ? '/icons/eye.svg' : '/icons/eye-off.svg'}
                    alt={visible ? '숨기기' : '보기'}
                    width={16}
                    height={16}
                  />
                </IconButton>
              </div>
            )}
          </div>

          {/* Error message */}
          <div className="min-h-20 text-12 text-error-500 font-normal tracking--0.35 mt-4">
            {fieldState.error &&
              (fieldState.isTouched || formState.isSubmitted) &&
              fieldState.error.message}
          </div>
        </div>
      )}
    />
  );
};

export default RHFInputField;
