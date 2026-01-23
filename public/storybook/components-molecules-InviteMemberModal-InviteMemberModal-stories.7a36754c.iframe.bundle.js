'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4991],
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
    './src/components/atoms/DropDown/DropDown.tsx'(
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
        react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react-dom/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const DropDown = ({
          items,
          placeholder = '선택',
          variant,
          disabled = !1,
          buttonClassName = '',
          dropdownClassName = '',
          optionClassName = '',
          onSelect,
          selected: externalSelected,
          inModal = !1,
        }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [mounted, setMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [selected, setSelected] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              externalSelected ?? null
            ),
            buttonRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            dropdownRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            [position, setPosition] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
              top: 0,
              left: 0,
              width: 0,
            });
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setMounted(!0);
          }, []);
          const handleSelect = (item) => {
            (setSelected(item),
              setOpen(!1),
              queueMicrotask(() => {
                onSelect?.(item);
              }));
          };
          ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setSelected(externalSelected ?? null);
          }, [externalSelected]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open || !buttonRef.current) return;
              const rect = buttonRef.current.getBoundingClientRect();
              setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width,
              });
            }, [open]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open) return;
              const handleClickOutside = (e) => {
                  !dropdownRef.current ||
                    dropdownRef.current.contains(e.target) ||
                    buttonRef.current?.contains(e.target) ||
                    setOpen(!1);
                },
                handleEscape = (e) => {
                  'Escape' === e.key && setOpen(!1);
                };
              return (
                document.addEventListener('mousedown', handleClickOutside),
                document.addEventListener('keydown', handleEscape),
                () => {
                  (document.removeEventListener('mousedown', handleClickOutside),
                    document.removeEventListener('keydown', handleEscape));
                }
              );
            }, [open]));
          const appliedVariant = variant ?? 'small',
            textColorClasses = {
              small: 'text-gray-950',
              medium: 'text-gray-500',
              large: 'text-gray-950',
            },
            fontClasses = 'font-sans font-normal text-13 tracking--0.4',
            optionHeightClasses = { small: 'h-44', medium: 'h-56', large: 'h-44' },
            zIndexClass = inModal ? 'z-[var(--z-modaldropdown)]' : 'z-[var(--z-dropdown)]';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                  ref: buttonRef,
                  type: 'button',
                  onClick: () => !disabled && setOpen((prev) => !prev),
                  disabled,
                  'aria-haspopup': 'listbox',
                  'aria-expanded': open,
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                    'border border-gray-300 rounded-8 bg-white flex items-center justify-between px-12',
                    {
                      small: 'w-110 h-44',
                      medium: 'mobile:w-153 tablet:w-216 desktop:w-216 h-56',
                      large: 'mobile:w-327 tablet:w-480 desktop:w-480 h-44',
                    }[appliedVariant],
                    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                    buttonClassName
                  ),
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        fontClasses,
                        textColorClasses[appliedVariant]
                      ),
                      children: selected ? selected.label : placeholder,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        src: '/icons/arrow-down.svg',
                        alt: '',
                        'aria-hidden': !0,
                        width: 12,
                        height: 12,
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'w-12 h-12 transition-transform duration-200',
                          open && 'rotate-180'
                        ),
                      }
                    ),
                  ],
                }),
                mounted &&
                  open &&
                  (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                      ref: dropdownRef,
                      role: 'listbox',
                      'aria-label': placeholder,
                      style: {
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        width: position.width,
                      },
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        zIndexClass,
                        'bg-white border border-gray-300 shadow-lg rounded-8 max-h-200 overflow-y-auto scrollbar-none',
                        dropdownClassName
                      ),
                      children: items.map((item) =>
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          'li',
                          {
                            role: 'option',
                            'aria-selected': selected?.key === item.key,
                            tabIndex: 0,
                            onClick: () => handleSelect(item),
                            onKeyDown: (e) => {
                              ('Enter' !== e.key && ' ' !== e.key) ||
                                (e.preventDefault(), handleSelect(item));
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'flex items-center px-12 cursor-pointer hover:bg-gray-100',
                              fontClasses,
                              textColorClasses[appliedVariant],
                              optionHeightClasses[appliedVariant],
                              selected?.key === item.key && 'bg-gray-50',
                              optionClassName
                            ),
                            children: item.label,
                          },
                          item.key
                        )
                      ),
                    }),
                    document.body
                  ),
              ],
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = DropDown;
      DropDown.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DropDown',
        props: {
          items: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'Option' }], raw: 'Option[]' },
            description: '',
          },
          placeholder: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'선택'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'small' | 'medium' | 'large'",
              elements: [
                { name: 'literal', value: "'small'" },
                { name: 'literal', value: "'medium'" },
                { name: 'literal', value: "'large'" },
              ],
            },
            description: '',
          },
          disabled: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          buttonClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          dropdownClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          optionClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onSelect: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(item: Option) => void',
              signature: {
                arguments: [{ type: { name: 'Option' }, name: 'item' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          selected: { required: !1, tsType: { name: 'Option' }, description: '' },
          inModal: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
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
    './src/components/molecules/InviteMemberModal/InviteMemberModal.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Closed: () => Closed,
          Default: () => Default,
          Open: () => Open,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => InviteMemberModal_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        InputField = __webpack_require__('./src/components/molecules/InputField/InputField.tsx'),
        DropDown = __webpack_require__('./src/components/atoms/DropDown/DropDown.tsx'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx');
      const roleOptions = [
          { key: 'manager', label: '관리자' },
          { key: 'user', label: '유저' },
        ],
        InviteMemberModal = ({ open, onClose, onSubmit, defaultValues }) => {
          const modalRef = (0, react.useRef)(null),
            [name, setName] = (0, react.useState)(''),
            [email, setEmail] = (0, react.useState)(''),
            [selectedRole, setSelectedRole] = (0, react.useState)(null),
            isEditMode = !!defaultValues;
          (0, react.useEffect)(() => {
            if (!open) return;
            if (defaultValues) {
              (setName(defaultValues.name), setEmail(defaultValues.email));
              const role = roleOptions.find(
                (r) => r.key.toUpperCase() === defaultValues.role.toUpperCase()
              );
              setSelectedRole(role || null);
            } else (setName(''), setEmail(''), setSelectedRole(null));
            const handleKeyDown = (e) => {
              'Escape' === e.key && onClose();
            };
            return (
              window.addEventListener('keydown', handleKeyDown),
              () => window.removeEventListener('keydown', handleKeyDown)
            );
          }, [open, onClose, defaultValues?.name, defaultValues?.email, defaultValues?.role]);
          if (!open) return null;
          const isValid = '' !== name.trim() && '' !== email.trim() && null !== selectedRole;
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)(
              'fixed inset-0 flex items-center justify-center bg-black/60 z-[var(--z-modal)]'
            ),
            'aria-modal': 'true',
            role: 'dialog',
            children: [
              (0, jsx_runtime.jsx)('button', {
                type: 'button',
                'aria-label': 'Close modal',
                onClick: () => {
                  onClose();
                },
                tabIndex: -1,
                className: 'absolute inset-0 w-full h-full bg-transparent',
              }),
              (0, jsx_runtime.jsxs)('div', {
                ref: modalRef,
                className: (0, clsx.A)(
                  'bg-white rounded-16 flex flex-col relative z-[var(--z-modaldropdown)]',
                  'mobile:w-375 mobile:h-812 mobile:px-24 mobile:py-24',
                  'tablet:w-600 tablet:h-470 tablet:px-58 tablet:py-38',
                  'desktop:w-600 desktop:h-470 desktop:px-58 desktop:py-38'
                ),
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className: (0, clsx.A)(
                      'flex justify-center items-center px-16 py-16 mobile:mb-26',
                      'tablet:px-0 tablet:py-0 desktop:px-0 desktop:py-0 tablet:mb-30 desktop:mb-30 h-54'
                    ),
                    children: (0, jsx_runtime.jsx)('span', {
                      className: (0, clsx.A)('text-18 font-bold text-gray-950'),
                      children: isEditMode ? '권한 변경' : '회원 초대',
                    }),
                  }),
                  (0, jsx_runtime.jsxs)('form', {
                    className: 'flex flex-col justify-between flex-1',
                    onSubmit: (e) => {
                      (e.preventDefault(),
                        name.trim() &&
                          email.trim() &&
                          selectedRole &&
                          onSubmit(selectedRole, name, email));
                    },
                    children: [
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'flex flex-col',
                        children: [
                          (0, jsx_runtime.jsx)('div', {
                            className: (0, clsx.A)('mb-18'),
                            children: (0, jsx_runtime.jsx)(InputField.A, {
                              label: '이름',
                              placeholder: '이름을 입력해주세요',
                              type: 'text',
                              value: name,
                              onChange: setName,
                              disabled: isEditMode,
                            }),
                          }),
                          (0, jsx_runtime.jsx)('div', {
                            className: (0, clsx.A)('mb-28'),
                            children: (0, jsx_runtime.jsx)(InputField.A, {
                              label: '이메일',
                              placeholder: '이메일을 입력해주세요',
                              type: 'email',
                              value: email,
                              onChange: setEmail,
                              disabled: isEditMode,
                            }),
                          }),
                          (0, jsx_runtime.jsxs)('div', {
                            className: 'flex flex-col relative z-[var(--z-modaldropdown)]',
                            children: [
                              (0, jsx_runtime.jsx)('span', {
                                className: 'mb-2 text-16 font-bold text-gray-950',
                                children: '권한',
                              }),
                              (0, jsx_runtime.jsx)(DropDown.A, {
                                items: roleOptions,
                                variant: 'large',
                                onSelect: (item) => setSelectedRole(item),
                                buttonClassName: (0, clsx.A)(selectedRole ? '' : 'border-red-500'),
                                selected: selectedRole || void 0,
                                inModal: !0,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: (0, clsx.A)(
                          'flex gap-20 justify-center mt-24 mobile:mb-24 relative z-[var(--z-back)]',
                          'tablet:justify-start desktop:justify-start'
                        ),
                        children: [
                          (0, jsx_runtime.jsx)(Button.A, {
                            variant: 'secondary',
                            size: 'lg',
                            className: (0, clsx.A)(
                              'mobile:w-153.5 mobile:h-64',
                              'tablet:w-230 tablet:h-64',
                              'desktop:w-230 desktop:h-64',
                              'cursor-pointer'
                            ),
                            type: 'button',
                            onClick: onClose,
                            children: '취소',
                          }),
                          (0, jsx_runtime.jsx)(Button.A, {
                            variant: 'primary',
                            size: 'lg',
                            className: (0, clsx.A)(
                              'mobile:w-153.5 mobile:h-64',
                              'tablet:w-230 tablet:h-64',
                              'desktop:w-230 desktop:h-64',
                              'cursor-pointer'
                            ),
                            type: 'submit',
                            inactive: !isValid,
                            children: isEditMode ? '변경하기' : '초대하기',
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        InviteMemberModal_InviteMemberModal = InviteMemberModal;
      InviteMemberModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'InviteMemberModal',
        props: {
          open: { required: !0, tsType: { name: 'boolean' }, description: '' },
          onClose: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onSubmit: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(role: Option, name: string, email: string) => void',
              signature: {
                arguments: [
                  { type: { name: 'Option' }, name: 'role' },
                  { type: { name: 'string' }, name: 'name' },
                  { type: { name: 'string' }, name: 'email' },
                ],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          defaultValues: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  name: string;\n  email: string;\n  role: string;\n}',
              signature: {
                properties: [
                  { key: 'name', value: { name: 'string', required: !0 } },
                  { key: 'email', value: { name: 'string', required: !0 } },
                  { key: 'role', value: { name: 'string', required: !0 } },
                ],
              },
            },
            description: '',
          },
        },
      };
      const InviteMemberModal_stories = {
          title: 'Molecules/Modal/InviteMemberModal',
          component: InviteMemberModal_InviteMemberModal,
          tags: ['autodocs'],
          parameters: { layout: 'centered' },
          args: { open: !0, onClose: () => {}, onSubmit: (_role, _name, _email) => {} },
          argTypes: {
            open: { control: 'boolean', description: '모달 열림 여부' },
            onClose: { action: 'close', description: '닫기 버튼 클릭' },
            onSubmit: { action: 'submit', description: '초대하기 버튼 클릭' },
          },
        },
        Default = {},
        Open = { args: { open: !0 } },
        Closed = { args: { open: !1 } },
        __namedExportsOrder = ['Default', 'Open', 'Closed'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: { originalSource: '{}', ...Default.parameters?.docs?.source },
        },
      }),
        (Open.parameters = {
          ...Open.parameters,
          docs: {
            ...Open.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    open: true\n  }\n}',
              ...Open.parameters?.docs?.source,
            },
          },
        }),
        (Closed.parameters = {
          ...Closed.parameters,
          docs: {
            ...Closed.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    open: false\n  }\n}',
              ...Closed.parameters?.docs?.source,
            },
          },
        }));
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
