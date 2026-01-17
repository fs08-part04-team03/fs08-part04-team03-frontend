/**
 * ProfileEdit 그룹화된 Props 타입
 */

import type { Control, UseFormHandleSubmit } from 'react-hook-form';
import type { ProfileEditInput } from '@/features/profile/schemas/profileSchema';

/**
 * Form 상태
 */
export interface ProfileEditFormState {
  control: Control<ProfileEditInput>;
  handleSubmit: UseFormHandleSubmit<ProfileEditInput>;
  isValid: boolean;
  onSubmit: (values: ProfileEditInput) => void | Promise<void>;
  serverError: string | null;
}

/**
 * Toast 상태
 */
export interface ProfileEditToastState {
  showToast: boolean;
  toastMessage: string;
  onCloseToast: () => void;
}

/**
 * 이미지 상태
 */
export interface ProfileEditImageState {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
  isUploading?: boolean;
}

/**
 * 그룹화된 Props
 */
export interface ProfileEditTemplateGroupedProps {
  formState: ProfileEditFormState;
  toastState: ProfileEditToastState;
  imageState: ProfileEditImageState;
  isAdmin: boolean;
}
