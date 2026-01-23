'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9813],
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
    './src/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg.tsx'(
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
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        ),
        _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
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
                className: 'text-14 tablet:text-16 py-8 px-16 tablet:px-20 wrap-break-word',
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
                    _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
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
        BudgetInfo = ({ monthlySpending, remainingBudget, budgetAfterPurchase }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoSection, {
            title: '예산 정보',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowSingle, {
                label: '이번 달 지출액',
                value: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                  { value: monthlySpending, className: 'text-14 tablet:text-16' }
                ),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowSingle, {
                label: '이번 달 남은 예산',
                value: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                  { value: remainingBudget, className: 'text-14 tablet:text-16' }
                ),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowSingle, {
                label: '구매 후 예산',
                value: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                  { value: budgetAfterPurchase, className: 'text-14 tablet:text-16' }
                ),
              }),
            ],
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
                      _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
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
        PurchaseRequestDetailOrg = ({ purchaseRequest, approvedInfo, budgetInfo }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex flex-col gap-30 w-full px-24 tablet:px-0 tablet:w-696 desktop:w-1200 desktop:mx-0',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RequestInfo, {
                requester: purchaseRequest.requester,
                createdAt: purchaseRequest.createdAt,
                requestMessage: purchaseRequest.requestMessage,
              }),
              budgetInfo &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BudgetInfo, {
                  monthlySpending: budgetInfo.monthlySpending,
                  remainingBudget: budgetInfo.remainingBudget,
                  budgetAfterPurchase: budgetInfo.budgetAfterPurchase,
                }),
              approvedInfo &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ApprovedInfo, {
                  approverName: approvedInfo.approverName,
                  approvalDate: approvedInfo.approvalDate,
                  statusLabel: approvedInfo.statusLabel,
                  resultMessage: approvedInfo.resultMessage,
                }),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseRequestDetailOrg;
      PurchaseRequestDetailOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseRequestDetailOrg',
        props: {
          purchaseRequest: {
            required: !0,
            tsType: { name: 'PurchaseRequestItem' },
            description: '',
          },
          approvedInfo: {
            required: !1,
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
          budgetInfo: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  monthlySpending: number;\n  remainingBudget: number;\n  budgetAfterPurchase: number;\n}',
              signature: {
                properties: [
                  { key: 'monthlySpending', value: { name: 'number', required: !0 } },
                  { key: 'remainingBudget', value: { name: 'number', required: !0 } },
                  { key: 'budgetAfterPurchase', value: { name: 'number', required: !0 } },
                ],
              },
            },
            description: '',
          },
        },
      };
    },
    './src/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => __WEBPACK_DEFAULT_EXPORT__,
        v: () => PurchaseRequestDetailTopOrg,
      });
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
        PurchaseItemsList = ({ items, companyId }) => {
          const hasScroll = items.length > 2;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              hasScroll && 'max-h-280 overflow-y-auto'
            ),
            children: items.map((item, index) => {
              const imageSrc = item.products.imageUrl ? item.products.imageUrl : void 0;
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                {
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'my-16 mx-10',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_molecules_OrderItemDetailCard_OrderItemDetailCard__WEBPACK_IMPORTED_MODULE_4__.Ay,
                        {
                          name: item.products.name,
                          unitPrice: item.priceSnapshot,
                          quantity: item.quantity,
                          imageSrc,
                          productId: item.products.id,
                          companyId,
                        }
                      ),
                    }),
                    index < items.length - 1 &&
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className: 'mx-10',
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_6__.c,
                          {}
                        ),
                      }),
                  ],
                },
                item.id ?? `item-${index}`
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
        PurchaseRequestDetailTopOrg = ({ purchaseRequest, companyId }) => {
          const [isOpen, setIsOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!0),
            { itemsTotalPrice, shippingFee, totalPrice } = purchaseRequest,
            orderAmount = itemsTotalPrice ?? totalPrice ?? 0,
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
                      companyId,
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
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseRequestDetailTopOrg;
      PurchaseRequestDetailTopOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseRequestDetailTopOrg',
        props: {
          purchaseRequest: {
            required: !0,
            tsType: { name: 'PurchaseRequestItem' },
            description: '',
          },
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/purchase/template/PurchaseRequestDetailTem/PurchaseRequestDetailTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          InsufficientBudget: () => InsufficientBudget,
          Interactive: () => Interactive,
          WithApproveModal: () => WithApproveModal,
          WithRejectModal: () => WithRejectModal,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => PurchaseRequestDetailTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        PurchaseRequestDetailTopOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg.tsx'
        ),
        PurchaseRequestDetailOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg.tsx'
        ),
        ApprovalRequestModal = __webpack_require__(
          './src/components/molecules/ApprovalRequestModal/ApprovalRequestModal.tsx'
        ),
        logger = __webpack_require__('./src/utils/logger.ts'),
        PurchaseRequestDetailActionsOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg.tsx'
        );
      const PurchaseRequestDetailTem = ({ ...props }) => {
          const {
              purchaseRequest,
              companyId,
              budget,
              monthlySpending,
              remainingBudget,
              approveModalOpen,
              rejectModalOpen,
              onApproveModalClose,
              onRejectModalClose,
              onApproveSubmit,
              onRejectSubmit,
              onApproveClick,
              onRejectClick,
              isBudgetSufficient,
            } = (function isGroupedProps(props) {
              return 'budgetState' in props && 'modalState' in props && 'modalHandlers' in props;
            })(props)
              ? {
                  purchaseRequest: props.purchaseRequest,
                  companyId: props.companyId,
                  budget: props.budgetState.budget,
                  monthlySpending: props.budgetState.monthlySpending,
                  remainingBudget: props.budgetState.remainingBudget,
                  approveModalOpen: props.modalState.approveModalOpen,
                  rejectModalOpen: props.modalState.rejectModalOpen,
                  onApproveModalClose: props.modalHandlers.onApproveModalClose,
                  onRejectModalClose: props.modalHandlers.onRejectModalClose,
                  onApproveSubmit: props.modalHandlers.onApproveSubmit,
                  onRejectSubmit: props.modalHandlers.onRejectSubmit,
                  onApproveClick: props.modalHandlers.onApproveClick,
                  onRejectClick: props.modalHandlers.onRejectClick,
                  isBudgetSufficient: props.budgetState.isBudgetSufficient,
                }
              : props,
            budgetInfo = {
              monthlySpending,
              remainingBudget,
              budgetAfterPurchase:
                remainingBudget -
                ((purchaseRequest.itemsTotalPrice ?? purchaseRequest.totalPrice ?? 0) +
                  purchaseRequest.shippingFee),
            };
          let approvedInfo;
          if ('APPROVED' === purchaseRequest.status || 'REJECTED' === purchaseRequest.status) {
            const statusLabel = 'APPROVED' === purchaseRequest.status ? '승인' : '반려',
              resultMessage = purchaseRequest.reason || purchaseRequest.rejectReason || '-';
            approvedInfo = {
              approverName: purchaseRequest.approver?.name || '-',
              approvalDate: purchaseRequest.approvedAt || null,
              statusLabel,
              resultMessage,
            };
          }
          const modalData = {
            user: {
              name: purchaseRequest.requester.name,
              company: {
                name:
                  'string' == typeof purchaseRequest.requester.company
                    ? purchaseRequest.requester.company
                    : '',
              },
              avatarSrc:
                'string' == typeof purchaseRequest.requester.avatarSrc
                  ? purchaseRequest.requester.avatarSrc
                  : void 0,
            },
            items: purchaseRequest.purchaseItems.map((item) => {
              const parsedId = Number.parseInt(item.id, 10);
              return (
                Number.isNaN(parsedId) &&
                  logger.v.warn('Invalid item id in purchase request', { hasItemId: !!item.id }),
                {
                  id: Number.isNaN(parsedId) ? 0 : parsedId,
                  title: item.products.name,
                  price: item.priceSnapshot,
                  quantity: item.quantity,
                  imageSrc: item.products.imageUrl ?? '',
                }
              );
            }),
            deliveryFee: purchaseRequest.shippingFee,
            budget,
          };
          return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'flex flex-col items-center gap-30 mt-30',
                children: (0, jsx_runtime.jsxs)('div', {
                  className: 'tablet:mt-30 desktop:mt-60 mb-54 desktop:mb-254 tablet:mb-132',
                  children: [
                    (0, jsx_runtime.jsx)(PurchaseRequestDetailTopOrg.v, { purchaseRequest }),
                    (0, jsx_runtime.jsx)(PurchaseRequestDetailOrg.A, {
                      purchaseRequest,
                      budgetInfo: approvedInfo ? void 0 : budgetInfo,
                      approvedInfo,
                    }),
                    (0, jsx_runtime.jsx)(PurchaseRequestDetailActionsOrg.A, {
                      companyId,
                      actionType: 'admin',
                      onApproveClick,
                      onRejectClick,
                      isBudgetSufficient,
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime.jsx)(ApprovalRequestModal.A, {
                open: approveModalOpen,
                onClose: onApproveModalClose,
                onSubmit: onApproveSubmit,
                user: modalData.user,
                items: modalData.items,
                deliveryFee: modalData.deliveryFee,
                budget: modalData.budget,
                action: 'approve',
              }),
              (0, jsx_runtime.jsx)(ApprovalRequestModal.A, {
                open: rejectModalOpen,
                onClose: onRejectModalClose,
                onSubmit: onRejectSubmit,
                user: modalData.user,
                items: modalData.items,
                deliveryFee: modalData.deliveryFee,
                budget: modalData.budget,
                action: 'reject',
              }),
            ],
          });
        },
        PurchaseRequestDetailTem_PurchaseRequestDetailTem = PurchaseRequestDetailTem;
      PurchaseRequestDetailTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseRequestDetailTem',
      };
      const PurchaseRequestDetailTem_stories = {
          title: 'Features/Purchase/Template/PurchaseRequestDetailTem',
          component: PurchaseRequestDetailTem_PurchaseRequestDetailTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            nextjs: {
              appDirectory: !0,
              navigation: {
                pathname: '/company-123/purchase-requests/1',
                params: { companyId: 'company-123' },
              },
            },
            docs: {
              description: {
                component:
                  '관리자용 구매 요청 상세 페이지 템플릿입니다. 구매 요청 내역, 예산 정보, 승인/반려 액션을 포함합니다.\n\n**주요 구성:**\n\n1. **PurchaseRequestDetailTopOrg**: 구매품목 목록 및 가격 요약\n2. **PurchaseRequestDetailOrg**: 요청 정보 및 예산 정보\n3. **PurchaseRequestDetailActionsOrg**: 승인/반려 액션 버튼\n4. **ApprovalRequestModal**: 승인/반려 모달',
              },
            },
          },
        },
        mockPurchaseRequest = {
          id: '1',
          createdAt: '2025-06-03T00:00:00.000Z',
          updatedAt: '2025-06-03T00:00:00.000Z',
          itemsTotalPrice: 15e3,
          shippingFee: 3e3,
          finalTotalPrice: 18e3,
          totalPrice: 15e3,
          status: 'APPROVED',
          requestMessage: '빠른 배송 부탁드립니다.',
          purchaseItems: [
            {
              id: 'item-1',
              quantity: 1,
              priceSnapshot: 5e3,
              itemTotal: 5e3,
              products: { id: 1, name: '코카콜라 제로', image: '/images/zero-cola.svg' },
            },
            {
              id: 'item-2',
              quantity: 2,
              priceSnapshot: 5e3,
              itemTotal: 1e4,
              products: { id: 2, name: '펩시 콜라' },
            },
          ],
          requester: { id: 'requester-1', name: '홍길동', email: 'hong@example.com' },
          approver: { id: 'approver-1', name: '관리자', email: 'admin@example.com' },
          reason: '승인되었습니다.',
        },
        Default = {
          args: {
            purchaseRequest: mockPurchaseRequest,
            companyId: 'company-123',
            budget: 2e6,
            monthlySpending: 5e5,
            remainingBudget: 15e5,
            approveModalOpen: !1,
            rejectModalOpen: !1,
            onApproveClick: () => {},
            onRejectClick: () => {},
            onApproveModalClose: () => {},
            onRejectModalClose: () => {},
            onApproveSubmit: () => {},
            onRejectSubmit: () => {},
          },
        },
        InsufficientBudget = {
          args: {
            purchaseRequest: mockPurchaseRequest,
            companyId: 'company-123',
            budget: 2e6,
            monthlySpending: 199e4,
            remainingBudget: 1e4,
            approveModalOpen: !1,
            rejectModalOpen: !1,
            onApproveClick: () => {},
            onRejectClick: () => {},
            onApproveModalClose: () => {},
            onRejectModalClose: () => {},
            onApproveSubmit: () => {},
            onRejectSubmit: () => {},
            isBudgetSufficient: !1,
          },
        },
        WithApproveModal = {
          args: {
            purchaseRequest: mockPurchaseRequest,
            companyId: 'company-123',
            budget: 2e6,
            monthlySpending: 5e5,
            remainingBudget: 15e5,
            approveModalOpen: !0,
            rejectModalOpen: !1,
            onApproveClick: () => {},
            onRejectClick: () => {},
            onApproveModalClose: () => {},
            onRejectModalClose: () => {},
            onApproveSubmit: () => {},
            onRejectSubmit: () => {},
          },
        },
        WithRejectModal = {
          args: {
            purchaseRequest: mockPurchaseRequest,
            companyId: 'company-123',
            budget: 2e6,
            monthlySpending: 5e5,
            remainingBudget: 15e5,
            approveModalOpen: !1,
            rejectModalOpen: !0,
            onApproveClick: () => {},
            onRejectClick: () => {},
            onApproveModalClose: () => {},
            onRejectModalClose: () => {},
            onApproveSubmit: () => {},
            onRejectSubmit: () => {},
          },
        },
        Interactive = {
          render: (args) => {
            const typedArgs = args,
              [approveModalOpen, setApproveModalOpen] = (0, react.useState)(!1),
              [rejectModalOpen, setRejectModalOpen] = (0, react.useState)(!1);
            return (0, jsx_runtime.jsx)(PurchaseRequestDetailTem_PurchaseRequestDetailTem, {
              purchaseRequest: typedArgs.purchaseRequest,
              companyId: typedArgs.companyId,
              budget: typedArgs.budget,
              monthlySpending: typedArgs.monthlySpending,
              remainingBudget: typedArgs.remainingBudget,
              isBudgetSufficient: typedArgs.isBudgetSufficient,
              approveModalOpen,
              rejectModalOpen,
              onApproveClick: () => setApproveModalOpen(!0),
              onRejectClick: () => setRejectModalOpen(!0),
              onApproveModalClose: () => setApproveModalOpen(!1),
              onRejectModalClose: () => setRejectModalOpen(!1),
              onApproveSubmit: () => setApproveModalOpen(!1),
              onRejectSubmit: () => setRejectModalOpen(!1),
            });
          },
          args: {
            purchaseRequest: mockPurchaseRequest,
            companyId: 'company-123',
            budget: 2e6,
            monthlySpending: 5e5,
            remainingBudget: 15e5,
            isBudgetSufficient: !0,
          },
        },
        __namedExportsOrder = [
          'Default',
          'InsufficientBudget',
          'WithApproveModal',
          'WithRejectModal',
          'Interactive',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    purchaseRequest: mockPurchaseRequest,\n    companyId: 'company-123',\n    budget: 2_000_000,\n    monthlySpending: 500_000,\n    remainingBudget: 1_500_000,\n    approveModalOpen: false,\n    rejectModalOpen: false,\n    onApproveClick: () => {},\n    onRejectClick: () => {},\n    onApproveModalClose: () => {},\n    onRejectModalClose: () => {},\n    onApproveSubmit: () => {},\n    onRejectSubmit: () => {}\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (InsufficientBudget.parameters = {
          ...InsufficientBudget.parameters,
          docs: {
            ...InsufficientBudget.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: mockPurchaseRequest,\n    companyId: 'company-123',\n    budget: 2_000_000,\n    monthlySpending: 1_990_000,\n    remainingBudget: 10_000,\n    approveModalOpen: false,\n    rejectModalOpen: false,\n    onApproveClick: () => {},\n    onRejectClick: () => {},\n    onApproveModalClose: () => {},\n    onRejectModalClose: () => {},\n    onApproveSubmit: () => {},\n    onRejectSubmit: () => {},\n    isBudgetSufficient: false\n  }\n}",
              ...InsufficientBudget.parameters?.docs?.source,
            },
          },
        }),
        (WithApproveModal.parameters = {
          ...WithApproveModal.parameters,
          docs: {
            ...WithApproveModal.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: mockPurchaseRequest,\n    companyId: 'company-123',\n    budget: 2_000_000,\n    monthlySpending: 500_000,\n    remainingBudget: 1_500_000,\n    approveModalOpen: true,\n    rejectModalOpen: false,\n    onApproveClick: () => {},\n    onRejectClick: () => {},\n    onApproveModalClose: () => {},\n    onRejectModalClose: () => {},\n    onApproveSubmit: () => {},\n    onRejectSubmit: () => {}\n  }\n}",
              ...WithApproveModal.parameters?.docs?.source,
            },
          },
        }),
        (WithRejectModal.parameters = {
          ...WithRejectModal.parameters,
          docs: {
            ...WithRejectModal.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: mockPurchaseRequest,\n    companyId: 'company-123',\n    budget: 2_000_000,\n    monthlySpending: 500_000,\n    remainingBudget: 1_500_000,\n    approveModalOpen: false,\n    rejectModalOpen: true,\n    onApproveClick: () => {},\n    onRejectClick: () => {},\n    onApproveModalClose: () => {},\n    onRejectModalClose: () => {},\n    onApproveSubmit: () => {},\n    onRejectSubmit: () => {}\n  }\n}",
              ...WithRejectModal.parameters?.docs?.source,
            },
          },
        }),
        (Interactive.parameters = {
          ...Interactive.parameters,
          docs: {
            ...Interactive.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => {\n    const typedArgs = args as StoryArgs;\n    // eslint-disable-next-line react-hooks/rules-of-hooks\n    const [approveModalOpen, setApproveModalOpen] = useState(false);\n    // eslint-disable-next-line react-hooks/rules-of-hooks\n    const [rejectModalOpen, setRejectModalOpen] = useState(false);\n    return <PurchaseRequestDetailTem purchaseRequest={typedArgs.purchaseRequest!} companyId={typedArgs.companyId!} budget={typedArgs.budget!} monthlySpending={typedArgs.monthlySpending!} remainingBudget={typedArgs.remainingBudget!} isBudgetSufficient={typedArgs.isBudgetSufficient} approveModalOpen={approveModalOpen} rejectModalOpen={rejectModalOpen} onApproveClick={() => setApproveModalOpen(true)} onRejectClick={() => setRejectModalOpen(true)} onApproveModalClose={() => setApproveModalOpen(false)} onRejectModalClose={() => setRejectModalOpen(false)} onApproveSubmit={() => setApproveModalOpen(false)} onRejectSubmit={() => setRejectModalOpen(false)} />;\n  },\n  args: {\n    purchaseRequest: mockPurchaseRequest,\n    companyId: 'company-123',\n    budget: 2_000_000,\n    monthlySpending: 500_000,\n    remainingBudget: 1_500_000,\n    isBudgetSufficient: true\n  }\n}",
              ...Interactive.parameters?.docs?.source,
            },
          },
        }));
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
