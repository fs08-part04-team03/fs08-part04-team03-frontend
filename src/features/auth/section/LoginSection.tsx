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

// 회사 정보
interface Company {
  id: string;
  name: string;
}

/**
 * LoginSection
 * 로그인 비즈니스 로직을 담당하는 섹션 컴포넌트
 * - form 상태 관리
 * - API 호출
 * - 인증 정보 저장
 * - Toast 관리
 * - 리다이렉트
 * - 회사 선택 모달 (여러 회사에 가입된 경우)
 */
const LoginSection = () => {
  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, closeToast } = useToast();

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
        // 회사 선택이 필요한 경우 모달 표시
        if (isCompanySelectionRequiredError(err)) {
          setCompanies(err.companies);
          setPendingCredentials(values);
          setShowCompanyModal(true);
        }
      },
    });
  };

  // 회사 선택 후 로그인 처리
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
      }
    );
  };

  // 모달 닫기
  const handleCloseCompanyModal = () => {
    setShowCompanyModal(false);
    setPendingCredentials(null);
    setCompanies([]);
  };

  return (
    <>
      <LoginTem
        control={form.control}
        handleSubmit={form.handleSubmit}
        isValid={form.formState.isValid}
        onSubmit={onSubmit}
        showToast={showToast}
        toastVariant={toastVariant}
        toastMessage={toastMessage}
        setShowToast={closeToast}
      />
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
