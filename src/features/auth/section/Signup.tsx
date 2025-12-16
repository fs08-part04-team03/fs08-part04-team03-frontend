'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import SignupTem from '@/features/auth/template/SignupTem/SignupTem';
import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import { signup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';

const Signup: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      businessNumber: '',
    },
  });

  const onSubmit = async (values: SignupInput): Promise<void> => {
    setServerError(null);

    try {
      const { user, accessToken } = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        businessNumber: values.businessNumber,
      });

      // 인증 정보 저장
      setAuth({ user, accessToken });

      // 상품 리스트 페이지로 리다이렉트
      router.push(`/${user.companyId}/products`);
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.'
      );
    }
  };

  return (
    <SignupTem
      control={form.control}
      isValid={form.formState.isValid}
      serverError={serverError}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit as (values: SignupInput) => void | Promise<void>}
      handleSubmit={form.handleSubmit}
    />
  );
};

export default Signup;
