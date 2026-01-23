'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [935],
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
    './node_modules/next/dist/client/use-merged-ref.js'(module, exports, __webpack_require__) {
      (Object.defineProperty(exports, '__esModule', { value: !0 }),
        Object.defineProperty(exports, 'useMergedRef', {
          enumerable: !0,
          get: function () {
            return useMergedRef;
          },
        }));
      const _react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js');
      function useMergedRef(refA, refB) {
        const cleanupA = (0, _react.useRef)(null),
          cleanupB = (0, _react.useRef)(null);
        return (0, _react.useCallback)(
          (current) => {
            if (null === current) {
              const cleanupFnA = cleanupA.current;
              cleanupFnA && ((cleanupA.current = null), cleanupFnA());
              const cleanupFnB = cleanupB.current;
              cleanupFnB && ((cleanupB.current = null), cleanupFnB());
            } else
              (refA && (cleanupA.current = applyRef(refA, current)),
                refB && (cleanupB.current = applyRef(refB, current)));
          },
          [refA, refB]
        );
      }
      function applyRef(refA, current) {
        if ('function' == typeof refA) {
          const cleanup = refA(current);
          return 'function' == typeof cleanup ? cleanup : () => refA(null);
        }
        return (
          (refA.current = current),
          () => {
            refA.current = null;
          }
        );
      }
      ('function' == typeof exports.default ||
        ('object' == typeof exports.default && null !== exports.default)) &&
        void 0 === exports.default.__esModule &&
        (Object.defineProperty(exports.default, '__esModule', { value: !0 }),
        Object.assign(exports.default, exports),
        (module.exports = exports.default));
    },
    './src/components/molecules/Breadcrumb/Breadcrumb.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Beverage: () => Beverage,
          Coffee: () => Coffee,
          FreshFood: () => FreshFood,
          MainCategoryOnly: () => MainCategoryOnly,
          SimpleFood: () => SimpleFood,
          Supplies: () => Supplies,
          WithSubCategory: () => WithSubCategory,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/Breadcrumb',
          component: __webpack_require__('./src/components/molecules/Breadcrumb/Breadcrumb.tsx').A,
          tags: ['autodocs'],
          argTypes: {
            items: { control: 'object', description: '카테고리 계층 아이템 배열' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        MainCategoryOnly = { args: { items: [{ label: '스낵' }] } },
        WithSubCategory = {
          args: { items: [{ label: '스낵', href: '/products?category=1' }, { label: '과자' }] },
        },
        Beverage = {
          args: {
            items: [{ label: '음료', href: '/products?category=2' }, { label: '청량 ∙ 탄산 음료' }],
          },
        },
        SimpleFood = {
          args: { items: [{ label: '간편식', href: '/products?category=4' }, { label: '컵라면' }] },
        },
        FreshFood = {
          args: {
            items: [{ label: '신선식품', href: '/products?category=5' }, { label: '샐러드' }],
          },
        },
        Coffee = {
          args: {
            items: [{ label: '원두커피', href: '/products?category=6' }, { label: '드립커피' }],
          },
        },
        Supplies = {
          args: {
            items: [
              { label: '비품', href: '/products?category=7' },
              { label: '일회용품 (친환경)' },
            ],
          },
        },
        __namedExportsOrder = [
          'MainCategoryOnly',
          'WithSubCategory',
          'Beverage',
          'SimpleFood',
          'FreshFood',
          'Coffee',
          'Supplies',
        ];
      ((MainCategoryOnly.parameters = {
        ...MainCategoryOnly.parameters,
        docs: {
          ...MainCategoryOnly.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    items: [{\n      label: '스낵'\n    }]\n  }\n}",
            ...MainCategoryOnly.parameters?.docs?.source,
          },
        },
      }),
        (WithSubCategory.parameters = {
          ...WithSubCategory.parameters,
          docs: {
            ...WithSubCategory.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: [{\n      label: '스낵',\n      href: '/products?category=1'\n    }, {\n      label: '과자'\n    }]\n  }\n}",
              ...WithSubCategory.parameters?.docs?.source,
            },
          },
        }),
        (Beverage.parameters = {
          ...Beverage.parameters,
          docs: {
            ...Beverage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: [{\n      label: '음료',\n      href: '/products?category=2'\n    }, {\n      label: '청량 ∙ 탄산 음료'\n    }]\n  }\n}",
              ...Beverage.parameters?.docs?.source,
            },
          },
        }),
        (SimpleFood.parameters = {
          ...SimpleFood.parameters,
          docs: {
            ...SimpleFood.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: [{\n      label: '간편식',\n      href: '/products?category=4'\n    }, {\n      label: '컵라면'\n    }]\n  }\n}",
              ...SimpleFood.parameters?.docs?.source,
            },
          },
        }),
        (FreshFood.parameters = {
          ...FreshFood.parameters,
          docs: {
            ...FreshFood.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: [{\n      label: '신선식품',\n      href: '/products?category=5'\n    }, {\n      label: '샐러드'\n    }]\n  }\n}",
              ...FreshFood.parameters?.docs?.source,
            },
          },
        }),
        (Coffee.parameters = {
          ...Coffee.parameters,
          docs: {
            ...Coffee.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: [{\n      label: '원두커피',\n      href: '/products?category=6'\n    }, {\n      label: '드립커피'\n    }]\n  }\n}",
              ...Coffee.parameters?.docs?.source,
            },
          },
        }),
        (Supplies.parameters = {
          ...Supplies.parameters,
          docs: {
            ...Supplies.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    items: [{\n      label: '비품',\n      href: '/products?category=7'\n    }, {\n      label: '일회용품 (친환경)'\n    }]\n  }\n}",
              ...Supplies.parameters?.docs?.source,
            },
          },
        }));
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
  },
]);
