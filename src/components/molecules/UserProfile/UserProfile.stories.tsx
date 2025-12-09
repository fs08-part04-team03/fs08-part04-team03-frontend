import type { Meta, StoryObj } from '@storybook/nextjs';
import UserProfile from './UserProfile';

const meta = {
  title: 'Molecules/UserProfile',
  component: UserProfile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '사용자 프로필 컴포넌트입니다. 태블릿과 데스크탑에서 아바타와 이름이 표시되며, 모바일에서는 숨겨집니다. 클릭 시 프로필 페이지로 이동합니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: '사용자 이름',
    },
    company: {
      control: 'object',
      description: '회사 정보',
    },
    avatarSrc: {
      control: 'text',
      description: '아바타 이미지 URL',
    },
    profileHref: {
      control: 'text',
      description: '프로필 페이지 링크 (기본값: /me/profile)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof UserProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본 (아바타 없음, 태블릿/데스크탑에서만 표시)
export const Default: Story = {
  args: {
    name: 'Name',
    company: {
      name: 'Company Name',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 프로필입니다. 아바타 이미지가 없을 때 기본 아이콘이 표시됩니다. 태블릿과 데스크탑에서만 보입니다.',
      },
    },
  },
};

// 아바타 이미지 있음
export const WithProfileImage: Story = {
  args: {
    name: 'Name',
    company: {
      name: 'Company Name',
    },
    avatarSrc: '/images/test-profile-image.jpg',
  },
  parameters: {
    docs: {
      description: {
        story: '아바타 이미지가 있는 프로필입니다. 태블릿과 데스크탑에서만 보입니다.',
      },
    },
  },
};
