'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2324],
  {
    './src/components/molecules/StepBreadcrumb/StepBreadcrumb.tsx'(
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
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const StepBreadcrumb = ({ steps, currentStep, className }) => {
          if (!steps || 0 === steps.length) return null;
          const safeCurrent = Math.min(Math.max(currentStep, 1), steps.length);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('nav', {
            'aria-label': 'Checkout steps',
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
              'flex flex-col gap-4',
              'tablet:flex-row tablet:items-center tablet:gap-20',
              className
            ),
            children: steps.map((step, index) => {
              const stepNumber = index + 1,
                isActive = stepNumber === safeCurrent;
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                {
                  children: [
                    index > 0 &&
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                        className: 'hidden tablet:inline text-gray-300',
                        children: '>',
                      }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                        'flex justify-center items-center gap-4',
                        'text-16 leading-24 tracking--0.4',
                        'tablet:text-18 tablet:leading-26 tablet:tracking--0.45',
                        isActive ? 'text-gray-950 font-bold' : 'text-gray-300'
                      ),
                      'aria-current': isActive ? 'step' : void 0,
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                          className: 'tabular-nums pr-4 tablet:pr-6',
                          children: [stepNumber, '.'],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          children: step.label,
                        }),
                      ],
                    }),
                  ],
                },
                index
              );
            }),
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = StepBreadcrumb;
      StepBreadcrumb.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'StepBreadcrumb',
        props: {
          steps: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'StepBreadcrumbStep' }],
              raw: 'StepBreadcrumbStep[]',
            },
            description: '',
          },
          currentStep: { required: !0, tsType: { name: 'number' }, description: '1-based index' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/cart/constants/steps.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        TO: () => CART_USER_STEPS,
        Ws: () => CART_ORDER_STEPS,
        pB: () => CART_MANAGER_ADMIN_STEPS,
      });
      const CART_USER_STEPS = [
          { label: 'Shopping Cart' },
          { label: 'Order' },
          { label: 'Order Confirmed' },
        ],
        CART_MANAGER_ADMIN_STEPS = [{ label: 'Shopping Cart' }, { label: 'Order Confirmed' }],
        CART_ORDER_STEPS = [
          { label: 'Shopping Cart' },
          { label: 'Order' },
          { label: 'Order Confirmed' },
        ];
    },
    './src/features/cart/template/ShoppingCartTem/ShoppingCartTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AdminBudgetExceeded: () => AdminBudgetExceeded,
          AdminWithinBudget: () => AdminWithinBudget,
          ManagerBudgetExceeded: () => ManagerBudgetExceeded,
          ManagerWithinBudget: () => ManagerWithinBudget,
          User: () => User,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => ShoppingCartTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        StepBreadcrumb = __webpack_require__(
          './src/components/molecules/StepBreadcrumb/StepBreadcrumb.tsx'
        ),
        CartSummaryBlockOrg = __webpack_require__(
          './src/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg.tsx'
        ),
        steps = __webpack_require__('./src/features/cart/constants/steps.ts');
      const ShoppingCartTem = ({ dataState, actionHandlers }) => {
          const { cartRole } = dataState,
            isUser = 'user' === cartRole;
          return (0, jsx_runtime.jsx)('div', {
            className: 'mx-auto',
            children: (0, jsx_runtime.jsxs)('div', {
              className:
                'mx-auto mt-60 tablet:mt-60 desktop:mt-80 w-327 tablet:w-696 desktop:w-1200 desktop:px-25',
              children: [
                (0, jsx_runtime.jsx)('div', {
                  className: 'flex justify-center mb-40 tablet:mb-70',
                  children: (0, jsx_runtime.jsx)(StepBreadcrumb.A, {
                    steps: isUser ? steps.TO : steps.pB,
                    currentStep: 1,
                  }),
                }),
                (0, jsx_runtime.jsx)(CartSummaryBlockOrg.A, { dataState, actionHandlers }),
              ],
            }),
          });
        },
        ShoppingCartTem_ShoppingCartTem = ShoppingCartTem;
      ShoppingCartTem.__docgenInfo = {
        description:
          'ShoppingCartTem\n- 순수 UI 조립 레이어\n- header / list / row / footer 컴포지션만 담당\n- props 기반 렌더링만 수행',
        methods: [],
        displayName: 'ShoppingCartTem',
        props: {
          dataState: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  cartRole: CartRole;\n  items: OrderItem[];\n  budget?: number;\n  loading?: boolean;\n}',
              signature: {
                properties: [
                  { key: 'cartRole', value: { name: 'CartRole', required: !0 } },
                  {
                    key: 'items',
                    value: {
                      name: 'Array',
                      elements: [{ name: 'OrderItem' }],
                      raw: 'OrderItem[]',
                      required: !0,
                    },
                  },
                  { key: 'budget', value: { name: 'number', required: !1 } },
                  { key: 'loading', value: { name: 'boolean', required: !1 } },
                ],
              },
            },
            description: '',
          },
          actionHandlers: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  onDeleteSelected?: (ids: string[]) => void;\n  onSubmit?: (itemIds: string[]) => void;\n  onGoBudgetManage?: () => void;\n  onQuantityChange?: (cartItemId: string, quantity: number) => void;\n  onContinueShopping?: () => void;\n}',
              signature: {
                properties: [
                  {
                    key: 'onDeleteSelected',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '(ids: string[]) => void',
                      signature: {
                        arguments: [
                          {
                            type: {
                              name: 'Array',
                              elements: [{ name: 'string' }],
                              raw: 'string[]',
                            },
                            name: 'ids',
                          },
                        ],
                        return: { name: 'void' },
                      },
                      required: !1,
                    },
                  },
                  {
                    key: 'onSubmit',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '(itemIds: string[]) => void',
                      signature: {
                        arguments: [
                          {
                            type: {
                              name: 'Array',
                              elements: [{ name: 'string' }],
                              raw: 'string[]',
                            },
                            name: 'itemIds',
                          },
                        ],
                        return: { name: 'void' },
                      },
                      required: !1,
                    },
                  },
                  {
                    key: 'onGoBudgetManage',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '() => void',
                      signature: { arguments: [], return: { name: 'void' } },
                      required: !1,
                    },
                  },
                  {
                    key: 'onQuantityChange',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '(cartItemId: string, quantity: number) => void',
                      signature: {
                        arguments: [
                          { type: { name: 'string' }, name: 'cartItemId' },
                          { type: { name: 'number' }, name: 'quantity' },
                        ],
                        return: { name: 'void' },
                      },
                      required: !1,
                    },
                  },
                  {
                    key: 'onContinueShopping',
                    value: {
                      name: 'signature',
                      type: 'function',
                      raw: '() => void',
                      signature: { arguments: [], return: { name: 'void' } },
                      required: !1,
                    },
                  },
                ],
              },
            },
            description: '',
          },
        },
      };
      const mockItems = [
          {
            cartItemId: 'cart-1',
            productId: 101,
            name: '노트북',
            price: 12e5,
            quantity: 1,
            imageSrc: '/images/sample1.png',
          },
          {
            cartItemId: 'cart-2',
            productId: 102,
            name: '무선 마우스',
            price: 5e4,
            quantity: 2,
            imageSrc: '/images/sample2.png',
          },
          {
            cartItemId: 'cart-3',
            productId: 103,
            name: '키보드',
            price: 15e4,
            quantity: 1,
            imageSrc: '/images/sample3.png',
          },
        ],
        ShoppingCartTem_stories = {
          title: 'Features/Cart/Template/ShoppingCartTem',
          component: ShoppingCartTem_ShoppingCartTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '\n장바구니 페이지의 **Template 레벨 컴포넌트**입니다.\n\nStepBreadcrumb과 CartSummaryBlockOrg를 조합하여  \n**장바구니 화면의 전체 레이아웃과 흐름**을 담당합니다.\n\n---\n\n### 역할 (Responsibility)\n\n- 페이지 전반의 **레이아웃 및 여백 관리**\n- StepBreadcrumb와 CartSummaryBlockOrg의 **구성 및 배치**\n- cartRole, items, budget 등의 props를 **하위 Organism으로 전달**\n\n> ⚠️ 비즈니스 로직 및 상태 관리는 하지 않으며  \n> 모든 구매 규칙 및 예산 로직은 CartSummaryBlockOrg에서 처리합니다.\n        ',
              },
            },
          },
          argTypes: {
            dataState: {
              control: 'object',
              description: '장바구니 데이터 상태 (cartRole, items, budget, loading)',
            },
          },
        },
        User = {
          args: {
            dataState: { cartRole: 'user', items: mockItems },
            actionHandlers: { onSubmit: () => {}, onDeleteSelected: () => {} },
          },
        },
        ManagerWithinBudget = {
          args: {
            dataState: { cartRole: 'manager', items: mockItems, budget: 2e6 },
            actionHandlers: { onSubmit: () => {}, onDeleteSelected: () => {} },
          },
        },
        ManagerBudgetExceeded = {
          args: {
            dataState: { cartRole: 'manager', items: mockItems, budget: 1e5 },
            actionHandlers: { onSubmit: () => {}, onDeleteSelected: () => {} },
          },
        },
        AdminWithinBudget = {
          args: {
            dataState: { cartRole: 'admin', items: mockItems, budget: 2e6 },
            actionHandlers: { onSubmit: () => {}, onDeleteSelected: () => {} },
          },
        },
        AdminBudgetExceeded = {
          args: {
            dataState: { cartRole: 'admin', items: mockItems, budget: 1e5 },
            actionHandlers: { onSubmit: () => {}, onGoBudgetManage: () => {} },
          },
        },
        __namedExportsOrder = [
          'User',
          'ManagerWithinBudget',
          'ManagerBudgetExceeded',
          'AdminWithinBudget',
          'AdminBudgetExceeded',
        ];
      ((User.parameters = {
        ...User.parameters,
        docs: {
          ...User.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    dataState: {\n      cartRole: 'user',\n      items: mockItems\n    },\n    actionHandlers: {\n      onSubmit: () => {},\n      onDeleteSelected: () => {}\n    }\n  }\n}",
            ...User.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nUser\n======================',
            ...User.parameters?.docs?.description,
          },
        },
      }),
        (ManagerWithinBudget.parameters = {
          ...ManagerWithinBudget.parameters,
          docs: {
            ...ManagerWithinBudget.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    dataState: {\n      cartRole: 'manager',\n      items: mockItems,\n      budget: 2_000_000\n    },\n    actionHandlers: {\n      onSubmit: () => {},\n      onDeleteSelected: () => {}\n    }\n  }\n}",
              ...ManagerWithinBudget.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nManager (예산 충분)\n======================',
              ...ManagerWithinBudget.parameters?.docs?.description,
            },
          },
        }),
        (ManagerBudgetExceeded.parameters = {
          ...ManagerBudgetExceeded.parameters,
          docs: {
            ...ManagerBudgetExceeded.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    dataState: {\n      cartRole: 'manager',\n      items: mockItems,\n      budget: 100_000\n    },\n    actionHandlers: {\n      onSubmit: () => {},\n      onDeleteSelected: () => {}\n    }\n  }\n}",
              ...ManagerBudgetExceeded.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nManager (예산 초과)\n======================',
              ...ManagerBudgetExceeded.parameters?.docs?.description,
            },
          },
        }),
        (AdminWithinBudget.parameters = {
          ...AdminWithinBudget.parameters,
          docs: {
            ...AdminWithinBudget.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    dataState: {\n      cartRole: 'admin',\n      items: mockItems,\n      budget: 2_000_000\n    },\n    actionHandlers: {\n      onSubmit: () => {},\n      onDeleteSelected: () => {}\n    }\n  }\n}",
              ...AdminWithinBudget.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nAdmin (예산 충분)\n======================',
              ...AdminWithinBudget.parameters?.docs?.description,
            },
          },
        }),
        (AdminBudgetExceeded.parameters = {
          ...AdminBudgetExceeded.parameters,
          docs: {
            ...AdminBudgetExceeded.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    dataState: {\n      cartRole: 'admin',\n      items: mockItems,\n      budget: 100_000\n    },\n    actionHandlers: {\n      onSubmit: () => {},\n      onGoBudgetManage: () => {}\n    }\n  }\n}",
              ...AdminBudgetExceeded.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nAdmin (예산 초과)\n======================',
              ...AdminBudgetExceeded.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
