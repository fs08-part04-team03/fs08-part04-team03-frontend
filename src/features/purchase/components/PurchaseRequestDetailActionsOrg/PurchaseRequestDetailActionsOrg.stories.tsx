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
          '구매 요청 상세 페이지의 액션 버튼을 표시하는 Organism 컴포넌트입니다. 사용자 역할(user/admin)에 따라 다른 버튼 세트를 렌더링합니다.\n\n**주요 기능:**\n- 역할별 버튼 세트 전환 (actionType prop)\n- 반응형 레이아웃 (모바일/태블릿: 고정 하단, 데스크톱: 일반 레이아웃)\n- 예산 부족 시 승인 버튼 비활성화 (isBudgetSufficient)\n- 라우팅 기능 (목록 보기, 장바구니 담기)\n- Toast 알림 (companyId 누락 시)\n\n**사용자용 버튼 (actionType="user"):**\n- 목록 보기: 구매 요청 목록 페이지로 이동\n- 장바구니 다시 담기: 장바구니에 동일 품목 추가\n\n**관리자용 버튼 (actionType="admin"):**\n- 요청 반려: 구매 요청 반려 처리\n- 요청 승인: 구매 요청 승인 처리 (예산 부족 시 비활성화)\n\n**반응형 레이아웃:**\n- **모바일/태블릿**: fixed bottom, border-top, padding 16px\n- **데스크톱**: 일반 레이아웃, 상단 마진 적용 (mt-24 tablet:mt-42 desktop:mt-70)',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestDetailActionsOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestDetailActionsOrg>;

export const UserActions: Story = {
  args: {
    companyId: 'company-123',
    actionType: 'user',
  },
  parameters: {
    docs: {
      description: {
        story:
          '사용자용 액션 버튼입니다. 자신이 요청한 구매 내역을 확인할 때 표시됩니다.\n\n**버튼 구성:**\n- 목록 보기 (Secondary): `/{companyId}/my/purchase-requests`로 이동\n- 장바구니 다시 담기 (Primary): `/{companyId}/cart`로 이동\n\n**동작:**\n- companyId가 없으면 버튼 비활성화 및 Toast 표시\n- 버튼 클릭 시 해당 경로로 라우팅\n\n**레이아웃:**\n- 모바일/태블릿: 화면 하단 고정\n- 데스크톱: 콘텐츠 하단에 배치',
      },
    },
  },
};

export const AdminActions: Story = {
  args: {
    companyId: 'company-123',
    actionType: 'admin',
    onApproveClick: () => {},
    onRejectClick: () => {},
    isBudgetSufficient: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '관리자용 액션 버튼입니다. 구매 요청을 검토하고 승인/반려할 때 표시됩니다.\n\n**버튼 구성:**\n- 요청 반려 (Secondary): onRejectClick 콜백 호출\n- 요청 승인 (Primary): onApproveClick 콜백 호출\n\n**동작:**\n- 승인 버튼 클릭 시 승인 모달 표시 (부모 컴포넌트에서 처리)\n- 반려 버튼 클릭 시 반려 모달 표시 (부모 컴포넌트에서 처리)\n- isBudgetSufficient=false면 승인 버튼 비활성화\n\n**레이아웃:**\n- 모바일/태블릿: 화면 하단 고정\n- 데스크톱: 콘텐츠 하단에 배치',
      },
    },
  },
};

export const AdminActionsInsufficientBudget: Story = {
  args: {
    companyId: 'company-123',
    actionType: 'admin',
    onApproveClick: () => {},
    onRejectClick: () => {},
    isBudgetSufficient: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '예산이 부족한 경우의 관리자용 액션 버튼입니다.\n\n**특징:**\n- isBudgetSufficient=false로 설정\n- 요청 승인 버튼이 비활성화 상태로 표시됨\n- 요청 반려 버튼은 정상 작동\n\n**사용 시나리오:**\n- 구매 후 예산이 음수가 되는 경우\n- 월 예산을 초과하는 구매 요청\n- 관리자가 예산 부족을 이유로 승인할 수 없는 경우\n\n**UX:**\n- 승인 버튼이 inactive 상태로 시각적 피드백 제공\n- 사용자는 반려만 가능하며, 승인은 불가능함을 명확히 인지',
      },
    },
  },
};

export const UserActionsWithoutCompanyId: Story = {
  args: {
    companyId: undefined,
    actionType: 'user',
  },
  parameters: {
    docs: {
      description: {
        story:
          'companyId가 없는 경우의 사용자용 액션 버튼입니다.\n\n**특징:**\n- companyId prop이 제공되지 않음\n- 두 버튼 모두 비활성화 상태\n- 버튼 클릭 시 Toast 에러 메시지 표시: "회사가 선택되지 않았습니다."\n\n**사용 시나리오:**\n- 라우팅 파라미터에서 companyId를 가져오지 못한 경우\n- 잘못된 URL로 접근한 경우\n- 개발 중 props 전달 누락\n\n**UX:**\n- 버튼이 비활성화되어 클릭할 수 없음을 시각적으로 표시\n- 클릭 시도 시 Toast로 에러 원인 안내\n- 3초 후 Toast 자동 닫힘',
      },
    },
  },
};
