import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseHistoryListBottomOrg from './PurchaseHistoryListBottomOrg';

const meta = {
  title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryListBottomOrg',
  component: PurchaseHistoryListBottomOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-1/purchase-history',
        params: {
          companyId: 'company-1',
        },
      },
    },
    docs: {
      description: {
        component:
          '단일 구매 내역 아이템을 반응형 레이아웃으로 표시하는 컴포넌트입니다.\n\n**반응형 레이아웃:**\n- **모바일**: 세로 카드 형태로 구성. 상단에 상품명과 금액을 표시하고, 구분선 아래 단일 열 그리드로 구매 요청일, 요청인, 구매 승인일, 담당자 정보를 표시합니다.\n- **태블릿**: 세로 카드 형태 유지. 상단은 모바일과 동일하고, 구분선 아래 2열 그리드(2x2)로 정보를 더 컴팩트하게 표시합니다.\n- **데스크탑**: 테이블 행 형태로 변환. 6개 컬럼(구매 요청일, 요청인, 상품 정보, 주문 금액, 구매 승인일, 담당자)으로 수평 정렬됩니다.\n\n**주요 기능:**\n- 클릭 시 해당 구매 내역 상세 페이지로 이동 (/{companyId}/purchase-history/{itemId})\n- 키보드 접근성 지원 (Enter/Space 키로 활성화 가능)\n- 긴급 요청(urgent=true)은 요청인 옆에 빨간색 "즉시 요청" 태그로 표시\n- Hover 시 배경색 변경으로 인터랙션 피드백 제공\n\n**데이터 최적화:**\n- useMemo를 사용하여 itemDescription과 totalQuantity 계산 최적화\n- useCallback을 사용하여 이벤트 핸들러 재생성 방지\n\n**사용 시나리오:**\n- 상위 컴포넌트에서 purchaseList 배열을 map하여 각 아이템을 렌더링하는 용도로 설계됨\n- 테이블 헤더는 별도 컴포넌트에서 관리하며, 이 컴포넌트는 순수하게 단일 행/카드만 담당',
      },
    },
  },
} satisfies Meta<typeof PurchaseHistoryListBottomOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseHistoryListBottomOrg>;

const createPurchaseItem = (
  id: string,
  status: PurchaseRequestItem['status'],
  itemCount: number,
  totalPrice: number,
  createdAt: string,
  updatedAt: string,
  urgent: boolean,
  approver?: PurchaseRequestItem['approver']
): PurchaseRequestItem => ({
  id,
  createdAt,
  updatedAt,
  totalPrice,
  shippingFee: 0,
  status,
  purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
    id: `item-${id}-${index}`,
    quantity: index === 0 ? 2 : 1,
    priceSnapshot: totalPrice / itemCount,
    products: {
      id: index + 1,
      name: index === 0 ? '코카콜라 제로' : `상품 ${index + 1}`,
    },
  })),
  requester: {
    id: 'requester-1',
    name: '김스낵',
    email: 'kim@example.com',
  },
  approver,
  urgent,
});

const approver = {
  id: 'approver-1',
  name: '김코드',
  email: 'code@example.com',
};

export const Default: Story = {
  args: {
    item: createPurchaseItem(
      '1',
      'APPROVED',
      2,
      21000,
      '2025-07-05T00:00:00.000Z',
      '2025-07-07T00:00:00.000Z',
      false,
      approver
    ),
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 내역 아이템입니다. 2개의 상품(코카콜라 제로 + 1개 추가)을 포함하며, 총 금액은 21,000원입니다.\n\n**표시 정보:**\n- **상품 정보**: formatItemDescription 함수를 통해 "코카콜라 제로 외 1건"으로 표시\n- **총수량**: purchaseItems의 모든 quantity를 합산 (2 + 1 = 3개)\n- **구매 요청일**: 2025년 7월 5일\n- **구매 승인일**: 2025년 7월 7일 (요청일로부터 2일 후 승인)\n- **요청인**: 김스낵\n- **담당자**: 김코드 (approver)\n- **긴급 여부**: 일반 요청 (urgent=false)\n\n**인터랙션:**\n- 클릭 시 /company-1/purchase-history/1 경로로 이동\n- Hover 시 배경색이 gray-50으로 변경되어 클릭 가능함을 시각적으로 표시\n- Tab 키로 포커스 이동 가능, Enter 또는 Space 키로 활성화 가능',
      },
    },
  },
};

