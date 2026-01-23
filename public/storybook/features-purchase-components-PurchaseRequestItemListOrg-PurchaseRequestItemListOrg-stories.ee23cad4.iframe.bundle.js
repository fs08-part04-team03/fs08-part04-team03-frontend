'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [835],
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
    './src/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AllVariants: () => AllVariants,
          Urgent: () => Urgent,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _PurchaseRequestItemListOrg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/Purchase/Organisms/PurchaseRequestItemListOrg',
          component: _PurchaseRequestItemListOrg__WEBPACK_IMPORTED_MODULE_1__.A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '구매 요청 아이템 리스트 컴포넌트입니다. 각 구매 요청 항목을 카드 형태로 표시하며, 모바일과 태블릿/데스크탑에서 다른 레이아웃을 제공합니다.\n\n**주요 기능:**\n- 모바일: 날짜, 아이템 설명, 가격, 요청인(UserProfile nameOnly variant)을 세로로 배치하고, 대기중 상태일 때 반려/승인 버튼을 하단에 표시합니다.\n- 태블릿/데스크탑: 테이블 형태로 구매 요청일, 상품 정보, 주문 금액, 요청인(UserProfile secondary variant), 비고(반려/승인 버튼)를 가로로 배치합니다.\n- 긴급 요청(urgent=true)은 빨간 배경색(bg-red-100)으로 강조 표시됩니다.\n- 대기중(PENDING) 상태이고 onReject와 onApprove prop이 제공될 때만 반려/승인 버튼이 표시됩니다.',
              },
            },
          },
        },
        createPurchaseItem = (
          id,
          status,
          itemCount = 1,
          totalPrice = 1900,
          shippingFee = 0,
          createdAt = '2024-07-04T00:00:00.000Z',
          urgent = !1
        ) => ({
          id,
          createdAt,
          updatedAt: createdAt,
          itemsTotalPrice: totalPrice,
          shippingFee,
          finalTotalPrice: totalPrice + shippingFee,
          totalPrice,
          status,
          purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
            id: `item-${index}`,
            quantity: 1,
            priceSnapshot: totalPrice / itemCount,
            itemTotal: totalPrice / itemCount,
            products: { id: index + 1, name: 0 === index ? '코카콜라 제로' : `상품 ${index + 1}` },
          })),
          requester: { id: 'requester-1', name: '홍길동', email: 'hong@example.com' },
          urgent,
          reason: '',
        }),
        AllVariants = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _PurchaseRequestItemListOrg__WEBPACK_IMPORTED_MODULE_1__.A,
              {
                purchaseList: [
                  createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
                  createPurchaseItem('2', 'PENDING', 1, 3e3, 0, '2024-07-03T00:00:00.000Z'),
                  createPurchaseItem('3', 'REJECTED', 3, 5e3, 0, '2024-07-02T00:00:00.000Z'),
                  createPurchaseItem('4', 'APPROVED', 1, 1500, 3e3, '2024-07-01T00:00:00.000Z'),
                ],
                onReject: () => {},
                onApprove: () => {},
              }
            ),
          parameters: {
            docs: {
              description: {
                story:
                  '모든 구매 요청 상태(APPROVED, PENDING, REJECTED)와 다양한 케이스를 한 번에 확인할 수 있습니다. 모바일에서는 가격에 "원" 단위가 포함되고, 요청인은 UserProfile의 nameOnly variant로 아바타와 이름만 표시됩니다. 태블릿/데스크탑에서는 요청인이 UserProfile의 secondary variant로 아바타, 이름, 회사명이 표시됩니다. 대기중(PENDING) 상태인 두 번째 항목에만 반려/승인 버튼이 표시됩니다.',
              },
            },
          },
        },
        Urgent = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _PurchaseRequestItemListOrg__WEBPACK_IMPORTED_MODULE_1__.A,
              {
                purchaseList: [
                  createPurchaseItem('1', 'PENDING', 1, 5e3, 0, '2024-07-04T00:00:00.000Z', !0),
                  createPurchaseItem('2', 'APPROVED', 2, 3e3, 0, '2024-07-03T00:00:00.000Z'),
                  createPurchaseItem('3', 'PENDING', 1, 8e3, 0, '2024-07-02T00:00:00.000Z', !0),
                  createPurchaseItem('4', 'REJECTED', 1, 2e3, 0, '2024-07-01T00:00:00.000Z'),
                ],
                onReject: () => {},
                onApprove: () => {},
              }
            ),
          parameters: {
            docs: {
              description: {
                story:
                  'urgent 속성이 true인 구매 요청 아이템은 빨간 배경색(bg-red-100)이 적용되어 긴급 요청임을 시각적으로 강조합니다. 첫 번째와 세 번째 항목이 긴급 요청으로 표시되며, 두 번째와 네 번째 항목은 일반 요청입니다. 긴급 요청은 모바일과 태블릿/데스크탑 모두에서 동일하게 강조 표시됩니다.',
              },
            },
          },
        },
        __namedExportsOrder = ['AllVariants', 'Urgent'];
      ((AllVariants.parameters = {
        ...AllVariants.parameters,
        docs: {
          ...AllVariants.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: () => <PurchaseRequestItemListOrg purchaseList={[createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'), createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'), createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z'), createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z')]} onReject={() => {}} onApprove={() => {}} />,\n  parameters: {\n    docs: {\n      description: {\n        story: '모든 구매 요청 상태(APPROVED, PENDING, REJECTED)와 다양한 케이스를 한 번에 확인할 수 있습니다. 모바일에서는 가격에 \"원\" 단위가 포함되고, 요청인은 UserProfile의 nameOnly variant로 아바타와 이름만 표시됩니다. 태블릿/데스크탑에서는 요청인이 UserProfile의 secondary variant로 아바타, 이름, 회사명이 표시됩니다. 대기중(PENDING) 상태인 두 번째 항목에만 반려/승인 버튼이 표시됩니다.'\n      }\n    }\n  }\n}",
            ...AllVariants.parameters?.docs?.source,
          },
        },
      }),
        (Urgent.parameters = {
          ...Urgent.parameters,
          docs: {
            ...Urgent.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: () => <PurchaseRequestItemListOrg purchaseList={[createPurchaseItem('1', 'PENDING', 1, 5000, 0, '2024-07-04T00:00:00.000Z', true), createPurchaseItem('2', 'APPROVED', 2, 3000, 0, '2024-07-03T00:00:00.000Z'), createPurchaseItem('3', 'PENDING', 1, 8000, 0, '2024-07-02T00:00:00.000Z', true), createPurchaseItem('4', 'REJECTED', 1, 2000, 0, '2024-07-01T00:00:00.000Z')]} onReject={() => {}} onApprove={() => {}} />,\n  parameters: {\n    docs: {\n      description: {\n        story: 'urgent 속성이 true인 구매 요청 아이템은 빨간 배경색(bg-red-100)이 적용되어 긴급 요청임을 시각적으로 강조합니다. 첫 번째와 세 번째 항목이 긴급 요청으로 표시되며, 두 번째와 네 번째 항목은 일반 요청입니다. 긴급 요청은 모바일과 태블릿/데스크탑 모두에서 동일하게 강조 표시됩니다.'\n      }\n    }\n  }\n}",
              ...Urgent.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
