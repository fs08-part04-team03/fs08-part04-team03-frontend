import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { PARENT_CATEGORY_OPTIONS } from '@/constants';

import { GNBCategorySwitcher } from './GNBCategorySwitcher';

const CATEGORY_OPTIONS = PARENT_CATEGORY_OPTIONS;

const meta = {
  title: 'Molecules/GNBCategorySwitcher',
  component: GNBCategorySwitcher,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '모바일 GNB 상단에서 대분류 카테고리를 선택할 수 있는 스위처 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    onCategoryChange: {
      action: 'category-changed',
      description: '카테고리 변경 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof GNBCategorySwitcher>;

export default meta;

type Story = StoryObj<typeof GNBCategorySwitcher>;

export const Default: Story = {
  render: ({ categories, activeCategoryId: initialCategoryId, onCategoryChange, className }) => {
    const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId ?? 'drink');

    return (
      <div className="w-full h-600 bg-gray-50">
        <header className="flex items-center justify-center h-56 bg-white">
          <GNBCategorySwitcher
            categories={categories ?? CATEGORY_OPTIONS}
            activeCategoryId={activeCategoryId}
            onCategoryChange={(id) => {
              setActiveCategoryId(id);
              onCategoryChange?.(id);
            }}
            className={className}
          />
        </header>
        <main className="p-16 text-14 text-gray-600">
          카테고리를 선택하면 상단 GNB에서 변경되는 모습을 확인할 수 있습니다.
        </main>
      </div>
    );
  },
  args: {
    categories: CATEGORY_OPTIONS,
    activeCategoryId: 'drink' as const,
  },
};

export const WithManyCategories: Story = {
  render: (args) => {
    const [activeCategoryId, setActiveCategoryId] = useState(args.activeCategoryId ?? 'snack');

    return (
      <div className="w-full h-600 bg-gray-50">
        <header className="flex items-center justify-center h-56 bg-white">
          <GNBCategorySwitcher
            categories={CATEGORY_OPTIONS}
            activeCategoryId={activeCategoryId}
            onCategoryChange={(id) => {
              setActiveCategoryId(id);
              args.onCategoryChange?.(id);
            }}
            className={args.className}
          />
        </header>
        <main className="p-16 text-14 text-gray-600">
          카테고리를 선택하면 상단 GNB에서 변경되는 모습을 확인할 수 있습니다.
        </main>
      </div>
    );
  },
  args: {
    activeCategoryId: 'snack' as const,
  },
};
