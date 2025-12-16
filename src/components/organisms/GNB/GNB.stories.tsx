import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { PARENT_CATEGORY_OPTIONS } from '@/constants';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import GNB from './GNB';

const meta = {
  title: 'Organisms/GNB',
  component: GNB,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-1/products',
        segments: ['company-1'],
      },
    },
    docs: {
      description: {
        component:
          '전역 네비게이션 바 컴포넌트입니다. Brand, PrimaryNav, CategorySwitcher, UserActions를 통합하여 반응형으로 동작합니다. 모바일/태블릿에서 햄버거 메뉴를 클릭하면 오른쪽에서 사이드바가 열립니다.',
      },
      canvas: {
        withToolbar: true,
      },
    },
  },
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'manager', 'admin'],
      description: '사용자 역할',
    },
    cartCount: {
      control: 'number',
      description: '장바구니에 담긴 상품 개수',
    },
    onLogout: {
      action: 'logout',
      description: '로그아웃 클릭 시 호출되는 콜백',
    },
    onMenuClick: {
      action: 'menu-click',
      description: '햄버거 메뉴 클릭 시 호출되는 콜백',
    },
    onNavItemClick: {
      action: 'nav-item-clicked',
      description: '네비게이션 아이템 클릭 시 호출되는 콜백',
    },
    onCategoryChange: {
      action: 'category-changed',
      description: '카테고리 변경 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof GNB>;

export default meta;

type Story = StoryObj<typeof GNB>;

export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  render: ({ role, activeCategoryId: initialCategoryId, onCategoryChange, ...args }) => {
    const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId ?? 'drink');

    return (
      <div className="w-full min-h-screen bg-gray-50">
        <GNB
          role={role ?? 'user'}
          userProfile={args.userProfile}
          cartCount={args.cartCount}
          onLogout={args.onLogout}
          onMenuClick={args.onMenuClick}
          onNavItemClick={args.onNavItemClick}
          activePath={args.activePath}
          className={args.className}
          categories={PARENT_CATEGORY_OPTIONS}
          activeCategoryId={activeCategoryId}
          onCategoryChange={(id) => {
            setActiveCategoryId(id);
            onCategoryChange?.(id);
          }}
        />
        <main className="p-24">
          <div className="max-w-1200 mx-auto">
            <h1 className="text-24 font-bold mb-16">GNB 컴포넌트 예시</h1>
            <p className="text-16 text-gray-600 mb-8">
              상단의 GNB를 통해 네비게이션과 사용자 액션을 확인할 수 있습니다.
            </p>
            <div className="space-y-8">
              <p className="text-14 text-gray-500">
                - 모바일: Brand | CategorySwitcher | UserActions (햄버거 메뉴)
              </p>
              <p className="text-14 text-gray-500">- 태블릿: Brand | UserActions (햄버거 메뉴)</p>
              <p className="text-14 text-gray-500">- 데스크탑: Brand | PrimaryNav | UserActions</p>
              <p className="text-14 text-gray-600 mt-16">
                💡 모바일/태블릿 뷰포트에서 우측 상단의 햄버거 메뉴를 클릭하면 사이드바가 열립니다.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  },
  args: {
    role: 'user',
    cartCount: 3,
    userProfile: (
      <UserProfile
        name="홍길동"
        company={{ name: '스낵코리아' }}
        avatarSrc="/images/test-profile-image.jpg"
        variant="secondary"
      />
    ),
    activeCategoryId: 'drink' as const,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      canvas: {
        withToolbar: true,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      canvas: {
        withToolbar: true,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      canvas: {
        withToolbar: true,
      },
    },
  },
  render: Default.render,
  args: Default.args,
};
