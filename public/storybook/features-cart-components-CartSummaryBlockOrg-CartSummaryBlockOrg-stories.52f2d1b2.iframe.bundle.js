'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4982],
  {
    './src/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg.stories.tsx'(
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
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
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
        __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/Cart/Organisms/CartSummaryBlockOrg',
          component: __webpack_require__(
            './src/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '\n조직용 장바구니 요약 블록 컴포넌트입니다.\n\n### Role 별 동작\n\n- **User**\n  - 상품 선택 및 수량 변경 가능\n  - 즉시 구매 버튼 비활성화\n  - 예산 정보 미노출\n\n- **Manager**\n  - 예산 내: 구매 요청 가능\n  - 예산 초과: 긴급 구매 요청 버튼 노출\n\n- **Admin**\n  - 예산 내: 즉시 구매 가능\n  - 예산 초과: 예산 관리 버튼 노출\n\n※ 라우팅과 API 연동은 페이지 레벨에서 처리합니다.\n        ',
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
