import type { Meta, StoryObj } from '@storybook/nextjs';
import { Option } from '@/components/atoms/DropDown/DropDown';
import ProductModal from './ProductModal';

/* =====================
 * Category Options
 ====================== */
const categories: Option[] = [
  { key: '1', label: '스낵' },
  { key: '2', label: '음료' },
  { key: '3', label: '생수' },
  { key: '4', label: '간편식' },
  { key: '5', label: '신선식' },
  { key: '6', label: '원두커피' },
  { key: '7', label: '비품' },
];

const subCategories: Option[] = [
  { key: 'drink-soda', label: '탄산음료' },
  { key: 'drink-fruit', label: '과즙음료' },
  { key: 'drink-energy', label: '에너지음료' },
  { key: 'drink-ion', label: '이온음료' },
  { key: 'drink-health', label: '건강음료' },
  { key: 'drink-tea', label: '차류' },
];

/* =====================
 * Story Default Values
 ====================== */
const defaultCategory = categories[1]; // '음료'
const defaultSubCategory = subCategories[0]; // '탄산음료'

const meta: Meta<typeof ProductModal> = {
  title: 'Molecules/Modal/ProductModal',
  component: ProductModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    open: true,
    onClose: () => alert('닫기 클릭됨'),
    onSubmit: () => alert('등록하기 클릭됨'),

    initialName: '테스트 상품',
    initialPrice: '15000',
    initialLink: 'https://example.com',
    initialImage: null,

    initialCategory: defaultCategory,
    initialSubCategory: defaultSubCategory,
  },
};

export default meta;

type Story = StoryObj<typeof ProductModal>;

export const Default: Story = {
  args: {
    open: true,
  },
};
