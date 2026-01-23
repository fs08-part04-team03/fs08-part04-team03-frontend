'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8321],
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
    './src/features/purchase/template/MyPurchaseRequestDetailTem/MyPurchaseRequestDetailTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Approved: () => Approved,
          LongRequestMessage: () => LongRequestMessage,
          Pending: () => Pending,
          Rejected: () => Rejected,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => MyPurchaseRequestDetailTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        constants = __webpack_require__('./src/features/purchase/constants/index.ts'),
        PurchaseRequestDetailTopOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg.tsx'
        ),
        PurchaseRequestDetailOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg.tsx'
        ),
        PurchaseRequestDetailActionsOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg.tsx'
        );
      const MyPurchaseRequestDetailTem = ({ purchaseRequest, companyId, onGoToList }) => {
          let resultMessage = '-';
          'REJECTED' === purchaseRequest.status && purchaseRequest.rejectReason
            ? (resultMessage = purchaseRequest.rejectReason)
            : 'APPROVED' === purchaseRequest.status &&
              purchaseRequest.reason &&
              (resultMessage = purchaseRequest.reason);
          const approvedInfo = {
            approverName: purchaseRequest.approver?.name || '-',
            approvalDate: purchaseRequest.approver ? purchaseRequest.updatedAt : null,
            statusLabel: constants.gU[purchaseRequest.status],
            resultMessage,
          };
          return (0, jsx_runtime.jsx)('div', {
            className: 'flex flex-col items-center gap-30 mt-30',
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'tablet:mt-30 desktop:mt-60 mb-54 desktop:mb-254 tablet:mb-132',
              children: [
                (0, jsx_runtime.jsx)(PurchaseRequestDetailTopOrg.v, { purchaseRequest, companyId }),
                (0, jsx_runtime.jsx)(PurchaseRequestDetailOrg.A, { purchaseRequest, approvedInfo }),
                (0, jsx_runtime.jsx)(PurchaseRequestDetailActionsOrg.A, {
                  companyId,
                  actionType: 'user',
                  purchaseRequest,
                  onGoToList,
                }),
              ],
            }),
          });
        },
        MyPurchaseRequestDetailTem_MyPurchaseRequestDetailTem = MyPurchaseRequestDetailTem;
      MyPurchaseRequestDetailTem.__docgenInfo = {
        description:
          'MyPurchaseRequestDetailTem\n순수 UI 조립 레이어\n- header / list / row / footer 컴포지션만 담당\n- props 기반 렌더링만 수행',
        methods: [],
        displayName: 'MyPurchaseRequestDetailTem',
        props: {
          purchaseRequest: {
            required: !0,
            tsType: { name: 'PurchaseRequestItem' },
            description: '',
          },
          companyId: { required: !0, tsType: { name: 'string' }, description: '' },
          onGoToList: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
        },
      };
      const MyPurchaseRequestDetailTem_stories = {
          title: 'Features/Purchase/Template/MyPurchaseRequestDetailTem',
          component: MyPurchaseRequestDetailTem_MyPurchaseRequestDetailTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            nextjs: {
              appDirectory: !0,
              navigation: {
                pathname: '/company-123/my/purchase-requests/1',
                params: { companyId: 'company-123' },
              },
            },
            docs: {
              description: {
                component:
                  '사용자용 내 구매 요청 상세 페이지 템플릿입니다. 내가 요청한 구매 내역과 승인 정보를 확인할 수 있습니다.\n\n**주요 구성:**\n\n1. **PurchaseRequestDetailTopOrg**: 구매품목 목록 및 가격 요약\n   - 구매품목 토글\n   - 주문금액, 배송비, 총 주문금액\n\n2. **PurchaseRequestDetailOrg**: 요청 정보 및 승인 정보\n   - 요청 정보 (요청인, 요청 날짜, 요청 메시지)\n   - 승인 정보 (담당자, 승인 날짜, 상태, 결과 메시지)\n\n3. **PurchaseRequestDetailActionsOrg**: 목록 보기, 장바구니 다시 담기 버튼',
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
        Approved = {
          args: { purchaseRequest: mockPurchaseRequest, companyId: 'company-123' },
          parameters: {
            docs: {
              description: {
                story:
                  '승인된 구매 요청을 표시합니다. 구매품목, 요청 정보, 승인 정보가 포함되며, 목록 보기와 장바구니 다시 담기 버튼이 표시됩니다.',
              },
            },
          },
        },
        Pending = {
          args: {
            purchaseRequest: { ...mockPurchaseRequest, status: 'PENDING', approver: void 0 },
            companyId: 'company-123',
          },
          parameters: {
            docs: {
              description: {
                story:
                  '승인 대기 중인 구매 요청입니다. 담당자가 아직 배정되지 않아 승인 정보의 담당자와 승인 날짜가 "-"로 표시됩니다.',
              },
            },
          },
        },
        Rejected = {
          args: {
            purchaseRequest: {
              ...mockPurchaseRequest,
              status: 'REJECTED',
              rejectReason: '예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.',
            },
            companyId: 'company-123',
          },
          parameters: {
            docs: {
              description: {
                story:
                  '반려된 구매 요청입니다. 승인 정보의 상태가 "반려"로 표시되며, 결과 메시지에 반려 사유가 표시됩니다.',
              },
            },
          },
        },
        LongRequestMessage = {
          args: {
            purchaseRequest: {
              ...mockPurchaseRequest,
              requestMessage:
                '이번 프로젝트를 위해 다음 물품들이 필요합니다. 회의실에서 사용할 음료와 간식이 필요하며, 팀원 모두가 함께 즐길 수 있는 품목으로 선정했습니다. 특히 코카콜라 제로는 건강을 생각하는 팀원들을 위한 선택이며, 펩시콜라는 다양한 취향을 고려한 것입니다. 가능한 한 빠른 배송을 부탁드리며, 배송 시 회의실 앞에 직접 배치해 주시면 감사하겠습니다.',
            },
            companyId: 'company-123',
          },
          parameters: {
            docs: {
              description: {
                story:
                  '긴 요청 메시지가 포함된 경우입니다. 요청 메시지가 여러 줄로 표시되며 자동 줄바꿈됩니다.',
              },
            },
          },
        },
        __namedExportsOrder = ['Approved', 'Pending', 'Rejected', 'LongRequestMessage'];
      ((Approved.parameters = {
        ...Approved.parameters,
        docs: {
          ...Approved.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    purchaseRequest: mockPurchaseRequest,\n    companyId: 'company-123'\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '승인된 구매 요청을 표시합니다. 구매품목, 요청 정보, 승인 정보가 포함되며, 목록 보기와 장바구니 다시 담기 버튼이 표시됩니다.'\n      }\n    }\n  }\n}",
            ...Approved.parameters?.docs?.source,
          },
        },
      }),
        (Pending.parameters = {
          ...Pending.parameters,
          docs: {
            ...Pending.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      status: 'PENDING',\n      approver: undefined\n    },\n    companyId: 'company-123'\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '승인 대기 중인 구매 요청입니다. 담당자가 아직 배정되지 않아 승인 정보의 담당자와 승인 날짜가 \"-\"로 표시됩니다.'\n      }\n    }\n  }\n}",
              ...Pending.parameters?.docs?.source,
            },
          },
        }),
        (Rejected.parameters = {
          ...Rejected.parameters,
          docs: {
            ...Rejected.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      status: 'REJECTED',\n      rejectReason: '예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.'\n    },\n    companyId: 'company-123'\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '반려된 구매 요청입니다. 승인 정보의 상태가 \"반려\"로 표시되며, 결과 메시지에 반려 사유가 표시됩니다.'\n      }\n    }\n  }\n}",
              ...Rejected.parameters?.docs?.source,
            },
          },
        }),
        (LongRequestMessage.parameters = {
          ...LongRequestMessage.parameters,
          docs: {
            ...LongRequestMessage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      requestMessage: '이번 프로젝트를 위해 다음 물품들이 필요합니다. 회의실에서 사용할 음료와 간식이 필요하며, 팀원 모두가 함께 즐길 수 있는 품목으로 선정했습니다. 특히 코카콜라 제로는 건강을 생각하는 팀원들을 위한 선택이며, 펩시콜라는 다양한 취향을 고려한 것입니다. 가능한 한 빠른 배송을 부탁드리며, 배송 시 회의실 앞에 직접 배치해 주시면 감사하겠습니다.'\n    },\n    companyId: 'company-123'\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '긴 요청 메시지가 포함된 경우입니다. 요청 메시지가 여러 줄로 표시되며 자동 줄바꿈됩니다.'\n      }\n    }\n  }\n}",
              ...LongRequestMessage.parameters?.docs?.source,
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
