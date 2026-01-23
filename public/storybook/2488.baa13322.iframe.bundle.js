'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2488],
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
    './src/components/molecules/Breadcrumb/Breadcrumb.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const Breadcrumb = ({ items, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('nav', {
            'aria-label': 'Breadcrumb',
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
              'flex items-center',
              className
            ),
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ol', {
              className: 'flex items-center gap-8',
              children: items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  'li',
                  {
                    className: 'flex items-center gap-8',
                    children: [
                      item.onClick && !isLast
                        ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                            type: 'button',
                            onClick: item.onClick,
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'text-14 tablet:text-16 font-normal',
                              'text-gray-400 hover:text-gray-600',
                              'transition-colors',
                              'cursor-pointer'
                            ),
                            children: item.label,
                          })
                        : item.href && !isLast
                          ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                              {
                                href: item.href,
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'text-14 tablet:text-16 font-normal',
                                  'text-gray-400 hover:text-gray-600',
                                  'transition-colors'
                                ),
                                children: item.label,
                              }
                            )
                          : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                'text-14 tablet:text-16 font-normal',
                                isLast ? 'text-gray-900' : 'text-gray-200'
                              ),
                              'aria-current': isLast ? 'page' : void 0,
                              children: item.label,
                            }),
                      !isLast &&
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('svg', {
                          width: '8',
                          height: '9',
                          viewBox: '0 0 8 14',
                          fill: 'none',
                          xmlns: 'http://www.w3.org/2000/svg',
                          'aria-hidden': 'true',
                          className: 'text-gray-200',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            'path',
                            {
                              d: 'M1.06055 0L7.95508 6.89355L1.06055 13.7881L0 12.7275L5.83301 6.89453L0 1.06055L1.06055 0Z',
                              fill: 'currentColor',
                            }
                          ),
                        }),
                    ],
                  },
                  `${item.href ?? ''}-${item.label}`
                );
              }),
            }),
          }),
        __WEBPACK_DEFAULT_EXPORT__ = Breadcrumb;
      Breadcrumb.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Breadcrumb',
        props: {
          items: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'BreadcrumbItem' }],
              raw: 'BreadcrumbItem[]',
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/components/organisms/AccordionPanel/AccordionPanel.tsx'(
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
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/Divider/Divider.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const AccordionPanel = ({ label, content, subContent, className }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            contentId = (0, react__WEBPACK_IMPORTED_MODULE_1__.useId)();
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
              '\n        w-328\n        tablet:w-496\n        desktop:w-610\n      ',
              className
            ),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: ' w-full py-30 tablet:py-40 desktop:py-40 ',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    className: 'flex items-center h-20',
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className:
                          ' text-gray-950  font-suit  text-16 font-700 tracking--0.4 tablet:text-18 tablet:tracking--0.45 desktop:text-18 desktop:tracking--0.45 mb-6 ',
                        children: label,
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className: 'flex-1',
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_3__.K,
                        {
                          variant: 'default',
                          size: 'md',
                          onClick: () => setOpen((prev) => !prev),
                          'aria-expanded': open,
                          'aria-controls': contentId,
                          'aria-label': `${label} ${open ? '접기' : '펼치기'}`,
                          className: 'cursor-pointer',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                            {
                              src: open ? '/icons/minus.svg' : '/icons/plus.svg',
                              alt: '',
                              'aria-hidden': !0,
                              width: 20,
                              height: 20,
                            }
                          ),
                        }
                      ),
                    ],
                  }),
                  open &&
                    (content || subContent) &&
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      id: contentId,
                      role: 'region',
                      'aria-labelledby': contentId,
                      className:
                        ' mt-6 tablet:flex tablet:flex-row tablet:items-center tablet:gap-6 desktop:flex desktop:flex-row desktop:items-center desktop:gap-6 ',
                      children: [
                        content &&
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className:
                              ' text-gray-600 font-suit text-14 font-400 tracking--0.35 tablet:text-16 tablet:tracking--0.4 desktop:text-16 desktop:tracking--0.4 ',
                            children: content,
                          }),
                        subContent &&
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className:
                              ' text-gray-400 font-suit text-14 font-400 tracking--0.35 tablet:text-16 tablet:tracking--0.4 desktop:text-16 desktop:tracking--0.4 mt-6 tablet:mt-0 desktop:mt-0 ',
                            children: subContent,
                          }),
                      ],
                    }),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_4__.c,
                {}
              ),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = AccordionPanel;
      AccordionPanel.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'AccordionPanel',
        props: {
          label: { required: !0, tsType: { name: 'string' }, description: '' },
          content: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'string | React.ReactNode',
              elements: [{ name: 'string' }, { name: 'ReactReactNode', raw: 'React.ReactNode' }],
            },
            description: '',
          },
          subContent: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'string | React.ReactNode',
              elements: [{ name: 'string' }, { name: 'ReactReactNode', raw: 'React.ReactNode' }],
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/components/organisms/DetailPageLayout/DetailPageLayout.tsx'(
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
        _components_molecules_Breadcrumb_Breadcrumb__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__('./src/components/molecules/Breadcrumb/Breadcrumb.tsx'),
        _components_organisms_AccordionPanel_AccordionPanel__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__('./src/components/organisms/AccordionPanel/AccordionPanel.tsx'),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_molecules_ProductDetailHeader_ProductDetailHeader__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            './src/components/molecules/ProductDetailHeader/ProductDetailHeader.tsx'
          ),
        _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          './src/components/atoms/Divider/Divider.tsx'
        );
      const ProductImageBox = ({ sizeClass, productImage, liked, onToggleLike }) => {
          const [imgError, setImgError] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            effectiveSrc = productImage?.src,
            imageSrc =
              !!effectiveSrc && !imgError && effectiveSrc ? effectiveSrc : '/icons/no-image.svg',
            imageAlt = productImage?.alt || '이미지 없음',
            isNoImage = '/icons/no-image.svg' === imageSrc;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
              'relative bg-gray-100 rounded-8 shadow-lg',
              sizeClass
            ),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'absolute inset-0 bg-white rounded-8 p-[73px_120px]',
                children: isNoImage
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'relative w-full h-full flex items-center justify-center',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                        {
                          src: '/icons/photo-icon.svg',
                          alt: '이미지 없음',
                          width: 50,
                          height: 50,
                          unoptimized: !0,
                          loading: 'eager',
                          priority: !0,
                        }
                      ),
                    })
                  : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'absolute inset-0 flex items-center justify-center',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                        {
                          src: imageSrc,
                          alt: imageAlt,
                          fill: !0,
                          className: 'object-contain',
                          onError: () => setImgError(!0),
                          unoptimized: !0,
                        }
                      ),
                    }),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                type: 'button',
                'aria-pressed': liked,
                'aria-label': liked ? '찜하기 취소' : '찜하기',
                onClick: onToggleLike,
                className:
                  ' absolute bottom-20 right-20 w-30 h-30 bg-transparent p-0 rounded-4 transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ',
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    src: liked ? '/icons/heart.svg' : '/icons/heart-outline.svg',
                    alt: '찜하기',
                    width: 30,
                    height: 30,
                  }
                ),
              }),
            ],
          });
        },
        DetailPageLayoutMobile = ({
          breadcrumbItems,
          productImage,
          liked,
          onToggleLike,
          accordionPanels,
          productName,
          purchaseCount,
          price,
          type,
          onQuantityChange,
          onMenuClick,
          onAddToCart,
          headerClassName,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: 'w-full flex justify-center tablet:hidden',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'w-328 flex flex-col',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'mb-40',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_molecules_Breadcrumb_Breadcrumb__WEBPACK_IMPORTED_MODULE_3__.A,
                    { items: breadcrumbItems }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'mb-30 flex justify-center',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    ProductImageBox,
                    { sizeClass: 'w-328 h-328', productImage, liked, onToggleLike }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'mb-40',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_molecules_ProductDetailHeader_ProductDetailHeader__WEBPACK_IMPORTED_MODULE_6__.A,
                    {
                      productName,
                      purchaseCount,
                      price,
                      type,
                      onQuantityChange,
                      onMenuClick,
                      onAddToCart,
                      className: headerClassName,
                    }
                  ),
                }),
                accordionPanels?.map((panel, i) =>
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_organisms_AccordionPanel_AccordionPanel__WEBPACK_IMPORTED_MODULE_4__.A,
                    { label: panel.label, content: panel.content, subContent: panel.subContent },
                    panel.id ?? i
                  )
                ),
              ],
            }),
          }),
        DetailPageLayoutTablet = ({
          breadcrumbItems,
          productImage,
          liked,
          onToggleLike,
          accordionPanels,
          productName,
          purchaseCount,
          price,
          type,
          onQuantityChange,
          onMenuClick,
          onAddToCart,
          headerClassName,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: 'hidden tablet:flex desktop:hidden w-full justify-center',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'w-496',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_molecules_Breadcrumb_Breadcrumb__WEBPACK_IMPORTED_MODULE_3__.A,
                  { items: breadcrumbItems }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_7__.c,
                  { className: 'my-30' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'mb-30 flex justify-center',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    ProductImageBox,
                    { sizeClass: 'w-496 h-496', productImage, liked, onToggleLike }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_molecules_ProductDetailHeader_ProductDetailHeader__WEBPACK_IMPORTED_MODULE_6__.A,
                  {
                    productName,
                    purchaseCount,
                    price,
                    type,
                    onQuantityChange,
                    onMenuClick,
                    onAddToCart,
                    className: headerClassName,
                  }
                ),
                accordionPanels?.map((panel, i) =>
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_organisms_AccordionPanel_AccordionPanel__WEBPACK_IMPORTED_MODULE_4__.A,
                    { label: panel.label, content: panel.content, subContent: panel.subContent },
                    panel.id ?? i
                  )
                ),
              ],
            }),
          }),
        DetailPageLayoutDesktop = ({
          breadcrumbItems,
          productImage,
          liked,
          onToggleLike,
          accordionPanels,
          productName,
          purchaseCount,
          price,
          type,
          onQuantityChange,
          onMenuClick,
          onAddToCart,
          headerClassName,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'hidden desktop:flex flex-col items-center w-full',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'w-1180 mb-20',
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_molecules_Breadcrumb_Breadcrumb__WEBPACK_IMPORTED_MODULE_3__.A,
                  { items: breadcrumbItems }
                ),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_7__.c,
                { className: 'w-1180 mb-60' }
              ),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'w-1180 grid grid-cols-[540px_610px] gap-40',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ProductImageBox, {
                    sizeClass: 'w-540 h-540',
                    productImage,
                    liked,
                    onToggleLike,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_molecules_ProductDetailHeader_ProductDetailHeader__WEBPACK_IMPORTED_MODULE_6__.A,
                        {
                          productName,
                          purchaseCount,
                          price,
                          type,
                          onQuantityChange,
                          onMenuClick,
                          onAddToCart,
                          className: headerClassName,
                        }
                      ),
                      accordionPanels?.map((panel, i) =>
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          _components_organisms_AccordionPanel_AccordionPanel__WEBPACK_IMPORTED_MODULE_4__.A,
                          {
                            label: panel.label,
                            content: panel.content,
                            subContent: panel.subContent,
                          },
                          panel.id ?? i
                        )
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
        DetailPageLayout = ({
          breadcrumbItems,
          productImage,
          productDetailHeader,
          accordionPanels,
          className,
          liked: externalLiked,
          onToggleLike: externalOnToggleLike,
        }) => {
          const [internalLiked, setInternalLiked] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            liked = void 0 !== externalLiked ? externalLiked : internalLiked,
            handleToggleLike = () => {
              externalOnToggleLike ? externalOnToggleLike() : setInternalLiked((v) => !v);
            },
            {
              productName,
              purchaseCount,
              price,
              type,
              onQuantityChange,
              onMenuClick,
              onAddToCart,
              className: headerClassName,
            } = productDetailHeader;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)('w-full', className),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailPageLayoutMobile, {
                breadcrumbItems,
                productImage,
                accordionPanels,
                liked,
                onToggleLike: handleToggleLike,
                productName,
                purchaseCount,
                price,
                type: type || 'default',
                onQuantityChange,
                onMenuClick,
                onAddToCart,
                headerClassName,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailPageLayoutTablet, {
                breadcrumbItems,
                productImage,
                accordionPanels,
                liked,
                onToggleLike: handleToggleLike,
                productName,
                purchaseCount,
                price,
                type: type || 'default',
                onQuantityChange,
                onMenuClick,
                onAddToCart,
                headerClassName,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DetailPageLayoutDesktop, {
                breadcrumbItems,
                productImage,
                accordionPanels,
                liked,
                onToggleLike: handleToggleLike,
                productName,
                purchaseCount,
                price,
                type: type || 'default',
                onQuantityChange,
                onMenuClick,
                onAddToCart,
                headerClassName,
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = DetailPageLayout;
      DetailPageLayout.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DetailPageLayout',
        props: {
          breadcrumbItems: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'BreadcrumbItem' }],
              raw: 'BreadcrumbItem[]',
            },
            description: '',
          },
          productImage: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  src: string;\n  alt: string;\n  width?: number;\n  height?: number;\n}',
              signature: {
                properties: [
                  { key: 'src', value: { name: 'string', required: !0 } },
                  { key: 'alt', value: { name: 'string', required: !0 } },
                  { key: 'width', value: { name: 'number', required: !1 } },
                  { key: 'height', value: { name: 'number', required: !1 } },
                ],
              },
            },
            description: '',
          },
          productImageKey: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'string | null',
              elements: [{ name: 'string' }, { name: 'null' }],
            },
            description: '',
          },
          productDetailHeader: {
            required: !0,
            tsType: {
              name: 'intersection',
              raw: "ProductDetailHeaderProps & {\n  type?: 'default' | 'simple';\n}",
              elements: [
                { name: 'ProductDetailHeaderProps' },
                {
                  name: 'signature',
                  type: 'object',
                  raw: "{\n  type?: 'default' | 'simple';\n}",
                  signature: {
                    properties: [
                      {
                        key: 'type',
                        value: {
                          name: 'union',
                          raw: "'default' | 'simple'",
                          elements: [
                            { name: 'literal', value: "'default'" },
                            { name: 'literal', value: "'simple'" },
                          ],
                          required: !1,
                        },
                      },
                    ],
                  },
                },
              ],
            },
            description: '',
          },
          accordionPanels: {
            required: !1,
            tsType: {
              name: 'Array',
              elements: [
                {
                  name: 'signature',
                  type: 'object',
                  raw: '{\n  id?: string | number;\n  label: string;\n  content?: string | ReactNode;\n  subContent?: string | ReactNode;\n}',
                  signature: {
                    properties: [
                      {
                        key: 'id',
                        value: {
                          name: 'union',
                          raw: 'string | number',
                          elements: [{ name: 'string' }, { name: 'number' }],
                          required: !1,
                        },
                      },
                      { key: 'label', value: { name: 'string', required: !0 } },
                      {
                        key: 'content',
                        value: {
                          name: 'union',
                          raw: 'string | ReactNode',
                          elements: [{ name: 'string' }, { name: 'ReactNode' }],
                          required: !1,
                        },
                      },
                      {
                        key: 'subContent',
                        value: {
                          name: 'union',
                          raw: 'string | ReactNode',
                          elements: [{ name: 'string' }, { name: 'ReactNode' }],
                          required: !1,
                        },
                      },
                    ],
                  },
                },
              ],
              raw: 'Array<{\n  id?: string | number;\n  label: string;\n  content?: string | ReactNode;\n  subContent?: string | ReactNode;\n}>',
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          liked: { required: !1, tsType: { name: 'boolean' }, description: '' },
          onToggleLike: {
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
    },
  },
]);
