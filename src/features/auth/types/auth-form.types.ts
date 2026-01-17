/**
 * Auth Form 그룹화된 Props 타입
 */

import type { Control, UseFormHandleSubmit } from 'react-hook-form';
import type { SignupInput, InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import type { LoginInput } from '@/features/auth/schemas/login.schema';
import type { ToastVariant } from '@/components/molecules/Toast/Toast';

/**
 * Form 상태 (공통)
 */
export interface AuthFormState<T extends SignupInput | InviteSignupInput | LoginInput> {
  control: Control<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  isValid: boolean;
  onSubmit: (values: T) => void | Promise<void>;
}

/**
 * Toast 상태 (공통)
 */
export interface AuthToastState {
  showToast: boolean;
  toastMessage: string;
  toastVariant?: ToastVariant;
  onCloseToast: () => void;
}

/**
 * 이미지 업로드 상태 (Signup/InviteSignup용)
 */
export interface AuthImageState {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
}

/**
 * UI 설정 (Signup용)
 */
export interface AuthUIConfig {
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
}

/**
 * SignupTem 그룹화된 Props
 */
export interface SignupTemGroupedProps {
  formState: AuthFormState<SignupInput>;
  toastState: AuthToastState;
  imageState: AuthImageState;
  uiConfig?: AuthUIConfig;
}

/**
 * LoginTem 그룹화된 Props
 */
export interface LoginTemGroupedProps {
  formState: AuthFormState<LoginInput>;
  toastState: AuthToastState;
}

/**
 * InviteSignupTem 그룹화된 Props
 */
export interface InviteSignupTemGroupedProps {
  formState: AuthFormState<InviteSignupInput>;
  toastState: AuthToastState;
  imageState: AuthImageState;
  inviteInfo: {
    name: string;
  };
}
