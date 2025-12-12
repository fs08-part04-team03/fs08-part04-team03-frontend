import type { Meta, StoryObj } from '@storybook/nextjs';
import GNBPrimaryNav, { GNBPrimaryNavSidebar } from './GNBPrimaryNav';

const meta = {
  title: 'Molecules/GNBPrimaryNav',
  component: GNBPrimaryNav,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/products',
      },
    },
    docs: {
      description: {
        component:
          'GNB(Global Navigation Bar) 상단의 텍스트 네비게이션 바입니다. 역할(user, manager, admin)에 따라 보여지는 메뉴가 달라지며, 현재 경로가 일치하는 메뉴는 강조 스타일이 적용됩니다.',
      },
    },
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'manager', 'admin'],
      description: '사용자 역할',
    },
    companyId: {
      control: 'text',
      description: '회사 스코프 라우팅에 사용할 companyId',
    },
    activePath: {
      control: 'text',
      description: '현재 활성화된 경로 (선택사항)',
    },
    onItemClick: {
      action: 'item-clicked',
      description: '네비게이션 메뉴 아이템 클릭 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof GNBPrimaryNav>;

export default meta;

type Story = StoryObj<typeof meta>;

// 1) User 역할
export const UserRole: Story = {
  args: {
    role: 'user',
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story: '일반 사용자(user) 역할의 메뉴입니다. 상품 리스트와 구매 요청 내역만 표시됩니다.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// 2) Manager 역할
export const ManagerRole: Story = {
  args: {
    role: 'manager',
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '매니저(manager) 역할의 메뉴입니다. 상품 등록 내역, 구매 요청 관리, 구매 내역 확인이 추가로 표시됩니다.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// 3) Admin 역할
export const AdminRole: Story = {
  args: {
    role: 'admin',
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story: '관리자(admin) 역할의 메뉴입니다. 모든 메뉴가 표시되며 관리 메뉴가 추가됩니다.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

// ===== Sidebar 스토리 =====

export const SidebarUser: StoryObj<typeof GNBPrimaryNavSidebar> = {
  render: (args) => (
    <div className="w-225 h-screen bg-white shadow-lg p-16">
      <GNBPrimaryNavSidebar
        role={args.role}
        companyId={args.companyId}
        activePath={args.activePath}
        onItemClick={args.onItemClick}
        onProfileClick={args.onProfileClick}
        onLogout={args.onLogout}
      />
    </div>
  ),
  args: {
    role: 'user',
    companyId: 'company-1',
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '일반 사용자(user) 역할의 사이드바 메뉴입니다.',
      },
    },
  },
};

export const SidebarManager: StoryObj<typeof GNBPrimaryNavSidebar> = {
  render: (args) => (
    <div className="w-225 h-screen bg-white shadow-lg p-16">
      <GNBPrimaryNavSidebar
        role={args.role}
        companyId={args.companyId}
        activePath={args.activePath}
        onItemClick={args.onItemClick}
        onProfileClick={args.onProfileClick}
        onLogout={args.onLogout}
      />
    </div>
  ),
  args: {
    role: 'manager',
    companyId: 'company-1',
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '매니저(manager) 역할의 사이드바 메뉴입니다.',
      },
    },
  },
};

export const SidebarAdmin: StoryObj<typeof GNBPrimaryNavSidebar> = {
  render: (args) => (
    <div className="w-225 h-screen bg-white shadow-lg p-16">
      <GNBPrimaryNavSidebar
        role={args.role}
        companyId={args.companyId}
        activePath={args.activePath}
        onItemClick={args.onItemClick}
        onProfileClick={args.onProfileClick}
        onLogout={args.onLogout}
      />
    </div>
  ),
  args: {
    role: 'admin',
    companyId: 'company-1',
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '관리자(admin) 역할의 사이드바 메뉴입니다.',
      },
    },
  },
};

export const SidebarWithoutLogout: StoryObj<typeof GNBPrimaryNavSidebar> = {
  render: (args) => (
    <div className="w-225 h-screen bg-white shadow-lg p-16">
      <GNBPrimaryNavSidebar
        role={args.role}
        companyId={args.companyId}
        activePath={args.activePath}
        onItemClick={args.onItemClick}
        onProfileClick={args.onProfileClick}
        onLogout={args.onLogout}
      />
    </div>
  ),
  args: {
    role: 'user',
    companyId: 'company-1',
    // onLogout이 없으면 로그아웃 버튼이 표시되지 않음
  },
  parameters: {
    docs: {
      description: {
        story:
          '로그아웃 버튼이 없는 사이드바 메뉴입니다. onLogout prop이 없으면 로그아웃 버튼이 표시되지 않습니다.',
      },
    },
  },
};
