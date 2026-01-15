'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import SignupTem from '@/features/auth/template/SignupTem/SignupTem';
import { useToast } from '@/hooks/useToast';
import { useSignup } from '@/features/auth/queries/auth.queries';
import { useImageUpload } from '@/features/auth/hooks/useImageUpload';
import { useProfileImageUpdate } from '@/features/auth/hooks/useProfileImageUpdate';
import { useAuthRedirect } from '@/features/auth/hooks/useAuthRedirect';

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
  // useToast 훅 사용
  const { showToast, toastMessage, closeToast } = useToast();

  const signupMutation = useSignup();
  const { selectedFile, preview, handleImageChange, handleImageDelete } = useImageUpload();
  const { isUploading, updateProfileImage } = useProfileImageUpdate();
  const { redirectToProducts } = useAuthRedirect();

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

  const onSubmit = (values: SignupInput): void => {
    signupMutation.mutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        companyName: values.companyName,
        businessNumber: values.businessNumber,
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
              .catch(() => {
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
      onImageDelete={handleImageDelete}
      isUploading={isUploading}
      title={title}
      subtitle={subtitle}
      submitButtonText={submitButtonText}
    />
  );
};

export default SignupSection;
