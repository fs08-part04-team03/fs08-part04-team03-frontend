'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1043],
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
    './src/components/atoms/PriceText/PriceText.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/next/dist/compiled/react/jsx-runtime.js'
      );
      const PriceText = ({ value, showUnit = !0, className }) => {
          const formattedValue = (Number.isFinite(value) && value >= 0 ? value : 0).toLocaleString(
              'ko-KR'
            ),
            displayText = showUnit ? `${formattedValue}원` : formattedValue;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className,
            children: displayText,
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PriceText;
      PriceText.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PriceText',
        props: {
          value: { required: !0, tsType: { name: 'number' }, description: '' },
          showUnit: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'true', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
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
    './src/components/molecules/OrderItemCard/OrderItemCard.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        q: () => OrderItemCard,
        A: () => OrderItemCard_OrderItemCard,
      });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        constants = __webpack_require__('./src/constants/index.ts'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        PriceText = __webpack_require__('./src/components/atoms/PriceText/PriceText.tsx'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        Checkbox = __webpack_require__('./src/components/atoms/Checkbox/Checkbox.tsx'),
        NumberInput = __webpack_require__('./src/components/molecules/NumberInput/NumberInput.tsx'),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        modern_useMutation = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/useMutation.js'
        ),
        cart_api = __webpack_require__('./src/features/cart/api/cart.api.ts'),
        hooks_useToast = __webpack_require__('./src/hooks/useToast.ts');
      (__webpack_require__('./src/utils/api.ts'),
        __webpack_require__('./src/lib/query/queryDefaults.ts'));
      var cart_keys = __webpack_require__('./src/features/cart/queries/cart.keys.ts');
      const useCartItemDirect = (cartItemId) => {
          const updateQuantityMutation = (function useUpdateCartQuantity() {
            const queryClient = (0, QueryClientProvider.jE)(),
              { triggerToast } = (0, hooks_useToast.d)();
            return (0, modern_useMutation.n)({
              mutationFn: ({ cartItemId, quantity }) =>
                cart_api.z.updateQuantity(cartItemId, quantity),
              onSuccess: async () => {
                (await queryClient.invalidateQueries({ queryKey: cart_keys.z.all }),
                  triggerToast('success', '수량이 변경되었습니다.'));
              },
              onError: (err) => {
                const message = err instanceof Error ? err.message : '수량 변경에 실패했습니다.';
                triggerToast('error', message);
              },
            });
          })();
          return {
            handleQuantityChange: (quantity) => {
              !cartItemId ||
                quantity < 1 ||
                updateQuantityMutation.mutate({ cartItemId, quantity });
            },
            isLoading: updateQuantityMutation.isPending,
          };
        },
        ProductImage = ({
          imageSrc,
          name,
          productId,
          onProductClick,
          onImageError,
          shouldShowImage,
        }) => {
          const containerClassName = (0, clsx.A)(
              'relative overflow-hidden rounded-8 bg-gray-50',
              'w-85 h-85',
              'tablet:w-140 tablet:h-140',
              'desktop:w-140 desktop:h-140',
              productId && 'cursor-pointer'
            ),
            imageContent = shouldShowImage
              ? (0, jsx_runtime.jsx)('div', {
                  className: 'absolute inset-0 flex items-center justify-center',
                  children: (0, jsx_runtime.jsx)('div', {
                    className: 'relative w-full h-full',
                    children: (0, jsx_runtime.jsx)(next_image.A, {
                      src: imageSrc,
                      alt: name,
                      fill: !0,
                      className: 'object-contain',
                      onError: onImageError,
                      sizes: '(max-width: 768px) 85px, 140px',
                    }),
                  }),
                })
              : (0, jsx_runtime.jsx)('div', {
                  className: 'absolute inset-0 flex items-center justify-center',
                  children: (0, jsx_runtime.jsx)(next_image.A, {
                    src: '/icons/photo-icon.svg',
                    alt: '',
                    width: 28,
                    height: 28,
                    className:
                      'opacity-40 w-20 h-20 tablet:w-24 tablet:h-24 desktop:w-28 desktop:h-28',
                    priority: !0,
                  }),
                });
          return productId && onProductClick
            ? (0, jsx_runtime.jsx)('button', {
                type: 'button',
                className: (0, clsx.A)(containerClassName, 'p-0 border-0'),
                onClick: onProductClick,
                'aria-label': `${name} 상세 페이지로 이동`,
                children: imageContent,
              })
            : (0, jsx_runtime.jsx)('div', {
                className: containerClassName,
                children: imageContent,
              });
        },
        ProductName = ({ name, productId, onProductClick, className }) =>
          productId && onProductClick
            ? (0, jsx_runtime.jsx)('button', {
                type: 'button',
                className: (0, clsx.A)(className, 'bg-transparent p-0 border-0 text-left'),
                onClick: onProductClick,
                'aria-label': `${name} 상세 페이지로 이동`,
                children: name,
              })
            : (0, jsx_runtime.jsx)('p', { className, children: name }),
        OrderItemCard = ({
          variant = 'default',
          name,
          unitPrice,
          quantity,
          shippingCost = 0,
          shippingLabelText = '택배',
          imageSrc,
          productId,
          cartItemId,
          checked = !1,
          onCheckboxChange,
          onQuantityChange,
          onPurchaseClick,
          purchaseButtonLabel = '즉시 구매',
          purchaseButtonDisabled,
          className,
        }) => {
          const router = (0, navigation.useRouter)(),
            params = (0, navigation.useParams)();
          let companyId = '';
          if ('string' == typeof params?.companyId) companyId = params.companyId;
          else if (Array.isArray(params?.companyId) && params.companyId.length > 0) {
            const firstElement = params.companyId[0];
            'string' == typeof firstElement && (companyId = firstElement);
          }
          const [imageError, setImageError] = (0, react.useState)(!1),
            displayTotalPrice = unitPrice * quantity,
            cartItemHook = useCartItemDirect(cartItemId),
            handleProductClick = () => {
              productId &&
                companyId &&
                router.push(constants.vp.PRODUCT_DETAIL(companyId, String(productId)));
            },
            productNameClass = (0, clsx.A)(
              'text-black-100',
              'text-14 leading-20 tablet:text-16 tablet:leading-24',
              'truncate whitespace-nowrap overflow-hidden',
              'max-w-76.83',
              'tablet:max-w-270',
              'desktop:max-w-none',
              productId && 'cursor-pointer hover:underline'
            ),
            effectiveImageSrc = imageSrc ?? null,
            shouldShowImage = !!effectiveImageSrc && !imageError;
          return (
            (0, react.useEffect)(() => {
              setImageError(!1);
            }, [imageSrc]),
            'confirm' === variant
              ? (0, jsx_runtime.jsxs)('div', {
                  className: (0, clsx.A)(
                    'flex items-center justify-between w-full rounded-12 bg-white',
                    'px-12 py-8 gap-8',
                    'tablet:px-16 tablet:py-12 tablet:gap-12',
                    'desktop:px-20 desktop:py-16 desktop:gap-16',
                    className
                  ),
                  children: [
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex items-center gap-12',
                      children: [
                        (0, jsx_runtime.jsx)(ProductImage, {
                          imageSrc: effectiveImageSrc ?? void 0,
                          name,
                          productId,
                          onProductClick: handleProductClick,
                          onImageError: () => setImageError(!0),
                          shouldShowImage,
                        }),
                        (0, jsx_runtime.jsxs)('div', {
                          className: 'flex flex-col gap-4',
                          children: [
                            (0, jsx_runtime.jsx)(ProductName, {
                              name,
                              productId,
                              onProductClick: handleProductClick,
                              className: productNameClass,
                            }),
                            (0, jsx_runtime.jsx)(PriceText.A, {
                              value: unitPrice,
                              className:
                                'text-black-100 text-14 leading-20 tablet:text-16 tablet:leading-24',
                            }),
                            (0, jsx_runtime.jsx)('div', {
                              className: 'pt-14 tablet:pt-30',
                              children: (0, jsx_runtime.jsxs)('span', {
                                className:
                                  'text-black-100 text-14 leading-20 tablet:text-16 tablet:leading-24',
                                children: ['수량 ', quantity, '개'],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime.jsx)('div', {
                      className: 'flex flex-col items-end gap-8 shrink-0',
                      children: (0, jsx_runtime.jsx)(PriceText.A, {
                        value: displayTotalPrice,
                        className: 'text-gray-900 font-semibold text-24 leading-32 text-right',
                      }),
                    }),
                  ],
                })
              : (0, jsx_runtime.jsxs)('div', {
                  className: (0, clsx.A)(
                    'flex items-center justify-between w-full rounded-12 bg-white',
                    'px-12 py-8 gap-8',
                    'tablet:px-16 tablet:py-12 tablet:gap-12',
                    'desktop:px-20 desktop:py-16 desktop:gap-16',
                    className
                  ),
                  children: [
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex items-center gap-12',
                      children: [
                        (0, jsx_runtime.jsx)(Checkbox.A, {
                          checked,
                          onChange: onCheckboxChange,
                          'aria-label': `${name} 선택`,
                          className: 'shrink-0',
                        }),
                        (0, jsx_runtime.jsx)(ProductImage, {
                          imageSrc: effectiveImageSrc ?? void 0,
                          name,
                          productId,
                          onProductClick: handleProductClick,
                          onImageError: () => setImageError(!0),
                          shouldShowImage,
                        }),
                        (0, jsx_runtime.jsxs)('div', {
                          className: 'flex flex-col gap-4',
                          children: [
                            (0, jsx_runtime.jsx)(ProductName, {
                              name,
                              productId,
                              onProductClick: handleProductClick,
                              className: productNameClass,
                            }),
                            (0, jsx_runtime.jsx)(PriceText.A, {
                              value: unitPrice,
                              className:
                                'text-black-100 text-14 leading-20 tablet:text-16 tablet:leading-24',
                            }),
                            (0, jsx_runtime.jsxs)('div', {
                              className: 'pt-13 flex items-center gap-4',
                              children: [
                                (0, jsx_runtime.jsxs)('span', {
                                  className: 'text-black-100 text-13 leading-20 tablet:text-14',
                                  children: [
                                    shippingLabelText,
                                    (0, jsx_runtime.jsx)('span', {
                                      className: 'hidden tablet:inline',
                                      children: ' 배송비',
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime.jsx)(PriceText.A, {
                                  value: shippingCost,
                                  className:
                                    'font-normal text-black-100 text-13 leading-20 tablet:text-14',
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex flex-col items-end gap-8 shrink-0 justify-end',
                      children: [
                        (0, jsx_runtime.jsx)('div', {
                          className: 'w-72 flex justify-end tablet:w-99',
                          children: (0, jsx_runtime.jsx)(NumberInput.Q, {
                            variant: 'secondary',
                            onQuantityChange: (option) => {
                              const quantityValue = Number(option.key);
                              cartItemId && !Number.isNaN(quantityValue)
                                ? cartItemHook.handleQuantityChange(quantityValue)
                                : onQuantityChange && onQuantityChange(option);
                            },
                            value: quantity,
                            className: 'h-40 tablet:h-44',
                          }),
                        }),
                        (0, jsx_runtime.jsxs)('div', {
                          className: 'hidden tablet:flex items-center gap-4',
                          children: [
                            (0, jsx_runtime.jsx)('span', {
                              className: 'text-gray-900 font-semibold text-24 leading-32',
                              children: '총',
                            }),
                            (0, jsx_runtime.jsx)(PriceText.A, {
                              value: displayTotalPrice,
                              className: 'text-gray-900 font-semibold text-24 leading-32',
                            }),
                          ],
                        }),
                        (0, jsx_runtime.jsx)(Button.A, {
                          variant: 'secondary',
                          size: 'sm',
                          onClick: onPurchaseClick,
                          inactive: purchaseButtonDisabled,
                          className: 'w-88 h-40 cursor-pointer tablet:w-99 tablet:h-44',
                          children: purchaseButtonLabel,
                        }),
                      ],
                    }),
                  ],
                })
          );
        },
        OrderItemCard_OrderItemCard = OrderItemCard;
      OrderItemCard.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'OrderItemCard',
        props: {
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'default' | 'confirm'",
              elements: [
                { name: 'literal', value: "'default'" },
                { name: 'literal', value: "'confirm'" },
              ],
            },
            description: '',
            defaultValue: { value: "'default'", computed: !1 },
          },
          name: { required: !0, tsType: { name: 'string' }, description: '' },
          unitPrice: { required: !0, tsType: { name: 'number' }, description: '' },
          quantity: { required: !0, tsType: { name: 'number' }, description: '' },
          shippingCost: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          shippingLabelText: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'택배'", computed: !1 },
          },
          imageSrc: { required: !1, tsType: { name: 'string' }, description: '' },
          productId: { required: !1, tsType: { name: 'number' }, description: '' },
          cartItemId: {
            required: !1,
            tsType: { name: 'string' },
            description: 'Props Depth 1단계: cartItemId가 있으면 직접 hook 사용',
          },
          checked: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          onCheckboxChange: {
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
            description: '하위 호환성을 위한 props (deprecated - cartItemId 사용 권장)',
          },
          onPurchaseClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          purchaseButtonLabel: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'즉시 구매'", computed: !1 },
          },
          purchaseButtonDisabled: { required: !1, tsType: { name: 'boolean' }, description: '' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/cart/api/cart.api.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { z: () => cartApi });
      const CART_API = {
        ADD_TO_CART: '/api/v1/cart/addToCart',
        GET_MY_CART: '/api/v1/cart/getMyCart',
        UPDATE_QUANTITY: '/api/v1/cart/updateQuantity',
        DELETE_FROM_CART: '/api/v1/cart/deleteFromCart',
        DELETE_MULTIPLE: '/api/v1/cart/deleteMultiple',
      };
      var api = __webpack_require__('./src/utils/api.ts');
      const cartApi = {
        addToCart: async (productId, quantity = 1) => {
          const response = await (0, api.v$)(CART_API.ADD_TO_CART, {
            method: 'POST',
            body: JSON.stringify({ productId, quantity }),
          });
          if (!response.ok) {
            let errorMessage = '장바구니 추가 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || !data.data)
            throw new Error(data.message || '장바구니 추가 응답 형식이 올바르지 않습니다.');
          return data;
        },
        getMyCart: async (page = 1, limit = 10) => {
          const response = await (0, api.v$)(
            `${CART_API.GET_MY_CART}?page=${page}&limit=${limit}`,
            { method: 'GET' }
          );
          if (!response.ok) {
            let errorMessage = '장바구니 조회 실패';
            try {
              const errorText = await response.text();
              if (errorText)
                try {
                  errorMessage = JSON.parse(errorText).message || errorMessage;
                } catch {
                  errorMessage = errorText || errorMessage;
                }
            } catch {}
            if (401 === response.status)
              throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || !Array.isArray(data.data))
            throw new Error(data.message || '장바구니 데이터 형식이 올바르지 않습니다.');
          return data;
        },
        updateQuantity: async (cartItemId, quantity) => {
          const response = await (0, api.v$)(CART_API.UPDATE_QUANTITY, {
            method: 'PATCH',
            body: JSON.stringify({ cartItemId, quantity }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '수량 수정 실패');
          }
          const data = await response.json();
          if (!data.success || !data.data)
            throw new Error(data.message || '수량 수정 응답 형식이 올바르지 않습니다.');
          return data;
        },
        deleteFromCart: async (cartItemId) => {
          const response = await (0, api.v$)(CART_API.DELETE_FROM_CART, {
            method: 'DELETE',
            body: JSON.stringify({ cartItemId }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '장바구니 삭제 실패');
          }
          const data = await response.json();
          if (!data.success || !data.data)
            throw new Error(data.message || '장바구니 삭제 응답 형식이 올바르지 않습니다.');
          return data;
        },
        deleteMultiple: async (cartItemIds) => {
          const response = await (0, api.v$)(CART_API.DELETE_MULTIPLE, {
            method: 'DELETE',
            body: JSON.stringify({ cartItemIds }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '장바구니 삭제 실패');
          }
          const data = await response.json();
          if (!data.success || !data.data)
            throw new Error(data.message || '장바구니 삭제 응답 형식이 올바르지 않습니다.');
          return data;
        },
      };
    },
    './src/features/cart/queries/cart.keys.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { z: () => cartKeys });
      const cartKeys = {
        all: ['cart'],
        lists: () => [...cartKeys.all, 'list'],
        list: (page, pageSize, cartItemIdsParam) => [
          ...cartKeys.lists(),
          page,
          pageSize,
          cartItemIdsParam || 'all',
        ],
        budget: (year, month) => ['budget', year, month],
      };
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
