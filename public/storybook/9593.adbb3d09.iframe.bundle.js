'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9593],
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
    './src/components/atoms/StatusTag/StatusTag.tsx'(
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
      const variantStyles = {
          approved: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-blue-100', 'text-blue-200'),
          rejected: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-red-100', 'text-red'),
          cancelled: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
            'bg-black-100',
            'text-gray-50'
          ),
          pending: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-gray-100', 'text-gray-950'),
          urgent: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-[#F2F6FF]', 'text-[#4C8AE1]'),
        },
        CheckCircleIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
              d: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.0254 13.7617L7.92676 10.5732L6.85156 11.6182L11.0107 15.8984L17.4023 9.50684L16.3418 8.44629L11.0254 13.7617Z',
              fill: 'currentColor',
            }),
          }),
        CloseCircleIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              d: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.999 10.9395L8.28711 7.22656L7.22559 8.28809L10.9385 12L7.22559 15.7119L8.28711 16.7734L11.999 13.0605L15.7109 16.7734L16.7715 15.7119L13.0596 12L16.7715 8.28809L15.7109 7.22656L11.999 10.9395Z',
              fill: 'currentColor',
            }),
          }),
        TimeIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                d: 'M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5V22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22V20.5C16.6944 20.5 20.5 16.6944 20.5 12Z',
                fill: 'currentColor',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                d: 'M11.25 6.90527H12.75V11.25H16.3281V12.75H11.25V6.90527Z',
                fill: 'currentColor',
              }),
            ],
          }),
        CloseCircleWhiteIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              d: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.999 10.9395L8.28711 7.22656L7.22559 8.28809L10.9385 12L7.22559 15.7119L8.28711 16.7734L11.999 13.0605L15.7109 16.7734L16.7715 15.7119L13.0596 12L16.7715 8.28809L15.7109 7.22656L11.999 10.9395Z',
              fill: 'white',
            }),
          }),
        variantIcons = {
          approved: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CheckCircleIcon, {}),
          rejected: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseCircleIcon, {}),
          cancelled: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            CloseCircleWhiteIcon,
            {}
          ),
          pending: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TimeIcon, {}),
          urgent: null,
        },
        variantLabels = {
          approved: '승인',
          rejected: '거절',
          cancelled: '취소',
          pending: '대기중',
          urgent: '즉시 요청',
        },
        StatusTag = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          ({ variant = 'pending', className, children, ...props }, ref) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
              ref,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'flex',
                'w-72 h-30',
                'px-8 py-6',
                'justify-center items-center',
                'gap-4',
                'rounded-100',
                'text-13 font-bold leading-normal tracking--0.3px',
                variantStyles[variant],
                className
              ),
              style: { fontFamily: 'SUIT, var(--font-family-base), sans-serif' },
              ...props,
              children: [
                variantIcons[variant] &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'shrink-0',
                    children: variantIcons[variant],
                  }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: children || variantLabels[variant],
                }),
              ],
            })
        );
      StatusTag.displayName = 'StatusTag';
      const __WEBPACK_DEFAULT_EXPORT__ = StatusTag;
      StatusTag.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'StatusTag',
        props: {
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'approved' | 'rejected' | 'cancelled' | 'pending' | 'urgent'",
              elements: [
                { name: 'literal', value: "'approved'" },
                { name: 'literal', value: "'rejected'" },
                { name: 'literal', value: "'cancelled'" },
                { name: 'literal', value: "'pending'" },
                { name: 'literal', value: "'urgent'" },
              ],
            },
            description: '',
            defaultValue: { value: "'pending'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['HTMLAttributes'],
      };
    },
    './src/features/purchase-history/components/PurchaseHistoryRowOrg/PurchaseHistoryRowOrg.tsx'(
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
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        ),
        _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/DateText/DateText.tsx'
        ),
        _components_atoms_StatusTag_StatusTag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/StatusTag/StatusTag.tsx'
        ),
        _features_purchase_utils_purchase_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './src/features/purchase/utils/purchase.utils.ts'
        ),
        _utils_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__('./src/utils/array.ts'),
        _constants_labels__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          './src/features/purchase-history/constants/labels.ts'
        );
      const RequesterWithUrgentTag = ({ name, isUrgent }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
            className: 'flex items-center gap-16',
            children: [
              name,
              isUrgent &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_StatusTag_StatusTag__WEBPACK_IMPORTED_MODULE_4__.A,
                  { variant: 'urgent', className: 'text-12' }
                ),
            ],
          }),
        ClickableHeader = ({
          itemDescription,
          totalQuantity,
          price,
          onClick,
          onKeyDown,
          textSize,
        }) => {
          const textSizeClass = 'sm' === textSize ? 'text-14' : 'text-16',
            priceSizeClass = 'sm' === textSize ? 'text-16' : 'text-18';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex items-center justify-between px-16 tablet:px-20 py-8 border-b border-gray-200',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                role: 'button',
                tabIndex: 0,
                className:
                  'flex items-center gap-8 cursor-pointer hover:opacity-70 transition-opacity',
                onClick,
                onKeyDown,
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: `${textSizeClass} font-bold text-gray-950`,
                    children: itemDescription,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                    className: 'text-12 text-gray-500',
                    children: [
                      _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.TOTAL_QUANTITY,
                      ' ',
                      totalQuantity,
                      _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.QUANTITY_UNIT,
                    ],
                  }),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                { value: price, className: `${priceSizeClass} font-bold` }
              ),
            ],
          });
        },
        MobileInfoRow = ({ label, value, textSize = 'sm' }) => {
          const sizeClass = 'sm' === textSize ? 'text-14' : 'text-16';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'grid grid-cols-[140px_1fr] border-b border-gray-100',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: `${sizeClass} border-r border-gray-100 p-16`,
                children: label,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: `${sizeClass} p-16`,
                children: value,
              }),
            ],
          });
        },
        TabletInfoGrid = ({ rows }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: 'grid grid-cols-[140px_1fr_140px_1fr]',
            children: rows.map(({ label, value, id }, index) =>
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                {
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className:
                        'text-16 border-r border-b border-gray-100 flex items-center px-20 py-15',
                      children: label,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: `text-16 ${index % 2 == 0 ? 'border-r' : ''} border-b border-gray-100 flex items-center px-20 py-15`,
                      children: value,
                    }),
                  ],
                },
                id
              )
            ),
          }),
        PurchaseHistoryRowOrg = ({ item, isFirst = !1, onItemClick }) => {
          const { itemDescription, totalQuantity, isUrgent, handleItemClick, handleItemKeyDown } =
              ((item, onItemClick) => {
                const itemDescription = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
                    () =>
                      (0, _features_purchase_utils_purchase_utils__WEBPACK_IMPORTED_MODULE_5__.hy)(
                        item.purchaseItems
                      ),
                    [item.purchaseItems]
                  ),
                  totalQuantity = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
                    () =>
                      (0, _utils_array__WEBPACK_IMPORTED_MODULE_6__.xu)(
                        item.purchaseItems,
                        'quantity'
                      ),
                    [item.purchaseItems]
                  ),
                  isUrgent = !0 === item.urgent,
                  handleItemClick = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
                    onItemClick?.(item.id);
                  }, [onItemClick, item.id]),
                  handleItemKeyDown = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
                    (e) => {
                      ('Enter' !== e.key && ' ' !== e.key) ||
                        (e.preventDefault(), handleItemClick());
                    },
                    [handleItemClick]
                  );
                return {
                  itemDescription,
                  totalQuantity,
                  isUrgent,
                  handleItemClick,
                  handleItemKeyDown,
                };
              })(item, onItemClick),
            totalPrice = item.itemsTotalPrice ?? item.totalPrice ?? 0,
            mobileInfoRows = [
              {
                id: 'request-date',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.REQUEST_DATE,
                value: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
                  { date: item.createdAt, className: 'text-14' }
                ),
              },
              {
                id: 'requester',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.REQUESTER,
                value: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  RequesterWithUrgentTag,
                  { name: item.requester?.name || '-', isUrgent }
                ),
              },
              {
                id: 'approval-date',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.APPROVAL_DATE,
                value: item.approver
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
                      { date: item.updatedAt, className: 'text-14' }
                    )
                  : '-',
              },
              {
                id: 'manager',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.MANAGER,
                value: item.approver?.name || '-',
              },
            ],
            tabletInfoRows = [
              {
                id: 'request-date',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.REQUEST_DATE,
                value: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
                  { date: item.createdAt, className: 'text-16' }
                ),
              },
              {
                id: 'requester',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.REQUESTER,
                value: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  RequesterWithUrgentTag,
                  { name: item.requester?.name || '-', isUrgent }
                ),
              },
              {
                id: 'approval-date',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.APPROVAL_DATE,
                value: item.approver
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
                      { date: item.updatedAt, className: 'text-16' }
                    )
                  : '-',
              },
              {
                id: 'manager',
                label: _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS.MANAGER,
                value: item.approver?.name || '-',
              },
            ];
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: `w-full border-b border-gray-200 ${isFirst ? 'border-t border-gray-200' : ''} flex flex-col tablet:hidden`,
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ClickableHeader, {
                      itemDescription,
                      totalQuantity,
                      price: totalPrice,
                      onClick: handleItemClick,
                      onKeyDown: handleItemKeyDown,
                      textSize: 'sm',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'flex flex-col',
                      children: mobileInfoRows.map((row) =>
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          MobileInfoRow,
                          { label: row.label, value: row.value, textSize: 'sm' },
                          row.id
                        )
                      ),
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: `w-full border-b border-gray-200 ${isFirst ? 'border-t border-gray-200' : ''} hidden tablet:flex desktop:hidden flex-col`,
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ClickableHeader, {
                      itemDescription,
                      totalQuantity,
                      price: totalPrice,
                      onClick: handleItemClick,
                      onKeyDown: handleItemKeyDown,
                      textSize: 'md',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: 'flex flex-col',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabletInfoGrid, {
                          rows: tabletInfoRows.slice(0, 2),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabletInfoGrid, {
                          rows: tabletInfoRows.slice(2, 4),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className:
                    'hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-100 w-full border-b border-gray-200',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
                      { date: item.createdAt, className: 'flex items-center h-100 text-16 px-40' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: 'flex items-center gap-8',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          className: 'text-16 text-gray-950',
                          children: item.requester?.name || '-',
                        }),
                        isUrgent &&
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_StatusTag_StatusTag__WEBPACK_IMPORTED_MODULE_4__.A,
                            { variant: 'urgent', className: 'text-12' }
                          ),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      role: 'button',
                      tabIndex: 0,
                      className:
                        'flex flex-col gap-4 cursor-pointer hover:opacity-70 transition-opacity',
                      onClick: handleItemClick,
                      onKeyDown: handleItemKeyDown,
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          className: 'text-16 text-gray-950',
                          children: itemDescription,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                          className: 'text-14 text-gray-500',
                          children: [
                            _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.ROW_LABELS
                              .TOTAL_QUANTITY_DESKTOP,
                            ' ',
                            totalQuantity,
                            _constants_labels__WEBPACK_IMPORTED_MODULE_7__.l.QUANTITY_UNIT,
                          ],
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                      { value: totalPrice, className: 'text-16 font-normal' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        date: item.approver ? item.updatedAt : '-',
                        className: 'flex items-center text-16',
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-16 text-gray-950',
                      children: item.approver?.name || '-',
                    }),
                  ],
                }),
              ],
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseHistoryRowOrg;
      PurchaseHistoryRowOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryRowOrg',
        props: {
          item: { required: !0, tsType: { name: 'PurchaseRequestItem' }, description: '' },
          isFirst: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          onItemClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(orderId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'orderId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
    './src/features/purchase-history/constants/labels.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { l: () => PURCHASE_HISTORY_LABELS });
      const PURCHASE_HISTORY_LABELS = {
        PAGE_TITLE: '구매 내역 확인',
        SORT_PLACEHOLDER: '정렬',
        TABLE_HEADERS: {
          REQUEST_DATE: '구매 요청일',
          REQUESTER: '요청인',
          PRODUCTS: '구매 물품',
          TOTAL_PRICE: '총 금액',
          APPROVAL_DATE: '구매 승인일',
          MANAGER: '담당자',
        },
        ROW_LABELS: {
          REQUEST_DATE: '구매 요청일',
          REQUESTER: '요청인',
          APPROVAL_DATE: '구매 승인일',
          MANAGER: '담당자',
          TOTAL_QUANTITY: '총수량',
          TOTAL_QUANTITY_DESKTOP: '총 수량',
        },
        QUANTITY_UNIT: '개',
        TITLE: '구매 내역 확인',
        BACK_TO_LIST: '구매 내역 목록으로 돌아가기',
      };
    },
    './src/features/purchase/utils/purchase.utils.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        AT: () => getStatusTagVariant,
        Yq: () => _utils_formatDate__WEBPACK_IMPORTED_MODULE_0__.Y,
        hy: () => formatItemDescription,
        mE: () => calculateTotalPrice,
      });
      var _utils_formatDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/utils/formatDate.ts'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/utils/logger.ts');
      function formatItemDescription(purchaseItems) {
        if (!purchaseItems || 0 === purchaseItems.length)
          return (
            _utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.warn(
              'formatItemDescription: purchaseItems가 비어있습니다.'
            ),
            '상품 정보 없음'
          );
        const firstItem = purchaseItems[0];
        if (!firstItem || !firstItem.products)
          return (
            _utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.warn(
              'formatItemDescription: firstItem 또는 products가 없습니다.'
            ),
            '상품 정보 없음'
          );
        const productName = firstItem.products.name || '이름 없음';
        if (1 === purchaseItems.length) return productName;
        return `${productName} 외 ${purchaseItems.length - 1}건`;
      }
      function getStatusTagVariant(status) {
        return 'APPROVED' === status
          ? 'approved'
          : 'REJECTED' === status
            ? 'rejected'
            : 'PENDING' === status
              ? 'pending'
              : 'CANCELLED' === status
                ? 'cancelled'
                : 'pending';
      }
      function calculateTotalPrice(item) {
        if (item.finalTotalPrice) return item.finalTotalPrice;
        if (void 0 !== item.itemsTotalPrice) return item.itemsTotalPrice + (item.shippingFee ?? 0);
        if (void 0 !== item.totalPrice && item.totalPrice > 0)
          return item.totalPrice + (item.shippingFee ?? 0);
        return (
          (item.purchaseItems?.reduce(
            (sum, purchaseItem) =>
              sum + (purchaseItem.priceSnapshot || 0) * (purchaseItem.quantity || 0),
            0
          ) || 0) + (item.shippingFee ?? 0)
        );
      }
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
    './src/utils/formatDate.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      function formatDate(dateInput) {
        const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
        if (Number.isNaN(dateObj.getTime())) return '-';
        return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;
      }
      __webpack_require__.d(__webpack_exports__, { Y: () => formatDate });
    },
    './src/utils/logger.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { v: () => logger });
      __webpack_require__('./node_modules/console-browserify/index.js');
      const logger = {
        error: (message, ...args) => {
          false;
        },
        warn: (message, ...args) => {
          false;
        },
        info: (message, ...args) => {
          false;
        },
      };
    },
  },
]);
