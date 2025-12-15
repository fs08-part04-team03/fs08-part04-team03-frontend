'use client';

import React, { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation'; // TODO: 3단계에서 활성화
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import { signupFields } from '@/features/auth/formFields';

interface SignupFormContentProps {
  control: Control<SignupInput>;
  isValid: boolean;
  serverError: string | null;
  onSubmit: (values: SignupInput) => void;
  handleSubmit: ReturnType<typeof useForm<SignupInput>>['handleSubmit'];
  className?: string;
}

const SignupFormContent: React.FC<SignupFormContentProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  className,
}) => {
  // 서버 에러 슬롯: "항상 자리 확보"로 레이아웃 점프 제거
  const serverErrorBoxClassName = useMemo(() => {
    const base = 'rounded-8 px-12 text-14';
    const visible = 'border border-error-200 bg-error-25 text-error-700';
    const hidden = 'border border-transparent bg-transparent text-transparent';
    return `${base} ${serverError ? visible : hidden}`;
  }, [serverError]);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      noValidate
    >
      <header className="mb-4">
        <h1 className="text-20 font-bold text-black-400">회원가입</h1>
      </header>

      {/* 서버 에러 영역: 항상 렌더링해서 점프 방지 */}
      <div className={serverErrorBoxClassName} aria-live="polite">
        {serverError ?? '\u00A0'}
      </div>

      {signupFields.map((field) => (
        <RHFInputField
          key={field.name}
          control={control}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          disabled={field.disabled}
        />
      ))}

      <Button type="submit" variant="primary" className="mt-8" fullWidth inactive={!isValid}>
        회원가입
      </Button>
    </form>
  );
};

export const SignupFormMobile: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      businessNumber: '',
    },
  });

  const onSubmit = (_values: SignupInput) => {
    setServerError(null);

    // 3단계에서 만들 signup API 호출
    // try {
    //   const { accessToken, refreshToken, companyId } = await signup(_values);
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   router.push(`/${companyId}/products`);
    // } catch (error) {
    //   setServerError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    // }
  };

  return (
    <SignupFormContent
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="flex w-327 flex-col tablet:hidden"
    />
  );
};

export const SignupFormDefault: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      businessNumber: '',
    },
  });

  const onSubmit = (_values: SignupInput) => {
    setServerError(null);

    // 3단계에서 만들 signup API 호출
    // try {
    //   const { accessToken, refreshToken, companyId } = await signup(_values);
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   router.push(`/${companyId}/products`);
    // } catch (error) {
    //   setServerError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    // }
  };

  return (
    <SignupFormContent
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="hidden tablet:flex w-480 flex-col"
    />
  );
};

const SignupForm: React.FC = () => (
  <>
    <SignupFormMobile />
    <SignupFormDefault />
  </>
);

export default SignupForm;
