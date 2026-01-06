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
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';
import { uploadProfileImage, getImageUrl } from '@/features/products/api/products.api';

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
  const [_uploadedImageKey, setUploadedImageKey] = useState<string | null>(null);
  const [_isUploading, setIsUploading] = useState(false);
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

    setIsUploading(true);

    // 1. 이미지 업로드
    uploadProfileImage(file)
      .then(async (imageKey) => {
        // 2. 업로드 후 GET API로 signed URL 가져오기
        const { url: signedUrl } = await getImageUrl(imageKey);

        // 3. signed URL을 미리보기에 사용
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
        }
        setPreview(signedUrl);
        setUploadedImageKey(imageKey);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : '이미지 업로드에 실패했습니다.';
        triggerToast('error', message);
        setPreview(null);
        setUploadedImageKey(null);
      })
      .finally(() => {
        setIsUploading(false);
      });
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
