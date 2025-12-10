import type { Meta, StoryObj } from '@storybook/nextjs';
import GNBPrimaryNav from './GNBPrimaryNav';

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
    activePath: {
      control: 'text',
      description: '현재 활성화된 경로 (선택사항)',
    },
    onItemClick: {
      action: 'item-clicked',
      description: '네비게이션 메뉴 아이템 클릭 시 호출되는 콜백',
    },
    navClassName: {
      control: 'text',
      description: '데스크탑 네비게이션 메뉴에 적용할 추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof GNBPrimaryNav>;

export default meta;

type Story = StoryObj<typeof meta>;

// 1) User 역할
export const UserRole: Story = {
  args: {
    role: 'user',
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
