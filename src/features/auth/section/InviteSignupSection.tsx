'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import InviteSignupTem from '@/features/auth/template/InviteSignupTem/InviteSignupTem';
import { useToast } from '@/hooks/useToast';
import { useInviteSignup } from '@/features/auth/queries/auth.queries';
import { useImageUpload } from '@/features/auth/hooks/useImageUpload';
import { useProfileImageUpdate } from '@/features/auth/hooks/useProfileImageUpdate';
import { useAuthRedirect } from '@/features/auth/hooks/useAuthRedirect';
import { logger } from '@/utils/logger';
import type {
  AuthFormState,
  AuthToastState,
  AuthImageState,
} from '@/features/auth/types/auth-form.types';

interface InviteSignupSectionProps {
  name: string;
  email: string;
  token: string;
  inviteUrl: string;
}

/**
 * InviteSignupSection
 * 초대 회원가입 비즈니스 로직을 담당하는 섹션 컴포넌트
 */
const InviteSignupSection = ({ name, email, token, inviteUrl }: InviteSignupSectionProps) => {
  const { showToast, toastMessage, closeToast } = useToast();

  const inviteSignupMutation = useInviteSignup();
  const { selectedFile, preview, handleImageChange, handleImageDelete } = useImageUpload();
  const { isUploading, updateProfileImage } = useProfileImageUpdate();
  const { redirectToProducts } = useAuthRedirect();

  const form = useForm<InviteSignupInput>({
    resolver: zodResolver(inviteSignupSchema),
    mode: 'onTouched',
    defaultValues: {
      email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: InviteSignupInput): void => {
    inviteSignupMutation.mutate(
      {
        name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        // 백엔드가 inviteUrl(전체 URL)을 기준으로 검증하는 케이스가 많아
        // 초대 정보 조회에 사용한 동일한 URL을 그대로 전달합니다.
        inviteUrl: inviteUrl || token,
      },
      {
        onSuccess: (data) => {
          const { user, accessToken } = data;

          if (selectedFile) {
            updateProfileImage(selectedFile, accessToken)
              .then(() => {
                redirectToProducts(user);
              })
              .catch((error) => {
                logger.error('프로필 이미지 업로드 실패:', error);
                redirectToProducts(user);
              });
            return;
          }

          redirectToProducts(user);
        },
      }
    );
  };

  // 그룹화된 Props
  const formState: AuthFormState<InviteSignupInput> = {
    control: form.control,
    handleSubmit: form.handleSubmit,
    isValid: form.formState.isValid,
    onSubmit,
  };

  const toastState: AuthToastState = {
    showToast,
    toastMessage,
    onCloseToast: closeToast,
  };

  const imageState: AuthImageState = {
    preview,
    onImageChange: handleImageChange,
    onImageDelete: handleImageDelete,
    isUploading,
  };

  const inviteInfo = { name };

  return (
    <InviteSignupTem
      formState={formState}
      toastState={toastState}
      imageState={imageState}
      inviteInfo={inviteInfo}
    />
  );
};

export default InviteSignupSection;
