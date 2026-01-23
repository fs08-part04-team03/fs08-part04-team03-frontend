'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9792],
  {
    './src/components/atoms/Button/Button.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => __WEBPACK_DEFAULT_EXPORT__,
        X: () => SignupButton,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const baseClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'inline-flex items-center justify-center',
          'font-bold',
          'cursor-pointer',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-500',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        ),
        variantClass = {
          primary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-gray-950 text-gray-50',
            'hover:bg-gray-800',
            'rounded-default'
          ),
          secondary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-white text-gray-900',
            'border border-gray-900',
            'hover:bg-gray-25',
            'rounded-default'
          ),
          signup: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-black text-white',
            'hover:bg-gray-700'
          ),
        },
        inactiveClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'bg-gray-100 text-gray-300 border border-gray-200',
          'cursor-not-allowed',
          'rounded-default'
        ),
        sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-40 text-13 px-16'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-44 text-14 px-20'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-64 text-16 px-24'),
        },
        Button = ({
          variant = 'primary',
          size = 'md',
          fullWidth = !1,
          inactive,
          rightIcon,
          children,
          className,
          type = 'button',
          ...rest
        }) => {
          const isSignup = 'signup' === variant;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
            type,
            disabled: inactive,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              baseClass,
              inactive ? inactiveClass : variantClass[variant],
              !isSignup && size && sizeClass[size],
              isSignup && 'w-160 h-44 text-14 px-20 rounded-100',
              fullWidth && 'w-full',
              className
            ),
            ...rest,
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', { children }),
              rightIcon,
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = Button,
        SignupButton = ({
          inactive,
          rightIcon,
          children,
          className,
          onClick,
          onFocus,
          onBlur,
          id,
          type = 'button',
          'aria-label': ariaLabel,
          fullWidth,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
            type,
            variant: 'signup',
            inactive,
            rightIcon,
            fullWidth,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('gap-4', className),
            onClick,
            onFocus,
            onBlur,
            id,
            'aria-label': ariaLabel,
            children,
          });
      ((Button.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Button',
        props: {
          type: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'button' | 'submit' | 'reset'",
              elements: [
                { name: 'literal', value: "'button'" },
                { name: 'literal', value: "'submit'" },
                { name: 'literal', value: "'reset'" },
              ],
            },
            description: '',
            defaultValue: { value: "'button'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'primary' | 'secondary' | 'signup'",
              elements: [
                { name: 'literal', value: "'primary'" },
                { name: 'literal', value: "'secondary'" },
                { name: 'literal', value: "'signup'" },
              ],
            },
            description: '',
            defaultValue: { value: "'primary'", computed: !1 },
          },
          size: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'sm' | 'md' | 'lg'",
              elements: [
                { name: 'literal', value: "'sm'" },
                { name: 'literal', value: "'md'" },
                { name: 'literal', value: "'lg'" },
              ],
            },
            description: '',
            defaultValue: { value: "'md'", computed: !1 },
          },
          fullWidth: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          inactive: { required: !1, tsType: { name: 'boolean' }, description: '' },
          rightIcon: { required: !1, tsType: { name: 'ReactNode' }, description: '' },
        },
        composes: ['Omit'],
      }),
        (SignupButton.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'SignupButton',
          props: { type: { defaultValue: { value: "'button'", computed: !1 }, required: !1 } },
        }));
    },
    './src/components/molecules/PaginationBlock/PaginationBlock.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const PaginationBlock = ({ current, total, onPrev, onNext }) => {
          const [page, setPage] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(current);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            const safeTotal = Math.max(1, total),
              safeCurrent = Math.min(Math.max(1, current), safeTotal);
            setPage(safeCurrent);
          }, [current, total]);
          const isPrevEnd = 1 === page,
            isNextEnd = page === total;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex items-center justify-between h-40 w-327 tablet:w-696 desktop:w-1400 mb-140',
            role: 'navigation',
            'aria-label': '페이지네이션',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'text-gray-primary-500 text-16 tracking-tight font-suit',
                children: [page, ' of ', total],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-30',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page > 1) {
                          const newPage = page - 1;
                          (setPage(newPage), onPrev?.(newPage));
                        }
                      },
                      inactive: isPrevEnd,
                      'aria-label': '이전 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isPrevEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-left.svg',
                                alt: '이전 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isPrevEnd,
                              'text-gray-primary-500': !isPrevEnd,
                            }),
                            children: 'Prev',
                          }),
                        ],
                      }),
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page < total) {
                          const newPage = page + 1;
                          (setPage(newPage), onNext?.(newPage));
                        }
                      },
                      inactive: isNextEnd,
                      'aria-label': '다음 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isNextEnd,
                              'text-gray-950': !isNextEnd,
                            }),
                            children: 'Next',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isNextEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-right.svg',
                                alt: '다음 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                        ],
                      }),
                    }
                  ),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PaginationBlock;
      PaginationBlock.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PaginationBlock',
        props: {
          current: { required: !0, tsType: { name: 'number' }, description: '' },
          total: { required: !0, tsType: { name: 'number' }, description: '' },
          onPrev: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onNext: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
    './src/features/purchase-history/components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          EmptyList: () => EmptyList,
          LongList: () => LongList,
          UrgentRequest: () => UrgentRequest,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryListOrg',
          component: __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg.tsx'
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
                  '구매 내역 리스트를 표시하는 Organism 컴포넌트입니다.\n\n**주요 기능:**\n- 구매 내역 배열을 받아 테이블 형태로 표시\n- 데스크톱에서는 고정 헤더와 함께 테이블 행으로 렌더링\n- 모바일/태블릿에서는 각 아이템이 카드 형태로 표시\n- 각 행 클릭 시 상세 페이지로 이동\n\n**구성 요소:**\n- **데스크톱 헤더**: 번호, 구매 요청일, 요청인, 구매 물품, 총 금액, 구매 승인일, 담당자, 번호 컬럼\n- **PurchaseHistoryRowOrg**: 각 구매 내역 아이템을 렌더링하는 행 컴포넌트\n- **반응형 레이아웃**: 화면 크기에 따라 다른 레이아웃 적용\n\n**사용 시나리오:**\n- Section 레벨에서 API로 받아온 구매 내역 배열을 전달받아 렌더링\n- 페이지네이션과 함께 사용하여 대량의 구매 내역을 효율적으로 표시',
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
        approvers = {
          김코드: { id: 'approver-1', name: '김코드', email: 'code@example.com' },
          박관리: { id: 'approver-2', name: '박관리', email: 'manager@example.com' },
        },
        Default = {
          args: {
            items: [
              createPurchaseItem(
                '1',
                'APPROVED',
                2,
                21e3,
                '2025-07-05T00:00:00.000Z',
                '2025-07-07T00:00:00.000Z',
                !1,
                '김스낵',
                approvers.김코드
              ),
              createPurchaseItem(
                '2',
                'APPROVED',
                3,
                45e3,
                '2025-07-03T00:00:00.000Z',
                '2025-07-03T06:00:00.000Z',
                !0,
                '이개발',
                approvers.김코드
              ),
              createPurchaseItem(
                '3',
                'PENDING',
                1,
                15e3,
                '2025-07-08T00:00:00.000Z',
                '2025-07-08T00:00:00.000Z',
                !1,
                '박디자인'
              ),
            ],
            currentPage: 1,
            totalPages: 1,
            onPageChange: () => {},
          },
          parameters: {
            docs: {
              description: {
                story:
                  '기본 구매 내역 리스트입니다. 3개의 구매 내역을 표시합니다.\n\n**데스크톱 레이아웃:**\n- 상단에 고정 헤더가 표시됩니다 (`bg-gray-50`, `border-b-2 border-gray-300`)\n- 헤더 높이는 `h-60` (60px)로 설정\n- 각 행은 `PurchaseHistoryRowOrg` 컴포넌트로 렌더링됩니다\n- 그리드 컬럼: `[120px_160px_1fr_140px_120px_100px]`\n  - 구매 요청일(120px), 요청인(160px), 구매 물품(1fr), 총 금액(140px), 구매 승인일(120px), 담당자(100px)\n- 컬럼 간 간격은 `gap-16` (16px)\n\n**모바일/태블릿 레이아웃:**\n- 헤더는 숨겨지고 (`hidden desktop:grid`)\n- 각 아이템이 독립적인 카드로 표시됩니다\n- 카드 내부에 필드명이 함께 표시되어 헤더가 불필요합니다\n\n**포함된 케이스:**\n1. **승인된 일반 요청**: 김스낵의 2개 상품 구매 (21,000원)\n2. **긴급 승인 요청**: 이개발의 3개 상품 긴급 구매 (45,000원) - 같은 날 6시간 내 승인\n3. **승인 대기 요청**: 박디자인의 1개 상품 구매 (15,000원) - 담당자 미배정\n\n**인터랙션:**\n- 각 행 클릭 시 `/{companyId}/purchase-history/{itemId}` 경로로 이동\n- 키보드 접근성 지원 (Tab으로 포커스 이동, Enter/Space로 활성화)\n- Hover 시 배경색 변경 (`hover:bg-gray-50`)',
              },
            },
          },
        },
        EmptyList = {
          args: { items: [], currentPage: 1, totalPages: 1, onPageChange: () => {} },
          parameters: {
            docs: {
              description: {
                story:
                  '빈 리스트 상태입니다. 구매 내역이 없을 때의 UI를 보여줍니다.\n\n**현재 동작:**\n- 데스크톱에서는 헤더만 표시되고 아이템이 없습니다\n- 모바일/태블릿에서는 아무것도 표시되지 않습니다\n\n**개선 고려사항:**\n- 향후 "구매 내역이 없습니다" 같은 EmptyState 컴포넌트를 추가할 수 있습니다\n- 빈 상태일 때도 헤더를 숨기거나, 안내 메시지를 표시하는 것이 UX 개선에 도움이 될 수 있습니다\n\n**실무 활용:**\n- 신규 회사나 사용자의 초기 상태\n- 필터링 결과가 없을 때\n- 특정 기간에 구매 내역이 없는 경우',
              },
            },
          },
        },
        UrgentRequest = {
          args: {
            items: [
              createPurchaseItem(
                '1',
                'APPROVED',
                2,
                21e3,
                '2025-07-05T00:00:00.000Z',
                '2025-07-05T06:00:00.000Z',
                !0,
                '김스낵',
                approvers.김코드
              ),
              createPurchaseItem(
                '2',
                'APPROVED',
                3,
                45e3,
                '2025-07-03T00:00:00.000Z',
                '2025-07-03T06:00:00.000Z',
                !0,
                '이개발',
                approvers.김코드
              ),
              createPurchaseItem(
                '3',
                'PENDING',
                1,
                15e3,
                '2025-07-08T00:00:00.000Z',
                '2025-07-08T00:00:00.000Z',
                !0,
                '박디자인'
              ),
            ],
            currentPage: 1,
            totalPages: 1,
            onPageChange: () => {},
          },
          parameters: {
            docs: {
              description: {
                story:
                  '긴급 요청이 포함된 구매 내역 리스트입니다. 모든 아이템이 urgent=true로 설정되어 있습니다.\n\n**긴급 요청 표시:**\n- 각 행의 요청인 옆에 StatusTag 컴포넌트로 "즉시 요청" 태그가 표시됩니다\n- 태그 스타일: 배경색 `bg-[#F2F6FF]`, 텍스트 색상 `text-[#4C8AE1]`\n- 태그 크기: `text-12`로 작게 표시되어 주요 정보를 방해하지 않음\n\n**포함된 케이스:**\n1. **긴급 승인 완료**: 김스낵의 긴급 요청 - 같은 날 6시간 내 승인 처리\n2. **긴급 승인 완료**: 이개발의 긴급 요청 - 같은 날 6시간 내 승인 처리\n3. **긴급 승인 대기**: 박디자인의 긴급 요청 - 아직 승인 대기 중\n\n**데스크톱 레이아웃:**\n- 요청인 컬럼에서 이름과 긴급 태그가 `flex items-center gap-8`로 수평 정렬\n- 긴급 태그가 여러 행에 표시되어 시각적으로 강조됨\n\n**모바일/태블릿 레이아웃:**\n- 각 카드의 요청인 필드에 긴급 태그가 함께 표시\n- RequesterWithUrgentTag 컴포넌트를 통해 일관된 표시\n\n**실무 활용:**\n- 긴급 요청만 필터링하여 확인\n- 긴급 요청의 처리 속도 모니터링\n- 우선순위가 높은 구매 건 관리',
              },
            },
          },
        },
        LongList = {
          args: {
            items: Array.from({ length: 10 }, (_, i) =>
              createPurchaseItem(
                `${i + 1}`,
                i % 3 == 0 ? 'PENDING' : 'APPROVED',
                Math.floor(5 * Math.random()) + 1,
                Math.floor(1e5 * Math.random()) + 1e4,
                `2025-07-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
                `2025-07-${String(i + 2).padStart(2, '0')}T00:00:00.000Z`,
                i % 4 == 0,
                `사용자${i + 1}`,
                i % 3 == 0 ? void 0 : Object.values(approvers)[i % 3]
              )
            ),
            currentPage: 1,
            totalPages: 3,
            onPageChange: () => {},
          },
          parameters: {
            docs: {
              description: {
                story:
                  '10개의 구매 내역을 표시하는 긴 리스트입니다.\n\n**스크롤 동작:**\n- 데스크톱에서는 테이블 형태로 긴 리스트가 스크롤됩니다\n- 헤더는 고정되지 않으며 함께 스크롤됩니다 (sticky header는 미구현)\n- 각 행의 높이는 `h-100` (100px)로 고정되어 일관된 레이아웃 유지\n\n**다양한 상태 포함:**\n- **PENDING 상태**: 3개마다 1개씩 (인덱스 0, 3, 6, 9)\n- **긴급 요청**: 4개마다 1개씩 (인덱스 0, 4, 8)\n- **승인자 없음**: PENDING 상태와 동일하게 3개마다 1개\n- **랜덤 금액**: 10,000원 ~ 100,000원 사이\n- **랜덤 상품 수**: 1개 ~ 5개\n\n**성능 고려사항:**\n- 현재는 모든 아이템이 한 번에 렌더링됩니다\n- 실제 서비스에서는 10개 이상의 데이터가 있을 때 페이지네이션이 필요합니다\n- 가상 스크롤링(virtual scrolling)을 고려할 수 있습니다\n\n**실무 활용:**\n- 월별 또는 분기별 구매 내역 조회\n- 대량의 구매 내역을 한눈에 확인\n- 스크롤을 통한 과거 내역 탐색',
              },
            },
          },
        },
        __namedExportsOrder = ['Default', 'EmptyList', 'UrgentRequest', 'LongList'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    items: [createPurchaseItem('1', 'APPROVED', 2, 21000, '2025-07-05T00:00:00.000Z', '2025-07-07T00:00:00.000Z', false, '김스낵', approvers.김코드), createPurchaseItem('2', 'APPROVED', 3, 45000, '2025-07-03T00:00:00.000Z', '2025-07-03T06:00:00.000Z', true, '이개발', approvers.김코드), createPurchaseItem('3', 'PENDING', 1, 15000, '2025-07-08T00:00:00.000Z', '2025-07-08T00:00:00.000Z', false, '박디자인')],\n    currentPage: 1,\n    totalPages: 1,\n    onPageChange: () => {}\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 구매 내역 리스트입니다. 3개의 구매 내역을 표시합니다.\\n\\n**데스크톱 레이아웃:**\\n- 상단에 고정 헤더가 표시됩니다 (`bg-gray-50`, `border-b-2 border-gray-300`)\\n- 헤더 높이는 `h-60` (60px)로 설정\\n- 각 행은 `PurchaseHistoryRowOrg` 컴포넌트로 렌더링됩니다\\n- 그리드 컬럼: `[120px_160px_1fr_140px_120px_100px]`\\n  - 구매 요청일(120px), 요청인(160px), 구매 물품(1fr), 총 금액(140px), 구매 승인일(120px), 담당자(100px)\\n- 컬럼 간 간격은 `gap-16` (16px)\\n\\n**모바일/태블릿 레이아웃:**\\n- 헤더는 숨겨지고 (`hidden desktop:grid`)\\n- 각 아이템이 독립적인 카드로 표시됩니다\\n- 카드 내부에 필드명이 함께 표시되어 헤더가 불필요합니다\\n\\n**포함된 케이스:**\\n1. **승인된 일반 요청**: 김스낵의 2개 상품 구매 (21,000원)\\n2. **긴급 승인 요청**: 이개발의 3개 상품 긴급 구매 (45,000원) - 같은 날 6시간 내 승인\\n3. **승인 대기 요청**: 박디자인의 1개 상품 구매 (15,000원) - 담당자 미배정\\n\\n**인터랙션:**\\n- 각 행 클릭 시 `/{companyId}/purchase-history/{itemId}` 경로로 이동\\n- 키보드 접근성 지원 (Tab으로 포커스 이동, Enter/Space로 활성화)\\n- Hover 시 배경색 변경 (`hover:bg-gray-50`)'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (EmptyList.parameters = {
          ...EmptyList.parameters,
          docs: {
            ...EmptyList.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    items: [],\n    currentPage: 1,\n    totalPages: 1,\n    onPageChange: () => {}\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'빈 리스트 상태입니다. 구매 내역이 없을 때의 UI를 보여줍니다.\\n\\n**현재 동작:**\\n- 데스크톱에서는 헤더만 표시되고 아이템이 없습니다\\n- 모바일/태블릿에서는 아무것도 표시되지 않습니다\\n\\n**개선 고려사항:**\\n- 향후 "구매 내역이 없습니다" 같은 EmptyState 컴포넌트를 추가할 수 있습니다\\n- 빈 상태일 때도 헤더를 숨기거나, 안내 메시지를 표시하는 것이 UX 개선에 도움이 될 수 있습니다\\n\\n**실무 활용:**\\n- 신규 회사나 사용자의 초기 상태\\n- 필터링 결과가 없을 때\\n- 특정 기간에 구매 내역이 없는 경우\'\n      }\n    }\n  }\n}',
              ...EmptyList.parameters?.docs?.source,
            },
          },
        }),
        (UrgentRequest.parameters = {
          ...UrgentRequest.parameters,
          docs: {
            ...UrgentRequest.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: [createPurchaseItem('1', 'APPROVED', 2, 21000, '2025-07-05T00:00:00.000Z', '2025-07-05T06:00:00.000Z', true, '김스낵', approvers.김코드), createPurchaseItem('2', 'APPROVED', 3, 45000, '2025-07-03T00:00:00.000Z', '2025-07-03T06:00:00.000Z', true, '이개발', approvers.김코드), createPurchaseItem('3', 'PENDING', 1, 15000, '2025-07-08T00:00:00.000Z', '2025-07-08T00:00:00.000Z', true, '박디자인')],\n    currentPage: 1,\n    totalPages: 1,\n    onPageChange: () => {}\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '긴급 요청이 포함된 구매 내역 리스트입니다. 모든 아이템이 urgent=true로 설정되어 있습니다.\\n\\n**긴급 요청 표시:**\\n- 각 행의 요청인 옆에 StatusTag 컴포넌트로 \"즉시 요청\" 태그가 표시됩니다\\n- 태그 스타일: 배경색 `bg-[#F2F6FF]`, 텍스트 색상 `text-[#4C8AE1]`\\n- 태그 크기: `text-12`로 작게 표시되어 주요 정보를 방해하지 않음\\n\\n**포함된 케이스:**\\n1. **긴급 승인 완료**: 김스낵의 긴급 요청 - 같은 날 6시간 내 승인 처리\\n2. **긴급 승인 완료**: 이개발의 긴급 요청 - 같은 날 6시간 내 승인 처리\\n3. **긴급 승인 대기**: 박디자인의 긴급 요청 - 아직 승인 대기 중\\n\\n**데스크톱 레이아웃:**\\n- 요청인 컬럼에서 이름과 긴급 태그가 `flex items-center gap-8`로 수평 정렬\\n- 긴급 태그가 여러 행에 표시되어 시각적으로 강조됨\\n\\n**모바일/태블릿 레이아웃:**\\n- 각 카드의 요청인 필드에 긴급 태그가 함께 표시\\n- RequesterWithUrgentTag 컴포넌트를 통해 일관된 표시\\n\\n**실무 활용:**\\n- 긴급 요청만 필터링하여 확인\\n- 긴급 요청의 처리 속도 모니터링\\n- 우선순위가 높은 구매 건 관리'\n      }\n    }\n  }\n}",
              ...UrgentRequest.parameters?.docs?.source,
            },
          },
        }),
        (LongList.parameters = {
          ...LongList.parameters,
          docs: {
            ...LongList.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: Array.from({\n      length: 10\n    }, (_, i) => createPurchaseItem(`${i + 1}`, i % 3 === 0 ? 'PENDING' : 'APPROVED', Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 100000) + 10000, `2025-07-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`, `2025-07-${String(i + 2).padStart(2, '0')}T00:00:00.000Z`, i % 4 === 0, `사용자${i + 1}`, i % 3 === 0 ? undefined : Object.values(approvers)[i % 3])),\n    currentPage: 1,\n    totalPages: 3,\n    onPageChange: () => {}\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '10개의 구매 내역을 표시하는 긴 리스트입니다.\\n\\n**스크롤 동작:**\\n- 데스크톱에서는 테이블 형태로 긴 리스트가 스크롤됩니다\\n- 헤더는 고정되지 않으며 함께 스크롤됩니다 (sticky header는 미구현)\\n- 각 행의 높이는 `h-100` (100px)로 고정되어 일관된 레이아웃 유지\\n\\n**다양한 상태 포함:**\\n- **PENDING 상태**: 3개마다 1개씩 (인덱스 0, 3, 6, 9)\\n- **긴급 요청**: 4개마다 1개씩 (인덱스 0, 4, 8)\\n- **승인자 없음**: PENDING 상태와 동일하게 3개마다 1개\\n- **랜덤 금액**: 10,000원 ~ 100,000원 사이\\n- **랜덤 상품 수**: 1개 ~ 5개\\n\\n**성능 고려사항:**\\n- 현재는 모든 아이템이 한 번에 렌더링됩니다\\n- 실제 서비스에서는 10개 이상의 데이터가 있을 때 페이지네이션이 필요합니다\\n- 가상 스크롤링(virtual scrolling)을 고려할 수 있습니다\\n\\n**실무 활용:**\\n- 월별 또는 분기별 구매 내역 조회\\n- 대량의 구매 내역을 한눈에 확인\\n- 스크롤을 통한 과거 내역 탐색'\n      }\n    }\n  }\n}",
              ...LongList.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/features/purchase-history/components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _components_molecules_PaginationBlock_PaginationBlock__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__('./src/components/molecules/PaginationBlock/PaginationBlock.tsx'),
        _PurchaseHistoryRowOrg_PurchaseHistoryRowOrg__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryRowOrg/PurchaseHistoryRowOrg.tsx'
          ),
        _PurchaseHistoryTableHeader_PurchaseHistoryTableHeader__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.tsx'
          );
      const PurchaseHistoryListOrg = ({
          items,
          currentPage = 1,
          totalPages = 1,
          onPageChange,
          onItemClick,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'w-full',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _PurchaseHistoryTableHeader_PurchaseHistoryTableHeader__WEBPACK_IMPORTED_MODULE_3__.J,
                {}
              ),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'w-full',
                children: items.map((item, index) =>
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    'div',
                    {
                      className: 'pb-26 tablet:pb-44 desktop:pb-0',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _PurchaseHistoryRowOrg_PurchaseHistoryRowOrg__WEBPACK_IMPORTED_MODULE_2__.A,
                        { item, isFirst: 0 === index, onItemClick }
                      ),
                    },
                    item.id
                  )
                ),
              }),
              totalPages > 1 &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'flex justify-center mt-40 desktop:mt-60',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_molecules_PaginationBlock_PaginationBlock__WEBPACK_IMPORTED_MODULE_1__.A,
                    {
                      current: currentPage,
                      total: totalPages,
                      onPrev: (newPage) => {
                        onPageChange?.(newPage);
                      },
                      onNext: (newPage) => {
                        onPageChange?.(newPage);
                      },
                    }
                  ),
                }),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseHistoryListOrg;
      PurchaseHistoryListOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryListOrg',
        props: {
          items: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'PurchaseRequestItem' }],
              raw: 'PurchaseRequestItem[]',
            },
            description: '',
          },
          currentPage: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '1', computed: !1 },
          },
          totalPages: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '1', computed: !1 },
          },
          onPageChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(page: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'page' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onItemClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(orderId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'orderId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
    './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { J: () => PurchaseHistoryTableHeader });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _constants_labels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/features/purchase-history/constants/labels.ts'
        );
      const PurchaseHistoryTableHeader = () =>
        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
          className:
            'hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-60 w-full desktop:border-b desktop:border-gray-200',
          children: [
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700 pl-40',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.REQUEST_DATE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.REQUESTER,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.PRODUCTS,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.TOTAL_PRICE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children:
                _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.APPROVAL_DATE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.MANAGER,
            }),
          ],
        });
      PurchaseHistoryTableHeader.__docgenInfo = {
        description:
          '구매 내역 테이블 헤더 컴포넌트\nPurchaseHistoryTem과 PurchaseHistoryListOrg에서 재사용',
        methods: [],
        displayName: 'PurchaseHistoryTableHeader',
      };
    },
  },
]);
