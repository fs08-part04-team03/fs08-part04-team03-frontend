import type { Meta, StoryObj } from '@storybook/nextjs';
import { Notification, type NotificationItem } from './Notification';

/** Mock Data (상품 / 요청 / 상태 기반) */
const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    content: <>무선 청소기 구매가 완료되었어요</>,
    time: '방금 전',
  },
  {
    id: 2,
    content: <>노트북 거치대 구매 요청이 접수되었어요</>,
    time: '10분 전',
  },
  {
    id: 3,
    content: <>의자 교환 요청이 수락되었어요</>,
    time: '1시간 전',
  },
  {
    id: 4,
    content: <>환불 요청이 반려되었어요</>,
    time: '3시간 전',
  },
  {
    id: 5,
    content: <>주문 취소가 완료되었어요</>,
    time: '어제',
  },
  {
    id: 6,
    content: <>배송 요청이 처리 중이에요</>,
    time: '2일 전',
  },
  {
    id: 7,
    content: (
      <>
        배송 요청 건과 관련하여 상품이 배송 중 분실되어 현재 내부 확인 절차가 진행 중입니다. 확인이
        완료되는 대로 추가 안내드릴 예정입니다.
      </>
    ),
    time: '1일 전',
  },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof Notification> = {
  title: 'Molecules/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
알림 드롭다운 컴포넌트입니다.

### UX 규칙
- **안 읽은 알림은 항상 상단에 노출됩니다.**
- 알림을 클릭하면 **읽음 처리되며 리스트 하단으로 이동**합니다.
- 스크롤 시 일정 개수씩 알림이 추가 로드됩니다.
- 개별 알림은 삭제할 수 있습니다.

실제 서비스 환경에서 사용하는 알림 UX 패턴을 그대로 반영했습니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notification>;

/** =====================
 * Default
 ====================== */
export const Default: Story = {
  args: {
    notifications: mockNotifications,
  },
  parameters: {
    docs: {
      description: {
        story: `
기본 알림 상태입니다.

- 모든 알림은 **초기에는 읽지 않은 상태**로 노출됩니다.
- 알림을 클릭하면 읽음 처리되며 **자동으로 하단으로 이동**합니다.
- 스크롤을 내려 추가 알림을 확인할 수 있습니다.
        `,
      },
    },
  },
};

/** =====================
 * Empty
 ====================== */
export const Empty: Story = {
  args: {
    notifications: [],
  },
  parameters: {
    docs: {
      description: {
        story: `
알림이 없는 상태입니다.

- 알림 데이터가 없을 경우  
  **"알림이 없습니다"** 안내 문구가 표시됩니다.
        `,
      },
    },
  },
};
