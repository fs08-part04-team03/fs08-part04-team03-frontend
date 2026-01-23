'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4113],
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
    './src/components/molecules/Toast/Toast.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { y: () => Toast });
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
      const CloseButton = ({ onClose }) =>
          onClose
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                {
                  variant: 'filled',
                  size: 'sm',
                  onClick: onClose,
                  className: 'bg-white hover:bg-white cursor-pointer ml-2',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'relative w-24 h-24',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                      { src: '/icons/close-circle.svg', alt: 'close', fill: !0, unoptimized: !0 }
                    ),
                  }),
                }
              )
            : null,
        ToastContent = ({ variant, formattedAmount, onClose }) =>
          'error' !== variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, { onClose })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-2',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                    children: '남은 예산',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                    children: formattedAmount,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, { onClose }),
                ],
              }),
        DesktopMessage = ({ message }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className: 'font-suit font-bold text-16 leading-none tracking--0.35',
            children: message,
          }),
        TabletMessage = ({ message, variant }) =>
          'error' === variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                children: '수량을 줄이거나 항목을 제거해주세요.',
              })
            : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                className: 'font-suit font-bold text-16 leading-none tracking--0.35',
                children: message,
              }),
        MobileMessage = ({ variant, message }) =>
          'error' === variant
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                children: [
                  '예산이 부족합니다.',
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('br', {}),
                  '수량을 줄이거나 항목을 제거해 주세요.',
                ],
              })
            : 'custom' === variant
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: message || '',
                })
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: '예산이 변경되었습니다.',
                }),
        Toast = ({ amount = '0', variant, message, onClose, duration = 2e3 }) => {
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!onClose) return () => {};
            const timer = setTimeout(() => {
              onClose();
            }, duration);
            return () => clearTimeout(timer);
          }, [onClose, duration]);
          let iconSrc = '',
            defaultMessage = '';
          'error' === variant
            ? ((iconSrc = '/icons/red-info.svg'),
              (defaultMessage = '예산이 부족합니다. 수량을 줄이거나 항목을 제거해주세요.'))
            : 'custom' === variant
              ? ((iconSrc = '/icons/red-info.svg'), (defaultMessage = message || ''))
              : ((iconSrc = '/icons/check-icon.svg'), (defaultMessage = '예산이 변경되었습니다.'));
          const finalMessage = message || defaultMessage;
          let formattedAmount = '0원';
          const amountNumber = Number(amount);
          return (
            Number.isNaN(amountNumber) ||
              (formattedAmount = `${new Intl.NumberFormat('ko-KR').format(amountNumber)}원`),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              role: 'status',
              'aria-live': 'error' === variant ? 'assertive' : 'polite',
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex items-center text-white relative rounded-default bg-[rgba(0,0,0,0.80)] shadow-toast backdrop-blur-toast',
                'gap-8',
                'z-toast',
                'px-20',
                'mobile:px-20',
                'tablet:px-toast-32',
                'desktop:px-50',
                'desktop:w-1152 desktop:h-80',
                'tablet:w-696 tablet:h-80',
                'mobile:w-350 mobile:h-64'
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'shrink-0 w-24 h-24 relative',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    { src: iconSrc, alt: 'toast-icon', fill: !0, unoptimized: !0 }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex-1 flex flex-col justify-center ml-3',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'desktop:flex tablet:hidden mobile:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(DesktopMessage, {
                          message: finalMessage,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToastContent, {
                          variant,
                          formattedAmount,
                          onClose,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'tablet:flex desktop:hidden mobile:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TabletMessage, {
                          message: finalMessage,
                          variant,
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ToastContent, {
                          variant,
                          formattedAmount,
                          onClose,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'mobile:flex tablet:hidden desktop:hidden justify-between items-center w-full',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className:
                            'flex flex-col font-suit font-bold text-14 leading-160 tracking--0.35',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            MobileMessage,
                            { variant, message: finalMessage }
                          ),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseButton, {
                          onClose,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          );
        };
      Toast.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Toast',
        props: {
          amount: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'0'", computed: !1 },
          },
          variant: {
            required: !0,
            tsType: {
              name: 'union',
              raw: "'error' | 'success' | 'custom'",
              elements: [
                { name: 'literal', value: "'error'" },
                { name: 'literal', value: "'success'" },
                { name: 'literal', value: "'custom'" },
              ],
            },
            description: '',
          },
          message: { required: !1, tsType: { name: 'string' }, description: '' },
          onClose: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          duration: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '2000', computed: !1 },
          },
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
    './src/features/purchase/components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => PurchaseRequestDetailActionsOrg_PurchaseRequestDetailActionsOrg,
      });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        Toast = __webpack_require__('./src/components/molecules/Toast/Toast.tsx'),
        constants = __webpack_require__('./src/features/purchase/constants/index.ts'),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        cart_api = __webpack_require__('./src/features/cart/api/cart.api.ts'),
        cart_keys = __webpack_require__('./src/features/cart/queries/cart.keys.ts'),
        logger = __webpack_require__('./src/utils/logger.ts');
      var usePurchaseNavigation = __webpack_require__(
        './src/features/purchase/handlers/usePurchaseNavigation.ts'
      );
      const ActionButtonGroup = ({
          primaryLabel,
          secondaryLabel,
          onPrimaryClick,
          onSecondaryClick,
          isPrimaryDisabled = !1,
        }) =>
          (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className:
                  'fixed bottom-0 left-0 right-0 flex justify-center items-center w-full gap-16 text-16 bg-white p-16 border-t border-gray-200 desktop:hidden',
                children: [
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'secondary',
                    size: 'sm',
                    className: 'flex-1 max-w-338 h-50',
                    onClick: onSecondaryClick,
                    children: secondaryLabel,
                  }),
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'primary',
                    size: 'sm',
                    className: 'flex-1 max-w-338 h-50',
                    onClick: onPrimaryClick,
                    inactive: isPrimaryDisabled,
                    children: primaryLabel,
                  }),
                ],
              }),
              (0, jsx_runtime.jsxs)('div', {
                className:
                  'hidden desktop:flex justify-center items-center w-full gap-16 text-16 mt-24 tablet:mt-42 desktop:mt-70',
                children: [
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'secondary',
                    size: 'sm',
                    className: 'flex-1 max-w-338 h-50',
                    onClick: onSecondaryClick,
                    children: secondaryLabel,
                  }),
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'primary',
                    size: 'sm',
                    className: 'flex-1 max-w-338 h-50',
                    onClick: onPrimaryClick,
                    inactive: isPrimaryDisabled,
                    children: primaryLabel,
                  }),
                ],
              }),
            ],
          }),
        PurchaseRequestDetailActionsOrg = ({
          companyId,
          actionType = 'user',
          onApproveClick,
          onRejectClick,
          isBudgetSufficient = !0,
          purchaseRequest,
          onGoToList,
        }) => {
          const [showToast, setShowToast] = (0, react.useState)(!1),
            [toastMessage, setToastMessage] = (0, react.useState)(''),
            [toastVariant, setToastVariant] = (0, react.useState)('error'),
            navigation = (0, usePurchaseNavigation.b)(companyId),
            { isAddingToCart, handleAddToCart } = (({
              companyId,
              purchaseRequest,
              onSuccess,
              onError,
            }) => {
              const queryClient = (0, QueryClientProvider.jE)(),
                [isAddingToCart, setIsAddingToCart] = (0, react.useState)(!1),
                validateAddToCart = (0, react.useCallback)(
                  () =>
                    companyId
                      ? !(!purchaseRequest || !purchaseRequest.purchaseItems?.length) ||
                        (logger.v.warn('purchaseRequest missing or empty in validateAddToCart', {
                          hasPurchaseRequest: !!purchaseRequest,
                          itemCount: purchaseRequest?.purchaseItems?.length ?? 0,
                        }),
                        onError?.(constants.rk.NO_ITEMS_TO_ADD),
                        !1)
                      : (logger.v.warn('companyId missing in validateAddToCart', {
                          hasCompanyId: !1,
                        }),
                        onError?.(constants.rk.COMPANY_NOT_SELECTED),
                        !1),
                  [companyId, purchaseRequest, onError]
                ),
                addItemsToCart = (0, react.useCallback)(async () => {
                  if (!purchaseRequest) throw new Error('purchaseRequest is required');
                  const results = await Promise.allSettled(
                      purchaseRequest.purchaseItems.map((item) =>
                        cart_api.z.addToCart(item.products.id, item.quantity)
                      )
                    ),
                    failures = results.filter((r) => 'rejected' === r.status),
                    successCount = results.length - failures.length;
                  return { success: 0 === failures.length, successCount };
                }, [purchaseRequest]);
              return {
                isAddingToCart,
                handleAddToCart: (0, react.useCallback)(async () => {
                  if (validateAddToCart()) {
                    setIsAddingToCart(!0);
                    try {
                      const { success, successCount } = await addItemsToCart();
                      if (
                        (await queryClient.invalidateQueries({ queryKey: cart_keys.z.all }),
                        !success)
                      ) {
                        if (successCount > 0) {
                          const partialMessage = constants.rk.ADD_TO_CART_PARTIAL(successCount);
                          return void onError?.(partialMessage);
                        }
                        throw new Error(constants.rk.ADD_TO_CART_FAILED);
                      }
                      onSuccess?.();
                    } catch (error) {
                      (logger.v.error('Failed to add items to cart', {
                        hasError: !0,
                        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
                      }),
                        onError?.(
                          error instanceof Error ? error.message : constants.rk.ADD_TO_CART_FAILED
                        ));
                    } finally {
                      setIsAddingToCart(!1);
                    }
                  }
                }, [validateAddToCart, addItemsToCart, queryClient, onSuccess, onError]),
              };
            })({
              companyId,
              purchaseRequest,
              onSuccess: () => {
                (setToastVariant('success'),
                  setToastMessage(constants.rk.ADD_TO_CART_SUCCESS),
                  setShowToast(!0),
                  setTimeout(() => {
                    navigation.goToCart();
                  }, constants.xi.CART_REDIRECT_DELAY));
              },
              onError: (message) => {
                (setToastVariant('error'), setToastMessage(message), setShowToast(!0));
              },
            });
          (0, react.useEffect)(() => {
            if (showToast) {
              const timer = setTimeout(() => {
                setShowToast(!1);
              }, constants.xi.TOAST_DURATION);
              return () => clearTimeout(timer);
            }
          }, [showToast]);
          if ('admin' === actionType)
            return (0, jsx_runtime.jsx)(ActionButtonGroup, {
              primaryLabel: constants.WY.BUTTONS.APPROVE_ACTION,
              secondaryLabel: constants.WY.BUTTONS.REJECT_ACTION,
              onPrimaryClick: onApproveClick,
              onSecondaryClick: onRejectClick,
              isPrimaryDisabled: !isBudgetSufficient,
            });
          const isDisabled = !companyId || isAddingToCart || !purchaseRequest;
          return (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsx)(ActionButtonGroup, {
                primaryLabel: isAddingToCart
                  ? constants.WY.BUTTONS.ADDING_TO_CART
                  : constants.WY.BUTTONS.ADD_TO_CART,
                secondaryLabel: constants.WY.BUTTONS.GO_TO_LIST,
                onPrimaryClick: () => {
                  Promise.resolve(handleAddToCart()).catch(() => {});
                },
                onSecondaryClick: () => {
                  onGoToList ? onGoToList() : navigation.goToMyPurchaseRequests();
                },
                isPrimaryDisabled: isDisabled,
              }),
              showToast &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30',
                  children: (0, jsx_runtime.jsx)(Toast.y, {
                    variant: toastVariant,
                    message: toastMessage,
                    onClose: () => setShowToast(!1),
                  }),
                }),
            ],
          });
        },
        PurchaseRequestDetailActionsOrg_PurchaseRequestDetailActionsOrg =
          PurchaseRequestDetailActionsOrg;
      PurchaseRequestDetailActionsOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseRequestDetailActionsOrg',
        props: {
          companyId: { required: !1, tsType: { name: 'string' }, description: '' },
          actionType: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'user' | 'admin'",
              elements: [
                { name: 'literal', value: "'user'" },
                { name: 'literal', value: "'admin'" },
              ],
            },
            description: '',
            defaultValue: { value: "'user'", computed: !1 },
          },
          onApproveClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '관리자용: 승인/반려 버튼 클릭 시 실행될 핸들러 (모달 오픈)',
          },
          onRejectClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          isBudgetSufficient: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'true', computed: !1 },
          },
          purchaseRequest: {
            required: !1,
            tsType: { name: 'PurchaseRequestItem' },
            description:
              '장바구니 다시 담기에 필요한 구매 요청 데이터 (user actionType에서만 사용)',
          },
          onGoToList: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '목록으로 이동 핸들러 (user actionType에서만 사용)',
          },
        },
      };
    },
    './src/features/purchase/handlers/usePurchaseNavigation.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { b: () => usePurchaseNavigation });
      var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./src/utils/logger.ts'),
        _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__('./src/constants/index.ts');
      const usePurchaseNavigation = (companyId) => {
        const router = (0, next_navigation__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
        return {
          goHome: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(_constants__WEBPACK_IMPORTED_MODULE_3__.vp.COMPANY_ROOT(companyId));
          }, [companyId, router]),
          goToPurchaseHistory: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(
                _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MANAGER_PURCHASE_HISTORY(companyId)
              );
          }, [companyId, router]),
          goToPurchaseRequests: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(
                _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MANAGER_PURCHASE_REQUESTS(companyId)
              );
          }, [companyId, router]),
          goToMyPurchaseRequests: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId
              ? router.push(
                  _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MY_PURCHASE_REQUESTS(companyId)
                )
              : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                  '[PurchaseNavigation] companyId가 없어서 내 구매 요청 목록으로 이동할 수 없습니다.'
                );
          }, [companyId, router]),
          goToMyPurchaseRequestDetail: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (requestId) => {
              companyId && requestId
                ? router.push(
                    _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MY_PURCHASE_REQUEST_DETAIL(
                      companyId,
                      requestId
                    )
                  )
                : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[PurchaseNavigation] companyId 또는 requestId가 없어서 상세 페이지로 이동할 수 없습니다.'
                  );
            },
            [companyId, router]
          ),
          goToPurchaseRequestDetail: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (requestId) => {
              companyId && requestId
                ? router.push(
                    _constants__WEBPACK_IMPORTED_MODULE_3__.vp.MANAGER_PURCHASE_REQUEST_DETAIL(
                      companyId,
                      requestId
                    )
                  )
                : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[PurchaseNavigation] companyId 또는 requestId가 없어서 상세 페이지로 이동할 수 없습니다.'
                  );
            },
            [companyId, router]
          ),
          goToProducts: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId &&
              router.push(_constants__WEBPACK_IMPORTED_MODULE_3__.vp.PRODUCTS(companyId));
          }, [companyId, router]),
          goToProductDetail: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (productId) => {
              companyId && productId
                ? router.push(
                    _constants__WEBPACK_IMPORTED_MODULE_3__.vp.PRODUCT_DETAIL(companyId, productId)
                  )
                : _utils_logger__WEBPACK_IMPORTED_MODULE_2__.v.warn(
                    '[PurchaseNavigation] companyId 또는 productId가 없어서 상품 상세 페이지로 이동할 수 없습니다.'
                  );
            },
            [companyId, router]
          ),
          goToCart: (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
            companyId && router.push(_constants__WEBPACK_IMPORTED_MODULE_3__.vp.CART(companyId));
          }, [companyId, router]),
        };
      };
    },
  },
]);
