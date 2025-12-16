'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // TODO: API 연동 시 활성화
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import InviteSignupTem from '@/features/auth/template/InviteSignupTem/InviteSignupTem';
import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';

interface InviteSignupProps {
  token: string;
}

const InviteSignup: React.FC<InviteSignupProps> = ({ token }) => {
  const [serverError, setServerError] = useState<string | null>(null);
  // const router = useRouter(); // TODO: API 연동 시 활성화

  // TODO: API 연동 시 token으로 초대 정보 조회
  // const { data: inviteData, isLoading } = useQuery({
  //   queryKey: ['invite', token],
  //   queryFn: () => getInviteInfo(token),
  // });

  // 더미 데이터
  const dummyInviteData = {
    name: '홍길동',
    email: 'hong@example.com',
  };

  const form = useForm<InviteSignupInput>({
    resolver: zodResolver(inviteSignupSchema),
    mode: 'onTouched',
    defaultValues: {
      email: dummyInviteData.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: InviteSignupInput) => {
    setServerError(null);

    // TODO: API 연동 시 실제 API 호출
    // const handleInviteSignup = async () => {
    //   try {
    //     const { accessToken, refreshToken, companyId } = await inviteSignup({
    //       token,
    //       password: values.password,
    //     });
    //     localStorage.setItem('accessToken', accessToken);
    //     localStorage.setItem('refreshToken', refreshToken);
    //     router.push(`/${companyId}/products`);
    //   } catch (error) {
    //     setServerError('회원가입에 실패했습니다. 다시 시도해 주세요.');
    //   }
    // };
    // handleInviteSignup();

    // 더미 성공 처리
    // eslint-disable-next-line no-console
    console.log('회원가입 성공 (더미):', { token, values });
    // eslint-disable-next-line no-console
    console.log('예상 동작: 로그인 페이지로 리다이렉트');
  };

  // TODO: API 연동 시 로딩 상태 처리
  // if (isLoading) {
  //   return <div>로딩 중...</div>;
  // }

  // TODO: API 연동 시 에러 상태 처리
  // if (inviteData?.error) {
  //   return <div>유효하지 않은 초대 링크입니다.</div>;
  // }

  return (
    <InviteSignupTem
      control={form.control}
      isValid={form.formState.isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      handleSubmit={form.handleSubmit}
      name={dummyInviteData.name}
    />
  );
};

export default InviteSignup;
