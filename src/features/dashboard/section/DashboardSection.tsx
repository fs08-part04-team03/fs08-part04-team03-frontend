'use client';

import { useEffect, useState } from 'react';
import {
  getPurchaseDashboard,
  type DashboardApiResponse,
} from '@/features/dashboard/api/dashboard.api';
import DashboardTem from '@/features/dashboard/template/DashboardTem/DashboardTem';
import type {
  NewUser,
  ChangedUser,
  LargeChartItem,
} from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';
import { Toast } from '@/components/molecules/Toast/Toast';
import { logger } from '@/utils/logger';
import { useAuthStore } from '@/lib/store/authStore';

interface DashboardSectionProps {
  companyId: string;
}

/**
 * 간식 순위에 따라 색상 생성
 */
const generateColor = (index: number): string => {
  const colors = [
    '#2563EB', // 파랑
    '#10B981', // 초록
    '#F59E0B', // 주황
    '#EF4444', // 빨강
    '#8B5CF6', // 보라
    '#EC4899', // 분홍
    '#06B6D4', // 청록
    '#F97316', // 진한 주황
    '#14B8A6', // 청록2
    '#6366F1', // 인디고
    '#84CC16', // 라임
    '#F43F5E', // 로즈
    '#A855F7', // 자주
    '#22D3EE', // 시안
    '#FB923C', // 오렌지
    '#4ADE80', // 연두
    '#E879F9', // 푸시아
  ];

  return colors[index % colors.length] ?? '#6B7280';
};

/**
 * API 응답을 컴포넌트 props로 변환
 */
const transformDashboardData = (data: DashboardApiResponse) => {
  // 월별 지출 현황 (최근 12개월)
  // 현재 날짜 기준으로 최근 12개월 데이터를 정렬하여 처리
  const monthlyExpenses = Array(12).fill(0);

  // 데이터를 연도-월 기준으로 정렬 (최신순)
  const sortedExpenses = [...data.monthlyExpenses].sort((a, b) => {
    const dateA = a.year * 12 + a.month;
    const dateB = b.year * 12 + b.month;
    return dateB - dateA; // 내림차순 (최신순)
  });

  // 최근 12개월 데이터만 사용
  sortedExpenses.slice(0, 12).forEach((expense, index) => {
    // 최신 데이터부터 역순으로 배열에 저장
    // 배열의 마지막이 최신 데이터가 되도록
    const arrayIndex = 11 - index;
    if (arrayIndex >= 0 && arrayIndex < 12) {
      monthlyExpenses[arrayIndex] = expense.totalExpenses;
    }
  });

  // 신규 회원 리스트 변환 (role을 소문자로)
  const newUsers: NewUser[] = data.newUsers.map(
    (user: DashboardApiResponse['newUsers'][number]) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.toLowerCase() as 'user' | 'manager' | 'admin',
      createdAt: user.createdAt,
    })
  );

  // 탈퇴/권한 변경 회원 리스트 변환
  const changedUsers: ChangedUser[] = data.userChanges.map(
    (user: DashboardApiResponse['userChanges'][number]) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      changeType: user.changeType,
      beforeRole: user.beforeRole?.toLowerCase() as 'user' | 'manager' | 'admin' | undefined,
      afterRole: user.afterRole?.toLowerCase() as 'user' | 'manager' | 'admin' | undefined,
      changedAt: user.changedAt,
    })
  );

  // 간식 순위 변환
  const snackRank: LargeChartItem[] = data.snacksList.map(
    (snack: DashboardApiResponse['snacksList'][number], index: number) => ({
      label: snack.name,
      value: snack.purchaseCount,
      color: generateColor(index),
    })
  );

  // 예산 사용률 계산
  const usedBudget = data.budget.thisMonthBudget - data.budget.remainingBudget;
  const progressValue =
    data.budget.thisMonthBudget > 0
      ? Math.round((usedBudget / data.budget.thisMonthBudget) * 100)
      : 0;

  return {
    monthlyExpense: data.expenses.thisMonth,
    yearlyExpense: data.expenses.thisYear,
    progressValue,
    currentBudget: data.budget.thisMonthBudget,
    lastBudget: usedBudget,
    monthlyExpenses,
    newUsers,
    changedUsers,
    snackRank,
  };
};

