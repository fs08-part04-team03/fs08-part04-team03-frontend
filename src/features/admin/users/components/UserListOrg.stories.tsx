import type { Meta, StoryObj } from '@storybook/nextjs';
import UserList, { User } from './UserListOrg';

/**
 * 사용자 목록을 표시하는 컴포넌트입니다.
 * 관리자는 이 목록에서 사용자의 역할을 변경하거나 탈퇴 처리할 수 있습니다.
 */
const meta: Meta<typeof UserList> = {
  title: 'Features/Admin/Users/UserListOrg',
  component: UserList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRoleChange: { action: 'role changed' },
    onDelete: { action: 'deleted' },
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
 * 기본 상태의 스토리입니다.
 * 가상 사용자 목록이 정상적으로 표시되는지 확인합니다.
 */
export const Default: Story = {
  args: {
    users: mockUsers,
  },
};

/**
 * 데이터가 없을 때의 스토리입니다.
 * 사용자 목록이 비어있을 때 안내 메시지가 표시되어야 합니다.
 */
export const Empty: Story = {
  args: {
    users: [],
  },
};
