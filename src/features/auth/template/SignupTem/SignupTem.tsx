'use client';

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
import type { SignupTemGroupedProps } from '@/features/auth/types/auth-form.types';

interface SignupTemLegacyProps {
  control: Control<SignupInput>;
  handleSubmit: UseFormHandleSubmit<SignupInput>;
  isValid: boolean;
  onSubmit: (values: SignupInput) => void | Promise<void>;
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
}

type SignupTemProps = SignupTemLegacyProps | SignupTemGroupedProps;

function isGroupedProps(props: SignupTemProps): props is SignupTemGroupedProps {
  return 'formState' in props && 'toastState' in props && 'imageState' in props;
}

interface SignupTemContentProps {
  control: Control<SignupInput>;
  isValid: boolean;
  onSubmit: (values: SignupInput) => void | Promise<void>;
  handleSubmit: UseFormHandleSubmit<SignupInput>;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
  className?: string;
  imageInputId: string;
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
}

const SignupTemContent = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  onImageDelete,
  isUploading = false,
  className,
  imageInputId,
  title = '기업 담당자 회원가입',
  subtitle = '* 그룹 내 유저는 기업 담당자의 초대 메일을 통해 가입이 가능합니다.',
  submitButtonText = '회원가입',
}: SignupTemContentProps) => (
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

    {/* 프로필 이미지 업로드 */}
    <div className="mb-24">
      <div className="block mb-8 text-14 font-medium text-gray-700">프로필 이미지 (선택)</div>
      <div className="flex justify-center">
        <div className="relative">
          <label htmlFor={imageInputId} className="cursor-pointer">
            <div className="w-140 h-140 rounded-8 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
              {preview && preview.startsWith('blob:') ? (
                <Image
                  src={preview}
                  alt="프로필 미리보기"
                  width={140}
                  height={140}
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <Image
                  src="/icons/upload.svg"
                  alt="이미지 업로드"
                  width={140}
                  height={140}
                  className="object-contain"
                />
              )}
            </div>
            <input
              id={imageInputId}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>
          {preview && preview.startsWith('blob:') && onImageDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onImageDelete();
              }}
              className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center bg-white rounded-full z-50 shadow-sm"
              aria-label="이미지 삭제"
            >
              <Image src="/icons/close-circle.svg" alt="삭제" width={24} height={24} unoptimized />
            </button>
          )}
        </div>
      </div>
      {isUploading && <p className="mt-8 text-center text-12 text-gray-600">이미지 업로드 중...</p>}
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

    <Button
      type="submit"
      variant="primary"
      className="mt-8"
      fullWidth
      inactive={!isValid || isUploading}
      rightIcon={
        isUploading ? (
          <div className="w-16 h-16 border-2 border-gray-50 border-t-transparent rounded-full animate-spin" />
        ) : undefined
      }
    >
      {isUploading ? '이미지 업로드 중...' : submitButtonText}
    </Button>
  </form>
);

const SignupTem = (props: SignupTemProps) => {
  // Props 정규화
  /* eslint-disable react/destructuring-assignment */
  const {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    showToast,
    toastMessage,
    onCloseToast,
    preview,
    onImageChange,
    onImageDelete,
    isUploading,
    title,
    subtitle,
    submitButtonText,
  } = isGroupedProps(props)
    ? {
        control: props.formState.control,
        handleSubmit: props.formState.handleSubmit,
        isValid: props.formState.isValid,
        onSubmit: props.formState.onSubmit,
        showToast: props.toastState.showToast,
        toastMessage: props.toastState.toastMessage,
        onCloseToast: props.toastState.onCloseToast,
        preview: props.imageState.preview,
        onImageChange: props.imageState.onImageChange,
        onImageDelete: props.imageState.onImageDelete,
        isUploading: props.imageState.isUploading,
        title: props.uiConfig?.title,
        subtitle: props.uiConfig?.subtitle,
        submitButtonText: props.uiConfig?.submitButtonText,
      }
    : {
        ...props,
        onCloseToast: () => props.setShowToast(false),
        isUploading: props.isUploading ?? false,
      };
  /* eslint-enable react/destructuring-assignment */

  const contentProps = {
    control,
    isValid,
    onSubmit,
    handleSubmit,
    preview,
    onImageChange,
    onImageDelete,
    isUploading,
    title,
    subtitle,
    submitButtonText,
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col items-center justify-center tablet:hidden desktop:hidden">
        <div className="m-38">
          <Logo size="lg" />
        </div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <SignupTemContent
          {...contentProps}
          imageInputId="signup-profile-image-upload-mobile"
          className="flex w-327 flex-col tablet:hidden desktop:hidden"
        />
        <p className="mt-24 text-center text-14 text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link
            href={PATHNAME.LOGIN}
            className="underline font-bold text-gray-950 underline-offset-4"
          >
            로그인
          </Link>
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden tablet:flex desktop:flex flex-col items-center justify-center">
        <div className="mt-120">
          <Logo size="lg" />
        </div>
        <div className="w-600 mx-auto">
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <SignupTemContent
              {...contentProps}
              imageInputId="signup-profile-image-upload-desktop"
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

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-toast">
          <Toast variant="custom" message={toastMessage} onClose={onCloseToast} />
        </div>
      )}
    </>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

export default SignupTem;
