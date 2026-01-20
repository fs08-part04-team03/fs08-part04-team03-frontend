'use client';

import { clsx } from '@/utils/clsx';
import { sumBy } from '@/utils/array';
import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar';
import dynamic from 'next/dynamic';

import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

/** ✅ SSR 방지 */
const ResponsiveContainer = dynamic(() => import('recharts').then((m) => m.ResponsiveContainer), {
  ssr: false,
});

export type DashboardCardVariant = 'default' | 'medium' | 'large';
export type DefaultCardType = 'summary' | 'yearlyBar';

/** ================= 회원 타입 ================= */
export type UserRole = 'user' | 'manager' | 'admin';
export type ChangeType = 'withdraw' | 'roleChange';

export interface NewUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface ChangedUser {
  id: string;
  name: string;
  email: string;
  changeType: ChangeType;
  beforeRole?: UserRole;
  afterRole?: UserRole;
  changedAt: string;
}

/** ================= Large 전용 ================= */
export interface LargeChartItem {
  label: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

/** ================= Medium Mode ================= */
export type MediumCardMode = 'new' | 'changed';

export interface DashboardCardProps {
  variant?: DashboardCardVariant;
  className?: string;

  defaultType?: DefaultCardType;

  /** medium 전용 */
  mediumMode?: MediumCardMode;

  monthlyExpense?: number;
  yearlyExpense?: number;
  showProgressBar?: boolean;

  progressValue?: number;
  currentBudget?: number;
  lastBudget?: number;

  monthlyExpensesByYear?: number[];

  monthlyNewUsers?: NewUser[];
  monthlyChangedUsers?: ChangedUser[];

