'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [5350],
  {
    './node_modules/clsx/dist/clsx.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      function r(e) {
        var t,
          f,
          n = '';
        if ('string' == typeof e || 'number' == typeof e) n += e;
        else if ('object' == typeof e)
          if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
          } else for (f in e) e[f] && (n && (n += ' '), (n += f));
        return n;
      }
      function clsx() {
        for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
          (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      __webpack_require__.d(__webpack_exports__, {
        $: () => clsx,
        A: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = clsx;
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
    './src/components/molecules/ProductCard/ProductCardSkeleton.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          MultipleProducts: () => MultipleProducts,
          MultipleWishlist: () => MultipleWishlist,
          Order: () => Order,
          Product: () => Product,
          Wishlist: () => Wishlist,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => ProductCardSkeleton_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        SkeletonUI = __webpack_require__('./src/components/atoms/SkeletonUI/SkeletonUI.tsx');
      const ProductCardSkeleton = ({ variant = 'product', className }) => {
          const rootClasses = (0, clsx.A)(
            'flex flex-col overflow-hidden',
            'rounded-default bg-white text-left',
            'shadow-card',
            ('product' === variant || 'order' === variant) &&
              'w-full aspect-[155/241] tablet:aspect-[156/252] desktop:aspect-[367/439]',
            'wishlist' === variant &&
              'w-full aspect-[155/251] tablet:aspect-[219/315] desktop:aspect-[373/445]',
            className
          );
          return (0, jsx_runtime.jsxs)('div', {
            className: rootClasses,
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className: (0, clsx.A)(
                  'relative rounded-default bg-gray-50 flex items-center justify-center overflow-hidden',
                  'w-full aspect-square'
                ),
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: 'relative w-full h-full',
                    children: (0, jsx_runtime.jsx)(SkeletonUI.K, {
                      className: 'absolute inset-0 w-full h-full',
                    }),
                  }),
                  (0, jsx_runtime.jsx)('div', {
                    className:
                      'absolute bottom-10 right-10 w-17 h-17 desktop:bottom-20 desktop:right-20 desktop:w-25 desktop:h-25',
                    children: (0, jsx_runtime.jsx)(SkeletonUI.K, {
                      className: 'w-full h-full rounded-full',
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime.jsx)('div', {
                className: 'flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2',
                children:
                  'product' === variant || 'wishlist' === variant
                    ? (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                          (0, jsx_runtime.jsxs)('div', {
                            className: 'flex flex-col gap-2 desktop:hidden',
                            children: [
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-3/4' }),
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-1/2' }),
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-18 w-1/3' }),
                            ],
                          }),
                          (0, jsx_runtime.jsxs)('div', {
                            className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                            children: [
                              (0, jsx_runtime.jsxs)('div', {
                                className: 'flex flex-row items-center gap-8',
                                children: [
                                  (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-24 w-3/5' }),
                                  (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-1/4' }),
                                ],
                              }),
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-24 w-1/2' }),
                            ],
                          }),
                        ],
                      })
                    : (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                          (0, jsx_runtime.jsxs)('div', {
                            className: 'flex flex-col gap-2 desktop:hidden',
                            children: [
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-3/4' }),
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-1/2' }),
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-18 w-2/5' }),
                            ],
                          }),
                          (0, jsx_runtime.jsxs)('div', {
                            className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                            children: [
                              (0, jsx_runtime.jsxs)('div', {
                                className: 'flex flex-row items-center gap-8',
                                children: [
                                  (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-24 w-3/5' }),
                                  (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-1/3' }),
                                ],
                              }),
                              (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-24 w-1/2' }),
                            ],
                          }),
                        ],
                      }),
              }),
            ],
          });
        },
        ProductCard_ProductCardSkeleton = ProductCardSkeleton;
      ProductCardSkeleton.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProductCardSkeleton',
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
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
      const ProductCardSkeleton_stories = {
          title: 'Molecules/ProductCardSkeleton',
          component: ProductCard_ProductCardSkeleton,
          tags: ['autodocs'],
          parameters: { layout: 'centered' },
          argTypes: {
            variant: {
              control: 'select',
              options: ['product', 'order', 'wishlist'],
              description:
                '카드 타입 (product: 상품 카드, order: 주문 카드, wishlist: 위시리스트 카드)',
            },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Product = { args: { variant: 'product' } },
        Order = { args: { variant: 'order' } },
        Wishlist = { args: { variant: 'wishlist' } },
        MultipleProducts = {
          render: () =>
            (0, jsx_runtime.jsxs)('div', {
              className:
                'grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 gap-x-16 tablet:gap-x-14 desktop:gap-x-40 gap-y-40 tablet:gap-y-50 desktop:gap-y-60',
              children: [
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'product' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'product' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'product' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'product' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'product' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'product' }),
              ],
            }),
        },
        MultipleWishlist = {
          render: () =>
            (0, jsx_runtime.jsxs)('div', {
              className:
                'grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 gap-x-16 tablet:gap-x-14 desktop:gap-x-40 gap-y-40 tablet:gap-y-50 desktop:gap-y-60',
              children: [
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'wishlist' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'wishlist' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'wishlist' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'wishlist' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'wishlist' }),
                (0, jsx_runtime.jsx)(ProductCard_ProductCardSkeleton, { variant: 'wishlist' }),
              ],
            }),
        },
        __namedExportsOrder = [
          'Product',
          'Order',
          'Wishlist',
          'MultipleProducts',
          'MultipleWishlist',
        ];
      ((Product.parameters = {
        ...Product.parameters,
        docs: {
          ...Product.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    variant: 'product'\n  }\n}",
            ...Product.parameters?.docs?.source,
          },
        },
      }),
        (Order.parameters = {
          ...Order.parameters,
          docs: {
            ...Order.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    variant: 'order'\n  }\n}",
              ...Order.parameters?.docs?.source,
            },
          },
        }),
        (Wishlist.parameters = {
          ...Wishlist.parameters,
          docs: {
            ...Wishlist.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    variant: 'wishlist'\n  }\n}",
              ...Wishlist.parameters?.docs?.source,
            },
          },
        }),
        (MultipleProducts.parameters = {
          ...MultipleProducts.parameters,
          docs: {
            ...MultipleProducts.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 gap-x-16 tablet:gap-x-14 desktop:gap-x-40 gap-y-40 tablet:gap-y-50 desktop:gap-y-60">\n      <ProductCardSkeleton variant="product" />\n      <ProductCardSkeleton variant="product" />\n      <ProductCardSkeleton variant="product" />\n      <ProductCardSkeleton variant="product" />\n      <ProductCardSkeleton variant="product" />\n      <ProductCardSkeleton variant="product" />\n    </div>\n}',
              ...MultipleProducts.parameters?.docs?.source,
            },
          },
        }),
        (MultipleWishlist.parameters = {
          ...MultipleWishlist.parameters,
          docs: {
            ...MultipleWishlist.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 gap-x-16 tablet:gap-x-14 desktop:gap-x-40 gap-y-40 tablet:gap-y-50 desktop:gap-y-60">\n      <ProductCardSkeleton variant="wishlist" />\n      <ProductCardSkeleton variant="wishlist" />\n      <ProductCardSkeleton variant="wishlist" />\n      <ProductCardSkeleton variant="wishlist" />\n      <ProductCardSkeleton variant="wishlist" />\n      <ProductCardSkeleton variant="wishlist" />\n    </div>\n}',
              ...MultipleWishlist.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
