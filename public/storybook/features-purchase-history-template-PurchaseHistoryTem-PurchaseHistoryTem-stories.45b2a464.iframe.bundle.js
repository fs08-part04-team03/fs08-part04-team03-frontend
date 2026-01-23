'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8512],
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
    './src/features/purchase-history/components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _components_molecules_PaginationBlock_PaginationBlock__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__('./src/components/molecules/PaginationBlock/PaginationBlock.tsx'),
        _PurchaseHistoryRowOrg_PurchaseHistoryRowOrg__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryRowOrg/PurchaseHistoryRowOrg.tsx'
          ),
        _PurchaseHistoryTableHeader_PurchaseHistoryTableHeader__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.tsx'
          );
      const PurchaseHistoryListOrg = ({
          items,
          currentPage = 1,
          totalPages = 1,
          onPageChange,
          onItemClick,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'w-full',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _PurchaseHistoryTableHeader_PurchaseHistoryTableHeader__WEBPACK_IMPORTED_MODULE_3__.J,
                {}
              ),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'w-full',
                children: items.map((item, index) =>
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    'div',
                    {
                      className: 'pb-26 tablet:pb-44 desktop:pb-0',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _PurchaseHistoryRowOrg_PurchaseHistoryRowOrg__WEBPACK_IMPORTED_MODULE_2__.A,
                        { item, isFirst: 0 === index, onItemClick }
                      ),
                    },
                    item.id
                  )
                ),
              }),
              totalPages > 1 &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'flex justify-center mt-40 desktop:mt-60',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_molecules_PaginationBlock_PaginationBlock__WEBPACK_IMPORTED_MODULE_1__.A,
                    {
                      current: currentPage,
                      total: totalPages,
                      onPrev: (newPage) => {
                        onPageChange?.(newPage);
                      },
                      onNext: (newPage) => {
                        onPageChange?.(newPage);
                      },
                    }
                  ),
                }),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseHistoryListOrg;
      PurchaseHistoryListOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryListOrg',
        props: {
          items: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'PurchaseRequestItem' }],
              raw: 'PurchaseRequestItem[]',
            },
            description: '',
          },
          currentPage: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '1', computed: !1 },
          },
          totalPages: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '1', computed: !1 },
          },
          onPageChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(page: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'page' }],
                return: { name: 'void' },
              },
            },
            description: '',
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
    './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { J: () => PurchaseHistoryTableHeader });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _constants_labels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/features/purchase-history/constants/labels.ts'
        );
      const PurchaseHistoryTableHeader = () =>
        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
          className:
            'hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-60 w-full desktop:border-b desktop:border-gray-200',
          children: [
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700 pl-40',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.REQUEST_DATE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.REQUESTER,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.PRODUCTS,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.TOTAL_PRICE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children:
                _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.APPROVAL_DATE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.MANAGER,
            }),
          ],
        });
      PurchaseHistoryTableHeader.__docgenInfo = {
        description:
          '구매 내역 테이블 헤더 컴포넌트\nPurchaseHistoryTem과 PurchaseHistoryListOrg에서 재사용',
        methods: [],
        displayName: 'PurchaseHistoryTableHeader',
      };
    },
    './src/features/purchase-history/template/PurchaseHistoryTem/PurchaseHistoryTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          EmptyList: () => EmptyList,
          WithPagination: () => WithPagination,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => PurchaseHistoryTem_stories,
        }));
      var sort = __webpack_require__('./src/constants/sort.ts'),
        jsx_runtime = __webpack_require__('./node_modules/next/dist/compiled/react/jsx-runtime.js'),
        StatusNotice = __webpack_require__(
          './src/components/molecules/StatusNotice/StatusNotice.tsx'
        ),
        ListSkeletonUI = __webpack_require__(
          './src/components/molecules/ListSkeletonUI/ListSkeletonUI.tsx'
        ),
        PurchaseHistoryListTopOrg = __webpack_require__(
          './src/features/purchase-history/components/PurchaseHistoryListTopOrg/PurchaseHistoryListTopOrg.tsx'
        ),
        PurchaseHistoryListBottomOrg = __webpack_require__(
          './src/features/purchase-history/components/PurchaseHistoryListBottomOrg/PurchaseHistoryListBottomOrg.tsx'
        ),
        PurchaseHistoryTableHeader = __webpack_require__(
          './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.tsx'
        );
      const PURCHASE_HISTORY_DEFAULTS_DISPLAY_ITEMS_COUNT = 4,
        PurchaseHistoryTem = ({
          budgetInfo,
          sortState,
          tableState,
          navigationHandlers,
          emptyState,
        }) => {
          const {
              items,
              currentPage,
              totalPages,
              onPageChange,
              isLoading = !1,
              isEmpty = !1,
            } = tableState,
            displayItems = (items || []).slice(0, PURCHASE_HISTORY_DEFAULTS_DISPLAY_ITEMS_COUNT);
          return (0, jsx_runtime.jsxs)('div', {
            className: 'flex flex-col gap-34 tablet:gap-25 mt-24 tablet:mt-14 desktop:mt-71',
            children: [
              (0, jsx_runtime.jsx)(PurchaseHistoryListTopOrg.A, {
                thisMonthBudget: budgetInfo.thisMonthBudget,
                lastMonthBudget: budgetInfo.lastMonthBudget,
                thisMonthSpending: budgetInfo.thisMonthSpending,
                lastMonthSpending: budgetInfo.lastMonthSpending,
                thisYearTotalSpending: budgetInfo.thisYearTotalSpending,
                lastYearTotalSpending: budgetInfo.lastYearTotalSpending,
                spendingPercentage: budgetInfo.spendingPercentage,
                currentBudget: budgetInfo.currentBudget,
                lastBudget: budgetInfo.lastBudget,
                selectedSort: sortState?.selectedSort,
                onSortChange: sortState?.onSortChange,
              }),
              isLoading &&
                (0, jsx_runtime.jsxs)('div', {
                  className: 'w-full',
                  children: [
                    (0, jsx_runtime.jsx)(PurchaseHistoryTableHeader.J, {}),
                    (0, jsx_runtime.jsx)(ListSkeletonUI.A, {
                      rows: PURCHASE_HISTORY_DEFAULTS_DISPLAY_ITEMS_COUNT,
                    }),
                  ],
                }),
              !isLoading &&
                isEmpty &&
                emptyState?.emptyMessage &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'flex justify-center items-center min-h-[calc(100vh-400px)]',
                  children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                    title: emptyState.emptyMessage.TITLE,
                    description: emptyState.emptyMessage.DESCRIPTION,
                    buttonText: emptyState.emptyMessage.BUTTON_TEXT,
                    onButtonClick: navigationHandlers?.onNavigateToProducts,
                  }),
                }),
              !isLoading &&
                !isEmpty &&
                (0, jsx_runtime.jsx)(PurchaseHistoryListBottomOrg.A, {
                  items: displayItems,
                  currentPage,
                  totalPages,
                  onPageChange,
                  onItemClick: navigationHandlers?.onItemClick,
                }),
            ],
          });
        },
        PurchaseHistoryTem_PurchaseHistoryTem = PurchaseHistoryTem;
      PurchaseHistoryTem.__docgenInfo = {
        description: '개선된 구매 내역 Template - 깔끔하고 단순한 조립 레이어',
        methods: [],
        displayName: 'PurchaseHistoryTem',
        props: {
          budgetInfo: {
            required: !0,
            tsType: { name: 'PurchaseHistoryBudgetInfo' },
            description: '',
          },
          sortState: {
            required: !1,
            tsType: { name: 'PurchaseHistorySortState' },
            description: '',
          },
          tableState: {
            required: !0,
            tsType: { name: 'PurchaseHistoryTableState' },
            description: '',
          },
          navigationHandlers: {
            required: !1,
            tsType: { name: 'PurchaseHistoryNavigationHandlers' },
            description: '',
          },
          emptyState: {
            required: !1,
            tsType: { name: 'PurchaseHistoryEmptyState' },
            description: '',
          },
        },
      };
      const PurchaseHistoryTem_stories = {
          title: 'Features/PurchaseHistory/Template/PurchaseHistoryTem',
          component: PurchaseHistoryTem_PurchaseHistoryTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            nextjs: {
              appDirectory: !0,
              navigation: {
                pathname: '/company-1/purchase-history',
                params: { companyId: 'company-1' },
              },
            },
            docs: {
              description: {
                component:
                  '구매 내역 확인 페이지의 전체 템플릿 컴포넌트입니다.\n\n**구성 요소:**\n- **PurchaseHistoryListTopOrg**: 상단 통계 섹션 (이번 달 예산, 지출액, 올해 총 지출액)\n- **PurchaseHistoryListBottomOrg**: 하단 구매 내역 리스트 및 페이지네이션\n\n**주요 기능:**\n- 예산 및 지출 통계 표시\n- 구매 내역 리스트 표시\n- 정렬 기능 제공\n- 페이지네이션 지원\n\n**반응형 레이아웃:**\n- 모바일: 세로 배치, 카드 형태로 정보 표시\n- 태블릿: 그리드 레이아웃으로 정보 구조화\n- 데스크톱: 테이블 형태로 한눈에 정보 확인',
              },
            },
          },
        },
        createPurchaseItem = (
          id,
          status,
          itemCount,
          totalPrice,
          createdAt,
          updatedAt,
          urgent,
          requesterName,
          approver
        ) => ({
          id,
          createdAt,
          updatedAt,
          itemsTotalPrice: totalPrice,
          shippingFee: 0,
          finalTotalPrice: totalPrice,
          totalPrice,
          status,
          purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
            id: `item-${id}-${index}`,
            quantity: 0 === index ? 2 : 1,
            priceSnapshot: totalPrice / itemCount,
            itemTotal: (totalPrice / itemCount) * (0 === index ? 2 : 1),
            products: { id: index + 1, name: 0 === index ? '코카콜라 제로' : `상품 ${index + 1}` },
          })),
          requester: {
            id: `requester-${id}`,
            name: requesterName,
            email: `${requesterName.toLowerCase()}@example.com`,
          },
          approver,
          urgent,
          reason: '',
        }),
        approvers = {
          김코드: { id: 'approver-1', name: '김코드', email: 'code@example.com' },
          박관리: { id: 'approver-2', name: '박관리', email: 'manager@example.com' },
        },
        Default = {
          args: {
            budgetInfo: {
              thisMonthBudget: 1e6,
              lastMonthBudget: 2e6,
              thisMonthSpending: 126e3,
              lastMonthSpending: 2e6,
              thisYearTotalSpending: 1e7,
              lastYearTotalSpending: 4e6,
            },
            sortState: { selectedSort: sort.GS[0], onSortChange: () => {} },
            tableState: {
              items: [
                createPurchaseItem(
                  '1',
                  'APPROVED',
                  2,
                  21e3,
                  '2025-07-05T00:00:00.000Z',
                  '2025-07-07T00:00:00.000Z',
                  !1,
                  '김스낵',
                  approvers.김코드
                ),
                createPurchaseItem(
                  '2',
                  'APPROVED',
                  3,
                  45e3,
                  '2025-07-03T00:00:00.000Z',
                  '2025-07-03T06:00:00.000Z',
                  !0,
                  '이개발',
                  approvers.김코드
                ),
                createPurchaseItem(
                  '3',
                  'PENDING',
                  1,
                  15e3,
                  '2025-07-08T00:00:00.000Z',
                  '2025-07-08T00:00:00.000Z',
                  !1,
                  '박디자인'
                ),
              ],
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              isLoading: !1,
              isEmpty: !1,
            },
            navigationHandlers: { onNavigateToProducts: () => {}, onItemClick: () => {} },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '기본 구매 내역 확인 페이지입니다.\n\n**상단 통계:**\n- 이번 달 예산: 1,000,000원\n- 이번 달 지출액: 126,000원 (진행률 13%)\n- 올해 총 지출액: 10,000,000원 (작년보다 6,000,000원 증가)\n\n**구매 내역 리스트:**\n- 3개의 구매 내역 표시\n- 승인된 일반 요청, 긴급 요청, 승인 대기 요청 포함\n\n**레이아웃:**\n- 상단 통계 카드와 하단 리스트가 세로로 배치\n- 컴포넌트 간 간격: 모바일 24px, 태블릿 32px, 데스크톱 40px',
              },
            },
          },
        },
        WithPagination = {
          args: {
            budgetInfo: {
              thisMonthBudget: 1e6,
              lastMonthBudget: 2e6,
              thisMonthSpending: 5e5,
              lastMonthSpending: 15e4,
              thisYearTotalSpending: 5e6,
              lastYearTotalSpending: 6e6,
            },
            sortState: { selectedSort: sort.GS[0], onSortChange: () => {} },
            tableState: {
              items: Array.from({ length: 10 }, (_, i) =>
                createPurchaseItem(
                  `${i + 1}`,
                  i % 3 == 0 ? 'PENDING' : 'APPROVED',
                  Math.floor(5 * Math.random()) + 1,
                  Math.floor(1e5 * Math.random()) + 1e4,
                  `2025-07-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
                  `2025-07-${String(i + 2).padStart(2, '0')}T00:00:00.000Z`,
                  i % 4 == 0,
                  `사용자${i + 1}`,
                  i % 3 == 0 ? void 0 : Object.values(approvers)[(i % 3) - 1]
                )
              ),
              currentPage: 1,
              totalPages: 3,
              onPageChange: () => {},
              isLoading: !1,
              isEmpty: !1,
            },
            navigationHandlers: { onNavigateToProducts: () => {}, onItemClick: () => {} },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '페이지네이션이 있는 구매 내역 확인 페이지입니다.\n\n**특징:**\n- 10개의 구매 내역 표시\n- 총 3페이지로 구성\n- 하단에 페이지네이션 컴포넌트 표시\n\n**페이지네이션:**\n- 현재 페이지: 1\n- 전체 페이지: 3\n- Prev/Next 버튼으로 페이지 이동 가능',
              },
            },
          },
        },
        EmptyList = {
          args: {
            budgetInfo: {
              thisMonthBudget: 1e6,
              lastMonthBudget: 1e6,
              thisMonthSpending: 0,
              lastMonthSpending: 0,
              thisYearTotalSpending: 0,
              lastYearTotalSpending: 0,
            },
            sortState: { selectedSort: sort.GS[0], onSortChange: () => {} },
            tableState: {
              items: [],
              currentPage: 1,
              totalPages: 1,
              onPageChange: () => {},
              isLoading: !1,
              isEmpty: !0,
            },
            navigationHandlers: { onNavigateToProducts: () => {}, onItemClick: () => {} },
            emptyState: {
              emptyMessage: {
                TITLE: '구매 내역이 없어요',
                DESCRIPTION: '구매 요청을 승인하고\n상품을 주문해 보세요',
                BUTTON_TEXT: '상품으로 이동',
              },
            },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '구매 내역이 없는 상태입니다.\n\n**상단 통계:**\n- PurchaseHistoryListTopOrg 컴포넌트 표시\n- 모든 지출액이 0원\n- 예산은 설정되어 있지만 사용하지 않은 상태\n\n**하단 영역:**\n- PurchaseHistoryListOrg는 숨김\n- StatusNotice 컴포넌트로 빈 상태 메시지 표시\n- 제목: "구매 내역이 없어요"\n- 설명: "구매 요청을 승인하고\\n상품을 주문해 보세요"\n- 버튼: "상품으로 이동" - 클릭 시 상품 리스트 페이지로 이동',
              },
            },
          },
        },
        __namedExportsOrder = ['Default', 'WithPagination', 'EmptyList'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    budgetInfo: {\n      thisMonthBudget: 1000000,\n      lastMonthBudget: 2000000,\n      thisMonthSpending: 126000,\n      lastMonthSpending: 2000000,\n      thisYearTotalSpending: 10000000,\n      lastYearTotalSpending: 4000000\n    },\n    sortState: {\n      selectedSort: COMMON_SORT_OPTIONS[0],\n      onSortChange: () => {}\n    },\n    tableState: {\n      items: [createPurchaseItem('1', 'APPROVED', 2, 21000, '2025-07-05T00:00:00.000Z', '2025-07-07T00:00:00.000Z', false, '김스낵', approvers.김코드), createPurchaseItem('2', 'APPROVED', 3, 45000, '2025-07-03T00:00:00.000Z', '2025-07-03T06:00:00.000Z', true, '이개발', approvers.김코드), createPurchaseItem('3', 'PENDING', 1, 15000, '2025-07-08T00:00:00.000Z', '2025-07-08T00:00:00.000Z', false, '박디자인')],\n      currentPage: 1,\n      totalPages: 1,\n      onPageChange: () => {},\n      isLoading: false,\n      isEmpty: false\n    },\n    navigationHandlers: {\n      onNavigateToProducts: () => {},\n      onItemClick: () => {}\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 구매 내역 확인 페이지입니다.\\n\\n**상단 통계:**\\n- 이번 달 예산: 1,000,000원\\n- 이번 달 지출액: 126,000원 (진행률 13%)\\n- 올해 총 지출액: 10,000,000원 (작년보다 6,000,000원 증가)\\n\\n**구매 내역 리스트:**\\n- 3개의 구매 내역 표시\\n- 승인된 일반 요청, 긴급 요청, 승인 대기 요청 포함\\n\\n**레이아웃:**\\n- 상단 통계 카드와 하단 리스트가 세로로 배치\\n- 컴포넌트 간 간격: 모바일 24px, 태블릿 32px, 데스크톱 40px'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithPagination.parameters = {
          ...WithPagination.parameters,
          docs: {
            ...WithPagination.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    budgetInfo: {\n      thisMonthBudget: 1000000,\n      lastMonthBudget: 2000000,\n      thisMonthSpending: 500000,\n      lastMonthSpending: 150000,\n      thisYearTotalSpending: 5000000,\n      lastYearTotalSpending: 6000000\n    },\n    sortState: {\n      selectedSort: COMMON_SORT_OPTIONS[0],\n      onSortChange: () => {}\n    },\n    tableState: {\n      items: Array.from({\n        length: 10\n      }, (_, i) => createPurchaseItem(`${i + 1}`, i % 3 === 0 ? 'PENDING' : 'APPROVED', Math.floor(Math.random() * 5) + 1, Math.floor(Math.random() * 100000) + 10000, `2025-07-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`, `2025-07-${String(i + 2).padStart(2, '0')}T00:00:00.000Z`, i % 4 === 0, `사용자${i + 1}`, i % 3 === 0 ? undefined : Object.values(approvers)[i % 3 - 1])),\n      currentPage: 1,\n      totalPages: 3,\n      onPageChange: () => {},\n      isLoading: false,\n      isEmpty: false\n    },\n    navigationHandlers: {\n      onNavigateToProducts: () => {},\n      onItemClick: () => {}\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '페이지네이션이 있는 구매 내역 확인 페이지입니다.\\n\\n**특징:**\\n- 10개의 구매 내역 표시\\n- 총 3페이지로 구성\\n- 하단에 페이지네이션 컴포넌트 표시\\n\\n**페이지네이션:**\\n- 현재 페이지: 1\\n- 전체 페이지: 3\\n- Prev/Next 버튼으로 페이지 이동 가능'\n      }\n    }\n  }\n}",
              ...WithPagination.parameters?.docs?.source,
            },
          },
        }),
        (EmptyList.parameters = {
          ...EmptyList.parameters,
          docs: {
            ...EmptyList.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    budgetInfo: {\n      thisMonthBudget: 1000000,\n      lastMonthBudget: 1000000,\n      thisMonthSpending: 0,\n      lastMonthSpending: 0,\n      thisYearTotalSpending: 0,\n      lastYearTotalSpending: 0\n    },\n    sortState: {\n      selectedSort: COMMON_SORT_OPTIONS[0],\n      onSortChange: () => {}\n    },\n    tableState: {\n      items: [],\n      currentPage: 1,\n      totalPages: 1,\n      onPageChange: () => {},\n      isLoading: false,\n      isEmpty: true\n    },\n    navigationHandlers: {\n      onNavigateToProducts: () => {},\n      onItemClick: () => {}\n    },\n    emptyState: {\n      emptyMessage: {\n        TITLE: '구매 내역이 없어요',\n        DESCRIPTION: '구매 요청을 승인하고\\n상품을 주문해 보세요',\n        BUTTON_TEXT: '상품으로 이동'\n      }\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '구매 내역이 없는 상태입니다.\\n\\n**상단 통계:**\\n- PurchaseHistoryListTopOrg 컴포넌트 표시\\n- 모든 지출액이 0원\\n- 예산은 설정되어 있지만 사용하지 않은 상태\\n\\n**하단 영역:**\\n- PurchaseHistoryListOrg는 숨김\\n- StatusNotice 컴포넌트로 빈 상태 메시지 표시\\n- 제목: \"구매 내역이 없어요\"\\n- 설명: \"구매 요청을 승인하고\\\\n상품을 주문해 보세요\"\\n- 버튼: \"상품으로 이동\" - 클릭 시 상품 리스트 페이지로 이동'\n      }\n    }\n  }\n}",
              ...EmptyList.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
