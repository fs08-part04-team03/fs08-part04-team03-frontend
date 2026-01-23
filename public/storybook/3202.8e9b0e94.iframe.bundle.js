'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3202],
  {
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
    './src/components/molecules/ProductCard/ProductCard.tsx'(
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
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_molecules_ProductTile_ProductTile__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__('./src/components/molecules/ProductTile/ProductTile.tsx'),
        _features_products_hooks_useProductNavigationDirect__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__('./src/features/products/hooks/useProductNavigationDirect.ts');
      const ProductCard = ({
          variant = 'product',
          name,
          price,
          purchaseCount,
          quantity,
          shippingFee,
          imageUrl,
          className,
          productId,
          onClick,
          onUnlike,
          liked: externalLiked,
          onToggleLike,
          priority = !1,
        }) => {
          const [internalLiked, setInternalLiked] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)('wishlist' === variant),
            [likedState, setLikedState] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              externalLiked ?? internalLiked
            ),
            [pressed, setPressed] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [imgError, setImgError] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            navigation = (0,
            _features_products_hooks_useProductNavigationDirect__WEBPACK_IMPORTED_MODULE_5__.c)(),
            isWishlist = 'wishlist' === variant;
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setLikedState(externalLiked ?? internalLiked);
          }, [externalLiked, internalLiked]);
          const isLiked = !!isWishlist || likedState,
            handleClick = () => {
              productId && navigation
                ? navigation.goToProductDetail(productId)
                : onClick && onClick();
            },
            rootClasses = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'flex flex-col overflow-hidden',
              'rounded-default bg-white text-left',
              'shadow-card',
              'transition-[transform,box-shadow,border] duration-300 ease-out',
              'hover:animate-border-shimmer hover:-translate-y-2',
              pressed && 'scale-[0.97]',
              'cursor-pointer',
              ('product' === variant || 'order' === variant) &&
                'w-full aspect-[155/241] tablet:aspect-[156/252] desktop:aspect-[367/439]',
              'wishlist' === variant &&
                'w-full aspect-[155/251] tablet:aspect-[219/315] desktop:aspect-[373/445]',
              className
            ),
            effectiveImageUrl = imageUrl ? imageUrl.trim() : null,
            shouldShowImage = !!effectiveImageUrl && !imgError;
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setImgError(!1);
          }, [imageUrl]);
          const imageSizes =
              'wishlist' === variant
                ? '(max-width: 767px) 115px, (max-width: 1199px) 200px, 345px'
                : '(max-width: 767px) 150px, (max-width: 1199px) 150px, 350px',
            imageContent = shouldShowImage
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    src: effectiveImageUrl,
                    alt: name,
                    fill: !0,
                    sizes: imageSizes,
                    className: 'object-contain',
                    onError: () => setImgError(!0),
                    priority,
                    unoptimized: !0,
                  }
                )
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    src: '/icons/no-image.svg',
                    alt: '이미지 없음',
                    fill: !0,
                    sizes: imageSizes,
                    className: 'object-contain',
                    style: { objectPosition: 'center' },
                    unoptimized: !0,
                  }
                ),
            productTileContent =
              'product' === variant || 'wishlist' === variant
                ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_molecules_ProductTile_ProductTile__WEBPACK_IMPORTED_MODULE_4__.A,
                    { variant: 'product', name, price, purchaseCount, size: 'md' }
                  )
                : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_molecules_ProductTile_ProductTile__WEBPACK_IMPORTED_MODULE_4__.A,
                    { variant: 'order', name, price, quantity, shippingFee, size: 'md' }
                  );
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            role: 'link',
            tabIndex: 0,
            'aria-label': `${name} 상세 페이지로 이동`,
            onClick: handleClick,
            onKeyDown: (e) => {
              (productId || onClick) &&
                (('Enter' !== e.key && ' ' !== e.key) || (e.preventDefault(), handleClick()));
            },
            onPointerDown: () => setPressed(!0),
            onPointerUp: () => setPressed(!1),
            onPointerLeave: () => setPressed(!1),
            className: rootClasses,
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'relative rounded-default bg-gray-50 overflow-hidden',
                  ('product' === variant || 'order' === variant) && 'w-full aspect-square',
                  'wishlist' === variant && 'w-full aspect-square'
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'absolute inset-0 flex items-center justify-center',
                    children: imageContent,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                    type: 'button',
                    'aria-pressed': isLiked,
                    'aria-label': isLiked ? '찜하기 취소' : '찜하기',
                    onPointerDown: (e) => e.stopPropagation(),
                    onClick: (e) => {
                      (async (e) => {
                        if ((e.stopPropagation(), isWishlist)) return void onUnlike?.();
                        if ((setLikedState(!likedState), onToggleLike))
                          try {
                            await onToggleLike();
                          } catch {
                            setLikedState((prev) => !prev);
                          }
                        else setInternalLiked((prev) => !prev);
                      })(e);
                    },
                    className:
                      'absolute bottom-10 right-10 w-17 h-17 desktop:bottom-20 desktop:right-20 desktop:w-25 desktop:h-25 bg-transparent p-0 cursor-pointer',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                      {
                        src: isLiked ? '/icons/heart.svg' : '/icons/heart-outline.svg',
                        alt: '',
                        width: 25,
                        height: 25,
                        className: 'w-full h-full',
                      }
                    ),
                  }),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2',
                children: productTileContent,
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ProductCard;
      ProductCard.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProductCard',
        props: {
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'product' | 'order' | 'wishlist'",
              elements: [
                { name: 'literal', value: "'product'" },
                { name: 'literal', value: "'order'" },
                { name: 'literal', value: "'wishlist'" },
              ],
            },
            description: '',
            defaultValue: { value: "'product'", computed: !1 },
          },
          name: { required: !0, tsType: { name: 'string' }, description: '' },
          price: { required: !0, tsType: { name: 'number' }, description: '' },
          purchaseCount: { required: !1, tsType: { name: 'number' }, description: '' },
          quantity: { required: !1, tsType: { name: 'number' }, description: '' },
          shippingFee: { required: !1, tsType: { name: 'number' }, description: '' },
          imageUrl: { required: !1, tsType: { name: 'string' }, description: '' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          productId: { required: !1, tsType: { name: 'number' }, description: '' },
          onClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onUnlike: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          liked: { required: !1, tsType: { name: 'boolean' }, description: '' },
          onToggleLike: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void | Promise<void>',
              signature: {
                arguments: [],
                return: {
                  name: 'union',
                  raw: 'void | Promise<void>',
                  elements: [
                    { name: 'void' },
                    { name: 'Promise', elements: [{ name: 'void' }], raw: 'Promise<void>' },
                  ],
                },
              },
            },
            description: '',
          },
          priority: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/components/molecules/ProductTile/ProductTile.tsx'(
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
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        );
      const ProductTile = (props) => {
          const { name, price, size = 'md', className, variant } = props,
            nameClass =
              'sm' === size
                ? 'text-14 leading-22 tracking--0.35 whitespace-nowrap overflow-hidden text-ellipsis'
                : 'text-14 leading-22 tracking--0.35 tablet:text-16 tablet:leading-24 tablet:tracking--0.4 whitespace-nowrap overflow-hidden text-ellipsis',
            subClass =
              'sm' === size
                ? 'text-13 leading-18 tracking--0.3'
                : 'text-13 leading-18 tracking--0.3 tablet:text-14 tablet:leading-22 tablet:tracking--0.35',
            priceClass =
              'sm' === size
                ? 'text-14 leading-22 tracking--0.35'
                : 'text-14 leading-22 tracking--0.35 tablet:text-16 tablet:leading-24 tablet:tracking--0.4';
          let subNode = null,
            purchaseCountNode = null,
            orderSubNode = null,
            orderSubNodeInline = null;
          if ('product' === variant) {
            const { purchaseCount } = props;
            void 0 !== purchaseCount &&
              ((purchaseCountNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                'span',
                {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                    'font-bold text-secondary-500',
                    subClass
                  ),
                  children: [purchaseCount, '회 구매'],
                }
              )),
              (subNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'font-bold text-secondary-500',
                  subClass
                ),
                children: [purchaseCount, '회 구매'],
              })));
          } else if ('order' === variant) {
            const { quantity, shippingFee, metaOverride } = props;
            if (metaOverride)
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: metaOverride,
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: metaOverride,
                  }
                )));
            else if (void 0 !== quantity)
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: ['수량 ', quantity, '개'],
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: ['수량 ', quantity, '개'],
                  }
                )));
            else if (void 0 !== shippingFee) {
              const shippingText =
                0 === shippingFee ? '무료' : `${shippingFee.toLocaleString('ko-KR')}원`;
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: ['배송비 ', shippingText],
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: ['배송비 ', shippingText],
                  }
                )));
            }
          }
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              'flex flex-col gap-2 flex-1 min-w-0',
              className
            ),
            children:
              'product' === variant && purchaseCountNode
                ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                    {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex flex-col gap-2 desktop:hidden',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                'font-normal text-gray-950',
                                nameClass
                              ),
                              children: name,
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                value: price,
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-bold text-gray-950',
                                  priceClass
                                ),
                              }
                            ),
                            subNode,
                          ],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                              className: 'flex flex-row items-center gap-8',
                              children: [
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-normal text-gray-950',
                                    nameClass
                                  ),
                                  children: name,
                                }),
                                purchaseCountNode,
                              ],
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                value: price,
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-bold text-gray-950',
                                  priceClass
                                ),
                              }
                            ),
                          ],
                        }),
                      ],
                    }
                  )
                : 'order' === variant && orderSubNode
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                      {
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'flex flex-col gap-2 desktop:hidden',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-normal text-gray-950',
                                  nameClass
                                ),
                                children: name,
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                                {
                                  value: price,
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-bold text-gray-950',
                                    priceClass
                                  ),
                                }
                              ),
                              orderSubNode,
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                                className: 'flex flex-row items-center gap-8',
                                children: [
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                      'font-normal text-gray-950',
                                      nameClass
                                    ),
                                    children: name,
                                  }),
                                  orderSubNodeInline,
                                ],
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                                {
                                  value: price,
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-bold text-gray-950',
                                    priceClass
                                  ),
                                }
                              ),
                            ],
                          }),
                        ],
                      }
                    )
                  : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                      {
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                              'font-normal text-gray-950',
                              nameClass
                            ),
                            children: name,
                          }),
                          subNode,
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                            {
                              value: price,
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                'font-bold text-gray-950',
                                priceClass
                              ),
                            }
                          ),
                        ],
                      }
                    ),
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ProductTile;
      ProductTile.__docgenInfo = { description: '', methods: [], displayName: 'ProductTile' };
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
  },
]);
