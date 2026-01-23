'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9983],
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
    './src/components/molecules/ListSkeletonUI/ListSkeletonUI.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          TenRows: () => TenRows,
          ThreeRows: () => ThreeRows,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/ListSkeletonUI',
          component: __webpack_require__(
            './src/components/molecules/ListSkeletonUI/ListSkeletonUI.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: { layout: 'fullscreen' },
          argTypes: {
            rows: { control: 'number', description: '스켈레톤 행 개수' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = { args: { rows: 5 } },
        ThreeRows = { args: { rows: 3 } },
        TenRows = { args: { rows: 10 } },
        __namedExportsOrder = ['Default', 'ThreeRows', 'TenRows'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    rows: 5\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (ThreeRows.parameters = {
          ...ThreeRows.parameters,
          docs: {
            ...ThreeRows.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    rows: 3\n  }\n}',
              ...ThreeRows.parameters?.docs?.source,
            },
          },
        }),
        (TenRows.parameters = {
          ...TenRows.parameters,
          docs: {
            ...TenRows.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    rows: 10\n  }\n}',
              ...TenRows.parameters?.docs?.source,
            },
          },
        }));
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
  },
]);
