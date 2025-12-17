'use client';

import React from 'react';
// import { useRouter } from 'next/navigation'; // TODO: API 연동 시 활성화
// import { useQuery } from '@tanstack/react-query'; // TODO: API 연동 시 활성화

import InviteSignupTem from '@/features/auth/template/InviteSignupTem/InviteSignupTem';
// import { getInviteInfo } from '@/features/auth/api/auth.api'; // TODO: API 연동 시 활성화

interface InviteSignupProps {
  token: string;
}

const InviteSignup: React.FC<InviteSignupProps> = ({ token }) => {
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

  // TODO: API 연동 시 로딩 상태 처리
  // if (isLoading) {
  //   return <div>로딩 중...</div>;
  // }

  // TODO: API 연동 시 에러 상태 처리
  // if (inviteData?.error) {
  //   return <div>유효하지 않은 초대 링크입니다.</div>;
  // }

  return (
    <InviteSignupTem name={dummyInviteData.name} email={dummyInviteData.email} token={token} />
  );
};

export default InviteSignup;
