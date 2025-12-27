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
        // input 값 및 상태 초기화
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
        setToastMessage('이미지 파일만 업로드 가능합니다.');
        setShowToast(true);
        // input 값 및 상태 초기화
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
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[InviteSignupSection] 이미지 업로드 실패:', error);
        }
        setToastMessage('이미지 업로드에 실패했습니다. 다시 시도해 주세요.');
        setShowToast(true);
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
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[InviteSignup] 초대 회원가입 시도 시작');
      }
      const { user, accessToken } = await inviteSignup({
        email: values.email,
        password: values.password,
        inviteToken: token,
      });

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[InviteSignup] 초대 회원가입 API 성공:', { hasAccessToken: !!accessToken });
      }

      setAuth({ user, accessToken });

      // 쿠키에 인증 정보 저장 (middleware에서 사용) - 서버 측에서 안전하게 설정
      // accessToken을 함께 전송하여 서버 측에서 검증 가능하도록 함
      try {
        await setAuthCookies(user.role, user.companyId, accessToken);
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[InviteSignup] 쿠키 저장 완료');
        }
      } catch (cookieError) {
        // 쿠키 설정 실패 시 에러 처리
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[InviteSignup] 쿠키 저장 실패:', cookieError);
        }
        throw new Error('인증 정보 저장에 실패했습니다. 다시 시도해주세요.');
      }

      const redirectPath = `/${user.companyId}/products`;
      router.push(redirectPath);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[InviteSignup] 초대 회원가입 실패:', error);
      }
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setToastMessage(errorMessage);
      setShowToast(true);
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
      setShowToast={setShowToast}
      preview={preview}
      onImageChange={handleImageChange}
      name={name}
    />
  );
};

export default InviteSignupSection;
