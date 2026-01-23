'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3395],
  {
    './src/components/atoms/Button/Button.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => __WEBPACK_DEFAULT_EXPORT__,
        X: () => SignupButton,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const baseClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'inline-flex items-center justify-center',
          'font-bold',
          'cursor-pointer',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-500',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        ),
        variantClass = {
          primary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-gray-950 text-gray-50',
            'hover:bg-gray-800',
            'rounded-default'
          ),
          secondary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-white text-gray-900',
            'border border-gray-900',
            'hover:bg-gray-25',
            'rounded-default'
          ),
          signup: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-black text-white',
            'hover:bg-gray-700'
          ),
        },
        inactiveClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'bg-gray-100 text-gray-300 border border-gray-200',
          'cursor-not-allowed',
          'rounded-default'
        ),
        sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-40 text-13 px-16'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-44 text-14 px-20'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-64 text-16 px-24'),
        },
        Button = ({
          variant = 'primary',
          size = 'md',
          fullWidth = !1,
          inactive,
          rightIcon,
          children,
          className,
          type = 'button',
          ...rest
        }) => {
          const isSignup = 'signup' === variant;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
            type,
            disabled: inactive,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              baseClass,
              inactive ? inactiveClass : variantClass[variant],
              !isSignup && size && sizeClass[size],
              isSignup && 'w-160 h-44 text-14 px-20 rounded-100',
              fullWidth && 'w-full',
              className
            ),
            ...rest,
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', { children }),
              rightIcon,
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = Button,
        SignupButton = ({
          inactive,
          rightIcon,
          children,
          className,
          onClick,
          onFocus,
          onBlur,
          id,
          type = 'button',
          'aria-label': ariaLabel,
          fullWidth,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
            type,
            variant: 'signup',
            inactive,
            rightIcon,
            fullWidth,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('gap-4', className),
            onClick,
            onFocus,
            onBlur,
            id,
            'aria-label': ariaLabel,
            children,
          });
      ((Button.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Button',
        props: {
          type: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'button' | 'submit' | 'reset'",
              elements: [
                { name: 'literal', value: "'button'" },
                { name: 'literal', value: "'submit'" },
                { name: 'literal', value: "'reset'" },
              ],
            },
            description: '',
            defaultValue: { value: "'button'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'primary' | 'secondary' | 'signup'",
              elements: [
                { name: 'literal', value: "'primary'" },
                { name: 'literal', value: "'secondary'" },
                { name: 'literal', value: "'signup'" },
              ],
            },
            description: '',
            defaultValue: { value: "'primary'", computed: !1 },
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
          fullWidth: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          inactive: { required: !1, tsType: { name: 'boolean' }, description: '' },
          rightIcon: { required: !1, tsType: { name: 'ReactNode' }, description: '' },
        },
        composes: ['Omit'],
      }),
        (SignupButton.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'SignupButton',
          props: { type: { defaultValue: { value: "'button'", computed: !1 }, required: !1 } },
        }));
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
    './src/features/purchase/template/PurchaseRequestListTem/PurchaseRequestListTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          EmptyList: () => EmptyList,
          Interactive: () => Interactive,
          WithPagination: () => WithPagination,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => PurchaseRequestListTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        PriceText = __webpack_require__('./src/components/atoms/PriceText/PriceText.tsx'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        Divider = __webpack_require__('./src/components/atoms/Divider/Divider.tsx'),
        PurchaseRequestItemListOrg = __webpack_require__(
          './src/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg.tsx'
        ),
        DropDown = __webpack_require__('./src/components/atoms/DropDown/DropDown.tsx'),
        PaginationBlock = __webpack_require__(
          './src/components/molecules/PaginationBlock/PaginationBlock.tsx'
        ),
        StatusNotice = __webpack_require__(
          './src/components/molecules/StatusNotice/StatusNotice.tsx'
        ),
        UserProfile = __webpack_require__('./src/components/molecules/UserProfile/UserProfile.tsx'),
        ApprovalRequestModal = __webpack_require__(
          './src/components/molecules/ApprovalRequestModal/ApprovalRequestModal.tsx'
        ),
        ListSkeletonUI = __webpack_require__(
          './src/components/molecules/ListSkeletonUI/ListSkeletonUI.tsx'
        ),
        purchase_utils = __webpack_require__('./src/features/purchase/utils/purchase.utils.ts'),
        usePurchaseNavigationDirect = __webpack_require__(
          './src/features/purchase/hooks/usePurchaseNavigationDirect.ts'
        ),
        constants = __webpack_require__('./src/features/purchase/constants/index.ts');
      const TABLE_CELL_BASE_STYLES = {
          header: constants.q2.CELL_BASE.HEADER,
          cell: constants.q2.CELL_BASE.CELL,
        },
        COLUMN_WIDTHS = {
          date: constants.q2.COLUMN_WIDTHS.DATE,
          product: constants.q2.COLUMN_WIDTHS.PRODUCT,
          price: constants.q2.COLUMN_WIDTHS.PRICE,
          requester: constants.q2.COLUMN_WIDTHS.REQUESTER,
          actions: constants.q2.COLUMN_WIDTHS.ACTIONS,
        };
      const TableHeaderCell = ({ children, widthClass }) =>
          (0, jsx_runtime.jsx)('div', {
            className: (0, clsx.A)(TABLE_CELL_BASE_STYLES.header, widthClass),
            children,
          }),
        PurchaseRequestTableRowDesktop = ({
          item,
          companyId,
          onRejectClick,
          onApproveClick,
          onRowClick,
        }) => {
          const isUrgent = !0 === item.urgent,
            totalPrice = (item.itemsTotalPrice ?? item.totalPrice ?? 0) + item.shippingFee,
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
              (e.stopPropagation(),
                onRowClick ? onRowClick(item.id) : navigation.goToPurchaseRequestDetail(item.id));
            },
            onKeyDown: (e) => {
              ('Enter' !== e.key && ' ' !== e.key) ||
                (e.preventDefault(), e.stopPropagation(), onRowClick?.(item.id));
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
                  'text-gray-700 text-14 min-w-0 line-clamp-2 wrap-break-word'
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
                className: (0, clsx.A)(TABLE_CELL_BASE_STYLES.cell, COLUMN_WIDTHS.requester),
                children: (0, jsx_runtime.jsx)(UserProfile.Ay, {
                  name: item.requester.name,
                  company: { name: item.requester.company || '' },
                  profileHref: `/${companyId}/my/profile`,
                  variant: 'nameOnly',
                }),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  TABLE_CELL_BASE_STYLES.cell,
                  COLUMN_WIDTHS.actions,
                  constants.mO.GAP_SMALL,
                  'flex'
                ),
                children:
                  onRejectClick &&
                  onApproveClick &&
                  (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                      (0, jsx_runtime.jsx)(Button.A, {
                        variant: 'secondary',
                        size: 'sm',
                        onClick: (e) => {
                          (e.stopPropagation(), onRejectClick?.(item.id));
                        },
                        className: constants.GD.ACTION_BUTTON,
                        children: constants.WY.BUTTONS.REJECT,
                      }),
                      (0, jsx_runtime.jsx)(Button.A, {
                        variant: 'primary',
                        size: 'sm',
                        onClick: (e) => {
                          (e.stopPropagation(), onApproveClick?.(item.id));
                        },
                        className: constants.GD.ACTION_BUTTON,
                        children: constants.WY.BUTTONS.APPROVE,
                      }),
                    ],
                  }),
              }),
            ],
          });
        },
        PurchaseRequestListTem = (props) => {
          const {
              purchaseList,
              companyId,
              className,
              onRejectClick,
              onApproveClick,
              onRowClick,
              onNavigateToProducts,
              selectedRequestId,
              selectedRequestDetail,
              isModalDetailLoading,
              approveModalOpen,
              rejectModalOpen,
              onApproveModalClose,
              onRejectModalClose,
              onApproveSubmit,
              onRejectSubmit,
              budget,
              currentPage,
              totalPages,
              onPageChange,
              sortOptions,
              selectedSortOption,
              onSortChange,
              isLoading,
            } = (function isGroupedProps(props) {
              return 'tableState' in props && 'sortState' in props && 'modalState' in props;
            })(props)
              ? {
                  purchaseList: props.tableState.purchaseList,
                  companyId: props.tableState.companyId,
                  className: props.className,
                  onRejectClick: props.rowHandlers.onRejectClick,
                  onApproveClick: props.rowHandlers.onApproveClick,
                  onRowClick: props.rowHandlers.onRowClick,
                  onNavigateToProducts: props.paginationHandlers.onNavigateToProducts,
                  selectedRequestId: props.modalState.selectedRequestId,
                  selectedRequestDetail: props.modalState.selectedRequestDetail,
                  isModalDetailLoading: props.modalState.isModalDetailLoading,
                  approveModalOpen: props.modalState.approveModalOpen,
                  rejectModalOpen: props.modalState.rejectModalOpen,
                  onApproveModalClose: props.modalHandlers.onApproveModalClose,
                  onRejectModalClose: props.modalHandlers.onRejectModalClose,
                  onApproveSubmit: props.modalHandlers.onApproveSubmit,
                  onRejectSubmit: props.modalHandlers.onRejectSubmit,
                  budget: props.modalState.budget,
                  currentPage: props.tableState.currentPage,
                  totalPages: props.tableState.totalPages,
                  onPageChange: props.paginationHandlers.onPageChange,
                  sortOptions: props.sortState.sortOptions,
                  selectedSortOption: props.sortState.selectedSortOption,
                  onSortChange: props.sortState.onSortChange,
                  isLoading: props.tableState.isLoading,
                }
              : {
                  ...props,
                  isModalDetailLoading: props.isModalDetailLoading ?? !1,
                  approveModalOpen: props.approveModalOpen ?? !1,
                  rejectModalOpen: props.rejectModalOpen ?? !1,
                  budget: props.budget ?? constants.B4.BUDGET,
                  currentPage: props.currentPage ?? 1,
                  isLoading: props.isLoading ?? !1,
                },
            finalTotalPages = totalPages ?? 1,
            selectedRequest =
              selectedRequestDetail ||
              (selectedRequestId
                ? purchaseList.find((item) => item.id === selectedRequestId)
                : null),
            modalData = (0, react.useMemo)(
              () =>
                selectedRequest
                  ? {
                      user: {
                        name: selectedRequest.requester.name,
                        company: {
                          name:
                            'company' in selectedRequest.requester &&
                            selectedRequest.requester.company &&
                            'string' == typeof selectedRequest.requester.company
                              ? selectedRequest.requester.company
                              : '',
                        },
                        avatarSrc:
                          'avatarSrc' in selectedRequest.requester &&
                          selectedRequest.requester.avatarSrc &&
                          'string' == typeof selectedRequest.requester.avatarSrc
                            ? selectedRequest.requester.avatarSrc
                            : void 0,
                      },
                      items: selectedRequest.purchaseItems.map((item, index) => {
                        const imageSrc = item.products.imageUrl ? item.products.imageUrl : '';
                        return {
                          id: index,
                          title: item.products.name,
                          price: item.priceSnapshot,
                          quantity: item.quantity,
                          imageSrc,
                        };
                      }),
                      deliveryFee: selectedRequest.shippingFee,
                      budget,
                    }
                  : null,
              [selectedRequest, budget]
            ),
            isEmpty = 0 === purchaseList.length,
            shouldShowTableHeader = isLoading || !isEmpty;
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('w-full', className),
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'tablet:hidden',
                children: isLoading
                  ? (0, jsx_runtime.jsx)(ListSkeletonUI.A, { rows: constants.B4.SKELETON_ROWS })
                  : isEmpty
                    ? (0, jsx_runtime.jsx)('div', {
                        className: (0, clsx.A)(
                          'w-full',
                          constants.qd.EMPTY_STATE_TOP,
                          'flex justify-center'
                        ),
                        children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                          title: constants.tO.USER_NO_REQUESTS.TITLE,
                          description: constants.tO.USER_NO_REQUESTS.DESCRIPTION,
                          buttonText: constants.WY.BUTTONS.NAVIGATE_TO_PRODUCTS,
                          onButtonClick: onNavigateToProducts,
                        }),
                      })
                    : (0, jsx_runtime.jsx)(PurchaseRequestItemListOrg.A, {
                        purchaseList,
                        onReject: onRejectClick,
                        onApprove: onApproveClick,
                        onRowClick,
                        companyId,
                      }),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: 'hidden tablet:block overflow-x-auto',
                children: (0, jsx_runtime.jsxs)('div', {
                  className: 'w-full',
                  children: [
                    (0, jsx_runtime.jsx)('div', {
                      className: 'hidden tablet:block desktop:hidden',
                      children: (0, jsx_runtime.jsxs)('div', {
                        className: 'w-full',
                        children: [
                          (0, jsx_runtime.jsxs)('div', {
                            className: (0, clsx.A)(
                              'flex items-center justify-between w-full text-left text-gray-700',
                              constants.Lh.MEDIUM,
                              'font-bold',
                              constants._u.CELL_Y
                            ),
                            children: [
                              (0, jsx_runtime.jsx)('p', { children: constants.WY.TITLE }),
                              (0, jsx_runtime.jsx)('div', {
                                className: (0, clsx.A)(
                                  'flex items-center',
                                  constants.mO.GAP_MEDIUM
                                ),
                                children:
                                  sortOptions &&
                                  (0, jsx_runtime.jsx)('div', {
                                    className: 'relative z-dropdown',
                                    children: (0, jsx_runtime.jsx)(DropDown.A, {
                                      items: sortOptions,
                                      placeholder: constants.WY.SORT_PLACEHOLDER,
                                      selected: selectedSortOption,
                                      onSelect: (option) => {
                                        onSortChange?.(option);
                                      },
                                    }),
                                  }),
                              }),
                            ],
                          }),
                          shouldShowTableHeader &&
                            (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                              children: [
                                (0, jsx_runtime.jsx)(Divider.c, {
                                  variant: 'thin',
                                  className: 'w-full',
                                }),
                                (0, jsx_runtime.jsxs)('div', {
                                  className: (0, clsx.A)(
                                    'flex items-center w-full justify-between',
                                    constants.jV.TABLE_HEADER,
                                    'tablet:border-b tablet:border-gray-200'
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
                                      widthClass: COLUMN_WIDTHS.requester,
                                      children: constants.WY.TABLE_HEADERS.REQUESTER,
                                    }),
                                    (0, jsx_runtime.jsx)(TableHeaderCell, {
                                      widthClass: COLUMN_WIDTHS.actions,
                                      children: constants.WY.TABLE_HEADERS.ACTIONS,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime.jsx)('div', {
                      className: 'hidden desktop:block',
                      children: (0, jsx_runtime.jsxs)('div', {
                        className: 'w-full',
                        children: [
                          (0, jsx_runtime.jsxs)('div', {
                            className: (0, clsx.A)(
                              'flex items-center justify-between w-full text-left text-gray-700',
                              constants.Lh.MEDIUM,
                              'font-bold',
                              constants._u.CELL_Y
                            ),
                            children: [
                              (0, jsx_runtime.jsx)('p', { children: constants.WY.TITLE }),
                              (0, jsx_runtime.jsx)('div', {
                                className: (0, clsx.A)(
                                  'flex items-center',
                                  constants.mO.GAP_MEDIUM
                                ),
                                children:
                                  sortOptions &&
                                  (0, jsx_runtime.jsx)('div', {
                                    className: 'relative z-dropdown',
                                    children: (0, jsx_runtime.jsx)(DropDown.A, {
                                      items: sortOptions,
                                      placeholder: constants.WY.SORT_PLACEHOLDER,
                                      selected: selectedSortOption,
                                      onSelect: (option) => {
                                        onSortChange?.(option);
                                      },
                                    }),
                                  }),
                              }),
                            ],
                          }),
                          shouldShowTableHeader &&
                            (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                              children: [
                                (0, jsx_runtime.jsx)(Divider.c, {
                                  variant: 'thin',
                                  className: 'w-full',
                                }),
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
                                      widthClass: COLUMN_WIDTHS.requester,
                                      children: constants.WY.TABLE_HEADERS.REQUESTER,
                                    }),
                                    (0, jsx_runtime.jsx)(TableHeaderCell, {
                                      widthClass: COLUMN_WIDTHS.actions,
                                      children: constants.WY.TABLE_HEADERS.ACTIONS,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                        ],
                      }),
                    }),
                    isLoading
                      ? (0, jsx_runtime.jsx)(ListSkeletonUI.A, { rows: constants.B4.SKELETON_ROWS })
                      : isEmpty
                        ? (0, jsx_runtime.jsx)('div', {
                            className: (0, clsx.A)(
                              'w-full',
                              constants.qd.EMPTY_STATE_TOP,
                              'flex justify-center'
                            ),
                            children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                              title: constants.tO.ADMIN_NO_REQUESTS.TITLE,
                              description: constants.tO.ADMIN_NO_REQUESTS.DESCRIPTION,
                              buttonText: constants.WY.BUTTONS.NAVIGATE_TO_PRODUCTS,
                              onButtonClick: onNavigateToProducts,
                            }),
                          })
                        : (0, jsx_runtime.jsx)('div', {
                            className: 'w-full',
                            children: purchaseList.map((item) =>
                              (0, jsx_runtime.jsx)(
                                PurchaseRequestTableRowDesktop,
                                { item, companyId, onRejectClick, onApproveClick, onRowClick },
                                item.id
                              )
                            ),
                          }),
                  ],
                }),
              }),
              !isEmpty &&
                !isLoading &&
                finalTotalPages > 0 &&
                onPageChange &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'flex justify-start mt-20',
                  children: (0, jsx_runtime.jsx)(PaginationBlock.A, {
                    current: currentPage,
                    total: finalTotalPages,
                    onPrev: onPageChange,
                    onNext: onPageChange,
                  }),
                }),
              modalData &&
                !isModalDetailLoading &&
                (0, jsx_runtime.jsx)(ApprovalRequestModal.A, {
                  open: approveModalOpen,
                  onClose: onApproveModalClose || (() => {}),
                  onSubmit: onApproveSubmit || (async () => {}),
                  user: modalData.user,
                  items: modalData.items,
                  deliveryFee: modalData.deliveryFee,
                  budget: modalData.budget,
                  action: 'approve',
                }),
              modalData &&
                !isModalDetailLoading &&
                (0, jsx_runtime.jsx)(ApprovalRequestModal.A, {
                  open: rejectModalOpen,
                  onClose: onRejectModalClose || (() => {}),
                  onSubmit: onRejectSubmit || (async () => {}),
                  user: modalData.user,
                  items: modalData.items,
                  deliveryFee: modalData.deliveryFee,
                  budget: modalData.budget,
                  action: 'reject',
                }),
            ],
          });
        },
        PurchaseRequestListTem_PurchaseRequestListTem = PurchaseRequestListTem;
      PurchaseRequestListTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseRequestListTem',
      };
      const PurchaseRequestListTem_stories = {
          title: 'Features/Purchase/Template/PurchaseRequestListTem',
          component: PurchaseRequestListTem_PurchaseRequestListTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            nextjs: {
              appDirectory: !0,
              navigation: {
                pathname: '/company-123/purchase-requests',
                params: { companyId: 'company-123' },
              },
            },
            docs: {
              description: {
                component:
                  '관리자용 구매 요청 목록 페이지 템플릿입니다. 구매 요청 목록, 정렬/필터링, 승인/반려 기능을 포함합니다.\n\n**주요 구성:**\n\n1. **모바일 뷰**: PurchaseRequestItemListOrg 사용\n2. **태블릿/데스크톱 뷰**: 테이블 형식 목록\n   - 구매 요청일, 상품 정보, 주문 금액, 요청인, 비고 (승인/반려 버튼)\n3. **정렬/필터링**: 드롭다운으로 최신순, 가격순, 상태별 필터\n4. **페이지네이션**: PaginationBlock\n5. **모달**: ApprovalRequestModal (승인/반려)',
              },
            },
          },
        },
        createPurchaseItem = (
          id,
          status,
          itemCount,
          totalPrice,
          shippingFee,
          createdAt,
          requesterName = '홍길동'
        ) => ({
          id,
          createdAt,
          updatedAt: createdAt,
          itemsTotalPrice: totalPrice,
          shippingFee,
          finalTotalPrice: totalPrice + shippingFee,
          totalPrice,
          status,
          purchaseItems: Array.from({ length: itemCount }, (_, i) => ({
            id: `item-${i + 1}`,
            quantity: i + 1,
            priceSnapshot: totalPrice / itemCount,
            itemTotal: (i + 1) * (totalPrice / itemCount),
            products: { id: i + 1, name: `상품 ${i + 1}`, image: '/images/zero-cola.svg' },
          })),
          requester: { id: 'requester-1', name: requesterName, email: 'hong@example.com' },
          reason: '',
        }),
        sortOptions = [
          { key: 'LATEST', label: '최신순' },
          { key: 'PRICE_LOW', label: '낮은 가격순' },
          { key: 'PRICE_HIGH', label: '높은 가격순' },
        ],
        Default = {
          args: {
            purchaseList: [
              createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
              createPurchaseItem('2', 'PENDING', 1, 3e3, 0, '2024-07-03T00:00:00.000Z'),
              createPurchaseItem('3', 'REJECTED', 3, 5e3, 0, '2024-07-02T00:00:00.000Z'),
            ],
            companyId: 'company-123',
            sortOptions,
            selectedSortOption: sortOptions[0],
            currentPage: 1,
            totalPages: 1,
            budget: 2e6,
            selectedRequestId: null,
            approveModalOpen: !1,
            rejectModalOpen: !1,
            onRejectClick: () => {},
            onApproveClick: () => {},
            onRowClick: () => {},
            onNavigateToProducts: () => {},
            onApproveModalClose: () => {},
            onRejectModalClose: () => {},
            onApproveSubmit: () => {},
            onRejectSubmit: () => {},
            onPageChange: () => {},
            onSortChange: () => {},
          },
        },
        EmptyList = {
          args: {
            purchaseList: [],
            companyId: 'company-123',
            sortOptions,
            selectedSortOption: sortOptions[0],
            currentPage: 1,
            totalPages: 1,
            budget: 2e6,
            selectedRequestId: null,
            approveModalOpen: !1,
            rejectModalOpen: !1,
            onRejectClick: () => {},
            onApproveClick: () => {},
            onRowClick: () => {},
            onNavigateToProducts: () => {},
            onApproveModalClose: () => {},
            onRejectModalClose: () => {},
            onApproveSubmit: () => {},
            onRejectSubmit: () => {},
            onPageChange: () => {},
            onSortChange: () => {},
          },
        },
        WithPagination = {
          args: {
            purchaseList: [
              createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z', '홍길동'),
              createPurchaseItem('2', 'PENDING', 1, 3e3, 0, '2024-07-03T00:00:00.000Z', '김철수'),
              createPurchaseItem('3', 'REJECTED', 3, 5e3, 0, '2024-07-02T00:00:00.000Z', '이영희'),
              createPurchaseItem(
                '4',
                'APPROVED',
                1,
                1500,
                3e3,
                '2024-07-01T00:00:00.000Z',
                '박민수'
              ),
            ],
            companyId: 'company-123',
            sortOptions,
            selectedSortOption: sortOptions[0],
            currentPage: 2,
            totalPages: 5,
            budget: 2e6,
            selectedRequestId: null,
            approveModalOpen: !1,
            rejectModalOpen: !1,
            onRejectClick: () => {},
            onApproveClick: () => {},
            onRowClick: () => {},
            onNavigateToProducts: () => {},
            onApproveModalClose: () => {},
            onRejectModalClose: () => {},
            onApproveSubmit: () => {},
            onRejectSubmit: () => {},
            onPageChange: () => {},
            onSortChange: () => {},
          },
        },
        Interactive = {
          render: (args) => {
            const typedArgs = args,
              [approveModalOpen, setApproveModalOpen] = (0, react.useState)(!1),
              [rejectModalOpen, setRejectModalOpen] = (0, react.useState)(!1),
              [selectedRequestId, setSelectedRequestId] = (0, react.useState)(null);
            return (0, jsx_runtime.jsx)(PurchaseRequestListTem_PurchaseRequestListTem, {
              purchaseList: typedArgs.purchaseList,
              companyId: typedArgs.companyId,
              sortOptions: typedArgs.sortOptions,
              selectedSortOption: typedArgs.selectedSortOption,
              currentPage: typedArgs.currentPage,
              totalPages: typedArgs.totalPages,
              budget: typedArgs.budget,
              onPageChange: typedArgs.onPageChange,
              onSortChange: typedArgs.onSortChange,
              selectedRequestId,
              approveModalOpen,
              rejectModalOpen,
              onApproveClick: (id) => {
                (setSelectedRequestId(id), setApproveModalOpen(!0));
              },
              onRejectClick: (id) => {
                (setSelectedRequestId(id), setRejectModalOpen(!0));
              },
              onRowClick: () => {},
              onNavigateToProducts: () => {},
              onApproveModalClose: () => {
                (setApproveModalOpen(!1), setSelectedRequestId(null));
              },
              onRejectModalClose: () => {
                (setRejectModalOpen(!1), setSelectedRequestId(null));
              },
              onApproveSubmit: () => {
                (setApproveModalOpen(!1), setSelectedRequestId(null));
              },
              onRejectSubmit: () => {
                (setRejectModalOpen(!1), setSelectedRequestId(null));
              },
            });
          },
          args: {
            purchaseList: [
              createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z', '홍길동'),
              createPurchaseItem('2', 'PENDING', 1, 3e3, 0, '2024-07-03T00:00:00.000Z', '김철수'),
              createPurchaseItem('3', 'REJECTED', 3, 5e3, 0, '2024-07-02T00:00:00.000Z', '이영희'),
              createPurchaseItem(
                '4',
                'APPROVED',
                1,
                1500,
                3e3,
                '2024-07-01T00:00:00.000Z',
                '박민수'
              ),
            ],
            companyId: 'company-123',
            sortOptions,
            selectedSortOption: sortOptions[0],
            currentPage: 1,
            totalPages: 1,
            budget: 2e6,
            onPageChange: () => {},
            onSortChange: () => {},
          },
        },
        __namedExportsOrder = ['Default', 'EmptyList', 'WithPagination', 'Interactive'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    purchaseList: [createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'), createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'), createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z')],\n    companyId: 'company-123',\n    sortOptions,\n    selectedSortOption: sortOptions[0],\n    currentPage: 1,\n    totalPages: 1,\n    budget: 2000000,\n    selectedRequestId: null,\n    approveModalOpen: false,\n    rejectModalOpen: false,\n    onRejectClick: () => {},\n    onApproveClick: () => {},\n    onRowClick: () => {},\n    onNavigateToProducts: () => {},\n    onApproveModalClose: () => {},\n    onRejectModalClose: () => {},\n    onApproveSubmit: () => {},\n    onRejectSubmit: () => {},\n    onPageChange: () => {},\n    onSortChange: () => {}\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (EmptyList.parameters = {
          ...EmptyList.parameters,
          docs: {
            ...EmptyList.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseList: [],\n    companyId: 'company-123',\n    sortOptions,\n    selectedSortOption: sortOptions[0],\n    currentPage: 1,\n    totalPages: 1,\n    budget: 2000000,\n    selectedRequestId: null,\n    approveModalOpen: false,\n    rejectModalOpen: false,\n    onRejectClick: () => {},\n    onApproveClick: () => {},\n    onRowClick: () => {},\n    onNavigateToProducts: () => {},\n    onApproveModalClose: () => {},\n    onRejectModalClose: () => {},\n    onApproveSubmit: () => {},\n    onRejectSubmit: () => {},\n    onPageChange: () => {},\n    onSortChange: () => {}\n  }\n}",
              ...EmptyList.parameters?.docs?.source,
            },
          },
        }),
        (WithPagination.parameters = {
          ...WithPagination.parameters,
          docs: {
            ...WithPagination.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseList: [createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z', '홍길동'), createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z', '김철수'), createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z', '이영희'), createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z', '박민수')],\n    companyId: 'company-123',\n    sortOptions,\n    selectedSortOption: sortOptions[0],\n    currentPage: 2,\n    totalPages: 5,\n    budget: 2000000,\n    selectedRequestId: null,\n    approveModalOpen: false,\n    rejectModalOpen: false,\n    onRejectClick: () => {},\n    onApproveClick: () => {},\n    onRowClick: () => {},\n    onNavigateToProducts: () => {},\n    onApproveModalClose: () => {},\n    onRejectModalClose: () => {},\n    onApproveSubmit: () => {},\n    onRejectSubmit: () => {},\n    onPageChange: () => {},\n    onSortChange: () => {}\n  }\n}",
              ...WithPagination.parameters?.docs?.source,
            },
          },
        }),
        (Interactive.parameters = {
          ...Interactive.parameters,
          docs: {
            ...Interactive.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => {\n    const typedArgs = args as StoryArgs;\n    const [approveModalOpen, setApproveModalOpen] = useState(false);\n    const [rejectModalOpen, setRejectModalOpen] = useState(false);\n    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);\n    return <PurchaseRequestListTem purchaseList={typedArgs.purchaseList!} companyId={typedArgs.companyId!} sortOptions={typedArgs.sortOptions} selectedSortOption={typedArgs.selectedSortOption} currentPage={typedArgs.currentPage} totalPages={typedArgs.totalPages} budget={typedArgs.budget} onPageChange={typedArgs.onPageChange} onSortChange={typedArgs.onSortChange} selectedRequestId={selectedRequestId} approveModalOpen={approveModalOpen} rejectModalOpen={rejectModalOpen} onApproveClick={id => {\n      setSelectedRequestId(id);\n      setApproveModalOpen(true);\n    }} onRejectClick={id => {\n      setSelectedRequestId(id);\n      setRejectModalOpen(true);\n    }} onRowClick={() => {}} onNavigateToProducts={() => {}} onApproveModalClose={() => {\n      setApproveModalOpen(false);\n      setSelectedRequestId(null);\n    }} onRejectModalClose={() => {\n      setRejectModalOpen(false);\n      setSelectedRequestId(null);\n    }} onApproveSubmit={() => {\n      setApproveModalOpen(false);\n      setSelectedRequestId(null);\n    }} onRejectSubmit={() => {\n      setRejectModalOpen(false);\n      setSelectedRequestId(null);\n    }} />;\n  },\n  args: {\n    purchaseList: [createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z', '홍길동'), createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z', '김철수'), createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z', '이영희'), createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z', '박민수')],\n    companyId: 'company-123',\n    sortOptions,\n    selectedSortOption: sortOptions[0],\n    currentPage: 1,\n    totalPages: 1,\n    budget: 2000000,\n    onPageChange: () => {},\n    onSortChange: () => {}\n  }\n}",
              ...Interactive.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
