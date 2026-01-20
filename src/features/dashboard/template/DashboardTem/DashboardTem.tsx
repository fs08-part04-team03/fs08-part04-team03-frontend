'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { AdminSidebar } from '@/components/molecules/AdminSideBar/AdminSideBar';
import DashboardCard from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';
import Button from '@/components/atoms/Button/Button';
import { CarouselIndicator } from '@/components/atoms/CarouselIndicator/CarouselIndicator';

import type {
  UserRole,
  NewUser,
  ChangedUser,
  LargeChartItem,
} from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';
import { useBroadcastNotification } from '@/features/notification/queries/notification.queries';
import { useToast } from '@/hooks/useToast';
import { Toast } from '@/components/molecules/Toast/Toast';
import { exportPurchaseRequests, downloadBlob } from '@/features/dashboard/api/report.api';
import { EmergencyBroadcastModal } from './EmergencyBroadcastModal';
import { ExcelExportModal, type ExcelExportParams } from './ExcelExportModal';

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
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);
  const [isExcelExporting, setIsExcelExporting] = useState(false);

  // Mobile carousel indicators
  const defaultCarouselRef = useRef<HTMLElement | null>(null);
  const usersCarouselRef = useRef<HTMLElement | null>(null);
  const [defaultCarouselIndex, setDefaultCarouselIndex] = useState(0);
  const [usersCarouselIndex, setUsersCarouselIndex] = useState(0);

  // Toast 상태
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  const scrollToCarouselIndex = (ref: RefObject<HTMLElement | null>, index: number) => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-carousel-item="true"]'));
    const target = items[index];
    if (!target) return;
    el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
  };

  useEffect(() => {
    const attach = (
      ref: RefObject<HTMLElement | null>,
      setIndex: Dispatch<SetStateAction<number>>
    ) => {
      const el = ref.current;
      if (!el) return () => {};

      let raf = 0;
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const items = Array.from(el.querySelectorAll<HTMLElement>('[data-carousel-item="true"]'));
          if (items.length === 0) return;
          const left = el.scrollLeft;
          let bestIdx = 0;
          let bestDist = Math.abs((items[0]?.offsetLeft ?? 0) - left);
          for (let i = 1; i < items.length; i += 1) {
            const dist = Math.abs((items[i]?.offsetLeft ?? 0) - left);
            if (dist < bestDist) {
              bestDist = dist;
              bestIdx = i;
            }
          }
          setIndex(bestIdx);
        });
      };

      onScroll(); // initial
      el.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        cancelAnimationFrame(raf);
        el.removeEventListener('scroll', onScroll);
      };
    };

    const detachDefault = attach(defaultCarouselRef, setDefaultCarouselIndex);
    const detachUsers = attach(usersCarouselRef, setUsersCarouselIndex);
    return () => {
      detachDefault();
      detachUsers();
    };
  }, []);

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
    setIsExcelModalOpen(true);
  };

  const handleExcelExport = async (params: ExcelExportParams) => {
    setIsExcelExporting(true);
    try {
      const blob = await exportPurchaseRequests(params);
      const filename = `purchase_requests_${params.from.slice(0, 10)}_${params.to.slice(0, 10)}.xlsx`;
      downloadBlob(blob, filename);
      triggerToast('success', '엑셀 파일 다운로드가 완료되었습니다.');
      setIsExcelModalOpen(false);
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : '엑셀 다운로드에 실패했습니다.';
      triggerToast('error', errMessage);
    } finally {
      setIsExcelExporting(false);
    }
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
        desktop:w-full
        desktop:max-w-1400
        desktop:pl-70
        desktop:pr-100
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
          w-full
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
          shrink-0
          mb-10
          tablet:mb-20
          desktop:mb-0
        "
      >
        <AdminSidebar companyId={companyId} userRole={userRole} />
      </div>

      {/* ===== Dashboard Content ===== */}
      <main className="flex flex-col desktop:ml-50 flex-1 min-w-0">
        {/* ===== Desktop Title ===== */}
        <div
          className="
            hidden
            desktop:flex
            items-center
            justify-between
            mb-30
            w-full
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
          ref={defaultCarouselRef}
          className="
            flex
            flex-row
            flex-nowrap
            gap-10
            mb-10
            overflow-x-auto
            snap-x
            snap-mandatory
            scrollbar-none

            tablet:gap-20
            tablet:mb-20
            tablet:flex-col
            tablet:overflow-visible
            desktop:flex-row
            desktop:gap-30
            desktop:mb-30
            desktop:overflow-visible
            desktop:snap-none
          "
        >
          <div
            className="shrink-0 snap-start tablet:shrink desktop:shrink desktop:flex-1 desktop:min-w-0"
            data-carousel-item="true"
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
          </div>

          <div
            className="shrink-0 snap-start tablet:shrink desktop:shrink desktop:flex-1 desktop:min-w-0"
            data-carousel-item="true"
          >
            <DashboardCard
              variant="default"
              defaultType="yearlyBar"
              monthlyExpensesByYear={monthlyExpenses}
            />
          </div>
        </section>
        <CarouselIndicator
          count={2}
          activeIndex={defaultCarouselIndex}
          onSelect={(idx) => scrollToCarouselIndex(defaultCarouselRef, idx)}
          className="my-6 tablet:hidden"
        />

        {/* ===== mobile swipe (new/changed) ===== */}
        <section
          ref={usersCarouselRef}
          className="
            flex
            flex-row
            flex-nowrap
            gap-10
            mb-10
            overflow-x-auto
            snap-x
            snap-mandatory
            scrollbar-none

            tablet:hidden
          "
        >
          <div className="shrink-0 snap-start" data-carousel-item="true">
            <DashboardCard variant="longMedium" mediumMode="new" monthlyNewUsers={newUsers} />
          </div>

          <div className="shrink-0 snap-start" data-carousel-item="true">
            <DashboardCard
              variant="longMedium"
              mediumMode="changed"
              monthlyChangedUsers={changedUsers}
            />
          </div>
        </section>
        <CarouselIndicator
          count={2}
          activeIndex={usersCarouselIndex}
          onSelect={(idx) => scrollToCarouselIndex(usersCarouselRef, idx)}
          className="my-6 tablet:hidden"
        />

        {/* ===== snack rank (mobile only) ===== */}
        <section
          className="
            mb-10
            tablet:hidden
          "
        >
          <DashboardCard variant="mediumExtraLong" largeChartData={snackRank} />
        </section>

        {/* ===== medium (tablet only) ===== */}
        <section
          className="
            hidden
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

        {/* ===== snack rank (tablet only) ===== */}
        <section
          className="
            hidden
            tablet:block
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

      <ExcelExportModal
        open={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        onExport={handleExcelExport}
        isLoading={isExcelExporting}
      />

      {/* Toast 렌더링 */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-(--z-toast)">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </div>
  );
};

export default DashboardTem;
