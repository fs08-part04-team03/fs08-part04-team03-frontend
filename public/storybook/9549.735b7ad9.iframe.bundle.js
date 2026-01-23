'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9549],
  {
    './src/components/atoms/DropDown/DropDown.tsx'(
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
        react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react-dom/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const DropDown = ({
          items,
          placeholder = '선택',
          variant,
          disabled = !1,
          buttonClassName = '',
          dropdownClassName = '',
          optionClassName = '',
          onSelect,
          selected: externalSelected,
          inModal = !1,
        }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [mounted, setMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [selected, setSelected] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              externalSelected ?? null
            ),
            buttonRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            dropdownRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            [position, setPosition] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
              top: 0,
              left: 0,
              width: 0,
            });
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setMounted(!0);
          }, []);
          const handleSelect = (item) => {
            (setSelected(item),
              setOpen(!1),
              queueMicrotask(() => {
                onSelect?.(item);
              }));
          };
          ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setSelected(externalSelected ?? null);
          }, [externalSelected]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open || !buttonRef.current) return;
              const rect = buttonRef.current.getBoundingClientRect();
              setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width,
              });
            }, [open]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open) return;
              const handleClickOutside = (e) => {
                  !dropdownRef.current ||
                    dropdownRef.current.contains(e.target) ||
                    buttonRef.current?.contains(e.target) ||
                    setOpen(!1);
                },
                handleEscape = (e) => {
                  'Escape' === e.key && setOpen(!1);
                };
              return (
                document.addEventListener('mousedown', handleClickOutside),
                document.addEventListener('keydown', handleEscape),
                () => {
                  (document.removeEventListener('mousedown', handleClickOutside),
                    document.removeEventListener('keydown', handleEscape));
                }
              );
            }, [open]));
          const appliedVariant = variant ?? 'small',
            textColorClasses = {
              small: 'text-gray-950',
              medium: 'text-gray-500',
              large: 'text-gray-950',
            },
            fontClasses = 'font-sans font-normal text-13 tracking--0.4',
            optionHeightClasses = { small: 'h-44', medium: 'h-56', large: 'h-44' },
            zIndexClass = inModal ? 'z-[var(--z-modaldropdown)]' : 'z-[var(--z-dropdown)]';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                  ref: buttonRef,
                  type: 'button',
                  onClick: () => !disabled && setOpen((prev) => !prev),
                  disabled,
                  'aria-haspopup': 'listbox',
                  'aria-expanded': open,
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                    'border border-gray-300 rounded-8 bg-white flex items-center justify-between px-12',
                    {
                      small: 'w-110 h-44',
                      medium: 'mobile:w-153 tablet:w-216 desktop:w-216 h-56',
                      large: 'mobile:w-327 tablet:w-480 desktop:w-480 h-44',
                    }[appliedVariant],
                    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                    buttonClassName
                  ),
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        fontClasses,
                        textColorClasses[appliedVariant]
                      ),
                      children: selected ? selected.label : placeholder,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        src: '/icons/arrow-down.svg',
                        alt: '',
                        'aria-hidden': !0,
                        width: 12,
                        height: 12,
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'w-12 h-12 transition-transform duration-200',
                          open && 'rotate-180'
                        ),
                      }
                    ),
                  ],
                }),
                mounted &&
                  open &&
                  (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                      ref: dropdownRef,
                      role: 'listbox',
                      'aria-label': placeholder,
                      style: {
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        width: position.width,
                      },
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        zIndexClass,
                        'bg-white border border-gray-300 shadow-lg rounded-8 max-h-200 overflow-y-auto scrollbar-none',
                        dropdownClassName
                      ),
                      children: items.map((item) =>
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          'li',
                          {
                            role: 'option',
                            'aria-selected': selected?.key === item.key,
                            tabIndex: 0,
                            onClick: () => handleSelect(item),
                            onKeyDown: (e) => {
                              ('Enter' !== e.key && ' ' !== e.key) ||
                                (e.preventDefault(), handleSelect(item));
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'flex items-center px-12 cursor-pointer hover:bg-gray-100',
                              fontClasses,
                              textColorClasses[appliedVariant],
                              optionHeightClasses[appliedVariant],
                              selected?.key === item.key && 'bg-gray-50',
                              optionClassName
                            ),
                            children: item.label,
                          },
                          item.key
                        )
                      ),
                    }),
                    document.body
                  ),
              ],
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = DropDown;
      DropDown.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DropDown',
        props: {
          items: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'Option' }], raw: 'Option[]' },
            description: '',
          },
          placeholder: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'선택'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'small' | 'medium' | 'large'",
              elements: [
                { name: 'literal', value: "'small'" },
                { name: 'literal', value: "'medium'" },
                { name: 'literal', value: "'large'" },
              ],
            },
            description: '',
          },
          disabled: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          buttonClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          dropdownClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          optionClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onSelect: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(item: Option) => void',
              signature: {
                arguments: [{ type: { name: 'Option' }, name: 'item' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          selected: { required: !1, tsType: { name: 'Option' }, description: '' },
          inModal: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/components/atoms/ProgressBar/ProgressBar.tsx'(
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
        );
      const ProgressBar = ({ value, currentBudget, lastBudget, className }) => {
          const safeCurrentBudget = Number.isFinite(currentBudget) ? currentBudget : 0,
            safeLastBudget = Number.isFinite(lastBudget) ? lastBudget : 0,
            clampedValue = Math.max(0, Math.min(100, value)),
            diff = safeCurrentBudget - safeLastBudget;
          let diffText = '';
          diffText =
            diff > 0 ? ' 덜 사용했어요' : diff < 0 ? ' 더 사용했어요' : ' 동일하게 사용했어요';
          const formattedPercentage = `${Math.round(clampedValue)}%`,
            containerWidthClass = className || 'w-345 desktop:w-345 tablet:w-179 mobile:w-116',
            trackWidthClass = className
              ? 'w-full'
              : 'w-304 desktop:w-304 tablet:w-179 mobile:w-116',
            wrapperWidthClass = className || 'w-fit';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              'relative group',
              wrapperWidthClass
            ),
            tabIndex: 0,
            role: 'button',
            onKeyDown: (e) => {
              ('Enter' !== e.key && ' ' !== e.key) || e.preventDefault();
            },
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'flex items-center gap-5 desktop:gap-10 tablet:gap-8 h-17 tablet:h-17 mobile:h-15',
                  containerWidthClass
                ),
                role: 'progressbar',
                'aria-valuenow': clampedValue,
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-label': '진행률',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'relative h-6 rounded-6 bg-gray-200 overflow-hidden',
                      trackWidthClass
                    ),
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                        'h-full bg-secondary-500 rounded-6 transition-all duration-500'
                      ),
                      style: { width: `${clampedValue}%` },
                    }),
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-950 leading-none',
                      'desktop:text-14 tablet:text-14 mobile:text-12',
                      'desktop:font-normal tablet:font-normal mobile:font-normal',
                      'desktop:tracking--0.35 tablet:tracking--0.35 mobile:tracking--0.3'
                    ),
                    children: formattedPercentage,
                  }),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'absolute left-0 mt-8',
                  'hidden group-hover:flex group-focus-within:flex',
                  'flex-col justify-center items-start text-center gap-8',
                  'w-260 h-130 p-24 rounded-4 bg-gray-950',
                  'text-white',
                  'z-tooltip'
                ),
                role: 'tooltip',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                    className: 'text-14 font-extrabold tracking-tight',
                    children: ['이번 달 남은 예산: ', safeCurrentBudget.toLocaleString(), '원'],
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                    className: 'text-12 font-normal tracking--0.35',
                    children: ['지난 달 남은 예산: ', safeLastBudget.toLocaleString(), '원'],
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                    className: 'text-12 font-normal tracking--0.35',
                    children: ['지난 달 보다 ', Math.abs(diff).toLocaleString(), '원', diffText],
                  }),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ProgressBar;
      ProgressBar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProgressBar',
        props: {
          value: { required: !0, tsType: { name: 'number' }, description: '' },
          currentBudget: { required: !0, tsType: { name: 'number' }, description: '' },
          lastBudget: { required: !0, tsType: { name: 'number' }, description: '' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/constants/sort.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { GS: () => COMMON_SORT_OPTIONS });
      const COMMON_SORT_OPTIONS = [
        { key: 'LATEST', label: '최신순' },
        { key: 'PRICE_LOW', label: '낮은 가격순' },
        { key: 'PRICE_HIGH', label: '높은 가격순' },
      ];
    },
    './src/features/purchase-history/components/PurchaseHistoryListTopOrg/PurchaseHistoryListTopOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        ),
        _components_atoms_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__('./src/components/atoms/ProgressBar/ProgressBar.tsx'),
        _components_atoms_DropDown_DropDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/DropDown/DropDown.tsx'
        ),
        _constants_sort__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__('./src/constants/sort.ts'),
        _constants_labels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './src/features/purchase-history/constants/labels.ts'
        );
      const PurchaseHistoryListTopOrg = ({
          thisMonthBudget,
          lastMonthBudget,
          thisMonthSpending,
          lastMonthSpending,
          thisYearTotalSpending,
          lastYearTotalSpending,
          spendingPercentage = 0,
          currentBudget = 0,
          lastBudget = 0,
          selectedSort,
          onSortChange,
        }) => {
          const yearOverYearDiff = thisYearTotalSpending - lastYearTotalSpending;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'flex flex-col gap-16 tablet:gap-20 desktop:gap-24',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center justify-between',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                    className: 'font-bold text-18',
                    children: _constants_labels__WEBPACK_IMPORTED_MODULE_5__.l.PAGE_TITLE,
                  }),
                  selectedSort &&
                    onSortChange &&
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_DropDown_DropDown__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        items: _constants_sort__WEBPACK_IMPORTED_MODULE_4__.GS,
                        placeholder:
                          _constants_labels__WEBPACK_IMPORTED_MODULE_5__.l.SORT_PLACEHOLDER,
                        variant: 'small',
                        selected: selectedSort,
                        onSelect: onSortChange,
                      }
                    ),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className:
                  'flex flex-col gap-12 tablet:grid tablet:grid-cols-3 desktop:grid-cols-3 tablet:gap-16 desktop:gap-20',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    className: 'grid grid-cols-2 gap-12 tablet:contents desktop:contents',
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className:
                          'flex flex-col gap-8 tablet:gap-10 desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-gray-50 rounded-8',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'desktop:flex desktop:justify-between desktop:items-center',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                                className:
                                  'text-16 tablet:text-16 desktop:text-18 font-semibold text-gray-700',
                                children: '이번 달 예산',
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__.A,
                                {
                                  value: thisMonthBudget,
                                  className: 'text-18 tablet:text-18 desktop:text-24',
                                }
                              ),
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                            className: 'text-14 tablet:text-14 desktop:text-16 text-gray-600',
                            children: [
                              '지난 달 예산은',
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('br', {}),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__.A,
                                { value: lastMonthBudget, className: 'text-gray-600' }
                              ),
                              ' 이었어요',
                            ],
                          }),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className:
                          'flex flex-col desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-gray-50 rounded-8',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'desktop:flex desktop:justify-between desktop:items-center',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                                className:
                                  'text-16 tablet:text-16 desktop:text-18 font-semibold text-gray-700',
                                children: '이번 달 지출액',
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__.A,
                                {
                                  value: thisMonthSpending,
                                  className: 'text-18 tablet:text-18 desktop:text-24',
                                }
                              ),
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                            className:
                              'text-14 tablet:text-14 desktop:text-16 text-gray-600 tablet:pt-10 pt-10',
                            children: [
                              '지난 달: ',
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__.A,
                                { value: lastMonthSpending, className: 'text-gray-600' }
                              ),
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: 'mt-4 tablet:mt-6 desktop:mt-8 w-full',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _components_atoms_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                value: spendingPercentage,
                                currentBudget,
                                lastBudget,
                                className: 'w-full',
                              }
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    className:
                      'flex flex-col gap-8 tablet:gap-10 desktop:gap-12 p-16 tablet:p-20 desktop:p-24 bg-gray-50 rounded-8',
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'desktop:flex desktop:justify-between desktop:items-center',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                            className:
                              'text-16 tablet:text-16 desktop:text-18 font-semibold text-gray-700',
                            children: '올해 총 지출액',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__.A,
                            {
                              value: thisYearTotalSpending,
                              className: 'text-18 tablet:text-18 desktop:text-24',
                            }
                          ),
                        ],
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                        className: 'text-14 tablet:text-14 desktop:text-16 text-gray-600',
                        children: [
                          yearOverYearDiff > 0 &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                              {
                                children: [
                                  '작년보다',
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('br', {}),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                    _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__.A,
                                    { value: yearOverYearDiff, className: 'text-gray-600' }
                                  ),
                                  ' 더 지출했어요',
                                ],
                              }
                            ),
                          yearOverYearDiff < 0 &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                              {
                                children: [
                                  '작년보다',
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('br', {}),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                    _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_1__.A,
                                    {
                                      value: Math.abs(yearOverYearDiff),
                                      className: 'text-gray-600',
                                    }
                                  ),
                                  ' 덜 지출했어요',
                                ],
                              }
                            ),
                          0 === yearOverYearDiff &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                              { children: '작년과 동일하게 지출했어요' }
                            ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseHistoryListTopOrg;
      PurchaseHistoryListTopOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryListTopOrg',
        props: {
          thisMonthBudget: { required: !0, tsType: { name: 'number' }, description: '' },
          lastMonthBudget: { required: !0, tsType: { name: 'number' }, description: '' },
          thisMonthSpending: { required: !0, tsType: { name: 'number' }, description: '' },
          lastMonthSpending: { required: !0, tsType: { name: 'number' }, description: '' },
          thisYearTotalSpending: { required: !0, tsType: { name: 'number' }, description: '' },
          lastYearTotalSpending: { required: !0, tsType: { name: 'number' }, description: '' },
          spendingPercentage: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          currentBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          lastBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          selectedSort: { required: !1, tsType: { name: 'Option' }, description: '' },
          onSortChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(option: Option) => void',
              signature: {
                arguments: [{ type: { name: 'Option' }, name: 'option' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
  },
]);
