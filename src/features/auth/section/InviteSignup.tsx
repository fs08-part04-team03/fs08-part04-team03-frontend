'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import InviteSignupSection from '@/features/auth/section/InviteSignupSection';
import { getInviteInfo } from '@/features/auth/api/auth.api';
import { logger } from '@/utils/logger';

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
    if (inviteUrl) {
      logger.info('Invite URL:', inviteUrl);
    }
    if (error) {
      logger.error('API Error:', error);
    }
    if (inviteData) {
      logger.info('Invite Data:', inviteData);
    }
  }, [inviteUrl, error, inviteData]);

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태 처리
  if (error) {
    logger.error('초대 정보 조회 실패:', error);
    logger.error('에러 메시지: 유효하지 않은 초대 링크입니다.');
    return null; // 화면에 아무것도 표시하지 않음
  }

  if (!inviteData) {
    logger.error('초대 정보를 불러올 수 없습니다.');
    return null; // 화면에 아무것도 표시하지 않음
  }

  return <InviteSignupSection name={inviteData.name} email={inviteData.email} token={token} />;
};

export default InviteSignup;
