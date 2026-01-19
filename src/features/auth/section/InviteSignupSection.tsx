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
  inviteUrl: string;
}

/**
 * InviteSignupSection
 * 초대 회원가입 비즈니스 로직을 담당하는 섹션 컴포넌트
 */
const InviteSignupSection = ({ name, email, inviteUrl }: InviteSignupSectionProps) => {
  // inviteUrl이 없으면 에러 - 백엔드는 전체 URL 형식을 기대함
  if (!inviteUrl) {
    throw new Error('초대 URL이 필요합니다. 올바른 초대 링크를 통해 접속해주세요.');
  }
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
        email: values.email,
        password: values.password,
        inviteUrl,
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
