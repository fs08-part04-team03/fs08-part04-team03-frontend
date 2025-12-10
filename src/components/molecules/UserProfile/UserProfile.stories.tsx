import type { Meta, StoryObj } from '@storybook/nextjs';
import UserProfile, { UserProfileDefault } from './UserProfile';

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
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
      description: 'variant: default (모든 뷰포트 표시), secondary (모바일 숨김)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof UserProfile>;

export default meta;

type Story = StoryObj<typeof meta>;

// Secondary variant (모바일 숨김, 태블릿/데스크탑에서만 표시)
export const Secondary: Story = {
  args: {
    name: '홍길동',
    company: {
      name: '스낵코리아',
    },
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Secondary variant입니다. 모바일에서는 숨겨지고, 태블릿과 데스크탑에서만 표시됩니다.',
      },
    },
  },
};

// Secondary variant with avatar
export const SecondaryWithAvatar: Story = {
  args: {
    name: '홍길동',
    company: {
      name: '스낵코리아',
    },
    avatarSrc: '/images/test-profile-image.jpg',
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Secondary variant에 아바타 이미지가 있는 프로필입니다. 모바일에서는 숨겨지고, 태블릿과 데스크탑에서만 표시됩니다.',
      },
    },
  },
};

// Default variant (모든 뷰포트에서 동일하게 표시)
export const Default: Story = {
  args: {
    name: '홍길동',
    company: {
      name: '스낵코리아',
    },
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default variant입니다. 모든 뷰포트에서 동일하게 표시됩니다. 모바일에서도 아바타, 이름, 회사명이 모두 표시됩니다.',
      },
    },
  },
};

// Default variant with avatar
export const DefaultWithAvatar: Story = {
  args: {
    name: '홍길동',
    company: {
      name: '스낵코리아',
    },
    avatarSrc: '/images/test-profile-image.jpg',
    variant: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default variant에 아바타 이미지가 있는 프로필입니다. 모든 뷰포트에서 동일하게 표시됩니다.',
      },
    },
  },
};

// UserProfileDefault: 모든 뷰포트에서 사용, 모바일에서도 아바타 표시
export const DefaultVariant: StoryObj<typeof UserProfileDefault> = {
  render: (args) => (
    <UserProfileDefault
      name={args.name}
      company={args.company}
      avatarSrc={args.avatarSrc}
      profileHref={args.profileHref}
      className={args.className}
    />
  ),
  args: {
    name: '홍길동',
    company: {
      name: '스낵코리아',
    },
    avatarSrc: '/images/test-profile-image.jpg',
  },
  parameters: {
    docs: {
      description: {
        story:
          'UserProfileDefault 컴포넌트입니다. 모든 뷰포트에서 사용 가능하며, 모바일에서도 아바타가 표시됩니다. 태블릿/데스크탑에서는 이름과 회사명도 함께 표시됩니다.',
      },
    },
  },
};
