'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1278],
  {
    './src/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Admin: () => Admin,
          Manager: () => Manager,
          UserDefault: () => UserDefault,
          UserRequest: () => UserRequest,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const mockItems = [
          { id: 1, name: '노트북', unitPrice: 12e5, quantity: 1, imageSrc: '/images/sample1.png' },
          {
            id: 2,
            name: '무선 마우스',
            unitPrice: 5e4,
            quantity: 2,
            imageSrc: '/images/sample2.png',
          },
        ],
        __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/Cart/Organisms/OrderCompletedSummaryOrg',
          component: __webpack_require__(
            './src/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '\n조직 구매 플로우에서 **구매 완료 / 구매 요청 요약**을 담당하는 컴포넌트입니다.\n\n---\n\n## 📌 주요 특징\n\n- **role 기반 UI 분기**\n- px 단위 고정 레이아웃\n- 모바일 / 태블릿 / 데스크톱 반응형 유지\n- textarea 검증 로직 포함 (user 전용)\n\n---\n\n## 🧩 Role & Type 동작 규칙\n\n### ✅ User\n- 요청 사항 입력 textarea 노출\n- 글자 수 제한 (최대 50자)\n- 입력 없을 경우 에러 메시지 표시\n\n#### User Type\n- **default**\n  - 상단 타이틀: `구매가 완료되었습니다`\n  - 버튼: `구매내역 확인`\n\n- **request**\n  - 상단 타이틀 제거\n  - 버튼 텍스트: **구매 요청**\n\n---\n\n### ✅ Manager / Admin\n- 동일한 UI 동작\n- textarea 미노출\n- 단순 구매 완료 요약 화면\n- CTA 버튼은 `구매내역 확인`\n\n---\n\n## ⚠️ 참고 사항\n- 본 컴포넌트는 **UI와 이벤트 트리거만 담당**\n- 실제 라우팅 / API 호출은 페이지 레벨에서 처리\n        ',
              },
            },
          },
          argTypes: {
            cartRole: {
              control: 'radio',
              options: ['user', 'manager', 'admin'],
              description: '화면 분기 기준 역할',
            },
            userType: {
              control: 'radio',
              options: ['default', 'request'],
              description: 'User 전용 화면 타입',
            },
          },
        },
        UserDefault = {
          name: 'User / 기본 구매 완료',
          args: {
            cartRole: 'user',
            userType: 'default',
            items: mockItems,
            shippingFee: 3e3,
            onGoCart: () => {},
            onGoOrderHistory: () => {},
          },
        },
        UserRequest = {
          name: 'User / 구매 요청',
          args: {
            cartRole: 'user',
            userType: 'request',
            items: mockItems,
            shippingFee: 3e3,
            onGoCart: () => {},
            onGoOrderHistory: () => {},
          },
        },
        Manager = {
          args: {
            cartRole: 'manager',
            items: mockItems,
            shippingFee: 3e3,
            onGoCart: () => {},
            onGoOrderHistory: () => {},
          },
        },
        Admin = {
          args: {
            cartRole: 'admin',
            items: mockItems,
            shippingFee: 3e3,
            onGoCart: () => {},
            onGoOrderHistory: () => {},
          },
        },
        __namedExportsOrder = ['UserDefault', 'UserRequest', 'Manager', 'Admin'];
      ((UserDefault.parameters = {
        ...UserDefault.parameters,
        docs: {
          ...UserDefault.parameters?.docs,
          source: {
            originalSource:
              "{\n  name: 'User / 기본 구매 완료',\n  args: {\n    cartRole: 'user',\n    userType: 'default',\n    items: mockItems,\n    shippingFee: 3_000,\n    onGoCart: () => {},\n    onGoOrderHistory: () => {}\n  }\n}",
            ...UserDefault.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nUser - Default\n======================',
            ...UserDefault.parameters?.docs?.description,
          },
        },
      }),
        (UserRequest.parameters = {
          ...UserRequest.parameters,
          docs: {
            ...UserRequest.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: 'User / 구매 요청',\n  args: {\n    cartRole: 'user',\n    userType: 'request',\n    items: mockItems,\n    shippingFee: 3_000,\n    onGoCart: () => {},\n    onGoOrderHistory: () => {}\n  }\n}",
              ...UserRequest.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nUser - Request\n======================',
              ...UserRequest.parameters?.docs?.description,
            },
          },
        }),
        (Manager.parameters = {
          ...Manager.parameters,
          docs: {
            ...Manager.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    cartRole: 'manager',\n    items: mockItems,\n    shippingFee: 3_000,\n    onGoCart: () => {},\n    onGoOrderHistory: () => {}\n  }\n}",
              ...Manager.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nManager\n======================',
              ...Manager.parameters?.docs?.description,
            },
          },
        }),
        (Admin.parameters = {
          ...Admin.parameters,
          docs: {
            ...Admin.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    cartRole: 'admin',\n    items: mockItems,\n    shippingFee: 3_000,\n    onGoCart: () => {},\n    onGoOrderHistory: () => {}\n  }\n}",
              ...Admin.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nAdmin\n======================',
              ...Admin.parameters?.docs?.description,
            },
          },
        }));
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
