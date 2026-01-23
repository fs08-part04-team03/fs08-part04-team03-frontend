'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2118],
  {
    './node_modules/@tanstack/react-query/build/modern/useMutation.js'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { n: () => useMutation });
      var react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        mutation = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/mutation.js'
        ),
        notifyManager = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/notifyManager.js'
        ),
        subscribable = __webpack_require__(
          './node_modules/@tanstack/query-core/build/modern/subscribable.js'
        ),
        utils = __webpack_require__('./node_modules/@tanstack/query-core/build/modern/utils.js'),
        MutationObserver = class extends subscribable.Q {
          #client;
          #currentResult = void 0;
          #currentMutation;
          #mutateOptions;
          constructor(client, options) {
            (super(),
              (this.#client = client),
              this.setOptions(options),
              this.bindMethods(),
              this.#updateResult());
          }
          bindMethods() {
            ((this.mutate = this.mutate.bind(this)), (this.reset = this.reset.bind(this)));
          }
          setOptions(options) {
            const prevOptions = this.options;
            ((this.options = this.#client.defaultMutationOptions(options)),
              (0, utils.f8)(this.options, prevOptions) ||
                this.#client
                  .getMutationCache()
                  .notify({
                    type: 'observerOptionsUpdated',
                    mutation: this.#currentMutation,
                    observer: this,
                  }),
              prevOptions?.mutationKey &&
              this.options.mutationKey &&
              (0, utils.EN)(prevOptions.mutationKey) !== (0, utils.EN)(this.options.mutationKey)
                ? this.reset()
                : 'pending' === this.#currentMutation?.state.status &&
                  this.#currentMutation.setOptions(this.options));
          }
          onUnsubscribe() {
            this.hasListeners() || this.#currentMutation?.removeObserver(this);
          }
          onMutationUpdate(action) {
            (this.#updateResult(), this.#notify(action));
          }
          getCurrentResult() {
            return this.#currentResult;
          }
          reset() {
            (this.#currentMutation?.removeObserver(this),
              (this.#currentMutation = void 0),
              this.#updateResult(),
              this.#notify());
          }
          mutate(variables, options) {
            return (
              (this.#mutateOptions = options),
              this.#currentMutation?.removeObserver(this),
              (this.#currentMutation = this.#client
                .getMutationCache()
                .build(this.#client, this.options)),
              this.#currentMutation.addObserver(this),
              this.#currentMutation.execute(variables)
            );
          }
          #updateResult() {
            const state = this.#currentMutation?.state ?? (0, mutation.$)();
            this.#currentResult = {
              ...state,
              isPending: 'pending' === state.status,
              isSuccess: 'success' === state.status,
              isError: 'error' === state.status,
              isIdle: 'idle' === state.status,
              mutate: this.mutate,
              reset: this.reset,
            };
          }
          #notify(action) {
            notifyManager.jG.batch(() => {
              if (this.#mutateOptions && this.hasListeners()) {
                const variables = this.#currentResult.variables,
                  onMutateResult = this.#currentResult.context,
                  context = {
                    client: this.#client,
                    meta: this.options.meta,
                    mutationKey: this.options.mutationKey,
                  };
                if ('success' === action?.type) {
                  try {
                    this.#mutateOptions.onSuccess?.(
                      action.data,
                      variables,
                      onMutateResult,
                      context
                    );
                  } catch (e) {
                    Promise.reject(e);
                  }
                  try {
                    this.#mutateOptions.onSettled?.(
                      action.data,
                      null,
                      variables,
                      onMutateResult,
                      context
                    );
                  } catch (e) {
                    Promise.reject(e);
                  }
                } else if ('error' === action?.type) {
                  try {
                    this.#mutateOptions.onError?.(action.error, variables, onMutateResult, context);
                  } catch (e) {
                    Promise.reject(e);
                  }
                  try {
                    this.#mutateOptions.onSettled?.(
                      void 0,
                      action.error,
                      variables,
                      onMutateResult,
                      context
                    );
                  } catch (e) {
                    Promise.reject(e);
                  }
                }
              }
              this.listeners.forEach((listener) => {
                listener(this.#currentResult);
              });
            });
          }
        },
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        );
      function useMutation(options, queryClient) {
        const client = (0, QueryClientProvider.jE)(queryClient),
          [observer] = react.useState(() => new MutationObserver(client, options));
        react.useEffect(() => {
          observer.setOptions(options);
        }, [observer, options]);
        const result = react.useSyncExternalStore(
            react.useCallback(
              (onStoreChange) => observer.subscribe(notifyManager.jG.batchCalls(onStoreChange)),
              [observer]
            ),
            () => observer.getCurrentResult(),
            () => observer.getCurrentResult()
          ),
          mutate = react.useCallback(
            (variables, mutateOptions) => {
              observer.mutate(variables, mutateOptions).catch(utils.lQ);
            },
            [observer]
          );
        if (result.error && (0, utils.GU)(observer.options.throwOnError, [result.error]))
          throw result.error;
        return { ...result, mutate, mutateAsync: result.mutate };
      }
    },
    './node_modules/zustand/esm/react.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { v: () => create });
      var react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js');
      const createStoreImpl = (createState) => {
          let state;
          const listeners = new Set(),
            setState = (partial, replace) => {
              const nextState = 'function' == typeof partial ? partial(state) : partial;
              if (!Object.is(nextState, state)) {
                const previousState = state;
                ((state = (
                  null != replace ? replace : 'object' != typeof nextState || null === nextState
                )
                  ? nextState
                  : Object.assign({}, state, nextState)),
                  listeners.forEach((listener) => listener(state, previousState)));
              }
            },
            getState = () => state,
            api = {
              setState,
              getState,
              getInitialState: () => initialState,
              subscribe: (listener) => (listeners.add(listener), () => listeners.delete(listener)),
            },
            initialState = (state = createState(setState, getState, api));
          return api;
        },
        identity = (arg) => arg;
      const createImpl = (createState) => {
          const api = ((createState) =>
              createState ? createStoreImpl(createState) : createStoreImpl)(createState),
            useBoundStore = (selector) =>
              (function useStore(api, selector = identity) {
                const slice = react.useSyncExternalStore(
                  api.subscribe,
                  react.useCallback(() => selector(api.getState()), [api, selector]),
                  react.useCallback(() => selector(api.getInitialState()), [api, selector])
                );
                return (react.useDebugValue(slice), slice);
              })(api, selector);
          return (Object.assign(useBoundStore, api), useBoundStore);
        },
        create = (createState) => (createState ? createImpl(createState) : createImpl);
    },
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
    './src/components/atoms/Input/Input.tsx'(
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
      const Input = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
        ({ className, type = 'text', placeholder, error = !1, ...props }, ref) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
            ref,
            type,
            placeholder,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
              'text-16 tracking--0.4',
              'py-8 bg-transparent',
              'border-b',
              error ? 'border-error-500' : 'border-gray-600',
              'text-gray-950 placeholder:text-gray-500',
              'focus:outline-none',
              error ? 'focus:border-error-500' : 'focus:border-gray-950',
              'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed',
              'w-full',
              className
            ),
            ...props,
          })
      );
      Input.displayName = 'Input';
      const __WEBPACK_DEFAULT_EXPORT__ = Input;
      Input.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Input',
        props: {
          placeholder: { required: !1, tsType: { name: 'string' }, description: '' },
          error: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          type: { defaultValue: { value: "'text'", computed: !1 }, required: !1 },
        },
        composes: ['Omit'],
      };
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
    './src/components/molecules/PaginationBlock/PaginationBlock.tsx'(
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
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const PaginationBlock = ({ current, total, onPrev, onNext }) => {
          const [page, setPage] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(current);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            const safeTotal = Math.max(1, total),
              safeCurrent = Math.min(Math.max(1, current), safeTotal);
            setPage(safeCurrent);
          }, [current, total]);
          const isPrevEnd = 1 === page,
            isNextEnd = page === total;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex items-center justify-between h-40 w-327 tablet:w-696 desktop:w-1400 mb-140',
            role: 'navigation',
            'aria-label': '페이지네이션',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'text-gray-primary-500 text-16 tracking-tight font-suit',
                children: [page, ' of ', total],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-30',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page > 1) {
                          const newPage = page - 1;
                          (setPage(newPage), onPrev?.(newPage));
                        }
                      },
                      inactive: isPrevEnd,
                      'aria-label': '이전 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isPrevEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-left.svg',
                                alt: '이전 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isPrevEnd,
                              'text-gray-primary-500': !isPrevEnd,
                            }),
                            children: 'Prev',
                          }),
                        ],
                      }),
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page < total) {
                          const newPage = page + 1;
                          (setPage(newPage), onNext?.(newPage));
                        }
                      },
                      inactive: isNextEnd,
                      'aria-label': '다음 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isNextEnd,
                              'text-gray-950': !isNextEnd,
                            }),
                            children: 'Next',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isNextEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-right.svg',
                                alt: '다음 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                        ],
                      }),
                    }
                  ),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PaginationBlock;
      PaginationBlock.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PaginationBlock',
        props: {
          current: { required: !0, tsType: { name: 'number' }, description: '' },
          total: { required: !0, tsType: { name: 'number' }, description: '' },
          onPrev: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onNext: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
    './src/components/molecules/SearchBar/SearchBar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => SearchBar_SearchBar });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      var Input = __webpack_require__('./src/components/atoms/Input/Input.tsx'),
        IconButton = __webpack_require__('./src/components/atoms/IconButton/IconButton.tsx');
      const SearchBar = ({
          onSearch,
          defaultValue = '',
          className,
          instant = !1,
          debounceDelay = 300,
          ...inputProps
        }) => {
          const [query, setQuery] = (0, react.useState)(String(defaultValue)),
            debouncedQuery = (function useDebounce(value, delay) {
              const [debouncedValue, setDebouncedValue] = (0, react.useState)(value);
              return (
                (0, react.useEffect)(() => {
                  const timer = setTimeout(() => {
                    setDebouncedValue(value);
                  }, delay);
                  return () => {
                    clearTimeout(timer);
                  };
                }, [value, delay]),
                debouncedValue
              );
            })(query, debounceDelay),
            onSearchRef = (0, react.useRef)(onSearch);
          ((0, react.useEffect)(() => {
            onSearchRef.current = onSearch;
          }, [onSearch]),
            (0, react.useEffect)(() => {
              setQuery(String(defaultValue));
            }, [defaultValue]),
            (0, react.useEffect)(() => {
              instant && onSearchRef.current && onSearchRef.current(debouncedQuery.trim());
            }, [debouncedQuery, instant]));
          const handleSubmit = (e) => {
            (e?.preventDefault(), onSearch && onSearch(query.trim()));
          };
          return (0, jsx_runtime.jsx)('form', {
            onSubmit: handleSubmit,
            className: (0, clsx.A)('relative w-full', className),
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'relative flex items-center',
              children: [
                (0, jsx_runtime.jsx)('div', {
                  className: 'absolute left-1 bottom-10 drop-shadow-sm',
                  children: (0, jsx_runtime.jsx)(IconButton.K, {
                    variant: 'default',
                    size: 'md',
                    'aria-label': '검색',
                    onClick: () => handleSubmit(),
                    children: (0, jsx_runtime.jsx)(next_image.A, {
                      src: '/icons/search-icon.svg',
                      alt: 'Search',
                      width: 24,
                      height: 24,
                      unoptimized: !0,
                    }),
                  }),
                }),
                (0, jsx_runtime.jsx)(Input.A, {
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: '이름으로 검색하세요',
                  className: (0, clsx.A)(
                    'pl-50 pr-16 border-gray-300 focus:border-gray-500',
                    className
                  ),
                  ...inputProps,
                }),
              ],
            }),
          });
        },
        SearchBar_SearchBar = SearchBar;
      SearchBar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'SearchBar',
        props: {
          onSearch: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(query: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'query' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          defaultValue: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          instant: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          debounceDelay: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '300', computed: !1 },
          },
        },
        composes: ['Omit'],
      };
    },
    './src/components/molecules/StatusNotice/StatusNotice.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const StatusNotice = ({
          icon = '/icons/book.svg',
          title,
          description,
          buttonText = '',
          onButtonClick,
          hideButton = !1,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'mobile:w-375 mobile:min-h-300 mobile:px-24 mobile:flex mobile:flex-col mobile:items-center',
              'tablet:w-310 tablet:min-h-336 tablet:px-0'
            ),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'flex items-center justify-center rounded-full bg-gray-25',
                  'px-32 pt-30 pb-27',
                  'mobile:mt-30 mobile:mb-41',
                  'tablet:mb-50'
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_1__.A,
                  { src: icon, alt: '', width: 36, height: 43, className: 'object-contain' }
                ),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'mobile:text-gray-primary-950 mobile:text-18 mobile:font-extrabold mobile:tracking--0.45 mobile:text-center mobile:mb-10',
                  'tablet:text-gray-primary-950 tablet:text-24 tablet:font-extrabold tablet:tracking--0.6 tablet:text-center tablet:mb-12'
                ),
                children: title,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'mobile:text-gray-primary-800 mobile:text-14 mobile:font-normal mobile:tracking--0.35 mobile:leading-160 mobile:whitespace-pre-line mobile:text-center mobile:mb-40',
                  'tablet:text-gray-primary-800 tablet:text-16 tablet:font-normal tablet:tracking--0.4 tablet:leading-160 tablet:text-center tablet:mb-48'
                ),
                children: description,
              }),
              !hideButton &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    size: 'lg',
                    variant: 'primary',
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'mobile:w-327 mobile:h-64 mobile:cursor-pointer',
                      'tablet:w-310 tablet:h-64 tablet:cursor-pointer'
                    ),
                    onClick: onButtonClick,
                    children: buttonText,
                  }
                ),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = StatusNotice;
      StatusNotice.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'StatusNotice',
        props: {
          icon: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/icons/book.svg'", computed: !1 },
          },
          title: { required: !0, tsType: { name: 'string' }, description: '' },
          description: { required: !0, tsType: { name: 'string' }, description: '' },
          buttonText: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onButtonClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          hideButton: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/components/organisms/CategoryPanel/CategoryPanel.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { x: () => CategoryPanel });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const CategoryPanelMobile = ({
          sections,
          activeSectionId,
          selectedValue,
          onChange,
          className,
        }) => {
          const activeSection = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
            if (!sections?.length) return null;
            if (null != activeSectionId)
              return sections.find((s) => s.id === activeSectionId) ?? sections[0];
            if (null != selectedValue) {
              const found = sections.find((s) => s.options.some((o) => o.value === selectedValue));
              if (found) return found;
            }
            return sections[0];
          }, [sections, activeSectionId, selectedValue]);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!activeSection) return;
            if (null == activeSectionId) return;
            if (!onChange) return;
            if (null == selectedValue) return;
            activeSection.options.some((o) => o.value === selectedValue) || onChange(null);
          }, [activeSection, activeSectionId, selectedValue, onChange]);
          return activeSection
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('section', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'w-full bg-white tablet:hidden',
                  'flex flex-col',
                  className
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                    'w-full overflow-x-auto border-b border-gray-200',
                    'scroll-smooth scrollbar-none'
                  ),
                  style: { WebkitOverflowScrolling: 'touch' },
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                      'flex min-w-max px-16'
                    ),
                    children: activeSection.options.map((option) => {
                      const isActive = selectedValue === option.value;
                      return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        'button',
                        {
                          type: 'button',
                          onClick: () => {
                            return (
                              (value = option.value),
                              void (onChange && onChange(selectedValue === value ? null : value))
                            );
                            var value;
                          },
                          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                            'px-16 py-14 whitespace-nowrap',
                            'text-14 transition-colors duration-150',
                            isActive
                              ? 'text-gray-950 font-bold'
                              : 'text-gray-500 font-normal hover:text-gray-700',
                            'cursor-pointer'
                          ),
                          'aria-pressed': isActive,
                          children: option.label,
                        },
                        option.value
                      );
                    }),
                  }),
                }),
              })
            : null;
        },
        CategoryPanelTablet = ({ sections, selectedValue, onChange, className }) => {
          const [openSectionId, setOpenSectionId] = (0,
          react__WEBPACK_IMPORTED_MODULE_1__.useState)(
            (selectedValue
              ? sections.find((section) =>
                  section.options.some((option) => option.value === selectedValue)
                )
              : null
            )?.id ?? null
          );
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!selectedValue) return;
            const foundSection = sections.find((s) =>
              s.options.some((option) => option.value === selectedValue)
            );
            foundSection && setOpenSectionId(foundSection.id);
          }, [selectedValue, sections]);
          return sections?.length
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'hidden tablet:flex desktop:hidden w-180 bg-white',
                  'flex flex-col',
                  className
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className:
                      'mb-10 text-18 font-suit font-bold text-gray-primary-950 tracking-[-0.45px]',
                    children: '카테고리',
                  }),
                  sections.map((section) => {
                    const isOpen = openSectionId === section.id;
                    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      'div',
                      {
                        className: 'flex flex-col',
                        children: [
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-0.5 bg-gray-900',
                            }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                            type: 'button',
                            onClick: () => {
                              return (
                                (id = section.id),
                                void setOpenSectionId((prev) => (prev === id ? null : id))
                              );
                              var id;
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'w-full p-14',
                              'flex items-center justify-between',
                              'transition-colors duration-150',
                              'text-left',
                              'cursor-pointer'
                            ),
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'text-16 text-gray-900',
                                  isOpen ? 'font-bold' : 'font-normal'
                                ),
                                children: section.title,
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'inline-flex items-center justify-center transform transition-transform duration-200 ease-out text-gray-400 shrink-0 ml-2',
                                  isOpen ? 'rotate-180' : 'rotate-0'
                                ),
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'svg',
                                  {
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    'aria-hidden': !0,
                                    children: (0,
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                                      d: 'M6 9L12 15L18 9',
                                      stroke: 'currentColor',
                                      strokeWidth: '2',
                                      strokeLinecap: 'round',
                                      strokeLinejoin: 'round',
                                    }),
                                  }
                                ),
                              }),
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'overflow-hidden',
                              'transition-all duration-200 ease-out',
                              isOpen
                                ? 'max-h-500 opacity-100 translate-y-0'
                                : 'max-h-0 opacity-0 -translate-y-2'
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'div',
                              {
                                className: 'p-14',
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'ul',
                                  {
                                    className: 'flex flex-col',
                                    children: section.options.map((option) => {
                                      const isActive = selectedValue === option.value;
                                      return (0,
                                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                        'li',
                                        {
                                          children: (0,
                                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                            'button',
                                            {
                                              type: 'button',
                                              onClick: () =>
                                                ((value) => {
                                                  if (!onChange) return;
                                                  if (selectedValue === value)
                                                    return void onChange(null);
                                                  onChange(value);
                                                  const sectionWithOption = sections.find((s) =>
                                                    s.options.some(
                                                      (option) => option.value === value
                                                    )
                                                  );
                                                  sectionWithOption &&
                                                    setOpenSectionId(sectionWithOption.id);
                                                })(option.value),
                                              className: (0,
                                              _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                                'w-full text-left py-14 px-20',
                                                'text-16 transition-colors duration-150',
                                                isActive
                                                  ? 'text-gray-950 font-normal'
                                                  : 'text-gray-500 font-normal hover:text-gray-700',
                                                'cursor-pointer'
                                              ),
                                              'aria-pressed': isActive,
                                              children: option.label,
                                            }
                                          ),
                                        },
                                        option.value
                                      );
                                    }),
                                  }
                                ),
                              }
                            ),
                          }),
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-px bg-gray-100 mt-2',
                            }),
                        ],
                      },
                      section.id
                    );
                  }),
                ],
              })
            : null;
        },
        CategoryPanelDesktop = ({ sections = [], selectedValue, onChange, className }) => {
          const [openSectionId, setOpenSectionId] = (0,
          react__WEBPACK_IMPORTED_MODULE_1__.useState)(
            (selectedValue
              ? sections.find((section) =>
                  section.options.some((option) => option.value === selectedValue)
                )
              : null
            )?.id ?? null
          );
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!selectedValue) return;
            const foundSection = sections.find((s) =>
              s.options.some((option) => option.value === selectedValue)
            );
            foundSection && setOpenSectionId(foundSection.id);
          }, [selectedValue, sections]);
          return sections.length
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'hidden desktop:flex w-180 bg-white',
                  'flex flex-col',
                  className
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className:
                      'mb-10 text-18 font-suit font-bold text-gray-primary-950 tracking-[-0.45px]',
                    children: '카테고리',
                  }),
                  sections.map((section) => {
                    const isOpen = openSectionId === section.id;
                    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      'div',
                      {
                        className: 'flex flex-col',
                        children: [
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-0.5 bg-gray-900',
                            }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                            type: 'button',
                            onClick: () => {
                              return (
                                (id = section.id),
                                void setOpenSectionId((prev) => (prev === id ? null : id))
                              );
                              var id;
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'w-full p-14',
                              'flex items-center justify-between',
                              'transition-colors duration-150',
                              'text-left',
                              'cursor-pointer'
                            ),
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'text-16 text-gray-900',
                                  isOpen ? 'font-bold' : 'font-normal'
                                ),
                                children: section.title,
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'inline-flex items-center justify-center transform transition-transform duration-200 ease-out text-gray-400 shrink-0 ml-2',
                                  isOpen ? 'rotate-180' : 'rotate-0'
                                ),
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'svg',
                                  {
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    'aria-hidden': !0,
                                    children: (0,
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                                      d: 'M6 9L12 15L18 9',
                                      stroke: 'currentColor',
                                      strokeWidth: '2',
                                      strokeLinecap: 'round',
                                      strokeLinejoin: 'round',
                                    }),
                                  }
                                ),
                              }),
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'overflow-hidden',
                              'transition-all duration-200 ease-out',
                              isOpen
                                ? 'max-h-500 opacity-100 translate-y-0'
                                : 'max-h-0 opacity-0 -translate-y-2'
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'div',
                              {
                                className: 'p-14',
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'ul',
                                  {
                                    className: 'flex flex-col',
                                    children: section.options.map((option) => {
                                      const isActive = selectedValue === option.value;
                                      return (0,
                                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                        'li',
                                        {
                                          children: (0,
                                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                            'button',
                                            {
                                              type: 'button',
                                              onClick: () =>
                                                ((value) => {
                                                  if (!onChange) return;
                                                  if (selectedValue === value)
                                                    return void onChange(null);
                                                  onChange(value);
                                                  const sectionWithOption = sections.find((s) =>
                                                    s.options.some(
                                                      (option) => option.value === value
                                                    )
                                                  );
                                                  sectionWithOption &&
                                                    setOpenSectionId(sectionWithOption.id);
                                                })(option.value),
                                              className: (0,
                                              _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                                'w-full text-left py-14 px-20',
                                                'text-16 transition-colors duration-150',
                                                isActive
                                                  ? 'text-gray-950 font-normal'
                                                  : 'text-gray-500 font-normal hover:text-gray-700',
                                                'cursor-pointer'
                                              ),
                                              'aria-pressed': isActive,
                                              children: option.label,
                                            }
                                          ),
                                        },
                                        option.value
                                      );
                                    }),
                                  }
                                ),
                              }
                            ),
                          }),
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-px bg-gray-100 mt-2',
                            }),
                        ],
                      },
                      section.id
                    );
                  }),
                ],
              })
            : null;
        },
        CategoryPanel = ({ sections, activeSectionId, selectedValue, onChange, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelMobile, {
                  sections,
                  activeSectionId,
                  selectedValue,
                  onChange,
                  className,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelTablet, {
                  sections,
                  selectedValue,
                  onChange,
                  className,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelDesktop, {
                  sections,
                  selectedValue,
                  onChange,
                  className,
                }),
              ],
            }
          );
      CategoryPanel.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'CategoryPanel',
        props: {
          sections: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'CategoryPanelSection' }],
              raw: 'CategoryPanelSection[]',
            },
            description: '',
          },
          activeSectionId: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'number | null',
              elements: [{ name: 'number' }, { name: 'null' }],
            },
            description: '(모바일) GNB에서 선택된 대분류(ParentCategory) id',
          },
          selectedValue: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'number | null',
              elements: [{ name: 'number' }, { name: 'null' }],
            },
            description: '현재 선택된 카테고리 (단일 선택) - ChildCategory id',
          },
          onChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(value: number | null) => void',
              signature: {
                arguments: [
                  {
                    type: {
                      name: 'union',
                      raw: 'number | null',
                      elements: [{ name: 'number' }, { name: 'null' }],
                    },
                    name: 'value',
                  },
                ],
                return: { name: 'void' },
              },
            },
            description: '옵션 클릭 시 callback (토글 포함)',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/products/template/ProductListTem/ProductListTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Empty: () => Empty,
          ManyProducts: () => ManyProducts,
          SinglePage: () => SinglePage,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => ProductListTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        CategoryPanel = __webpack_require__(
          './src/components/organisms/CategoryPanel/CategoryPanel.tsx'
        ),
        Breadcrumb = __webpack_require__('./src/components/molecules/Breadcrumb/Breadcrumb.tsx'),
        DropDown = __webpack_require__('./src/components/atoms/DropDown/DropDown.tsx');
      const PRODUCT_LIST_ITEMS_PER_PAGE_MOBILE = 4,
        PRODUCT_LIST_ITEMS_PER_PAGE_TABLET = 6,
        PRODUCT_LIST_ITEMS_PER_PAGE_DESKTOP = 9,
        PRODUCT_LIST_BREAKPOINTS_TABLET = '(min-width: 768px)',
        PRODUCT_LIST_BREAKPOINTS_DESKTOP = '(min-width: 1024px)',
        PRODUCT_LIST_STYLES_BUTTON = {
          BASE: 'flex items-center justify-center gap-6',
          HEIGHT: 'h-44',
          PADDING: 'px-16',
          ROUNDED: 'rounded-4',
          BACKGROUND: 'bg-[#222]',
          TEXT: 'text-white',
          FONT: 'font-semibold text-[14px] tracking--0.35',
          SHADOW: 'shadow-[0_4px_6px_rgba(0,0,0,0.02)]',
          BACKDROP: 'backdrop-blur-[15px]',
          CURSOR: 'cursor-pointer',
        },
        PRODUCT_LIST_STYLES_GRID = {
          BASE: 'grid',
          COLUMNS: 'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
          GAP_X: 'desktop:gap-x-40 tablet:gap-x-14 gap-x-16',
          GAP_Y: 'desktop:gap-y-60 tablet:gap-y-50 gap-y-40',
        },
        PRODUCT_LIST_LAYOUT_TABLET_WIDTH = 'tablet:w-180',
        PRODUCT_LIST_EMPTY_TITLE = '등록된 상품이 없습니다',
        PRODUCT_LIST_EMPTY_DESCRIPTION = '상품을 등록하면\n여기에 표시됩니다.',
        PRODUCT_LIST_EMPTY_BUTTON_TEXT = '상품 등록',
        PRODUCT_LIST_SEARCH_PLACEHOLDER = '상품명으로 검색하세요',
        PRODUCT_LIST_EMPTY_HEIGHT_MOBILE = 'h-522',
        PRODUCT_LIST_EMPTY_HEIGHT_TABLET = 'h-604',
        PRODUCT_LIST_EMPTY_HEIGHT_DESKTOP = 'h-938';
      var next_image = __webpack_require__(
        './node_modules/@storybook/nextjs/dist/images/next-image.js'
      );
      const ProductListHeader = ({
        breadcrumbItems,
        sortOptions,
        selectedSort,
        onChangeSort,
        onOpenModal,
      }) => {
        const buttonClass = (0, clsx.A)(
          PRODUCT_LIST_STYLES_BUTTON.BASE,
          PRODUCT_LIST_STYLES_BUTTON.HEIGHT,
          PRODUCT_LIST_STYLES_BUTTON.PADDING,
          PRODUCT_LIST_STYLES_BUTTON.ROUNDED,
          PRODUCT_LIST_STYLES_BUTTON.BACKGROUND,
          PRODUCT_LIST_STYLES_BUTTON.TEXT,
          PRODUCT_LIST_STYLES_BUTTON.FONT,
          PRODUCT_LIST_STYLES_BUTTON.SHADOW,
          PRODUCT_LIST_STYLES_BUTTON.BACKDROP,
          PRODUCT_LIST_STYLES_BUTTON.CURSOR
        );
        return (0, jsx_runtime.jsxs)('div', {
          className: 'flex flex-col pb-20',
          children: [
            (0, jsx_runtime.jsxs)('div', {
              className: 'hidden tablet:flex items-center justify-between',
              children: [
                (0, jsx_runtime.jsx)(Breadcrumb.A, { items: breadcrumbItems }),
                (0, jsx_runtime.jsxs)('div', {
                  className: 'flex items-center gap-30',
                  children: [
                    (0, jsx_runtime.jsx)(DropDown.A, {
                      items: sortOptions,
                      variant: 'small',
                      selected: selectedSort,
                      onSelect: onChangeSort,
                    }),
                    (0, jsx_runtime.jsxs)('button', {
                      type: 'button',
                      className: buttonClass,
                      onClick: onOpenModal,
                      children: [
                        (0, jsx_runtime.jsx)(next_image.A, {
                          src: '/icons/plus-white.svg',
                          alt: '',
                          'aria-hidden': !0,
                          width: 14,
                          height: 14,
                        }),
                        (0, jsx_runtime.jsx)('div', {
                          className: 'text-13',
                          children: '상품 등록',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime.jsxs)('div', {
              className: 'flex flex-col tablet:hidden',
              children: [
                (0, jsx_runtime.jsx)('div', {
                  className: 'pt-0 pb-10',
                  children: (0, jsx_runtime.jsx)(Breadcrumb.A, { items: breadcrumbItems }),
                }),
                (0, jsx_runtime.jsxs)('div', {
                  className: 'flex items-center justify-between pb-20',
                  children: [
                    (0, jsx_runtime.jsx)(DropDown.A, {
                      items: sortOptions,
                      variant: 'small',
                      selected: selectedSort,
                      onSelect: onChangeSort,
                    }),
                    (0, jsx_runtime.jsxs)('button', {
                      type: 'button',
                      className: buttonClass,
                      onClick: onOpenModal,
                      children: [
                        (0, jsx_runtime.jsx)(next_image.A, {
                          src: '/icons/plus-white.svg',
                          alt: '',
                          'aria-hidden': !0,
                          width: 14,
                          height: 14,
                        }),
                        (0, jsx_runtime.jsx)('div', {
                          className: 'text-13',
                          children: '상품 등록',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      };
      ProductListHeader.__docgenInfo = {
        description: '상품 목록 헤더 컴포넌트 (Breadcrumb, 정렬 드롭다운, 상품 등록 버튼)',
        methods: [],
        displayName: 'ProductListHeader',
        props: {
          breadcrumbItems: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'BreadcrumbItem' }],
              raw: 'BreadcrumbItem[]',
            },
            description: '',
          },
          sortOptions: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'Option' }], raw: 'Option[]' },
            description: '',
          },
          selectedSort: { required: !1, tsType: { name: 'Option' }, description: '' },
          onChangeSort: {
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
          onOpenModal: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
        },
      };
      var Divider = __webpack_require__('./src/components/atoms/Divider/Divider.tsx'),
        ProductCard = __webpack_require__('./src/components/molecules/ProductCard/ProductCard.tsx'),
        SkeletonUI = __webpack_require__('./src/components/atoms/SkeletonUI/SkeletonUI.tsx');
      const ProductListRowSkeleton = ({ rows = 6, className }) =>
          (0, jsx_runtime.jsx)('div', {
            className: (0, clsx.A)(
              'grid',
              'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
              'desktop:gap-x-40 tablet:gap-x-14 gap-x-16',
              'desktop:gap-y-60 tablet:gap-y-50 gap-y-40',
              className
            ),
            children: Array.from({ length: rows }, (_, index) =>
              (0, jsx_runtime.jsxs)(
                'div',
                {
                  className: (0, clsx.A)(
                    'flex flex-col overflow-hidden',
                    'rounded-default bg-white text-left',
                    'shadow-card',
                    'w-full aspect-[155/241] tablet:aspect-[156/252] desktop:aspect-[367/439]'
                  ),
                  children: [
                    (0, jsx_runtime.jsxs)('div', {
                      className: (0, clsx.A)(
                        'relative rounded-default bg-gray-50 flex items-center justify-center overflow-hidden',
                        'w-full aspect-square'
                      ),
                      children: [
                        (0, jsx_runtime.jsx)('div', {
                          className: 'relative w-full h-full',
                          children: (0, jsx_runtime.jsx)(SkeletonUI.K, {
                            className: 'absolute inset-0 w-full h-full',
                          }),
                        }),
                        (0, jsx_runtime.jsx)('div', {
                          className:
                            'absolute bottom-10 right-10 w-17 h-17 desktop:bottom-20 desktop:right-20 desktop:w-25 desktop:h-25',
                          children: (0, jsx_runtime.jsx)(SkeletonUI.K, {
                            className: 'w-full h-full rounded-full',
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2',
                      children: [
                        (0, jsx_runtime.jsxs)('div', {
                          className: 'flex flex-col gap-2 desktop:hidden',
                          children: [
                            (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-3/4' }),
                            (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-1/2' }),
                            (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-18 w-1/3' }),
                          ],
                        }),
                        (0, jsx_runtime.jsxs)('div', {
                          className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                          children: [
                            (0, jsx_runtime.jsxs)('div', {
                              className: 'flex flex-row items-center gap-8',
                              children: [
                                (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-24 w-3/5' }),
                                (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-22 w-1/4' }),
                              ],
                            }),
                            (0, jsx_runtime.jsx)(SkeletonUI.K, { className: 'h-24 w-1/2' }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                `product-row-skeleton-${index}`
              )
            ),
          }),
        ProductListRowSkeleton_ProductListRowSkeleton = ProductListRowSkeleton;
      ProductListRowSkeleton.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProductListRowSkeleton',
        props: {
          rows: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '6', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
      var PaginationBlock = __webpack_require__(
          './src/components/molecules/PaginationBlock/PaginationBlock.tsx'
        ),
        StatusNotice = __webpack_require__(
          './src/components/molecules/StatusNotice/StatusNotice.tsx'
        ),
        SearchBar = __webpack_require__('./src/components/molecules/SearchBar/SearchBar.tsx');
      const ProductListContent = ({ dataState, paginationState, searchState, actionHandlers }) => {
        const { products, isLoading } = dataState,
          { itemsPerPage, page, totalPage, onPageChange } = paginationState,
          isEmpty = 0 === products.length;
        return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
          children: [
            (0, jsx_runtime.jsx)(Divider.c, { className: 'mb-20 tablet:mb-30' }),
            (0, jsx_runtime.jsx)('div', {
              className: 'pb-20',
              children: (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('w-full tablet:w-xs desktop:w-366', 'mr-auto'),
                children: (0, jsx_runtime.jsx)(SearchBar.A, {
                  placeholder: PRODUCT_LIST_SEARCH_PLACEHOLDER,
                  defaultValue: searchState?.searchQuery,
                  onSearch: searchState?.onSearch,
                  instant: !0,
                  className: 'w-full',
                }),
              }),
            }),
            isLoading &&
              (0, jsx_runtime.jsx)(ProductListRowSkeleton_ProductListRowSkeleton, {
                rows: itemsPerPage,
              }),
            !isLoading &&
              isEmpty &&
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  'flex items-center justify-center',
                  PRODUCT_LIST_EMPTY_HEIGHT_MOBILE,
                  PRODUCT_LIST_EMPTY_HEIGHT_TABLET,
                  PRODUCT_LIST_EMPTY_HEIGHT_DESKTOP
                ),
                children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                  title: PRODUCT_LIST_EMPTY_TITLE,
                  description: PRODUCT_LIST_EMPTY_DESCRIPTION,
                  buttonText: PRODUCT_LIST_EMPTY_BUTTON_TEXT,
                  onButtonClick: actionHandlers.onOpenModal,
                }),
              }),
            !isLoading &&
              !isEmpty &&
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)(
                  PRODUCT_LIST_STYLES_GRID.BASE,
                  PRODUCT_LIST_STYLES_GRID.COLUMNS,
                  PRODUCT_LIST_STYLES_GRID.GAP_X,
                  PRODUCT_LIST_STYLES_GRID.GAP_Y,
                  'w-full'
                ),
                children: products.map((product, index) => {
                  const liked = actionHandlers.isProductLiked(product.id),
                    isPriority = index < 8;
                  return (0, jsx_runtime.jsx)(
                    ProductCard.A,
                    {
                      variant: 'product',
                      name: product.name,
                      price: product.price,
                      purchaseCount: product.purchaseCount,
                      imageUrl: product.imageUrl,
                      productId: product.id,
                      liked,
                      onToggleLike: () => actionHandlers.handleToggleLike(product.id, liked),
                      priority: isPriority,
                    },
                    product.id
                  );
                }),
              }),
            (0, jsx_runtime.jsx)('div', {
              className: 'flex justify-center mt-30 tablet:mt-40 desktop:mt-60',
              children: (0, jsx_runtime.jsx)(PaginationBlock.A, {
                current: page,
                total: totalPage,
                onPrev: onPageChange,
                onNext: onPageChange,
              }),
            }),
          ],
        });
      };
      ProductListContent.__docgenInfo = {
        description: '개선된 상품 목록 컨텐츠 - 깔끔하고 단순한 조립 레이어',
        methods: [],
        displayName: 'ProductListContent',
        props: {
          dataState: { required: !0, tsType: { name: 'ProductContentDataState' }, description: '' },
          paginationState: {
            required: !0,
            tsType: { name: 'ProductContentPaginationState' },
            description: '',
          },
          searchState: {
            required: !1,
            tsType: { name: 'ProductContentSearchState' },
            description: '',
          },
          actionHandlers: {
            required: !0,
            tsType: { name: 'ProductContentActionHandlers' },
            description: '',
          },
        },
      };
      var QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        useMutation = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/useMutation.js'
        ),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        api = __webpack_require__('./src/utils/api.ts');
      const api_WISHLIST_API_PATHS_ADD_TO_WISHLIST = (productId) => `/api/v1/wishlist/${productId}`,
        api_WISHLIST_API_PATHS_REMOVE_FROM_WISHLIST = (productId) =>
          `/api/v1/wishlist/${productId}`;
      var useToast = __webpack_require__('./src/hooks/useToast.ts');
      __webpack_require__('./src/lib/query/queryDefaults.ts');
      const wishlist_keys_wishlistKeys_all = (companyId) => ['wishlist', companyId];
      function useAddWishlist() {
        const params = (0, navigation.useParams)(),
          companyId = params?.companyId ? String(params.companyId) : '',
          queryClient = (0, QueryClientProvider.jE)(),
          { triggerToast } = (0, useToast.d)();
        return (0, useMutation.n)({
          mutationFn: (productId) =>
            (async function addToWishlist(productId) {
              const response = await (0, api.v$)(
                api_WISHLIST_API_PATHS_ADD_TO_WISHLIST(productId),
                { method: 'POST' }
              );
              if (!response.ok) throw new Error('위시리스트 추가에 실패했습니다.');
              if (!(await response.json()).success)
                throw new Error('위시리스트 추가에 실패했습니다.');
            })(productId),
          onSuccess: async () => {
            (await queryClient.invalidateQueries({
              queryKey: wishlist_keys_wishlistKeys_all(companyId),
            }),
              triggerToast('success', '위시리스트에 추가되었습니다.'));
          },
          onError: (err) => {
            const message = err instanceof Error ? err.message : '위시리스트 추가에 실패했습니다.';
            triggerToast('error', message);
          },
        });
      }
      function useRemoveWishlist() {
        const params = (0, navigation.useParams)(),
          companyId = params?.companyId ? String(params.companyId) : '',
          queryClient = (0, QueryClientProvider.jE)(),
          { triggerToast } = (0, useToast.d)();
        return (0, useMutation.n)({
          mutationFn: (productId) =>
            (async function removeFromWishlist(productId) {
              const response = await (0, api.v$)(
                api_WISHLIST_API_PATHS_REMOVE_FROM_WISHLIST(productId),
                { method: 'DELETE' }
              );
              if (!response.ok) throw new Error('위시리스트 제거에 실패했습니다.');
              if (!(await response.json()).success)
                throw new Error('위시리스트 제거에 실패했습니다.');
            })(productId),
          onSuccess: async () => {
            (await queryClient.invalidateQueries({
              queryKey: wishlist_keys_wishlistKeys_all(companyId),
            }),
              triggerToast('success', '위시리스트에서 제거되었습니다.'));
          },
          onError: (err) => {
            const message = err instanceof Error ? err.message : '위시리스트 제거에 실패했습니다.';
            triggerToast('error', message);
          },
        });
      }
      var constants = __webpack_require__('./src/constants/index.ts'),
        categories_utils = __webpack_require__('./src/constants/categories/categories.utils.ts');
      const ProductModal = (0, react.lazy)(() =>
          __webpack_require__
            .e(1200)
            .then(
              __webpack_require__.bind(
                __webpack_require__,
                './src/components/molecules/ProductModal/ProductModal.tsx'
              )
            )
        ),
        ProductListTem = ({
          companyId,
          categoryState,
          sortSearchState,
          productData,
          actionHandlers,
        }) => {
          const [modalOpen, setModalOpen] = (0, react.useState)(!1),
            itemsPerPage = (() => {
              const [count, setCount] = (0, react.useState)(PRODUCT_LIST_ITEMS_PER_PAGE_TABLET);
              return (
                (0, react.useEffect)(() => {
                  const update = () => {
                    window.matchMedia(PRODUCT_LIST_BREAKPOINTS_DESKTOP).matches
                      ? setCount(PRODUCT_LIST_ITEMS_PER_PAGE_DESKTOP)
                      : window.matchMedia(PRODUCT_LIST_BREAKPOINTS_TABLET).matches
                        ? setCount(PRODUCT_LIST_ITEMS_PER_PAGE_TABLET)
                        : setCount(PRODUCT_LIST_ITEMS_PER_PAGE_MOBILE);
                  };
                  return (
                    update(),
                    window.addEventListener('resize', update),
                    () => window.removeEventListener('resize', update)
                  );
                }, []),
                count
              );
            })(),
            { isProductLiked, handleToggleLike } = ((wishlistData) => {
              const addWishlistMutation = useAddWishlist(),
                removeWishlistMutation = useRemoveWishlist();
              return {
                isProductLiked: (0, react.useCallback)(
                  (productId) =>
                    !!wishlistData?.data &&
                    wishlistData.data.some((item) => item.product.id === productId),
                  [wishlistData]
                ),
                handleToggleLike: (0, react.useCallback)(
                  (productId, isLiked) => {
                    isLiked
                      ? removeWishlistMutation.mutate(productId)
                      : addWishlistMutation.mutate(productId);
                  },
                  [addWishlistMutation, removeWishlistMutation]
                ),
              };
            })(productData.wishlistData),
            sortedProducts =
              ((products = productData.products),
              (selectedSort = sortSearchState.selectedSort),
              (0, react.useMemo)(() => {
                if (!selectedSort) return products;
                switch (selectedSort.key) {
                  case 'latest':
                    return [...products].sort((a, b) => b.id - a.id);
                  case 'sell':
                    return [...products].sort(
                      (a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0)
                    );
                  case 'price-asc':
                    return [...products].sort((a, b) => a.price - b.price);
                  case 'price-desc':
                    return [...products].sort((a, b) => b.price - a.price);
                  default:
                    return products;
                }
              }, [products, selectedSort]));
          var products, selectedSort;
          const { page, setPage, totalPage, currentProducts } = ((
              products,
              itemsPerPage,
              selectedSort,
              selectedCategoryId
            ) => {
              const [page, setPage] = (0, react.useState)(1),
                totalPage = Math.max(1, Math.ceil(products.length / itemsPerPage));
              ((0, react.useEffect)(() => {
                page > totalPage && setPage(totalPage);
              }, [page, totalPage]),
                (0, react.useEffect)(() => {
                  setPage(1);
                }, [selectedSort, selectedCategoryId]));
              const currentProducts = (0, react.useMemo)(() => {
                  const start = (page - 1) * itemsPerPage;
                  return products.slice(start, start + itemsPerPage);
                }, [products, page, itemsPerPage]),
                isEmpty = 0 === currentProducts.length;
              return { page, setPage, totalPage, currentProducts, isEmpty };
            })(
              sortedProducts,
              itemsPerPage,
              sortSearchState.selectedSort,
              categoryState.selectedCategoryId
            ),
            breadcrumbForRender = ((
              companyId,
              selectedCategoryId,
              categorySections,
              defaultBreadcrumbItems,
              onCategoryChange,
              onSubCategoryChange
            ) =>
              (0, react.useMemo)(() => {
                const productsBreadcrumb = {
                  label: constants.Rn.PRODUCTS.label,
                  href: constants.Rn.PRODUCTS.href(companyId),
                };
                if (null == selectedCategoryId) return defaultBreadcrumbItems;
                const matchedSection = categorySections.find((section) =>
                  section.options.some((opt) => opt.value === selectedCategoryId)
                );
                if (!matchedSection) return defaultBreadcrumbItems;
                const matchedOption = matchedSection.options.find(
                  (opt) => opt.value === selectedCategoryId
                );
                if (!matchedOption) return defaultBreadcrumbItems;
                const parentCategoryId = matchedSection.id,
                  firstSubCategory = (0, categories_utils.WW)(parentCategoryId)[0];
                return [
                  productsBreadcrumb,
                  {
                    label: matchedSection.title,
                    onClick:
                      onCategoryChange && onSubCategoryChange && firstSubCategory
                        ? () => {
                            (onCategoryChange(parentCategoryId),
                              queueMicrotask(() => {
                                onSubCategoryChange(firstSubCategory.id);
                              }));
                          }
                        : void 0,
                  },
                  { label: matchedOption.label },
                ];
              }, [
                selectedCategoryId,
                categorySections,
                defaultBreadcrumbItems,
                companyId,
                onCategoryChange,
                onSubCategoryChange,
              ]))(
              companyId,
              categoryState.selectedCategoryId,
              categoryState.categorySections,
              sortSearchState.breadcrumbItems,
              categoryState.onChangeCategory,
              categoryState.onChangeCategory
            );
          return (0, jsx_runtime.jsxs)('div', {
            className: 'w-full flex justify-center px-14 tablet:px-24 desktop:px-24',
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className:
                  'flex mobile:flex-col tablet:flex-row desktop:gap-40 tablet:gap-20 mobile:gap-0 w-full desktop:max-w-[1400px]',
                children: [
                  (0, jsx_runtime.jsx)('div', {
                    className:
                      'mobile:mt-0 tablet:mt-10 desktop:mt-80 desktop:w-180 desktop:flex-shrink-0',
                    children: (0, jsx_runtime.jsx)('div', {
                      className:
                        'mobile:overflow-x-auto mobile:scrollbar-none tablet:overflow-visible',
                      children: (0, jsx_runtime.jsx)('div', {
                        className: (0, clsx.A)(
                          'mobile:flex mobile:flex-nowrap tablet:flex-col mobile:gap-8',
                          PRODUCT_LIST_LAYOUT_TABLET_WIDTH
                        ),
                        children: (0, jsx_runtime.jsx)(CategoryPanel.x, {
                          sections: categoryState.categorySections,
                          activeSectionId: categoryState.activeSectionId,
                          selectedValue: categoryState.selectedCategoryId,
                          onChange: categoryState.onChangeCategory,
                        }),
                      }),
                    }),
                  }),
                  (0, jsx_runtime.jsxs)('div', {
                    className: (0, clsx.A)(
                      'flex flex-col',
                      'mobile:mt-20 mobile:w-full',
                      'tablet:max-w-[496px]',
                      'desktop:flex-1 desktop:min-w-0 desktop:max-w-[1180px]'
                    ),
                    children: [
                      (0, jsx_runtime.jsx)(ProductListHeader, {
                        breadcrumbItems: breadcrumbForRender,
                        sortOptions: sortSearchState.sortOptions,
                        selectedSort: sortSearchState.selectedSort,
                        onChangeSort: sortSearchState.onChangeSort,
                        onOpenModal: () => setModalOpen(!0),
                      }),
                      (0, jsx_runtime.jsx)(ProductListContent, {
                        dataState: {
                          products: currentProducts,
                          isLoading: productData.isLoading ?? !1,
                        },
                        paginationState: { itemsPerPage, page, totalPage, onPageChange: setPage },
                        searchState: {
                          searchQuery: sortSearchState.searchQuery,
                          onSearch: sortSearchState.onSearch,
                        },
                        actionHandlers: {
                          onOpenModal: () => setModalOpen(!0),
                          isProductLiked,
                          handleToggleLike,
                        },
                      }),
                    ],
                  }),
                ],
              }),
              modalOpen &&
                (0, jsx_runtime.jsx)(react.Suspense, {
                  fallback: null,
                  children: (0, jsx_runtime.jsx)(ProductModal, {
                    open: modalOpen,
                    onClose: () => setModalOpen(!1),
                    onSubmit: () => {
                      (setModalOpen(!1), actionHandlers.onProductRegister?.());
                    },
                    initialName: '',
                    initialPrice: '',
                    initialLink: '',
                    initialImage: null,
                    initialCategory: null,
                    initialSubCategory: null,
                  }),
                }),
            ],
          });
        },
        ProductListTem_ProductListTem = ProductListTem;
      ProductListTem.__docgenInfo = {
        description: '개선된 상품 목록 Template - 깔끔하고 단순한 조립 레이어',
        methods: [],
        displayName: 'ProductListTem',
        props: {
          companyId: { required: !0, tsType: { name: 'string' }, description: '' },
          categoryState: {
            required: !0,
            tsType: { name: 'ProductCategoryState' },
            description: '',
          },
          sortSearchState: {
            required: !0,
            tsType: { name: 'ProductSortSearchState' },
            description: '',
          },
          productData: { required: !0, tsType: { name: 'ProductDataState' }, description: '' },
          actionHandlers: {
            required: !0,
            tsType: { name: 'ProductActionHandlers' },
            description: '',
          },
        },
      };
      const mockCategorySections = [
          {
            id: 1,
            title: '음료',
            options: [
              { value: 101, label: '탄산음료', count: 12 },
              { value: 102, label: '과즙음료', count: 8 },
              { value: 103, label: '에너지음료', count: 5 },
              { value: 104, label: '이온음료', count: 6 },
              { value: 105, label: '건강음료', count: 3 },
              { value: 106, label: '차류', count: 9 },
            ],
          },
          {
            id: 2,
            title: '스낵',
            options: [
              { value: 201, label: '과자', count: 15 },
              { value: 202, label: '쿠키', count: 10 },
              { value: 203, label: '비스켓류', count: 7 },
              { value: 204, label: '초콜릿류', count: 12 },
              { value: 205, label: '캔디류', count: 8 },
              { value: 206, label: '젤리류', count: 5 },
              { value: 207, label: '시리얼바', count: 6 },
              { value: 208, label: '견과류', count: 9 },
            ],
          },
          {
            id: 3,
            title: '생수',
            options: [
              { value: 301, label: '생수', count: 20 },
              { value: 302, label: '스파클링', count: 7 },
            ],
          },
          {
            id: 4,
            title: '간편식',
            options: [
              { value: 401, label: '컵라면', count: 14 },
              { value: 402, label: '소시지', count: 6 },
              { value: 403, label: '계란', count: 10 },
              { value: 404, label: '컵밥류', count: 8 },
              { value: 405, label: '시리얼', count: 5 },
            ],
          },
          {
            id: 5,
            title: '신선식',
            options: [
              { value: 501, label: '과일', count: 12 },
              { value: 502, label: '샐러드', count: 7 },
              { value: 503, label: '빵', count: 9 },
              { value: 504, label: '샌드위치', count: 6 },
              { value: 505, label: '요거트류', count: 4 },
              { value: 506, label: '유제품', count: 10 },
            ],
          },
          {
            id: 6,
            title: '원두커피',
            options: [
              { value: 601, label: '드립커피', count: 8 },
              { value: 602, label: '원두', count: 5 },
              { value: 603, label: '캡슐커피', count: 7 },
            ],
          },
          {
            id: 7,
            title: '비품',
            options: [
              { value: 701, label: '일회용품', count: 12 },
              { value: 702, label: '사무용품', count: 6 },
              { value: 703, label: '청소용품', count: 4 },
              { value: 704, label: '위생용품', count: 9 },
            ],
          },
        ],
        breadcrumbItems = [{ label: '홈', href: '/' }, { label: '상품' }],
        sortOptions = [
          { key: 'latest', label: '최신순' },
          { key: 'sell', label: '판매순' },
          { key: 'price-asc', label: '낮은 가격순' },
          { key: 'price-desc', label: '높은 가격순' },
        ],
        mockProducts = Array.from({ length: 12 }).map((_, index) => ({
          id: index + 1,
          name: `상품 ${index + 1}`,
          price: 1500 + 300 * index,
          purchaseCount: 50 + 5 * index,
          imageUrl: '/images/zero-cola.svg',
          categoryId: [101, 102, 103, 201, 202, 301, 401, 501, 601, 701][index % 10],
        })),
        sodaProducts = Array.from({ length: 30 }).map((_, index) => ({
          id: mockProducts.length + index + 1,
          name: `탄산음료 ${index + 1}`,
          price: 1e3 + 200 * index,
          purchaseCount: 20 + 3 * index,
          imageUrl: '/images/zero-cola.svg',
          categoryId: 101,
        })),
        allProducts = [...mockProducts, ...sodaProducts],
        ProductListTem_stories = {
          title: 'Features/Products/Template/ProductListTem',
          component: ProductListTem_ProductListTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: { component: '=====================\nMeta\n======================' },
            },
          },
        },
        Template = ({
          categorySections,
          breadcrumbItems: breadcrumbItemsProp,
          sortOptions: sortOptionsProp,
          products,
        }) => {
          const [selectedSort, setSelectedSort] = (0, react.useState)(sortOptionsProp[0]),
            [selectedCategoryId, setSelectedCategoryId] = (0, react.useState)(null),
            filteredProducts = (0, react.useMemo)(
              () =>
                null == selectedCategoryId
                  ? products
                  : products.filter((p) => p.categoryId === selectedCategoryId),
              [products, selectedCategoryId]
            ),
            sortedProducts = (0, react.useMemo)(() => {
              switch (selectedSort.key) {
                case 'latest':
                  return [...filteredProducts].sort((a, b) => b.id - a.id);
                case 'sell':
                  return [...filteredProducts].sort(
                    (a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0)
                  );
                case 'price-asc':
                  return [...filteredProducts].sort((a, b) => a.price - b.price);
                case 'price-desc':
                  return [...filteredProducts].sort((a, b) => b.price - a.price);
                default:
                  return filteredProducts;
              }
            }, [filteredProducts, selectedSort]);
          return (0, jsx_runtime.jsx)(ProductListTem_ProductListTem, {
            companyId: 'test-company-id',
            categoryState: {
              categorySections,
              activeSectionId: 1,
              selectedCategoryId,
              onChangeCategory: setSelectedCategoryId,
            },
            sortSearchState: {
              breadcrumbItems: breadcrumbItemsProp,
              sortOptions: sortOptionsProp,
              selectedSort,
              onChangeSort: setSelectedSort,
              searchQuery: '',
              onSearch: () => {},
            },
            productData: { products: sortedProducts, wishlistData: void 0, isLoading: !1 },
            actionHandlers: { onProductRegister: () => {} },
          });
        },
        Default = {
          render: () =>
            (0, jsx_runtime.jsx)(Template, {
              categorySections: mockCategorySections,
              breadcrumbItems,
              sortOptions,
              products: mockProducts,
            }),
        },
        ManyProducts = {
          render: () =>
            (0, jsx_runtime.jsx)(Template, {
              categorySections: mockCategorySections,
              breadcrumbItems,
              sortOptions,
              products: allProducts,
            }),
        },
        SinglePage = {
          render: () =>
            (0, jsx_runtime.jsx)(Template, {
              categorySections: mockCategorySections,
              breadcrumbItems,
              sortOptions,
              products: allProducts.slice(0, 1),
            }),
        },
        Empty = {
          render: () =>
            (0, jsx_runtime.jsx)(Template, {
              categorySections: mockCategorySections,
              breadcrumbItems,
              sortOptions,
              products: [],
            }),
        },
        __namedExportsOrder = ['Default', 'ManyProducts', 'SinglePage', 'Empty'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => <Template categorySections={mockCategorySections} breadcrumbItems={breadcrumbItems} sortOptions={sortOptions} products={mockProducts} // ✅ 기본 UI 확인 (12개)\n  />\n}',
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nStories\n======================',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (ManyProducts.parameters = {
          ...ManyProducts.parameters,
          docs: {
            ...ManyProducts.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <Template categorySections={mockCategorySections} breadcrumbItems={breadcrumbItems} sortOptions={sortOptions} products={allProducts} // ✅ 스크롤 / 밀집 테스트 (42개)\n  />\n}',
              ...ManyProducts.parameters?.docs?.source,
            },
          },
        }),
        (SinglePage.parameters = {
          ...SinglePage.parameters,
          docs: {
            ...SinglePage.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <Template categorySections={mockCategorySections} breadcrumbItems={breadcrumbItems} sortOptions={sortOptions} products={allProducts.slice(0, 1)} />\n}',
              ...SinglePage.parameters?.docs?.source,
            },
          },
        }),
        (Empty.parameters = {
          ...Empty.parameters,
          docs: {
            ...Empty.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <Template categorySections={mockCategorySections} breadcrumbItems={breadcrumbItems} sortOptions={sortOptions} products={[]} />\n}',
              ...Empty.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/hooks/useToast.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { d: () => useToast });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/next/dist/compiled/react/index.js'
      );
      const useToast = (autoCloseDuration = 3e3) => {
        const [showToast, setShowToast] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),
          [toastVariant, setToastVariant] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)(
            'success'
          ),
          [toastMessage, setToastMessage] = (0, react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
        (0, react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
          if (!showToast) return;
          const timer = setTimeout(() => {
            setShowToast(!1);
          }, autoCloseDuration);
          return () => {
            clearTimeout(timer);
          };
        }, [showToast, autoCloseDuration]);
        const triggerToast = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (variant, message) => {
              (setToastVariant(variant), setToastMessage(message), setShowToast(!0));
            },
            []
          ),
          closeToast = (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            setShowToast(!1);
          }, []);
        return { showToast, toastVariant, toastMessage, triggerToast, closeToast };
      };
    },
    './src/lib/query/queryDefaults.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      var _constants_staleTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './src/constants/staleTime.ts'
      );
      (_constants_staleTime__WEBPACK_IMPORTED_MODULE_0__.S.ONE_MINUTE,
        _constants_staleTime__WEBPACK_IMPORTED_MODULE_0__.S.NONE,
        _constants_staleTime__WEBPACK_IMPORTED_MODULE_0__.S.SHORT,
        _constants_staleTime__WEBPACK_IMPORTED_MODULE_0__.S.FIVE_MINUTES,
        _constants_staleTime__WEBPACK_IMPORTED_MODULE_0__.S.NONE);
    },
  },
]);
