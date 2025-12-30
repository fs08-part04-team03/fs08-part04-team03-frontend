'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import InviteSignupSection from '@/features/auth/section/InviteSignupSection';
import { getInviteInfo } from '@/features/auth/api/auth.api';
import { logger } from '@/utils/logger';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/molecules/Toast/Toast';
import { PATHNAME } from '@/constants';
import { AUTH_ERROR_MESSAGES } from '@/constants/messages';
import { TOAST_AUTO_CLOSE_DURATION } from '@/constants/timing';

interface InviteSignupProps {
  token: string;
}

const InviteSignup = ({ token }: InviteSignupProps) => {
  const router = useRouter();
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

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

  // 에러 상태 처리 - 에러 발생 시 토스트 표시 및 리다이렉트
  useEffect(() => {
    if (error) {
      logger.error('초대 정보 조회 실패:', error);
      logger.error(`에러 메시지: ${AUTH_ERROR_MESSAGES.INVALID_INVITE_LINK}`);
      triggerToast('error', AUTH_ERROR_MESSAGES.INVALID_INVITE_LINK);
      // 토스트 메시지 표시 후 홈으로 리다이렉트
      const timer = setTimeout(() => {
        router.push(PATHNAME.ROOT);
      }, TOAST_AUTO_CLOSE_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [error, triggerToast, router]);

  // inviteData가 없을 때 처리 (에러가 아닌 경우)
  useEffect(() => {
    if (!inviteUrl || isLoading || error) return undefined;
    if (!inviteData) {
      logger.error('초대 정보를 불러올 수 없습니다.');
      triggerToast('error', AUTH_ERROR_MESSAGES.INVALID_INVITE_LINK);
      // 토스트 메시지 표시 후 홈으로 리다이렉트
      const timer = setTimeout(() => {
        router.push(PATHNAME.ROOT);
      }, TOAST_AUTO_CLOSE_DURATION);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [inviteData, inviteUrl, isLoading, error, triggerToast, router]);

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태일 때는 토스트만 표시
  if (error || (!inviteData && inviteUrl)) {
    return showToast ? (
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
        <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
      </div>
    ) : null;
  }

  // 정상 상태 - inviteData가 있을 때만 렌더링
  if (!inviteData) {
    return null;
  }

  return (
    <>
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
      <InviteSignupSection name={inviteData.name} email={inviteData.email} token={token} />
    </>
  );
};

export default InviteSignup;
