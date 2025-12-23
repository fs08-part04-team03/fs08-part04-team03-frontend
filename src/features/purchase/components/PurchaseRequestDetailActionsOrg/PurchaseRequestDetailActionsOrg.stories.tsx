import type { Meta, StoryObj } from '@storybook/nextjs';
import PurchaseRequestDetailActionsOrg from './PurchaseRequestDetailActionsOrg';

const meta = {
  title: 'Features/Purchase/Organisms/PurchaseRequestDetailActionsOrg',
  component: PurchaseRequestDetailActionsOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/my/purchase-requests/1',
        params: {
          companyId: 'company-123',
        },
      },
    },
    docs: {
      description: {
        component:
          '구매 요청 상세 페이지의 액션 버튼 컴포넌트입니다. 사용자 역할에 따라 다른 버튼 세트를 표시합니다.\n\n**주요 기능:**\n\n**전체 사용자용 (actionType="user"):**\n- 목록 보기: 구매 요청 목록 페이지로 이동하는 버튼\n- 장바구니 다시 담기: 현재 구매 요청을 장바구니에 다시 추가하는 버튼\n- 일반 사용자가 자신의 구매 요청을 확인할 때 사용\n\n**관리자용 (actionType="admin"):**\n- 요청 반려: 구매 요청을 반려 처리하는 버튼 (onRejectClick 콜백 호출)\n- 요청 승인: 구매 요청을 승인 처리하는 버튼 (onApproveClick 콜백 호출)\n- 관리자가 구매 요청을 검토하고 승인/반려할 때 사용\n\n**반응형 레이아웃:**\n- 화면 크기에 따라 자동으로 적용됩니다\n- 모바일/태블릿: 화면 하단에 고정된 버튼 (fixed bottom, border-top)\n- 데스크톱: 일반 레이아웃 버튼\n\n**Props:**\n- `companyId`: 회사 ID (라우팅에 사용, 선택적)\n- `actionType`: 액션 타입 (user | admin)\n- `onApproveClick`: 승인 버튼 클릭 핸들러 (관리자용)\n- `onRejectClick`: 반려 버튼 클릭 핸들러 (관리자용)',
      },
    },
  },
  argTypes: {
    companyId: {
      control: 'text',
      description:
        '회사 ID입니다. 라우팅에 사용되며, 제공되지 않으면 버튼 클릭 시 동작하지 않습니다.',
    },
    actionType: {
      control: 'inline-radio',
      options: ['user', 'admin'],
      description:
        '액션 타입입니다. user는 전체 사용자용 버튼(목록 보기, 장바구니 다시 담기)을, admin은 관리자용 버튼(요청 반려, 요청 승인)을 표시합니다.',
    },
    onApproveClick: {
      action: 'approved',
      description:
        '관리자용 승인 버튼 클릭 시 호출되는 핸들러입니다. actionType이 admin일 때만 사용됩니다.',
    },
    onRejectClick: {
      action: 'rejected',
      description:
        '관리자용 반려 버튼 클릭 시 호출되는 핸들러입니다. actionType이 admin일 때만 사용됩니다.',
    },
  },
} satisfies Meta<typeof PurchaseRequestDetailActionsOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestDetailActionsOrg>;

export const DefaultActions: Story = {
  args: {
    companyId: 'company-123',
    actionType: 'user',
  },
  parameters: {
    docs: {
      description: {
        story:
          '전체 사용자용 액션 버튼입니다. 구매 요청 상세 페이지에서 일반 사용자가 자신의 구매 요청을 확인할 때 표시됩니다. 목록 보기와 장바구니 다시 담기 버튼을 제공합니다.',
      },
    },
  },
};

export const AdminActions: Story = {
  args: {
    companyId: 'company-123',
    actionType: 'admin',
    onApproveClick: () => {
      // eslint-disable-next-line no-console
      console.log('승인 클릭');
    },
    onRejectClick: () => {
      // eslint-disable-next-line no-console
      console.log('반려 클릭');
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '관리자용 액션 버튼입니다. 구매 요청 상세 페이지에서 관리자가 구매 요청을 검토하고 승인 또는 반려할 때 표시됩니다. 요청 반려와 요청 승인 버튼을 제공하며, 각각 onRejectClick와 onApproveClick 콜백을 호출합니다.',
      },
    },
  },
};
