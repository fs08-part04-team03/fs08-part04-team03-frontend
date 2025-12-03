import { useState, useEffect, ChangeEvent } from 'react';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { clsx } from '@/utils/clsx';
import Image from 'next/image';

export type InputFieldType = 'text' | 'email' | 'password' | 'passwordConfirm' | 'businessNumber';

type Props = {
  id?: string;
  label: string;
  placeholder: string;
  type?: InputFieldType;
  value?: string;
  onChange?: (value: string) => void;
  minLength?: number;
  maxLength?: number;
  compareWith?: string;
};

const InputField = ({
  id,
  label,
  placeholder,
  type = 'text',
  value = '',
  onChange,
  minLength = 8,
  maxLength = 30,
  compareWith,
}: Props) => {
  const [internal, setInternal] = useState(value);
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);

  // value prop 변경 시 internal 동기화
  useEffect(() => {
    setInternal(value);
  }, [value]);

  // input과 label 연결을 위한 id
  const inputId = id ?? `input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const formatBusinessNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 9);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;

    if (type === 'businessNumber') {
      v = formatBusinessNumber(v);
    }

    setInternal(v);
    onChange?.(v);
    setTouched(true);
  };

  // --------------------
  // Validation
  // --------------------
  let isValid = true;
  let errorMessage = '';

  if (type !== 'businessNumber' && internal.length > maxLength) {
    isValid = false;
    errorMessage = `${label}은(는) 최대 ${maxLength}자까지 가능합니다.`;
  } else if (type === 'text' && !internal.trim()) {
    isValid = false;
    errorMessage = `${label}을 입력해주세요.`;
  } else if (type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(internal)) {
      isValid = false;
      errorMessage = '유효한 이메일이 아닙니다.';
    }
  } else if (type === 'password' && internal.length < minLength) {
    isValid = false;
    errorMessage = `비밀번호는 최소 ${minLength}자 이상이어야 합니다.`;
  } else if (type === 'passwordConfirm' && internal !== compareWith) {
    isValid = false;
    errorMessage = '비밀번호가 일치하지 않습니다.';
  } else if (type === 'businessNumber') {
    const bizRegex = /^\d{3}-\d{3}-\d{3}$/;
    if (!bizRegex.test(internal)) {
      isValid = false;
      errorMessage = '사업자 번호는 123-456-789 형식입니다.';
    }
  }

  // --------------------
  // input type 결정
  // --------------------
  let inputType: 'text' | 'password' | 'email' = 'text';
  if (type === 'password' || type === 'passwordConfirm') {
    inputType = visible ? 'text' : 'password';
  } else if (type === 'email') {
    inputType = 'email';
  }

  const showToggle = type === 'password' || type === 'passwordConfirm';

  return (
    <div className={clsx('flex flex-col w-327 md:w-480')}>
      {/* label - htmlFor 연결 */}
      <label htmlFor={inputId} className="text-12 text-gray-600 font-normal tracking--0.3 mb-1">
        {label}
      </label>

      <div className={clsx('flex items-center gap-1 h-40 w-319 md:w-472')}>
        <input
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          value={internal}
          onFocus={() => setTouched(true)}
          onChange={handleChange}
          aria-invalid={!isValid}
          maxLength={type === 'businessNumber' ? 12 : undefined}
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

      {touched && !isValid && (
        <div className="text-14 text-error-500 font-normal tracking--0.35">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