export const UrgentRequest: Story = {
  args: {
    item: createPurchaseItem(
      '2',
      'APPROVED',
      3,
      45000,
      '2025-07-03T00:00:00.000Z',
      '2025-07-03T06:00:00.000Z',
      true,
      approver
    ),
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '긴급 요청 아이템입니다. urgent 플래그가 true로 설정되어 있어 시각적 강조가 적용됩니다.\n\n**긴급 요청 표시:**\n- **StatusTag 컴포넌트**: variant="urgent"로 배경색 `bg-[#F2F6FF]`, 텍스트 색상 `text-[#4C8AE1]`의 "즉시 요청" 태그가 요청인 옆에 표시됩니다\n- **모바일/태블릿**: `RequesterWithUrgentTag` 컴포넌트를 통해 요청인 이름과 태그가 `flex items-center gap-8`로 수평 정렬되어 표시됩니다\n- **데스크탑**: 요청인 컬럼 내에서 `flex items-center gap-8`로 이름과 태그가 수평 정렬되어 표시됩니다\n- **태그 스타일**: `text-12` 크기로 작게 표시되어 주요 정보를 방해하지 않으며, 아이콘은 없습니다\n\n**빠른 승인 처리:**\n- 구매 요청일: 2025년 7월 3일 00:00\n- 구매 승인일: 2025년 7월 3일 06:00\n- 같은 날 6시간 내 승인 처리되어 긴급 요청의 빠른 처리를 반영\n\n**사용 시나리오:**\n- 긴급하게 필요한 물품 구매 요청\n- 우선 순위가 높은 구매 건\n- 마감 임박 또는 재고 부족 상황',
      },
    },
  },
};

export const WithoutApprover: Story = {
  args: {
    item: createPurchaseItem(
      '3',
      'PENDING',
      1,
      15000,
      '2025-07-08T00:00:00.000Z',
      '2025-07-08T00:00:00.000Z',
      false
    ),
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '승인 대기 중인 아이템입니다. approver가 없는 PENDING 상태를 나타냅니다.\n\n**승인자 없는 경우 표시:**\n- **구매 승인일**: item.approver 체크로 조건부 렌더링하여 "-" 표시\n  - 모바일: `{item.approver ? <DateText date={item.updatedAt} className="text-14" /> : <p className="text-14">-</p>}`\n  - 태블릿: 동일한 패턴으로 "-" 표시\n  - 데스크탑: DateText 컴포넌트에 "-" 문자열 전달\n- **담당자**: `{item.approver?.name || \'-\'}` 패턴으로 optional chaining 사용하여 "-" 표시\n\n**PENDING 상태의 의미:**\n- 구매 요청이 생성되었지만 아직 승인되지 않은 상태\n- 담당자가 배정되지 않아 approver가 undefined\n- updatedAt은 생성 시점(createdAt)과 동일\n\n**실무 활용:**\n- 승인 대기 목록에서 어떤 요청이 처리되지 않았는지 파악\n- 담당자가 배정되지 않은 요청을 빠르게 식별\n- 승인 프로세스의 병목 지점 발견',
      },
    },
  },
};

export const SingleProduct: Story = {
  args: {
    item: {
      ...createPurchaseItem(
        '4',
        'APPROVED',
        1,
        12000,
        '2025-07-06T00:00:00.000Z',
        '2025-07-08T00:00:00.000Z',
        false,
        approver
      ),
      purchaseItems: [
        {
          id: 'item-4-0',
          quantity: 5,
          priceSnapshot: 12000,
          products: {
            id: 1,
            name: '코카콜라 제로',
          },
        },
      ],
    },
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '단일 상품 아이템입니다. purchaseItems 배열에 하나의 상품만 포함되어 있습니다.\n\n**단일 상품 표시:**\n- **상품명**: formatItemDescription 함수가 배열 길이 1을 감지하여 "외 N건" 없이 "코카콜라 제로"만 표시\n- **수량**: 단일 상품이지만 quantity=5로 5개 주문\n- **총수량 계산**: purchaseItems.reduce로 계산해도 5개만 반환\n\n**formatItemDescription 로직:**\n- purchaseItems.length === 1인 경우: 첫 번째 상품명만 반환\n- 그 외의 경우: 첫 번째 상품명 + " 외 " + (배열 길이 - 1) + "건" 형식으로 반환\n\n**UI 표시 차이:**\n- **모바일/태블릿**: "코카콜라 제로" + "총수량 5개"\n- **데스크탑**: 상품 정보 컬럼에 "코카콜라 제로"와 "총 수량 5개"를 세로로 배치\n\n**실무 시나리오:**\n- 단일 품목 대량 주문\n- 특정 상품만 재주문하는 경우\n- 신제품 테스트 구매',
      },
    },
  },
};

