'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [394],
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
    './src/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg.tsx'(
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
        _components_molecules_OrderItemCard_OrderItemCard__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__('./src/components/molecules/OrderItemCard/OrderItemCard.tsx'),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _utils_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__('./src/utils/array.ts');
      const OrderCompletedSummaryOrg = ({
          cartRole,
          userType = 'default',
          items,
          shippingFee,
          requestMessage = '',
          onGoCart,
          onGoOrderHistory,
          onPurchaseRequest,
        }) => {
          const isUser = 'user' === cartRole,
            isRequestUser = isUser && 'request' === userType,
            isDefaultUser = isUser && 'default' === userType,
            [message, setMessage] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            [touched, setTouched] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [isUrgent, _setIsUrgent] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            textAreaRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            orderPrice = (0, _utils_array__WEBPACK_IMPORTED_MODULE_6__._l)(
              items,
              'unitPrice',
              'quantity'
            ),
            totalPrice = orderPrice + shippingFee,
            isMessageValid = message.trim().length > 0,
            isSubmitDisabled = isRequestUser && !isMessageValid,
            renderButtons = () =>
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                  'py-24 tablet:py-0 flex gap-16 tablet:gap-20 desktop:justify-center tablet:mt-50 desktop:mt-60',
                  isUser ? 'mt-0' : 'mt-84'
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      variant: 'secondary',
                      className: 'cursor-pointer w-155.5 h-64 tablet:w-338 desktop:w-300',
                      onClick: onGoCart,
                      children: '장바구니로',
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      className: 'cursor-pointer w-155.5 h-64 tablet:w-338 desktop:w-300',
                      type: isRequestUser ? 'submit' : 'button',
                      inactive: isSubmitDisabled,
                      onClick: isRequestUser ? void 0 : onGoOrderHistory,
                      children: isRequestUser ? '구매 요청' : '구매내역 확인',
                    }
                  ),
                ],
              });
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
            className: 'w-327 tablet:w-696 desktop:w-1200 mx-auto',
            children: [
              !isRequestUser &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h3', {
                  className:
                    'text-center font-bold text-24 tracking--0.6 text-gray-950 tablet:text-30 tablet:tracking--0.75 desktop:text-30 desktop:tracking--0.75',
                  children: '구매가 완료되었습니다',
                }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'mt-40 tablet:mt-70 flex items-center gap-6 px-12',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'font-bold text-16 tracking--0.4 text-gray-950',
                    children: '요청 품목',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                    className: 'font-normal text-16 tracking--0.4 text-gray-950',
                    children: ['총 ', items.length, '개'],
                  }),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'mt-20 rounded-default bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.12)]',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className:
                      'max-h-240 overflow-y-auto scrollbar-none tablet:max-h-360 tablet:px-14 tablet:pt-28 desktop:max-h-400 desktop:px-50 desktop:pt-44',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'flex flex-col gap-4',
                      children: items.map((item) =>
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_molecules_OrderItemCard_OrderItemCard__WEBPACK_IMPORTED_MODULE_2__.A,
                          {
                            variant: 'confirm',
                            name: item.name,
                            unitPrice: item.unitPrice,
                            quantity: item.quantity,
                            imageSrc: item.imageSrc,
                            productId: item.id,
                          },
                          item.id
                        )
                      ),
                    }),
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    className:
                      'mt-32 px-12 pb-8 tablet:mt-28 desktop:mt-24 space-y-16 tablet:space-y-10 tablet:px-30 tablet:pb-30 desktop:px-70 desktop:pb-40',
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex justify-between items-center',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className:
                              'font-bold text-14 tracking--0.35 text-gray-700 tablet:text-16 tablet:tracking--0.4',
                            children: '주문 금액',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_4__.A,
                            { value: orderPrice }
                          ),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex justify-between items-center',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className:
                              'font-bold text-14 tracking--0.35 text-gray-700 tablet:text-16 tablet:tracking--0.4',
                            children: '배송비',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_4__.A,
                            { value: shippingFee }
                          ),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex justify-between items-center',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: 'font-bold text-18 tracking--0.45 text-gray-950',
                            children: '총 주문 금액',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_4__.A,
                            {
                              value: totalPrice,
                              className: 'font-bold text-18 tracking--0.45 text-gray-950',
                            }
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              isRequestUser &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('form', {
                  onSubmit: (e) => {
                    if ((e.preventDefault(), isSubmitDisabled))
                      return (setTouched(!0), void textAreaRef.current?.focus());
                    isRequestUser && onPurchaseRequest
                      ? onPurchaseRequest(message, isUrgent)
                      : onGoOrderHistory?.();
                  },
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: 'mx-auto mt-40 mb-20',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          id: 'order-request-label',
                          className:
                            'block text-16 font-bold text-gray-950 tracking-tight mb-14 tablet:mb-20',
                          children: '요청 사항',
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('textarea', {
                          'aria-labelledby': 'order-request-label',
                          ref: textAreaRef,
                          value: message,
                          placeholder: '메시지를 입력해주세요.',
                          onChange: (e) => {
                            e.target.value.length <= 50 && setMessage(e.target.value);
                          },
                          onBlur: () => setTouched(!0),
                          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                            '\n                  block\n                  w-326.5 h-165\n                  tablet:w-696 desktop:w-1200\n                  px-12 py-8\n                  text-16 tracking-tight\n                  border rounded-default resize-none scrollbar-none\n                ',
                            touched && !isMessageValid
                              ? 'border-error-500'
                              : 'border-gray-300 focus:border-gray-500'
                          ),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex justify-between mt-4 text-14',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-error-500',
                              children:
                                touched && !isMessageValid
                                  ? '요청 사항을 입력해주세요 (최대 50자)'
                                  : ' ',
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                              className: 'text-gray-400',
                              children: [message.length, '/', 50],
                            }),
                          ],
                        }),
                      ],
                    }),
                    renderButtons(),
                  ],
                }),
              isDefaultUser &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'mx-auto mt-40',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className:
                        'block text-16 font-bold text-gray-950 tracking-tight mb-14 tablet:mb-20',
                      children: '요청 사항',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className:
                        ' w-326.5 h-165 tablet:w-696 desktop:w-1200 px-12 py-8 text-16 tracking-tight border border-gray-300 rounded-default bg-gray-50 whitespace-pre-wrap ',
                      children: requestMessage || '요청 사항이 없습니다.',
                    }),
                  ],
                }),
              !isRequestUser && renderButtons(),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = OrderCompletedSummaryOrg;
      OrderCompletedSummaryOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'OrderCompletedSummaryOrg',
        props: {
          cartRole: { required: !0, tsType: { name: 'CartRole' }, description: '' },
          userType: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'default' | 'request'",
              elements: [
                { name: 'literal', value: "'default'" },
                { name: 'literal', value: "'request'" },
              ],
            },
            description: '',
            defaultValue: { value: "'default'", computed: !1 },
          },
          items: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'OrderCompletedItem' }],
              raw: 'OrderCompletedItem[]',
            },
            description: '',
          },
          shippingFee: { required: !0, tsType: { name: 'number' }, description: '' },
          requestMessage: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onGoCart: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onGoOrderHistory: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onPurchaseRequest: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(requestMessage: string, isUrgent?: boolean) => void',
              signature: {
                arguments: [
                  { type: { name: 'string' }, name: 'requestMessage' },
                  { type: { name: 'boolean' }, name: 'isUrgent' },
                ],
                return: { name: 'void' },
              },
            },
            description: '',
          },
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
    './src/features/cart/template/OrderTem/OrderTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          UserRequest: () => UserRequest,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => OrderTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        StepBreadcrumb = __webpack_require__(
          './src/components/molecules/StepBreadcrumb/StepBreadcrumb.tsx'
        ),
        OrderCompletedSummaryOrg = __webpack_require__(
          './src/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg.tsx'
        ),
        steps = __webpack_require__('./src/features/cart/constants/steps.ts');
      const OrderTem = (props) => {
          const { items, shippingFee, onGoCart, onGoOrderHistory, onPurchaseRequest } =
            (function isGroupedProps(props) {
              return 'dataState' in props && 'navigationHandlers' in props;
            })(props)
              ? {
                  items: props.dataState.items,
                  shippingFee: props.dataState.shippingFee,
                  onGoCart: props.navigationHandlers.onGoCart,
                  onGoOrderHistory: props.navigationHandlers.onGoOrderHistory,
                  onPurchaseRequest: props.navigationHandlers.onPurchaseRequest,
                }
              : props;
          return (0, jsx_runtime.jsx)('div', {
            className: 'mx-auto',
            children: (0, jsx_runtime.jsxs)('div', {
              className:
                ' mx-auto mt-60 tablet:mt-60 desktop:mt-80 w-327 tablet:w-696 desktop:w-1200 ',
              children: [
                (0, jsx_runtime.jsx)('div', {
                  className: 'flex justify-center mb-40 tablet:mb-70 desktop:mb-70',
                  children: (0, jsx_runtime.jsx)(StepBreadcrumb.A, {
                    steps: steps.Ws,
                    currentStep: 2,
                  }),
                }),
                (0, jsx_runtime.jsx)(OrderCompletedSummaryOrg.A, {
                  cartRole: 'user',
                  userType: 'request',
                  items,
                  shippingFee,
                  onGoCart,
                  onGoOrderHistory,
                  onPurchaseRequest,
                }),
              ],
            }),
          });
        },
        OrderTem_OrderTem = OrderTem;
      OrderTem.__docgenInfo = {
        description: 'OrderTem\n- 순수 UI 조립 레이어\n- props 기반 렌더링만 수행',
        methods: [],
        displayName: 'OrderTem',
      };
      const OrderTem_stories = {
          title: 'Features/Cart/Template/OrderTem',
          component: OrderTem_OrderTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '\n구매 요청 및 주문 완료 화면에서 사용되는  \n**Order Template 레벨 컴포넌트**입니다.\n\nStepBreadcrumb과 OrderCompletedSummaryOrg를 조합하여  \n**주문 흐름의 전체 레이아웃과 구조**를 담당합니다.\n\n---\n\n### 역할 (Responsibility)\n\n- 페이지 전반의 **레이아웃 및 여백 관리**\n- StepBreadcrumb와 OrderCompletedSummaryOrg의 **구성 및 배치**\n- 주문 완료 / 구매 요청 화면의 **시각적 구조 제공**\n- 하위 Organism에 필요한 데이터와 콜백을 전달\n\n> ⚠️ 본 Template은 **비즈니스 로직을 포함하지 않으며**,  \n> 구매 요청 유효성, 메시지 입력 검증, 버튼 제어 로직은  \n> 모두 OrderCompletedSummaryOrg에서 처리합니다.\n\n---\n\n### StepBreadcrumb 규칙\n\n- 총 3단계 구성\n  1. Shopping Cart\n  2. Order\n  3. Order Confirmed\n- **가운데(Order) Step을 기준으로 중앙 정렬**\n- 현재 Step: `Order (index: 1)`\n\n---\n\n### User 구매 요청 전용 Template\n\n- 내부적으로 다음 props가 **고정 적용**됩니다.\n\n```ts\nrole="user"\nuserType="request"\n```\n\n- 관리자 / 어드민 분기 ❌\n- 구매 요청 메시지 입력 영역 노출 ⭕\n- 요청 사항 미입력 시 제출 불가 ⭕\n\n---\n\n### 사용 위치\n\n- Next.js Page / Route Segment 레벨\n- 데이터 패칭 및 라우팅 제어는 Page에서 담당\n- 본 Template은 **순수 UI 조합 역할만 수행**\n        ',
              },
            },
          },
        },
        UserRequest = {
          args: {
            items: [
              {
                id: 1,
                name: '노트북',
                unitPrice: 12e5,
                quantity: 1,
                imageSrc: '/images/sample1.png',
              },
              {
                id: 2,
                name: '무선 마우스',
                unitPrice: 5e4,
                quantity: 2,
                imageSrc: '/images/sample2.png',
              },
              {
                id: 3,
                name: '키보드',
                unitPrice: 15e4,
                quantity: 1,
                imageSrc: '/images/sample3.png',
              },
            ],
            shippingFee: 3e3,
            onGoCart: () => {},
            onGoOrderHistory: () => {},
          },
        },
        __namedExportsOrder = ['UserRequest'];
      UserRequest.parameters = {
        ...UserRequest.parameters,
        docs: {
          ...UserRequest.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    items: mockItems,\n    shippingFee: 3_000,\n    onGoCart: () => {},\n    onGoOrderHistory: () => {}\n  }\n}',
            ...UserRequest.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nUser – 구매 요청\n======================',
            ...UserRequest.parameters?.docs?.description,
          },
        },
      };
    },
    './src/utils/array.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      function filterByIds(items, ids, idField = 'id') {
        const idSet = new Set(ids.map(String));
        return items.filter((item) => idSet.has(String(item[idField])));
      }
      function sumPrices(items) {
        return items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
      }
      function sumBy(items, field) {
        return items.reduce((sum, item) => {
          const value = item[field];
          return sum + ('number' == typeof value ? value : 0);
        }, 0);
      }
      function sumTotal(items, priceField, quantityField) {
        return items.reduce((sum, item) => {
          const price = item[priceField],
            quantity = item[quantityField];
          return (
            sum +
            ('number' == typeof price ? price : 0) * ('number' == typeof quantity ? quantity : 1)
          );
        }, 0);
      }
      __webpack_require__.d(__webpack_exports__, {
        _l: () => sumTotal,
        as: () => filterByIds,
        mN: () => sumPrices,
        xu: () => sumBy,
      });
    },
  },
]);
