'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import { signup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import SignupTem from '@/features/auth/template/SignupTem/SignupTem';
import { MAX_IMAGE_FILE_SIZE, FILE_ERROR_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

interface SignupSectionProps {
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
}

/**
 * SignupSection
 * 회원가입 비즈니스 로직을 담당하는 섹션 컴포넌트
 */
const SignupSection = ({ title, subtitle, submitButtonText }: SignupSectionProps) => {
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
        logger.error('[SignupSection] 이미지 업로드 실패:', error);
        triggerToast('custom', '이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      businessNumber: '',
    },
  });

  const onSubmit = async (values: SignupInput): Promise<void> => {
    try {
      logger.info('[Signup] 회원가입 시도 시작');

      const { user, accessToken } = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        companyName: values.companyName,
        businessNumber: values.businessNumber,
      });

      logger.info('[Signup] 회원가입 API 성공:', { hasAccessToken: !!accessToken });

      // 인증 정보 저장 (zustand - 클라이언트 상태 관리)
      setAuth({ user, accessToken });

      logger.info('[Signup] 인증 정보 저장 완료:', {
        hasUserId: !!user.id,
        role: user.role,
        hasCompanyId: !!user.companyId,
      });

      const redirectPath = `/${user.companyId}/products`;
      router.push(redirectPath);
    } catch (error) {
      logger.error('[Signup] 회원가입 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      triggerToast('custom', errorMessage);
    }
  };

  return (
    <SignupTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      onSubmit={onSubmit}
      showToast={showToast}
      toastMessage={toastMessage}
      setShowToast={closeToast}
      preview={preview}
      onImageChange={handleImageChange}
      title={title}
      subtitle={subtitle}
      submitButtonText={submitButtonText}
    />
  );
};

export default SignupSection;