export const MultipleProducts: Story = {
  args: {
    item: {
      ...createPurchaseItem(
        '5',
        'APPROVED',
        5,
        125000,
        '2025-07-04T00:00:00.000Z',
        '2025-07-06T00:00:00.000Z',
        false,
        approver
      ),
      purchaseItems: [
        {
          id: 'item-5-0',
          quantity: 10,
          priceSnapshot: 25000,
          products: { id: 1, name: '코카콜라 제로' },
        },
        {
          id: 'item-5-1',
          quantity: 5,
          priceSnapshot: 25000,
          products: { id: 2, name: '펩시콜라' },
        },
        {
          id: 'item-5-2',
          quantity: 3,
          priceSnapshot: 25000,
          products: { id: 3, name: '환타 오렌지' },
        },
        {
          id: 'item-5-3',
          quantity: 2,
          priceSnapshot: 25000,
          products: { id: 4, name: '스프라이트' },
        },
        {
          id: 'item-5-4',
          quantity: 1,
          priceSnapshot: 25000,
          products: { id: 5, name: '밀키스' },
        },
      ],
    },
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '여러 상품을 포함하는 아이템입니다. 5개의 서로 다른 음료수를 다양한 수량으로 주문한 경우입니다.\n\n**다중 상품 표시:**\n- **상품 정보**: "코카콜라 제로 외 4건"으로 간결하게 표시\n- **총수량 계산**: 10 + 5 + 3 + 2 + 1 = 21개\n- **첫 번째 상품 우선**: formatItemDescription은 항상 첫 번째 상품명을 기준으로 표시\n\n**수량 분산:**\n- 코카콜라 제로: 10개 (가장 많음)\n- 펩시콜라: 5개\n- 환타 오렌지: 3개\n- 스프라이트: 2개\n- 밀키스: 1개 (가장 적음)\n\n**useMemo 최적화:**\n```typescript\nconst totalQuantity = useMemo(\n  () => item.purchaseItems.reduce((sum, purchaseItem) => sum + purchaseItem.quantity, 0),\n  [item.purchaseItems]\n);\n```\n- purchaseItems가 변경되지 않는 한 재계산하지 않음\n- 리렌더링 시 성능 최적화\n\n**실무 활용:**\n- 정기 주문 또는 대량 발주\n- 여러 부서의 요청을 통합한 구매\n- 재고 보충을 위한 다양한 품목 주문',
      },
    },
  },
};

export const LongProductName: Story = {
  args: {
    item: {
      ...createPurchaseItem(
        '6',
        'APPROVED',
        2,
        35000,
        '2025-07-07T00:00:00.000Z',
        '2025-07-09T00:00:00.000Z',
        false,
        approver
      ),
      purchaseItems: [
        {
          id: 'item-6-0',
          quantity: 3,
          priceSnapshot: 17500,
          products: {
            id: 1,
            name: '매우 긴 상품명을 가진 프리미엄 오가닉 코카콜라 제로 슈가 프리 탄산음료 500ml 병',
          },
        },
        {
          id: 'item-6-1',
          quantity: 2,
          priceSnapshot: 17500,
          products: {
            id: 2,
            name: '또 다른 매우 긴 이름의 펩시콜라 제로 칼로리 무설탕 탄산음료',
          },
        },
      ],
    },
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '긴 상품명을 가진 아이템입니다. 상품명이 길어도 레이아웃이 깨지지 않도록 처리하는 방법을 보여줍니다.\n\n**긴 텍스트 처리 전략:**\n- **모바일**: 상품명 영역에 `flex-1 min-w-0` 적용으로 flexbox 내에서 축소 가능\n- **태블릿**: 동일한 flex 레이아웃으로 가용 공간 내에서 표시\n- **데스크탑**: `1fr` 그리드 컬럼으로 남은 공간을 모두 활용하여 긴 텍스트 수용\n\n**텍스트 오버플로우:**\n- 현재 구현에서는 말줄임표(ellipsis) 미적용\n- 긴 텍스트는 줄바꿈되어 표시될 수 있음\n- 카드 높이가 콘텐츠에 따라 자동 조절\n\n**formatItemDescription 결과:**\n- "매우 긴 상품명을 가진 프리미엄 오가닉 코카콜라 제로 슈가 프리 탄산음료 500ml 병 외 1건"\n- 첫 번째 상품의 긴 이름 전체가 포함됨\n\n**개선 고려사항:**\n- 필요 시 `truncate` 또는 `line-clamp-2` 클래스 추가하여 말줄임표 적용 가능\n- Tooltip으로 전체 상품명 표시하는 방식도 고려 가능\n\n**실무 사례:**\n- 상세한 제품 스펙이 상품명에 포함된 경우\n- 프리미엄 또는 특수 제품의 긴 공식 명칭\n- 브랜드명 + 제품명 + 용량 등이 모두 포함된 경우',
      },
    },
  },
};

