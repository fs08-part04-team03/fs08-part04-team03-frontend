'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';
import { updateUserProfile } from '@/features/profile/api/profile.api';
import {
  PROFILE_IMAGE_UPDATE,
  PROFILE_IMAGE_ERROR_MESSAGES,
} from '@/features/auth/utils/constants';

/**
 * 프로필 이미지 업데이트 훅
 * - 회원가입 후 프로필 이미지 업데이트 로직
 * - 업로드 상태 관리
 * - 에러 처리 및 토스트 메시지
 */
export function useProfileImageUpdate() {
  const [isUploading, setIsUploading] = useState(false);
  const { triggerToast } = useToast();

  const updateProfileImage = async (file: File, accessToken: string) => {
    setIsUploading(true);
    try {
      // 인증 정보가 완전히 반영되도록 짧은 지연 추가
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, PROFILE_IMAGE_UPDATE.DELAY_MS);
      });

      logger.info('[ProfileImageUpdate] 프로필 이미지 업데이트 시작');
      await updateUserProfile(
        {
          imageFile: file,
        },
        accessToken
      );
      logger.info('[ProfileImageUpdate] 프로필 이미지 업데이트 완료');
    } catch (updateError) {
      logger.error('[ProfileImageUpdate] 프로필 이미지 업데이트 실패:', updateError);
      // 프로필 이미지 업데이트 실패해도 회원가입은 성공했으므로 경고만 표시
      const errorMessage =
        updateError instanceof Error
          ? updateError.message
          : '프로필 이미지 업데이트에 실패했습니다.';

      // 403 에러인 경우 특별한 메시지 표시
      if (updateError instanceof Error && errorMessage.includes('403')) {
        triggerToast('custom', PROFILE_IMAGE_ERROR_MESSAGES.UPDATE_FAILED_403);
      } else {
        triggerToast('custom', PROFILE_IMAGE_ERROR_MESSAGES.UPDATE_FAILED);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    updateProfileImage,
  };
}
