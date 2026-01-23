'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [251],
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
    './src/components/atoms/Logo/Logo.tsx'(
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
        next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_2__
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-70 h-20'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-225 h-100'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-344 h-97'),
        },
        sizeValues = {
          sm: { width: 70, height: 20 },
          md: { width: 225, height: 100 },
          lg: { width: 344, height: 97 },
        },
        Logo = ({ size = 'md', src = '/logo/logo.svg', alt = 'Logo', href, className }) => {
          const { width, height } = sizeValues[size],
            isSvg = src.endsWith('.svg'),
            imageElement = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_1__.A,
              {
                src,
                alt,
                width,
                height,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  sizeClass[size],
                  className
                ),
                priority: !0,
                unoptimized: isSvg,
              }
            );
          return href
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                next_link__WEBPACK_IMPORTED_MODULE_2___default(),
                { href, children: imageElement }
              )
            : imageElement;
        },
        __WEBPACK_DEFAULT_EXPORT__ = Logo;
      Logo.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Logo',
        props: {
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
          src: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/logo/logo.svg'", computed: !1 },
          },
          alt: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'Logo'", computed: !1 },
          },
          href: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
    './src/components/molecules/GNBBrand/GNBBrand.tsx'(
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
        next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        _components_atoms_Logo_Logo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Logo/Logo.tsx'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./src/constants/index.ts');
      const GNBBrand = () => {
          const params = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)(),
            companyId = params?.companyId,
            href = companyId
              ? _constants__WEBPACK_IMPORTED_MODULE_4__.vp.HOME(companyId)
              : _constants__WEBPACK_IMPORTED_MODULE_4__.vp.ROOT;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href,
              className: 'flex items-center',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Logo_Logo__WEBPACK_IMPORTED_MODULE_3__.A,
                { size: 'sm' }
              ),
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = GNBBrand;
      GNBBrand.__docgenInfo = { description: '', methods: [], displayName: 'GNBBrand' };
    },
    './src/components/organisms/AuthHeader/AuthHeader.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Desktop: () => Desktop,
          Mobile: () => Mobile,
          OnLoginPage: () => OnLoginPage,
          OnSignupPage: () => OnSignupPage,
          Tablet: () => Tablet,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => AuthHeader_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        GNBBrand = __webpack_require__('./src/components/molecules/GNBBrand/GNBBrand.tsx'),
        next_link = __webpack_require__('./node_modules/next/link.js'),
        link_default = __webpack_require__.n(next_link),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        IconButton = __webpack_require__('./src/components/atoms/IconButton/IconButton.tsx');
      const AuthUserActionsMobile = ({ className }) => {
          const pathname = (0, navigation.usePathname)(),
            isLoginPage = pathname?.startsWith('/login'),
            isSignupPage = pathname?.startsWith('/signup');
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('flex items-center gap-8', className),
            children: [
              !isLoginPage &&
                (0, jsx_runtime.jsxs)(link_default(), {
                  className: 'flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950',
                  href: '/login',
                  children: [
                    (0, jsx_runtime.jsx)(IconButton.K, {
                      'aria-label': '로그인',
                      size: 'md',
                      variant: 'default',
                      children: (0, jsx_runtime.jsx)(next_image.A, {
                        alt: 'Login',
                        height: 24,
                        src: '/icons/lock.svg',
                        width: 24,
                        unoptimized: !0,
                      }),
                    }),
                    '로그인',
                  ],
                }),
              !isSignupPage &&
                (0, jsx_runtime.jsxs)(link_default(), {
                  className: 'flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950',
                  href: '/signup',
                  children: [
                    (0, jsx_runtime.jsx)(IconButton.K, {
                      'aria-label': '기업가입',
                      size: 'md',
                      variant: 'default',
                      children: (0, jsx_runtime.jsx)(next_image.A, {
                        alt: 'Signup',
                        height: 24,
                        src: '/icons/user-manager.svg',
                        width: 24,
                        unoptimized: !0,
                      }),
                    }),
                    '기업가입',
                  ],
                }),
            ],
          });
        },
        AuthUserActionsTablet = ({ className }) => {
          const pathname = (0, navigation.usePathname)(),
            isLoginPage = pathname?.startsWith('/login'),
            isSignupPage = pathname?.startsWith('/signup');
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('flex items-center gap-12', className),
            children: [
              !isLoginPage &&
                (0, jsx_runtime.jsxs)(link_default(), {
                  className: 'flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950',
                  href: '/login',
                  children: [
                    (0, jsx_runtime.jsx)(IconButton.K, {
                      'aria-label': '로그인',
                      size: 'md',
                      variant: 'default',
                      children: (0, jsx_runtime.jsx)(next_image.A, {
                        alt: 'Login',
                        height: 24,
                        src: '/icons/lock.svg',
                        width: 24,
                        unoptimized: !0,
                      }),
                    }),
                    '로그인',
                  ],
                }),
              !isSignupPage &&
                (0, jsx_runtime.jsxs)(link_default(), {
                  className: 'flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950',
                  href: '/signup',
                  children: [
                    (0, jsx_runtime.jsx)(IconButton.K, {
                      'aria-label': '기업 담당자 회원가입',
                      size: 'md',
                      variant: 'default',
                      children: (0, jsx_runtime.jsx)(next_image.A, {
                        alt: 'Signup',
                        height: 24,
                        src: '/icons/user-manager.svg',
                        width: 24,
                        unoptimized: !0,
                      }),
                    }),
                    '기업 담당자 회원가입',
                  ],
                }),
            ],
          });
        },
        AuthUserActionsDesktop = ({ className }) => {
          const pathname = (0, navigation.usePathname)(),
            isLoginPage = pathname?.startsWith('/login'),
            isSignupPage = pathname?.startsWith('/signup');
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('flex items-center gap-16', className),
            children: [
              !isLoginPage &&
                (0, jsx_runtime.jsxs)(link_default(), {
                  className: 'flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950',
                  href: '/login',
                  children: [
                    (0, jsx_runtime.jsx)(IconButton.K, {
                      'aria-label': '로그인',
                      size: 'md',
                      variant: 'default',
                      children: (0, jsx_runtime.jsx)(next_image.A, {
                        alt: 'Login',
                        height: 24,
                        src: '/icons/lock.svg',
                        width: 24,
                        unoptimized: !0,
                      }),
                    }),
                    '로그인',
                  ],
                }),
              !isSignupPage &&
                (0, jsx_runtime.jsxs)(link_default(), {
                  className: 'flex items-center gap-8 text-16 text-gray-700 hover:text-gray-950',
                  href: '/signup',
                  children: [
                    (0, jsx_runtime.jsx)(IconButton.K, {
                      'aria-label': '기업 담당자 회원가입',
                      size: 'md',
                      variant: 'default',
                      children: (0, jsx_runtime.jsx)(next_image.A, {
                        alt: 'Signup',
                        height: 24,
                        src: '/icons/user-manager.svg',
                        width: 24,
                        unoptimized: !0,
                      }),
                    }),
                    '기업 담당자 회원가입',
                  ],
                }),
            ],
          });
        },
        AuthUserActions = ({ className }) =>
          (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('tablet:hidden', className),
                children: (0, jsx_runtime.jsx)(AuthUserActionsMobile, {}),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('hidden tablet:flex desktop:hidden', className),
                children: (0, jsx_runtime.jsx)(AuthUserActionsTablet, {}),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('hidden desktop:flex', className),
                children: (0, jsx_runtime.jsx)(AuthUserActionsDesktop, {}),
              }),
            ],
          });
      ((AuthUserActionsMobile.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'AuthUserActionsMobile',
        props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
      }),
        (AuthUserActionsTablet.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'AuthUserActionsTablet',
          props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
        }),
        (AuthUserActionsDesktop.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'AuthUserActionsDesktop',
          props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
        }),
        (AuthUserActions.__docgenInfo = {
          description:
            'AuthUserActions\n\n반응형 인증 사용자 액션 컴포넌트\n- 모바일: 로그인, 기업가입 (짧은 텍스트)\n- 태블릿: 로그인, 기업 담당자 회원가입\n- 데스크탑: 로그인, 기업 담당자 회원가입',
          methods: [],
          displayName: 'AuthUserActions',
          props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
        }));
      const AuthHeader = ({ className }) =>
          (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)(
              'auth-header-container',
              'w-full h-56',
              'bg-white border-b border-gray-200',
              'flex items-center justify-between',
              'px-14 tablet:px-24',
              className
            ),
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'flex items-center shrink-0',
                children: (0, jsx_runtime.jsx)(GNBBrand.A, {}),
              }),
              (0, jsx_runtime.jsx)(AuthUserActions, {}),
            ],
          }),
        AuthHeader_AuthHeader = AuthHeader;
      AuthHeader.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'AuthHeader',
        props: { className: { required: !1, tsType: { name: 'string' }, description: '' } },
      };
      const AuthHeader_stories = {
          title: 'Organisms/AuthHeader',
          component: AuthHeader_AuthHeader,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            viewport: { defaultViewport: 'desktop' },
            nextjs: { appDirectory: !0, navigation: { pathname: '/', segments: [] } },
            docs: {
              description: {
                component:
                  '인증되지 않은 사용자를 위한 헤더 컴포넌트입니다. 로그인 및 회원가입 링크를 제공하며, 현재 페이지에 따라 해당 링크를 숨깁니다. 모바일에서는 &quot;기업 담당자 회원가입&quot;이 &quot;기업가입&quot;으로 축약되어 표시됩니다.',
              },
              canvas: { withToolbar: !0 },
            },
          },
          argTypes: { className: { control: 'text', description: '추가 CSS 클래스명' } },
        },
        Default = {
          parameters: {
            viewport: { defaultViewport: 'desktop' },
            nextjs: { navigation: { pathname: '/', segments: [] } },
            docs: {
              description: {
                story:
                  '홈 페이지에서 보이는 기본 헤더입니다. 로그인과 기업 담당자 회원가입 링크가 모두 표시됩니다.',
              },
            },
          },
          render: (args) =>
            (0, jsx_runtime.jsxs)('div', {
              className: 'w-full min-h-screen bg-gray-50',
              children: [
                (0, jsx_runtime.jsx)(AuthHeader_AuthHeader, { className: args.className }),
                (0, jsx_runtime.jsx)('main', {
                  className: 'p-24',
                  children: (0, jsx_runtime.jsxs)('div', {
                    className: 'max-w-1200 mx-auto',
                    children: [
                      (0, jsx_runtime.jsx)('h1', {
                        className: 'text-24 font-bold mb-16',
                        children: 'AuthHeader 컴포넌트 예시',
                      }),
                      (0, jsx_runtime.jsx)('p', {
                        className: 'text-16 text-gray-600 mb-8',
                        children:
                          '상단의 AuthHeader를 통해 로그인 및 회원가입 링크를 확인할 수 있습니다.',
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'space-y-8',
                        children: [
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-500',
                            children:
                              '- 현재 페이지가 로그인 페이지가 아니므로 로그인 링크가 표시됩니다.',
                          }),
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-500',
                            children:
                              '- 현재 페이지가 회원가입 페이지가 아니므로 회원가입 링크가 표시됩니다.',
                          }),
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-500',
                            children: '- 데스크탑/태블릿: "기업 담당자 회원가입" 전체 텍스트 표시',
                          }),
                          (0, jsx_runtime.jsx)('p', {
                            className: 'text-14 text-gray-500',
                            children: '- 모바일: "기업가입"으로 축약 표시',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
        },
        OnLoginPage = {
          parameters: {
            viewport: { defaultViewport: 'desktop' },
            nextjs: { navigation: { pathname: '/login', segments: ['login'] } },
            docs: {
              description: {
                story:
                  '로그인 페이지에서 보이는 헤더입니다. 로그인 링크는 숨겨지고 회원가입 링크만 표시됩니다.',
              },
            },
          },
          render: (args) =>
            (0, jsx_runtime.jsxs)('div', {
              className: 'w-full min-h-screen bg-gray-50',
              children: [
                (0, jsx_runtime.jsx)(AuthHeader_AuthHeader, { className: args.className }),
                (0, jsx_runtime.jsx)('main', {
                  className: 'p-24',
                  children: (0, jsx_runtime.jsxs)('div', {
                    className: 'max-w-1200 mx-auto',
                    children: [
                      (0, jsx_runtime.jsx)('h1', {
                        className: 'text-24 font-bold mb-16',
                        children: '로그인 페이지',
                      }),
                      (0, jsx_runtime.jsx)('p', {
                        className: 'text-16 text-gray-600 mb-8',
                        children:
                          '로그인 페이지에서는 로그인 링크가 숨겨지고 회원가입 링크만 표시됩니다.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
        },
        OnSignupPage = {
          parameters: {
            viewport: { defaultViewport: 'desktop' },
            nextjs: { navigation: { pathname: '/signup', segments: ['signup'] } },
            docs: {
              description: {
                story:
                  '회원가입 페이지에서 보이는 헤더입니다. 회원가입 링크는 숨겨지고 로그인 링크만 표시됩니다.',
              },
            },
          },
          render: (args) =>
            (0, jsx_runtime.jsxs)('div', {
              className: 'w-full min-h-screen bg-gray-50',
              children: [
                (0, jsx_runtime.jsx)(AuthHeader_AuthHeader, { className: args.className }),
                (0, jsx_runtime.jsx)('main', {
                  className: 'p-24',
                  children: (0, jsx_runtime.jsxs)('div', {
                    className: 'max-w-1200 mx-auto',
                    children: [
                      (0, jsx_runtime.jsx)('h1', {
                        className: 'text-24 font-bold mb-16',
                        children: '회원가입 페이지',
                      }),
                      (0, jsx_runtime.jsx)('p', {
                        className: 'text-16 text-gray-600 mb-8',
                        children:
                          '회원가입 페이지에서는 회원가입 링크가 숨겨지고 로그인 링크만 표시됩니다.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
        },
        Mobile = {
          parameters: {
            viewport: { defaultViewport: 'mobile' },
            nextjs: { navigation: { pathname: '/', segments: [] } },
            docs: {
              description: {
                story:
                  '모바일 뷰포트에서 보이는 헤더입니다. &quot;기업 담당자 회원가입&quot;이 &quot;기업가입&quot;으로 축약되어 표시됩니다.',
              },
              canvas: { withToolbar: !0 },
            },
          },
          render: (args) =>
            (0, jsx_runtime.jsxs)('div', {
              className: 'w-full min-h-screen bg-gray-50',
              children: [
                (0, jsx_runtime.jsx)(AuthHeader_AuthHeader, { className: args.className }),
                (0, jsx_runtime.jsx)('main', {
                  className: 'p-16',
                  children: (0, jsx_runtime.jsxs)('div', {
                    className: 'max-w-1200 mx-auto',
                    children: [
                      (0, jsx_runtime.jsx)('h1', {
                        className: 'text-20 font-bold mb-12',
                        children: '모바일 뷰',
                      }),
                      (0, jsx_runtime.jsx)('p', {
                        className: 'text-14 text-gray-600 mb-8',
                        children: '모바일에서는 텍스트가 축약되어 표시됩니다: "기업가입"',
                      }),
                    ],
                  }),
                }),
              ],
            }),
        },
        Tablet = {
          parameters: {
            viewport: { defaultViewport: 'tablet' },
            nextjs: { navigation: { pathname: '/', segments: [] } },
            docs: {
              description: {
                story: '태블릿 뷰포트에서 보이는 헤더입니다. 전체 텍스트가 표시됩니다.',
              },
              canvas: { withToolbar: !0 },
            },
          },
          render: Default.render,
        },
        Desktop = {
          parameters: {
            viewport: { defaultViewport: 'desktop' },
            nextjs: { navigation: { pathname: '/', segments: [] } },
            docs: {
              description: {
                story: '데스크탑 뷰포트에서 보이는 헤더입니다. 전체 텍스트가 표시됩니다.',
              },
              canvas: { withToolbar: !0 },
            },
          },
          render: Default.render,
        },
        __namedExportsOrder = [
          'Default',
          'OnLoginPage',
          'OnSignupPage',
          'Mobile',
          'Tablet',
          'Desktop',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  parameters: {\n    viewport: {\n      defaultViewport: \'desktop\'\n    },\n    nextjs: {\n      navigation: {\n        pathname: \'/\',\n        segments: []\n      }\n    },\n    docs: {\n      description: {\n        story: \'홈 페이지에서 보이는 기본 헤더입니다. 로그인과 기업 담당자 회원가입 링크가 모두 표시됩니다.\'\n      }\n    }\n  },\n  render: args => <div className="w-full min-h-screen bg-gray-50">\n      <AuthHeader className={args.className} />\n      <main className="p-24">\n        <div className="max-w-1200 mx-auto">\n          <h1 className="text-24 font-bold mb-16">AuthHeader 컴포넌트 예시</h1>\n          <p className="text-16 text-gray-600 mb-8">\n            상단의 AuthHeader를 통해 로그인 및 회원가입 링크를 확인할 수 있습니다.\n          </p>\n          <div className="space-y-8">\n            <p className="text-14 text-gray-500">\n              - 현재 페이지가 로그인 페이지가 아니므로 로그인 링크가 표시됩니다.\n            </p>\n            <p className="text-14 text-gray-500">\n              - 현재 페이지가 회원가입 페이지가 아니므로 회원가입 링크가 표시됩니다.\n            </p>\n            <p className="text-14 text-gray-500">\n              - 데스크탑/태블릿: &quot;기업 담당자 회원가입&quot; 전체 텍스트 표시\n            </p>\n            <p className="text-14 text-gray-500">- 모바일: &quot;기업가입&quot;으로 축약 표시</p>\n          </div>\n        </div>\n      </main>\n    </div>\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (OnLoginPage.parameters = {
          ...OnLoginPage.parameters,
          docs: {
            ...OnLoginPage.parameters?.docs,
            source: {
              originalSource:
                '{\n  parameters: {\n    viewport: {\n      defaultViewport: \'desktop\'\n    },\n    nextjs: {\n      navigation: {\n        pathname: \'/login\',\n        segments: [\'login\']\n      }\n    },\n    docs: {\n      description: {\n        story: \'로그인 페이지에서 보이는 헤더입니다. 로그인 링크는 숨겨지고 회원가입 링크만 표시됩니다.\'\n      }\n    }\n  },\n  render: args => <div className="w-full min-h-screen bg-gray-50">\n      <AuthHeader className={args.className} />\n      <main className="p-24">\n        <div className="max-w-1200 mx-auto">\n          <h1 className="text-24 font-bold mb-16">로그인 페이지</h1>\n          <p className="text-16 text-gray-600 mb-8">\n            로그인 페이지에서는 로그인 링크가 숨겨지고 회원가입 링크만 표시됩니다.\n          </p>\n        </div>\n      </main>\n    </div>\n}',
              ...OnLoginPage.parameters?.docs?.source,
            },
          },
        }),
        (OnSignupPage.parameters = {
          ...OnSignupPage.parameters,
          docs: {
            ...OnSignupPage.parameters?.docs,
            source: {
              originalSource:
                '{\n  parameters: {\n    viewport: {\n      defaultViewport: \'desktop\'\n    },\n    nextjs: {\n      navigation: {\n        pathname: \'/signup\',\n        segments: [\'signup\']\n      }\n    },\n    docs: {\n      description: {\n        story: \'회원가입 페이지에서 보이는 헤더입니다. 회원가입 링크는 숨겨지고 로그인 링크만 표시됩니다.\'\n      }\n    }\n  },\n  render: args => <div className="w-full min-h-screen bg-gray-50">\n      <AuthHeader className={args.className} />\n      <main className="p-24">\n        <div className="max-w-1200 mx-auto">\n          <h1 className="text-24 font-bold mb-16">회원가입 페이지</h1>\n          <p className="text-16 text-gray-600 mb-8">\n            회원가입 페이지에서는 회원가입 링크가 숨겨지고 로그인 링크만 표시됩니다.\n          </p>\n        </div>\n      </main>\n    </div>\n}',
              ...OnSignupPage.parameters?.docs?.source,
            },
          },
        }),
        (Mobile.parameters = {
          ...Mobile.parameters,
          docs: {
            ...Mobile.parameters?.docs,
            source: {
              originalSource:
                '{\n  parameters: {\n    viewport: {\n      defaultViewport: \'mobile\'\n    },\n    nextjs: {\n      navigation: {\n        pathname: \'/\',\n        segments: []\n      }\n    },\n    docs: {\n      description: {\n        story: \'모바일 뷰포트에서 보이는 헤더입니다. &quot;기업 담당자 회원가입&quot;이 &quot;기업가입&quot;으로 축약되어 표시됩니다.\'\n      },\n      canvas: {\n        withToolbar: true\n      }\n    }\n  },\n  render: args => <div className="w-full min-h-screen bg-gray-50">\n      <AuthHeader className={args.className} />\n      <main className="p-16">\n        <div className="max-w-1200 mx-auto">\n          <h1 className="text-20 font-bold mb-12">모바일 뷰</h1>\n          <p className="text-14 text-gray-600 mb-8">\n            모바일에서는 텍스트가 축약되어 표시됩니다: &quot;기업가입&quot;\n          </p>\n        </div>\n      </main>\n    </div>\n}',
              ...Mobile.parameters?.docs?.source,
            },
          },
        }),
        (Tablet.parameters = {
          ...Tablet.parameters,
          docs: {
            ...Tablet.parameters?.docs,
            source: {
              originalSource:
                "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'tablet'\n    },\n    nextjs: {\n      navigation: {\n        pathname: '/',\n        segments: []\n      }\n    },\n    docs: {\n      description: {\n        story: '태블릿 뷰포트에서 보이는 헤더입니다. 전체 텍스트가 표시됩니다.'\n      },\n      canvas: {\n        withToolbar: true\n      }\n    }\n  },\n  render: Default.render\n}",
              ...Tablet.parameters?.docs?.source,
            },
          },
        }),
        (Desktop.parameters = {
          ...Desktop.parameters,
          docs: {
            ...Desktop.parameters?.docs,
            source: {
              originalSource:
                "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'desktop'\n    },\n    nextjs: {\n      navigation: {\n        pathname: '/',\n        segments: []\n      }\n    },\n    docs: {\n      description: {\n        story: '데스크탑 뷰포트에서 보이는 헤더입니다. 전체 텍스트가 표시됩니다.'\n      },\n      canvas: {\n        withToolbar: true\n      }\n    }\n  },\n  render: Default.render\n}",
              ...Desktop.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
