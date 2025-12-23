import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type {
  PurchaseRequestItem,
  ManagePurchaseRequestsResponse,
} from '@/features/purchase/api/purchase.api';
import PurchaseRequestListSection from './PurchaseRequestListSection';

const meta = {
  title: 'Features/Purchase/PurchaseRequestListSection',
  component: PurchaseRequestListSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/purchase-requests',
        params: {
          companyId: 'company-123',
        },
        searchParams: {
          page: '1',
          size: '10',
        },
      },
    },
    docs: {
      description: {
        component:
          '관리자용 구매 요청 목록 섹션 컴포넌트입니다. 구매 요청 목록을 조회하고, 승인/반려 기능을 제공합니다.\n\n**주요 기능:**\n\n1. **구매 요청 목록 조회**: mockData를 사용하여 구매 요청 목록을 표시합니다.\n2. **페이지네이션**: 페이지별로 구매 요청 목록을 조회할 수 있습니다.\n3. **정렬/필터링**: 정렬 옵션과 상태 필터를 통해 목록을 필터링할 수 있습니다.\n4. **승인/반려 기능**: 각 구매 요청에 대해 승인/반려를 처리할 수 있습니다.\n5. **Toast 알림**: 승인/반려 성공/실패 시 Toast 알림을 표시합니다.',
      },
    },
  },
  decorators: [
    (Story, context) => {
      const mockData = (context.args as { mockData?: ManagePurchaseRequestsResponse })?.mockData;

      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      });

      // mockData를 QueryClient에 미리 설정 (모든 가능한 queryKey 조합에 대해)
      if (mockData) {
        // 기본 쿼리 키들에 대해 설정
        queryClient.setQueryData(['purchaseRequests', 1, 10, undefined, undefined], mockData);
        queryClient.setQueryData(['purchaseRequests', 1, 10, 'ALL', undefined], mockData);
        queryClient.setQueryData(['purchaseRequests', 2, 5, undefined, undefined], mockData);
        queryClient.setQueryData(['purchaseRequests', 2, 5, 'ALL', undefined], mockData);
      }

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof PurchaseRequestListSection>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestListSection>;

const createPurchaseItem = (
  id: string,
  status: PurchaseRequestItem['status'],
  itemCount: number,
  totalPrice: number,
  shippingFee: number,
  createdAt: string,
  requesterName: string = '홍길동'
): PurchaseRequestItem => ({
  id,
  createdAt,
  updatedAt: createdAt,
  totalPrice,
  shippingFee,
  status,
  purchaseItems: Array.from({ length: itemCount }, (_, i) => ({
    id: `item-${i + 1}`,
    quantity: i + 1,
    priceSnapshot: totalPrice / itemCount,
    products: {
      id: i + 1,
      name: `상품 ${i + 1}`,
      image: '/images/zero-cola.svg',
    },
  })),
  requester: {
    id: 'requester-1',
    name: requesterName,
    email: 'hong@example.com',
  },
});

export const Default: Story = {
  args: {
    mockData: {
      purchaseRequests: [
        createPurchaseItem('1', 'PENDING', 2, 15000, 3000, '2024-07-04T00:00:00.000Z'),
        createPurchaseItem('2', 'APPROVED', 1, 10000, 2000, '2024-07-03T00:00:00.000Z'),
        createPurchaseItem('3', 'REJECTED', 3, 20000, 0, '2024-07-02T00:00:00.000Z'),
      ],
      currentPage: 1,
      totalPages: 1,
      totalItems: 3,
      itemsPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '기본 구매 요청 목록을 표시합니다. 각 항목에 대해 승인/반려 버튼이 표시됩니다.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    mockData: {
      purchaseRequests: [],
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      itemsPerPage: 10,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '구매 요청이 없는 경우를 표시합니다.',
      },
    },
  },
};

export const WithPagination: Story = {
  args: {
    mockData: {
      purchaseRequests: Array.from({ length: 5 }, (_, i) =>
        createPurchaseItem(
          `${i + 6}`,
          'PENDING',
          1,
          10000 + i * 1000,
          2000,
          `2024-07-0${5 - i}T00:00:00.000Z`,
          `사용자 ${i + 6}`
        )
      ),
      currentPage: 2,
      totalPages: 3,
      totalItems: 15,
      itemsPerPage: 5,
      hasNextPage: true,
      hasPreviousPage: true,
    },
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/company-123/purchase-requests',
        params: {
          companyId: 'company-123',
        },
        searchParams: {
          page: '2',
          size: '5',
        },
      },
    },
    docs: {
      description: {
        story: '페이지네이션이 있는 구매 요청 목록을 표시합니다.',
      },
    },
  },
};
