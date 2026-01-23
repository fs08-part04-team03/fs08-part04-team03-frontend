'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6518],
  {
    './src/components/atoms/Button/Button.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => __WEBPACK_DEFAULT_EXPORT__,
        X: () => SignupButton,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const baseClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'inline-flex items-center justify-center',
          'font-bold',
          'cursor-pointer',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary-500',
          'disabled:opacity-40 disabled:cursor-not-allowed'
        ),
        variantClass = {
          primary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-gray-950 text-gray-50',
            'hover:bg-gray-800',
            'rounded-default'
          ),
          secondary: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-white text-gray-900',
            'border border-gray-900',
            'hover:bg-gray-25',
            'rounded-default'
          ),
          signup: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'bg-black text-white',
            'hover:bg-gray-700'
          ),
        },
        inactiveClass = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
          'bg-gray-100 text-gray-300 border border-gray-200',
          'cursor-not-allowed',
          'rounded-default'
        ),
        sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-40 text-13 px-16'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-44 text-14 px-20'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('h-64 text-16 px-24'),
        },
        Button = ({
          variant = 'primary',
          size = 'md',
          fullWidth = !1,
          inactive,
          rightIcon,
          children,
          className,
          type = 'button',
          ...rest
        }) => {
          const isSignup = 'signup' === variant;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
            type,
            disabled: inactive,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              baseClass,
              inactive ? inactiveClass : variantClass[variant],
              !isSignup && size && sizeClass[size],
              isSignup && 'w-160 h-44 text-14 px-20 rounded-100',
              fullWidth && 'w-full',
              className
            ),
            ...rest,
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', { children }),
              rightIcon,
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = Button,
        SignupButton = ({
          inactive,
          rightIcon,
          children,
          className,
          onClick,
          onFocus,
          onBlur,
          id,
          type = 'button',
          'aria-label': ariaLabel,
          fullWidth,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Button, {
            type,
            variant: 'signup',
            inactive,
            rightIcon,
            fullWidth,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('gap-4', className),
            onClick,
            onFocus,
            onBlur,
            id,
            'aria-label': ariaLabel,
            children,
          });
      ((Button.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Button',
        props: {
          type: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'button' | 'submit' | 'reset'",
              elements: [
                { name: 'literal', value: "'button'" },
                { name: 'literal', value: "'submit'" },
                { name: 'literal', value: "'reset'" },
              ],
            },
            description: '',
            defaultValue: { value: "'button'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'primary' | 'secondary' | 'signup'",
              elements: [
                { name: 'literal', value: "'primary'" },
                { name: 'literal', value: "'secondary'" },
                { name: 'literal', value: "'signup'" },
              ],
            },
            description: '',
            defaultValue: { value: "'primary'", computed: !1 },
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
          fullWidth: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          inactive: { required: !1, tsType: { name: 'boolean' }, description: '' },
          rightIcon: { required: !1, tsType: { name: 'ReactNode' }, description: '' },
        },
        composes: ['Omit'],
      }),
        (SignupButton.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'SignupButton',
          props: { type: { defaultValue: { value: "'button'", computed: !1 }, required: !1 } },
        }));
    },
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
    './src/components/molecules/InputField/InputField.tsx'(
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
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _utils_formatBusinessNumber__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/utils/formatBusinessNumber.ts'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        );
      const InputField = ({
          id,
          label,
          placeholder,
          type = 'text',
          value = '',
          onChange,
          onBlur,
          minLength = 8,
          maxLength = 30,
          compareWith,
          disabled,
        }) => {
          const [internal, setInternal] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(value),
            [visible, setVisible] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [touched, setTouched] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            generatedId = (0, react__WEBPACK_IMPORTED_MODULE_1__.useId)(),
            inputId = id ?? generatedId;
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setInternal(value);
          }, [value]);
          let isValid = !0;
          if ('businessNumber' !== type && internal.length > maxLength) isValid = !1;
          else if ('text' !== type || internal.trim()) {
            if ('email' === type) {
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(internal) || (isValid = !1);
            } else if ('password' === type && internal.length < minLength) isValid = !1;
            else if ('passwordConfirm' === type && internal !== compareWith) isValid = !1;
            else if ('businessNumber' === type) {
              /^\d{3}-\d{2}-\d{5}$/.test(internal) || (isValid = !1);
            }
          } else isValid = !1;
          let inputType = 'text';
          'password' === type || 'passwordConfirm' === type
            ? (inputType = visible ? 'text' : 'password')
            : 'email' === type && (inputType = 'email');
          const showToggle = 'password' === type || 'passwordConfirm' === type;
          let autoCompleteValue;
          return (
            'email' === type
              ? (autoCompleteValue = 'email')
              : ('password' !== type && 'passwordConfirm' !== type) ||
                (autoCompleteValue = 'current-password'),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex flex-col w-full',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('label', {
                  htmlFor: inputId,
                  className: 'text-12 text-gray-600 font-normal tracking--0.3 mb-1',
                  children: label,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-1 h-40 w-full',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
                      id: inputId,
                      type: inputType,
                      placeholder,
                      value: internal,
                      onFocus: () => setTouched(!0),
                      onChange: (e) => {
                        let v = e.target.value;
                        ('businessNumber' === type &&
                          (v = (0, _utils_formatBusinessNumber__WEBPACK_IMPORTED_MODULE_4__.b)(v)),
                          setInternal(v),
                          onChange?.(v),
                          setTouched(!0));
                      },
                      onBlur,
                      'aria-invalid': !isValid,
                      maxLength: 'businessNumber' === type ? 12 : void 0,
                      disabled,
                      autoComplete: autoCompleteValue,
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'flex-1 bg-transparent border-none outline-none',
                        'font-suit text-16 font-normal tracking-tight text-gray-950'
                      ),
                    }),
                    showToggle &&
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_2__.K,
                        {
                          variant: 'default',
                          size: 'sm',
                          onClick: () => setVisible((s) => !s),
                          className: 'cursor-pointer',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            next_image__WEBPACK_IMPORTED_MODULE_5__.A,
                            {
                              src: visible ? '/icons/eye.svg' : '/icons/eye-off.svg',
                              alt: visible ? '숨기기' : '보기',
                              width: 16,
                              height: 16,
                            }
                          ),
                        }
                      ),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'w-full border-b mb-4',
                    touched && !isValid ? 'border-error-500' : 'border-gray-600'
                  ),
                }),
              ],
            })
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = InputField;
      InputField.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'InputField',
        props: {
          id: { required: !1, tsType: { name: 'string' }, description: '' },
          label: { required: !0, tsType: { name: 'string' }, description: '' },
          placeholder: { required: !0, tsType: { name: 'string' }, description: '' },
          type: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'text' | 'email' | 'password' | 'passwordConfirm' | 'businessNumber'",
              elements: [
                { name: 'literal', value: "'text'" },
                { name: 'literal', value: "'email'" },
                { name: 'literal', value: "'password'" },
                { name: 'literal', value: "'passwordConfirm'" },
                { name: 'literal', value: "'businessNumber'" },
              ],
            },
            description: '',
            defaultValue: { value: "'text'", computed: !1 },
          },
          value: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(value: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'value' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onBlur: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          minLength: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '8', computed: !1 },
          },
          maxLength: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '30', computed: !1 },
          },
          compareWith: { required: !1, tsType: { name: 'string' }, description: '' },
          disabled: { required: !1, tsType: { name: 'boolean' }, description: '' },
        },
      };
    },
    './src/components/molecules/RHFInputField/RHFInputField.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react_hook_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/react-hook-form/dist/index.esm.mjs'
        ),
        _components_molecules_InputField_InputField__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__('./src/components/molecules/InputField/InputField.tsx'),
        _utils_formatBusinessNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/utils/formatBusinessNumber.ts'
        );
      const RHFInputField = ({
          control,
          name,
          label,
          placeholder,
          type = 'text',
          id,
          minLength,
          maxLength,
          compareWith,
          disabled,
          className,
          errorLines = 2,
          formatAsBusinessNumber = !1,
        }) => {
          const inputId = id ?? `input-${String(name)}`,
            errorSlotClassName =
              1 === errorLines
                ? 'mt-4 h-32 text-14 leading-16 font-normal tracking--0.35 text-error-500 truncate'
                : 'mt-4 h-32 text-14 leading-16 font-normal tracking--0.35 text-error-500 overflow-hidden';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            react_hook_form__WEBPACK_IMPORTED_MODULE_1__.xI,
            {
              control,
              name,
              render: ({ field, fieldState }) =>
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className,
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_molecules_InputField_InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                      {
                        id: inputId,
                        label,
                        placeholder,
                        type,
                        value: field.value ?? '',
                        onChange: (value) => {
                          formatAsBusinessNumber
                            ? field.onChange(
                                (0, _utils_formatBusinessNumber__WEBPACK_IMPORTED_MODULE_3__.b)(
                                  value
                                )
                              )
                            : field.onChange(value);
                        },
                        onBlur: field.onBlur,
                        minLength,
                        maxLength,
                        compareWith,
                        disabled,
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: errorSlotClassName,
                      'aria-live': 'polite',
                      children: fieldState.error?.message ?? ' ',
                    }),
                  ],
                }),
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = RHFInputField;
      RHFInputField.__docgenInfo = {
        description:
          'RHFInputField\n\nReact Hook Form과 Zod를 사용하는 InputField 래퍼 컴포넌트\nInputField를 React Hook Form의 Controller로 감싸서 사용',
        methods: [],
        displayName: 'RHFInputField',
        props: {
          control: {
            required: !0,
            tsType: { name: 'Control', elements: [{ name: 'T' }], raw: 'Control<T>' },
            description: 'React Hook Form의 control 객체',
          },
          name: {
            required: !0,
            tsType: { name: 'FieldPath', elements: [{ name: 'T' }], raw: 'FieldPath<T>' },
            description: '필드 이름 (form의 필드 경로)',
          },
          label: {
            required: !0,
            tsType: { name: 'string' },
            description: 'InputField에 전달할 label',
          },
          placeholder: {
            required: !0,
            tsType: { name: 'string' },
            description: 'InputField에 전달할 placeholder',
          },
          type: {
            required: !1,
            tsType: { name: 'InputFieldType' },
            description: 'InputField 타입',
            defaultValue: { value: "'text'", computed: !1 },
          },
          id: {
            required: !1,
            tsType: { name: 'string' },
            description: 'InputField에 전달할 id (선택사항)',
          },
          minLength: {
            required: !1,
            tsType: { name: 'number' },
            description: 'InputField에 전달할 minLength (선택사항)',
          },
          maxLength: {
            required: !1,
            tsType: { name: 'number' },
            description: 'InputField에 전달할 maxLength (선택사항)',
          },
          compareWith: {
            required: !1,
            tsType: { name: 'string' },
            description: 'passwordConfirm 타입일 때 비교할 값 (선택사항)',
          },
          disabled: {
            required: !1,
            tsType: { name: 'boolean' },
            description: 'InputField를 비활성화할지 여부 (선택사항)',
          },
          className: {
            required: !1,
            tsType: { name: 'string' },
            description: 'wrapper className (선택사항)',
          },
          errorLines: {
            required: !1,
            tsType: {
              name: 'union',
              raw: '1 | 2',
              elements: [
                { name: 'literal', value: '1' },
                { name: 'literal', value: '2' },
              ],
            },
            description:
              '에러 영역 고정 줄 수 (기본 2줄)\n- 1: 한 줄 고정 (truncate)\n- 2: 두 줄 고정 (overflow-hidden)',
            defaultValue: { value: '2', computed: !1 },
          },
          formatAsBusinessNumber: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '사업자 번호 자동 포맷팅 활성화 (선택사항)',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/utils/formatBusinessNumber.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { b: () => formatBusinessNumber });
      const formatBusinessNumber = (value) => {
        const numbers = value.replace(/[^\d]/g, '');
        return numbers.length <= 3
          ? numbers
          : numbers.length <= 5
            ? `${numbers.slice(0, 3)}-${numbers.slice(3)}`
            : `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5)}`;
      };
    },
  },
]);
