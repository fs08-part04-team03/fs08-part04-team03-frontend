'use client';

import { type Control, type UseFormHandleSubmit } from 'react-hook-form';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { inviteSignupFields } from '@/features/auth/formFields';
import type { InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import Logo from '@/components/atoms/Logo/Logo';
import Link from 'next/link';
import { PATHNAME } from '@/constants';
import { Toast } from '@/components/molecules/Toast/Toast';
import Image from 'next/image';
import type { InviteSignupTemGroupedProps } from '@/features/auth/types/auth-form.types';

interface InviteSignupTemLegacyProps {
  control: Control<InviteSignupInput>;
  handleSubmit: UseFormHandleSubmit<InviteSignupInput>;
  isValid: boolean;
  onSubmit: (values: InviteSignupInput) => void | Promise<void>;
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
  name: string;
}

type InviteSignupTemProps = InviteSignupTemLegacyProps | InviteSignupTemGroupedProps;

function isGroupedProps(props: InviteSignupTemProps): props is InviteSignupTemGroupedProps {
  return (
    'formState' in props && 'toastState' in props && 'imageState' in props && 'inviteInfo' in props
  );
}

interface InviteSignupTemContentProps {
  control: Control<InviteSignupInput>;
  handleSubmit: UseFormHandleSubmit<InviteSignupInput>;
  isValid: boolean;
  onSubmit: (values: InviteSignupInput) => void | Promise<void>;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
  name: string;
  className?: string;
  imageInputId: string;
}

const InviteSignupTemContent = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  onImageDelete,
  isUploading,
  name,
  className,
  imageInputId,
}: InviteSignupTemContentProps) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // eslint-disable-next-line no-void
    void handleSubmit(onSubmit)(e);
  };

  return (
    <form onSubmit={handleFormSubmit} className={className} noValidate>
      <header className="mb-4 text-center tablet:text-left">
        <h1 className="text-20 font-bold text-black-400">{name} 님, 만나서 반갑습니다.</h1>
        <p className="mt-4 text-14 text-gray-600">비밀번호를 입력해 회원가입을 완료해주세요</p>
      </header>

      {/* 프로필 이미지 업로드 */}
      <div className="mb-24">
        <div className="block mb-8 text-14 font-medium text-gray-700">프로필 이미지 (선택)</div>
        <div className="flex justify-center">
          <div className="relative">
            <label htmlFor={imageInputId} className="cursor-pointer">
              <div className="w-140 h-140 rounded-8 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors relative">
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
                <Image
                  src="/icons/close-circle.svg"
                  alt="삭제"
                  width={24}
                  height={24}
                  unoptimized
                />
              </button>
            )}
          </div>
        </div>
        {isUploading && (
          <p className="mt-8 text-center text-12 text-gray-600">이미지 업로드 중...</p>
        )}
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

const InviteSignupTem = (props: InviteSignupTemProps) => {
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
    name,
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
        name: props.inviteInfo.name,
      }
    : {
        ...props,
        onCloseToast: () => props.setShowToast(false),
        isUploading: props.isUploading ?? false,
      };
  /* eslint-enable react/destructuring-assignment */

  const contentProps = {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    preview,
    onImageChange,
    onImageDelete,
    isUploading,
    name,
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
        <InviteSignupTemContent
          {...contentProps}
          imageInputId="invite-profile-image-upload-mobile"
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
        <div className="w-600 relative">
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <InviteSignupTemContent
              {...contentProps}
              imageInputId="invite-profile-image-upload-desktop"
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

      {/* Toast */}
      {showToast && (
        <div className="fixed top-60 left-1/2 transform -translate-x-1/2 z-toast">
          <Toast variant="custom" message={toastMessage} onClose={onCloseToast} />
        </div>
      )}
    </>
  );
  /* eslint-enable react/jsx-props-no-spreading */
};

export default InviteSignupTem;
