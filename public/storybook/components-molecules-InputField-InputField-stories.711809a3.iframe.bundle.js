'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8765],
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
    './src/components/molecules/InputField/InputField.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          BusinessNumberField: () => BusinessNumberField,
          CompanyField: () => CompanyField,
          EmailField: () => EmailField,
          NameField: () => NameField,
          PasswordConfirmField: () => PasswordConfirmField,
          PasswordField: () => PasswordField,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _InputField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/molecules/InputField/InputField.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/InputField',
          component: _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
          tags: ['autodocs'],
        },
        NameField = {
          render: () => {
            const Wrapper = () => {
              const [value, setValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  label: '이름 (기업 담당자)',
                  placeholder: '이름을 입력해주세요.',
                  type: 'text',
                  value,
                  onChange: setValue,
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        EmailField = {
          render: () => {
            const Wrapper = () => {
              const [value, setValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  label: '이메일',
                  placeholder: '이메일을 입력해주세요.',
                  type: 'email',
                  value,
                  onChange: setValue,
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        PasswordField = {
          render: () => {
            const Wrapper = () => {
              const [value, setValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  label: '비밀번호',
                  placeholder: '비밀번호를 입력해주세요.',
                  type: 'password',
                  value,
                  onChange: setValue,
                  minLength: 8,
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        PasswordConfirmField = {
          render: () => {
            const Wrapper = () => {
              const [pw, setPw] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
                [confirm, setConfirm] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex flex-col gap-20',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                    {
                      label: '비밀번호',
                      placeholder: '비밀번호를 입력해주세요.',
                      type: 'password',
                      value: pw,
                      onChange: setPw,
                      minLength: 8,
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                    {
                      label: '비밀번호 확인',
                      placeholder: '비밀번호를 한 번 더 입력해주세요.',
                      type: 'passwordConfirm',
                      value: confirm,
                      onChange: setConfirm,
                      compareWith: pw,
                    }
                  ),
                ],
              });
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        CompanyField = {
          render: () => {
            const Wrapper = () => {
              const [value, setValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  label: '회사명',
                  placeholder: '회사명을 입력해주세요.',
                  type: 'text',
                  value,
                  onChange: setValue,
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        BusinessNumberField = {
          render: () => {
            const Wrapper = () => {
              const [value, setValue] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _InputField__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  label: '사업자 번호',
                  placeholder: '사업자 번호를 입력해주세요.',
                  type: 'businessNumber',
                  value,
                  onChange: setValue,
                }
              );
            };
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper, {});
          },
        },
        __namedExportsOrder = [
          'NameField',
          'EmailField',
          'PasswordField',
          'PasswordConfirmField',
          'CompanyField',
          'BusinessNumberField',
        ];
      ((NameField.parameters = {
        ...NameField.parameters,
        docs: {
          ...NameField.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => {\n    const Wrapper = () => {\n      const [value, setValue] = useState(\'\');\n      return <InputField label="이름 (기업 담당자)" placeholder="이름을 입력해주세요." type="text" value={value} onChange={setValue} />;\n    };\n    return <Wrapper />;\n  }\n}',
            ...NameField.parameters?.docs?.source,
          },
        },
      }),
        (EmailField.parameters = {
          ...EmailField.parameters,
          docs: {
            ...EmailField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const [value, setValue] = useState(\'\');\n      return <InputField label="이메일" placeholder="이메일을 입력해주세요." type="email" value={value} onChange={setValue} />;\n    };\n    return <Wrapper />;\n  }\n}',
              ...EmailField.parameters?.docs?.source,
            },
          },
        }),
        (PasswordField.parameters = {
          ...PasswordField.parameters,
          docs: {
            ...PasswordField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const [value, setValue] = useState(\'\');\n      return <InputField label="비밀번호" placeholder="비밀번호를 입력해주세요." type="password" value={value} onChange={setValue} minLength={8} />;\n    };\n    return <Wrapper />;\n  }\n}',
              ...PasswordField.parameters?.docs?.source,
            },
          },
        }),
        (PasswordConfirmField.parameters = {
          ...PasswordConfirmField.parameters,
          docs: {
            ...PasswordConfirmField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const [pw, setPw] = useState(\'\');\n      const [confirm, setConfirm] = useState(\'\');\n      return <div className="flex flex-col gap-20">\n          <InputField label="비밀번호" placeholder="비밀번호를 입력해주세요." type="password" value={pw} onChange={setPw} minLength={8} />\n          <InputField label="비밀번호 확인" placeholder="비밀번호를 한 번 더 입력해주세요." type="passwordConfirm" value={confirm} onChange={setConfirm} compareWith={pw} />\n        </div>;\n    };\n    return <Wrapper />;\n  }\n}',
              ...PasswordConfirmField.parameters?.docs?.source,
            },
          },
        }),
        (CompanyField.parameters = {
          ...CompanyField.parameters,
          docs: {
            ...CompanyField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const [value, setValue] = useState(\'\');\n      return <InputField label="회사명" placeholder="회사명을 입력해주세요." type="text" value={value} onChange={setValue} />;\n    };\n    return <Wrapper />;\n  }\n}',
              ...CompanyField.parameters?.docs?.source,
            },
          },
        }),
        (BusinessNumberField.parameters = {
          ...BusinessNumberField.parameters,
          docs: {
            ...BusinessNumberField.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => {\n    const Wrapper = () => {\n      const [value, setValue] = useState(\'\');\n      return <InputField label="사업자 번호" placeholder="사업자 번호를 입력해주세요." type="businessNumber" value={value} onChange={setValue} />;\n    };\n    return <Wrapper />;\n  }\n}',
              ...BusinessNumberField.parameters?.docs?.source,
            },
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
