'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7109],
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
    './src/features/wishlist/template/WishlistTem/WishlistTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Empty: () => Empty,
          ManyItems: () => ManyItems,
          SingleItem: () => SingleItem,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => WishlistTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        Divider = __webpack_require__('./src/components/atoms/Divider/Divider.tsx'),
        ProductCard = __webpack_require__('./src/components/molecules/ProductCard/ProductCard.tsx'),
        PaginationBlock = __webpack_require__(
          './src/components/molecules/PaginationBlock/PaginationBlock.tsx'
        ),
        StatusNotice = __webpack_require__(
          './src/components/molecules/StatusNotice/StatusNotice.tsx'
        );
      const WishlistTem = ({ items, onRemove, onGoToProducts }) => {
          const [likedItems, setLikedItems] = (0, react.useState)(items),
            [page, setPage] = (0, react.useState)(1);
          (0, react.useEffect)(() => {
            setLikedItems(items);
          }, [items]);
          const itemsPerPage = (() => {
              const [count, setCount] = (0, react.useState)(6);
              return (
                (0, react.useEffect)(() => {
                  const update = () => {
                    window.matchMedia('(min-width: 1024px)').matches
                      ? setCount(6)
                      : window.matchMedia('(min-width: 768px)').matches
                        ? setCount(9)
                        : setCount(4);
                  };
                  return (
                    update(),
                    window.addEventListener('resize', update),
                    () => window.removeEventListener('resize', update)
                  );
                }, []),
                count
              );
            })(),
            totalPage = Math.max(1, Math.ceil(likedItems.length / itemsPerPage)),
            isEmpty = 0 === likedItems.length;
          (0, react.useEffect)(() => {
            page > totalPage && setPage(totalPage);
          }, [page, totalPage]);
          const currentItems = (0, react.useMemo)(() => {
            const start = (page - 1) * itemsPerPage;
            return likedItems.slice(start, start + itemsPerPage);
          }, [likedItems, page, itemsPerPage]);
          return (0, jsx_runtime.jsxs)('section', {
            className: (0, clsx.A)('mx-auto', 'desktop:w-1200 tablet:w-696 w-325'),
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  'flex items-center justify-between',
                  'desktop:pb-20 desktop:px-0 desktop:pt-0',
                  'tablet:px-24 tablet:pt-10 tablet:pb-20',
                  'pb-20 mt-40 tablet:mt-0 desktop:mt-80'
                ),
                children: (0, jsx_runtime.jsx)('div', {
                  className: (0, clsx.A)(
                    'text-gray-950 font-bold tracking-tight',
                    'text-18 font-700 tracking--0.4'
                  ),
                  children: '나의 찜 목록',
                }),
              }),
              (0, jsx_runtime.jsx)(Divider.c, {
                variant: 'thin',
                className: 'desktop:mb-30 mb-20',
              }),
              isEmpty
                ? (0, jsx_runtime.jsx)('div', {
                    className: (0, clsx.A)(
                      'flex items-center justify-center',
                      'desktop:h-950',
                      'tablet:h-1045',
                      'h-542'
                    ),
                    children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                      title: '찜한 상품이 없습니다',
                      description:
                        '마음에 드는 상품을 찜해보세요.\n나중에 한 번에 확인할 수 있어요.',
                      buttonText: '상품 보러가기',
                      onButtonClick: onGoToProducts,
                    }),
                  })
                : (0, jsx_runtime.jsx)('div', {
                    className: (0, clsx.A)(
                      'grid',
                      'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
                      'desktop:gap-x-40 tablet:gap-x-20 gap-x-16',
                      'desktop:gap-y-30 tablet:gap-y-50 gap-y-40'
                    ),
                    children: currentItems.map((item) =>
                      (0, jsx_runtime.jsx)(
                        'div',
                        {
                          children: (0, jsx_runtime.jsx)(ProductCard.A, {
                            variant: 'wishlist',
                            name: item.name,
                            price: item.price,
                            purchaseCount: item.purchaseCount,
                            imageUrl: item.imageUrl,
                            productId: item.id,
                            onUnlike: () => {
                              return (
                                (id = item.id),
                                void (onRemove
                                  ? onRemove(id)
                                  : setLikedItems((prev) => prev.filter((item) => item.id !== id)))
                              );
                              var id;
                            },
                          }),
                        },
                        item.id
                      )
                    ),
                  }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  'flex justify-center',
                  'desktop:mt-60',
                  'tablet:mt-40',
                  'mt-10'
                ),
                children: (0, jsx_runtime.jsx)(PaginationBlock.A, {
                  current: page,
                  total: totalPage,
                  onPrev: (p) => setPage(p),
                  onNext: (p) => setPage(p),
                }),
              }),
            ],
          });
        },
        WishlistTem_WishlistTem = WishlistTem;
      WishlistTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'WishlistTem',
        props: {
          items: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'WishlistItem' }], raw: 'WishlistItem[]' },
            description: '',
          },
          onRemove: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(id: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'id' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onGoToProducts: {
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
      const mockWishlistItems = [
          {
            id: 1,
            name: '코카콜라 제로',
            price: 2e3,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 120,
          },
          {
            id: 2,
            name: '스프라이트',
            price: 1800,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 98,
          },
          {
            id: 3,
            name: '아메리카노',
            price: 3500,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 256,
          },
        ],
        manyWishlistItems = [
          ...mockWishlistItems,
          {
            id: 4,
            name: '컵라면',
            price: 1500,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 540,
          },
          {
            id: 5,
            name: '즉석밥',
            price: 2200,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 312,
          },
          {
            id: 6,
            name: '감자칩',
            price: 1700,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 421,
          },
          {
            id: 7,
            name: '초코바',
            price: 1200,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 689,
          },
          {
            id: 8,
            name: '우유',
            price: 2500,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 274,
          },
          {
            id: 9,
            name: '요거트',
            price: 1900,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 193,
          },
          {
            id: 10,
            name: '식빵',
            price: 3e3,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 87,
          },
          {
            id: 11,
            name: '크루아상',
            price: 3200,
            imageUrl: '/images/zero-cola.svg',
            purchaseCount: 64,
          },
        ],
        WishlistTem_stories = {
          title: 'Features/Wishlist/Template/WishlistTem',
          component: WishlistTem_WishlistTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '\n찜한 상품 목록 페이지의 **Template 레벨 컴포넌트**입니다.\n\nProductCard(wishlist variant), Divider, PaginationBlock을 조합하여  \n**찜 목록 페이지의 전체 레이아웃과 사용자 인터랙션**을 담당합니다.\n\n---\n\n## 역할 (Responsibility)\n\n- 페이지 상단 **"나의 찜 목록" 타이틀 영역 구성**\n- Divider를 통한 섹션 구분\n- wishlist variant의 **ProductCard 그리드 배치**\n- 디바이스별 (Desktop / Tablet / Mobile)  \n  **페이지당 노출 개수 및 레이아웃 관리**\n- PaginationBlock을 통한 **페이지 이동 UI 제공**\n- 하트(찜) 해제 시 **카드 즉시 제거**\n- 구매 수량(`purchaseCount`) 정보 표시\n- **찜 목록 Empty 상태 UI 처리**\n\n> ⚠️ 본 Template에서는  \n> - 실제 서버 API 연동  \n> - 찜 데이터 영속화  \n> 는 포함하지 않으며,  \n> **UI 상태 관리 수준의 로직만 포함합니다.**\n\n---\n\n## Empty 상태 처리 (Empty Wishlist)\n\n찜한 상품이 하나도 없는 경우(`items.length === 0`),  \n본 Template는 **전용 Empty UI 레이아웃**을 렌더링합니다.\n\n### Empty UI 구성\n\n- `StatusNotice` 컴포넌트를 사용하여\n  - 아이콘\n  - 안내 타이틀\n  - 설명 문구\n  - CTA 버튼\n  을 중앙 정렬 형태로 노출합니다.\n- Empty 상태에서도 **PaginationBlock은 항상 노출**됩니다.\n  - 페이지 구조의 일관성 유지\n  - 향후 서버 페이지네이션 연동 가능성 고려\n\n### 디바이스별 고정 높이 정책\n\nEmpty 상태에서는 콘텐츠 유무에 따른  \n레이아웃 흔들림(Layout Shift)을 방지하기 위해  \n디바이스별 **고정 height 레이아웃**을 적용합니다.\n\n- **Desktop:** `height: 950px`\n- **Tablet:** `height: 1045px`\n- **Mobile:** `height: 542px`\n\n해당 height 제어는 `StatusNotice` 내부가 아닌  \n**Template 레벨 Wrapper에서 관리**하여  \nStatusNotice 컴포넌트의 재사용성을 유지합니다.\n\n---\n\n## 사용 컴포넌트\n\n- `ProductCard (variant="wishlist")`\n- `Divider`\n- `PaginationBlock`\n- `StatusNotice` (Empty 상태 전용)\n\n---\n\n## 사용 위치\n\n- Next.js Page 레벨에서 사용\n- Page → Template → Molecule 구조의  \n  **중간 레이아웃 계층**\n\n> 반응형 레이아웃, 페이지네이션, Empty 상태,  \n> 사용자 인터랙션을 **동시에 검증하기 위한 Template 컴포넌트**입니다.\n        ',
              },
            },
          },
        },
        Default = { args: { items: mockWishlistItems } },
        ManyItems = { args: { items: manyWishlistItems } },
        SingleItem = { args: { items: mockWishlistItems.slice(0, 1) } },
        Empty = { args: { items: [] } },
        __namedExportsOrder = ['Default', 'ManyItems', 'SingleItem', 'Empty'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    items: mockWishlistItems\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nDefault\n======================',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (ManyItems.parameters = {
          ...ManyItems.parameters,
          docs: {
            ...ManyItems.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    items: manyWishlistItems\n  }\n}',
              ...ManyItems.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nMany Items (Pagination)\n======================',
              ...ManyItems.parameters?.docs?.description,
            },
          },
        }),
        (SingleItem.parameters = {
          ...SingleItem.parameters,
          docs: {
            ...SingleItem.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    items: mockWishlistItems.slice(0, 1)\n  }\n}',
              ...SingleItem.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nSingle Item\n======================',
              ...SingleItem.parameters?.docs?.description,
            },
          },
        }),
        (Empty.parameters = {
          ...Empty.parameters,
          docs: {
            ...Empty.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    items: []\n  }\n}',
              ...Empty.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nEmpty Wishlist\n======================',
              ...Empty.parameters?.docs?.description,
            },
          },
        }));
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
