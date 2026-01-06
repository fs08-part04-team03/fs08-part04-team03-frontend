import type { Meta, StoryObj } from '@storybook/nextjs';
import { MobileCategoryBar } from './MobileCategoryBar';

const meta = {
  title: 'Molecules/MobileCategoryBar',
  component: MobileCategoryBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
모바일 환경에서 선택된 카테고리를 표시하는 바 컴포넌트입니다.

### 주요 기능
- 선택된 카테고리를 상단 바에 표시
- 대분류만 선택 시: "스낵" 형식으로 표시
- 소분류까지 선택 시: "스낵 · 과자" 형식으로 표시
- 클릭 시 카테고리 선택 모달을 열 수 있음
- 모바일 전용 (tablet 이상에서는 숨김 처리)

### 카테고리 ID 체계
#### 대분류 (1~7)
- 1: 스낵
- 2: 음료
- 3: 생수
- 4: 간편식
- 5: 신선식
- 6: 원두커피
- 7: 비품

#### 소분류 (101~)
- 스낵(1): 101~108 (과자, 쿠키, 비스켓류, 초콜릿류, 캔디류, 젤리류, 시리얼바, 견과류)
- 음료(2): 201~206 (탄산음료, 과즙음료, 에너지음료, 이온음료, 건강음료, 차류)
- 생수(3): 301~302 (생수, 스파클링)
- 간편식(4): 401~405 (컵라면, 소시지, 계란, 컵밥류, 시리얼)
- 신선식(5): 501~506 (과일, 샐러드, 빵, 샌드위치, 요거트류, 치즈류)

### 사용 예시
\`\`\`tsx
// 대분류만 선택
<MobileCategoryBar
  categoryId={1}
  onClick={() => openCategoryModal()}
/>

// 소분류까지 선택
<MobileCategoryBar
  categoryId={101}
  onClick={() => openCategoryModal()}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    categoryId: {
      control: 'number',
      description:
        '선택된 카테고리 ID. 대분류(1~7) 또는 소분류(101~, 201~...)를 지정할 수 있습니다.',
      table: {
        type: { summary: 'number | null | undefined' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 시 실행될 핸들러. 주로 카테고리 선택 모달을 여는 데 사용됩니다.',
      table: {
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof MobileCategoryBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ParentCategory: Story = {
  args: {
    categoryId: 1, // 스낵
  },
  parameters: {
    docs: {
      description: {
        story:
          '대분류(ID: 1 = 스낵)만 선택된 경우 "스낵"으로 표시됩니다. 클릭 시 카테고리 선택 UI를 열 수 있습니다.',
      },
    },
  },
};

export const ChildCategory: Story = {
  args: {
    categoryId: 101, // 스낵 > 과자
  },
  parameters: {
    docs: {
      description: {
        story:
          '소분류(ID: 101 = 스낵 > 과자)가 선택된 경우 "스낵 · 과자"로 표시됩니다. 클릭 시 카테고리 선택 UI를 열 수 있습니다.',
      },
    },
  },
};