export const HighPriceItem: Story = {
  args: {
    item: createPurchaseItem(
      '7',
      'APPROVED',
      10,
      2500000,
      '2025-07-10T00:00:00.000Z',
      '2025-07-12T00:00:00.000Z',
      true,
      {
        id: 'approver-2',
        name: '박관리',
        email: 'manager@example.com',
      }
    ),
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '고액 구매 아이템입니다. 2,500,000원(250만원)의 대규모 구매 건을 보여줍니다.\n\n**PriceText 포맷팅:**\n- **입력값**: 2500000 (숫자)\n- **표시**: "2,500,000원" (한국 로케일 포맷)\n- **구현**: `value.toLocaleString(\'ko-KR\')` + "원" 접미사\n- **천 단위 구분**: 쉼표로 자동 구분되어 가독성 향상\n\n**모바일/태블릿 레이아웃:**\n- 헤더 우측에 큰 폰트로 강조 표시\n- `text-16 tablet:text-18 font-bold shrink-0`\n- shrink-0으로 금액이 축소되지 않도록 보호\n\n**데스크탑 레이아웃:**\n- 주문 금액 컬럼에 `text-14 font-bold`로 표시\n- 다른 컬럼과 정렬을 유지하면서 볼드 처리로 강조\n\n**고액 구매의 특징:**\n- urgent=true로 긴급 요청 처리\n- 고위 관리자(박관리)가 직접 승인\n- 10개의 상품 포함으로 대량 주문\n\n**실무 적용:**\n- 대규모 행사나 프로모션을 위한 구매\n- 분기별 또는 연간 대량 발주\n- 고액 승인 권한이 필요한 특수 구매\n- 재무팀 검토가 필요한 금액대',
      },
    },
  },
};

export const DifferentApprover: Story = {
  args: {
    item: createPurchaseItem(
      '8',
      'APPROVED',
      3,
      42000,
      '2025-07-11T00:00:00.000Z',
      '2025-07-13T00:00:00.000Z',
      false,
      {
        id: 'approver-3',
        name: '이승인',
        email: 'approve@example.com',
      }
    ),
    companyId: 'company-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '다른 승인자가 처리한 아이템입니다. 기본 approver(김코드)가 아닌 이승인이 승인했습니다.\n\n**승인자 정보 구조:**\n```typescript\napprover: {\n  id: string;      // 고유 식별자\n  name: string;    // UI에 표시되는 이름\n  email: string;   // 연락처 정보\n}\n```\n\n**담당자 표시:**\n- **모바일**: 상세 정보 그리드의 마지막 행에 "이승인" 표시\n- **태블릿**: 2x2 그리드의 우측 하단에 표시\n- **데스크탑**: 담당자 컬럼(마지막 컬럼)에 표시\n\n**승인자 역할:**\n- 구매 요청을 검토하고 승인하는 권한을 가진 사용자\n- 부서별, 금액별로 다른 승인자가 배정될 수 있음\n- 승인자의 id는 추후 통계나 감사(audit) 목적으로 활용\n\n**실무 시나리오:**\n- 부서별 예산 관리자가 다른 경우\n- 휴가나 부재 시 대리 승인자 지정\n- 금액대별 승인 권한 분산 (예: 10만원 이하는 팀장, 이상은 부서장)\n- 구매 카테고리별 전문 승인자 배정',
      },
    },
  },
};
