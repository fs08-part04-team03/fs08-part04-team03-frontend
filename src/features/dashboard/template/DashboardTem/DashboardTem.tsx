'use client';

import React from 'react';
import { AdminSidebar } from '@/components/molecules/AdminSideBar/AdminSideBar';
import DashboardCard from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';
import Button from '@/components/atoms/Button/Button';

import type {
  UserRole,
  NewUser,
  ChangedUser,
  LargeChartItem,
} from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';

interface User {
  name: string;
}

interface DashboardTemProps {
  companyId: string;
  user: User;
  userRole?: UserRole;

  /** ✅ Dashboard Data (Story / Page에서 주입) */
  monthlyExpenses: number[];
  newUsers: NewUser[];
  changedUsers: ChangedUser[];
  snackRank: LargeChartItem[];
}

const DashboardTem: React.FC<DashboardTemProps> = ({
  companyId,
  user,
  userRole = 'admin',

  monthlyExpenses,
  newUsers,
  changedUsers,
  snackRank,
}) => {
  /** ================= Click Handlers ================= */
  const handleEmergencyClick = () => {
    // TODO: 긴급 알림 기능 연결
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
          <Button variant="secondary" size="sm" onClick={handleEmergencyClick}>
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
            monthlyExpense={350000}
            yearlyExpense={4200000}
            showProgressBar
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
          <DashboardCard variant="medium" monthlyNewUsers={newUsers} />
          <DashboardCard variant="medium" monthlyChangedUsers={changedUsers} />
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
          <DashboardCard variant="medium" monthlyNewUsers={newUsers} />

          <DashboardCard variant="large" className="row-span-2" largeChartData={snackRank} />

          <DashboardCard variant="medium" monthlyChangedUsers={changedUsers} />
        </section>
      </main>
    </div>
  );
};

export default DashboardTem;
