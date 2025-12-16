import type { Meta, StoryObj } from '@storybook/nextjs';
import GNBBrand from './GNBBrand';

const meta = {
  title: 'Molecules/GNBBrand',
  component: GNBBrand,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'GNB(Global Navigation Bar)의 브랜드 영역을 담당하는 컴포넌트입니다.\n- 로고를 렌더링하고, 클릭 시 홈(루트 경로)로 이동합니다.\n- 상단 GNB의 좌측 영역에 배치됩니다.',
      },
    },
  },
} satisfies Meta<typeof GNBBrand>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '가장 기본 형태의 브랜드 컴포넌트입니다. 기본 로고만 표시하며, 클릭하면 홈으로 이동합니다.',
      },
    },
  },
};
