'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import { inviteSignup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import { setAuthCookies } from '@/utils/cookies';
import InviteSignupTem from '@/features/auth/template/InviteSignupTem/InviteSignupTem';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';
import { updateUserProfile } from '@/features/profile/api/profile.api';

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const previewUrlRef = useRef<string | null>(null);

  const handleImageDelete = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreview(null);
    setSelectedFile(null);
  };
  const router = useRouter();
  const { setAuth } = useAuthStore();

  // useToast 훅 사용
  const { showToast, toastMessage, triggerToast, closeToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      triggerToast('error', '이미지 크기는 5MB 이하여야 합니다.');
      e.target.value = '';
      return;
    }

    // 파일 형식 검증
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      triggerToast('error', '지원되는 형식: JPEG, JPG, PNG, GIF, WEBP');
      e.target.value = '';
      return;
    }

    // 파일 저장
    setSelectedFile(file);

    // 로컬 미리보기 (URL.createObjectURL)
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const previewUrl = URL.createObjectURL(file);
    previewUrlRef.current = previewUrl;
    setPreview(previewUrl);
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

      // 이미지 없이 회원가입 먼저 진행
      const { user, accessToken } = await inviteSignup({
        email: values.email,
        password: values.password,
        inviteToken: token,
      });

      logger.info('[InviteSignup] 초대 회원가입 API 성공:', { hasAccessToken: !!accessToken });

      // 쿠키에 인증 정보 저장 (서버 인증 경로에서 사용) - 서버 측에서 안전하게 설정
      // 쿠키 설정을 먼저 수행하여 실패 시 상태 저장을 방지
      try {
        await setAuthCookies(user.role, user.companyId, accessToken);
        logger.info('[InviteSignup] 쿠키 저장 완료');
      } catch (cookieError) {
        logger.error('[InviteSignup] 쿠키 저장 실패:', cookieError);
        throw new Error('인증 정보 저장에 실패했습니다. 다시 시도해주세요.');
      }

      setAuth({ user, accessToken });

      // 이미지 파일이 있으면 회원가입 후 프로필 이미지 업데이트
      if (selectedFile) {
        setIsUploading(true);
        try {
          // 인증 정보가 완전히 반영되도록 짧은 지연 추가
          await new Promise<void>((resolve) => {
            setTimeout(() => {
              resolve();
            }, 500);
          });

          logger.info('[InviteSignup] 프로필 이미지 업데이트 시작');
          await updateUserProfile(
            {
              imageFile: selectedFile,
            },
            accessToken
          );
          logger.info('[InviteSignup] 프로필 이미지 업데이트 완료');
        } catch (updateError) {
          logger.error('[InviteSignup] 프로필 이미지 업데이트 실패:', updateError);
          // 프로필 이미지 업데이트 실패해도 회원가입은 성공했으므로 경고만 표시
          const errorMessage =
            updateError instanceof Error
              ? updateError.message
              : '프로필 이미지 업데이트에 실패했습니다.';
          // 403 에러인 경우 특별한 메시지 표시
          if (updateError instanceof Error && errorMessage.includes('403')) {
            triggerToast(
              'custom',
              '회원가입은 완료되었습니다. 프로필 이미지는 나중에 프로필 설정에서 업데이트할 수 있습니다.'
            );
          } else {
            triggerToast(
              'custom',
              '회원가입은 완료되었지만 프로필 이미지 업데이트에 실패했습니다. 나중에 프로필 설정에서 업데이트할 수 있습니다.'
            );
          }
        } finally {
          setIsUploading(false);
        }
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
      onImageDelete={handleImageDelete}
      isUploading={isUploading}
      name={name}
    />
  );
};

export default InviteSignupSection;
