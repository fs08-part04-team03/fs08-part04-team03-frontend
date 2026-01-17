'use client';

import { type Control, type UseFormHandleSubmit } from 'react-hook-form';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { loginFields } from '@/features/auth/formFields';
import type { LoginInput } from '@/features/auth/schemas/login.schema';
import Logo from '@/components/atoms/Logo/Logo';
import Link from 'next/link';
import { PATHNAME } from '@/constants';
import { Toast, type ToastVariant } from '@/components/molecules/Toast/Toast';
import type { LoginTemGroupedProps } from '@/features/auth/types/auth-form.types';

interface LoginTemLegacyProps {
  control: Control<LoginInput>;
  handleSubmit: UseFormHandleSubmit<LoginInput>;
  isValid: boolean;
  onSubmit: (values: LoginInput) => void | Promise<void>;
  showToast: boolean;
  toastVariant: ToastVariant;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
}

type LoginTemProps = LoginTemLegacyProps | LoginTemGroupedProps;

function isGroupedProps(props: LoginTemProps): props is LoginTemGroupedProps {
  return 'formState' in props && 'toastState' in props;
}

interface LoginTemContentProps {
  control: Control<LoginInput>;
  handleSubmit: UseFormHandleSubmit<LoginInput>;
  isValid: boolean;
  onSubmit: (values: LoginInput) => void | Promise<void>;
  className?: string;
}

const LoginTemContent = ({
  control,
  isValid,
  onSubmit,
  handleSubmit,
  className,
}: LoginTemContentProps) => (
  <form
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit={handleSubmit(onSubmit)}
    className={className}
    noValidate
  >
    <header className="mb-4 text-center tablet:text-left">
      <h1 className="text-20 font-bold text-black-400">로그인</h1>
    </header>

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

    <Button
      type="submit"
      variant="primary"
      size="md"
      className="mt-8"
      fullWidth
      inactive={!isValid}
    >
      로그인
    </Button>
  </form>
);

const LoginTem = (props: LoginTemProps) => {
  // Props 정규화
  /* eslint-disable react/destructuring-assignment, @typescript-eslint/no-unsafe-assignment */
  const {
    control,
    handleSubmit,
    isValid,
    onSubmit,
    showToast,
    toastVariant,
    toastMessage,
    onCloseToast,
  } = isGroupedProps(props)
    ? {
        control: props.formState.control,
        handleSubmit: props.formState.handleSubmit,
        isValid: props.formState.isValid,
        onSubmit: props.formState.onSubmit,
        showToast: props.toastState.showToast,
        toastVariant: props.toastState.toastVariant ?? 'custom',
        toastMessage: props.toastState.toastMessage,
        onCloseToast: props.toastState.onCloseToast,
      }
    : {
        ...props,
        onCloseToast: () => props.setShowToast(false),
      };
  /* eslint-enable react/destructuring-assignment, @typescript-eslint/no-unsafe-assignment */

  const contentProps = { control, handleSubmit, isValid, onSubmit };

  /* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-unsafe-assignment */
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col items-center justify-center tablet:hidden desktop:hidden">
        <div className="m-38">
          <Logo size="lg" />
        </div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <LoginTemContent
          {...contentProps}
          className="flex w-327 flex-col tablet:hidden desktop:hidden"
        />
        <p className="mt-24 text-center text-14 text-gray-600">
          계정이 없으신가요?{' '}
          <Link
            href={PATHNAME.SIGNUP}
            className="underline font-bold text-gray-950 underline-offset-4"
          >
            회원가입
          </Link>
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden tablet:flex desktop:flex flex-col items-center justify-center">
        <div className="mt-177">
          <Logo size="lg" />
        </div>
        <div className="w-600 relative">
          <div className="flex flex-col items-center justify-center py-40 bg-white rounded-16 shadow-2xl relative">
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <LoginTemContent
              {...contentProps}
              className="flex flex-col w-full tablet:w-480 desktop:w-480"
            />
            <p className="flex justify-center mt-24 text-14 text-gray-600 gap-5">
              기업 담당자이신가요?
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

      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-toast">
          <Toast variant={toastVariant} message={toastMessage} onClose={onCloseToast} />
        </div>
      )}
    </>
  );
  /* eslint-enable react/jsx-props-no-spreading, @typescript-eslint/no-unsafe-assignment */
};

export default LoginTem;
