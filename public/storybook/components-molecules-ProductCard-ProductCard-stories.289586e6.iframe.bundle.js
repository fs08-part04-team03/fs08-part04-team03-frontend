'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3799],
  {
    './src/components/molecules/ProductCard/ProductCard.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Product: () => Product,
          Wishlist: () => Wishlist,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/ProductCard',
          component: __webpack_require__('./src/components/molecules/ProductCard/ProductCard.tsx')
            .A,
          tags: ['autodocs'],
          parameters: { layout: 'centered' },
        },
        Product = {
          args: { variant: 'product', name: '코카콜라', price: 3500, purchaseCount: 24 },
        },
        Wishlist = {
          args: { variant: 'wishlist', name: '코카콜라', price: 3500, purchaseCount: 24 },
        },
        __namedExportsOrder = ['Product', 'Wishlist'];
      ((Product.parameters = {
        ...Product.parameters,
        docs: {
          ...Product.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    variant: 'product',\n    name: '코카콜라',\n    price: 3500,\n    purchaseCount: 24\n  }\n}",
            ...Product.parameters?.docs?.source,
          },
        },
      }),
        (Wishlist.parameters = {
          ...Wishlist.parameters,
          docs: {
            ...Wishlist.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'wishlist',\n    name: '코카콜라',\n    price: 3500,\n    purchaseCount: 24\n  }\n}",
              ...Wishlist.parameters?.docs?.source,
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
