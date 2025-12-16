import type { Meta, StoryObj } from '@storybook/nextjs';
import AccordionPanel from './AccordionPanel';

const meta: Meta<typeof AccordionPanel> = {
  title: 'Organisms/AccordionPanel',
  component: AccordionPanel,
  tags: ['autodocs'],
  args: {
    label: '기본 아코디언 텍스트',
    content: '아코디언 내용이 여기에 표시됩니다.',
  },
};

export default meta;
type Story = StoryObj<typeof AccordionPanel>;

export const Default: Story = {
  args: {
    label: '기본 아코디언',
    content: '기본 아코디언 내용입니다.',
  },
};

/**
 * 여러 개의 AccordionPanel을 렌더링하는 스토리
 */
export const MultipleAccordion: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <AccordionPanel label="아코디언 1" content="첫 번째 아코디언의 내용입니다." />
      <AccordionPanel label="아코디언 2" content="두 번째 아코디언의 내용입니다." />
      <AccordionPanel
        label="아코디언 3"
        content="세 번째 아코디언의 내용입니다."
        subContent="아래의 추가 내용입니다."
      />
    </div>
  ),
};
