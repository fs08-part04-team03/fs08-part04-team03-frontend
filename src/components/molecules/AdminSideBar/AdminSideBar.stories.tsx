import type { Meta, StoryObj } from '@storybook/nextjs';
import {
  AdminSidebar,
  AdminSidebarMenuItemMobile,
  AdminSidebarMenuItemTablet,
  AdminSidebarMenuItemDesktop,
} from './AdminSideBar';

const meta = {
  title: 'Molecules/AdminSideBar',
  component: AdminSidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '관리자 사이드바 컴포넌트입니다. 회원 관리, 예산 관리 등의 메뉴를 표시합니다. 뷰포트별로 다른 레이아웃을 제공합니다.',
      },
    },
  },
} satisfies Meta<typeof AdminSidebar>;

export default meta;

type Story = StoryObj<typeof AdminSidebar>;

export const Default: Story = {
  args: {
    companyId: 'company-1',
    role: 'admin',
  },
};

export const MobileView: Story = {
  render: () => (
    <div className="w-full max-w-375">
      <aside className="flex flex-row gap-0 border-b border-gray-200">
        <AdminSidebarMenuItemMobile
          href="/company-1/admin/users"
          iconSrc="/icons/user.svg"
          label="회원 관리"
          active
        />
        <AdminSidebarMenuItemMobile
          href="/company-1/admin/budget"
          iconSrc="/icons/coin-outline.svg"
          label="예산 관리"
          active={false}
        />
      </aside>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모바일 뷰 (~ 743px): 가로 탭 형태, 밑줄 강조',
      },
    },
  },
};

export const TabletView: Story = {
  render: () => (
    <div className="w-full max-w-744">
      <aside className="flex flex-row gap-0 border-b border-gray-200">
        <AdminSidebarMenuItemTablet
          href="/company-1/admin/users"
          iconSrc="/icons/user.svg"
          label="회원 관리"
          active
        />
        <AdminSidebarMenuItemTablet
          href="/company-1/admin/budget"
          iconSrc="/icons/coin-outline.svg"
          label="예산 관리"
          active={false}
        />
      </aside>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '태블릿 뷰 (744px ~ 1199px): 가로 탭 형태, 밑줄 강조',
      },
    },
  },
};

export const DesktopView: Story = {
  render: () => (
    <div className="w-200">
      <aside className="flex flex-col gap-4">
        <AdminSidebarMenuItemDesktop
          href="/company-1/admin/users"
          iconSrc="/icons/user.svg"
          label="회원 관리"
          active
        />
        <AdminSidebarMenuItemDesktop
          href="/company-1/admin/budget"
          iconSrc="/icons/coin-outline.svg"
          label="예산 관리"
          active={false}
        />
      </aside>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '데스크톱 뷰 (1200px ~): 세로 사이드바, 배경색 강조',
      },
    },
  },
};
