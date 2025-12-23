import type { Meta, StoryObj } from '@storybook/nextjs';
import { Option } from '@/components/atoms/DropDown/DropDown';
import ProductEditModal from './ProductEditModal';

/* =====================
 * Category Types
 ====================== */
interface SubCategory {
  id: number;
  parentId: number;
  key: string;
  name: string;
}

/* =====================
 * SubCategory Data (FULL)
 ====================== */
const subCategoryData: SubCategory[] = [
  // 스낵(1)
  { id: 101, parentId: 1, key: 'snack-snack', name: '과자' },
  { id: 102, parentId: 1, key: 'snack-cookie', name: '쿠키' },
  { id: 103, parentId: 1, key: 'snack-biscuit', name: '비스켓류' },
  { id: 104, parentId: 1, key: 'snack-chocolate', name: '초콜릿류' },
  { id: 105, parentId: 1, key: 'snack-candy', name: '캔디류' },
  { id: 106, parentId: 1, key: 'snack-jelly', name: '젤리류' },
  { id: 107, parentId: 1, key: 'snack-cereal-bar', name: '시리얼바' },
  { id: 108, parentId: 1, key: 'snack-nuts', name: '견과류' },

  // 음료(2)
  { id: 201, parentId: 2, key: 'drink-soda', name: '탄산음료' },
  { id: 202, parentId: 2, key: 'drink-fruit', name: '과즙음료' },
  { id: 203, parentId: 2, key: 'drink-energy', name: '에너지음료' },
  { id: 204, parentId: 2, key: 'drink-ion', name: '이온음료' },
  { id: 205, parentId: 2, key: 'drink-health', name: '건강음료' },
  { id: 206, parentId: 2, key: 'drink-tea', name: '차류' },

  // 생수(3)
  { id: 301, parentId: 3, key: 'water-water', name: '생수' },
  { id: 302, parentId: 3, key: 'water-sparkling', name: '스파클링' },

  // 간편식(4)
  { id: 401, parentId: 4, key: 'simple-cup-ramen', name: '컵라면' },
  { id: 402, parentId: 4, key: 'simple-sausage', name: '소시지' },
  { id: 403, parentId: 4, key: 'simple-egg', name: '계란' },
  { id: 404, parentId: 4, key: 'simple-cup-rice', name: '컵밥류' },
  { id: 405, parentId: 4, key: 'simple-cereal', name: '시리얼' },

  // 신선식(5)
  { id: 501, parentId: 5, key: 'fresh-fruit', name: '과일' },
  { id: 502, parentId: 5, key: 'fresh-salad', name: '샐러드' },
  { id: 503, parentId: 5, key: 'fresh-bread', name: '빵' },
  { id: 504, parentId: 5, key: 'fresh-sandwich', name: '샌드위치' },
  { id: 505, parentId: 5, key: 'fresh-yogurt', name: '요거트류' },
  { id: 506, parentId: 5, key: 'fresh-dairy', name: '유제품' },

  // 원두커피(6)
  { id: 601, parentId: 6, key: 'coffee-drip', name: '드립커피' },
  { id: 602, parentId: 6, key: 'coffee-beans', name: '원두' },
  { id: 603, parentId: 6, key: 'coffee-capsule', name: '캡슐커피' },

  // 비품(7)
  { id: 701, parentId: 7, key: 'supplies-disposable', name: '일회용품' },
  { id: 702, parentId: 7, key: 'supplies-office', name: '사무용품' },
  { id: 703, parentId: 7, key: 'supplies-cleaning', name: '청소용품' },
  { id: 704, parentId: 7, key: 'supplies-hygiene', name: '위생용품' },
];

/* =====================
 * Main Categories (1~7)
 ====================== */
const mainCategories: Option[] = [
  { key: '1', label: '스낵' },
  { key: '2', label: '음료' },
  { key: '3', label: '생수' },
  { key: '4', label: '간편식' },
  { key: '5', label: '신선식' },
  { key: '6', label: '원두커피' },
  { key: '7', label: '비품' },
];

/* =====================
 * Story Default Values
 ====================== */
const defaultMainCategory = mainCategories.find((c) => c.key === '2')!;
const defaultSubCategoryData = subCategoryData.find((c) => c.parentId === 2)!;

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

    // ✅ 대분류
    initialCategory: defaultMainCategory,

    // ✅ 소분류 (대분류 2 → 음료 하위 첫 번째)
    initialSubCategory: {
      key: defaultSubCategoryData.key,
      label: defaultSubCategoryData.name,
    } as Option,
  },
};

export default meta;

type Story = StoryObj<typeof ProductEditModal>;

export const Default: Story = {};
