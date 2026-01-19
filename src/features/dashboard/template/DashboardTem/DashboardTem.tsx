'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/molecules/AdminSideBar/AdminSideBar';
import DashboardCard from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';
import Button from '@/components/atoms/Button/Button';

import type {
  UserRole,
  NewUser,
  ChangedUser,
  LargeChartItem,
} from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';
import { useBroadcastNotification } from '@/features/notification/queries/notification.queries';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/molecules/Toast/Toast';
import { EmergencyBroadcastModal } from './EmergencyBroadcastModal';

interface User {
  name: string;
}

interface DashboardTemProps {
  companyId: string;
  user: User;
  userRole?: UserRole;

  /** ✅ Dashboard Data (Story / Page에서 주입) */
  monthlyExpense?: number;
  yearlyExpense?: number;
  progressValue?: number;
  currentBudget?: number;
  lastBudget?: number;
  monthlyExpenses: number[];
  newUsers: NewUser[];
  changedUsers: ChangedUser[];
  snackRank: LargeChartItem[];
}

const DashboardTem = ({
  companyId,
  user,
  userRole = 'admin',

  monthlyExpense = 0,
  yearlyExpense = 0,
  progressValue = 0,
  currentBudget = 0,
  lastBudget = 0,
  monthlyExpenses,
  newUsers,
  changedUsers,
  snackRank,
}: DashboardTemProps) => {
  const { mutate: broadcast } = useBroadcastNotification();
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Toast 상태
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  /** ================= Click Handlers ================= */
  const handleEmergencyClick = () => {
    setIsEmergencyModalOpen(true);
  };

  const handleBroadcastSend = (message: string) => {
    broadcast(message, {
      onSuccess: (data) => {
        triggerToast(
          'success',
          `알림이 전송되었습니다. (생성: ${data.data.createdCount}, 발송: ${data.data.deliveredCount})`
        );
      },
      onError: (err: unknown) => {
        const errMessage = err instanceof Error ? err.message : '알림 전송에 실패했습니다.';
        triggerToast('error', errMessage);
      },
    });
    setIsEmergencyModalOpen(false);
  };

  const handleExcelClick = () => {
    // TODO: Excel 다운로드 기능 연결
  };

  return (
    <div
      className="
        mx-auto
        flex
        flex-col
        w-327
        tablet:w-696
        desktop:flex-row
        desktop:w-1400
        desktop:mt-80
      "
    >
      {/* ===== Mobile / Tablet Title ===== */}
      <div
        className="
          mb-10
          tablet:mb-20
          flex
          items-center
          justify-between
          desktop:hidden
        "
      >
        <h1
          className="
            text-black
            font-suit
            text-18
            font-bold
            tracking--0.45
          "
        >
          {user.name}의 Dashboard
        </h1>

        <div className="flex gap-8">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleEmergencyClick}
            className="whitespace-nowrap"
          >
            긴급 알림
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExcelClick}>
            Excel
          </Button>
        </div>
      </div>

      {/* ===== AdminSidebar ===== */}
      <div
        className="
          flex-shrink-0
          mb-10
          tablet:mb-20
          desktop:mb-0
        "
      >
        <AdminSidebar companyId={companyId} userRole={userRole} />
      </div>

      {/* ===== Dashboard Content ===== */}
      <main className="flex flex-col desktop:ml-50 w-full">
        {/* ===== Desktop Title ===== */}
        <div
          className="
            hidden
            desktop:flex
            items-center
            justify-between
            mb-30
          "
        >
          <h1
            className="
              text-black
              font-suit
              text-18
              font-bold
              tracking--0.45
            "
          >
            {user.name}의 Dashboard
          </h1>

          <div className="flex gap-10">
            <Button variant="secondary" size="sm" onClick={handleEmergencyClick}>
              긴급 알림
            </Button>
            <Button variant="secondary" size="sm" onClick={handleExcelClick}>
              Excel
            </Button>
          </div>
        </div>

        {/* ===== default 카드 ===== */}
        <section
          className="
            flex
            flex-col
            gap-10
            mb-10

            tablet:gap-20
            tablet:mb-20
            desktop:flex-row
            desktop:gap-30
            desktop:mb-30
          "
        >
          <DashboardCard
            variant="default"
            defaultType="summary"
            monthlyExpense={monthlyExpense}
            yearlyExpense={yearlyExpense}
            showProgressBar
            progressValue={progressValue}
            currentBudget={currentBudget}
            lastBudget={lastBudget}
          />

          <DashboardCard
            variant="default"
            defaultType="yearlyBar"
            monthlyExpensesByYear={monthlyExpenses}
          />
        </section>

        {/* ===== medium (mobile / tablet) ===== */}
        <section
          className="
            flex
            flex-col
            gap-10
            mb-10

            tablet:grid
            tablet:grid-cols-2
            tablet:gap-30
            tablet:mb-20

            desktop:hidden
          "
        >
          <DashboardCard variant="medium" mediumMode="new" monthlyNewUsers={newUsers} />

          <DashboardCard variant="medium" mediumMode="changed" monthlyChangedUsers={changedUsers} />
        </section>

        {/* ===== large (mobile / tablet) ===== */}
        <section
          className="
            mb-10
            tablet:mb-20
            desktop:hidden
          "
        >
          <DashboardCard variant="large" largeChartData={snackRank} />
        </section>

        {/* ===== desktop grid ===== */}
        <section
          className="
            hidden
            desktop:grid
            desktop:grid-cols-2
            desktop:gap-x-30
            desktop:gap-y-24
            desktop:mb-30
          "
        >
          <DashboardCard variant="medium" mediumMode="new" monthlyNewUsers={newUsers} />

          <DashboardCard variant="large" className="row-span-2" largeChartData={snackRank} />

          <DashboardCard variant="medium" mediumMode="changed" monthlyChangedUsers={changedUsers} />
        </section>
      </main>

      <EmergencyBroadcastModal
        open={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        onSend={handleBroadcastSend}
      />

      {/* Toast 렌더링 */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[var(--z-toast)]">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </div>
  );
};

export default DashboardTem;
