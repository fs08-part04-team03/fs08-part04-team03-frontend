'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8287],
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
    './src/components/atoms/PriceText/PriceText.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/next/dist/compiled/react/jsx-runtime.js'
      );
      const PriceText = ({ value, showUnit = !0, className }) => {
          const formattedValue = (Number.isFinite(value) && value >= 0 ? value : 0).toLocaleString(
              'ko-KR'
            ),
            displayText = showUnit ? `${formattedValue}원` : formattedValue;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className,
            children: displayText,
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PriceText;
      PriceText.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PriceText',
        props: {
          value: { required: !0, tsType: { name: 'number' }, description: '' },
          showUnit: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'true', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/components/molecules/ProductTile/ProductTile.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Order: () => Order,
          OrderWithShipping: () => OrderWithShipping,
          Product: () => Product,
          ProductWithoutCount: () => ProductWithoutCount,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/ProductTile',
          component: __webpack_require__('./src/components/molecules/ProductTile/ProductTile.tsx')
            .A,
          tags: ['autodocs'],
          parameters: { layout: 'padded' },
        },
        Product = { args: { variant: 'product', name: '코카콜라', price: 2e3, purchaseCount: 29 } },
        ProductWithoutCount = { args: { variant: 'product', name: '새우깡', price: 1500 } },
        Order = { args: { variant: 'order', name: '새우깡', price: 1500, quantity: 2 } },
        OrderWithShipping = {
          args: { variant: 'order', name: '새우깡', price: 1500, shippingFee: 3e3 },
        },
        __namedExportsOrder = ['Product', 'ProductWithoutCount', 'Order', 'OrderWithShipping'];
      ((Product.parameters = {
        ...Product.parameters,
        docs: {
          ...Product.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    variant: 'product',\n    name: '코카콜라',\n    price: 2000,\n    purchaseCount: 29\n  }\n}",
            ...Product.parameters?.docs?.source,
          },
        },
      }),
        (ProductWithoutCount.parameters = {
          ...ProductWithoutCount.parameters,
          docs: {
            ...ProductWithoutCount.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'product',\n    name: '새우깡',\n    price: 1500\n  }\n}",
              ...ProductWithoutCount.parameters?.docs?.source,
            },
          },
        }),
        (Order.parameters = {
          ...Order.parameters,
          docs: {
            ...Order.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'order',\n    name: '새우깡',\n    price: 1500,\n    quantity: 2\n  }\n}",
              ...Order.parameters?.docs?.source,
            },
          },
        }),
        (OrderWithShipping.parameters = {
          ...OrderWithShipping.parameters,
          docs: {
            ...OrderWithShipping.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'order',\n    name: '새우깡',\n    price: 1500,\n    shippingFee: 3000\n  }\n}",
              ...OrderWithShipping.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/ProductTile/ProductTile.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        );
      const ProductTile = (props) => {
          const { name, price, size = 'md', className, variant } = props,
            nameClass =
              'sm' === size
                ? 'text-14 leading-22 tracking--0.35 whitespace-nowrap overflow-hidden text-ellipsis'
                : 'text-14 leading-22 tracking--0.35 tablet:text-16 tablet:leading-24 tablet:tracking--0.4 whitespace-nowrap overflow-hidden text-ellipsis',
            subClass =
              'sm' === size
                ? 'text-13 leading-18 tracking--0.3'
                : 'text-13 leading-18 tracking--0.3 tablet:text-14 tablet:leading-22 tablet:tracking--0.35',
            priceClass =
              'sm' === size
                ? 'text-14 leading-22 tracking--0.35'
                : 'text-14 leading-22 tracking--0.35 tablet:text-16 tablet:leading-24 tablet:tracking--0.4';
          let subNode = null,
            purchaseCountNode = null,
            orderSubNode = null,
            orderSubNodeInline = null;
          if ('product' === variant) {
            const { purchaseCount } = props;
            void 0 !== purchaseCount &&
              ((purchaseCountNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                'span',
                {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                    'font-bold text-secondary-500',
                    subClass
                  ),
                  children: [purchaseCount, '회 구매'],
                }
              )),
              (subNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'font-bold text-secondary-500',
                  subClass
                ),
                children: [purchaseCount, '회 구매'],
              })));
          } else if ('order' === variant) {
            const { quantity, shippingFee, metaOverride } = props;
            if (metaOverride)
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: metaOverride,
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: metaOverride,
                  }
                )));
            else if (void 0 !== quantity)
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: ['수량 ', quantity, '개'],
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: ['수량 ', quantity, '개'],
                  }
                )));
            else if (void 0 !== shippingFee) {
              const shippingText =
                0 === shippingFee ? '무료' : `${shippingFee.toLocaleString('ko-KR')}원`;
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: ['배송비 ', shippingText],
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: ['배송비 ', shippingText],
                  }
                )));
            }
          }
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              'flex flex-col gap-2 flex-1 min-w-0',
              className
            ),
            children:
              'product' === variant && purchaseCountNode
                ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                    {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex flex-col gap-2 desktop:hidden',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                'font-normal text-gray-950',
                                nameClass
                              ),
                              children: name,
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                value: price,
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-bold text-gray-950',
                                  priceClass
                                ),
                              }
                            ),
                            subNode,
                          ],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                              className: 'flex flex-row items-center gap-8',
                              children: [
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-normal text-gray-950',
                                    nameClass
                                  ),
                                  children: name,
                                }),
                                purchaseCountNode,
                              ],
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                value: price,
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-bold text-gray-950',
                                  priceClass
                                ),
                              }
                            ),
                          ],
                        }),
                      ],
                    }
                  )
                : 'order' === variant && orderSubNode
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                      {
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'flex flex-col gap-2 desktop:hidden',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-normal text-gray-950',
                                  nameClass
                                ),
                                children: name,
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                                {
                                  value: price,
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-bold text-gray-950',
                                    priceClass
                                  ),
                                }
                              ),
                              orderSubNode,
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                                className: 'flex flex-row items-center gap-8',
                                children: [
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                      'font-normal text-gray-950',
                                      nameClass
                                    ),
                                    children: name,
                                  }),
                                  orderSubNodeInline,
                                ],
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                                {
                                  value: price,
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-bold text-gray-950',
                                    priceClass
                                  ),
                                }
                              ),
                            ],
                          }),
                        ],
                      }
                    )
                  : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                      {
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                              'font-normal text-gray-950',
                              nameClass
                            ),
                            children: name,
                          }),
                          subNode,
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                            {
                              value: price,
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                'font-bold text-gray-950',
                                priceClass
                              ),
                            }
                          ),
                        ],
                      }
                    ),
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ProductTile;
      ProductTile.__docgenInfo = { description: '', methods: [], displayName: 'ProductTile' };
    },
  },
]);
