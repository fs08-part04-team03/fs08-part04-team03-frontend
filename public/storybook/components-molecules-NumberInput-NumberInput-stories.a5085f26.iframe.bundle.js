'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1091],
  {
    './src/components/atoms/IconButton/IconButton.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { K: () => IconButton });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const variantClass = {
          default: 'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
          outline: 'border border-gray-200 text-gray-900 hover:bg-gray-50 active:bg-gray-100',
          filled: 'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700',
        },
        sizeClass = { sm: 'w-20 h-20 text-xs', md: 'w-32 h-32 text-sm', lg: 'w-36 h-36 text-base' },
        IconButton = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          ({ variant = 'default', size = 'md', className, children, ...props }, ref) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
              ref,
              type: 'button',
              className: (0, clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'inline-flex items-center justify-center rounded-full cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-40 disabled:cursor-not-allowed',
                variantClass[variant],
                sizeClass[size],
                className
              ),
              ...props,
              children,
            })
        );
      ((IconButton.displayName = 'IconButton'),
        (IconButton.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'IconButton',
          props: {
            variant: {
              required: !1,
              tsType: {
                name: 'union',
                raw: "'default' | 'filled' | 'outline'",
                elements: [
                  { name: 'literal', value: "'default'" },
                  { name: 'literal', value: "'filled'" },
                  { name: 'literal', value: "'outline'" },
                ],
              },
              description: '',
              defaultValue: { value: "'default'", computed: !1 },
            },
            size: {
              required: !1,
              tsType: {
                name: 'union',
                raw: "'sm' | 'md' | 'lg'",
                elements: [
                  { name: 'literal', value: "'sm'" },
                  { name: 'literal', value: "'md'" },
                  { name: 'literal', value: "'lg'" },
                ],
              },
              description: '',
              defaultValue: { value: "'md'", computed: !1 },
            },
            children: { required: !0, tsType: { name: 'ReactNode' }, description: '' },
          },
        }));
    },
    './src/components/molecules/NumberInput/NumberInput.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Secondary: () => Secondary,
          SecondaryWithLabel: () => SecondaryWithLabel,
          WithLabel: () => WithLabel,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _NumberInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/molecules/NumberInput/NumberInput.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/NumberInput',
          component: _NumberInput__WEBPACK_IMPORTED_MODULE_2__.Q,
          tags: ['autodocs'],
          parameters: {
            layout: 'centered',
            docs: {
              description: {
                component:
                  '수량을 선택할 수 있는 컴포넌트입니다. 오른쪽의 위/아래 화살표 버튼으로 수량을 조정하거나 직접 입력할 수 있습니다.',
              },
            },
          },
          argTypes: {
            variant: {
              control: 'radio',
              options: ['default', 'secondary'],
              description: 'variant 타입',
            },
            label: { control: 'text', description: '라벨 텍스트' },
            value: { control: 'number', description: '현재 수량 값' },
            min: { control: 'number', description: '최소 수량' },
            max: { control: 'number', description: '최대 수량' },
            onQuantityChange: {
              action: 'quantity-changed',
              description: '수량 변경 시 호출되는 콜백',
            },
          },
        },
        Default = {
          render: (args) => {
            const [quantity, setQuantity] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              args.value ?? 1
            );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _NumberInput__WEBPACK_IMPORTED_MODULE_2__.Q,
              {
                variant: args.variant,
                value: quantity,
                onQuantityChange: (option) => {
                  const numValue = Number(option.key);
                  (Number.isNaN(numValue) || setQuantity(numValue),
                    args.onQuantityChange?.(option));
                },
                min: args.min,
                max: args.max,
                className: args.className,
              }
            );
          },
          args: { variant: 'default', value: 1, min: 1, max: 999 },
        },
        WithLabel = {
          render: (args) => {
            const [quantity, setQuantity] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              args.value ?? 1
            );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _NumberInput__WEBPACK_IMPORTED_MODULE_2__.Q,
              {
                variant: args.variant,
                value: quantity,
                onQuantityChange: (option) => {
                  const numValue = Number(option.key);
                  (Number.isNaN(numValue) || setQuantity(numValue),
                    args.onQuantityChange?.(option));
                },
                label: args.label,
                min: args.min,
                max: args.max,
                className: args.className,
              }
            );
          },
          args: { variant: 'default', value: 1, label: '수량', min: 1, max: 999 },
        },
        Secondary = {
          render: (args) => {
            const [quantity, setQuantity] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              args.value ?? 1
            );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _NumberInput__WEBPACK_IMPORTED_MODULE_2__.Q,
              {
                variant: args.variant,
                value: quantity,
                onQuantityChange: (option) => {
                  const numValue = Number(option.key);
                  (Number.isNaN(numValue) || setQuantity(numValue),
                    args.onQuantityChange?.(option));
                },
                min: args.min,
                max: args.max,
                className: args.className,
              }
            );
          },
          args: { variant: 'secondary', value: 1, min: 1, max: 999 },
        },
        SecondaryWithLabel = {
          render: (args) => {
            const [quantity, setQuantity] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              args.value ?? 1
            );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _NumberInput__WEBPACK_IMPORTED_MODULE_2__.Q,
              {
                variant: args.variant,
                value: quantity,
                onQuantityChange: (option) => {
                  const numValue = Number(option.key);
                  (Number.isNaN(numValue) || setQuantity(numValue),
                    args.onQuantityChange?.(option));
                },
                label: args.label,
                min: args.min,
                max: args.max,
                className: args.className,
              }
            );
          },
          args: { variant: 'secondary', value: 1, label: '수량', min: 1, max: 999 },
        },
        __namedExportsOrder = ['Default', 'WithLabel', 'Secondary', 'SecondaryWithLabel'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: args => {\n    const [quantity, setQuantity] = useState(args.value ?? 1);\n    return <NumberInput variant={args.variant} value={quantity} onQuantityChange={option => {\n      const numValue = Number(option.key);\n      if (!Number.isNaN(numValue)) {\n        setQuantity(numValue);\n      }\n      args.onQuantityChange?.(option);\n    }} min={args.min} max={args.max} className={args.className} />;\n  },\n  args: {\n    variant: 'default',\n    value: 1,\n    min: 1,\n    max: 999\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithLabel.parameters = {
          ...WithLabel.parameters,
          docs: {
            ...WithLabel.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => {\n    const [quantity, setQuantity] = useState(args.value ?? 1);\n    return <NumberInput variant={args.variant} value={quantity} onQuantityChange={option => {\n      const numValue = Number(option.key);\n      if (!Number.isNaN(numValue)) {\n        setQuantity(numValue);\n      }\n      args.onQuantityChange?.(option);\n    }} label={args.label} min={args.min} max={args.max} className={args.className} />;\n  },\n  args: {\n    variant: 'default',\n    value: 1,\n    label: '수량',\n    min: 1,\n    max: 999\n  }\n}",
              ...WithLabel.parameters?.docs?.source,
            },
          },
        }),
        (Secondary.parameters = {
          ...Secondary.parameters,
          docs: {
            ...Secondary.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => {\n    const [quantity, setQuantity] = useState(args.value ?? 1);\n    return <NumberInput variant={args.variant} value={quantity} onQuantityChange={option => {\n      const numValue = Number(option.key);\n      if (!Number.isNaN(numValue)) {\n        setQuantity(numValue);\n      }\n      args.onQuantityChange?.(option);\n    }} min={args.min} max={args.max} className={args.className} />;\n  },\n  args: {\n    variant: 'secondary',\n    value: 1,\n    min: 1,\n    max: 999\n  }\n}",
              ...Secondary.parameters?.docs?.source,
            },
          },
        }),
        (SecondaryWithLabel.parameters = {
          ...SecondaryWithLabel.parameters,
          docs: {
            ...SecondaryWithLabel.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => {\n    const [quantity, setQuantity] = useState(args.value ?? 1);\n    return <NumberInput variant={args.variant} value={quantity} onQuantityChange={option => {\n      const numValue = Number(option.key);\n      if (!Number.isNaN(numValue)) {\n        setQuantity(numValue);\n      }\n      args.onQuantityChange?.(option);\n    }} label={args.label} min={args.min} max={args.max} className={args.className} />;\n  },\n  args: {\n    variant: 'secondary',\n    value: 1,\n    label: '수량',\n    min: 1,\n    max: 999\n  }\n}",
              ...SecondaryWithLabel.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/NumberInput/NumberInput.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { Q: () => NumberInput });
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
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        );
      const NumberInput = ({
        onQuantityChange,
        value,
        defaultValue,
        min = 1,
        max = 999,
        variant = 'default',
        label,
        className,
      }) => {
        const [inputValue, setInputValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
          inputRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
          numericValue = Number(inputValue) || min;
        (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
          setInputValue(
            String(void 0 !== value ? value : void 0 !== defaultValue ? defaultValue : min)
          );
        }, [value, defaultValue, min]);
        const notifyChange = (newValue) => {
            const clampedValue = Math.max(min, Math.min(max, newValue));
            (setInputValue(String(clampedValue)),
              onQuantityChange?.({ key: String(clampedValue), label: `${clampedValue}개` }));
          },
          isSecondary = 'secondary' === variant,
          borderClass = isSecondary ? '' : 'border border-gray-200',
          paddingClass = isSecondary ? 'px-4' : 'px-8',
          sizeClass = isSecondary ? 'w-72 h-40 desktop:w-99 desktop:h-44' : 'w-99 h-44';
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
            'flex items-center gap-16',
            className
          ),
          children: [
            label &&
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className:
                  'text-14 leading-22 tracking--0.35 text-gray-950 whitespace-nowrap shrink-0',
                children: label,
              }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center justify-end rounded-default bg-white transition-colors',
                sizeClass,
                borderClass,
                paddingClass,
                'focus-within:bg-gray-50'
              ),
              role: 'spinbutton',
              'aria-valuemin': min,
              'aria-valuemax': max,
              'aria-valuenow': numericValue,
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
                  ref: inputRef,
                  type: 'number',
                  min,
                  max,
                  value: inputValue,
                  onChange: (e) => {
                    const inputVal = e.target.value;
                    if ('' === inputVal) return void setInputValue('');
                    const parsed = Number(inputVal);
                    if (Number.isNaN(parsed)) return;
                    let next = parsed;
                    (next < min && (next = min),
                      next > max && (next = max),
                      setInputValue(String(next)),
                      notifyChange(next));
                  },
                  onBlur: () => {
                    const numValue = Number(inputValue);
                    Number.isNaN(numValue) || numValue < min
                      ? notifyChange(min)
                      : numValue > max && notifyChange(max);
                  },
                  inputMode: 'decimal',
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'flex-1 bg-transparent px-20 text-14 outline-none text-right',
                    'font-sans font-normal text-16 tracking--0.4 text-gray-950',
                    'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  ),
                  'aria-label': '수량 입력',
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex flex-col shrink-0 gap-0',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                      {
                        size: 'sm',
                        variant: 'default',
                        disabled: numericValue >= max,
                        onClick: () => {
                          const newValue = Math.min(max, numericValue + 1);
                          notifyChange(newValue);
                        },
                        'aria-label': '값 증가',
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                          'transition-transform active:scale-90 rounded-b-none -mb-1 cursor-pointer'
                        ),
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                          {
                            src: '/icons/arrow-up.svg',
                            alt: '값 증가',
                            width: 10,
                            height: 10,
                            style: { width: 'auto', height: 'auto' },
                          }
                        ),
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                      {
                        size: 'sm',
                        variant: 'default',
                        disabled: numericValue <= min,
                        onClick: () => {
                          const newValue = Math.max(min, numericValue - 1);
                          notifyChange(newValue);
                        },
                        'aria-label': '값 감소',
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                          'transition-transform active:scale-90 rounded-t-none -mt-1 cursor-pointer'
                        ),
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                          {
                            src: '/icons/arrow-down.svg',
                            alt: '값 감소',
                            width: 10,
                            height: 10,
                            style: { width: 'auto', height: 'auto' },
                          }
                        ),
                      }
                    ),
                  ],
                }),
              ],
            }),
          ],
        });
      };
      NumberInput.__docgenInfo = {
        description:
          'NumberInput\n\n수량을 선택할 수 있는 컴포넌트\n위/아래 화살표 버튼으로 수량을 조정하거나 직접 입력할 수 있습니다.',
        methods: [],
        displayName: 'NumberInput',
        props: {
          onQuantityChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(option: Option) => void',
              signature: {
                arguments: [{ type: { name: 'Option' }, name: 'option' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          value: { required: !1, tsType: { name: 'number' }, description: '' },
          defaultValue: { required: !1, tsType: { name: 'number' }, description: '' },
          min: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '1', computed: !1 },
          },
          max: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '999', computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'default' | 'secondary'",
              elements: [
                { name: 'literal', value: "'default'" },
                { name: 'literal', value: "'secondary'" },
              ],
            },
            description: '',
            defaultValue: { value: "'default'", computed: !1 },
          },
          label: { required: !1, tsType: { name: 'string' }, description: '' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
  },
]);
