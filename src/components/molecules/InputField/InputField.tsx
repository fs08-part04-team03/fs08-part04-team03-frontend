'use client';

import { useState, useEffect, useId, ChangeEvent } from 'react';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { clsx } from '@/utils/clsx';
import { formatBusinessNumber } from '@/utils/formatBusinessNumber';
import Image from 'next/image';

export type InputFieldType = 'text' | 'email' | 'password' | 'passwordConfirm' | 'businessNumber';

type Props = {
  id?: string;
  label: string;
  placeholder: string;
  type?: InputFieldType;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  minLength?: number;
  maxLength?: number;
  compareWith?: string;
  disabled?: boolean;
};

const InputField = ({
  id,
  label,
  placeholder,
  type = 'text',
  value = '',
  onChange,
  onBlur,
  minLength = 8,
  maxLength = 30,
  compareWith,
  disabled,
}: Props) => {
  const [internal, setInternal] = useState(value);
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  // React의 useId를 사용하여 고유한 ID 생성 (SSR 안전, 중복 방지)
  // id prop이 제공되면 우선 사용 (RHFInputField에서 form field name 기반 id 전달)
  const generatedId = useId();
  const inputId = id ?? generatedId;

  // value prop 변경 시 internal 동기화
  useEffect(() => {
    setInternal(value);
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;

    if (type === 'businessNumber') {
      v = formatBusinessNumber(v);
    }

    setInternal(v);
    onChange?.(v);
    setTouched(true);
  };

  // Validation (border 색상 변경을 위해만 사용, 에러 메시지는 RHFInputField에서 관리)
  let isValid = true;

  if (type !== 'businessNumber' && internal.length > maxLength) {
    isValid = false;
  } else if (type === 'text' && !internal.trim()) {
    isValid = false;
  } else if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(internal)) {
      isValid = false;
    }
  } else if (type === 'password' && internal.length < minLength) {
    isValid = false;
  } else if (type === 'passwordConfirm' && internal !== compareWith) {
    isValid = false;
  } else if (type === 'businessNumber') {
    const bizRegex = /^\d{3}-\d{2}-\d{5}$/;
    if (!bizRegex.test(internal)) {
      isValid = false;
    }
  }

  // input type 결정
  let inputType: 'text' | 'password' | 'email' = 'text';
  if (type === 'password' || type === 'passwordConfirm') {
    inputType = visible ? 'text' : 'password';
  } else if (type === 'email') {
    inputType = 'email';
  }

  const showToggle = type === 'password' || type === 'passwordConfirm';

  // autoComplete 값 결정
  let autoCompleteValue: string | undefined;
  if (type === 'email') {
    autoCompleteValue = 'email';
  } else if (type === 'password' || type === 'passwordConfirm') {
    autoCompleteValue = 'current-password';
  }

  return (
    <div className="flex flex-col w-full">
      {/* label - htmlFor 연결 */}
      <label htmlFor={inputId} className="text-12 text-gray-600 font-normal tracking--0.3 mb-1">
        {label}
      </label>

      <div className="flex items-center gap-1 h-40 w-full">
        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          value={internal}
          onFocus={() => setTouched(true)}
          onChange={handleChange}
          onBlur={onBlur}
          aria-invalid={!isValid}
          maxLength={type === 'businessNumber' ? 12 : undefined}
          disabled={disabled}
          autoComplete={autoCompleteValue}
          className={clsx(
            'flex-1 bg-transparent border-none outline-none',
            'font-suit text-16 font-normal tracking-tight text-gray-950'
          )}
        />

        {showToggle && (
          <IconButton
            variant="default"
            size="sm"
            onClick={() => setVisible((s) => !s)}
            className="cursor-pointer"
          >
            <Image
              src={visible ? '/icons/eye.svg' : '/icons/eye-off.svg'}
              alt={visible ? '숨기기' : '보기'}
              width={16}
              height={16}
            />
          </IconButton>
        )}
      </div>

      <div
        className={clsx(
          'w-full border-b mb-4',
          touched && !isValid ? 'border-error-500' : 'border-gray-600'
        )}
      />
    </div>
  );
};

export default InputField;
