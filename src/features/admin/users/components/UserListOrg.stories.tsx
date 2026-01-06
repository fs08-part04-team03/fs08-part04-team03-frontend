import type { Meta, StoryObj } from '@storybook/nextjs';
import { User } from '@/features/admin/users/api/adminUser.api';
import UserList from './UserListOrg';

const meta: Meta<typeof UserList> = {
  title: 'Features/Admin/Users/UserListOrg',
  component: UserList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 개요
관리자 페이지의 사용자 목록 조회 컴포넌트입니다.

### 주요 특징
-   **반응형 디자인**: 모바일, 태블릿, 데스크탑 환경에 최적화된 레이아웃을 제공합니다.
    -   모바일: 카드 형태의 리스트
    -   테블릿/데스크탑: 테이블 형태의 리스트
-   **사용자 관리**: 각 사용자의 권한 변경 및 계정 탈퇴 기능을 제공합니다.
-   **데이터 없음 상태**: 표시할 사용자가 없을 때 안내 메시지를 보여줍니다.

### 인터랙션
-   **권한 변경**: 
    -   모바일: 케밥 메뉴 > 권한 변경 선택
    -   데스크탑: '권한 변경' 버튼 클릭
-   **계정 탈퇴**:
    -   데스크탑: '계정 탈퇴' 버튼 클릭
`,
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    users: {
      description: '표시할 사용자 목록 데이터입니다.',
    },
    onRoleChange: {
      description: '권한 변경 버튼 클릭 시 호출되는 콜백 함수입니다.',
    },
    onDelete: {
      description: '계정 탈퇴 버튼 클릭 시 호출되는 콜백 함수입니다.',
    },
  },
  args: {
    // eslint-disable-next-line no-alert
    onRoleChange: () => alert('권한 변경 클릭됨'),
    // eslint-disable-next-line no-alert
    onDelete: () => alert('계정 탈퇴 클릭됨'),
  },
};

export default meta;
type Story = StoryObj<typeof UserList>;

/**
 * 테스트를 위한 가상 사용자 데이터입니다.
 * 다양한 역할(ADMIN, MANAGER, USER)과 상태(활성/비활성)를 포함합니다.
 */
const mockUsers: User[] = [
  {
    id: '1',
    name: '김관리',
    email: 'admin@example.com',
    role: 'ADMIN',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    isActive: true,
  },
  {
    id: '2',
    name: '이매니저',
    email: 'manager@example.com',
    role: 'MANAGER',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager',
    isActive: true,
  },
  {
    id: '3',
    name: '박사원',
    email: 'user@example.com',
    role: 'USER',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
    isActive: true,
  },
  {
    id: '4',
    name: '최사원',
    email: 'choi@example.com',
    role: 'USER',
    avatarUrl: undefined, // No avatar
    isActive: false,
  },
];

/**
 * **기본 상태 (Default)**
 *
 * - 가상 사용자 목록이 표시됩니다.
 * - 반응형 뷰포트를 조절하며 각 브레이크포인트에서의 변화를 확인할 수 있습니다.
 */
export const Default: Story = {
  args: {
    users: mockUsers,
  },
  render: (args) => (
    <UserList users={args.users} onRoleChange={args.onRoleChange} onDelete={args.onDelete} />
  ),
};

/**
 * **데이터가 없는 상태 (Empty)**
 *
 * - 사용자 목록이 비어있을 경우 메시지가 표시됩니다.
 */
export const Empty: Story = {
  args: {
    users: [],
  },
  render: (args) => (
    <UserList users={args.users} onRoleChange={args.onRoleChange} onDelete={args.onDelete} />
  ),
};
