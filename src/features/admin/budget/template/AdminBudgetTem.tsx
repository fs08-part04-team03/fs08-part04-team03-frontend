'use client';

import { useParams } from 'next/navigation';
import BudgetFormOrg from '@/features/admin/budget/components/BudgetFormOrg/BudgetFormOrg';
import { AdminSidebar } from '@/components/molecules/AdminSideBar/AdminSideBar';

// 어드민 예산 템플릿 props
interface AdminBudgetTemplateProps {
  initialThisMonthBudget?: number;
  initialMonthlyStartBudget?: number;
  onSubmit: (values: {
    thisMonthBudget: number;
    monthlyStartBudget: number;
  }) => void | Promise<void>;
}

// 어드민 예산 템플릿
const AdminBudgetTemplate = ({
  initialThisMonthBudget,
  initialMonthlyStartBudget,
  onSubmit,
}: AdminBudgetTemplateProps) => {
  const params = useParams();
  const companyId = params.companyId as string;

  return (
    <div className="flex flex-col desktop:flex-row w-full min-h-screen bg-white">
      {/* 어드민 sidebar */}
      <div className="shrink-0 desktop:border-r border-gray-100">
        <div className="desktop:p-24 desktop:w-260 desktop:sticky desktop:top-0 h-full">
          <AdminSidebar companyId={companyId} userRole="admin" />
        </div>
      </div>

      {/* 주요 컨텐츠 영역 (예산 설정 form) */}
      <main className="flex-1 p-24 tablet:p-40 desktop:p-60 overflow-x-hidden">
        <div className="max-w-960 w-full">
          <BudgetFormOrg
            initialThisMonthBudget={initialThisMonthBudget}
            initialMonthlyStartBudget={initialMonthlyStartBudget}
            onSubmit={onSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminBudgetTemplate;
