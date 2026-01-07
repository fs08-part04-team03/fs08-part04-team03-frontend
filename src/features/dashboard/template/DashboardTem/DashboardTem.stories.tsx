import type { Meta, StoryObj } from '@storybook/nextjs';
import type {
  UserRole,
  NewUser,
  ChangedUser,
  LargeChartItem,
} from '@/features/dashboard/components/DashboardCardOrg/DashboardCardOrg';
import DashboardTem from './DashboardTem';

/** =====================
 * Mock Data
 ====================== */
const mockUser = {
  name: '홍길동',
};

const mockCompanyId = 'company-123';

/** 월별 지출 */
const mockMonthlyExpenses: number[] = [120, 200, 150, 300, 280, 350, 50, 400, 320, 450, 500, 600];

/** 신규 회원 */
const mockNewUsers: NewUser[] = [
  {
    id: '1',
    name: '김철수',
    email: 'chulsoo@test.com',
    role: 'user',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: '이영희',
    email: 'younghee@test.com',
    role: 'manager',
    createdAt: '2024-01-12',
  },
];

/** 탈퇴 / 권한 변경 */
const mockChangedUsers: ChangedUser[] = [
  {
    id: '3',
    name: '박민수',
    email: 'minsoo@test.com',
    changeType: 'roleChange',
    beforeRole: 'user',
    afterRole: 'manager',
    changedAt: '2024-01-15',
  },
];

/** 간식 요청 랭킹 */
const mockSnackRank: LargeChartItem[] = [
  { label: '초코파이', value: 42, color: '#2563EB' },
  { label: '새우깡', value: 28, color: '#10B981' },
  { label: '포카칩', value: 18, color: '#F59E0B' },
  { label: '홈런볼', value: 12, color: '#EF4444' },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof DashboardTem> = {
  title: 'Features/Dashboard/Template/DashboardTem',
  component: DashboardTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
관리자 대시보드 화면의 **Template 레벨 컴포넌트**입니다.

> ⚠️ **본 페이지는 Admin 권한 사용자만 접근 가능합니다.**

좌측의 \`AdminSidebar\` 와  
우측의 **Dashboard 콘텐츠 영역**을 조합하여  
관리자 페이지의 전체 레이아웃 구조를 담당합니다.

---

## 역할 (Responsibility)

- **Admin 전용 레이아웃 구성**
  - 좌측: \`AdminSidebar\`
  - 우측: Dashboard 메인 콘텐츠 영역
- 사용자 이름 기반의  
  **"{user.name}의 Dashboard" 타이틀 렌더링**
- Dashboard 카드 영역 레이아웃 관리
  - 반응형 (Mobile / Tablet / Desktop)
  - 카드 간 간격 및 배치 책임

> ⚠️ 본 Template 컴포넌트는  
> - 실제 API 호출  
> - 비즈니스 로직  
> 을 포함하지 않으며  
> **데이터는 상위(Page / Story)에서 주입받습니다.**

---

## 접근 제어 (Access Control)

- ✅ **Admin**: 접근 가능
- ❌ **User / Manager**: 접근 불가  
  → 실제 서비스에서는 **Route Guard / Middleware**에서 제어
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardTem>;

/** =====================
 * Default (Admin)
 ====================== */
export const Default: Story = {
  args: {
    companyId: mockCompanyId,
    user: mockUser,
    userRole: 'admin' as UserRole,

    monthlyExpenses: mockMonthlyExpenses,
    newUsers: mockNewUsers,
    changedUsers: mockChangedUsers,
    snackRank: mockSnackRank,
  },
};

/** =====================
 * Long User Name
 ====================== */
export const LongUserName: Story = {
  args: {
    companyId: mockCompanyId,
    user: {
      name: '아주아주긴이름을가진관리자',
    },
    userRole: 'admin' as UserRole,

    monthlyExpenses: mockMonthlyExpenses,
    newUsers: mockNewUsers,
    changedUsers: mockChangedUsers,
    snackRank: mockSnackRank,
  },
};

/** =====================
 * Non Admin (Access Restricted)
 ====================== */
export const NonAdmin: Story = {
  args: {
    companyId: mockCompanyId,
    user: mockUser,
    userRole: 'user' as UserRole,

    monthlyExpenses: mockMonthlyExpenses,
    newUsers: mockNewUsers,
    changedUsers: mockChangedUsers,
    snackRank: mockSnackRank,
  },
};
