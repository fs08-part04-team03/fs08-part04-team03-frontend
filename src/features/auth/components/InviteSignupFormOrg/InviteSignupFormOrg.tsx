'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation'; // TODO: 3단계에서 활성화
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';

export const useInviteSignupForm = (email: string, _token: string) => {
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
    //   const { accessToken, refreshToken, companyId } = await inviteSignup({
    //     token: _token,
    //     password: _values.password,
    //   });
    //   localStorage.setItem('accessToken', accessToken);
    //   localStorage.setItem('refreshToken', refreshToken);
    //   router.push(`/${companyId}/products`);
    // } catch (error) {
    //   setServerError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    // }
  };

  return { ...form, serverError, setServerError, onSubmit };
};
