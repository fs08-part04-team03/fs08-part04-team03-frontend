'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9255],
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
    './src/components/atoms/SkeletonUI/SkeletonUI.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { K: () => SkeletonUI });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const SkeletonUI = ({ className }) =>
        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'animate-shimmer rounded-md bg-gray-200',
            className
          ),
        });
      SkeletonUI.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'SkeletonUI',
        props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
      };
    },
    './src/components/molecules/ListSkeletonUI/ListSkeletonUI.tsx'(
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
        _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/SkeletonUI/SkeletonUI.tsx'
        );
      const ListSkeleton = ({ rows = 5, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('w-full', className),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'desktop:hidden',
                children: Array.from({ length: rows }, (_, index) =>
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                    'div',
                    {
                      className: 'py-20 tablet:py-30',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                          { className: 'h-16 w-80 mb-10' }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex gap-20',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                              { className: 'w-90 h-90 shrink-0' }
                            ),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                              className: 'flex flex-col gap-6 flex-1',
                              children: [
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                                  { className: 'h-12 w-100' }
                                ),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                                  { className: 'h-14 w-full tablet:h-16' }
                                ),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                                  { className: 'h-14 w-60' }
                                ),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                                  { className: 'h-14 w-full' }
                                ),
                              ],
                            }),
                          ],
                        }),
                        index < rows - 1 &&
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: 'mt-30 h-1 bg-gray-200',
                          }),
                      ],
                    },
                    `mobile-skeleton-${index}`
                  )
                ),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'hidden desktop:block',
                children: Array.from({ length: rows }, (_, index) =>
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                    'div',
                    {
                      className:
                        'flex items-center desktop:px-40 desktop:gap-16 desktop:h-100 border-b border-gray-200',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex-1 flex items-center gap-20',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                              { className: 'w-40 h-40 shrink-0' }
                            ),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                              { className: 'h-16 w-200' }
                            ),
                          ],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                          { className: 'w-120 h-16' }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                          { className: 'w-180 h-16' }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                          { className: 'w-160 h-16' }
                        ),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _atoms_SkeletonUI_SkeletonUI__WEBPACK_IMPORTED_MODULE_2__.K,
                          { className: 'w-180 h-16' }
                        ),
                      ],
                    },
                    `desktop-skeleton-${index}`
                  )
                ),
              }),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = ListSkeleton;
      ListSkeleton.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ListSkeleton',
        props: {
          rows: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '5', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/components/molecules/PaginationBlock/PaginationBlock.tsx'(
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
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const PaginationBlock = ({ current, total, onPrev, onNext }) => {
          const [page, setPage] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(current);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            const safeTotal = Math.max(1, total),
              safeCurrent = Math.min(Math.max(1, current), safeTotal);
            setPage(safeCurrent);
          }, [current, total]);
          const isPrevEnd = 1 === page,
            isNextEnd = page === total;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex items-center justify-between h-40 w-327 tablet:w-696 desktop:w-1400 mb-140',
            role: 'navigation',
            'aria-label': '페이지네이션',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'text-gray-primary-500 text-16 tracking-tight font-suit',
                children: [page, ' of ', total],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-30',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page > 1) {
                          const newPage = page - 1;
                          (setPage(newPage), onPrev?.(newPage));
                        }
                      },
                      inactive: isPrevEnd,
                      'aria-label': '이전 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isPrevEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-left.svg',
                                alt: '이전 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isPrevEnd,
                              'text-gray-primary-500': !isPrevEnd,
                            }),
                            children: 'Prev',
                          }),
                        ],
                      }),
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page < total) {
                          const newPage = page + 1;
                          (setPage(newPage), onNext?.(newPage));
                        }
                      },
                      inactive: isNextEnd,
                      'aria-label': '다음 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isNextEnd,
                              'text-gray-950': !isNextEnd,
                            }),
                            children: 'Next',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isNextEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-right.svg',
                                alt: '다음 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                        ],
                      }),
                    }
                  ),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PaginationBlock;
      PaginationBlock.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PaginationBlock',
        props: {
          current: { required: !0, tsType: { name: 'number' }, description: '' },
          total: { required: !0, tsType: { name: 'number' }, description: '' },
          onPrev: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onNext: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
    './src/components/molecules/StatusNotice/StatusNotice.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const StatusNotice = ({
          icon = '/icons/book.svg',
          title,
          description,
          buttonText = '',
          onButtonClick,
          hideButton = !1,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'mobile:w-375 mobile:min-h-300 mobile:px-24 mobile:flex mobile:flex-col mobile:items-center',
              'tablet:w-310 tablet:min-h-336 tablet:px-0'
            ),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'flex items-center justify-center rounded-full bg-gray-25',
                  'px-32 pt-30 pb-27',
                  'mobile:mt-30 mobile:mb-41',
                  'tablet:mb-50'
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_1__.A,
                  { src: icon, alt: '', width: 36, height: 43, className: 'object-contain' }
                ),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'mobile:text-gray-primary-950 mobile:text-18 mobile:font-extrabold mobile:tracking--0.45 mobile:text-center mobile:mb-10',
                  'tablet:text-gray-primary-950 tablet:text-24 tablet:font-extrabold tablet:tracking--0.6 tablet:text-center tablet:mb-12'
                ),
                children: title,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'mobile:text-gray-primary-800 mobile:text-14 mobile:font-normal mobile:tracking--0.35 mobile:leading-160 mobile:whitespace-pre-line mobile:text-center mobile:mb-40',
                  'tablet:text-gray-primary-800 tablet:text-16 tablet:font-normal tablet:tracking--0.4 tablet:leading-160 tablet:text-center tablet:mb-48'
                ),
                children: description,
              }),
              !hideButton &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    size: 'lg',
                    variant: 'primary',
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'mobile:w-327 mobile:h-64 mobile:cursor-pointer',
                      'tablet:w-310 tablet:h-64 tablet:cursor-pointer'
                    ),
                    onClick: onButtonClick,
                    children: buttonText,
                  }
                ),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = StatusNotice;
      StatusNotice.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'StatusNotice',
        props: {
          icon: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/icons/book.svg'", computed: !1 },
          },
          title: { required: !0, tsType: { name: 'string' }, description: '' },
          description: { required: !0, tsType: { name: 'string' }, description: '' },
          buttonText: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onButtonClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          hideButton: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/features/purchase/template/MyPurchaseRequestListTem/MyPurchaseRequestListTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Empty: () => Empty,
          Interactive: () => Interactive,
          Urgent: () => Urgent,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => MyPurchaseRequestListTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        PaginationBlock = __webpack_require__(
          './src/components/molecules/PaginationBlock/PaginationBlock.tsx'
        ),
        DropDown = __webpack_require__('./src/components/atoms/DropDown/DropDown.tsx'),
        Divider = __webpack_require__('./src/components/atoms/Divider/Divider.tsx'),
        constants = __webpack_require__('./src/features/purchase/constants/index.ts');
      const MyPurchaseRequestListHeader = ({
        sortState,
        filterState,
        showDivider = !0,
        isTablet = !1,
      }) =>
        (0, jsx_runtime.jsxs)('div', {
          className: (0, clsx.A)('w-full', isTablet && 'tablet:px-24'),
          children: [
            (0, jsx_runtime.jsxs)('div', {
              className: (0, clsx.A)(
                'flex items-center justify-between w-full',
                'text-left text-gray-700',
                constants.Lh.MEDIUM,
                'font-bold',
                constants._u.CELL_Y
              ),
              children: [
                (0, jsx_runtime.jsx)('p', { children: constants.WY.TITLE }),
                (0, jsx_runtime.jsxs)('div', {
                  className: (0, clsx.A)('flex items-center', constants.mO.GAP_MEDIUM),
                  children: [
                    filterState?.statusOptions &&
                      (0, jsx_runtime.jsx)('div', {
                        className: 'relative z-dropdown',
                        children: (0, jsx_runtime.jsx)(DropDown.A, {
                          items: filterState.statusOptions,
                          placeholder: '전체',
                          selected: filterState.selectedStatusOption,
                          onSelect: (option) => {
                            filterState.onStatusChange?.(option);
                          },
                        }),
                      }),
                    sortState?.sortOptions &&
                      (0, jsx_runtime.jsx)('div', {
                        className: 'relative z-dropdown',
                        children: (0, jsx_runtime.jsx)(DropDown.A, {
                          items: sortState.sortOptions,
                          placeholder: constants.WY.SORT_PLACEHOLDER,
                          selected: sortState.selectedSortOption,
                          onSelect: (option) => {
                            sortState.onSortChange?.(option);
                          },
                        }),
                      }),
                  ],
                }),
              ],
            }),
            showDivider &&
              (0, jsx_runtime.jsx)(Divider.c, { variant: 'thin', className: 'w-full' }),
          ],
        });
      MyPurchaseRequestListHeader.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'MyPurchaseRequestListHeader',
        props: {
          sortState: { required: !1, tsType: { name: 'MyPurchaseSortState' }, description: '' },
          filterState: { required: !1, tsType: { name: 'MyPurchaseFilterState' }, description: '' },
          showDivider: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'true', computed: !1 },
          },
          isTablet: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
      var StatusTag = __webpack_require__('./src/components/atoms/StatusTag/StatusTag.tsx'),
        PriceText = __webpack_require__('./src/components/atoms/PriceText/PriceText.tsx'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        ListSkeletonUI = __webpack_require__(
          './src/components/molecules/ListSkeletonUI/ListSkeletonUI.tsx'
        ),
        StatusNotice = __webpack_require__(
          './src/components/molecules/StatusNotice/StatusNotice.tsx'
        ),
        PurchaseRequestItemListOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg.tsx'
        ),
        purchase_utils = __webpack_require__('./src/features/purchase/utils/purchase.utils.ts'),
        usePurchaseNavigationDirect = __webpack_require__(
          './src/features/purchase/hooks/usePurchaseNavigationDirect.ts'
        );
      const TABLE_CELL_BASE_STYLES = {
          header: constants.q2.CELL_BASE.HEADER,
          cell: constants.q2.CELL_BASE.CELL,
        },
        COLUMN_WIDTHS = {
          date: constants.q2.COLUMN_WIDTHS.DATE,
          product: constants.q2.COLUMN_WIDTHS.PRODUCT,
          price: constants.q2.COLUMN_WIDTHS.PRICE,
          status: constants.q2.COLUMN_WIDTHS.STATUS,
          actions: constants.q2.COLUMN_WIDTHS.ACTIONS,
        },
        TableHeaderCell = ({ children, widthClass }) =>
          (0, jsx_runtime.jsx)('div', {
            className: (0, clsx.A)(TABLE_CELL_BASE_STYLES.header, widthClass),
            children,
          }),
        TableColumnHeaders = () =>
          (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)(
              'flex items-center w-full justify-between',
              constants.jV.TABLE_HEADER,
              'tablet:border-b tablet:border-gray-200 desktop:border-b desktop:border-gray-200'
            ),
            children: [
              (0, jsx_runtime.jsx)(TableHeaderCell, {
                widthClass: COLUMN_WIDTHS.date,
                children: constants.WY.TABLE_HEADERS.DATE,
              }),
              (0, jsx_runtime.jsx)(TableHeaderCell, {
                widthClass: COLUMN_WIDTHS.product,
                children: constants.WY.TABLE_HEADERS.PRODUCT,
              }),
              (0, jsx_runtime.jsx)(TableHeaderCell, {
                widthClass: COLUMN_WIDTHS.price,
                children: constants.WY.TABLE_HEADERS.PRICE,
              }),
              (0, jsx_runtime.jsx)(TableHeaderCell, {
                widthClass: COLUMN_WIDTHS.status,
                children: constants.WY.TABLE_HEADERS.STATUS,
              }),
              (0, jsx_runtime.jsx)(TableHeaderCell, {
                widthClass: COLUMN_WIDTHS.actions,
                children: constants.WY.TABLE_HEADERS.ACTIONS,
              }),
            ],
          }),
        PurchaseRequestTableRow = ({ item, onCancelClick, onRowClick }) => {
          const isPending = 'PENDING' === item.status,
            isUrgent = !0 === item.urgent,
            totalPrice = (0, purchase_utils.mE)(item),
            navigation = (0, usePurchaseNavigationDirect.u)();
          return (0, jsx_runtime.jsxs)('div', {
            role: 'button',
            tabIndex: 0,
            className: (0, clsx.A)(
              'flex items-center w-full justify-between',
              'cursor-pointer hover:bg-gray-50',
              'tablet:border-b tablet:border-gray-200 desktop:border-b desktop:border-gray-200',
              constants.jV.TABLE_ROW,
              isUrgent && 'bg-red-100'
            ),
            onClick: (e) => {
              e.target.closest('button') ||
                (onRowClick
                  ? onRowClick(item.id)
                  : navigation.goToMyPurchaseRequestDetail(item.id));
            },
            onKeyDown: (e) => {
              ('Enter' !== e.key && ' ' !== e.key) ||
                (e.preventDefault(),
                e.stopPropagation(),
                onRowClick ? onRowClick(item.id) : navigation.goToMyPurchaseRequestDetail(item.id));
            },
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  TABLE_CELL_BASE_STYLES.cell,
                  COLUMN_WIDTHS.date,
                  'text-gray-700 text-14 font-bold'
                ),
                children: (0, purchase_utils.Yq)(item.createdAt),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  TABLE_CELL_BASE_STYLES.cell,
                  COLUMN_WIDTHS.product,
                  'text-gray-700 text-14 min-w-0 line-clamp-2 wrap-break-word',
                  'cursor-pointer hover:underline hover:text-primary-500'
                ),
                children: (0, purchase_utils.hy)(item.purchaseItems),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.price),
                children: (0, jsx_runtime.jsx)(PriceText.A, {
                  value: totalPrice,
                  showUnit: !0,
                  className: 'text-gray-700 text-14 font-normal',
                }),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.status),
                children: (0, jsx_runtime.jsx)(StatusTag.A, {
                  variant: (0, purchase_utils.AT)(item.status),
                }),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.actions),
                children:
                  isPending &&
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'secondary',
                    onClick: (e) => {
                      (e.stopPropagation(), onCancelClick && onCancelClick(item.id));
                    },
                    className: 'w-126 h-40 text-12',
                    children: constants.WY.BUTTONS.CANCEL,
                  }),
              }),
            ],
          });
        },
        MyPurchaseRequestTable = ({
          purchaseList,
          companyId,
          isLoading = !1,
          cancelModalHandlers,
          navigationHandlers,
        }) => {
          const isEmpty = !purchaseList || 0 === purchaseList.length,
            shouldShowTableHeader = isLoading || !isEmpty,
            renderEmptyState = (isMobile = !1) =>
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  'w-full flex justify-center',
                  isMobile ? 'items-center min-h-[calc(100vh-80px)]' : 'mt-200'
                ),
                children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                  title: constants.tO.USER_NO_REQUESTS.TITLE,
                  description: constants.tO.USER_NO_REQUESTS.DESCRIPTION,
                  buttonText: constants.WY.BUTTONS.NAVIGATE_TO_PRODUCTS,
                  onButtonClick: navigationHandlers?.onNavigateToProducts,
                }),
              });
          return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'tablet:hidden',
                children: isLoading
                  ? (0, jsx_runtime.jsx)(ListSkeletonUI.A, { rows: constants.B4.SKELETON_ROWS })
                  : isEmpty
                    ? renderEmptyState(!0)
                    : (0, jsx_runtime.jsx)(PurchaseRequestItemListOrg.A, {
                        purchaseList,
                        onCancel: cancelModalHandlers?.onCancelClick,
                        companyId,
                      }),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: 'hidden tablet:block overflow-x-auto',
                children: (0, jsx_runtime.jsxs)('div', {
                  className: 'w-full',
                  children: [
                    shouldShowTableHeader && (0, jsx_runtime.jsx)(TableColumnHeaders, {}),
                    isLoading
                      ? (0, jsx_runtime.jsx)(ListSkeletonUI.A, { rows: constants.B4.SKELETON_ROWS })
                      : isEmpty
                        ? renderEmptyState(!1)
                        : (0, jsx_runtime.jsx)('div', {
                            className: 'w-full',
                            children: purchaseList.map((item) =>
                              (0, jsx_runtime.jsx)(
                                PurchaseRequestTableRow,
                                { item, onCancelClick: cancelModalHandlers?.onCancelClick },
                                item.id
                              )
                            ),
                          }),
                  ],
                }),
              }),
            ],
          });
        };
      MyPurchaseRequestTable.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'MyPurchaseRequestTable',
        props: {
          purchaseList: {
            required: !1,
            tsType: {
              name: 'Array',
              elements: [{ name: 'PurchaseRequestItem' }],
              raw: 'PurchaseRequestItem[]',
            },
            description: '',
          },
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
          isLoading: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          cancelModalHandlers: {
            required: !1,
            tsType: { name: 'MyPurchaseCancelModalHandlers' },
            description: '',
          },
          navigationHandlers: {
            required: !1,
            tsType: { name: 'MyPurchaseNavigationHandlers' },
            description: '',
          },
        },
      };
      var CustomModal = __webpack_require__(
        './src/components/molecules/CustomModal/CustomModal.tsx'
      );
      const MyPurchaseCancelModal = ({ cancelModalState, cancelModalHandlers }) =>
        cancelModalState?.cancelModalOpen &&
        cancelModalState?.cancelTargetItem &&
        cancelModalHandlers?.onCancelModalClose
          ? (0, jsx_runtime.jsx)(CustomModal.A, {
              open: cancelModalState.cancelModalOpen,
              type: 'cancel',
              productName: cancelModalState.cancelTargetItem.purchaseItems[0]?.products.name,
              cancelCount: Math.max(0, cancelModalState.cancelTargetItem.purchaseItems.length - 1),
              onClose: cancelModalHandlers.onCancelModalClose,
              onConfirm: cancelModalHandlers.onCancelConfirm,
            })
          : null;
      MyPurchaseCancelModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'MyPurchaseCancelModal',
        props: {
          cancelModalState: {
            required: !1,
            tsType: { name: 'MyPurchaseCancelModalState' },
            description: '',
          },
          cancelModalHandlers: {
            required: !1,
            tsType: { name: 'MyPurchaseCancelModalHandlers' },
            description: '',
          },
        },
      };
      const MyPurchaseRequestListTem = ({
          purchaseList,
          companyId,
          className,
          isLoading = !1,
          cancelModalState,
          cancelModalHandlers,
          paginationState,
          sortState,
          filterState,
          navigationHandlers,
        }) => {
          const currentPage = paginationState?.currentPage,
            totalPages = paginationState?.totalPages;
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)(
              'w-full',
              'mt-30',
              'tablet:mt-20',
              'desktop:max-w-1400',
              'desktop:mx-auto',
              'desktop:mt-80',
              className
            ),
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'hidden tablet:block',
                children: (0, jsx_runtime.jsx)(MyPurchaseRequestListHeader, {
                  sortState,
                  filterState,
                  isTablet: !0,
                }),
              }),
              (0, jsx_runtime.jsx)(MyPurchaseRequestTable, {
                purchaseList,
                companyId,
                isLoading,
                cancelModalHandlers,
                navigationHandlers,
              }),
              void 0 !== currentPage &&
                void 0 !== totalPages &&
                totalPages > 0 &&
                paginationState?.onPageChange &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'flex justify-start mt-20',
                  children: (0, jsx_runtime.jsx)(PaginationBlock.A, {
                    current: currentPage,
                    total: totalPages,
                    onPrev: paginationState.onPageChange,
                    onNext: paginationState.onPageChange,
                  }),
                }),
              (0, jsx_runtime.jsx)(MyPurchaseCancelModal, {
                cancelModalState,
                cancelModalHandlers,
              }),
            ],
          });
        },
        MyPurchaseRequestListTem_MyPurchaseRequestListTem = MyPurchaseRequestListTem;
      MyPurchaseRequestListTem.__docgenInfo = {
        description: '개선된 내 구매 요청 목록 Template - 깔끔하고 단순한 조립 레이어',
        methods: [],
        displayName: 'MyPurchaseRequestListTem',
        props: {
          purchaseList: {
            required: !1,
            tsType: {
              name: 'Array',
              elements: [{ name: 'PurchaseRequestItem' }],
              raw: 'PurchaseRequestItem[]',
            },
            description: '',
          },
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          isLoading: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          cancelModalState: {
            required: !1,
            tsType: { name: 'MyPurchaseCancelModalState' },
            description: '',
          },
          cancelModalHandlers: {
            required: !1,
            tsType: { name: 'MyPurchaseCancelModalHandlers' },
            description: '',
          },
          paginationState: {
            required: !1,
            tsType: { name: 'MyPurchasePaginationState' },
            description: '',
          },
          sortState: { required: !1, tsType: { name: 'MyPurchaseSortState' }, description: '' },
          filterState: { required: !1, tsType: { name: 'MyPurchaseFilterState' }, description: '' },
          navigationHandlers: {
            required: !1,
            tsType: { name: 'MyPurchaseNavigationHandlers' },
            description: '',
          },
        },
      };
      const MyPurchaseRequestListTem_stories = {
          title: 'Features/Purchase/Template/MyPurchaseRequestListTem',
          component: MyPurchaseRequestListTem_MyPurchaseRequestListTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            nextjs: {
              appDirectory: !0,
              navigation: { pathname: '/company-123/my/purchase-requests' },
            },
            docs: {
              description: {
                component:
                  '구매 요청 목록을 표시하는 템플릿 컴포넌트입니다. 모바일에서는 PurchaseRequestItemListOrg를 재사용하고, 태블릿/데스크탑에서는 테이블 형태로 표시합니다. 페이지네이션을 지원합니다.',
              },
            },
          },
        },
        sortOptions = [
          { key: 'LATEST', label: '최신순' },
          { key: 'PRICE_LOW', label: '낮은 가격순' },
          { key: 'PRICE_HIGH', label: '높은 가격순' },
        ],
        defaultSelectedSortOption = sortOptions.find((opt) => 'LATEST' === opt.key),
        statusOptions = [
          { key: 'ALL', label: '전체' },
          { key: 'PENDING', label: '대기중' },
          { key: 'APPROVED', label: '승인됨' },
          { key: 'REJECTED', label: '반려됨' },
          { key: 'CANCELLED', label: '취소됨' },
        ],
        defaultSelectedStatusOption = statusOptions.find((opt) => 'ALL' === opt.key),
        createPurchaseItem = (
          id,
          status,
          itemCount = 1,
          totalPrice = 1900,
          shippingFee = 0,
          createdAt = '2024-07-04T00:00:00.000Z',
          urgent = !1
        ) => ({
          id,
          createdAt,
          updatedAt: createdAt,
          itemsTotalPrice: totalPrice,
          shippingFee,
          finalTotalPrice: totalPrice + shippingFee,
          totalPrice,
          status,
          purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
            id: `item-${index}`,
            quantity: 1,
            priceSnapshot: totalPrice / itemCount,
            itemTotal: totalPrice / itemCount,
            products: { id: index + 1, name: 0 === index ? '코카콜라 제로' : `상품 ${index + 1}` },
          })),
          requester: { id: 'requester-1', name: '홍길동', email: 'hong@example.com' },
          urgent,
          reason: '',
        }),
        Default = {
          render: () =>
            (0, jsx_runtime.jsx)(MyPurchaseRequestListTem_MyPurchaseRequestListTem, {
              purchaseList: [
                createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
                createPurchaseItem('2', 'PENDING', 1, 3e3, 0, '2024-07-03T00:00:00.000Z'),
                createPurchaseItem('3', 'REJECTED', 3, 5e3, 0, '2024-07-02T00:00:00.000Z'),
              ],
              companyId: 'company-123',
              cancelModalState: { cancelModalOpen: !1, cancelTargetItem: null },
              cancelModalHandlers: {
                onCancelClick: () => {},
                onCancelModalClose: () => {},
                onCancelConfirm: () => {},
              },
              paginationState: { currentPage: 1, totalPages: 3, onPageChange: () => {} },
              sortState: {
                sortOptions,
                selectedSortOption: defaultSelectedSortOption,
                onSortChange: () => {},
              },
              filterState: {
                statusOptions,
                selectedStatusOption: defaultSelectedStatusOption,
                onStatusChange: () => {},
              },
              navigationHandlers: { onNavigateToProducts: () => {} },
            }),
        },
        Empty = {
          render: () =>
            (0, jsx_runtime.jsx)(MyPurchaseRequestListTem_MyPurchaseRequestListTem, {
              purchaseList: [],
              companyId: 'company-123',
              paginationState: { currentPage: 1, totalPages: 0, onPageChange: () => {} },
              sortState: {
                sortOptions,
                selectedSortOption: defaultSelectedSortOption,
                onSortChange: () => {},
              },
              filterState: {
                statusOptions,
                selectedStatusOption: defaultSelectedStatusOption,
                onStatusChange: () => {},
              },
              navigationHandlers: { onNavigateToProducts: () => {} },
            }),
        },
        Urgent = {
          render: () =>
            (0, jsx_runtime.jsx)(MyPurchaseRequestListTem_MyPurchaseRequestListTem, {
              purchaseList: [
                createPurchaseItem('1', 'PENDING', 1, 5e3, 0, '2024-07-04T00:00:00.000Z', !0),
                createPurchaseItem('2', 'APPROVED', 2, 3e3, 0, '2024-07-03T00:00:00.000Z'),
                createPurchaseItem('3', 'PENDING', 1, 8e3, 0, '2024-07-02T00:00:00.000Z', !0),
              ],
              companyId: 'company-123',
              cancelModalState: { cancelModalOpen: !1, cancelTargetItem: null },
              cancelModalHandlers: {
                onCancelClick: () => {},
                onCancelModalClose: () => {},
                onCancelConfirm: () => {},
              },
              paginationState: { currentPage: 1, totalPages: 1, onPageChange: () => {} },
              sortState: {
                sortOptions,
                selectedSortOption: defaultSelectedSortOption,
                onSortChange: () => {},
              },
              filterState: {
                statusOptions,
                selectedStatusOption: defaultSelectedStatusOption,
                onStatusChange: () => {},
              },
              navigationHandlers: { onNavigateToProducts: () => {} },
            }),
        },
        Interactive = {
          render: () => {
            const [cancelModalOpen, setCancelModalOpen] = (0, react.useState)(!1),
              [cancelTargetItem, setCancelTargetItem] = (0, react.useState)(null),
              purchaseList = [
                createPurchaseItem('1', 'PENDING', 1, 5e3, 0, '2024-07-04T00:00:00.000Z', !0),
                createPurchaseItem('2', 'APPROVED', 2, 3e3, 0, '2024-07-03T00:00:00.000Z'),
                createPurchaseItem('3', 'PENDING', 1, 8e3, 0, '2024-07-02T00:00:00.000Z'),
              ];
            return (0, jsx_runtime.jsx)(MyPurchaseRequestListTem_MyPurchaseRequestListTem, {
              purchaseList,
              companyId: 'company-123',
              cancelModalState: { cancelModalOpen, cancelTargetItem },
              cancelModalHandlers: {
                onCancelClick: (id) => {
                  const item = purchaseList.find((p) => p.id === id);
                  item && (setCancelTargetItem(item), setCancelModalOpen(!0));
                },
                onCancelModalClose: () => {
                  (setCancelModalOpen(!1), setCancelTargetItem(null));
                },
                onCancelConfirm: () => {
                  (setCancelModalOpen(!1), setCancelTargetItem(null));
                },
              },
              paginationState: { currentPage: 1, totalPages: 1, onPageChange: () => {} },
              sortState: {
                sortOptions,
                selectedSortOption: defaultSelectedSortOption,
                onSortChange: () => {},
              },
              filterState: {
                statusOptions,
                selectedStatusOption: defaultSelectedStatusOption,
                onStatusChange: () => {},
              },
              navigationHandlers: { onNavigateToProducts: () => {} },
            });
          },
        },
        __namedExportsOrder = ['Default', 'Empty', 'Urgent', 'Interactive'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: () => <MyPurchaseRequestListTem purchaseList={[createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'), createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'), createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z')]} companyId=\"company-123\" cancelModalState={{\n    cancelModalOpen: false,\n    cancelTargetItem: null\n  }} cancelModalHandlers={{\n    onCancelClick: () => {},\n    onCancelModalClose: () => {},\n    onCancelConfirm: () => {}\n  }} paginationState={{\n    currentPage: 1,\n    totalPages: 3,\n    onPageChange: () => {}\n  }} sortState={{\n    sortOptions,\n    selectedSortOption: defaultSelectedSortOption,\n    onSortChange: () => {}\n  }} filterState={{\n    statusOptions,\n    selectedStatusOption: defaultSelectedStatusOption,\n    onStatusChange: () => {}\n  }} navigationHandlers={{\n    onNavigateToProducts: () => {}\n  }} />\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (Empty.parameters = {
          ...Empty.parameters,
          docs: {
            ...Empty.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <MyPurchaseRequestListTem purchaseList={[]} companyId="company-123" paginationState={{\n    currentPage: 1,\n    totalPages: 0,\n    onPageChange: () => {}\n  }} sortState={{\n    sortOptions,\n    selectedSortOption: defaultSelectedSortOption,\n    onSortChange: () => {}\n  }} filterState={{\n    statusOptions,\n    selectedStatusOption: defaultSelectedStatusOption,\n    onStatusChange: () => {}\n  }} navigationHandlers={{\n    onNavigateToProducts: () => {}\n  }} />\n}',
              ...Empty.parameters?.docs?.source,
            },
          },
        }),
        (Urgent.parameters = {
          ...Urgent.parameters,
          docs: {
            ...Urgent.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: () => <MyPurchaseRequestListTem purchaseList={[createPurchaseItem('1', 'PENDING', 1, 5000, 0, '2024-07-04T00:00:00.000Z', true), createPurchaseItem('2', 'APPROVED', 2, 3000, 0, '2024-07-03T00:00:00.000Z'), createPurchaseItem('3', 'PENDING', 1, 8000, 0, '2024-07-02T00:00:00.000Z', true)]} companyId=\"company-123\" cancelModalState={{\n    cancelModalOpen: false,\n    cancelTargetItem: null\n  }} cancelModalHandlers={{\n    onCancelClick: () => {},\n    onCancelModalClose: () => {},\n    onCancelConfirm: () => {}\n  }} paginationState={{\n    currentPage: 1,\n    totalPages: 1,\n    onPageChange: () => {}\n  }} sortState={{\n    sortOptions,\n    selectedSortOption: defaultSelectedSortOption,\n    onSortChange: () => {}\n  }} filterState={{\n    statusOptions,\n    selectedStatusOption: defaultSelectedStatusOption,\n    onStatusChange: () => {}\n  }} navigationHandlers={{\n    onNavigateToProducts: () => {}\n  }} />\n}",
              ...Urgent.parameters?.docs?.source,
            },
          },
        }),
        (Interactive.parameters = {
          ...Interactive.parameters,
          docs: {
            ...Interactive.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: () => {\n    // eslint-disable-next-line react-hooks/rules-of-hooks\n    const [cancelModalOpen, setCancelModalOpen] = useState(false);\n    // eslint-disable-next-line react-hooks/rules-of-hooks\n    const [cancelTargetItem, setCancelTargetItem] = useState<PurchaseRequestItem | null>(null);\n    const purchaseList = [createPurchaseItem('1', 'PENDING', 1, 5000, 0, '2024-07-04T00:00:00.000Z', true), createPurchaseItem('2', 'APPROVED', 2, 3000, 0, '2024-07-03T00:00:00.000Z'), createPurchaseItem('3', 'PENDING', 1, 8000, 0, '2024-07-02T00:00:00.000Z')];\n    return <MyPurchaseRequestListTem purchaseList={purchaseList} companyId=\"company-123\" cancelModalState={{\n      cancelModalOpen,\n      cancelTargetItem\n    }} cancelModalHandlers={{\n      onCancelClick: (id: string) => {\n        const item = purchaseList.find(p => p.id === id);\n        if (item) {\n          setCancelTargetItem(item);\n          setCancelModalOpen(true);\n        }\n      },\n      onCancelModalClose: () => {\n        setCancelModalOpen(false);\n        setCancelTargetItem(null);\n      },\n      onCancelConfirm: () => {\n        setCancelModalOpen(false);\n        setCancelTargetItem(null);\n      }\n    }} paginationState={{\n      currentPage: 1,\n      totalPages: 1,\n      onPageChange: () => {}\n    }} sortState={{\n      sortOptions,\n      selectedSortOption: defaultSelectedSortOption,\n      onSortChange: () => {}\n    }} filterState={{\n      statusOptions,\n      selectedStatusOption: defaultSelectedStatusOption,\n      onStatusChange: () => {}\n    }} navigationHandlers={{\n      onNavigateToProducts: () => {}\n    }} />;\n  }\n}",
              ...Interactive.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
