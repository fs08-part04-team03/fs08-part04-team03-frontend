'use client';

import { type Control, type UseFormHandleSubmit } from 'react-hook-form';
import RHFFloatingLabelInput from '@/components/molecules/RHFFloatingLabelInput/RHFFloatingLabelInput';
import Button from '@/components/atoms/Button/Button';
import type { ProfileEditInput } from '@/features/profile/schemas/profileSchema';
import { Toast } from '@/components/molecules/Toast/Toast';

/**
 * 프로필 수정 템플릿 Props
 */
interface ProfileEditTemplateProps {
  control: Control<ProfileEditInput>;
  handleSubmit: UseFormHandleSubmit<ProfileEditInput>;
  isValid: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  serverError: string | null;
  onSubmit: (values: ProfileEditInput) => void | Promise<void>;
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
  /** 관리자 여부 - true일 경우 기업명 필드 표시 */
  isAdmin: boolean;
}

/**
 * 프로필 수정 폼 Props
 */
interface ProfileEditFormProps {
  control: Control<ProfileEditInput>;
  handleSubmit: UseFormHandleSubmit<ProfileEditInput>;
  isValid: boolean;
  onSubmit: (values: ProfileEditInput) => void | Promise<void>;
  className?: string;
  /** 관리자 여부 - true일 경우 기업명 필드 표시 */
  isAdmin: boolean;
}

const ProfileEditForm = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  className,
  isAdmin,
}: ProfileEditFormProps) => (
  <form
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit={handleSubmit(onSubmit)}
    className={className}
    noValidate
  >
    <h1 className="text-24 font-bold text-black-400 tracking--0.6 text-center mb-20">
      내 프로필 변경
    </h1>

    <div className="flex flex-col gap-20">
      {/* 관리자만 기업명 변경 가능 */}
      {isAdmin && (
        <RHFFloatingLabelInput control={control} name="companyName" label="기업명" type="text" />
      )}
      <RHFFloatingLabelInput control={control} name="role" label="권한" type="text" disabled />
      <RHFFloatingLabelInput control={control} name="name" label="이름" type="text" disabled />
      <RHFFloatingLabelInput control={control} name="email" label="이메일" type="email" disabled />
      <RHFFloatingLabelInput
        control={control}
        name="password"
        label="비밀번호를 입력해주세요"
        type="password"
        showPasswordToggle
      />
      <RHFFloatingLabelInput
        control={control}
        name="passwordConfirm"
        label="비밀번호를 한번 더 입력해주세요"
        type="password"
        showPasswordToggle
      />
    </div>

    <Button type="submit" size="lg" className="mt-30" fullWidth inactive={!isValid}>
      변경하기
    </Button>
  </form>
);

const ProfileEditTemplate = ({
  control,
  handleSubmit,
  isValid,
  serverError,
  onSubmit,
  showToast,
  toastMessage,
  setShowToast,
  isAdmin,
}: ProfileEditTemplateProps) => (
  <>
    {/* Mobile Layout */}
    <div className="flex flex-col px-24 py-45 tablet:hidden desktop:hidden">
      {serverError && (
        <div className="mb-20 p-16 bg-red-50 border border-red-200 rounded-default text-red-600 text-14">
          {serverError}
        </div>
      )}
      <ProfileEditForm
        control={control}
        isValid={isValid}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        className="flex flex-col w-full"
        isAdmin={isAdmin}
      />
    </div>

    {/* Tablet & Desktop Layout */}
    <div className="hidden tablet:flex desktop:flex flex-col items-center pt-171 pb-261">
      <div className="w-600 bg-white rounded-default shadow-[0px_0px_40px_0px_rgba(0,0,0,0.1)] px-60 py-40">
        {serverError && (
          <div className="mb-20 p-16 bg-red-50 border border-red-200 rounded-default text-red-600 text-14">
            {serverError}
          </div>
        )}
        <ProfileEditForm
          control={control}
          isValid={isValid}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          className="flex flex-col w-480"
          isAdmin={isAdmin}
        />
      </div>
    </div>

    {/* Toast */}
    {showToast && (
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-toast">
        <Toast variant="custom" message={toastMessage} onClose={() => setShowToast(false)} />
      </div>
    )}
  </>
);

export default ProfileEditTemplate;
