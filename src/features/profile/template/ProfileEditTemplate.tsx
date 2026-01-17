'use client';

import { useId } from 'react';
import { type Control, type UseFormHandleSubmit } from 'react-hook-form';
import RHFFloatingLabelInput from '@/components/molecules/RHFFloatingLabelInput/RHFFloatingLabelInput';
import Button from '@/components/atoms/Button/Button';
import type { ProfileEditInput } from '@/features/profile/schemas/profileSchema';
import { Toast } from '@/components/molecules/Toast/Toast';
import Image from 'next/image';
import type { ProfileEditTemplateGroupedProps } from '@/features/profile/types/profile-edit.types';

interface ProfileEditTemplateLegacyProps {
  control: Control<ProfileEditInput>;
  handleSubmit: UseFormHandleSubmit<ProfileEditInput>;
  isValid: boolean;
  serverError: string | null;
  onSubmit: (values: ProfileEditInput) => void | Promise<void>;
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
  isAdmin: boolean;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
}

type ProfileEditTemplateProps = ProfileEditTemplateLegacyProps | ProfileEditTemplateGroupedProps;

function isGroupedProps(props: ProfileEditTemplateProps): props is ProfileEditTemplateGroupedProps {
  return 'formState' in props && 'toastState' in props && 'imageState' in props;
}

interface ProfileEditFormProps {
  control: Control<ProfileEditInput>;
  handleSubmit: UseFormHandleSubmit<ProfileEditInput>;
  isValid: boolean;
  onSubmit: (values: ProfileEditInput) => void | Promise<void>;
  className?: string;
  isAdmin: boolean;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
}

const ProfileEditForm = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  className,
  isAdmin,
  preview,
  onImageChange,
  onImageDelete,
  isUploading = false,
}: ProfileEditFormProps) => {
  const imageUploadId = useId();
  const isDefaultUploadIcon = preview === '/icons/upload.svg';
  const hasImage = preview && !isDefaultUploadIcon;

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      noValidate
    >
      <h1 className="text-24 font-bold text-black-400 tracking--0.6 text-center mb-20">
        내 프로필 변경
      </h1>

      {/* 프로필 이미지 업로드 */}
      <div className="mb-24">
        <div className="block mb-8 text-14 font-medium text-gray-700">프로필 이미지 (선택)</div>
        <div className="flex justify-center">
          <div className="relative w-140 h-140 rounded-8 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
            <label
              htmlFor={imageUploadId}
              className={
                isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer w-full h-full'
              }
            >
              {hasImage && preview && (
                <Image
                  src={preview}
                  alt="프로필 미리보기"
                  fill
                  className="object-contain"
                  unoptimized
                  onError={() => {
                    onImageDelete?.();
                  }}
                />
              )}
              {!hasImage && (
                <Image
                  src="/icons/upload.svg"
                  alt="이미지 업로드"
                  width={140}
                  height={140}
                  className="object-contain pointer-events-none"
                  unoptimized
                />
              )}
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-8">
                  <div className="w-24 h-24 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </label>
            <input
              id={imageUploadId}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              disabled={isUploading}
              className="hidden"
            />
            {hasImage && onImageDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onImageDelete();
                }}
                className="absolute top-0 right-0 w-24 h-24 flex items-center justify-center bg-white rounded-full z-50"
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

      <div className="flex flex-col gap-20">
        {isAdmin && (
          <RHFFloatingLabelInput control={control} name="companyName" label="기업명" type="text" />
        )}
        <RHFFloatingLabelInput control={control} name="role" label="권한" type="text" disabled />
        <RHFFloatingLabelInput control={control} name="name" label="이름" type="text" disabled />
        <RHFFloatingLabelInput
          control={control}
          name="email"
          label="이메일"
          type="email"
          disabled
        />
        <RHFFloatingLabelInput
          control={control}
          name="password"
          label="비밀번호를 입력해주세요"
          type="password"
          showPasswordToggle
          autoComplete="new-password"
        />
        <RHFFloatingLabelInput
          control={control}
          name="passwordConfirm"
          label="비밀번호를 한번 더 입력해주세요"
          type="password"
          showPasswordToggle
          autoComplete="new-password"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-30"
        fullWidth
        inactive={!isValid || isUploading}
      >
        변경하기
      </Button>
    </form>
  );
};

const ProfileEditTemplate = (props: ProfileEditTemplateProps) => {
  // Props 정규화
  /* eslint-disable react/destructuring-assignment */
  const {
    control,
    handleSubmit,
    isValid,
    serverError,
    onSubmit,
    showToast,
    toastMessage,
    onCloseToast,
    isAdmin,
    preview,
    onImageChange,
    onImageDelete,
    isUploading,
  } = isGroupedProps(props)
    ? {
        control: props.formState.control,
        handleSubmit: props.formState.handleSubmit,
        isValid: props.formState.isValid,
        serverError: props.formState.serverError,
        onSubmit: props.formState.onSubmit,
        showToast: props.toastState.showToast,
        toastMessage: props.toastState.toastMessage,
        onCloseToast: props.toastState.onCloseToast,
        isAdmin: props.isAdmin,
        preview: props.imageState.preview,
        onImageChange: props.imageState.onImageChange,
        onImageDelete: props.imageState.onImageDelete,
        isUploading: props.imageState.isUploading ?? false,
      }
    : {
        ...props,
        onCloseToast: () => props.setShowToast(false),
        isUploading: props.isUploading ?? false,
      };
  /* eslint-enable react/destructuring-assignment */

  const formProps = {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    isAdmin,
    preview,
    onImageChange,
    onImageDelete,
    isUploading,
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <>
      {/* Mobile Layout */}
      <div className="flex flex-col px-24 py-45 tablet:hidden desktop:hidden">
        {serverError && (
          <div className="mb-20 p-16 bg-red-50 border border-red-200 rounded-default text-red-600 text-14">
            {serverError}
          </div>
        )}
        <ProfileEditForm {...formProps} className="flex flex-col w-full" />
      </div>

      {/* Tablet & Desktop Layout */}
      <div className="hidden tablet:flex desktop:flex flex-col items-center pt-171 pb-261">
        <div className="w-600 bg-white rounded-default shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] px-60 py-40">
          {serverError && (
            <div className="mb-20 p-16 bg-red-50 border border-red-200 rounded-default text-red-600 text-14">
              {serverError}
            </div>
          )}
          <ProfileEditForm {...formProps} className="flex flex-col w-480" />
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

export default ProfileEditTemplate;
