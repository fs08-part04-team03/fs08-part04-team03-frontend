'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import InviteSignupSection from '@/features/auth/section/InviteSignupSection';
import { logger } from '@/utils/logger';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/molecules/Toast/Toast';
import { PATHNAME } from '@/constants';
import { AUTH_ERROR_MESSAGES } from '@/constants/messages';
import { TOAST_AUTO_CLOSE_DURATION } from '@/constants/timing';
import { useInviteInfo } from '@/features/auth/queries/auth.queries';

interface InviteSignupProps {
  token: string;
}

const InviteSignup = ({ token: _token }: InviteSignupProps) => {
  const router = useRouter();
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // 클라이언트 사이드에서만 URL 가져오기
  const [inviteUrl, setInviteUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setInviteUrl(window.location.href);
    }
  }, []);

  const { data: inviteData, isLoading, error } = useInviteInfo(inviteUrl, { enabled: !!inviteUrl });

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

  // 에러 상태 통합 처리
  useEffect(() => {
    if (!inviteUrl || isLoading) return undefined;

    const hasError = error || !inviteData;
    if (!hasError) return undefined;

    if (error) {
      logger.error('초대 정보 조회 실패:', error);
    } else {
      logger.error('초대 정보를 불러올 수 없습니다.');
    }

    triggerToast('error', AUTH_ERROR_MESSAGES.INVALID_INVITE_LINK);
    const timer = setTimeout(() => {
      router.push(PATHNAME.ROOT);
    }, TOAST_AUTO_CLOSE_DURATION);

    return () => {
      clearTimeout(timer);
    };
  }, [inviteUrl, isLoading, error, inviteData, triggerToast, router]);

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 에러 상태일 때는 토스트만 표시
  if (error || (!inviteData && inviteUrl)) {
    return (
      <div className="fixed top-60 left-1/2 transform -translate-x-1/2 z-50">
        {showToast && <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />}
      </div>
    );
  }

  // 정상 상태 - inviteData가 있을 때만 렌더링
  if (!inviteData) {
    return null;
  }

  return (
    <>
      {showToast && (
        <div className="fixed top-60 left-1/2 transform -translate-x-1/2 z-50">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
      <InviteSignupSection name={inviteData.name} email={inviteData.email} inviteUrl={inviteUrl} />
    </>
  );
};

export default InviteSignup;
