'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7158],
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
    './src/components/atoms/SkeletonUI/SkeletonUI.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Avatar: () => Avatar,
          Card: () => Card,
          Circle: () => Circle,
          Default: () => Default,
          Table: () => Table,
          TextLines: () => TextLines,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/atoms/SkeletonUI/SkeletonUI.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/SkeletonUI/Skeleton',
          component: _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
          tags: ['autodocs'],
          parameters: { layout: 'centered' },
          argTypes: { className: { control: 'text', description: '추가 CSS 클래스' } },
        },
        Default = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
              { className: 'w-200 h-20' }
            ),
        },
        Circle = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
              { className: 'w-48 h-48 rounded-full' }
            ),
        },
        TextLines = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex flex-col gap-8 w-300',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-16 w-full' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-16 w-4/5' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-16 w-3/5' }
                ),
              ],
            }),
        },
        Card = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex flex-col gap-12 w-300',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-150 w-full' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex flex-col gap-8',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                      { className: 'h-20 w-3/4' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                      { className: 'h-16 w-1/2' }
                    ),
                  ],
                }),
              ],
            }),
        },
        Avatar = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex items-center gap-12',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'w-40 h-40 rounded-full' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex flex-col gap-6',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                      { className: 'h-16 w-120' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                      { className: 'h-14 w-80' }
                    ),
                  ],
                }),
              ],
            }),
        },
        Table = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex flex-col gap-8 w-600',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-40 w-full' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-32 w-full' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-32 w-full' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-32 w-full' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SkeletonUI__WEBPACK_IMPORTED_MODULE_1__.K,
                  { className: 'h-32 w-full' }
                ),
              ],
            }),
        },
        __namedExportsOrder = ['Default', 'Circle', 'TextLines', 'Card', 'Avatar', 'Table'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: '{\n  render: () => <SkeletonUI className="w-200 h-20" />\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (Circle.parameters = {
          ...Circle.parameters,
          docs: {
            ...Circle.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <SkeletonUI className="w-48 h-48 rounded-full" />\n}',
              ...Circle.parameters?.docs?.source,
            },
          },
        }),
        (TextLines.parameters = {
          ...TextLines.parameters,
          docs: {
            ...TextLines.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="flex flex-col gap-8 w-300">\n      <SkeletonUI className="h-16 w-full" />\n      <SkeletonUI className="h-16 w-4/5" />\n      <SkeletonUI className="h-16 w-3/5" />\n    </div>\n}',
              ...TextLines.parameters?.docs?.source,
            },
          },
        }),
        (Card.parameters = {
          ...Card.parameters,
          docs: {
            ...Card.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="flex flex-col gap-12 w-300">\n      <SkeletonUI className="h-150 w-full" />\n      <div className="flex flex-col gap-8">\n        <SkeletonUI className="h-20 w-3/4" />\n        <SkeletonUI className="h-16 w-1/2" />\n      </div>\n    </div>\n}',
              ...Card.parameters?.docs?.source,
            },
          },
        }),
        (Avatar.parameters = {
          ...Avatar.parameters,
          docs: {
            ...Avatar.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="flex items-center gap-12">\n      <SkeletonUI className="w-40 h-40 rounded-full" />\n      <div className="flex flex-col gap-6">\n        <SkeletonUI className="h-16 w-120" />\n        <SkeletonUI className="h-14 w-80" />\n      </div>\n    </div>\n}',
              ...Avatar.parameters?.docs?.source,
            },
          },
        }),
        (Table.parameters = {
          ...Table.parameters,
          docs: {
            ...Table.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="flex flex-col gap-8 w-600">\n      <SkeletonUI className="h-40 w-full" />\n      <SkeletonUI className="h-32 w-full" />\n      <SkeletonUI className="h-32 w-full" />\n      <SkeletonUI className="h-32 w-full" />\n      <SkeletonUI className="h-32 w-full" />\n    </div>\n}',
              ...Table.parameters?.docs?.source,
            },
          },
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
  },
]);
