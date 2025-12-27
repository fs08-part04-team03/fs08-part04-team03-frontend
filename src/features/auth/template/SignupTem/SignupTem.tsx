'use client';

import React, { useMemo } from 'react';
import { type Control, type UseFormHandleSubmit } from 'react-hook-form';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { signupFields } from '@/features/auth/formFields';
import type { SignupInput } from '@/features/auth/schemas/signup.schema';
import Logo from '@/components/atoms/Logo/Logo';
import Link from 'next/link';
import { PATHNAME } from '@/constants';
import { Toast } from '@/components/molecules/Toast/Toast';
import Image from 'next/image';

interface SignupTemProps {
  control: Control<SignupInput>;
  handleSubmit: UseFormHandleSubmit<SignupInput>;
  isValid: boolean;
  serverError: string | null;
  onSubmit: (values: SignupInput) => void | Promise<void>;
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
}

interface SignupTemViewProps extends Omit<
  SignupTemProps,
  'showToast' | 'toastMessage' | 'setShowToast'
> {
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
}

interface SignupTemContentProps extends SignupTemViewProps {
  className?: string;
}

const SignupTemContent: React.FC<SignupTemContentProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  className,
  title = '기업 담당자 회원가입',
  subtitle = '* 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이 가능합니다.',
  submitButtonText = '회원가입',
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
      onSubmit={(e) => {
        e.preventDefault();
        // eslint-disable-next-line no-void
        void handleSubmit(onSubmit)(e);
      }}
      className={className}
      noValidate
    >
      <header className="mb-4 text-center tablet:text-left">
        <h1 className="text-18 tablet:text-24 font-bold text-black-400">{title}</h1>
        {subtitle && <p className="mt-4 text-14 tablet:text-16 text-gray-600">{subtitle}</p>}
      </header>

      {/* 서버 에러 영역: 항상 렌더링해서 점프 방지 */}
      <div className={serverErrorBoxClassName} aria-live="polite">
        {serverError ?? '\u00A0'}
      </div>

      {/* 프로필 이미지 업로드 */}
      <div className="mb-24">
        <div className="block mb-8 text-14 font-medium text-gray-700">프로필 이미지 (선택)</div>
        <div className="flex justify-center">
          <label htmlFor="profile-image-upload" className="cursor-pointer">
            <div className="w-140 h-140 rounded-8 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
              {preview ? (
                <Image
                  src={preview}
                  alt="프로필 미리보기"
                  width={140}
                  height={140}
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/icons/photo-icon.svg"
                  alt="이미지 업로드"
                  width={48}
                  height={48}
                  className="opacity-40"
                />
              )}
            </div>
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {signupFields.map((field) => (
        <RHFInputField
          key={field.name}
          control={control}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          className="w-full"
          disabled={field.disabled}
          formatAsBusinessNumber={field.name === 'businessNumber'}
        />
      ))}

      <Button type="submit" variant="primary" className="mt-8" fullWidth inactive={!isValid}>
        {submitButtonText}
      </Button>
    </form>
  );
};

export const SignupTemMobile: React.FC<SignupTemViewProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  title,
  subtitle,
  submitButtonText,
}) => (
  <div className="flex flex-col items-center justify-center tablet:hidden desktop:hidden">
    <div className="m-38">
      <Logo size="lg" />
    </div>
    <SignupTemContent
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      preview={preview}
      onImageChange={onImageChange}
      title={title}
      subtitle={subtitle}
      submitButtonText={submitButtonText}
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

export const SignupTemDesktop: React.FC<SignupTemViewProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  title,
  subtitle,
  submitButtonText,
}) => (
  <div className="hidden tablet:flex desktop:flex flex-col items-center justify-center">
    <div className="mt-120">
      <Logo size="lg" />
    </div>
    <div className="w-600 mx-auto">
      <div className=" flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative">
        <SignupTemContent
          control={control}
          isValid={isValid}
          serverError={serverError}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          preview={preview}
          onImageChange={onImageChange}
          title={title}
          subtitle={subtitle}
          submitButtonText={submitButtonText}
          className="flex flex-col w-full tablet:w-480 desktop:w-480"
        />
        <p className="flex justify-center mt-24 text-14 text-gray-600">
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

const SignupTem: React.FC<SignupTemProps> = ({
  control,
  handleSubmit,
  isValid,
  serverError,
  onSubmit,
  showToast,
  toastMessage,
  setShowToast,
  preview,
  onImageChange,
  title,
  subtitle,
  submitButtonText,
}) => (
  <>
    <SignupTemMobile
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      preview={preview}
      onImageChange={onImageChange}
      title={title}
      subtitle={subtitle}
      submitButtonText={submitButtonText}
    />
    <SignupTemDesktop
      control={control}
      isValid={isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      preview={preview}
      onImageChange={onImageChange}
      title={title}
      subtitle={subtitle}
      submitButtonText={submitButtonText}
    />
    {/* Toast */}
    {showToast && (
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-toast">
        <Toast variant="custom" message={toastMessage} onClose={() => setShowToast(false)} />
      </div>
    )}
  </>
);

export default SignupTem;
