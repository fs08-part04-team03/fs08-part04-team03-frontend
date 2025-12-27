'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import InviteSignupSection from '@/features/auth/section/InviteSignupSection';
import { getInviteInfo } from '@/features/auth/api/auth.api';

interface InviteSignupProps {
  token: string;
}

const InviteSignup: React.FC<InviteSignupProps> = ({ token }) => {
  // 클라이언트 사이드에서만 URL 가져오기
  const [inviteUrl, setInviteUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInviteUrl(window.location.href);
    }
  }, []);

  const {
    data: inviteData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['invite', inviteUrl],
    queryFn: () => getInviteInfo(inviteUrl),
    enabled: !!inviteUrl, // inviteUrl이 있을 때만 실행
    retry: false, // 실패 시 재시도 안 함
  });

  // 디버깅용 로그 (개발 환경에서만)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (inviteUrl) {
        // eslint-disable-next-line no-console
        console.log('Invite URL:', inviteUrl);
      }
      if (error) {
        // eslint-disable-next-line no-console
        console.error('API Error:', error);
      }
      if (inviteData) {
        // eslint-disable-next-line no-console
        console.log('Invite Data:', inviteData);
      }
    }
  }, [inviteUrl, error, inviteData]);

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태 처리
  if (error) {
    // 개발 환경에서는 콘솔에만 표시
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('초대 정보 조회 실패:', error);
      // eslint-disable-next-line no-console
      console.error('에러 메시지: 유효하지 않은 초대 링크입니다.');
    }
    return null; // 화면에 아무것도 표시하지 않음
  }

  if (!inviteData) {
    // 개발 환경에서는 콘솔에만 표시
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('초대 정보를 불러올 수 없습니다.');
    }
    return null; // 화면에 아무것도 표시하지 않음
  }

  return <InviteSignupSection name={inviteData.name} email={inviteData.email} token={token} />;
};

export default InviteSignup;
