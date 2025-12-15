'use client';

import React, { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation'; // TODO: 3단계에서 활성화
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import { loginFields } from '@/features/auth/formFields';

interface LoginFormContentProps {
  control: Control<LoginInput>;
  isValid: boolean;
  serverError: string | null;
  onSubmit: (values: LoginInput) => void;
  handleSubmit: ReturnType<typeof useForm<LoginInput>>['handleSubmit'];
  className?: string;
}

const LoginFormContent: React.FC<LoginFormContentProps> = ({
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
        <h1 className="text-20 font-bold text-black-400">로그인</h1>
      </header>

      {/* 서버 에러 영역: 항상 렌더링해서 점프 방지 */}
      <div className={serverErrorBoxClassName} aria-live="polite">
        {serverError ?? '\u00A0'}
      </div>

      {loginFields.map((field) => (
        <RHFInputField
          key={field.name}
          control={control}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          className="w-full"
        />
      ))}

      <Button type="submit" variant="primary" className="mt-8" fullWidth inactive={!isValid}>
        로그인
      </Button>
    </form>
  );
};

export const LoginFormMobile: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (_values: LoginInput) => {
    setServerError(null);

    // 3단계에서 만들 login API 호출
    // try {
    //   const { accessToken, refreshToken, companyId } = await login(_values);
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   router.push(`/${companyId}/products`);
    // } catch (error) {
    //   setServerError('이메일 또는 비밀번호를 다시 확인해 주세요.');
    // }
  };

  return (
    <LoginFormContent
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="flex w-327 flex-col tablet:hidden"
    />
  );
};

export const LoginFormDefault: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (_values: LoginInput) => {
    setServerError(null);

    // 3단계에서 만들 login API 호출
    // try {
    //   const { accessToken, refreshToken, companyId } = await login(_values);
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   router.push(`/${companyId}/products`);
    // } catch (error) {
    //   setServerError('이메일 또는 비밀번호를 다시 확인해 주세요.');
    // }
  };

  return (
    <LoginFormContent
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="hidden tablet:flex w-480 flex-col"
    />
  );
};

const LoginForm: React.FC = () => (
  <>
    <LoginFormMobile />
    <LoginFormDefault />
  </>
);

export default LoginForm;
