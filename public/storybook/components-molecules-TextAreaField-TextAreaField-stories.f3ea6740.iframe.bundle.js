'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8619],
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
    './src/components/molecules/TextAreaField/TextAreaField.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithoutLabel: () => WithoutLabel,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _TextAreaField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/molecules/TextAreaField/TextAreaField.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/TextAreaField',
          component: _TextAreaField__WEBPACK_IMPORTED_MODULE_2__.A,
          tags: ['autodocs'],
          parameters: { layout: 'padded' },
          argTypes: {
            label: { control: 'text', description: '라벨 텍스트' },
            placeholder: { control: 'text', description: 'placeholder 텍스트' },
            error: { control: 'boolean', description: '에러 상태' },
            disabled: { control: 'boolean', description: '비활성화 상태' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = {
          render: () => {
            const Wrapper = () => {
              const [value, setValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _TextAreaField__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  label: '메시지',
                  placeholder: '메시지를 입력해주세요.',
                  value,
                  onChange: (e) => setValue(e.target.value),
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        WithoutLabel = {
          render: () => {
            const Wrapper = () => {
              const [value, setValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _TextAreaField__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  placeholder: '내용을 입력해주세요.',
                  value,
                  onChange: (e) => setValue(e.target.value),
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        __namedExportsOrder = ['Default', 'WithoutLabel'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => {\n    const Wrapper = () => {\n      const [value, setValue] = useState(\'\');\n      return <TextAreaField label="메시지" placeholder="메시지를 입력해주세요." value={value} onChange={e => setValue(e.target.value)} />;\n    };\n    return <Wrapper />;\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithoutLabel.parameters = {
          ...WithoutLabel.parameters,
          docs: {
            ...WithoutLabel.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const [value, setValue] = useState(\'\');\n      return <TextAreaField placeholder="내용을 입력해주세요." value={value} onChange={e => setValue(e.target.value)} />;\n    };\n    return <Wrapper />;\n  }\n}',
              ...WithoutLabel.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/TextAreaField/TextAreaField.tsx'(
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
      const TextAreaField = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
        ({ label, placeholder, error = !1, className, ...props }, ref) => {
          const uniqueId = (0, react__WEBPACK_IMPORTED_MODULE_1__.useId)(),
            inputId = label ? `textarea-${uniqueId}` : void 0;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('flex flex-col', className),
            children: [
              label &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('label', {
                  htmlFor: inputId,
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                    'text-16 font-bold text-gray-950 tracking-tight mb-1'
                  ),
                  children: label,
                }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('textarea', {
                ref,
                id: inputId,
                placeholder,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'w-full tablet:w-480 h-140',
                  'px-12 py-8',
                  'text-16 tracking-tight',
                  'font-sans font-normal text-gray-950',
                  'border border-gray-300 rounded-default',
                  'bg-transparent',
                  'resize-none',
                  'focus:outline-none focus:border-gray-500',
                  error && 'border-error-500 focus:border-error-500',
                  'placeholder:text-gray-500',
                  'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed'
                ),
                ...props,
              }),
            ],
          });
        }
      );
      TextAreaField.displayName = 'TextAreaField';
      const __WEBPACK_DEFAULT_EXPORT__ = TextAreaField;
      TextAreaField.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'TextAreaField',
        props: {
          label: { required: !1, tsType: { name: 'string' }, description: '' },
          placeholder: { required: !1, tsType: { name: 'string' }, description: '' },
          error: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
  },
]);
