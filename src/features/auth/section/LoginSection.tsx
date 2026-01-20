'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import LoginTem from '@/features/auth/template/LoginTem/LoginTem';
import { useToast } from '@/hooks/useToast';
import { useLogin } from '@/features/auth/queries/auth.queries';
import { useAuthRedirect } from '@/features/auth/hooks/useAuthRedirect';
import { isCompanySelectionRequiredError } from '@/features/auth/api/auth.api';
import CompanySelectionModal from '@/features/auth/components/CompanySelectionModal/CompanySelectionModal';
import type { AuthFormState, AuthToastState } from '@/features/auth/types/auth-form.types';

interface Company {
  id: string;
  name: string;
}

/**
 * LoginSection
 * 로그인 비즈니스 로직을 담당하는 섹션 컴포넌트
 */
const LoginSection = () => {
  const { showToast, toastVariant, toastMessage, closeToast, triggerToast } = useToast();

  const loginMutation = useLogin();
  const { redirectToProducts } = useAuthRedirect();

  // 회사 선택 모달 상태
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [pendingCredentials, setPendingCredentials] = useState<LoginInput | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginInput): void => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        redirectToProducts(data.user);
      },
      onError: (err) => {
        if (isCompanySelectionRequiredError(err)) {
          setCompanies(err.companies);
          setPendingCredentials(values);
          setShowCompanyModal(true);
        } else {
          const errorMessage =
            err instanceof Error ? err.message : '이메일 또는 비밀번호가 올바르지 않습니다.';
          triggerToast('custom', errorMessage);
        }
      },
    });
  };

  const handleCompanySelect = (companyId: string) => {
    if (!pendingCredentials) return;

    loginMutation.mutate(
      { ...pendingCredentials, companyId },
      {
        onSuccess: (data) => {
          setShowCompanyModal(false);
          setPendingCredentials(null);
          setCompanies([]);
          redirectToProducts(data.user);
        },
        onError: () => {
          setShowCompanyModal(false);
          setPendingCredentials(null);
          setCompanies([]);
        },
      }
    );
  };

  const handleCloseCompanyModal = () => {
    setShowCompanyModal(false);
    setPendingCredentials(null);
    setCompanies([]);
  };

  // 그룹화된 Props
  const formState: AuthFormState<LoginInput> = {
    control: form.control,
    handleSubmit: form.handleSubmit,
    isValid: form.formState.isValid,
    onSubmit,
  };

  const toastState: AuthToastState = {
    showToast,
    toastMessage,
    toastVariant,
    onCloseToast: closeToast,
  };

  return (
    <>
      <LoginTem formState={formState} toastState={toastState} />
      <CompanySelectionModal
        open={showCompanyModal}
        companies={companies}
        onSelect={handleCompanySelect}
        onClose={handleCloseCompanyModal}
        isLoading={loginMutation.isPending}
      />
    </>
  );
};

export default LoginSection;
