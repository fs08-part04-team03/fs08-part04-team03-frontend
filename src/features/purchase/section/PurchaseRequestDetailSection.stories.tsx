import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestDetailSection from './PurchaseRequestDetailSection';

const meta = {
  title: 'Features/Purchase/PurchaseRequestDetailSection',
  component: PurchaseRequestDetailSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/purchase-requests/1',
        params: {
          companyId: 'company-123',
          requestId: '1',
        },
      },
    },
    docs: {
      description: {
        component:
          '관리자용 구매 요청 상세 섹션 컴포넌트입니다. 구매 요청 상세 정보를 조회하고, 승인/반려 기능을 제공합니다.\n\n**주요 기능:**\n\n1. **구매 요청 상세 정보 조회**: mockData를 사용하여 구매 요청 상세 정보를 표시합니다.\n2. **승인/반려 기능**: ApprovalRequestModal을 통해 승인/반려 메시지를 입력하고 처리합니다.\n3. **Toast 알림**: 승인/반려 성공/실패 시 Toast 알림을 표시합니다.\n4. **자동 리다이렉트**: 승인/반려 후 목록 페이지로 자동 이동합니다.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mockData = (context.args as { mockData?: PurchaseRequestItem })?.mockData;

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      // mockData를 QueryClient에 미리 설정
      if (mockData) {
        queryClient.setQueryData(['purchaseRequestDetail', '1'], mockData);
        // managePurchaseRequests 쿼리도 설정 (컴포넌트에서 사용)
        queryClient.setQueryData(['purchaseRequests', 1, 100], {
          purchaseRequests: [mockData],
          currentPage: 1,
          totalPages: 1,
          totalItems: 1,
          itemsPerPage: 100,
          hasNextPage: false,
          hasPreviousPage: false,
        });
      }

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof PurchaseRequestDetailSection>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestDetailSection>;

const mockPurchaseRequest: PurchaseRequestItem = {
  id: '1',
  createdAt: '2025-06-03T00:00:00.000Z',
  updatedAt: '2025-06-03T00:00:00.000Z',
  totalPrice: 15000,
  shippingFee: 3000,
  status: 'PENDING',
  requestMessage: '빠른 배송 부탁드립니다.',
  purchaseItems: [
    {
      id: 'item-1',
      quantity: 1,
      priceSnapshot: 5000,
      products: {
        id: 1,
        name: '코카콜라 제로',
        image: '/images/zero-cola.svg',
      },
    },
    {
      id: 'item-2',
      quantity: 2,
      priceSnapshot: 5000,
      products: {
        id: 2,
        name: '펩시 콜라',
      },
    },
  ],
  requester: {
    id: 'requester-1',
    name: '홍길동',
    email: 'hong@example.com',
  },
};

export const Default: Story = {
  args: {
    mockData: mockPurchaseRequest,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 구매 요청 상세 정보를 표시합니다. 승인/반려 버튼을 클릭하면 모달이 열립니다.',
      },
    },
  },
};

export const Approved: Story = {
  args: {
    mockData: {
      ...mockPurchaseRequest,
      status: 'APPROVED',
      approver: {
        id: 'approver-1',
        name: '관리자',
        email: 'admin@example.com',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '이미 승인된 구매 요청을 표시합니다.',
      },
    },
  },
};

export const Rejected: Story = {
  args: {
    mockData: {
      ...mockPurchaseRequest,
      status: 'REJECTED',
      rejectReason: '예산 초과로 인한 반려입니다.',
      approver: {
        id: 'approver-1',
        name: '관리자',
        email: 'admin@example.com',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: '반려된 구매 요청을 표시합니다.',
      },
    },
  },
};
