'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import { signup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import { setAuthCookies } from '@/utils/cookies';
import SignupTem from '@/features/auth/template/SignupTem/SignupTem';

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [_profileImage, setProfileImage] = useState<File | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const router = useRouter();
  const { setAuth } = useAuthStore();

  // Toast 자동 닫기 (3초 후)
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showToast]);

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
      // 파일 크기 제한: 5MB (5 * 1024 * 1024 bytes)
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        setToastMessage('이미지 파일 크기는 5MB 이하여야 합니다.');
        setShowToast(true);
        // input 값 초기화
        e.target.value = '';
        return;
      }

      // 이미지 파일 타입 검증
      if (!file.type.startsWith('image/')) {
        setToastMessage('이미지 파일만 업로드 가능합니다.');
        setShowToast(true);
        e.target.value = '';
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
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[SignupSection] 이미지 업로드 실패:', error);
        }
        setToastMessage('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
        setShowToast(true);
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
      // eslint-disable-next-line no-console
      console.log('[Signup] 회원가입 시도 시작:', { email: values.email, name: values.name });
      const { user, accessToken } = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        businessNumber: values.businessNumber,
      });

      // eslint-disable-next-line no-console
      console.log('[Signup] 회원가입 API 성공:', { user, hasAccessToken: !!accessToken });

      setAuth({ user, accessToken });
      // eslint-disable-next-line no-console
      console.log('[Signup] 인증 정보 저장 완료');

      // 쿠키에 인증 정보 저장 (middleware에서 사용) - 서버 측에서 안전하게 설정
      // accessToken을 함께 전송하여 서버 측에서 검증 가능하도록 함
      await setAuthCookies(user.role, user.companyId, accessToken);
      // eslint-disable-next-line no-console
      console.log('[Signup] 쿠키 저장 완료:', {
        role: user.role,
        companyId: user.companyId,
      });

      const redirectPath = `/${user.companyId}/products`;
      // eslint-disable-next-line no-console
      console.log('[Signup] 리다이렉트 시도:', redirectPath);
      router.push(redirectPath);
      // eslint-disable-next-line no-console
      console.log('[Signup] router.push 호출 완료');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Signup] 회원가입 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setToastMessage(errorMessage);
      setShowToast(true);
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
      setShowToast={setShowToast}
      preview={preview}
      onImageChange={handleImageChange}
      title={title}
      subtitle={subtitle}
      submitButtonText={submitButtonText}
    />
  );
};

export default SignupSection;
