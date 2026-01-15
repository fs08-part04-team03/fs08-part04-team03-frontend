import type { Meta, StoryObj } from '@storybook/nextjs';
import LandingHero from './LandingHeroOrgn';

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof LandingHero> = {
  title: 'Features/Landing/LandingHero',
  component: LandingHero,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    // Next.js router mocking for storybook
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (_url: string) => {},
      },
    },
    docs: {
      description: {
        component: `
### 개요
랜딩 페이지의 최상단 메인 히어로 섹션입니다.

### 주요 특징
*   **반응형 레이아웃**: 모바일, 태블릿, 데스크탑 등 디바이스 해상도에 맞춰 레이아웃이 최적화됩니다.
*   **CTA (Call To Action)**: 유저의 가입을 유도하는 'Sign Now' 버튼을 포함하고 있습니다.
*   **직관적인 메시지**: 서비스의 핵심 가치를 전달하는 헤드라인과 서브 텍스트로 구성됩니다.

### 사용 가이드
이 컴포넌트는 페이지의 최상단에 배치하여 유저의 이목을 집중시키는 용도로 사용하세요.

### 인터랙션
*   **Sign Now 버튼 클릭**: 회원가입(Sign Up) 페이지로 이동합니다. 
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LandingHero>;

export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      story: '기본적인 히어로 섹션의 모습입니다. 뷰포트를 조절하여 반응형 동작을 확인해보세요.',
    },
  },
};
