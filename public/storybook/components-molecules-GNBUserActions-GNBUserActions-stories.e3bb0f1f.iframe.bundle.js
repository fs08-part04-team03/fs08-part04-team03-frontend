'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [5807],
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
    './src/components/molecules/GNBUserActions/GNBUserActions.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithoutLogout: () => WithoutLogout,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _components_molecules_UserProfile_UserProfile__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__('./src/components/molecules/UserProfile/UserProfile.tsx');
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/GNBUserActions',
          component: __webpack_require__(
            './src/components/molecules/GNBUserActions/GNBUserActions.tsx'
          ).ec,
          tags: ['autodocs'],
          parameters: {
            docs: {
              description: {
                component:
                  'GNB 우측 사용자 액션 영역 컴포넌트입니다. 장바구니, 찜목록, 유저프로필, 로그아웃, 햄버거 메뉴를 포함합니다.',
              },
            },
          },
          argTypes: {
            userProfile: {
              control: !1,
              description: 'GNB 우측에 표시할 유저 프로필 컴포넌트 (태블릿/데스크탑에서만 사용)',
            },
            onLogout: { action: 'logout', description: '로그아웃 클릭 시 호출되는 콜백' },
            onMenuClick: { action: 'menu-click', description: '햄버거 메뉴 클릭 시 호출되는 콜백' },
          },
        },
        Default = {
          args: {
            companyId: 'company-1',
            cartCount: 0,
            userProfile: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _components_molecules_UserProfile_UserProfile__WEBPACK_IMPORTED_MODULE_1__.Ay,
              {
                name: '홍길동',
                company: { name: '스낵코리아' },
                avatarSrc: '/images/test-profile-image.jpg',
                variant: 'secondary',
              }
            ),
          },
        },
        WithoutLogout = {
          args: {
            companyId: 'company-1',
            cartCount: 5,
            userProfile: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _components_molecules_UserProfile_UserProfile__WEBPACK_IMPORTED_MODULE_1__.Ay,
              { name: '김철수', company: { name: '테크스타트업' }, variant: 'secondary' }
            ),
          },
        },
        __namedExportsOrder = ['Default', 'WithoutLogout'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    companyId: \'company-1\',\n    cartCount: 0,\n    userProfile: <UserProfile name="홍길동" company={{\n      name: \'스낵코리아\'\n    }} avatarSrc="/images/test-profile-image.jpg" variant="secondary" />\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithoutLogout.parameters = {
          ...WithoutLogout.parameters,
          docs: {
            ...WithoutLogout.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    companyId: \'company-1\',\n    cartCount: 5,\n    userProfile: <UserProfile name="김철수" company={{\n      name: \'테크스타트업\'\n    }} variant="secondary" />\n  }\n}',
              ...WithoutLogout.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
