'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileEditSchema, type ProfileEditInput } from '@/features/profile/schemas/profileSchema';
import { useAuthStore } from '@/lib/store/authStore';
import { getCompany } from '@/features/profile/api/company.api';
import {
  updateAdminProfile,
  updateUserProfile,
  getMyProfile,
} from '@/features/profile/api/profile.api';
import { logger } from '@/utils/logger';
import ProfileEditTemplate from '@/features/profile/template/ProfileEditTemplate';
import { useToast } from '@/hooks/useToast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { STALE_TIME } from '@/constants/staleTime';

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
  const { triggerToast } = useToast();
  const queryClient = useQueryClient();

  // 이미지 미리보기 및 파일 관리
  const [preview, setPreview] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

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

  // 사용자 프로필 정보 조회 (profileImage 포함)
  const { data: myProfile } = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile(),
    enabled: !!user && !!accessToken,
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });

  // 초기 이미지 로드 (myProfile.profileImage가 있으면)
  useEffect(() => {
    if (myProfile?.profileImage) {
      const { profileImage } = myProfile;

      // 이미 URL 형식이면 그대로 사용
      if (profileImage.startsWith('http://') || profileImage.startsWith('https://')) {
        setPreview(profileImage);
      } else {
        // S3 키 형식이면 프록시 API URL로 변환
        // users/ 접두사가 없으면 추가 (프록시 API가 자동으로 products/를 추가하는 것을 방지)
        const imageKey = profileImage.startsWith('users/') ? profileImage : `users/${profileImage}`;
        const imageUrl = `/api/product/image?key=${encodeURIComponent(imageKey)}`;
        setPreview(imageUrl);
      }
    } else {
      setPreview('/icons/upload.svg');
    }
  }, [myProfile?.profileImage, myProfile]);

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

  // 선택된 이미지 파일 상태
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증 (5MB)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      triggerToast('error', '이미지 크기는 5MB 이하여야 합니다.');
      e.target.value = '';
      return;
    }

    // 파일 형식 검증
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      triggerToast('error', '지원되는 형식: JPEG, JPG, PNG, GIF, WEBP');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);

    // 로컬 파일을 미리보기용 URL로 변환
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const previewUrl = URL.createObjectURL(file);
    previewUrlRef.current = previewUrl;
    setPreview(previewUrl);
  };

  // 컴포넌트 언마운트 시 URL 정리
  useEffect(
    () => () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    },
    []
  );

  const onSubmit = async (values: ProfileEditInput): Promise<void> => {
    setServerError(null);

    try {
      if (!user?.id || !user?.companyId || !accessToken) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
      }

      // 사용자 역할에 따라 다른 API 엔드포인트 사용
      const isAdmin = user.role === 'admin';

      // 이미지 처리 옵션 준비
      // 이미지가 업로드된 경우 (uploadedImageKey 사용)
      // 이미지 삭제가 요청된 경우는 처리하지 않음 (새 API 스펙에 removeImage 필드 없음)

      if (isAdmin) {
        // ADMIN: 회사명 + 비밀번호 + 프로필 이미지 변경 가능
        // 엔드포인트: PATCH /api/v1/user/admin/profile
        const hasCompanyNameChange = values.companyName && values.companyName.trim() !== '';
        const hasPasswordChange = values.password && values.password.trim() !== '';
        const hasImageChange = !!selectedFile;

        if (!hasCompanyNameChange && !hasPasswordChange && !hasImageChange) {
          throw new Error('변경할 내용을 입력해주세요.');
        }

        await updateAdminProfile(
          {
            companyName: hasCompanyNameChange ? values.companyName : undefined,
            password: hasPasswordChange ? values.password : undefined,
            imageFile: hasImageChange ? selectedFile : undefined,
          },
          accessToken
        );
      } else {
        // USER, MANAGER: 비밀번호 + 프로필 이미지 변경 가능
        // 엔드포인트: PATCH /api/v1/user/me/profile
        const hasPasswordChange = values.password && values.password.trim() !== '';
        const hasImageChange = !!selectedFile;

        if (!hasPasswordChange && !hasImageChange) {
          throw new Error('변경할 내용을 입력해주세요. (비밀번호 또는 이미지)');
        }

        const updatedProfile = await updateUserProfile(
          {
            newPassword: hasPasswordChange ? values.password : undefined,
            newPasswordConfirm: hasPasswordChange ? values.passwordConfirm : undefined,
            imageFile: hasImageChange ? selectedFile : undefined,
          },
          accessToken
        );

        // 프로필 업데이트 성공 시 프로필 이미지가 변경되었을 수 있으므로
        // updatedProfile의 profileImage를 사용하여 미리보기 업데이트
        if (updatedProfile?.profileImage) {
          const { profileImage } = updatedProfile;
          if (profileImage.startsWith('http://') || profileImage.startsWith('https://')) {
            setPreview(profileImage);
          } else {
            const imageKey = profileImage.startsWith('users/')
              ? profileImage
              : `users/${profileImage}`;
            const imageUrl = `/api/product/image?key=${encodeURIComponent(imageKey)}`;
            setPreview(imageUrl);
          }
        }
      }

      // 프로필 업데이트 후 myProfile 쿼리 invalidate하여 최신 데이터 반영
      await queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      await queryClient.refetchQueries({ queryKey: ['myProfile'], type: 'active' });

      setToastMessage('프로필이 성공적으로 변경되었습니다.');
      setShowToast(true);

      form.reset({
        ...values,
        password: '',
        passwordConfirm: '',
      });

      // 이미지 상태 초기화
      setSelectedFile(null);
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
      // 성공 후 myProfile에서 최신 이미지 가져오기 (useEffect에서 자동 처리됨)
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
      onImageDelete={() => {
        // 이미지 삭제 핸들러
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
        setPreview('/icons/upload.svg');
        setSelectedFile(null);
      }}
    />
  );
};

export default ProfileEditSection;
