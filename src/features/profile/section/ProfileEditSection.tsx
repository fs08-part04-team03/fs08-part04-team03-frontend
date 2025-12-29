'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileEditSchema, type ProfileEditInput } from '@/features/profile/schemas/profileSchema';
import { useAuthStore } from '@/lib/store/authStore';
import { getCompany } from '@/features/profile/api/company.api';
import { updateAdminProfile, updateUserProfile } from '@/features/profile/api/profile.api';
import ProfileEditTemplate from '@/features/profile/template/ProfileEditTemplate';

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
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[ProfileEdit] 회사 정보 조회 실패:', error);
        }
        // 실패 시 기본값 사용
        form.setValue('companyName', 'SNACK');
      }
    };

    // eslint-disable-next-line no-void
    void fetchCompanyData();
  }, [accessToken, form]);

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
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[ProfileEdit] 프로필 수정:', values);
      }

      if (!user?.id || !user?.companyId || !accessToken) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      // 사용자 역할에 따라 다른 API 엔드포인트 사용
      const isAdmin = user.role === 'admin';

      if (isAdmin) {
        // ADMIN: 회사명 + 비밀번호 변경 가능
        // 엔드포인트: PATCH /api/v1/user/admin/profile
        const hasCompanyNameChange = values.companyName && values.companyName.trim() !== '';
        const hasPasswordChange = values.password && values.password.trim() !== '';

        if (!hasCompanyNameChange && !hasPasswordChange) {
          throw new Error('변경할 내용을 입력해주세요.');
        }

        await updateAdminProfile(
          {
            companyName: hasCompanyNameChange ? values.companyName : undefined,
            password: hasPasswordChange ? values.password : undefined,
          },
          accessToken
        );
      } else {
        // USER, MANAGER: 비밀번호만 변경 가능
        // 엔드포인트: PATCH /api/v1/user/me/profile
        const hasPasswordChange = values.password && values.password.trim() !== '';

        if (!hasPasswordChange) {
          throw new Error('변경할 내용을 입력해주세요.');
        }

        await updateUserProfile(
          {
            password: values.password,
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
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[ProfileEdit] 프로필 수정 실패:', error);
      }
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
    />
  );
};

export default ProfileEditSection;
