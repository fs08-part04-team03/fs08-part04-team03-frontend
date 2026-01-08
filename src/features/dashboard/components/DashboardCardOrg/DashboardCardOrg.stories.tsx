import type { Meta, StoryObj } from '@storybook/nextjs';
import DashboardCardOrg from './DashboardCardOrg';

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof DashboardCardOrg> = {
  title: 'Features/Dashboard/Organisms/DashboardCardOrg',
  component: DashboardCardOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Dashboard 화면에서 사용되는 **카드형 Organism 컴포넌트**입니다.

공통된 배경색과 border-radius를 유지하면서  
**카드 높이와 내부 정렬 방식에 따라 3가지 variant**를 제공합니다.

---

## 역할 (Responsibility)

- Dashboard 카드의 **공통 레이아웃 및 스타일 제공**
- variant 기반 카드 크기 / 정렬 제어
- default 카드 내부 콘텐츠 타입 분기 (요약 / 차트)
- medium 카드 내부 리스트 타입 분기
  - 신규 회원
  - 탈퇴 / 권한 변경
- large 카드에서 **이번 달 요청한 간식 순위 시각화**
  - 도넛 차트
  - 요청 수 기반 랭킹 리스트
- 디자인 토큰 기반 배경색 적용  
  (\`--gray-primary-50\`)

> ⚠️ 이 컴포넌트는  
> - API 연동  
> - 데이터 포맷팅  
> - 비즈니스 로직  
> 을 포함하지 않는 **순수 UI Organism**입니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardCardOrg>;

/** =====================
 * Default
 ====================== */
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

/** =====================
 * Default / 지출 요약
 ====================== */
export const DefaultWithExpense: Story = {
  name: 'Default / 지출 요약',
  args: {
    variant: 'default',
    defaultType: 'summary',
    monthlyExpense: 320000,
    yearlyExpense: 4580000,
    showProgressBar: true,
    progressValue: 65,
    currentBudget: 1200000,
    lastBudget: 900000,
  },
};

/** =====================
 * Default / 월별 지출 그래프
 ====================== */
export const DefaultWithYearlyBar: Story = {
  name: 'Default / 월별 지출 그래프',
  args: {
    variant: 'default',
    defaultType: 'yearlyBar',
    monthlyExpensesByYear: [
      120000, 180000, 90000, 220000, 160000, 140000, 200000, 170000, 150000, 190000, 210000, 250000,
    ],
  },
};

/** =====================
 * Medium / 신규 회원 리스트
 ====================== */
export const MediumWithNewUsers: Story = {
  name: 'Medium / 이번 달 신규 회원',
  args: {
    variant: 'medium',
    monthlyNewUsers: [
      {
        id: 'U001',
        name: '김민수',
        email: 'minsu@test.com',
        role: 'user',
        createdAt: '2025-01-03',
      },
      {
        id: 'U002',
        name: '이관리',
        email: 'manager@test.com',
        role: 'manager',
        createdAt: '2025-01-05',
      },
      {
        id: 'U003',
        name: '박관리자',
        email: 'admin@test.com',
        role: 'admin',
        createdAt: '2025-01-08',
      },
    ],
  },
};

/** =====================
 * Medium / 신규 회원 Empty
 ====================== */
export const MediumNewUsersEmpty: Story = {
  name: 'Medium / 신규 회원 없음',
  args: {
    variant: 'medium',
    monthlyNewUsers: [],
  },
};

/** =====================
 * Medium / 탈퇴 · 권한 변경 리스트
 ====================== */
export const MediumWithChangedUsers: Story = {
  name: 'Medium / 탈퇴 · 권한 변경',
  args: {
    variant: 'medium',
    monthlyChangedUsers: [
      {
        id: 'C001',
        name: '정미',
        email: 'withdraw@test.com',
        changeType: 'withdraw',
        changedAt: '2025-01-10',
      },
      {
        id: 'C002',
        name: '캄보디안',
        email: 'role@test.com',
        changeType: 'roleChange',
        beforeRole: 'user',
        afterRole: 'manager',
        changedAt: '2025-01-12',
      },
    ],
  },
};

/** =====================
 * Medium / 탈퇴 · 권한 변경 Empty
 ====================== */
export const MediumChangedUsersEmpty: Story = {
  name: 'Medium / 탈퇴 · 권한 변경 없음',
  args: {
    variant: 'medium',
    monthlyChangedUsers: [],
  },
};

/** =====================
 * Large / 이번 달 요청한 간식 순위
 ====================== */
export const LargeWithSnackRanking: Story = {
  name: 'Large / 이번 달 요청한 간식 순위',
  args: {
    variant: 'large',
    largeChartData: [
      {
        label: '초콜릿류',
        value: 48,
        color: '#2563EB',
      },
      {
        label: '과자',
        value: 36,
        color: '#16A34A',
      },
      {
        label: '젤리류',
        value: 22,
        color: '#F97316',
      },
      {
        label: '쿠키',
        value: 15,
        color: '#8B5CF6',
      },
      {
        label: '견과류',
        value: 9,
        color: '#6B7280',
      },
    ],
  },
};

/** =====================
 * Custom Style Override
 ====================== */
export const CustomStyle: Story = {
  args: {
    variant: 'default',
    defaultType: 'summary',
    monthlyExpense: 500000,
    yearlyExpense: 6200000,
    showProgressBar: true,
    progressValue: 80,
    currentBudget: 800000,
    lastBudget: 1000000,
    className: 'ring-1 ring-gray-300',
  },
};
