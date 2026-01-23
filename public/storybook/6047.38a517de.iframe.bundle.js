'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6047],
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
    './src/components/atoms/LinkText/LinkText.tsx'(
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
        ),
        _components_molecules_CustomModal_CustomModal__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__('./src/components/molecules/CustomModal/CustomModal.tsx');
      const LinkText = ({ url, className, clickable = !0 }) => {
          const [linkModalOpen, setLinkModalOpen] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            formatLinkDisplay = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((linkUrl) => {
              if (!linkUrl) return '';
              try {
                let fullUrl = linkUrl;
                linkUrl.startsWith('http://') ||
                  linkUrl.startsWith('https://') ||
                  (fullUrl = `https://${linkUrl}`);
                const { hostname } = new URL(fullUrl);
                return `${hostname}`;
              } catch {
                return linkUrl;
              }
            }, []),
            handleLinkClick = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(
              (e) => {
                clickable && (e.stopPropagation(), url && setLinkModalOpen(!0));
              },
              [url, clickable]
            ),
            handleLinkModalConfirm = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
              if (url) {
                let linkUrl = url;
                (linkUrl.startsWith('http://') ||
                  linkUrl.startsWith('https://') ||
                  (linkUrl = `https://${linkUrl}`),
                  window.open(linkUrl, '_blank', 'noopener,noreferrer'));
              }
              setLinkModalOpen(!1);
            }, [url]),
            handleLinkModalClose = (0, react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
              setLinkModalOpen(!1);
            }, []),
            displayText = formatLinkDisplay(url);
          return clickable
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                {
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                        className,
                        'cursor-pointer hover:underline'
                      ),
                      onClick: handleLinkClick,
                      role: 'button',
                      tabIndex: 0,
                      onKeyDown: (e) => {
                        ('Enter' !== e.key && ' ' !== e.key) ||
                          (e.preventDefault(), handleLinkClick(e));
                      },
                      children: displayText,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_molecules_CustomModal_CustomModal__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        open: linkModalOpen,
                        type: 'link-confirm',
                        description: `외부 링크로 이동하시겠습니까?\n${displayText}`,
                        onClose: handleLinkModalClose,
                        onConfirm: handleLinkModalConfirm,
                      }
                    ),
                  ],
                }
              )
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className,
                children: displayText,
              });
        },
        __WEBPACK_DEFAULT_EXPORT__ = LinkText;
      LinkText.__docgenInfo = {
        description:
          'URL을 도메인까지만 표시하고 클릭 시 모달을 띄워 확인 후 이동하는 컴포넌트\n예: https://www.codeit.com/products → www.codeit.com',
        methods: [],
        displayName: 'LinkText',
        props: {
          url: { required: !0, tsType: { name: 'string' }, description: '표시할 URL' },
          className: {
            required: !1,
            tsType: { name: 'string' },
            description: '텍스트 크기 클래스',
          },
          clickable: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '클릭 가능 여부 (기본값: true)',
            defaultValue: { value: 'true', computed: !1 },
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
    './src/features/cart/queries/cart.keys.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { z: () => cartKeys });
      const cartKeys = {
        all: ['cart'],
        lists: () => [...cartKeys.all, 'list'],
        list: (page, pageSize, cartItemIdsParam) => [
          ...cartKeys.lists(),
          page,
          pageSize,
          cartItemIdsParam || 'all',
        ],
        budget: (year, month) => ['budget', year, month],
      };
    },
    './src/features/products/components/RegisteredProductOrg/RegisteredProductOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => RegisteredProductOrg_RegisteredProductOrg,
      });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        Divider = __webpack_require__('./src/components/atoms/Divider/Divider.tsx'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        StatusNotice = __webpack_require__(
          './src/components/molecules/StatusNotice/StatusNotice.tsx'
        ),
        LinkText = __webpack_require__('./src/components/atoms/LinkText/LinkText.tsx'),
        ListSkeletonUI = __webpack_require__(
          './src/components/molecules/ListSkeletonUI/ListSkeletonUI.tsx'
        );
      var labels = __webpack_require__('./src/features/products/constants/labels.ts'),
        messages = __webpack_require__('./src/features/products/constants/messages.ts'),
        formatDate = __webpack_require__('./src/utils/formatDate.ts'),
        useProductNavigationDirect = __webpack_require__(
          './src/features/products/hooks/useProductNavigationDirect.ts'
        );
      const RegisteredProductOrg = ({
          products,
          totalCount,
          onRegisterClick,
          onProductClick,
          isLoading = !1,
        }) => {
          const isEmpty = 0 === products.length,
            [imageErrors, setImageErrors] = (0, react.useState)({}),
            navigation = (0, useProductNavigationDirect.c)(),
            handleImageError = (productId) => {
              setImageErrors((prev) => ({ ...prev, [productId]: !0 }));
            },
            handleProductClick = (productId) => {
              (navigation.goToProductDetail(productId),
                onProductClick && onProductClick(productId));
            };
          return (0, jsx_runtime.jsx)('section', {
            className: (0, clsx.A)('w-full bg-white'),
            children: (0, jsx_runtime.jsxs)('div', {
              className: (0, clsx.A)('mx-auto', 'mobile:w-327', 'tablet:w-696', 'desktop:w-1200'),
              children: [
                (0, jsx_runtime.jsxs)('p', {
                  className: (0, clsx.A)(
                    'mobile:mb-10',
                    'mobile:text-14 mobile:font-bold mobile:tracking--0.35',
                    'tablet:text-16 tablet:tracking--0.4',
                    'text-gray-950',
                    'desktop:hidden'
                  ),
                  children: ['총 등록한 상품 ', totalCount, '개'],
                }),
                (0, jsx_runtime.jsx)(Divider.c, { variant: 'thin' }),
                (0, jsx_runtime.jsxs)('div', {
                  className: (0, clsx.A)(
                    'hidden desktop:flex',
                    'desktop:items-center',
                    'desktop:px-40 desktop:gap-16 desktop:h-60',
                    'desktop:border-b desktop:border-gray-200'
                  ),
                  children: [
                    (0, jsx_runtime.jsxs)('div', {
                      className: (0, clsx.A)('flex-1 flex items-center gap-20'),
                      children: [
                        (0, jsx_runtime.jsx)('div', { className: (0, clsx.A)('w-40 h-40') }),
                        (0, jsx_runtime.jsx)('span', {
                          className: (0, clsx.A)('text-14 font-bold text-gray-700'),
                          children: '상품명',
                        }),
                      ],
                    }),
                    (0, jsx_runtime.jsx)('span', {
                      className: (0, clsx.A)('w-120 text-14 font-bold text-gray-700'),
                      children: '등록일',
                    }),
                    (0, jsx_runtime.jsx)('span', {
                      className: (0, clsx.A)('w-180 text-14 font-bold text-gray-700'),
                      children: '카테고리',
                    }),
                    (0, jsx_runtime.jsx)('span', {
                      className: (0, clsx.A)('w-160 text-14 font-bold text-gray-700'),
                      children: '가격',
                    }),
                    (0, jsx_runtime.jsx)('span', {
                      className: (0, clsx.A)('w-180 text-14 font-bold text-gray-700'),
                      children: '제품 링크',
                    }),
                  ],
                }),
                (0, jsx_runtime.jsx)('div', {
                  className: (0, clsx.A)(
                    'mobile:min-h-710',
                    'tablet:min-h-740',
                    'desktop:min-h-600'
                  ),
                  children: isLoading
                    ? (0, jsx_runtime.jsx)(ListSkeletonUI.A, { rows: 6 })
                    : isEmpty
                      ? (0, jsx_runtime.jsx)('div', {
                          className: (0, clsx.A)('mt-40 flex justify-center'),
                          children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                            title: messages.F.EMPTY.NO_MY_PRODUCTS.TITLE,
                            description: messages.F.EMPTY.NO_MY_PRODUCTS.DESCRIPTION,
                            buttonText: labels.q.BUTTON.REGISTER,
                            onButtonClick: onRegisterClick,
                          }),
                        })
                      : (0, jsx_runtime.jsx)('ul', {
                          className: (0, clsx.A)('flex flex-col'),
                          children: products.map((product) => {
                            const imgError = imageErrors[product.id] || !1,
                              showNoImage =
                                !product.imageSrc ||
                                0 === product.imageSrc.trim().length ||
                                imgError;
                            return (0, jsx_runtime.jsxs)(
                              'li',
                              {
                                children: [
                                  (0, jsx_runtime.jsxs)('div', {
                                    className: (0, clsx.A)('desktop:hidden', 'cursor-pointer'),
                                    onClick: () => handleProductClick(product.id),
                                    role: 'button',
                                    tabIndex: 0,
                                    onKeyDown: (e) => {
                                      ('Enter' !== e.key && ' ' !== e.key) ||
                                        (e.preventDefault(), handleProductClick(product.id));
                                    },
                                    children: [
                                      (0, jsx_runtime.jsx)('p', {
                                        className: (0, clsx.A)(
                                          'mobile:mt-20 mobile:mb-10',
                                          'tablet:mt-30',
                                          'text-16 font-extrabold tracking--0.4 text-gray-950'
                                        ),
                                        children: product.createdAt
                                          ? (0, formatDate.Y)(product.createdAt)
                                          : '-',
                                      }),
                                      (0, jsx_runtime.jsxs)('div', {
                                        className: (0, clsx.A)('flex gap-20'),
                                        children: [
                                          (0, jsx_runtime.jsx)('div', {
                                            className: (0, clsx.A)(
                                              'flex items-center justify-center w-90 h-90 bg-gray-50 shrink-0'
                                            ),
                                            children: showNoImage
                                              ? (0, jsx_runtime.jsx)(next_image.A, {
                                                  src: '/icons/no-image-small.svg',
                                                  alt: '이미지 없음',
                                                  width: 29,
                                                  height: 50,
                                                  unoptimized: !0,
                                                })
                                              : (0, jsx_runtime.jsx)(next_image.A, {
                                                  src: product.imageSrc,
                                                  alt: product.name,
                                                  width: 29,
                                                  height: 50,
                                                  onError: () => handleImageError(product.id),
                                                  className: 'object-contain',
                                                }),
                                          }),
                                          (0, jsx_runtime.jsxs)('div', {
                                            className: (0, clsx.A)('flex flex-col gap-6 w-216'),
                                            children: [
                                              (0, jsx_runtime.jsx)('span', {
                                                className: (0, clsx.A)(
                                                  'text-12 tracking--0.3 text-gray-500'
                                                ),
                                                children: product.categoryLabel,
                                              }),
                                              (0, jsx_runtime.jsx)('span', {
                                                className: (0, clsx.A)(
                                                  'mobile:text-14',
                                                  'tablet:text-16',
                                                  'mobile:tracking--0.35',
                                                  'tablet:tracking--0.4',
                                                  'text-gray-950'
                                                ),
                                                children: product.name,
                                              }),
                                              (0, jsx_runtime.jsxs)('span', {
                                                className: (0, clsx.A)(
                                                  'text-14 font-extrabold tracking--0.35 text-gray-950'
                                                ),
                                                children: [product.price.toLocaleString(), '원'],
                                              }),
                                              (0, jsx_runtime.jsx)('div', {
                                                className: (0, clsx.A)('line-clamp-2'),
                                                onClick: (e) => e.stopPropagation(),
                                                onKeyDown: (e) => {
                                                  ('Enter' !== e.key && ' ' !== e.key) ||
                                                    e.stopPropagation();
                                                },
                                                role: 'presentation',
                                                children: (0, jsx_runtime.jsx)(LinkText.A, {
                                                  url: product.link,
                                                  className: (0, clsx.A)(
                                                    'text-14 tracking--0.35 text-gray-600'
                                                  ),
                                                  clickable: !0,
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      (0, jsx_runtime.jsx)('div', {
                                        className: (0, clsx.A)('mt-30'),
                                        children: (0, jsx_runtime.jsx)(Divider.c, {
                                          variant: 'thin',
                                        }),
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime.jsxs)('div', {
                                    className: (0, clsx.A)(
                                      'hidden',
                                      'desktop:flex',
                                      'desktop:items-center',
                                      'desktop:px-40 desktop:gap-16 desktop:h-100',
                                      'border-b border-gray-200',
                                      'cursor-pointer hover:bg-gray-50 transition-colors'
                                    ),
                                    onClick: () => handleProductClick(product.id),
                                    role: 'button',
                                    tabIndex: 0,
                                    onKeyDown: (e) => {
                                      ('Enter' !== e.key && ' ' !== e.key) ||
                                        (e.preventDefault(), handleProductClick(product.id));
                                    },
                                    children: [
                                      (0, jsx_runtime.jsxs)('div', {
                                        className: (0, clsx.A)('flex-1 flex items-center gap-20'),
                                        children: [
                                          (0, jsx_runtime.jsx)('div', {
                                            className: (0, clsx.A)(
                                              'flex items-center justify-center w-48 h-48 bg-gray-50 shrink-0'
                                            ),
                                            children: showNoImage
                                              ? (0, jsx_runtime.jsx)(next_image.A, {
                                                  src: '/icons/no-image-small.svg',
                                                  alt: '이미지 없음',
                                                  width: 19,
                                                  height: 32,
                                                  unoptimized: !0,
                                                })
                                              : (0, jsx_runtime.jsx)(next_image.A, {
                                                  src: product.imageSrc,
                                                  alt: product.name,
                                                  width: 19,
                                                  height: 32,
                                                  onError: () => handleImageError(product.id),
                                                  className: 'object-contain',
                                                }),
                                          }),
                                          (0, jsx_runtime.jsx)('span', {
                                            className: (0, clsx.A)(
                                              'text-16 tracking--0.4 text-gray-950'
                                            ),
                                            children: product.name,
                                          }),
                                        ],
                                      }),
                                      (0, jsx_runtime.jsx)('span', {
                                        className: (0, clsx.A)(
                                          'w-120 text-16 tracking--0.4 text-gray-950'
                                        ),
                                        children: product.createdAt
                                          ? (0, formatDate.Y)(product.createdAt)
                                          : '-',
                                      }),
                                      (0, jsx_runtime.jsx)('span', {
                                        className: (0, clsx.A)(
                                          'w-180 text-16 tracking--0.4 text-gray-950'
                                        ),
                                        children: product.categoryLabel,
                                      }),
                                      (0, jsx_runtime.jsx)('span', {
                                        className: (0, clsx.A)(
                                          'w-160 text-16 tracking--0.4 text-gray-950'
                                        ),
                                        children: product.price.toLocaleString(),
                                      }),
                                      (0, jsx_runtime.jsx)('div', {
                                        className: (0, clsx.A)('w-180 line-clamp-2'),
                                        onClick: (e) => e.stopPropagation(),
                                        onKeyDown: (e) => {
                                          ('Enter' !== e.key && ' ' !== e.key) ||
                                            e.stopPropagation();
                                        },
                                        role: 'presentation',
                                        children: (0, jsx_runtime.jsx)(LinkText.A, {
                                          url: product.link,
                                          className: (0, clsx.A)(
                                            'text-16 tracking--0.4 text-gray-950'
                                          ),
                                          clickable: !0,
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              product.id
                            );
                          }),
                        }),
                }),
              ],
            }),
          });
        },
        RegisteredProductOrg_RegisteredProductOrg = RegisteredProductOrg;
      RegisteredProductOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'RegisteredProductOrg',
        props: {
          products: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'RegisteredProductOrgItem' }],
              raw: 'RegisteredProductOrgItem[]',
            },
            description: '',
          },
          totalCount: { required: !0, tsType: { name: 'number' }, description: '' },
          onRegisterClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onProductClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(productId: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'productId' }],
                return: { name: 'void' },
              },
            },
            description: '하위 호환성을 위한 props (deprecated - 직접 hook 사용)',
          },
          isLoading: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/features/products/constants/labels.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { q: () => PRODUCT_LABELS });
      const PRODUCT_LABELS = {
        TITLE: {
          PRODUCT_LIST: '상품 목록',
          MY_PRODUCT_LIST: '상품 등록 내역',
          PRODUCT_DETAIL: '상품 상세',
          MY_PRODUCT_DETAIL: '내 상품 상세',
        },
        BREADCRUMB: { MY_PRODUCT_LIST: '상품 등록 내역' },
        ACCORDION: { PRODUCT_LINK: '제품 링크', LINK_NONE: '링크 없음' },
        BUTTON: { REGISTER: '상품 등록' },
        PLACEHOLDER: { SEARCH: '상품명으로 검색하세요' },
      };
    },
    './src/features/products/constants/messages.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { F: () => PRODUCT_MESSAGES });
      const PRODUCT_MESSAGES = {
        SUCCESS: {
          UPDATE: '상품이 수정되었습니다.',
          DELETE: '상품이 삭제되었습니다.',
          ADD_TO_CART: '장바구니에 상품이 추가되었습니다.',
          REGISTER: '상품이 등록되었습니다.',
        },
        ERROR: {
          UPDATE: '상품 수정에 실패했습니다.',
          DELETE: '상품 삭제에 실패했습니다.',
          FETCH_PRODUCT: '상품 정보를 불러올 수 없습니다.',
          ADD_TO_CART: '나중에 다시 시도해주세요.',
          REGISTER: '상품 등록에 실패했습니다.',
        },
        EMPTY: {
          NO_PRODUCTS: {
            TITLE: '등록된 상품이 없습니다',
            DESCRIPTION: '상품을 등록하면\n여기에 표시됩니다.',
          },
          NO_MY_PRODUCTS: {
            TITLE: '등록한 상품이 없습니다',
            DESCRIPTION: '상품을 등록하면\n여기에 표시됩니다.',
          },
        },
        MODAL: {
          CART_ADD_FAILED_DESCRIPTION: '나중에 다시 시도해주세요.',
          CART_ADD_SUCCESS_DESCRIPTION: '장바구니에 상품이 추가되었습니다.',
        },
      };
    },
    './src/features/products/hooks/useProductNavigationDirect.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { c: () => useProductNavigationDirect });
      var CompanyContext = __webpack_require__('./src/lib/context/CompanyContext.tsx'),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        constants = __webpack_require__('./src/constants/index.ts'),
        cart_keys = __webpack_require__('./src/features/cart/queries/cart.keys.ts'),
        logger = __webpack_require__('./src/utils/logger.ts');
      const useProductNavigationDirect = () =>
        (function useProductNavigation(companyId) {
          const router = (0, navigation.useRouter)(),
            searchParams = (0, navigation.useSearchParams)(),
            queryClient = (0, QueryClientProvider.jE)(),
            handleCategoryChange = (0, react.useCallback)(
              (categoryId) => {
                const params = new URLSearchParams(searchParams?.toString() || '');
                (null === categoryId
                  ? params.delete('categoryId')
                  : params.set('categoryId', String(categoryId)),
                  params.delete('q'));
                const newUrl = `${constants.vp.PRODUCTS(companyId)}${params.toString() ? `?${params.toString()}` : ''}`;
                router.push(newUrl);
              },
              [companyId, router, searchParams]
            ),
            handleSearch = (0, react.useCallback)(
              (query) => {
                if ((searchParams?.get('q') || '') === query) return;
                const params = new URLSearchParams(searchParams?.toString() || '');
                query ? params.set('q', query) : params.delete('q');
                const newUrl = `${constants.vp.PRODUCTS(companyId)}${params.toString() ? `?${params.toString()}` : ''}`;
                router.push(newUrl);
              },
              [companyId, router, searchParams]
            ),
            goToProductDetail = (0, react.useCallback)(
              (productId) => {
                router.push(constants.vp.PRODUCT_DETAIL(companyId, String(productId)));
              },
              [companyId, router]
            ),
            goToProductsByCategory = (0, react.useCallback)(
              (categoryId) => {
                null !== categoryId
                  ? router.push(`${constants.vp.PRODUCTS(companyId)}?categoryId=${categoryId}`)
                  : router.push(constants.vp.PRODUCTS(companyId));
              },
              [companyId, router]
            ),
            goToProducts = (0, react.useCallback)(() => {
              router.push(constants.vp.PRODUCTS(companyId));
            }, [companyId, router]),
            goToMyProducts = (0, react.useCallback)(() => {
              router.push(constants.vp.PRODUCT_MINE(companyId));
            }, [companyId, router]),
            goToCart = (0, react.useCallback)(async () => {
              try {
                (await queryClient.invalidateQueries({ queryKey: cart_keys.z.all }),
                  router.push(constants.vp.CART(companyId)));
              } catch (error) {
                (logger.v.error('Failed to invalidate cart before navigation', {
                  hasError: !0,
                  errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                }),
                  router.push(constants.vp.CART(companyId)));
              }
            }, [companyId, router, queryClient]);
          return (0, react.useMemo)(
            () => ({
              handleCategoryChange,
              handleSearch,
              goToProductDetail,
              goToProductsByCategory,
              goToProducts,
              goToMyProducts,
              goToCart,
            }),
            [
              handleCategoryChange,
              handleSearch,
              goToProductDetail,
              goToProductsByCategory,
              goToProducts,
              goToMyProducts,
              goToCart,
            ]
          );
        })((0, CompanyContext.k)());
    },
    './src/lib/context/CompanyContext.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { k: () => useCompanyId });
      __webpack_require__('./node_modules/next/dist/compiled/react/jsx-runtime.js');
      var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        );
      const CompanyContext = (0, react__WEBPACK_IMPORTED_MODULE_1__.createContext)(void 0),
        useCompanyId = () => {
          const params = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)(),
            context = (0, react__WEBPACK_IMPORTED_MODULE_1__.useContext)(CompanyContext);
          return void 0 !== context ? context.companyId : params?.companyId || '';
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
