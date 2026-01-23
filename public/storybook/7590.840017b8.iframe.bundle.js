'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7590],
  {
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
    './src/components/molecules/OrderItemDetailCard/OrderItemDetailCard.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { Ay: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__('./src/constants/index.ts');
      const OrderItemDetailCardMobile = ({
          name,
          unitPrice,
          quantity,
          imageSrc,
          className,
          productId,
          companyId,
          onProductClick,
        }) => {
          const router = (0, next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)(),
            effectiveImageSrc = imageSrc,
            displayTotalPrice = unitPrice * quantity,
            [imageError, setImageError] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setImageError(!1);
          }, [imageSrc]);
          const shouldShowImage = !!effectiveImageSrc && !imageError;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('tablet:hidden', className),
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'flex flex-col w-full rounded-12 bg-white px-12 py-8 gap-8',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-12',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'relative overflow-hidden rounded-8 bg-gray-50 w-85 h-85 shrink-0',
                    children: shouldShowImage
                      ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className: 'absolute inset-0 flex items-center justify-center',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: 'flex items-center justify-center w-full h-full p-10',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: effectiveImageSrc,
                                alt: name,
                                width: 140,
                                height: 140,
                                className: 'object-contain max-w-full max-h-full',
                                onError: () => setImageError(!0),
                                sizes: '(max-width: 768px) 85px, 140px',
                              }
                            ),
                          }),
                        })
                      : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className: 'absolute inset-0 flex items-center justify-center',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                            {
                              src: '/icons/no-image.svg',
                              alt: '이미지 없음',
                              width: 85,
                              height: 85,
                              className: 'object-contain',
                              unoptimized: !0,
                            }
                          ),
                        }),
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    className: 'flex flex-col gap-4 flex-1',
                    children: [
                      productId
                        ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                            type: 'button',
                            onClick: (e) => {
                              (e.stopPropagation(),
                                onProductClick && productId
                                  ? onProductClick(productId)
                                  : companyId &&
                                    productId &&
                                    router.push(
                                      _constants__WEBPACK_IMPORTED_MODULE_6__.vp.PRODUCT_DETAIL(
                                        companyId,
                                        String(productId)
                                      )
                                    ));
                            },
                            onKeyDown: (e) => {
                              ('Enter' !== e.key && ' ' !== e.key) ||
                                (e.preventDefault(),
                                e.stopPropagation(),
                                onProductClick && productId
                                  ? onProductClick(productId)
                                  : companyId &&
                                    productId &&
                                    router.push(
                                      _constants__WEBPACK_IMPORTED_MODULE_6__.vp.PRODUCT_DETAIL(
                                        companyId,
                                        String(productId)
                                      )
                                    ));
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'text-left text-black-100 text-14 leading-20',
                              'cursor-pointer hover:underline hover:text-primary-500'
                            ),
                            children: name,
                          })
                        : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                            className: 'text-black-100 text-14 leading-20',
                            children: name,
                          }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_5__.A,
                        { value: unitPrice, className: 'text-black-100 text-14 leading-20' }
                      ),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'pt-14 flex items-center justify-between',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                            className: 'text-black-100 text-14 leading-20',
                            children: ['수량 ', quantity, '개'],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_5__.A,
                            {
                              value: displayTotalPrice,
                              className: 'text-gray-700 font-bold text-16',
                            }
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          });
        },
        OrderItemDetailCardTablet = ({
          name,
          unitPrice,
          quantity,
          imageSrc,
          className,
          productId,
          companyId,
          onProductClick,
        }) => {
          const router = (0, next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)(),
            effectiveImageSrc = imageSrc,
            displayTotalPrice = unitPrice * quantity,
            [imageError, setImageError] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setImageError(!1);
          }, [imageSrc]);
          const shouldShowImage = !!effectiveImageSrc && !imageError;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
              'hidden tablet:flex desktop:hidden',
              className
            ),
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className:
                'flex items-center justify-between w-full rounded-12 bg-white px-16 py-12 gap-12',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-12',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className:
                        'relative overflow-hidden rounded-8 bg-gray-50 w-140 h-140 shrink-0',
                      children: shouldShowImage
                        ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: 'absolute inset-0 flex items-center justify-center',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'div',
                              {
                                className: 'flex items-center justify-center w-full h-full p-20',
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                                  {
                                    src: effectiveImageSrc,
                                    alt: name,
                                    width: 140,
                                    height: 140,
                                    className: 'object-contain max-w-full max-h-full',
                                    onError: () => setImageError(!0),
                                    sizes: '(max-width: 768px) 85px, 140px',
                                  }
                                ),
                              }
                            ),
                          })
                        : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: 'absolute inset-0 flex items-center justify-center',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/no-image.svg',
                                alt: '이미지 없음',
                                width: 140,
                                height: 140,
                                className: 'object-contain',
                                unoptimized: !0,
                              }
                            ),
                          }),
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: 'flex flex-col gap-4',
                      children: [
                        productId
                          ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                              type: 'button',
                              onClick: (e) => {
                                (e.stopPropagation(),
                                  onProductClick && productId
                                    ? onProductClick(productId)
                                    : companyId &&
                                      productId &&
                                      router.push(
                                        _constants__WEBPACK_IMPORTED_MODULE_6__.vp.PRODUCT_DETAIL(
                                          companyId,
                                          String(productId)
                                        )
                                      ));
                              },
                              onKeyDown: (e) => {
                                ('Enter' !== e.key && ' ' !== e.key) ||
                                  (e.preventDefault(),
                                  e.stopPropagation(),
                                  onProductClick && productId
                                    ? onProductClick(productId)
                                    : companyId &&
                                      productId &&
                                      router.push(
                                        _constants__WEBPACK_IMPORTED_MODULE_6__.vp.PRODUCT_DETAIL(
                                          companyId,
                                          String(productId)
                                        )
                                      ));
                              },
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                                'text-left text-black-100 text-16 leading-24',
                                'cursor-pointer hover:underline hover:text-primary-500'
                              ),
                              children: name,
                            })
                          : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                              className: 'text-black-100 text-16 leading-24',
                              children: name,
                            }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_5__.A,
                          { value: unitPrice, className: 'text-black-100 text-16 leading-24' }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className: 'pt-30',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                            'span',
                            {
                              className: 'text-black-100 text-16 leading-24',
                              children: ['수량 ', quantity, '개'],
                            }
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'flex flex-col items-end gap-8 shrink-0',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      value: displayTotalPrice,
                      className: 'text-gray-700 font-bold text-20 text-right',
                    }
                  ),
                }),
              ],
            }),
          });
        },
        OrderItemDetailCardDesktop = ({
          name,
          unitPrice,
          quantity,
          imageSrc,
          className,
          productId,
          companyId,
          onProductClick,
        }) => {
          const router = (0, next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)(),
            effectiveImageSrc = imageSrc,
            displayTotalPrice = unitPrice * quantity,
            [imageError, setImageError] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setImageError(!1);
          }, [imageSrc]);
          const shouldShowImage = !!effectiveImageSrc && !imageError;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
              'hidden desktop:flex',
              className
            ),
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className:
                'flex items-center justify-between w-full rounded-12 bg-white px-20 py-16 gap-16',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-12',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className:
                        'relative overflow-hidden rounded-8 bg-gray-50 w-140 h-140 shrink-0',
                      children: shouldShowImage
                        ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: 'absolute inset-0 flex items-center justify-center',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'div',
                              {
                                className: 'flex items-center justify-center w-full h-full p-20',
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                                  {
                                    src: effectiveImageSrc,
                                    alt: name,
                                    width: 140,
                                    height: 140,
                                    className: 'object-contain max-w-full max-h-full',
                                    onError: () => setImageError(!0),
                                    sizes: '(max-width: 768px) 85px, 140px',
                                  }
                                ),
                              }
                            ),
                          })
                        : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: 'absolute inset-0 flex items-center justify-center',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/no-image.svg',
                                alt: '이미지 없음',
                                width: 140,
                                height: 140,
                                className: 'object-contain',
                                unoptimized: !0,
                              }
                            ),
                          }),
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: 'flex flex-col gap-4',
                      children: [
                        productId
                          ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                              type: 'button',
                              onClick: (e) => {
                                (e.stopPropagation(),
                                  onProductClick && productId
                                    ? onProductClick(productId)
                                    : companyId &&
                                      productId &&
                                      router.push(
                                        _constants__WEBPACK_IMPORTED_MODULE_6__.vp.PRODUCT_DETAIL(
                                          companyId,
                                          String(productId)
                                        )
                                      ));
                              },
                              onKeyDown: (e) => {
                                ('Enter' !== e.key && ' ' !== e.key) ||
                                  (e.preventDefault(),
                                  e.stopPropagation(),
                                  onProductClick && productId
                                    ? onProductClick(productId)
                                    : companyId &&
                                      productId &&
                                      router.push(
                                        _constants__WEBPACK_IMPORTED_MODULE_6__.vp.PRODUCT_DETAIL(
                                          companyId,
                                          String(productId)
                                        )
                                      ));
                              },
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                                'text-left text-black-100 text-16 leading-24',
                                'cursor-pointer hover:underline hover:text-primary-500'
                              ),
                              children: name,
                            })
                          : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                              className: 'text-black-100 text-16 leading-24',
                              children: name,
                            }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_5__.A,
                          { value: unitPrice, className: 'text-black-100 text-16 leading-24' }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className: 'pt-30',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                            'span',
                            {
                              className: 'text-black-100 text-16 leading-24',
                              children: ['수량 ', quantity, '개'],
                            }
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'flex flex-col items-end gap-8 shrink-0',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_5__.A,
                    {
                      value: displayTotalPrice,
                      className: 'text-gray-700 font-bold text-20 text-right',
                    }
                  ),
                }),
              ],
            }),
          });
        },
        OrderItemDetailCard = ({
          name,
          unitPrice,
          quantity,
          imageSrc,
          className,
          productId,
          companyId,
          onProductClick,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OrderItemDetailCardMobile, {
                  name,
                  unitPrice,
                  quantity,
                  imageSrc,
                  className,
                  productId,
                  companyId,
                  onProductClick,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OrderItemDetailCardTablet, {
                  name,
                  unitPrice,
                  quantity,
                  imageSrc,
                  className,
                  productId,
                  companyId,
                  onProductClick,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  OrderItemDetailCardDesktop,
                  {
                    name,
                    unitPrice,
                    quantity,
                    imageSrc,
                    className,
                    productId,
                    companyId,
                    onProductClick,
                  }
                ),
              ],
            }
          ),
        __WEBPACK_DEFAULT_EXPORT__ = OrderItemDetailCard;
      ((OrderItemDetailCardMobile.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'OrderItemDetailCardMobile',
        props: {
          name: { required: !0, tsType: { name: 'string' }, description: '' },
          unitPrice: { required: !0, tsType: { name: 'number' }, description: '' },
          quantity: { required: !0, tsType: { name: 'number' }, description: '' },
          imageSrc: { required: !1, tsType: { name: 'string' }, description: '' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          productId: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'number | string',
              elements: [{ name: 'number' }, { name: 'string' }],
            },
            description: '',
          },
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
          onProductClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(productId: number | string) => void',
              signature: {
                arguments: [
                  {
                    type: {
                      name: 'union',
                      raw: 'number | string',
                      elements: [{ name: 'number' }, { name: 'string' }],
                    },
                    name: 'productId',
                  },
                ],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      }),
        (OrderItemDetailCardTablet.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'OrderItemDetailCardTablet',
          props: {
            name: { required: !0, tsType: { name: 'string' }, description: '' },
            unitPrice: { required: !0, tsType: { name: 'number' }, description: '' },
            quantity: { required: !0, tsType: { name: 'number' }, description: '' },
            imageSrc: { required: !1, tsType: { name: 'string' }, description: '' },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
            productId: {
              required: !1,
              tsType: {
                name: 'union',
                raw: 'number | string',
                elements: [{ name: 'number' }, { name: 'string' }],
              },
              description: '',
            },
            companyId: { required: !1, tsType: { name: 'string' }, description: '' },
            onProductClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(productId: number | string) => void',
                signature: {
                  arguments: [
                    {
                      type: {
                        name: 'union',
                        raw: 'number | string',
                        elements: [{ name: 'number' }, { name: 'string' }],
                      },
                      name: 'productId',
                    },
                  ],
                  return: { name: 'void' },
                },
              },
              description: '',
            },
          },
        }),
        (OrderItemDetailCardDesktop.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'OrderItemDetailCardDesktop',
          props: {
            name: { required: !0, tsType: { name: 'string' }, description: '' },
            unitPrice: { required: !0, tsType: { name: 'number' }, description: '' },
            quantity: { required: !0, tsType: { name: 'number' }, description: '' },
            imageSrc: { required: !1, tsType: { name: 'string' }, description: '' },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
            productId: {
              required: !1,
              tsType: {
                name: 'union',
                raw: 'number | string',
                elements: [{ name: 'number' }, { name: 'string' }],
              },
              description: '',
            },
            companyId: { required: !1, tsType: { name: 'string' }, description: '' },
            onProductClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(productId: number | string) => void',
                signature: {
                  arguments: [
                    {
                      type: {
                        name: 'union',
                        raw: 'number | string',
                        elements: [{ name: 'number' }, { name: 'string' }],
                      },
                      name: 'productId',
                    },
                  ],
                  return: { name: 'void' },
                },
              },
              description: '',
            },
          },
        }),
        (OrderItemDetailCard.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'OrderItemDetailCard',
          props: {
            name: { required: !0, tsType: { name: 'string' }, description: '' },
            unitPrice: { required: !0, tsType: { name: 'number' }, description: '' },
            quantity: { required: !0, tsType: { name: 'number' }, description: '' },
            imageSrc: { required: !1, tsType: { name: 'string' }, description: '' },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
            productId: {
              required: !1,
              tsType: {
                name: 'union',
                raw: 'number | string',
                elements: [{ name: 'number' }, { name: 'string' }],
              },
              description: '',
            },
            companyId: { required: !1, tsType: { name: 'string' }, description: '' },
            onProductClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(productId: number | string) => void',
                signature: {
                  arguments: [
                    {
                      type: {
                        name: 'union',
                        raw: 'number | string',
                        elements: [{ name: 'number' }, { name: 'string' }],
                      },
                      name: 'productId',
                    },
                  ],
                  return: { name: 'void' },
                },
              },
              description: '',
            },
          },
        }));
    },
  },
]);