const DashboardSection = ({ companyId }: DashboardSectionProps) => {
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const [isLoading, setIsLoading] = useState(true);
  const [toastState, setToastState] = useState({
    isVisible: false,
    variant: 'custom' as const,
    message: '',
  });

  // 대시보드 데이터 상태
  const [dashboardData, setDashboardData] = useState({
    monthlyExpense: 0,
    yearlyExpense: 0,
    progressValue: 0,
    currentBudget: 0,
    lastBudget: 0,
    monthlyExpenses: Array(12).fill(0) as number[],
    newUsers: [] as NewUser[],
    changedUsers: [] as ChangedUser[],
    snackRank: [] as LargeChartItem[],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        const response = await getPurchaseDashboard();

        if (response.success) {
          logger.info('[Dashboard] API 응답 성공', {
            expenses: response.data.expenses,
            budget: response.data.budget,
          });
          const transformedData = transformDashboardData(response.data);
          logger.info('[Dashboard] 변환된 데이터', {
            monthlyExpense: transformedData.monthlyExpense,
            yearlyExpense: transformedData.yearlyExpense,
            progressValue: transformedData.progressValue,
          });
          setDashboardData(transformedData);
        } else {
          logger.error('[Dashboard] API 응답 실패', {
            success: response.success,
            message: response.message,
          });
          setToastState({
            isVisible: true,
            variant: 'custom',
            message: response.message || '대시보드 정보를 불러오는데 실패했습니다.',
          });
        }
      } catch (error) {
        logger.error('[Dashboard] 대시보드 정보를 불러오는데 실패했습니다.', {
          message: error instanceof Error ? error.message : '알 수 없는 오류',
        });
        setToastState({
          isVisible: true,
          variant: 'custom',
          message: '대시보드 정보를 불러오는데 실패했습니다.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    // 컴포넌트 마운트 시 데이터 로드
    // 에러는 내부 try-catch에서 이미 처리되므로 빈 catch 핸들러
    fetchDashboardData().catch(() => {
      // 에러는 이미 내부 try-catch에서 처리됨
    });
  }, []); // 컴포넌트 마운트 시 한 번만 실행 (토큰에서 회사 정보 자동 추출)

  // 초기화가 완료되지 않은 경우 (providers.tsx에서 로딩 표시 중이므로 여기서는 null 반환)
  if (!isInitialized) {
    return null;
  }

  // API 데이터 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>대시보드 데이터를 불러오는 중...</p>
      </div>
    );
  }

  // 사용자 정보가 없는 경우 (실제 비인증 상태)
  // 이 시점에서는 isInitialized === true이므로 초기화가 완료된 상태
  if (!user) {
    logger.warn('[Dashboard] 사용자 정보 없음 - 인증 필요');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>인증이 필요합니다. 로그인 페이지로 이동 중...</p>
      </div>
    );
  }

  return (
    <>
      <DashboardTem
        companyId={companyId}
        user={{ name: user.name }}
        userRole={(user.role?.toLowerCase() as 'user' | 'manager' | 'admin') ?? 'user'}
        monthlyExpense={dashboardData.monthlyExpense}
        yearlyExpense={dashboardData.yearlyExpense}
        progressValue={dashboardData.progressValue}
        currentBudget={dashboardData.currentBudget}
        lastBudget={dashboardData.lastBudget}
        monthlyExpenses={dashboardData.monthlyExpenses}
        newUsers={dashboardData.newUsers}
        changedUsers={dashboardData.changedUsers}
        snackRank={dashboardData.snackRank}
      />

      {toastState.isVisible && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[var(--z-toast)]">
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

export default DashboardSection;
