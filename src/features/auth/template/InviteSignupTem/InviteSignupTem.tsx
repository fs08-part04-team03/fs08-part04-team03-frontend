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

interface InviteSignupTemProps {
  control: Control<InviteSignupInput>;
  handleSubmit: UseFormHandleSubmit<InviteSignupInput>;
  isValid: boolean;
  onSubmit: (values: InviteSignupInput) => void | Promise<void>;
  showToast: boolean;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

type InviteSignupTemViewProps = Omit<
  InviteSignupTemProps,
  'showToast' | 'toastMessage' | 'setShowToast'
>;

interface InviteSignupTemContentProps extends InviteSignupTemViewProps {
  className?: string;
}

const InviteSignupTemContent = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  name,
  className,
}: InviteSignupTemContentProps) => (
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

    {/* 프로필 이미지 업로드 */}
    <div className="mb-24">
      <div className="block mb-8 text-14 font-medium text-gray-700">프로필 이미지 (선택)</div>
      <div className="flex justify-center">
        <label htmlFor="invite-profile-image-upload" className="cursor-pointer">
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
            id="invite-profile-image-upload"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
          />
        </label>
      </div>
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

export const InviteSignupTemMobile = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  name,
}: InviteSignupTemViewProps) => (
  <div className="flex flex-col items-center justify-center tablet:hidden desktop:hidden">
    <div className="m-38">
      <Logo size="lg" />
    </div>
    <InviteSignupTemContent
      control={control}
      isValid={isValid}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      preview={preview}
      onImageChange={onImageChange}
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

export const InviteSignupTemDesktop = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  preview,
  onImageChange,
  name,
}: InviteSignupTemViewProps) => (
  <div className="hidden tablet:flex desktop:flex flex-col items-center justify-center">
    <div className="mt-120">
      <Logo size="lg" />
    </div>
    <div className="w-600 relative">
      <div className="flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative">
        <InviteSignupTemContent
          control={control}
          isValid={isValid}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          preview={preview}
          onImageChange={onImageChange}
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

const InviteSignupTem = ({
  control,
  handleSubmit,
  isValid,
  onSubmit,
  showToast,
  toastMessage,
  setShowToast,
  preview,
  onImageChange,
  name,
}: InviteSignupTemProps) => (
  <>
    <InviteSignupTemMobile
      control={control}
      isValid={isValid}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      preview={preview}
      onImageChange={onImageChange}
      name={name}
    />
    <InviteSignupTemDesktop
      control={control}
      isValid={isValid}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      preview={preview}
      onImageChange={onImageChange}
      name={name}
    />
    {/* Toast */}
    {showToast && (
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-toast">
        <Toast variant="custom" message={toastMessage} onClose={() => setShowToast(false)} />
      </div>
    )}
  </>
);

export default InviteSignupTem;
