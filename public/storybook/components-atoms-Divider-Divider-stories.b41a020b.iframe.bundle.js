'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8566],
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
    './src/components/atoms/Divider/Divider.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Horizontal: () => Horizontal,
          Thick: () => Thick,
          ThickHorizontal: () => ThickHorizontal,
          Thin: () => Thin,
          ThinHorizontal: () => ThinHorizontal,
          Vertical: () => Vertical,
          VerticalThick: () => VerticalThick,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _Divider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/atoms/Divider/Divider.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/Divider',
          component: _Divider__WEBPACK_IMPORTED_MODULE_1__.c,
          tags: ['autodocs'],
          argTypes: {
            variant: { control: 'radio', options: ['thin', 'thick'] },
            orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
          },
        },
        Thin = { args: { variant: 'thin', orientation: 'horizontal' } },
        Thick = { args: { variant: 'thick', orientation: 'horizontal' } },
        Horizontal = { args: { variant: 'thin', orientation: 'horizontal' } },
        Vertical = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex items-center gap-4',
              style: { height: '100px' },
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: 'Left',
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _Divider__WEBPACK_IMPORTED_MODULE_1__.c,
                  { orientation: 'vertical', variant: 'thin' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: 'Right',
                }),
              ],
            }),
        },
        VerticalThick = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex items-center gap-4',
              style: { height: '100px' },
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: 'Left',
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _Divider__WEBPACK_IMPORTED_MODULE_1__.c,
                  { orientation: 'vertical', variant: 'thick' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: 'Right',
                }),
              ],
            }),
        },
        ThinHorizontal = { args: { variant: 'thin', orientation: 'horizontal' } },
        ThickHorizontal = { args: { variant: 'thick', orientation: 'horizontal' } },
        __namedExportsOrder = [
          'Thin',
          'Thick',
          'Horizontal',
          'Vertical',
          'VerticalThick',
          'ThinHorizontal',
          'ThickHorizontal',
        ];
      ((Thin.parameters = {
        ...Thin.parameters,
        docs: {
          ...Thin.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    variant: 'thin',\n    orientation: 'horizontal'\n  }\n}",
            ...Thin.parameters?.docs?.source,
          },
        },
      }),
        (Thick.parameters = {
          ...Thick.parameters,
          docs: {
            ...Thick.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'thick',\n    orientation: 'horizontal'\n  }\n}",
              ...Thick.parameters?.docs?.source,
            },
          },
        }),
        (Horizontal.parameters = {
          ...Horizontal.parameters,
          docs: {
            ...Horizontal.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'thin',\n    orientation: 'horizontal'\n  }\n}",
              ...Horizontal.parameters?.docs?.source,
            },
          },
        }),
        (Vertical.parameters = {
          ...Vertical.parameters,
          docs: {
            ...Vertical.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="flex items-center gap-4" style={{\n    height: \'100px\'\n  }}>\n      <span>Left</span>\n      <Divider orientation="vertical" variant="thin" />\n      <span>Right</span>\n    </div>\n}',
              ...Vertical.parameters?.docs?.source,
            },
          },
        }),
        (VerticalThick.parameters = {
          ...VerticalThick.parameters,
          docs: {
            ...VerticalThick.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="flex items-center gap-4" style={{\n    height: \'100px\'\n  }}>\n      <span>Left</span>\n      <Divider orientation="vertical" variant="thick" />\n      <span>Right</span>\n    </div>\n}',
              ...VerticalThick.parameters?.docs?.source,
            },
          },
        }),
        (ThinHorizontal.parameters = {
          ...ThinHorizontal.parameters,
          docs: {
            ...ThinHorizontal.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'thin',\n    orientation: 'horizontal'\n  }\n}",
              ...ThinHorizontal.parameters?.docs?.source,
            },
          },
        }),
        (ThickHorizontal.parameters = {
          ...ThickHorizontal.parameters,
          docs: {
            ...ThickHorizontal.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'thick',\n    orientation: 'horizontal'\n  }\n}",
              ...ThickHorizontal.parameters?.docs?.source,
            },
          },
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
  },
]);
