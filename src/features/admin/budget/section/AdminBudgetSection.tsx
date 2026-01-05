'use client';

import { useEffect, useState } from 'react';
import AdminBudgetTemplate from '@/features/admin/budget/template/AdminBudgetTem';
import {
  getBudget,
  getBudgetCriteria,
  updateBudget,
  updateBudgetCriteria,
} from '@/features/admin/budget/api/adminBudget.api';
import { Toast } from '@/components/molecules/Toast/Toast';
import { logger } from '@/utils/logger';

// 어드민 예산 관리 섹션
const AdminBudgetSection = () => {
  // toast 상태 관리
  const [toastState, setToastState] = useState<{
    isVisible: boolean;
    variant: 'success' | 'error' | 'custom';
    message?: string;
  }>({
    isVisible: false,
    variant: 'success',
  });

  // 예산 초기값 상태 관리
  const [initialThisMonthBudget, setInitialThisMonthBudget] = useState<number>(0);
  const [initialMonthlyStartBudget, setInitialMonthlyStartBudget] = useState<number>(0);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString();

        // 예산 정보 가져오기
        const [budgetRes, criteriaRes] = await Promise.all([
          getBudget(year, month),
          getBudgetCriteria(),
        ]);

        // 이번 달 예산 정보 설정
        if (budgetRes.success && budgetRes.data.length > 0) {
          setInitialThisMonthBudget(budgetRes.data[0]?.amount || 0);
        }

        // 매달 시작 예산 정보 설정
        if (criteriaRes.success) {
          setInitialMonthlyStartBudget(criteriaRes.data.amount);
        }
      } catch (error) {
        logger.error('[AdminBudget] 예산 정보를 불러오는데 실패했습니다.', {
          message: error instanceof Error ? error.message : '알 수 없는 오류',
        });
        setToastState({
          isVisible: true,
          variant: 'custom',
          message: '예산 정보를 불러오는데 실패했습니다.',
        });
        setTimeout(() => setToastState((prev) => ({ ...prev, isVisible: false })), 3000);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchBudgetData();
  }, []);

  // budget 제출 핸들러
  const handleBudgetSubmit = async (values: {
    thisMonthBudget: number;
    monthlyStartBudget: number;
  }) => {
    try {
      // 예산 업데이트 - 순차적으로 업데이트하여 부분 실패 시 명확한 에러 처리
      await updateBudget(values.thisMonthBudget);
      await updateBudgetCriteria(values.monthlyStartBudget);

      // 예산 업데이트 성공
      setToastState({ isVisible: true, variant: 'success' });
      setTimeout(() => setToastState((prev) => ({ ...prev, isVisible: false })), 3000);
    } catch (error) {
      // 예산 업데이트 실패
      logger.error('[AdminBudget] 예산 업데이트 실패', {
        message: error instanceof Error ? error.message : '알 수 없는 오류',
      });
      setToastState({
        isVisible: true,
        variant: 'custom',
        message: '잠시 후 다시 시도해주세요.',
      });
      setTimeout(() => setToastState((prev) => ({ ...prev, isVisible: false })), 3000);
    }
  };

  return (
    <>
      {/* 어드민 예산 템플릿 */}
      <AdminBudgetTemplate
        initialThisMonthBudget={initialThisMonthBudget}
        initialMonthlyStartBudget={initialMonthlyStartBudget}
        onSubmit={handleBudgetSubmit}
      />
      {/* 실패/성공 Toast */}
      {toastState.isVisible && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999]">
          <Toast
            variant={toastState.variant}
            message={toastState.message}
            onClose={() => setToastState((prev) => ({ ...prev, isVisible: false }))}
          />
        </div>
      )}
    </>
  );
};

export default AdminBudgetSection;
