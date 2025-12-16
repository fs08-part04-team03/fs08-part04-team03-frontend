'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoginTem from '@/features/auth/template/LoginTem/LoginTem';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import { login } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';

const Login: React.FC = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginInput) => {
    setServerError(null);

    const handleLogin = async () => {
      try {
        const { user, accessToken } = await login({
          email: values.email,
          password: values.password,
        });

        // 인증 정보 저장
        setAuth({ user, accessToken });

        // 상품 리스트 페이지로 리다이렉트
        router.push(`/${user.companyId}/products`);
      } catch (error) {
        setServerError(
          error instanceof Error ? error.message : '이메일 또는 비밀번호가 올바르지 않습니다.'
        );
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleLogin();
  };

  return (
    <LoginTem
      control={form.control}
      isValid={form.formState.isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={form.handleSubmit}
    />
  );
};

export default Login;
