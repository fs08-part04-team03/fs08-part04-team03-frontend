'use client';

import React, { useMemo } from 'react';
import { type Control } from 'react-hook-form';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { inviteSignupFields } from '@/features/auth/formFields';
import type { InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import Logo from '@/components/atoms/Logo/Logo';
import Link from 'next/link';
import { PATHNAME } from '@/constants';

interface InviteSignupTemProps {
  control: Control<InviteSignupInput>;
  isValid: boolean;
  serverError: string | null;
  onSubmit: (values: InviteSignupInput) => void;
  handleSubmit: (
    onSubmit: (values: InviteSignupInput) => void
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  name: string;
}

interface InviteSignupTemContentProps extends InviteSignupTemProps {
  className?: string;
}

const InviteSignupTemContent: React.FC<InviteSignupTemContentProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  name,
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
        <h1 className="text-20 font-bold text-black-400">{name} 님, 만나서 반갑습니다.</h1>
        <p className="mt-4 text-14 text-gray-600">비밀번호를 입력해 회원가입을 완료해주세요</p>
      </header>

      {/* 서버 에러 영역: 항상 렌더링해서 점프 방지 */}
      <div className={serverErrorBoxClassName} aria-live="polite">
        {serverError ?? '\u00A0'}
      </div>

      {inviteSignupFields.map((field) => (
        <RHFInputField
          key={field.name}
          control={control}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          className="w-full"
          disabled={field.disabled}
          errorLines={2}
        />
      ))}

      <Button type="submit" variant="primary" className="mt-8" fullWidth inactive={!isValid}>
        회원가입
      </Button>
    </form>
  );
};

export const InviteSignupTemMobile: React.FC<InviteSignupTemProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  name,
}) => (
  <div className="flex flex-col items-center justify-center tablet:hidden desktop:hidden">
    <div className="m-38">
      <Logo size="lg" />
    </div>
    <InviteSignupTemContent
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      name={name}
      className="flex w-327 flex-col tablet:hidden desktop:hidden"
    />
    <p className="mt-24 text-center text-14 text-gray-600">
      이미 계정이 있으신가요?{' '}
      <Link href={PATHNAME.LOGIN} className="underline font-bold text-gray-950 underline-offset-4">
        로그인
      </Link>
    </p>
  </div>
);

export const InviteSignupTemDesktop: React.FC<InviteSignupTemProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  name,
}) => (
  <div className="hidden tablet:flex desktop:flex flex-col items-center justify-center">
    <div className="mt-177">
      <Logo size="lg" />
    </div>
    <div className="w-600 relative">
      <div className=" flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative">
        <InviteSignupTemContent
          control={control}
          isValid={isValid}
          serverError={serverError}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          name={name}
          className="flex flex-col w-full tablet:w-480 desktop:w-480"
        />
        <p className="flex justify-center mt-24 text-14 text-gray-600 ">
          이미 계정이 있으신가요?{' '}
          <Link
            href={PATHNAME.LOGIN}
            className="underline font-bold text-gray-950 underline-offset-4"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  </div>
);

const InviteSignupTem: React.FC<InviteSignupTemProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  name,
}) => (
  <>
    <InviteSignupTemMobile
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      name={name}
    />
    <InviteSignupTemDesktop
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      name={name}
    />
  </>
);

export default InviteSignupTem;
