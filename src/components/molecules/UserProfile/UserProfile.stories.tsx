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
          '사용자 프로필 컴포넌트입니다. 아바타, 이름, 회사명을 조합하여 사용자 정보를 표시합니다.\n\n**Variant 종류:**\n- `default`: 모든 뷰포트에서 아바타, 이름(text-15), 회사명을 표시합니다.\n- `secondary`: 모바일에서는 숨겨지고, 태블릿/데스크탑에서만 아바타, 이름(text-14), 회사명을 표시합니다.\n- `nameOnly`: 모든 뷰포트에서 아바타와 이름(text-14)만 표시하며, 회사명은 표시하지 않습니다.\n\n**기능:**\n- 클릭 시 profileHref로 지정된 프로필 페이지로 이동합니다 (기본값: /me/profile).\n- 아바타 크기는 32x32로 고정되어 있습니다.\n- hover 시 opacity-80으로 시각적 피드백을 제공합니다.',
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
      options: ['default', 'secondary', 'nameOnly'],
      description:
        'variant: default (모든 뷰포트에서 아바타+이름+회사명 표시), secondary (태블릿/데스크탑에서만 아바타+이름+회사명 표시), nameOnly (모든 뷰포트에서 아바타+이름만 표시)',
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

// NameOnly variant (아바타와 이름만 표시)
export const NameOnly: Story = {
  args: {
    name: '홍길동',
    company: {
      name: '스낵코리아',
    },
    variant: 'nameOnly',
  },
  parameters: {
    docs: {
      description: {
        story:
          'NameOnly variant입니다. 모든 뷰포트에서 아바타와 이름만 표시되며, 회사명은 표시되지 않습니다. 공간이 제한된 경우나 회사 정보가 불필요한 경우에 사용합니다.',
      },
    },
  },
};

// NameOnly variant with avatar
export const NameOnlyWithAvatar: Story = {
  args: {
    name: '홍길동',
    company: {
      name: '스낵코리아',
    },
    avatarSrc: '/images/test-profile-image.jpg',
    variant: 'nameOnly',
  },
  parameters: {
    docs: {
      description: {
        story:
          'NameOnly variant에 아바타 이미지가 있는 프로필입니다. 모든 뷰포트에서 아바타와 이름만 표시됩니다.',
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
