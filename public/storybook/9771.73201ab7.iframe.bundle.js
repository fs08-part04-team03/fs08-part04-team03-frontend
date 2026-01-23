'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9771],
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
    './src/features/purchase/components/PurchaseRequestItemListOrg/PurchaseRequestItemListOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => PurchaseRequestItemListOrg_PurchaseRequestItemListOrg,
      });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        PriceText = __webpack_require__('./src/components/atoms/PriceText/PriceText.tsx'),
        StatusTag = __webpack_require__('./src/components/atoms/StatusTag/StatusTag.tsx'),
        purchase_utils = __webpack_require__('./src/features/purchase/utils/purchase.utils.ts'),
        constants = __webpack_require__('./src/features/purchase/constants/index.ts'),
        usePurchaseNavigationDirect = __webpack_require__(
          './src/features/purchase/hooks/usePurchaseNavigationDirect.ts'
        );
      const usePurchaseRowHandlers = (item, onRowClick) => {
        const navigation = (0, usePurchaseNavigationDirect.u)();
        return {
          handleRowClick: (0, react.useCallback)(
            (e) => {
              (e && e.stopPropagation(),
                onRowClick ? onRowClick(item.id) : navigation.goToPurchaseRequestDetail(item.id));
            },
            [item.id, onRowClick, navigation]
          ),
          handleRowKeyDown: (0, react.useCallback)(
            (e) => {
              ('Enter' !== e.key && ' ' !== e.key) ||
                (e.preventDefault(),
                e.stopPropagation(),
                onRowClick ? onRowClick(item.id) : navigation.goToPurchaseRequestDetail(item.id));
            },
            [item.id, onRowClick, navigation]
          ),
        };
      };
      var useProductNavigationDirect = __webpack_require__(
        './src/features/products/hooks/useProductNavigationDirect.ts'
      );
      const ProductLink = ({ item, children, className }) => {
        const productId = item.purchaseItems[0]?.products.id,
          { goToProductDetail } = (0, useProductNavigationDirect.c)();
        return null == productId
          ? (0, jsx_runtime.jsx)('div', { className, children })
          : (0, jsx_runtime.jsx)('div', {
              className: (0, clsx.A)(className, constants.kx.LINK.HOVER),
              onClick: (e) => {
                (e.stopPropagation(), null != productId && goToProductDetail(productId));
              },
              onKeyDown: (e) => {
                ('Enter' !== e.key && ' ' !== e.key) ||
                  null == productId ||
                  (e.preventDefault(), e.stopPropagation(), goToProductDetail(productId));
              },
              role: 'button',
              tabIndex: 0,
              children,
            });
      };
      ProductLink.__docgenInfo = {
        description: '상품 링크 컴포넌트\nProps Depth 1단계 - hook에서 직접 네비게이션 처리',
        methods: [],
        displayName: 'ProductLink',
        props: {
          item: { required: !0, tsType: { name: 'PurchaseRequestItem' }, description: '' },
          children: {
            required: !0,
            tsType: { name: 'ReactReactNode', raw: 'React.ReactNode' },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
      var Button = __webpack_require__('./src/components/atoms/Button/Button.tsx');
      const ActionButtons = ({
        isPending,
        onReject,
        onApprove,
        onCancel,
        purchaseRequestId,
        variant = 'mobile',
      }) => {
        const handleClick = (e, handler) => {
          (e.stopPropagation(), handler?.(purchaseRequestId));
        };
        if (!isPending) return null;
        const buttonClassName =
          'mobile' === variant ? constants.kx.BUTTON.MOBILE : constants.kx.BUTTON.DESKTOP;
        return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
          children: [
            onReject &&
              onApprove &&
              (0, jsx_runtime.jsxs)('div', {
                className: (0, clsx.A)('w-full', 'flex', constants.mO.GAP_SMALL),
                children: [
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'secondary',
                    size: 'sm',
                    onClick: (e) => handleClick(e, onReject),
                    className: buttonClassName,
                    children: constants.WY.BUTTONS.REJECT,
                  }),
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'primary',
                    size: 'sm',
                    onClick: (e) => handleClick(e, onApprove),
                    className: buttonClassName,
                    children: constants.WY.BUTTONS.APPROVE,
                  }),
                ],
              }),
            onCancel &&
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('w-full', 'flex', constants.mO.GAP_SMALL),
                children: (0, jsx_runtime.jsx)(Button.A, {
                  variant: 'secondary',
                  onClick: (e) => handleClick(e, onCancel),
                  className: buttonClassName,
                  children: constants.WY.BUTTONS.CANCEL,
                }),
              }),
          ],
        });
      };
      ActionButtons.__docgenInfo = {
        description: '액션 버튼 그룹 컴포넌트',
        methods: [],
        displayName: 'ActionButtons',
        props: {
          isPending: { required: !0, tsType: { name: 'boolean' }, description: '' },
          onReject: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onApprove: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onCancel: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          purchaseRequestId: { required: !0, tsType: { name: 'string' }, description: '' },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'mobile' | 'desktop'",
              elements: [
                { name: 'literal', value: "'mobile'" },
                { name: 'literal', value: "'desktop'" },
              ],
            },
            description: '',
            defaultValue: { value: "'mobile'", computed: !1 },
          },
        },
      };
      const PurchaseRequestItemRowMobile = ({
        item,
        onReject,
        onApprove,
        onCancel,
        onRowClick,
        companyId: _companyId,
      }) => {
        const isPending = 'PENDING' === item.status,
          isUrgent = !0 === item.urgent,
          totalPrice = (0, purchase_utils.mE)(item),
          { handleRowClick, handleRowKeyDown } = usePurchaseRowHandlers(item, onRowClick);
        return (0, jsx_runtime.jsxs)('div', {
          role: 'button',
          tabIndex: 0,
          className: (0, clsx.A)(
            constants.kx.ROW.MOBILE.BASE,
            isUrgent && constants.kx.ROW.MOBILE.URGENT,
            constants.kx.ROW.MOBILE.HOVER
          ),
          onClick: (e) => handleRowClick(e),
          onKeyDown: handleRowKeyDown,
          children: [
            (0, jsx_runtime.jsxs)('div', {
              className: (0, clsx.A)('flex items-start', 'w-full', constants.mO.GAP_MEDIUM),
              children: [
                (0, jsx_runtime.jsxs)('div', {
                  className: (0, clsx.A)('flex flex-col', 'flex-1', 'min-w-0', 'gap-4'),
                  children: [
                    (0, jsx_runtime.jsx)('div', {
                      className: (0, clsx.A)(constants.kx.CELL.TEXT, constants.kx.CELL.BOLD),
                      children: (0, purchase_utils.Yq)(item.createdAt),
                    }),
                    (0, jsx_runtime.jsx)(ProductLink, {
                      item,
                      className: constants.kx.CELL.TEXT,
                      children: (0, purchase_utils.hy)(item.purchaseItems),
                    }),
                    (0, jsx_runtime.jsx)('div', {
                      children: (0, jsx_runtime.jsx)(PriceText.A, {
                        value: totalPrice,
                        showUnit: !0,
                        className: (0, clsx.A)(constants.kx.CELL.TEXT, constants.kx.CELL.NORMAL),
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime.jsx)('div', {
                  className: (0, clsx.A)('shrink-0', 'flex', 'items-start'),
                  children: (0, jsx_runtime.jsx)(StatusTag.A, {
                    variant: (0, purchase_utils.AT)(item.status),
                  }),
                }),
              ],
            }),
            (0, jsx_runtime.jsx)(ActionButtons, {
              isPending,
              onReject,
              onApprove,
              onCancel,
              purchaseRequestId: item.id,
              variant: 'mobile',
            }),
          ],
        });
      };
      PurchaseRequestItemRowMobile.__docgenInfo = {
        description: '모바일 레이아웃 아이템 행',
        methods: [],
        displayName: 'PurchaseRequestItemRowMobile',
        props: {
          item: { required: !0, tsType: { name: 'PurchaseRequestItem' }, description: '' },
          onReject: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onApprove: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onCancel: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onRowClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
      const PurchaseRequestItemRowDesktop = ({
        item,
        onReject,
        onApprove,
        onCancel,
        onRowClick,
        companyId: _companyId,
      }) => {
        const isPending = 'PENDING' === item.status,
          isUrgent = !0 === item.urgent,
          totalPrice = (0, purchase_utils.mE)(item),
          { handleRowClick, handleRowKeyDown } = usePurchaseRowHandlers(item, onRowClick);
        return (0, jsx_runtime.jsxs)('div', {
          role: 'button',
          tabIndex: 0,
          className: (0, clsx.A)(
            constants.kx.ROW.DESKTOP.BASE,
            constants.kx.ROW.DESKTOP.GAP,
            isUrgent && constants.kx.ROW.DESKTOP.URGENT,
            constants.kx.ROW.DESKTOP.HOVER
          ),
          onClick: (e) => handleRowClick(e),
          onKeyDown: handleRowKeyDown,
          children: [
            (0, jsx_runtime.jsx)('div', {
              className: (0, clsx.A)(
                constants.kx.CELL.DATE.BASE,
                constants.kx.CELL.DATE.TABLET,
                constants.kx.CELL.DATE.DESKTOP
              ),
              children: (0, purchase_utils.Yq)(item.createdAt),
            }),
            (0, jsx_runtime.jsx)(ProductLink, {
              item,
              className: (0, clsx.A)(
                constants.kx.CELL.PRODUCT.BASE,
                constants.kx.CELL.PRODUCT.TABLET,
                constants.kx.CELL.PRODUCT.DESKTOP
              ),
              children: (0, purchase_utils.hy)(item.purchaseItems),
            }),
            (0, jsx_runtime.jsx)('div', {
              className: (0, clsx.A)(
                constants.kx.CELL.PRICE.BASE,
                constants.kx.CELL.PRICE.TABLET,
                constants.kx.CELL.PRICE.DESKTOP
              ),
              children: (0, jsx_runtime.jsx)(PriceText.A, {
                value: totalPrice,
                showUnit: !0,
                className: (0, clsx.A)(constants.kx.CELL.TEXT, constants.kx.CELL.NORMAL),
              }),
            }),
            isPending &&
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  constants.kx.CELL.ACTIONS.BASE,
                  constants.kx.CELL.ACTIONS.TABLET,
                  constants.kx.CELL.ACTIONS.DESKTOP
                ),
                children: (0, jsx_runtime.jsx)(ActionButtons, {
                  isPending,
                  onReject,
                  onApprove,
                  onCancel,
                  purchaseRequestId: item.id,
                  variant: 'desktop',
                }),
              }),
          ],
        });
      };
      PurchaseRequestItemRowDesktop.__docgenInfo = {
        description: '태블릿/데스크탑 레이아웃 아이템 행',
        methods: [],
        displayName: 'PurchaseRequestItemRowDesktop',
        props: {
          item: { required: !0, tsType: { name: 'PurchaseRequestItem' }, description: '' },
          onReject: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onApprove: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onCancel: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onRowClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
      const PurchaseRequestItemListOrg = ({
          purchaseList,
          className,
          onReject,
          onApprove,
          onCancel,
          onRowClick,
          companyId,
        }) =>
          (0, jsx_runtime.jsx)('div', {
            className: (0, clsx.A)('w-full', className),
            children: purchaseList.map((item) =>
              (0, jsx_runtime.jsxs)(
                react.Fragment,
                {
                  children: [
                    (0, jsx_runtime.jsx)('div', {
                      className: 'tablet:hidden',
                      children: (0, jsx_runtime.jsx)(PurchaseRequestItemRowMobile, {
                        item,
                        onReject,
                        onApprove,
                        onCancel,
                        onRowClick,
                        companyId,
                      }),
                    }),
                    (0, jsx_runtime.jsx)('div', {
                      className: 'hidden tablet:block',
                      children: (0, jsx_runtime.jsx)(PurchaseRequestItemRowDesktop, {
                        item,
                        onReject,
                        onApprove,
                        onCancel,
                        onRowClick,
                        companyId,
                      }),
                    }),
                  ],
                },
                item.id
              )
            ),
          }),
        PurchaseRequestItemListOrg_PurchaseRequestItemListOrg = PurchaseRequestItemListOrg;
      PurchaseRequestItemListOrg.__docgenInfo = {
        description: '구매 요청 아이템 리스트 컴포넌트',
        methods: [],
        displayName: 'PurchaseRequestItemListOrg',
        props: {
          purchaseList: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'PurchaseRequestItem' }],
              raw: 'PurchaseRequestItem[]',
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          onReject: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onApprove: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onCancel: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onRowClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(purchaseRequestId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'purchaseRequestId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/purchase/handlers/usePurchaseNavigation.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { b: () => usePurchaseNavigation });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./src/utils/logger.ts'),
        _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__('./src/constants/index.ts');
      const usePurchaseNavigation = (companyId) => {
        const router = (0, next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
        return {
          goHome: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(_constants__WEBPACK_IMPORTED_MODULE_3__.vp.COMPANY_ROOT(companyId));
          }, [companyId, router]),
          goToPurchaseHistory: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(
                _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MANAGER_PURCHASE_HISTORY(companyId)
              );
          }, [companyId, router]),
          goToPurchaseRequests: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(
                _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MANAGER_PURCHASE_REQUESTS(companyId)
              );
          }, [companyId, router]),
          goToMyPurchaseRequests: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId
              ? router.push(
                  _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MY_PURCHASE_REQUESTS(companyId)
                )
              : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                  '[PurchaseNavigation] companyId가 없어서 내 구매 요청 목록으로 이동할 수 없습니다.'
                );
          }, [companyId, router]),
          goToMyPurchaseRequestDetail: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (requestId) => {
              companyId && requestId
                ? router.push(
                    _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MY_PURCHASE_REQUEST_DETAIL(
                      companyId,
                      requestId
                    )
                  )
                : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[PurchaseNavigation] companyId 또는 requestId가 없어서 상세 페이지로 이동할 수 없습니다.'
                  );
            },
            [companyId, router]
          ),
          goToPurchaseRequestDetail: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (requestId) => {
              companyId && requestId
                ? router.push(
                    _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MANAGER_PURCHASE_REQUEST_DETAIL(
                      companyId,
                      requestId
                    )
                  )
                : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[PurchaseNavigation] companyId 또는 requestId가 없어서 상세 페이지로 이동할 수 없습니다.'
                  );
            },
            [companyId, router]
          ),
          goToProducts: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(_constants__WEBPACK_IMPORTED_MODULE_3__.vp.PRODUCTS(companyId));
          }, [companyId, router]),
          goToProductDetail: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (productId) => {
              companyId && productId
                ? router.push(
                    _constants__WEBPACK_IMPORTED_MODULE_3__.vp.PRODUCT_DETAIL(companyId, productId)
                  )
                : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[PurchaseNavigation] companyId 또는 productId가 없어서 상품 상세 페이지로 이동할 수 없습니다.'
                  );
            },
            [companyId, router]
          ),
          goToCart: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId && router.push(_constants__WEBPACK_IMPORTED_MODULE_3__.vp.CART(companyId));
          }, [companyId, router]),
        };
      };
    },
    './src/features/purchase/hooks/usePurchaseNavigationDirect.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { u: () => usePurchaseNavigationDirect });
      var _lib_context_CompanyContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './src/lib/context/CompanyContext.tsx'
        ),
        _handlers_usePurchaseNavigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/features/purchase/handlers/usePurchaseNavigation.ts'
        );
      const usePurchaseNavigationDirect = () => {
        const companyId = (0, _lib_context_CompanyContext__WEBPACK_IMPORTED_MODULE_0__.k)();
        return (0, _handlers_usePurchaseNavigation__WEBPACK_IMPORTED_MODULE_1__.b)(companyId);
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
