import type { Meta, StoryObj } from '@storybook/nextjs';
import AuthHeader from './AuthHeader';

const meta = {
  title: 'Organisms/AuthHeader',
  component: AuthHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        segments: [],
      },
    },
    docs: {
      description: {
        component:
          '인증되지 않은 사용자를 위한 헤더 컴포넌트입니다. 로그인 및 회원가입 링크를 제공하며, 현재 페이지에 따라 해당 링크를 숨깁니다. 모바일에서는 &quot;기업 담당자 회원가입&quot;이 &quot;기업가입&quot;으로 축약되어 표시됩니다.',
      },
      canvas: {
        withToolbar: true,
      },
    },
  },
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
} satisfies Meta<typeof AuthHeader>;

export default meta;

type Story = StoryObj<typeof AuthHeader>;

export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    nextjs: {
      navigation: {
        pathname: '/',
        segments: [],
      },
    },
    docs: {
      description: {
        story:
          '홈 페이지에서 보이는 기본 헤더입니다. 로그인과 기업 담당자 회원가입 링크가 모두 표시됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="w-full min-h-screen bg-gray-50">
      <AuthHeader className={args.className} />
      <main className="p-24">
        <div className="max-w-1200 mx-auto">
          <h1 className="text-24 font-bold mb-16">AuthHeader 컴포넌트 예시</h1>
          <p className="text-16 text-gray-600 mb-8">
            상단의 AuthHeader를 통해 로그인 및 회원가입 링크를 확인할 수 있습니다.
          </p>
          <div className="space-y-8">
            <p className="text-14 text-gray-500">
              - 현재 페이지가 로그인 페이지가 아니므로 로그인 링크가 표시됩니다.
            </p>
            <p className="text-14 text-gray-500">
              - 현재 페이지가 회원가입 페이지가 아니므로 회원가입 링크가 표시됩니다.
            </p>
            <p className="text-14 text-gray-500">
              - 데스크탑/태블릿: &quot;기업 담당자 회원가입&quot; 전체 텍스트 표시
            </p>
            <p className="text-14 text-gray-500">- 모바일: &quot;기업가입&quot;으로 축약 표시</p>
          </div>
        </div>
      </main>
    </div>
  ),
};

export const OnLoginPage: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    nextjs: {
      navigation: {
        pathname: '/login',
        segments: ['login'],
      },
    },
    docs: {
      description: {
        story:
          '로그인 페이지에서 보이는 헤더입니다. 로그인 링크는 숨겨지고 회원가입 링크만 표시됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="w-full min-h-screen bg-gray-50">
      <AuthHeader className={args.className} />
      <main className="p-24">
        <div className="max-w-1200 mx-auto">
          <h1 className="text-24 font-bold mb-16">로그인 페이지</h1>
          <p className="text-16 text-gray-600 mb-8">
            로그인 페이지에서는 로그인 링크가 숨겨지고 회원가입 링크만 표시됩니다.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const OnSignupPage: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    nextjs: {
      navigation: {
        pathname: '/signup',
        segments: ['signup'],
      },
    },
    docs: {
      description: {
        story:
          '회원가입 페이지에서 보이는 헤더입니다. 회원가입 링크는 숨겨지고 로그인 링크만 표시됩니다.',
      },
    },
  },
  render: (args) => (
    <div className="w-full min-h-screen bg-gray-50">
      <AuthHeader className={args.className} />
      <main className="p-24">
        <div className="max-w-1200 mx-auto">
          <h1 className="text-24 font-bold mb-16">회원가입 페이지</h1>
          <p className="text-16 text-gray-600 mb-8">
            회원가입 페이지에서는 회원가입 링크가 숨겨지고 로그인 링크만 표시됩니다.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    nextjs: {
      navigation: {
        pathname: '/',
        segments: [],
      },
    },
    docs: {
      description: {
        story:
          '모바일 뷰포트에서 보이는 헤더입니다. &quot;기업 담당자 회원가입&quot;이 &quot;기업가입&quot;으로 축약되어 표시됩니다.',
      },
      canvas: {
        withToolbar: true,
      },
    },
  },
  render: (args) => (
    <div className="w-full min-h-screen bg-gray-50">
      <AuthHeader className={args.className} />
      <main className="p-16">
        <div className="max-w-1200 mx-auto">
          <h1 className="text-20 font-bold mb-12">모바일 뷰</h1>
          <p className="text-14 text-gray-600 mb-8">
            모바일에서는 텍스트가 축약되어 표시됩니다: &quot;기업가입&quot;
          </p>
        </div>
      </main>
    </div>
  ),
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    nextjs: {
      navigation: {
        pathname: '/',
        segments: [],
      },
    },
    docs: {
      description: {
        story: '태블릿 뷰포트에서 보이는 헤더입니다. 전체 텍스트가 표시됩니다.',
      },
      canvas: {
        withToolbar: true,
      },
    },
  },
  render: Default.render,
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    nextjs: {
      navigation: {
        pathname: '/',
        segments: [],
      },
    },
    docs: {
      description: {
        story: '데스크탑 뷰포트에서 보이는 헤더입니다. 전체 텍스트가 표시됩니다.',
      },
      canvas: {
        withToolbar: true,
      },
    },
  },
  render: Default.render,
};
