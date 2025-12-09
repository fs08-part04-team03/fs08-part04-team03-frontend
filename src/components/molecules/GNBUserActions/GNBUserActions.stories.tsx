import type { Meta, StoryObj } from '@storybook/nextjs';
import UserProfile from '@/components/molecules/UserProfile/UserProfile';
import { GNBUserActions } from './GNBUserActions';

const meta = {
  title: 'Molecules/GNBUserActions',
  component: GNBUserActions,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'GNB 우측 사용자 액션 영역 컴포넌트입니다. 장바구니, 찜목록, 유저프로필, 로그아웃, 햄버거 메뉴를 포함합니다.',
      },
    },
  },
  argTypes: {
    onLogout: {
      action: 'logout',
      description: '로그아웃 클릭 시 호출되는 콜백',
    },
    onMenuClick: {
      action: 'menu-click',
      description: '햄버거 메뉴 클릭 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof GNBUserActions>;

export default meta;

type Story = StoryObj<typeof GNBUserActions>;

export const Default: Story = {
  args: {
    companyId: 'company-1',
    cartCount: 0,
    userProfile: (
      <UserProfile
        name="홍길동"
        company={{ name: '스낵코리아' }}
        avatarSrc="/images/test-profile-image.jpg"
      />
    ),
  },
};

export const WithoutLogout: Story = {
  args: {
    companyId: 'company-1',
    cartCount: 5,
    userProfile: <UserProfile name="김철수" company={{ name: '테크스타트업' }} />,
  },
};
