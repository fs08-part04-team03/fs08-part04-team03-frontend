'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4498],
  {
    './src/components/atoms/Checkbox/Checkbox.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Checked: () => Checked,
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _Checkbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/Checkbox/Checkbox.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/Checkbox',
          component: _Checkbox__WEBPACK_IMPORTED_MODULE_2__.A,
          tags: ['autodocs'],
          argTypes: {
            checked: { control: 'boolean' },
            disabled: { control: 'boolean' },
            onChange: { action: 'changed' },
            className: { control: 'text' },
            'aria-label': { control: 'text', description: '접근성을 위한 라벨' },
          },
        },
        Default = {
          render: (args) => {
            const [checked, setChecked] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              args.checked ?? !1
            );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _Checkbox__WEBPACK_IMPORTED_MODULE_2__.A,
              {
                checked,
                disabled: args.disabled,
                className: args.className,
                'aria-label': args['aria-label'],
                onChange: (newState) => {
                  (setChecked(newState), args.onChange?.(newState));
                },
              }
            );
          },
          args: { checked: !1, disabled: !1, 'aria-label': '기본 체크박스' },
        },
        Checked = {
          render: (args) => {
            const [checked, setChecked] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              args.checked ?? !0
            );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _Checkbox__WEBPACK_IMPORTED_MODULE_2__.A,
              {
                checked,
                disabled: args.disabled,
                className: args.className,
                'aria-label': args['aria-label'],
                onChange: (newState) => {
                  (setChecked(newState), args.onChange?.(newState));
                },
              }
            );
          },
          args: { checked: !0, disabled: !1, 'aria-label': '체크된 체크박스' },
        },
        __namedExportsOrder = ['Default', 'Checked'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: (args: CheckboxProps) => {\n    const [checked, setChecked] = useState(args.checked ?? false);\n    return <Checkbox checked={checked} disabled={args.disabled} className={args.className} aria-label={args['aria-label']} onChange={newState => {\n      setChecked(newState);\n      args.onChange?.(newState);\n    }} />;\n  },\n  args: {\n    checked: false,\n    disabled: false,\n    'aria-label': '기본 체크박스'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (Checked.parameters = {
          ...Checked.parameters,
          docs: {
            ...Checked.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: (args: CheckboxProps) => {\n    const [checked, setChecked] = useState(args.checked ?? true);\n    return <Checkbox checked={checked} disabled={args.disabled} className={args.className} aria-label={args['aria-label']} onChange={newState => {\n      setChecked(newState);\n      args.onChange?.(newState);\n    }} />;\n  },\n  args: {\n    checked: true,\n    disabled: false,\n    'aria-label': '체크된 체크박스'\n  }\n}",
              ...Checked.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/atoms/Checkbox/Checkbox.tsx'(
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
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        );
      const Checkbox = ({
          checked,
          onChange,
          disabled = !1,
          className = '',
          'aria-label': ariaLabel,
        }) => {
          const id = (0, react__WEBPACK_IMPORTED_MODULE_1__.useId)();
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('label', {
            htmlFor: id,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
              'relative mobile:w-20 mobile:h-20 tablet:w-24 tablet:h-24 flex items-center justify-center rounded-default border transition-colors duration-200',
              checked ? 'bg-gray-950 border-gray-950' : 'bg-white border-gray-950',
              disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
              className
            ),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
                id,
                type: 'checkbox',
                checked,
                onChange: () => {
                  disabled || onChange?.(!checked);
                },
                disabled,
                'aria-label': ariaLabel,
                className: 'sr-only',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'absolute w-16 h-16 flex items-center justify-center transition-transform duration-200 ease-linear',
                  'relative',
                  checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                  { src: '/icons/check.svg', alt: 'check', fill: !0, unoptimized: !0 }
                ),
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = Checkbox;
      Checkbox.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Checkbox',
        props: {
          checked: { required: !0, tsType: { name: 'boolean' }, description: '' },
          onChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(checked: boolean) => void',
              signature: {
                arguments: [{ type: { name: 'boolean' }, name: 'checked' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          disabled: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          className: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          'aria-label': { required: !0, tsType: { name: 'string' }, description: '' },
        },
      };
    },
  },
]);
