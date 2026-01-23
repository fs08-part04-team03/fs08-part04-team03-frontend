'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9155],
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
    './src/components/molecules/ProductDetailHeader/ProductDetailHeader.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          DefaultWithAdmin: () => DefaultWithAdmin,
          DefaultWithManager: () => DefaultWithManager,
          DefaultWithUser: () => DefaultWithUser,
          Simple: () => Simple,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _lib_store_authStore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/lib/store/authStore.ts'
        );
      const withAuth = (role) => {
          const AuthDecorator = (Story) => (
            react__WEBPACK_IMPORTED_MODULE_1__.useEffect(
              () => (
                role
                  ? _lib_store_authStore__WEBPACK_IMPORTED_MODULE_2__.n
                      .getState()
                      .setAuth({
                        user: {
                          id: '1',
                          email: 'test@example.com',
                          name: '테스트 사용자',
                          role,
                          companyId: '1',
                        },
                        accessToken: 'mock-token',
                      })
                  : _lib_store_authStore__WEBPACK_IMPORTED_MODULE_2__.n.getState().clearAuth(),
                () => {
                  _lib_store_authStore__WEBPACK_IMPORTED_MODULE_2__.n.getState().clearAuth();
                }
              ),
              []
            ),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Story, {})
          );
          return ((AuthDecorator.displayName = `withAuth(${role || 'null'})`), AuthDecorator);
        },
        __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/ProductDetailHeader',
          component: __webpack_require__(
            './src/components/molecules/ProductDetailHeader/ProductDetailHeader.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: { layout: 'padded' },
          argTypes: {
            productName: { control: 'text', description: '제품명' },
            purchaseCount: { control: 'number', description: '구매 횟수' },
            price: { control: 'number', description: '제품 단가 (1개 가격)' },
            type: {
              control: 'radio',
              options: ['default', 'simple'],
              description: '헤더 타입 (simple일 경우 ItemMenu 숨김)',
            },
            onQuantityChange: {
              action: 'quantity-changed',
              description: '수량 변경 시 호출되는 콜백 함수',
            },
            onMenuClick: {
              action: 'menu-clicked',
              description: '케밥 메뉴 클릭 시 호출되는 콜백 함수',
            },
            onAddToCart: {
              action: 'add-to-cart',
              description: '장바구니 담기 버튼 클릭 시 호출되는 콜백 함수',
            },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        DefaultWithManager = {
          args: {
            productName: '코카콜라',
            purchaseCount: 29,
            price: 2e3,
            type: 'default',
            onMenuClick: () => {},
          },
          decorators: [withAuth('manager')],
          parameters: {
            docs: {
              description: {
                story:
                  '기본 타입입니다. 매니저 역할의 사용자에게는 ItemMenu가 표시되며, 수량 변경 시 총 금액이 자동 계산됩니다.',
              },
            },
          },
        },
        DefaultWithAdmin = {
          args: {
            productName: '코카콜라',
            purchaseCount: 29,
            price: 2e3,
            type: 'default',
            onMenuClick: () => {},
          },
          decorators: [withAuth('admin')],
          parameters: {
            docs: {
              description: {
                story:
                  '기본 타입입니다. 관리자 역할의 사용자에게는 ItemMenu가 표시되며, 수량 변경 시 총 금액이 자동 계산됩니다.',
              },
            },
          },
        },
        DefaultWithUser = {
          args: {
            productName: '코카콜라',
            purchaseCount: 29,
            price: 2e3,
            type: 'default',
            onMenuClick: () => {},
          },
          decorators: [withAuth('user')],
          parameters: {
            docs: {
              description: {
                story:
                  '기본 타입이지만 일반 사용자(user) 역할의 사용자에게는 ItemMenu가 표시되지 않습니다. 수량 변경 시 총 금액이 자동 계산됩니다.',
              },
            },
          },
        },
        Simple = {
          args: {
            productName: '코카콜라',
            purchaseCount: 29,
            price: 2e3,
            type: 'simple',
            onMenuClick: () => {},
          },
          decorators: [withAuth('manager')],
          parameters: {
            docs: {
              description: {
                story:
                  'simple 타입입니다. type이 simple이면 역할과 관계없이 ItemMenu가 숨겨지고 수량 선택과 장바구니 기능만 제공합니다.',
              },
            },
          },
        },
        __namedExportsOrder = [
          'DefaultWithManager',
          'DefaultWithAdmin',
          'DefaultWithUser',
          'Simple',
        ];
      ((DefaultWithManager.parameters = {
        ...DefaultWithManager.parameters,
        docs: {
          ...DefaultWithManager.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    productName: '코카콜라',\n    purchaseCount: 29,\n    price: 2000,\n    type: 'default',\n    onMenuClick: () => {}\n  },\n  decorators: [withAuth('manager')],\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 타입입니다. 매니저 역할의 사용자에게는 ItemMenu가 표시되며, 수량 변경 시 총 금액이 자동 계산됩니다.'\n      }\n    }\n  }\n}",
            ...DefaultWithManager.parameters?.docs?.source,
          },
          description: {
            story:
              '=====================\nDefault with Manager (ItemMenu 표시)\n======================',
            ...DefaultWithManager.parameters?.docs?.description,
          },
        },
      }),
        (DefaultWithAdmin.parameters = {
          ...DefaultWithAdmin.parameters,
          docs: {
            ...DefaultWithAdmin.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    productName: '코카콜라',\n    purchaseCount: 29,\n    price: 2000,\n    type: 'default',\n    onMenuClick: () => {}\n  },\n  decorators: [withAuth('admin')],\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 타입입니다. 관리자 역할의 사용자에게는 ItemMenu가 표시되며, 수량 변경 시 총 금액이 자동 계산됩니다.'\n      }\n    }\n  }\n}",
              ...DefaultWithAdmin.parameters?.docs?.source,
            },
            description: {
              story:
                '=====================\nDefault with Admin (ItemMenu 표시)\n======================',
              ...DefaultWithAdmin.parameters?.docs?.description,
            },
          },
        }),
        (DefaultWithUser.parameters = {
          ...DefaultWithUser.parameters,
          docs: {
            ...DefaultWithUser.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    productName: '코카콜라',\n    purchaseCount: 29,\n    price: 2000,\n    type: 'default',\n    onMenuClick: () => {}\n  },\n  decorators: [withAuth('user')],\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 타입이지만 일반 사용자(user) 역할의 사용자에게는 ItemMenu가 표시되지 않습니다. 수량 변경 시 총 금액이 자동 계산됩니다.'\n      }\n    }\n  }\n}",
              ...DefaultWithUser.parameters?.docs?.source,
            },
            description: {
              story:
                '=====================\nDefault with User (ItemMenu 숨김)\n======================',
              ...DefaultWithUser.parameters?.docs?.description,
            },
          },
        }),
        (Simple.parameters = {
          ...Simple.parameters,
          docs: {
            ...Simple.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    productName: '코카콜라',\n    purchaseCount: 29,\n    price: 2000,\n    type: 'simple',\n    onMenuClick: () => {}\n  },\n  decorators: [withAuth('manager')],\n  parameters: {\n    docs: {\n      description: {\n        story: 'simple 타입입니다. type이 simple이면 역할과 관계없이 ItemMenu가 숨겨지고 수량 선택과 장바구니 기능만 제공합니다.'\n      }\n    }\n  }\n}",
              ...Simple.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nSimple (ItemMenu 숨김)\n======================',
              ...Simple.parameters?.docs?.description,
            },
          },
        }));
    },
    './src/lib/store/authStore.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { n: () => useAuthStore });
      var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/zustand/esm/react.mjs'
        ),
        _utils_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./src/utils/logger.ts');
      const useAuthStore = (0, zustand__WEBPACK_IMPORTED_MODULE_0__.v)()((set) => ({
        user: null,
        accessToken: null,
        isLoading: !1,
        isInitialized: !1,
        setAuth: ({ user, accessToken }) => {
          (_utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.info('[AuthStore] setAuth 호출:', {
            hasUser: !!user,
            hasAccessToken: !!accessToken,
          }),
            set({ user, accessToken }));
        },
        setUser: (user) => set({ user }),
        startLoading: () => set({ isLoading: !0 }),
        finishLoading: () => set({ isLoading: !1 }),
        clearAuth: () => {
          (_utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.info(
            '[AuthStore] clearAuth - 메모리에서 인증 정보 제거'
          ),
            set({ user: null, accessToken: null }));
        },
        setInitialized: () => {
          (_utils_logger__WEBPACK_IMPORTED_MODULE_1__.v.info(
            '[AuthStore] setInitialized - 앱 초기화 완료'
          ),
            set({ isInitialized: !0 }));
        },
      }));
    },
    './src/utils/logger.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      __webpack_require__.d(__webpack_exports__, { v: () => logger });
      __webpack_require__('./node_modules/console-browserify/index.js');
      const logger = {
        error: (message, ...args) => {
          false;
        },
        warn: (message, ...args) => {
          false;
        },
        info: (message, ...args) => {
          false;
        },
      };
    },
  },
]);
