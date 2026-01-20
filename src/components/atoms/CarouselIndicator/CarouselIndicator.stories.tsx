import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { CarouselIndicator } from './CarouselIndicator';

const meta = {
  title: 'Atoms/CarouselIndicator',
  component: CarouselIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
모바일/캐러셀 UI에서 **현재 페이지(카드) 위치**를 사용자에게 알려주는 점(dot) 인디케이터입니다.

## 언제 쓰나요?
- 카드/이미지/리스트가 **가로 스와이프(스크롤)** 로 넘어가는 레이아웃에서
- 사용자가 “**뒤에 더 있다**”는 것을 직관적으로 알 수 있게 하고 싶을 때 사용합니다.

## 동작 방식
- \`count\`: 총 페이지(카드) 개수
- \`activeIndex\`: 현재 활성 페이지 인덱스(0부터 시작)
- \`onSelect\`를 전달하면 각 점이 **버튼**이 되어, 사용자가 점을 눌러 페이지 이동을 트리거할 수 있습니다.

## 접근성(권장)
- \`onSelect\`를 사용하는 경우, 각 점에는 \`aria-label\`이 자동으로 부여됩니다.
- \`ariaLabelPrefix\`로 문구를 커스터마이즈할 수 있습니다.

## 레이아웃/스타일링 팁
- 이 컴포넌트는 기본적으로 \`flex\`로 중앙 정렬됩니다.
- 필요 시 \`className\`으로 여백(예: \`mt-10\`)이나 반응형 숨김(예: \`tablet:hidden\`)을 제어하세요.
        `.trim(),
      },
    },
  },
  argTypes: {
    count: {
      control: { type: 'number', min: 1, step: 1 },
      description: '총 페이지(점) 개수',
    },
    activeIndex: {
      control: { type: 'number', min: 0, step: 1 },
      description: '현재 활성 페이지 인덱스(0부터 시작)',
    },
    onSelect: {
      action: 'select',
      description:
        '점 클릭 시 호출됩니다. 전달하면 인디케이터가 클릭 가능한 네비게이션으로 동작합니다.',
    },
    ariaLabelPrefix: {
      control: 'text',
      description: '각 점 버튼의 aria-label prefix',
    },
    className: {
      control: 'text',
      description: '컨테이너 className (여백/반응형 등)',
    },
  },
} satisfies Meta<typeof CarouselIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Static: Story = {
  args: {
    count: 3,
    activeIndex: 1,
    className: 'mt-10',
  },
};

export const Clickable: Story = {
  render: (args) => {
    const [activeIndex, setActiveIndex] = React.useState(args.activeIndex);
    return (
      <div className="p-16">
        <CarouselIndicator
          count={args.count}
          ariaLabelPrefix={args.ariaLabelPrefix}
          className={args.className}
          activeIndex={activeIndex}
          onSelect={(idx) => {
            setActiveIndex(idx);
            args.onSelect?.(idx);
          }}
        />
      </div>
    );
  },
  args: {
    count: 4,
    activeIndex: 0,
    ariaLabelPrefix: '대시보드 캐러셀',
    className: 'mt-10',
  },
};
