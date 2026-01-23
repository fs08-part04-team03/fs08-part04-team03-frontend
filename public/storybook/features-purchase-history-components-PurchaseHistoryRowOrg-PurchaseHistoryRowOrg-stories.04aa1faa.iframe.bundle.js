'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6994],
  {
    './node_modules/clsx/dist/clsx.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      function r(e) {
        var t,
          f,
          n = '';
        if ('string' == typeof e || 'number' == typeof e) n += e;
        else if ('object' == typeof e)
          if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
          } else for (f in e) e[f] && (n && (n += ' '), (n += f));
        return n;
      }
      function clsx() {
        for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
          (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      __webpack_require__.d(__webpack_exports__, {
        $: () => clsx,
        A: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = clsx;
    },
    './src/features/purchase-history/components/PurchaseHistoryRowOrg/PurchaseHistoryRowOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          MultipleProducts: () => MultipleProducts,
          PendingRequest: () => PendingRequest,
          UrgentRequest: () => UrgentRequest,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryRowOrg',
          component: __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryRowOrg/PurchaseHistoryRowOrg.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            nextjs: {
              appDirectory: !0,
              navigation: { pathname: '/company-1/purchase-history', params: {} },
            },
            docs: {
              description: {
                component:
                  '단일 구매 내역 행을 반응형 레이아웃으로 표시하는 Organism 컴포넌트입니다.\n\n**반응형 레이아웃:**\n- **모바일**: 세로 카드 형태로 구성. 단일 열 그리드로 구매 요청일, 요청인, 구매 승인일, 담당자 정보를 표시합니다.\n- **태블릿**: 세로 카드 형태 유지. 2열 그리드(2x2)로 정보를 더 컴팩트하게 표시합니다.\n- **데스크톱**: 테이블 행 형태로 변환. 양쪽 번호를 포함한 8개 컬럼으로 수평 정렬됩니다.\n\n**주요 기능:**\n- 클릭 시 해당 구매 내역 상세 페이지로 이동 (`/{companyId}/purchase-history/{itemId}`)\n- 키보드 접근성 지원 (Enter/Space 키로 활성화 가능)\n- 긴급 요청(urgent=true)은 요청인 옆에 빨간색 "즉시 요청" 태그로 표시\n- Hover 시 배경색 변경으로 인터랙션 피드백 제공\n\n**데이터 최적화:**\n- `useMemo`를 사용하여 `itemDescription`과 `totalQuantity` 계산 최적화\n- `useCallback`을 사용하여 이벤트 핸들러 재생성 방지\n\n**사용 시나리오:**\n- `PurchaseHistoryListOrg`에서 `purchaseList` 배열을 map하여 각 아이템을 렌더링하는 용도로 설계됨\n- 테이블 헤더는 별도 컴포넌트에서 관리하며, 이 컴포넌트는 순수하게 단일 행/카드만 담당',
              },
            },
          },
        },
        createPurchaseItem = (
          id,
          status,
          itemCount,
          totalPrice,
          createdAt,
          updatedAt,
          urgent,
          requesterName,
          approver
        ) => ({
          id,
          createdAt,
          updatedAt,
          itemsTotalPrice: totalPrice,
          shippingFee: 0,
          finalTotalPrice: totalPrice,
          totalPrice,
          status,
          purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
            id: `item-${id}-${index}`,
            quantity: 0 === index ? 2 : 1,
            priceSnapshot: totalPrice / itemCount,
            itemTotal: (totalPrice / itemCount) * (0 === index ? 2 : 1),
            products: { id: index + 1, name: 0 === index ? '코카콜라 제로' : `상품 ${index + 1}` },
          })),
          requester: {
            id: `requester-${id}`,
            name: requesterName,
            email: `${requesterName.toLowerCase()}@example.com`,
          },
          approver,
          urgent,
          reason: '',
        }),
        approvers____ = { id: 'approver-1', name: '김코드', email: 'code@example.com' },
        approvers____$0 = { id: 'approver-2', name: '박관리', email: 'manager@example.com' },
        Default = {
          args: {
            item: createPurchaseItem(
              '1',
              'APPROVED',
              2,
              21e3,
              '2025-07-05T00:00:00.000Z',
              '2025-07-07T00:00:00.000Z',
              !1,
              '김스낵',
              approvers____
            ),
          },
          parameters: {
            docs: {
              description: {
                story:
                  '기본 구매 내역 행입니다. 승인된 구매 내역을 표시합니다.\n\n**데스크톱 레이아웃:**\n- 그리드 컬럼: `[120px_160px_1fr_140px_120px_100px]`\n- 구매 요청일(120px): `DateText` 컴포넌트로 포맷팅 (`YYYY.MM.DD`)\n- 요청인(160px): 이름과 긴급 태그(있는 경우)를 `flex items-center gap-8`로 수평 정렬\n- 구매 물품(1fr): 상품명과 총 수량을 `flex flex-col gap-4`로 세로 배치\n- 총 금액(140px): `PriceText` 컴포넌트로 천 단위 구분 표시\n- 구매 승인일(120px): 승인자가 있는 경우만 날짜 표시, 없으면 "-"\n- 담당자(100px): `item.approver?.name || \'-\'` 패턴으로 표시\n- 행 높이: `h-100` (100px)로 고정\n- 컬럼 간 간격: `gap-16` (16px)\n\n**모바일 레이아웃:**\n- 카드 형태로 `flex flex-col` 배치\n- 각 필드는 `grid grid-cols-[140px_1fr]`로 라벨과 값 분리\n- 구매 요청일, 요청인, 구매 승인일, 담당자 순서로 표시\n- `border-b border-gray-100`로 구분선 추가\n- 패딩: `p-16` (16px)\n\n**태블릿 레이아웃:**\n- 카드 형태 유지하되 `grid grid-cols-[140px_1fr_140px_1fr]`로 2x2 그리드 구성\n- 첫 번째 행: 구매 요청일 | 날짜 | 요청인 | 이름+태그\n- 두 번째 행: 구매 승인일 | 날짜/- | 담당자 | 이름/-\n- 각 셀은 `flex items-center px-20 py-15`로 정렬\n\n**인터랙션:**\n- 클릭 시 router.push를 통해 상세 페이지로 이동\n- `role="button"`, `tabIndex={0}`로 접근성 지원\n- `onKeyDown`에서 Enter/Space 키 처리\n- Hover 시 `hover:bg-gray-50` 배경색 변경',
              },
            },
          },
        },
        UrgentRequest = {
          args: {
            item: createPurchaseItem(
              '2',
              'APPROVED',
              3,
              45e3,
              '2025-07-03T00:00:00.000Z',
              '2025-07-03T06:00:00.000Z',
              !0,
              '이개발',
              approvers____
            ),
          },
          parameters: {
            docs: {
              description: {
                story:
                  '긴급 요청이 포함된 구매 내역 행입니다. `urgent=true`로 설정되어 있어 시각적 강조가 적용됩니다.\n\n**긴급 요청 표시:**\n- **StatusTag 컴포넌트**: `variant="urgent"`로 배경색 `bg-[#F2F6FF]`, 텍스트 색상 `text-[#4C8AE1]`의 "즉시 요청" 태그가 요청인 옆에 표시됩니다\n- **모바일/태블릿**: `RequesterWithUrgentTag` 컴포넌트를 통해 요청인 이름과 태그가 `flex items-center gap-16`로 수평 정렬되어 표시됩니다\n- **데스크탑**: 요청인 컬럼 내에서 `flex items-center gap-8`로 이름과 태그가 수평 정렬되어 표시됩니다\n- **태그 스타일**: `text-12` 크기로 작게 표시되어 주요 정보를 방해하지 않으며, 아이콘은 없습니다\n\n**빠른 승인 처리:**\n- 구매 요청일: 2025년 7월 3일 00:00\n- 구매 승인일: 2025년 7월 3일 06:00\n- 같은 날 6시간 내 승인 처리되어 긴급 요청의 빠른 처리를 반영\n\n**사용 시나리오:**\n- 긴급하게 필요한 물품 구매 요청\n- 우선 순위가 높은 구매 건\n- 마감 임박 또는 재고 부족 상황',
              },
            },
          },
        },
        PendingRequest = {
          args: {
            item: createPurchaseItem(
              '3',
              'PENDING',
              1,
              15e3,
              '2025-07-08T00:00:00.000Z',
              '2025-07-08T00:00:00.000Z',
              !1,
              '박디자인'
            ),
          },
          parameters: {
            docs: {
              description: {
                story:
                  '승인 대기 중인 구매 내역 행입니다. approver가 없는 PENDING 상태를 나타냅니다.\n\n**승인자 없는 경우 표시:**\n- **구매 승인일**: item.approver 체크로 조건부 렌더링하여 "-" 표시\n  - 모바일: item.approver가 있으면 DateText 표시, 없으면 "-" 텍스트 표시\n  - 태블릿: 동일한 패턴으로 "-" 표시\n  - 데스크탑: DateText 컴포넌트에 "-" 문자열 전달 (item.approver가 없을 때)\n- **담당자**: item.approver?.name || "-" 패턴으로 optional chaining 사용하여 "-" 표시\n\n**PENDING 상태의 의미:**\n- 구매 요청이 생성되었지만 아직 승인되지 않은 상태\n- 담당자가 배정되지 않아 approver가 undefined\n- updatedAt은 생성 시점(createdAt)과 동일\n\n**실무 활용:**\n- 승인 대기 목록에서 어떤 요청이 처리되지 않았는지 파악\n- 담당자가 배정되지 않은 요청을 빠르게 식별\n- 승인 프로세스의 병목 지점 발견',
              },
            },
          },
        },
        MultipleProducts = {
          args: {
            item: createPurchaseItem(
              '4',
              'APPROVED',
              5,
              125e3,
              '2025-07-04T00:00:00.000Z',
              '2025-07-06T00:00:00.000Z',
              !1,
              '최기획',
              approvers____$0
            ),
          },
          parameters: {
            docs: {
              description: {
                story:
                  '여러 상품을 포함하는 구매 내역 행입니다. 5개의 서로 다른 상품을 다양한 수량으로 주문한 경우입니다.\n\n**다중 상품 표시:**\n- **상품 정보**: formatItemDescription 함수를 통해 "코카콜라 제로 외 4건"으로 간결하게 표시\n- **총수량 계산**: purchaseItems.reduce로 모든 상품의 수량 합산 (2 + 1 + 1 + 1 + 1 = 6개)\n- **첫 번째 상품 우선**: formatItemDescription은 항상 첫 번째 상품명을 기준으로 표시\n\n**formatItemDescription 로직:**\n- purchaseItems.length === 0인 경우: 빈 문자열 반환\n- purchaseItems.length === 1인 경우: 첫 번째 상품명만 반환\n- 그 외의 경우: 첫 번째 상품명 + " 외 " + (배열 길이 - 1) + "건" 형식으로 반환\n\n**useMemo 최적화:**\n- itemDescription과 totalQuantity를 useMemo로 메모이제이션\n- purchaseItems가 변경되지 않는 한 재계산하지 않음\n- 리렌더링 시 성능 최적화\n\n**실무 활용:**\n- 정기 주문 또는 대량 발주\n- 여러 부서의 요청을 통합한 구매\n- 재고 보충을 위한 다양한 품목 주문',
              },
            },
          },
        },
        __namedExportsOrder = ['Default', 'UrgentRequest', 'PendingRequest', 'MultipleProducts'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    item: createPurchaseItem('1', 'APPROVED', 2, 21000, '2025-07-05T00:00:00.000Z', '2025-07-07T00:00:00.000Z', false, '김스낵', approvers.김코드)\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 구매 내역 행입니다. 승인된 구매 내역을 표시합니다.\\n\\n**데스크톱 레이아웃:**\\n- 그리드 컬럼: `[120px_160px_1fr_140px_120px_100px]`\\n- 구매 요청일(120px): `DateText` 컴포넌트로 포맷팅 (`YYYY.MM.DD`)\\n- 요청인(160px): 이름과 긴급 태그(있는 경우)를 `flex items-center gap-8`로 수평 정렬\\n- 구매 물품(1fr): 상품명과 총 수량을 `flex flex-col gap-4`로 세로 배치\\n- 총 금액(140px): `PriceText` 컴포넌트로 천 단위 구분 표시\\n- 구매 승인일(120px): 승인자가 있는 경우만 날짜 표시, 없으면 \"-\"\\n- 담당자(100px): `item.approver?.name || \\'-\\'` 패턴으로 표시\\n- 행 높이: `h-100` (100px)로 고정\\n- 컬럼 간 간격: `gap-16` (16px)\\n\\n**모바일 레이아웃:**\\n- 카드 형태로 `flex flex-col` 배치\\n- 각 필드는 `grid grid-cols-[140px_1fr]`로 라벨과 값 분리\\n- 구매 요청일, 요청인, 구매 승인일, 담당자 순서로 표시\\n- `border-b border-gray-100`로 구분선 추가\\n- 패딩: `p-16` (16px)\\n\\n**태블릿 레이아웃:**\\n- 카드 형태 유지하되 `grid grid-cols-[140px_1fr_140px_1fr]`로 2x2 그리드 구성\\n- 첫 번째 행: 구매 요청일 | 날짜 | 요청인 | 이름+태그\\n- 두 번째 행: 구매 승인일 | 날짜/- | 담당자 | 이름/-\\n- 각 셀은 `flex items-center px-20 py-15`로 정렬\\n\\n**인터랙션:**\\n- 클릭 시 router.push를 통해 상세 페이지로 이동\\n- `role=\"button\"`, `tabIndex={0}`로 접근성 지원\\n- `onKeyDown`에서 Enter/Space 키 처리\\n- Hover 시 `hover:bg-gray-50` 배경색 변경'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (UrgentRequest.parameters = {
          ...UrgentRequest.parameters,
          docs: {
            ...UrgentRequest.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    item: createPurchaseItem('2', 'APPROVED', 3, 45000, '2025-07-03T00:00:00.000Z', '2025-07-03T06:00:00.000Z', true, '이개발', approvers.김코드)\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '긴급 요청이 포함된 구매 내역 행입니다. `urgent=true`로 설정되어 있어 시각적 강조가 적용됩니다.\\n\\n**긴급 요청 표시:**\\n- **StatusTag 컴포넌트**: `variant=\"urgent\"`로 배경색 `bg-[#F2F6FF]`, 텍스트 색상 `text-[#4C8AE1]`의 \"즉시 요청\" 태그가 요청인 옆에 표시됩니다\\n- **모바일/태블릿**: `RequesterWithUrgentTag` 컴포넌트를 통해 요청인 이름과 태그가 `flex items-center gap-16`로 수평 정렬되어 표시됩니다\\n- **데스크탑**: 요청인 컬럼 내에서 `flex items-center gap-8`로 이름과 태그가 수평 정렬되어 표시됩니다\\n- **태그 스타일**: `text-12` 크기로 작게 표시되어 주요 정보를 방해하지 않으며, 아이콘은 없습니다\\n\\n**빠른 승인 처리:**\\n- 구매 요청일: 2025년 7월 3일 00:00\\n- 구매 승인일: 2025년 7월 3일 06:00\\n- 같은 날 6시간 내 승인 처리되어 긴급 요청의 빠른 처리를 반영\\n\\n**사용 시나리오:**\\n- 긴급하게 필요한 물품 구매 요청\\n- 우선 순위가 높은 구매 건\\n- 마감 임박 또는 재고 부족 상황'\n      }\n    }\n  }\n}",
              ...UrgentRequest.parameters?.docs?.source,
            },
          },
        }),
        (PendingRequest.parameters = {
          ...PendingRequest.parameters,
          docs: {
            ...PendingRequest.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    item: createPurchaseItem(\'3\', \'PENDING\', 1, 15000, \'2025-07-08T00:00:00.000Z\', \'2025-07-08T00:00:00.000Z\', false, \'박디자인\')\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'승인 대기 중인 구매 내역 행입니다. approver가 없는 PENDING 상태를 나타냅니다.\\n\\n**승인자 없는 경우 표시:**\\n- **구매 승인일**: item.approver 체크로 조건부 렌더링하여 "-" 표시\\n  - 모바일: item.approver가 있으면 DateText 표시, 없으면 "-" 텍스트 표시\\n  - 태블릿: 동일한 패턴으로 "-" 표시\\n  - 데스크탑: DateText 컴포넌트에 "-" 문자열 전달 (item.approver가 없을 때)\\n- **담당자**: item.approver?.name || "-" 패턴으로 optional chaining 사용하여 "-" 표시\\n\\n**PENDING 상태의 의미:**\\n- 구매 요청이 생성되었지만 아직 승인되지 않은 상태\\n- 담당자가 배정되지 않아 approver가 undefined\\n- updatedAt은 생성 시점(createdAt)과 동일\\n\\n**실무 활용:**\\n- 승인 대기 목록에서 어떤 요청이 처리되지 않았는지 파악\\n- 담당자가 배정되지 않은 요청을 빠르게 식별\\n- 승인 프로세스의 병목 지점 발견\'\n      }\n    }\n  }\n}',
              ...PendingRequest.parameters?.docs?.source,
            },
          },
        }),
        (MultipleProducts.parameters = {
          ...MultipleProducts.parameters,
          docs: {
            ...MultipleProducts.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    item: createPurchaseItem('4', 'APPROVED', 5, 125000, '2025-07-04T00:00:00.000Z', '2025-07-06T00:00:00.000Z', false, '최기획', approvers.박관리)\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '여러 상품을 포함하는 구매 내역 행입니다. 5개의 서로 다른 상품을 다양한 수량으로 주문한 경우입니다.\\n\\n**다중 상품 표시:**\\n- **상품 정보**: formatItemDescription 함수를 통해 \"코카콜라 제로 외 4건\"으로 간결하게 표시\\n- **총수량 계산**: purchaseItems.reduce로 모든 상품의 수량 합산 (2 + 1 + 1 + 1 + 1 = 6개)\\n- **첫 번째 상품 우선**: formatItemDescription은 항상 첫 번째 상품명을 기준으로 표시\\n\\n**formatItemDescription 로직:**\\n- purchaseItems.length === 0인 경우: 빈 문자열 반환\\n- purchaseItems.length === 1인 경우: 첫 번째 상품명만 반환\\n- 그 외의 경우: 첫 번째 상품명 + \" 외 \" + (배열 길이 - 1) + \"건\" 형식으로 반환\\n\\n**useMemo 최적화:**\\n- itemDescription과 totalQuantity를 useMemo로 메모이제이션\\n- purchaseItems가 변경되지 않는 한 재계산하지 않음\\n- 리렌더링 시 성능 최적화\\n\\n**실무 활용:**\\n- 정기 주문 또는 대량 발주\\n- 여러 부서의 요청을 통합한 구매\\n- 재고 보충을 위한 다양한 품목 주문'\n      }\n    }\n  }\n}",
              ...MultipleProducts.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
