import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { CATEGORY_SECTIONS } from '@/constants';
import { CategoryPanel } from './CategoryPanel';
import type { CategoryPanelSection, CategoryPanelProps } from './CategoryPanel';

const meta = {
  title: 'Organisms/CategoryPanel',
  component: CategoryPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '카테고리 필터링을 위한 아코디언 패널 컴포넌트입니다. 여러 섹션을 가지며, 각 섹션은 접기/펼치기가 가능하고, 옵션을 선택할 수 있습니다.',
      },
    },
  },
  argTypes: {
    sections: {
      control: 'object',
      description: '카테고리 섹션 배열',
    },
    selectedValue: {
      control: 'number',
      description: '현재 선택된 카테고리 값 (ChildCategory의 id)',
    },
    onChange: {
      action: 'category-changed',
      description: '카테고리 옵션 클릭 시 호출되는 콜백',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof CategoryPanel>;

export default meta;

type Story = StoryObj<typeof CategoryPanel>;

// 상수에서 카테고리 데이터 가져오기 (백엔드 API와 매칭)
const sampleSections: CategoryPanelSection[] = CATEGORY_SECTIONS;

// 상태를 관리하는 래퍼 컴포넌트
const CategoryPanelWithState = ({
  sections,
  selectedValue: initialSelectedValue,
  onChange,
  className,
}: CategoryPanelProps) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(initialSelectedValue ?? null);

  return (
    <CategoryPanel
      sections={sections}
      selectedValue={selectedValue}
      onChange={(value) => {
        setSelectedValue(value);
        onChange?.(value);
      }}
      className={className}
    />
  );
};

// 기본 스토리
export const Default: Story = {
  render: (args) => (
    <CategoryPanelWithState
      sections={args.sections}
      selectedValue={args.selectedValue}
      onChange={args.onChange}
      className={args.className}
    />
  ),
  args: {
    sections: sampleSections,
    selectedValue: null,
  },
};

// 선택된 값이 있는 스토리
export const WithSelectedValue: Story = {
  render: (args) => (
    <CategoryPanelWithState
      sections={args.sections}
      selectedValue={args.selectedValue}
      onChange={args.onChange}
      className={args.className}
    />
  ),
  args: {
    sections: sampleSections,
    selectedValue: 202, // 과즙음료
  },
};
