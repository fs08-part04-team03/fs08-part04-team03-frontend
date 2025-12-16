import type { Meta, StoryObj } from '@storybook/nextjs';
import StatusNotice from './StatusNotice';

const meta: Meta<typeof StatusNotice> = {
  title: 'Molecules/StatusNotice',
  component: StatusNotice,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onButtonClick: { action: 'clicked' },
    hideButton: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof StatusNotice>;

export const Default: Story = {
  args: {
    icon: '/icons/book.svg',
    title: '데이터가 없습니다',
    description: '아직 등록된 데이터가 없어요.\n새로운 항목을 추가해보세요!',
    buttonText: '추가하기',
  },
};

export const WithoutButton: Story = {
  args: {
    icon: '/icons/book.svg',
    title: '항목 없음',
    description: '표시할 항목이 없습니다.',
    hideButton: true, // 버튼 숨김 옵션
  },
};

export const CustomIcon: Story = {
  args: {
    icon: '/icons/book.svg',
    title: '완료되었습니다',
    description: '모든 작업이 성공적으로 완료되었습니다.',
    buttonText: '확인',
  },
};
