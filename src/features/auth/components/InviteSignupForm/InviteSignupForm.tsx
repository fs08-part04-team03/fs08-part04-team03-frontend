'use client';

import React, { useMemo, useState } from 'react';
// import { useRouter } from 'next/navigation'; // TODO: 3단계에서 활성화
import { useForm, type Control } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import RHFInputField from '@/components/molecules/RHFInputField/RHFInputField';
import Button from '@/components/atoms/Button/Button';
import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import { inviteSignupFields } from '@/features/auth/formFields';

interface InviteSignupFormContentProps {
  control: Control<InviteSignupInput>;
  isValid: boolean;
  serverError: string | null;
  onSubmit: (values: InviteSignupInput) => void;
  handleSubmit: ReturnType<typeof useForm<InviteSignupInput>>['handleSubmit'];
  className?: string;
  name: string;
}

const InviteSignupFormContent: React.FC<InviteSignupFormContentProps> = ({
  control,
  isValid,
  serverError,
  onSubmit,
  handleSubmit,
  className,
  name,
}) => {
  // 서버 에러 슬롯: “항상 자리 확보”로 레이아웃 점프 제거
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

const useInviteSignupForm = (email: string) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<InviteSignupInput>({
    resolver: zodResolver(inviteSignupSchema),
    mode: 'onTouched',
    defaultValues: {
      email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (_values: InviteSignupInput) => {
    setServerError(null);

    // 3단계에서 만들 inviteSignup API 호출
    // try {
    //   const { accessToken, refreshToken, companyId } = await inviteSignup(_values);
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   router.push(`/${companyId}/products`);
    // } catch (error) {
    //   setServerError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    // }
  };

  return { ...form, serverError, setServerError, onSubmit };
};

export const InviteSignupFormMobile: React.FC<{ name: string; email: string }> = ({
  name,
  email,
}) => {
  const { control, handleSubmit, formState, serverError, onSubmit } = useInviteSignupForm(email);

  return (
    <InviteSignupFormContent
      control={control}
      isValid={formState.isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="flex w-327 flex-col tablet:hidden"
      name={name}
    />
  );
};

export const InviteSignupFormDefault: React.FC<{ name: string; email: string }> = ({
  name,
  email,
}) => {
  const { control, handleSubmit, formState, serverError, onSubmit } = useInviteSignupForm(email);

  return (
    <InviteSignupFormContent
      control={control}
      isValid={formState.isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      className="hidden w-480 flex-col tablet:flex"
      name={name}
    />
  );
};

interface InviteSignupFormProps {
  name: string;
  email: string;
}

const InviteSignupForm: React.FC<InviteSignupFormProps> = ({ name, email }) => (
  <>
    <InviteSignupFormMobile name={name} email={email} />
    <InviteSignupFormDefault name={name} email={email} />
  </>
);

export default InviteSignupForm;
