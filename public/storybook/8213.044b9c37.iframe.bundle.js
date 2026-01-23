'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8213],
  {
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
    './src/components/molecules/ItemMenu/ItemMenu.tsx'(
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
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        );
      const ItemMenu = ({ onClick }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            dropdownRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            buttonRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            const handleClickOutside = (event) => {
              const target = event.target;
              dropdownRef.current &&
                target &&
                !dropdownRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target) &&
                setOpen(!1);
            };
            return (
              document.addEventListener('mousedown', handleClickOutside),
              () => document.removeEventListener('mousedown', handleClickOutside)
            );
          }, []);
          const handleItemClick = (action) => {
            (setOpen(!1), onClick?.(action));
          };
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'relative w-24 h-24',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                {
                  ref: buttonRef,
                  onClick: () => setOpen(!open),
                  className: 'w-24 h-24 p-1 cursor-pointer',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    {
                      src: '/icons/ic-more.svg',
                      alt: '더보기',
                      width: 24,
                      height: 24,
                      unoptimized: !0,
                    }
                  ),
                }
              ),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                ref: dropdownRef,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'absolute top-0 flex-col bg-white shadow-dropdown rounded overflow-hidden z-dropdown w-100',
                  'right-full xl:left-full xl:right-auto',
                  open ? 'flex' : 'hidden'
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    role: 'button',
                    tabIndex: 0,
                    className:
                      'flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer',
                    onClick: () => handleItemClick('edit'),
                    onKeyDown: (e) => {
                      ('Enter' !== e.key && ' ' !== e.key) ||
                        (e.preventDefault(), handleItemClick('edit'));
                    },
                    children: '상품 수정',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    role: 'button',
                    tabIndex: 0,
                    className:
                      'flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer',
                    onClick: () => handleItemClick('delete'),
                    onKeyDown: (e) => {
                      ('Enter' !== e.key && ' ' !== e.key) ||
                        (e.preventDefault(), handleItemClick('delete'));
                    },
                    children: '상품 삭제',
                  }),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ItemMenu;
      ItemMenu.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ItemMenu',
        props: {
          onClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: "(action: 'edit' | 'delete') => void",
              signature: {
                arguments: [
                  {
                    type: {
                      name: 'union',
                      raw: "'edit' | 'delete'",
                      elements: [
                        { name: 'literal', value: "'edit'" },
                        { name: 'literal', value: "'delete'" },
                      ],
                    },
                    name: 'action',
                  },
                ],
                return: { name: 'void' },
              },
            },
            description: '',
          },
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
    './src/components/molecules/ProductDetailHeader/ProductDetailHeader.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => ProductDetailHeader_ProductDetailHeader,
      });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        ItemMenu = __webpack_require__('./src/components/molecules/ItemMenu/ItemMenu.tsx'),
        ProductTile = __webpack_require__('./src/components/molecules/ProductTile/ProductTile.tsx'),
        NumberInput = __webpack_require__('./src/components/molecules/NumberInput/NumberInput.tsx'),
        PriceText = __webpack_require__('./src/components/atoms/PriceText/PriceText.tsx'),
        authStore = __webpack_require__('./src/lib/store/authStore.ts');
      const ROLE_LEVEL = { user: 1, manager: 2, admin: 3 },
        ProductDetailHeaderMobile = ({
          productName,
          purchaseCount,
          price,
          onQuantityChange,
          onMenuClick,
          onAddToCart,
          quantity,
          shouldShowItemMenu,
        }) =>
          (0, jsx_runtime.jsx)('div', {
            className: 'flex tablet:hidden w-full',
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'flex w-full flex-col gap-8',
              children: [
                (0, jsx_runtime.jsxs)('div', {
                  className: 'flex items-start justify-between gap-8',
                  children: [
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex flex-col gap-2',
                      children: [
                        (0, jsx_runtime.jsx)('h1', {
                          className: 'text-16 leading-24 tracking--0.4 font-normal text-gray-950',
                          children: productName,
                        }),
                        (0, jsx_runtime.jsxs)('span', {
                          className:
                            'text-13 leading-18 tracking--0.3 font-bold text-secondary-500',
                          children: [purchaseCount, '회 구매'],
                        }),
                      ],
                    }),
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex items-start gap-8 shrink-0',
                      children: [
                        (0, jsx_runtime.jsx)(NumberInput.Q, {
                          variant: 'default',
                          label: '수량',
                          onQuantityChange,
                          value: quantity,
                        }),
                        shouldShowItemMenu &&
                          (0, jsx_runtime.jsx)(ItemMenu.A, { onClick: onMenuClick }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime.jsx)(PriceText.A, {
                  value: price,
                  className: 'text-16 leading-24 tracking--0.4 font-bold text-gray-950',
                }),
                (0, jsx_runtime.jsx)(Button.A, {
                  variant: 'primary',
                  size: 'lg',
                  fullWidth: !0,
                  className: 'mt-32',
                  onClick: () => onAddToCart?.(quantity),
                  children: '장바구니 담기',
                }),
              ],
            }),
          }),
        ProductDetailHeaderTablet = ({
          productName,
          purchaseCount,
          price,
          onQuantityChange,
          onMenuClick,
          onAddToCart,
          quantity,
          shouldShowItemMenu,
        }) =>
          (0, jsx_runtime.jsx)('div', {
            className: 'hidden tablet:flex desktop:hidden w-full',
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'flex w-full flex-col gap-8',
              children: [
                (0, jsx_runtime.jsxs)('div', {
                  className: 'flex items-start justify-between gap-8',
                  children: [
                    (0, jsx_runtime.jsx)(ProductTile.A, {
                      variant: 'product',
                      name: productName,
                      price,
                      purchaseCount,
                      size: 'md',
                    }),
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex items-start gap-8 shrink-0',
                      children: [
                        (0, jsx_runtime.jsx)(NumberInput.Q, {
                          variant: 'default',
                          label: '수량',
                          onQuantityChange,
                          value: quantity,
                        }),
                        shouldShowItemMenu &&
                          (0, jsx_runtime.jsx)(ItemMenu.A, { onClick: onMenuClick }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime.jsx)(Button.A, {
                  variant: 'primary',
                  size: 'lg',
                  fullWidth: !0,
                  className: 'mt-32',
                  onClick: () => onAddToCart?.(quantity),
                  children: '장바구니 담기',
                }),
              ],
            }),
          }),
        ProductDetailHeaderDesktop = ({
          productName,
          purchaseCount,
          price,
          onQuantityChange,
          onMenuClick,
          onAddToCart,
          quantity,
          shouldShowItemMenu,
        }) =>
          (0, jsx_runtime.jsx)('div', {
            className: 'hidden desktop:flex w-full',
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'flex w-full flex-col gap-8',
              children: [
                (0, jsx_runtime.jsxs)('div', {
                  className: 'flex items-start justify-between gap-8',
                  children: [
                    (0, jsx_runtime.jsx)(ProductTile.A, {
                      variant: 'product',
                      name: productName,
                      price,
                      purchaseCount,
                      size: 'md',
                    }),
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex items-start gap-8 shrink-0',
                      children: [
                        (0, jsx_runtime.jsx)(NumberInput.Q, {
                          variant: 'default',
                          label: '수량',
                          onQuantityChange,
                          value: quantity,
                        }),
                        shouldShowItemMenu &&
                          (0, jsx_runtime.jsx)(ItemMenu.A, { onClick: onMenuClick }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime.jsx)(Button.A, {
                  variant: 'primary',
                  size: 'lg',
                  fullWidth: !0,
                  className: 'mt-32',
                  onClick: () => onAddToCart?.(quantity),
                  children: '장바구니 담기',
                }),
              ],
            }),
          }),
        ProductDetailHeader = ({
          productName,
          purchaseCount,
          price,
          type: propType,
          onQuantityChange,
          onMenuClick,
          onAddToCart,
          className = '',
        }) => {
          const [quantity, setQuantity] = (0, react.useState)(1),
            user = (0, authStore.n)((state) => state.user),
            canUseMenu = (0, react.useMemo)(() => {
              if (!user?.role) return !1;
              const userRole = user.role;
              return ROLE_LEVEL[userRole] >= ROLE_LEVEL.manager;
            }, [user?.role]),
            type = (0, react.useMemo)(
              () => (void 0 !== propType ? propType : canUseMenu ? 'default' : 'simple'),
              [propType, canUseMenu]
            ),
            handleQuantityChange = (option) => {
              const next = Number(option.key);
              Number.isNaN(next) || (setQuantity(next), onQuantityChange?.(option));
            },
            totalPrice = price * quantity,
            shouldShowItemMenu = 'default' === type && canUseMenu && !!onMenuClick;
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('flex flex-col gap-8', className),
            children: [
              (0, jsx_runtime.jsx)(ProductDetailHeaderMobile, {
                productName,
                purchaseCount,
                price: totalPrice,
                onQuantityChange: handleQuantityChange,
                onMenuClick,
                onAddToCart,
                quantity,
                type,
                shouldShowItemMenu,
              }),
              (0, jsx_runtime.jsx)(ProductDetailHeaderTablet, {
                productName,
                purchaseCount,
                price: totalPrice,
                onQuantityChange: handleQuantityChange,
                onMenuClick,
                onAddToCart,
                quantity,
                type,
                shouldShowItemMenu,
              }),
              (0, jsx_runtime.jsx)(ProductDetailHeaderDesktop, {
                productName,
                purchaseCount,
                price: totalPrice,
                onQuantityChange: handleQuantityChange,
                onMenuClick,
                onAddToCart,
                quantity,
                type,
                shouldShowItemMenu,
              }),
            ],
          });
        },
        ProductDetailHeader_ProductDetailHeader = ProductDetailHeader;
      ProductDetailHeader.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProductDetailHeader',
        props: {
          productName: { required: !0, tsType: { name: 'string' }, description: '' },
          purchaseCount: { required: !0, tsType: { name: 'number' }, description: '' },
          price: { required: !0, tsType: { name: 'number' }, description: '' },
          type: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'default' | 'simple'",
              elements: [
                { name: 'literal', value: "'default'" },
                { name: 'literal', value: "'simple'" },
              ],
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
            description: '',
          },
          onMenuClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: "(action: 'edit' | 'delete') => void",
              signature: {
                arguments: [
                  {
                    type: {
                      name: 'union',
                      raw: "'edit' | 'delete'",
                      elements: [
                        { name: 'literal', value: "'edit'" },
                        { name: 'literal', value: "'delete'" },
                      ],
                    },
                    name: 'action',
                  },
                ],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onAddToCart: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(quantity: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'quantity' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          className: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
        },
      };
    },
    './src/components/molecules/ProductTile/ProductTile.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/PriceText/PriceText.tsx'
        );
      const ProductTile = (props) => {
          const { name, price, size = 'md', className, variant } = props,
            nameClass =
              'sm' === size
                ? 'text-14 leading-22 tracking--0.35 whitespace-nowrap overflow-hidden text-ellipsis'
                : 'text-14 leading-22 tracking--0.35 tablet:text-16 tablet:leading-24 tablet:tracking--0.4 whitespace-nowrap overflow-hidden text-ellipsis',
            subClass =
              'sm' === size
                ? 'text-13 leading-18 tracking--0.3'
                : 'text-13 leading-18 tracking--0.3 tablet:text-14 tablet:leading-22 tablet:tracking--0.35',
            priceClass =
              'sm' === size
                ? 'text-14 leading-22 tracking--0.35'
                : 'text-14 leading-22 tracking--0.35 tablet:text-16 tablet:leading-24 tablet:tracking--0.4';
          let subNode = null,
            purchaseCountNode = null,
            orderSubNode = null,
            orderSubNodeInline = null;
          if ('product' === variant) {
            const { purchaseCount } = props;
            void 0 !== purchaseCount &&
              ((purchaseCountNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                'span',
                {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                    'font-bold text-secondary-500',
                    subClass
                  ),
                  children: [purchaseCount, '회 구매'],
                }
              )),
              (subNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'font-bold text-secondary-500',
                  subClass
                ),
                children: [purchaseCount, '회 구매'],
              })));
          } else if ('order' === variant) {
            const { quantity, shippingFee, metaOverride } = props;
            if (metaOverride)
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: metaOverride,
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: metaOverride,
                  }
                )));
            else if (void 0 !== quantity)
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: ['수량 ', quantity, '개'],
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: ['수량 ', quantity, '개'],
                  }
                )));
            else if (void 0 !== shippingFee) {
              const shippingText =
                0 === shippingFee ? '무료' : `${shippingFee.toLocaleString('ko-KR')}원`;
              ((orderSubNode = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'text-gray-600',
                  subClass
                ),
                children: ['배송비 ', shippingText],
              })),
                (orderSubNodeInline = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                  'span',
                  {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-600',
                      subClass
                    ),
                    children: ['배송비 ', shippingText],
                  }
                )));
            }
          }
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              'flex flex-col gap-2 flex-1 min-w-0',
              className
            ),
            children:
              'product' === variant && purchaseCountNode
                ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                    {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'flex flex-col gap-2 desktop:hidden',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                'font-normal text-gray-950',
                                nameClass
                              ),
                              children: name,
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                value: price,
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-bold text-gray-950',
                                  priceClass
                                ),
                              }
                            ),
                            subNode,
                          ],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                          className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                              className: 'flex flex-row items-center gap-8',
                              children: [
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-normal text-gray-950',
                                    nameClass
                                  ),
                                  children: name,
                                }),
                                purchaseCountNode,
                              ],
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                value: price,
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-bold text-gray-950',
                                  priceClass
                                ),
                              }
                            ),
                          ],
                        }),
                      ],
                    }
                  )
                : 'order' === variant && orderSubNode
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                      {
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'flex flex-col gap-2 desktop:hidden',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                  'font-normal text-gray-950',
                                  nameClass
                                ),
                                children: name,
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                                {
                                  value: price,
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-bold text-gray-950',
                                    priceClass
                                  ),
                                }
                              ),
                              orderSubNode,
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                            className: 'hidden desktop:flex desktop:flex-col desktop:gap-2',
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                                className: 'flex flex-row items-center gap-8',
                                children: [
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                      'font-normal text-gray-950',
                                      nameClass
                                    ),
                                    children: name,
                                  }),
                                  orderSubNodeInline,
                                ],
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                                {
                                  value: price,
                                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                    'font-bold text-gray-950',
                                    priceClass
                                  ),
                                }
                              ),
                            ],
                          }),
                        ],
                      }
                    )
                  : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
                      {
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h1', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                              'font-normal text-gray-950',
                              nameClass
                            ),
                            children: name,
                          }),
                          subNode,
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            _components_atoms_PriceText_PriceText__WEBPACK_IMPORTED_MODULE_2__.A,
                            {
                              value: price,
                              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                                'font-bold text-gray-950',
                                priceClass
                              ),
                            }
                          ),
                        ],
                      }
                    ),
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ProductTile;
      ProductTile.__docgenInfo = { description: '', methods: [], displayName: 'ProductTile' };
    },
  },
]);
