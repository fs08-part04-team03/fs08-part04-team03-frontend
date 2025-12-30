'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import { inviteSignup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import { setAuthCookies } from '@/utils/cookies';
import InviteSignupTem from '@/features/auth/template/InviteSignupTem/InviteSignupTem';
import { MAX_IMAGE_FILE_SIZE, FILE_ERROR_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

interface InviteSignupSectionProps {
  name: string;
  email: string;
  token: string;
}

/**
 * InviteSignupSection
 * 초대 회원가입 비즈니스 로직을 담당하는 섹션 컴포넌트
 */
const InviteSignupSection = ({ name, email, token }: InviteSignupSectionProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [_profileImage, setProfileImage] = useState<File | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  // useToast 훅 사용
  const { showToast, toastMessage, triggerToast, closeToast } = useToast();

  // 컴포넌트 언마운트 시 preview URL 정리
  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    },
    []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 제한
      if (file.size > MAX_IMAGE_FILE_SIZE) {
        triggerToast('custom', FILE_ERROR_MESSAGES.SIZE_EXCEEDED);
        e.target.value = '';
        setPreview(null);
        setProfileImage(null);
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
        return;
      }

      // 이미지 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        triggerToast('custom', FILE_ERROR_MESSAGES.INVALID_TYPE);
        e.target.value = '';
        setPreview(null);
        setProfileImage(null);
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
        return;
      }

      try {
        // 이전 preview URL 정리
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
        }

        // 새 preview URL 생성
        const newPreviewUrl = URL.createObjectURL(file);
        previewUrlRef.current = newPreviewUrl;
        setPreview(newPreviewUrl);
        setProfileImage(file);
      } catch (error) {
        logger.error('[InviteSignupSection] 이미지 업로드 실패:', error);
        triggerToast('custom', '이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const form = useForm<InviteSignupInput>({
    resolver: zodResolver(inviteSignupSchema),
    mode: 'onTouched',
    defaultValues: {
      email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: InviteSignupInput): Promise<void> => {
    try {
      logger.info('[InviteSignup] 초대 회원가입 시도 시작');

      const { user, accessToken } = await inviteSignup({
        email: values.email,
        password: values.password,
        inviteToken: token,
      });

      logger.info('[InviteSignup] 초대 회원가입 API 성공:', { hasAccessToken: !!accessToken });

      setAuth({ user, accessToken });

      // 쿠키에 인증 정보 저장 (middleware에서 사용) - 서버 측에서 안전하게 설정
      try {
        await setAuthCookies(user.role, user.companyId, accessToken);
        logger.info('[InviteSignup] 쿠키 저장 완료');
      } catch (cookieError) {
        logger.error('[InviteSignup] 쿠키 저장 실패:', cookieError);
        throw new Error('인증 정보 저장에 실패했습니다. 다시 시도해주세요.');
      }

      const redirectPath = `/${user.companyId}/products`;
      router.push(redirectPath);
    } catch (error) {
      logger.error('[InviteSignup] 초대 회원가입 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      triggerToast('custom', errorMessage);
    }
  };

  return (
    <InviteSignupTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      onSubmit={onSubmit}
      showToast={showToast}
      toastMessage={toastMessage}
      setShowToast={closeToast}
      preview={preview}
      onImageChange={handleImageChange}
      name={name}
    />
  );
};

export default InviteSignupSection;
