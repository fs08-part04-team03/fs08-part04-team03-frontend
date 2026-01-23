'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6310],
  {
    './src/components/atoms/DateText/DateText.tsx'(
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
        _utils_formatDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/utils/formatDate.ts'
        );
      const DateText = ({ date, className }) => {
          const formattedDate = (0, _utils_formatDate__WEBPACK_IMPORTED_MODULE_2__.Y)(date);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('text-gray-950', className),
            children: formattedDate,
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = DateText;
      DateText.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DateText',
        props: {
          date: {
            required: !0,
            tsType: {
              name: 'union',
              raw: 'string | Date',
              elements: [{ name: 'string' }, { name: 'Date' }],
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
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
    './src/features/purchase-history/components/PurchaseHistoryDetailInfoOrg/PurchaseHistoryDetailInfoOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/atoms/Divider/Divider.tsx'
        ),
        _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/DateText/DateText.tsx'
        );
      const InfoSection = ({ title, children }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'flex flex-col',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                className: 'font-bold text-14 tablet:text-16 py-14',
                children: title,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_1__.c,
                { orientation: 'horizontal', variant: 'thick' }
              ),
              children,
            ],
          }),
        InfoRowTwoColumns = ({ label1, value1, label2, value2 }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'grid grid-cols-[140px_1fr] border-b border-gray-100 tablet:hidden',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 border-r border-gray-100 py-8 px-16 tablet:px-20',
                      children: label1,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 py-8 px-16 tablet:px-20',
                      children: value1,
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'grid grid-cols-[140px_1fr] border-b border-gray-100 tablet:hidden',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 border-r border-gray-100 py-8 px-16 tablet:px-20',
                      children: label2,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 py-8 px-16 tablet:px-20',
                      children: value2,
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className:
                    'hidden tablet:grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 border-r border-gray-100 py-8 px-20',
                      children: label1,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 border-r border-gray-100 py-8 px-20',
                      children: value1,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 border-r border-gray-100 py-8 px-20',
                      children: label2,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 py-8 px-20',
                      children: value2,
                    }),
                  ],
                }),
              ],
            }
          ),
        InfoRowSingle = ({ label, value, fullWidth = !1 }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: `grid ${fullWidth ? 'grid-cols-[140px_3fr]' : 'grid-cols-[140px_1fr]'} border-b border-gray-100`,
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className:
                  'text-14 tablet:text-16 border-r border-gray-100 py-8 px-16 tablet:px-20',
                children: label,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: 'text-14 tablet:text-16 py-8 px-16 tablet:px-20 wrap-break-words',
                children: value,
              }),
            ],
          }),
        RequestInfo = ({ requester, createdAt, requestMessage }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: 'pt-30',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoSection, {
              title: '요청 정보',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowTwoColumns, {
                  label1: '요청인',
                  value1: requester.name,
                  label2: '요청 날짜',
                  value2: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_2__.A,
                    { date: createdAt, className: 'text-14 tablet:text-16' }
                  ),
                }),
                requestMessage &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowSingle, {
                    label: '요청 메시지',
                    value: requestMessage,
                    fullWidth: !0,
                  }),
              ],
            }),
          }),
        ApprovedInfo = ({ approverName, approvalDate, statusLabel, resultMessage }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoSection, {
            title: '승인 정보',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowTwoColumns, {
                label1: '담당자',
                value1: approverName,
                label2: '승인 날짜',
                value2: approvalDate
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_2__.A,
                      { date: approvalDate, className: 'text-14 tablet:text-16' }
                    )
                  : '-',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowTwoColumns, {
                label1: '상태',
                value1: statusLabel,
                label2: '결과 메시지',
                value2: resultMessage,
              }),
            ],
          }),
        PurchaseHistoryDetailInfoOrg = ({ purchaseRequest, approvedInfo }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex flex-col gap-30 w-full px-24 tablet:px-0 tablet:w-696 desktop:w-1200 desktop:mx-0',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RequestInfo, {
                requester: purchaseRequest.requester,
                createdAt: purchaseRequest.createdAt,
                requestMessage: purchaseRequest.requestMessage,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ApprovedInfo, {
                approverName: approvedInfo.approverName,
                approvalDate: approvedInfo.approvalDate,
                statusLabel: approvedInfo.statusLabel,
                resultMessage: approvedInfo.resultMessage,
              }),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseHistoryDetailInfoOrg;
      PurchaseHistoryDetailInfoOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryDetailInfoOrg',
        props: {
          purchaseRequest: {
            required: !0,
            tsType: { name: 'PurchaseRequestItem' },
            description: '',
          },
          approvedInfo: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  approverName: string;\n  approvalDate: string | null;\n  statusLabel: string;\n  resultMessage: string;\n}',
              signature: {
                properties: [
                  { key: 'approverName', value: { name: 'string', required: !0 } },
                  {
                    key: 'approvalDate',
                    value: {
                      name: 'union',
                      raw: 'string | null',
                      elements: [{ name: 'string' }, { name: 'null' }],
                      required: !0,
                    },
                  },
                  { key: 'statusLabel', value: { name: 'string', required: !0 } },
                  { key: 'resultMessage', value: { name: 'string', required: !0 } },
                ],
              },
            },
            description: '',
          },
        },
      };
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
    './src/features/purchase-history/template/PurchaseHistoryDetailTem/PurchaseHistoryDetailTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => PurchaseHistoryDetailTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        PurchaseHistoryDetailTopOrg = __webpack_require__(
          './src/features/purchase-history/components/PurchaseHistoryDetailTopOrg/PurchaseHistoryDetailTopOrg.tsx'
        ),
        PurchaseHistoryDetailInfoOrg = __webpack_require__(
          './src/features/purchase-history/components/PurchaseHistoryDetailInfoOrg/PurchaseHistoryDetailInfoOrg.tsx'
        );
      const PurchaseHistoryDetailTem = ({ purchaseRequest, approvedInfo }) =>
          (0, jsx_runtime.jsx)('div', {
            className: 'flex flex-col items-center gap-30 mt-30',
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'tablet:mt-30 desktop:mt-60 mb-54 desktop:mb-254 tablet:mb-132',
              children: [
                (0, jsx_runtime.jsx)(PurchaseHistoryDetailTopOrg.A, { purchaseRequest }),
                (0, jsx_runtime.jsx)(PurchaseHistoryDetailInfoOrg.A, {
                  purchaseRequest,
                  approvedInfo,
                }),
              ],
            }),
          }),
        PurchaseHistoryDetailTem_PurchaseHistoryDetailTem = PurchaseHistoryDetailTem;
      PurchaseHistoryDetailTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryDetailTem',
        props: {
          purchaseRequest: {
            required: !0,
            tsType: { name: 'PurchaseRequestItem' },
            description: '',
          },
          approvedInfo: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  approverName: string;\n  approvalDate: string | null;\n  statusLabel: string;\n  resultMessage: string;\n}',
              signature: {
                properties: [
                  { key: 'approverName', value: { name: 'string', required: !0 } },
                  {
                    key: 'approvalDate',
                    value: {
                      name: 'union',
                      raw: 'string | null',
                      elements: [{ name: 'string' }, { name: 'null' }],
                      required: !0,
                    },
                  },
                  { key: 'statusLabel', value: { name: 'string', required: !0 } },
                  { key: 'resultMessage', value: { name: 'string', required: !0 } },
                ],
              },
            },
            description: '',
          },
        },
      };
      const PurchaseHistoryDetailTem_stories = {
          title: 'Features/PurchaseHistory/Template/PurchaseHistoryDetailTem',
          component: PurchaseHistoryDetailTem_PurchaseHistoryDetailTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '구매 내역 상세 페이지의 Template 컴포넌트입니다.\n\n**주요 기능:**\n- 상단 구매 물품 정보 표시 (PurchaseHistoryDetailTopOrg)\n- 하단 요청/승인 정보 표시 (PurchaseHistoryDetailInfoOrg)\n- 전체 레이아웃 구성 및 간격 조정\n\n**구성 컴포넌트:**\n- `PurchaseHistoryDetailTopOrg`: 구매 물품 목록과 총 금액 표시\n- `PurchaseHistoryDetailInfoOrg`: 요청 정보와 승인 정보 표시\n\n**레이아웃:**\n- 상단 여백: 모바일/태블릿 30px, 데스크톱 60px\n- 컴포넌트 간 자동 간격 조정',
              },
            },
          },
        },
        Default = {
          args: {
            purchaseRequest: {
              id: 'req-1',
              createdAt: '2025-07-05T09:30:00.000Z',
              updatedAt: '2025-07-05T14:20:00.000Z',
              itemsTotalPrice: 6e4,
              shippingFee: 3e3,
              finalTotalPrice: 63e3,
              totalPrice: 63e3,
              status: 'APPROVED',
              purchaseItems: [
                {
                  id: 'item-1',
                  quantity: 2,
                  priceSnapshot: 15e3,
                  itemTotal: 3e4,
                  products: { id: 1, name: '코카콜라 제로' },
                },
                {
                  id: 'item-2',
                  quantity: 1,
                  priceSnapshot: 12e3,
                  itemTotal: 12e3,
                  products: { id: 2, name: '펩시콜라' },
                },
                {
                  id: 'item-3',
                  quantity: 3,
                  priceSnapshot: 6e3,
                  itemTotal: 18e3,
                  products: { id: 3, name: '생수 2L' },
                },
              ],
              requester: { id: 'user-1', name: '김스낵', email: 'snack@example.com' },
              urgent: !1,
              requestMessage: '회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.',
              reason: '승인되었습니다.',
            },
            approvedInfo: {
              approverName: '김코드',
              approvalDate: '2025-07-05T14:20:00.000Z',
              statusLabel: '승인',
              resultMessage: '승인되었습니다.',
            },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '기본 구매 내역 상세 페이지입니다.\n\n**상단 영역 (PurchaseHistoryDetailTopOrg):**\n- 구매 물품 목록: 3개 상품 (코카콜라 제로 2개, 펩시콜라 1개, 생수 2L 3개)\n- 상품 금액: 60,000원\n- 배송비: 3,000원\n- 총 결제 금액: 63,000원\n\n**하단 영역 (PurchaseHistoryDetailInfoOrg):**\n- 요청 정보: 김스낵, 2025년 7월 5일 09:30, 요청 메시지\n- 승인 정보: 김코드, 2025년 7월 5일 14:20, 승인 상태\n\n**레이아웃:**\n- 상단 여백 `mt-30` (모바일/태블릿), `mt-60` (데스크톱)\n- 두 컴포넌트가 세로로 배치됨',
              },
            },
          },
        },
        __namedExportsOrder = ['Default'];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    purchaseRequest: mockPurchaseRequest,\n    approvedInfo: {\n      approverName: '김코드',\n      approvalDate: '2025-07-05T14:20:00.000Z',\n      statusLabel: '승인',\n      resultMessage: '승인되었습니다.'\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 구매 내역 상세 페이지입니다.\\n\\n**상단 영역 (PurchaseHistoryDetailTopOrg):**\\n- 구매 물품 목록: 3개 상품 (코카콜라 제로 2개, 펩시콜라 1개, 생수 2L 3개)\\n- 상품 금액: 60,000원\\n- 배송비: 3,000원\\n- 총 결제 금액: 63,000원\\n\\n**하단 영역 (PurchaseHistoryDetailInfoOrg):**\\n- 요청 정보: 김스낵, 2025년 7월 5일 09:30, 요청 메시지\\n- 승인 정보: 김코드, 2025년 7월 5일 14:20, 승인 상태\\n\\n**레이아웃:**\\n- 상단 여백 `mt-30` (모바일/태블릿), `mt-60` (데스크톱)\\n- 두 컴포넌트가 세로로 배치됨'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      };
    },
    './src/utils/formatDate.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      function formatDate(dateInput) {
        const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
        if (Number.isNaN(dateObj.getTime())) return '-';
        return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;
      }
      __webpack_require__.d(__webpack_exports__, { Y: () => formatDate });
    },
  },
]);
