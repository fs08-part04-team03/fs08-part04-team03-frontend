import type { Meta, StoryObj } from '@storybook/nextjs';
import { LandingMarqueeOrgn } from './LandingMarqueeOrgn';

const DUMMY_ITEMS = [
  { id: 1, text: '흩어진 간식 구매처를 통합하고,\n기수별 지출을 똑똑하게 관리하세요.' },
  { id: 2, text: '관리자와 유저\n모두 이용할 수 있어요.' },
  { id: 3, text: '다양한 품목도\n한 눈에 파악해봐요.' },
  { id: 4, text: '쉽고 빠르게\n구매를 요청해보세요.' },
  { id: 5, text: '여러 플랫폼에서 구매한 간식 내역을\n한 곳에서 쉽게 관리해요' },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof LandingMarqueeOrgn> = {
  title: 'Features/Landing/LandingMarqueeOrgn',
  component: LandingMarqueeOrgn,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### 개요
랜딩 페이지 하단에 고정되어 끊김 없이 흐르는 무한 스크롤 마키(Marquee) 컴포넌트

### 주요 기능
- **반응형 동작 가이드**
  - **Mobile**: 2줄(Row)로 표시되며, 두 번째 줄은 교차되어 진행
  - **Tablet/Desktop**: 1줄로 통합되어 길게 진행
  
- **Infinite Scroll**
  - CSS Animation을 사용하여 텍스트가 끊김 없이 무한히 흐르는 효과를 제공
  
- **Overlay Effect**
  - 배경에 \`linear-gradient\`가 적용되어 있어 본문 위로 자연스럽게 오버레이되는 효과를 제공
        `,
      },
    },
  },
  args: {
    items: DUMMY_ITEMS,
  },
  argTypes: {
    className: {
      description: '추가적인 스타일링을 위한 클래스명 (주로 위치 조정용)',
      control: 'text',
    },
    items: {
      description: 'Marquee에 표시될 텍스트 아이템 배열',
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LandingMarqueeOrgn>;

/** =====================
 * Default
 ====================== */
export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};
