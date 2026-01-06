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
랜딩 페이지 하단에서 정보를 흘려보내는 **무한 스크롤 마키(Marquee)** 섹션입니다.

### 주요 특징
*   **끊김 없는 애니메이션**: CSS Keyframes 애니메이션을 활용하여 텍스트가 왼쪽으로 자연스럽게 흐릅니다.
*   **반응형 레이아웃**:
    *   **Mobile (<768px)**: 2줄(Row)로 구성되어 더 많은 정보를 밀도 있게 보여줍니다. 두 번째 줄은 반박자 늦게 시작하여 서로 다른 정보를 엇갈려 보여줍니다.
    *   **Tablet/Desktop (≥768px)**: 1줄(Row)로 시원하게 배치되어 가독성을 높입니다.

### 사용 방법
\`items\` prop에 표시하고 싶은 텍스트 배열을 전달하여 사용합니다. 각 아이템은 자동으로 카드 형태의 스타일이 적용됩니다.
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

export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      story:
        '기본 마키 컴포넌트입니다. 화면 너비에 따라 1줄 또는 2줄로 변하는 반응형 레이아웃을 확인해보세요.',
    },
  },
};
