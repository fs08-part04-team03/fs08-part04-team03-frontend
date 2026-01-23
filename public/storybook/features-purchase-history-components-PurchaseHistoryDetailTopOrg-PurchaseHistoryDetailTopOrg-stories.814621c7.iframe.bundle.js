'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3682],
  {
    './src/components/atoms/Divider/Divider.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { c: () => Divider });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const variantClass = { thin: 'bg-gray-100', thick: 'bg-gray-950' },
        thicknessClass = { thin: 'h-px', thick: 'h-0.5' },
        Divider = ({ orientation = 'horizontal', variant = 'thin', className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            role: 'separator',
            className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              variantClass[variant],
              'horizontal' === orientation
                ? `w-full ${thicknessClass[variant]}`
                : 'h-full ' + ('thin' === variant ? 'w-px' : 'w-0.5'),
              className
            ),
          });
      Divider.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Divider',
        props: {
          orientation: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'horizontal' | 'vertical'",
              elements: [
                { name: 'literal', value: "'horizontal'" },
                { name: 'literal', value: "'vertical'" },
              ],
            },
            description: '',
            defaultValue: { value: "'horizontal'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'thin' | 'thick'",
              elements: [
                { name: 'literal', value: "'thin'" },
                { name: 'literal', value: "'thick'" },
              ],
            },
            description: '',
            defaultValue: { value: "'thin'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/components/atoms/IconButton/IconButton.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { K: () => IconButton });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const variantClass = {
          default: 'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
          outline: 'border border-gray-200 text-gray-900 hover:bg-gray-50 active:bg-gray-100',
          filled: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700',
        },
        sizeClass = { sm: 'w-20 h-20 text-xs', md: 'w-32 h-32 text-sm', lg: 'w-36 h-36 text-base' },
        IconButton = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          ({ variant = 'default', size = 'md', className, children, ...props }, ref) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
              ref,
              type: 'button',
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'inline-flex items-center justify-center rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-40 disabled:cursor-not-allowed',
                variantClass[variant],
                sizeClass[size],
                className
              ),
              ...props,
              children,
            })
        );
      ((IconButton.displayName = 'IconButton'),
        (IconButton.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'IconButton',
          props: {
            variant: {
              required: !1,
              tsType: {
                name: 'union',
                raw: "'default' | 'filled' | 'outline'",
                elements: [
                  { name: 'literal', value: "'default'" },
                  { name: 'literal', value: "'filled'" },
                  { name: 'literal', value: "'outline'" },
                ],
              },
              description: '',
              defaultValue: { value: "'default'", computed: !1 },
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
            children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
          },
        }));
    },
    './src/features/purchase-history/components/PurchaseHistoryDetailTopOrg/PurchaseHistoryDetailTopOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          MultipleItems: () => MultipleItems,
          SingleItem: () => SingleItem,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryDetailTopOrg',
          component: __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryDetailTopOrg/PurchaseHistoryDetailTopOrg.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '구매 내역 상세 정보를 표시하는 컴포넌트입니다. 구매한 품목 목록을 토글 버튼으로 접고 펼칠 수 있으며, 각 품목은 OrderItemDetailCard 컴포넌트를 사용하여 표시됩니다.\n\n**주요 기능:**\n- 구매 내역 제목 표시\n- 구매 품목 개수 표시 및 토글 버튼\n- 화살표 아이콘 회전 애니메이션 (열림/닫힘 상태에 따라 180도 회전)\n- 품목 목록 접기/펼치기 기능\n- 각 품목 간 Divider로 구분\n\n**사용 컴포넌트:**\n- OrderItemDetailCard: 각 구매 품목을 표시하는 카드 컴포넌트 (반응형 레이아웃 지원)\n- IconButton: 토글 버튼\n- Divider: 품목 간 구분선',
              },
            },
          },
        },
        mockPurchaseRequest = {
          id: '1',
          createdAt: '2025-06-03T00:00:00.000Z',
          updatedAt: '2025-06-03T00:00:00.000Z',
          itemsTotalPrice: 7900,
          shippingFee: 0,
          finalTotalPrice: 7900,
          totalPrice: 7900,
          status: 'APPROVED',
          purchaseItems: [
            {
              id: 'item-1',
              quantity: 1,
              priceSnapshot: 1900,
              itemTotal: 1900,
              products: { id: 1, name: '코카콜라 제로', image: '/images/zero-cola.svg' },
            },
            {
              id: 'item-2',
              quantity: 2,
              priceSnapshot: 3e3,
              itemTotal: 6e3,
              products: { id: 2, name: '펩시 콜라', image: '/images/zero-cola.svg' },
            },
          ],
          requester: { id: 'requester-1', name: '홍길동', email: 'hong@example.com' },
          reason: '승인되었습니다.',
        },
        Default = {
          args: { purchaseRequest: mockPurchaseRequest },
          parameters: {
            docs: {
              description: {
                story:
                  '기본 구매 내역 상세 뷰입니다. 토글 버튼을 클릭하면 구매 품목 목록이 펼쳐지거나 접힙니다. 여러 품목이 있을 경우 각 품목 사이에 Divider가 표시됩니다. 화살표 아이콘은 목록이 열려있을 때 180도 회전하여 아래쪽을 가리킵니다.',
              },
            },
          },
        },
        MultipleItems = {
          args: {
            purchaseRequest: {
              ...mockPurchaseRequest,
              itemsTotalPrice: 33400,
              shippingFee: 3e3,
              finalTotalPrice: 36400,
              totalPrice: 36400,
              purchaseItems: [
                {
                  id: 'item-1',
                  quantity: 1,
                  priceSnapshot: 1900,
                  itemTotal: 1900,
                  products: { id: 1, name: '코카콜라 제로', image: '/images/zero-cola.svg' },
                },
                {
                  id: 'item-2',
                  quantity: 2,
                  priceSnapshot: 3e3,
                  itemTotal: 6e3,
                  products: { id: 2, name: '펩시 콜라', image: '/images/zero-cola.svg' },
                },
                {
                  id: 'item-3',
                  quantity: 3,
                  priceSnapshot: 5e3,
                  itemTotal: 15e3,
                  products: { id: 3, name: '스프라이트', image: '/images/zero-cola.svg' },
                },
                {
                  id: 'item-4',
                  quantity: 1,
                  priceSnapshot: 2500,
                  itemTotal: 2500,
                  products: { id: 4, name: '환타', image: '/images/zero-cola.svg' },
                },
                {
                  id: 'item-5',
                  quantity: 2,
                  priceSnapshot: 4e3,
                  itemTotal: 8e3,
                  products: { id: 5, name: '밀키스', image: '/images/zero-cola.svg' },
                },
              ],
            },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '여러 품목(5개)이 있는 구매 내역입니다. 3개 이상의 품목이 있을 때 스크롤이 생기며, 최대 높이 280px로 제한됩니다. 각 품목 사이에 Divider가 표시되고, 토글 버튼으로 목록을 접고 펼칠 수 있습니다.\n\n**특징:**\n- 5개 품목 표시\n- 스크롤 가능 영역 (max-h-280 overflow-y-auto)\n- 주문금액, 배송비, 총 주문금액 요약',
              },
            },
          },
        },
        SingleItem = {
          args: {
            purchaseRequest: {
              ...mockPurchaseRequest,
              itemsTotalPrice: 9500,
              finalTotalPrice: 9500,
              totalPrice: 9500,
              purchaseItems: [
                {
                  id: 'item-1',
                  quantity: 5,
                  priceSnapshot: 1900,
                  itemTotal: 9500,
                  products: { id: 1, name: '코카콜라 제로', image: '/images/zero-cola.svg' },
                },
              ],
            },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '단일 품목만 있는 구매 내역입니다. 품목이 하나뿐이므로 Divider가 표시되지 않습니다.',
              },
            },
          },
        },
        __namedExportsOrder = ['Default', 'MultipleItems', 'SingleItem'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    purchaseRequest: mockPurchaseRequest\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 구매 내역 상세 뷰입니다. 토글 버튼을 클릭하면 구매 품목 목록이 펼쳐지거나 접힙니다. 여러 품목이 있을 경우 각 품목 사이에 Divider가 표시됩니다. 화살표 아이콘은 목록이 열려있을 때 180도 회전하여 아래쪽을 가리킵니다.'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (MultipleItems.parameters = {
          ...MultipleItems.parameters,
          docs: {
            ...MultipleItems.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      itemsTotalPrice: 33400,\n      // (1×1,900) + (2×3,000) + (3×5,000) + (1×2,500) + (2×4,000) = 33,400원\n      shippingFee: 3000,\n      finalTotalPrice: 36400,\n      totalPrice: 36400,\n      // 하위 호환성\n      purchaseItems: [{\n        id: 'item-1',\n        quantity: 1,\n        priceSnapshot: 1900,\n        itemTotal: 1900,\n        products: {\n          id: 1,\n          name: '코카콜라 제로',\n          image: '/images/zero-cola.svg'\n        }\n      }, {\n        id: 'item-2',\n        quantity: 2,\n        priceSnapshot: 3000,\n        itemTotal: 6000,\n        products: {\n          id: 2,\n          name: '펩시 콜라',\n          image: '/images/zero-cola.svg'\n        }\n      }, {\n        id: 'item-3',\n        quantity: 3,\n        priceSnapshot: 5000,\n        itemTotal: 15000,\n        products: {\n          id: 3,\n          name: '스프라이트',\n          image: '/images/zero-cola.svg'\n        }\n      }, {\n        id: 'item-4',\n        quantity: 1,\n        priceSnapshot: 2500,\n        itemTotal: 2500,\n        products: {\n          id: 4,\n          name: '환타',\n          image: '/images/zero-cola.svg'\n        }\n      }, {\n        id: 'item-5',\n        quantity: 2,\n        priceSnapshot: 4000,\n        itemTotal: 8000,\n        products: {\n          id: 5,\n          name: '밀키스',\n          image: '/images/zero-cola.svg'\n        }\n      }]\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '여러 품목(5개)이 있는 구매 내역입니다. 3개 이상의 품목이 있을 때 스크롤이 생기며, 최대 높이 280px로 제한됩니다. 각 품목 사이에 Divider가 표시되고, 토글 버튼으로 목록을 접고 펼칠 수 있습니다.\\n\\n**특징:**\\n- 5개 품목 표시\\n- 스크롤 가능 영역 (max-h-280 overflow-y-auto)\\n- 주문금액, 배송비, 총 주문금액 요약'\n      }\n    }\n  }\n}",
              ...MultipleItems.parameters?.docs?.source,
            },
          },
        }),
        (SingleItem.parameters = {
          ...SingleItem.parameters,
          docs: {
            ...SingleItem.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      itemsTotalPrice: 9500,\n      finalTotalPrice: 9500,\n      totalPrice: 9500,\n      purchaseItems: [{\n        id: 'item-1',\n        quantity: 5,\n        priceSnapshot: 1900,\n        itemTotal: 9500,\n        products: {\n          id: 1,\n          name: '코카콜라 제로',\n          image: '/images/zero-cola.svg'\n        }\n      }]\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '단일 품목만 있는 구매 내역입니다. 품목이 하나뿐이므로 Divider가 표시되지 않습니다.'\n      }\n    }\n  }\n}",
              ...SingleItem.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/features/purchase-history/components/PurchaseHistoryDetailTopOrg/PurchaseHistoryDetailTopOrg.tsx'(
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
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_molecules_OrderItemDetailCard_OrderItemDetailCard__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            './src/components/molecules/OrderItemDetailCard/OrderItemDetailCard.tsx'
          ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          './src/components/atoms/Divider/Divider.tsx'
        ),
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        );
      const PriceRow = ({ label, value, bold = !1 }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'flex justify-between items-center',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className:
                  '' + (bold ? 'text-18 font-bold text-gray-950' : 'text-16 text-gray-700'),
                children: label,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_7__.A,
                {
                  value,
                  className:
                    '' + (bold ? 'text-18 font-bold text-gray-950' : 'text-16 text-gray-700'),
                }
              ),
            ],
          }),
        PurchaseItemsList = ({ items }) => {
          const hasScroll = items.length > 2;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              hasScroll && 'max-h-280 overflow-y-auto'
            ),
            children: items.map((item, index) => {
              const imageSrc = item.products.imageUrl ? item.products.imageUrl : '';
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                {
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'my-16',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_molecules_OrderItemDetailCard_OrderItemDetailCard__WEBPACK_IMPORTED_MODULE_4__.Ay,
                        {
                          name: item.products.name,
                          unitPrice: item.priceSnapshot,
                          quantity: item.quantity,
                          imageSrc,
                        }
                      ),
                    }),
                    index < items.length - 1 &&
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_6__.c,
                        {}
                      ),
                  ],
                },
                item.id || `item-${index}`
              );
            }),
          });
        },
        PriceSummary = ({ orderAmount, shippingFee, totalAmount }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_6__.c,
                  {}
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className:
                    'flex flex-col gap-12 tablet:gap-12 tablet:px-20 desktop:gap-12 desktop:px-20 pt-20',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PriceRow, {
                      label: '주문금액',
                      value: orderAmount,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PriceRow, {
                      label: '배송비',
                      value: shippingFee,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'pt-8',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PriceRow, {
                        label: '총 주문금액',
                        value: totalAmount,
                        bold: !0,
                      }),
                    }),
                  ],
                }),
              ],
            }
          ),
        PurchaseHistoryDetailTopOrg = ({ purchaseRequest }) => {
          const [isOpen, setIsOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!0),
            orderAmount = purchaseRequest.itemsTotalPrice ?? purchaseRequest.totalPrice ?? 0,
            shippingFee = purchaseRequest.shippingFee ?? 0,
            totalAmount = orderAmount + shippingFee;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'flex flex-col gap-30',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'px-24 tablet:px-0',
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                  className: 'font-bold text-18',
                  children: '구매 내역 상세',
                }),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-6 px-24 tablet:px-0',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                    className: 'font-bold text-16',
                    children: '구매품목',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                    className: 'text-16',
                    children: ['총 ', purchaseRequest.purchaseItems.length, '개'],
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_5__.K,
                    {
                      variant: 'default',
                      size: 'sm',
                      onClick: () => setIsOpen((prev) => !prev),
                      'aria-expanded': isOpen,
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                        {
                          alt: 'Arrow Up',
                          height: 7,
                          src: '/icons/arrow-up.svg',
                          width: 12,
                          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                            'transition-transform duration-200',
                            isOpen && 'rotate-180'
                          ),
                          style: { width: 'auto', height: 'auto' },
                        }
                      ),
                    }
                  ),
                ],
              }),
              isOpen &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className:
                    'flex flex-col w-full px-24 tablet:px-20 desktop:px-60 tablet:py-30 desktop:py-40 tablet:w-696 desktop:w-1200 desktop:shadow-lg tablet:shadow-lg',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PurchaseItemsList, {
                      items: purchaseRequest.purchaseItems,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PriceSummary, {
                      orderAmount,
                      shippingFee,
                      totalAmount,
                    }),
                  ],
                }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseHistoryDetailTopOrg;
      PurchaseHistoryDetailTopOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryDetailTopOrg',
        props: {
          purchaseRequest: {
            required: !0,
            tsType: { name: 'PurchaseRequestItem' },
            description: '',
          },
        },
      };
    },
  },
]);
