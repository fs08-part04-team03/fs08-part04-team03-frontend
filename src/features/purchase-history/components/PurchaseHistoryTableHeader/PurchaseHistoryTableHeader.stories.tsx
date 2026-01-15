import type { Meta, StoryObj } from '@storybook/nextjs';
import { PurchaseHistoryTableHeader } from './PurchaseHistoryTableHeader';

const meta = {
  title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryTableHeader',
  component: PurchaseHistoryTableHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '구매 내역 테이블의 헤더 컴포넌트입니다. 데스크톱 환경에서만 표시되며, 구매 요청일, 요청인, 구매 물품, 총 금액, 구매 승인일, 담당자 컬럼을 포함합니다. PurchaseHistoryTem과 PurchaseHistoryListOrg에서 재사용됩니다.',
      },
    },
  },
  argTypes: {},
} satisfies Meta<typeof PurchaseHistoryTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '기본 테이블 헤더입니다. 데스크톱 화면에서만 표시되며(grid 레이아웃), 모바일과 태블릿에서는 hidden 클래스로 인해 숨겨집니다. 6개의 컬럼(구매 요청일 130px, 요청인 160px, 구매 물품 1fr, 총 금액 140px, 구매 승인일 120px, 담당자 100px)을 가진 반응형 그리드 레이아웃입니다.',
      },
    },
  },
};

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story:
          '데스크톱 화면(1024px 이상)에서의 모습입니다. 그리드 레이아웃이 활성화되어 6개의 컬럼이 한 줄에 표시됩니다. 각 헤더 항목은 text-16(16px) 크기의 회색 텍스트로 표시되며, 하단에 border가 있습니다.',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          '모바일 화면에서의 모습입니다. hidden desktop:grid 클래스로 인해 모바일과 태블릿에서는 완전히 숨겨지며 표시되지 않습니다. 모바일 환경에서는 다른 레이아웃 구조를 사용합니다.',
      },
    },
  },
};