  largeChartData?: LargeChartItem[];
}

const variantStyles: Record<DashboardCardVariant, string> = {
  default: `
    w-327 h-132 gap-12 justify-start
    tablet:w-696 tablet:h-190 tablet:gap-20
    desktop:w-570 desktop:h-190 desktop:gap-20
  `,
  medium: `
    w-327 h-132 gap-8 justify-start
    tablet:w-333 tablet:h-250
    desktop:w-570 desktop:h-255
  `,
  large: `
    w-327 h-360 gap-8 justify-start
    tablet:w-696 tablet:h-380
    desktop:w-570 desktop:h-534
  `,
};

const DashboardCardOrg = ({
  variant = 'default',
  defaultType = 'summary',
  mediumMode,
  className,

  monthlyExpense = 0,
  yearlyExpense = 0,
  showProgressBar = false,

  progressValue = 0,
  currentBudget = 0,
  lastBudget = 0,

  monthlyExpensesByYear = [],
  monthlyNewUsers = [],
  monthlyChangedUsers = [],

  largeChartData = [],
}: DashboardCardProps) => {
  const maxValue = Math.max(...monthlyExpensesByYear, 0);

  const chartData = monthlyExpensesByYear.map((value, index) => ({
    month: `${index + 1}월`,
    value,
  }));

  /** 🔥 핵심 수정 */
  const isChangedUserMode = variant === 'medium' && mediumMode === 'changed';

  const tableUsers = isChangedUserMode ? monthlyChangedUsers : monthlyNewUsers;

  const isEmptyTable = tableUsers.length === 0;

  const largeTotal = sumBy(largeChartData, 'value');

  return (
    <div
      className={clsx(
        `
        flex flex-col items-start shrink-0
        rounded-4 bg-gray-50
        px-15 py-20 tablet:p-30 desktop:p-30
        `,
        variantStyles[variant],
        className
      )}
    >
      {/* ================= Summary ================= */}
      {variant === 'default' && defaultType === 'summary' && (
        <div className="w-full flex flex-col gap-20">
          <div className="flex justify-between items-center">
            <span className="text-14 text-gray-700">이번 달 지출액</span>
            <span className="text-16 font-bold text-gray-900">
              {monthlyExpense.toLocaleString()}원
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-14 text-gray-700">올해 총 지출액</span>
            <span className="text-16 font-bold text-gray-900">
              {yearlyExpense.toLocaleString()}원
            </span>
          </div>

          {showProgressBar && (
            <ProgressBar
              value={progressValue}
              currentBudget={currentBudget}
              lastBudget={lastBudget}
              className="w-full"
            />
          )}
        </div>
      )}

      {/* ================= Yearly Bar ================= */}
      {variant === 'default' && defaultType === 'yearlyBar' && (
        <div className="w-full flex flex-col gap-8 tablet:gap-16">
          <span className="text-14 font-medium text-gray-900">월별 지출 현황</span>

          <div className="w-full h-60 tablet:h-100 desktop:h-100">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  minTickGap={0}
                  tick={{ fontSize: 9, fill: '#6B7280' }}
                  className="tablet:text-10"
                />
                <YAxis hide domain={[0, maxValue]} />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  formatter={(value?: number) => [`${(value ?? 0).toLocaleString()}원`, '지출액']}
                />
                <Bar dataKey="value" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ================= Medium ================= */}
      {variant === 'medium' && (
        <div className="w-full flex flex-col gap-8 h-full">
          <span className="text-14 font-medium text-gray-900 shrink-0">
            {isChangedUserMode ? '이번 달 탈퇴 / 권한 변경' : '이번 달 신규 회원 리스트'}
          </span>

          <div className="w-full flex-1 overflow-y-auto scrollbar-none">
            <table className="w-full table-fixed text-12 text-gray-700">
              <thead className="sticky top-0 bg-gray-50 z-20 shadow-sm">
                <tr className="border-b border-gray-200">
                  <th className="w-1/4 text-left py-6">이름</th>
                  <th className="w-2/4 text-left py-6">이메일</th>
                  <th className="w-1/4 text-left py-6">
                    {isChangedUserMode ? '변경 내용' : '권한'}
                  </th>
                </tr>
              </thead>

              <tbody>
                {isEmptyTable && (
                  <tr>
                    <td colSpan={3} className="py-12 text-center text-gray-400">
                      데이터가 없습니다.
                    </td>
                  </tr>
                )}

                {!isEmptyTable &&
                  isChangedUserMode &&
                  monthlyChangedUsers.map((user) => {
                    const changeText =
                      user.changeType === 'withdraw'
                        ? '탈퇴'
                        : `${user.beforeRole ?? '알 수 없음'} → ${user.afterRole ?? '알 수 없음'}`;

                    return (
                      <tr key={user.id} className="border-b border-gray-100 last:border-0">
                        <td className="py-6">
                          <span className="block truncate">{user.name}</span>
                        </td>
                        <td className="py-6">
                          <span className="block truncate">{user.email}</span>
                        </td>
                        <td className="py-6">
                          <span className="block truncate">{changeText}</span>
                        </td>
                      </tr>
                    );
                  })}

                {!isEmptyTable &&
                  !isChangedUserMode &&
                  monthlyNewUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-6">
                        <span className="block truncate font-medium">{user.name}</span>
                      </td>
                      <td className="py-6">
                        <span className="block truncate">{user.email}</span>
                      </td>
                      <td className="py-6">
                        <span className="block truncate capitalize">{user.role}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= Large ================= */}
      {variant === 'large' && (
        <div className="w-full h-full flex flex-col gap-12">
          <span className="text-14 font-medium text-gray-900">이번 달 요청한 간식 순위</span>

          <div className="flex flex-col tablet:flex-row items-start flex-1 gap-16 tablet:gap-24 overflow-hidden">
            {/* 차트 영역 */}
            <div className="shrink-0 w-full h-200 tablet:w-280 tablet:h-280 desktop:w-260 desktop:h-260">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={largeChartData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius="50%"
                    outerRadius="80%"
                    paddingAngle={2}
                  >
                    {largeChartData.map((item) => (
                      <Cell key={item.label} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value?: number, name?: string) => [`${value ?? 0}회`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 순위 리스트 */}
            <ul className="flex-1 flex flex-col gap-8 text-12 text-gray-700 overflow-y-auto scrollbar-none w-full">
              {largeChartData.map((item, index) => (
                <li key={item.label} className="flex items-center gap-8">
                  <span className="text-gray-400 w-12">{index + 1}.</span>
                  <span className="w-8 h-8 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="flex-1 truncate">{item.label}</span>
                  <span className="text-gray-500">
                    {item.value}회 ·{' '}
                    {largeTotal === 0 ? '0.0' : ((item.value / largeTotal) * 100).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCardOrg;
