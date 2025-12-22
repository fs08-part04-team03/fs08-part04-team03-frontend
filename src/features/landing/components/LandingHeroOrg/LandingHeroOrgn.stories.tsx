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
    },
    docs: {
      description: {
        component: `
### 개요
랜딩 페이지의 최상단 히어로 섹션입니다.

### 주요 기능
- **반응형 레이아웃**: 요소 간의 간격(Margin)과 CTA 버튼의 크기가 해상도별로 조정됩니다.
- **CTA (Call to Action)**: 'Sign Now' 버튼을 통해 \`/signup\` 페이지로 이동합니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LandingHero>;

/** =====================
 * Default (Responsive)
 ====================== */
export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
