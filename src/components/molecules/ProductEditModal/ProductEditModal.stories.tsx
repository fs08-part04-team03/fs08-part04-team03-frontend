import type { Meta, StoryObj } from '@storybook/nextjs';
import { Option } from '@/components/atoms/DropDown/DropDown';
import ProductEditModal from './ProductEditModal';

const meta: Meta<typeof ProductEditModal> = {
  title: 'Molecules/Modal/ProductEditModal',
  component: ProductEditModal,
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: () => alert('닫기 클릭됨'),
    onSubmit: () => alert('수정 클릭됨'),
    initialName: '테스트 상품',
    initialPrice: '10000',
    initialLink: 'https://example.com',
    initialImage: null,
    initialCategory: { key: '2', label: '의류' } as Option,
    initialSubCategory: { key: '2', label: '상의' } as Option,
  },
};

export default meta;
type Story = StoryObj<typeof ProductEditModal>;

export const Default: Story = {};
