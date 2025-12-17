'use client';

import React, { useMemo } from 'react';
import { type Control } from 'react-hook-form';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { loginFields } from '@/features/auth/formFields';
import type { LoginInput } from '@/features/auth/schemas/login.schema';
import Logo from '@/components/atoms/Logo/Logo';
import Link from 'next/link';
import { PATHNAME } from '@/constants';
import { useLoginForm } from '@/features/auth/components/LoginFormOrg/LoginFormOrg';

interface LoginTemProps {
  control: Control<LoginInput>;
  isValid: boolean;
  serverError: string | null;
  onSubmit: (values: LoginInput) => void;
  handleSubmit: (
    onSubmit: (values: LoginInput) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
}

interface LoginTemContentProps extends LoginTemProps {
  className?: string;
}

const LoginTemContent: React.FC<LoginTemContentProps> = ({
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
      <header className="mb-4 text-center tablet:text-left">
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

export const LoginTemMobile: React.FC<LoginTemProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
}) => (
  <div className="flex flex-col items-center justify-center tablet:hidden desktop:hidden">
    <div className="m-38">
      <Logo size="lg" />
    </div>
    <LoginTemContent
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="flex w-327 flex-col tablet:hidden desktop:hidden"
    />
    <p className="mt-24 text-center text-14 text-gray-600">
      계정이 없으신가요?{' '}
      <Link href={PATHNAME.SIGNUP} className="underline font-bold text-gray-950 underline-offset-4">
        회원가입
      </Link>
    </p>
  </div>
);

export const LoginTemDesktop: React.FC<LoginTemProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
}) => (
  <div className="hidden tablet:flex desktop:flex flex-col items-center justify-center">
    <div className="mt-177">
      <Logo size="lg" />
    </div>
    <div className="w-600 relative">
      <div className=" flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative">
        <LoginTemContent
          control={control}
          isValid={isValid}
          serverError={serverError}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          className="flex flex-col w-full tablet:w-480 desktop:w-480"
        />
        <p className="flex justify-center mt-24 text-14 text-gray-600">
          기업 담당자이신가요?{' '}
          <Link
            href={PATHNAME.SIGNUP}
            className="underline font-bold text-gray-950 underline-offset-4"
          >
            가입하기
          </Link>
        </p>
      </div>
    </div>
  </div>
);

const LoginTem: React.FC = () => {
  const { control, handleSubmit, formState, serverError, onSubmit } = useLoginForm();

  return (
    <>
      <LoginTemMobile
        control={control}
        isValid={formState.isValid}
        serverError={serverError}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
      <LoginTemDesktop
        control={control}
        isValid={formState.isValid}
        serverError={serverError}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default LoginTem;
