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
  // useToast 훅 사용
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
        inviteToken: token,
      },
      {
        onSuccess: (data) => {
          const { user, accessToken } = data;

          // 이미지 파일이 있으면 회원가입 후 프로필 이미지 업데이트
          if (selectedFile) {
            updateProfileImage(selectedFile, accessToken)
              .then(() => {
                redirectToProducts(user);
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.error('프로필 이미지 업로드 실패:', error);
                redirectToProducts(user);
              });
            return;
          }

          redirectToProducts(user);
        },
      }
    );
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
