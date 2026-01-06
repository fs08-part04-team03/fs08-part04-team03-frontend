'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileEditSchema, type ProfileEditInput } from '@/features/profile/schemas/profileSchema';
import { useAuthStore } from '@/lib/store/authStore';
import { getCompany } from '@/features/profile/api/company.api';
import { updateAdminProfile, updateUserProfile } from '@/features/profile/api/profile.api';
import { logger } from '@/utils/logger';
import ProfileEditTemplate from '@/features/profile/template/ProfileEditTemplate';
import { useImageUpload } from '@/hooks/useImageUpload';

const getRoleDisplayName = (role?: string) => {
  switch (role) {
    case 'admin':
      return '최고 관리자';
    case 'manager':
      return '관리자';
    case 'user':
      return '직원';
    default:
      return '직원';
  }
};

const ProfileEditSection = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { user, accessToken } = useAuthStore();
  const { preview, uploadedImageKey, isUploading, handleImageChange, resetImage } =
    useImageUpload();

  const form = useForm<ProfileEditInput>({
    resolver: zodResolver(profileEditSchema),
    mode: 'onTouched',
    defaultValues: {
      companyName: '',
      role: getRoleDisplayName(user?.role),
      name: user?.name || '',
      email: user?.email || '',
      password: '',
      passwordConfirm: '',
    },
  });

  // 회사 정보 조회 (폼 초기값 설정)
  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!accessToken) return;

      try {
        const company = await getCompany(accessToken);
        form.setValue('companyName', company.name);
      } catch (error) {
        logger.error('Failed to fetch company information in ProfileEdit', {
          hasError: true,
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        });
        // 실패 시 빈 값으로 설정하여 사용자가 직접 입력하도록 유도
        form.setValue('companyName', '');
      }
    };

    // eslint-disable-next-line no-void
    void fetchCompanyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]); // form.setValue는 안정적인 참조를 가짐

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showToast]);

  const onSubmit = async (values: ProfileEditInput): Promise<void> => {
    setServerError(null);

    try {
      if (!user?.id || !user?.companyId || !accessToken) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      // 사용자 역할에 따라 다른 API 엔드포인트 사용
      const isAdmin = user.role === 'admin';

      if (isAdmin) {
        // ADMIN: 회사명 + 비밀번호 + 프로필 이미지 변경 가능
        // 엔드포인트: PATCH /api/v1/user/admin/profile
        const hasCompanyNameChange = values.companyName && values.companyName.trim() !== '';
        const hasPasswordChange = values.password && values.password.trim() !== '';
        const hasImageChange = uploadedImageKey !== null;

        if (!hasCompanyNameChange && !hasPasswordChange && !hasImageChange) {
          throw new Error('변경할 내용을 입력해주세요.');
        }

        await updateAdminProfile(
          {
            companyName: hasCompanyNameChange ? values.companyName : undefined,
            password: hasPasswordChange ? values.password : undefined,
            image: hasImageChange ? uploadedImageKey : undefined,
          },
          accessToken
        );
      } else {
        // USER, MANAGER: 비밀번호 + 프로필 이미지 변경 가능
        // 엔드포인트: PATCH /api/v1/user/me/profile
        const hasPasswordChange = values.password && values.password.trim() !== '';
        const hasImageChange = uploadedImageKey !== null;

        if (!hasPasswordChange && !hasImageChange) {
          throw new Error('변경할 내용을 입력해주세요.');
        }

        await updateUserProfile(
          {
            password: hasPasswordChange ? values.password : undefined,
            image: hasImageChange ? uploadedImageKey : undefined,
          },
          accessToken
        );
      }

      setToastMessage('프로필이 성공적으로 변경되었습니다.');
      setShowToast(true);

      form.reset({
        ...values,
        password: '',
        passwordConfirm: '',
      });
      resetImage();
    } catch (error) {
      logger.error('Profile update failed', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      });
      const errorMessage = error instanceof Error ? error.message : '프로필 변경에 실패했습니다.';
      setToastMessage(errorMessage);
      setShowToast(true);
      setServerError(errorMessage);
    }
  };

  return (
    <ProfileEditTemplate
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      showToast={showToast}
      toastMessage={toastMessage}
      setShowToast={setShowToast}
      isAdmin={user?.role === 'admin'}
      preview={preview}
      onImageChange={handleImageChange}
      isUploading={isUploading}
    />
  );
};

export default ProfileEditSection;
