'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7805],
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
    './src/features/landing/components/LandingHeroOrg/LandingHeroOrgn.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => LandingHeroOrgn_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        constants = __webpack_require__('./src/constants/index.ts'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx');
      const LandingHero = () => {
          const router = (0, navigation.useRouter)();
          return (0, jsx_runtime.jsx)('section', {
            className: 'relative w-full pt-80 pb-60 bg-white',
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'flex flex-col items-center px-4 text-center',
              children: [
                (0, jsx_runtime.jsx)('h1', {
                  className:
                    ' text-20 tablet:text-32 desktop:text-50  font-extrabold leading-normal desktop:leading-140  tracking--0.5 tablet:tracking--0.8 desktop:tracking--1.25  text-gray-950 mb-12 desktop:mb-14 break-keep',
                  children: '내가 원하는 간식을 쉽고 빠르게 구매',
                }),
                (0, jsx_runtime.jsx)('p', {
                  className:
                    ' text-16 tablet:text-20 desktop:text-24 font-bold leading-normal tracking--0.5 desktop:tracking--0.6 text-gray-300 mb-30 tablet:mb-40 desktop:mb-30',
                  children: 'with Snack',
                }),
                (0, jsx_runtime.jsx)(Button.X, {
                  onClick: () => {
                    router.push(constants.vp.SIGNUP);
                  },
                  className:
                    ' !w-110 tablet:!w-130 desktop:!w-130 !px-16 tablet:!px-20 desktop:!px-20 !text-14 tablet:!text-16 desktop:!text-16 tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4 whitespace-nowrap',
                  rightIcon: (0, jsx_runtime.jsx)(next_image.A, {
                    src: '/icons/arrow-right-up.svg',
                    alt: '',
                    width: 16,
                    height: 16,
                    className: 'shrink-0 w-16 h-16',
                  }),
                  children: 'Sign Now',
                }),
              ],
            }),
          });
        },
        LandingHeroOrgn = LandingHero;
      LandingHero.__docgenInfo = { description: '', methods: [], displayName: 'LandingHero' };
      const LandingHeroOrgn_stories = {
          title: 'Features/Landing/LandingHero',
          component: LandingHeroOrgn,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            nextjs: { appDirectory: !0, navigation: { push: (_url) => {} } },
            docs: {
              description: {
                component:
                  "\n### 개요\n랜딩 페이지의 최상단 메인 히어로 섹션입니다.\n\n### 주요 특징\n*   **반응형 레이아웃**: 모바일, 태블릿, 데스크탑 등 디바이스 해상도에 맞춰 레이아웃이 최적화됩니다.\n*   **CTA (Call To Action)**: 유저의 가입을 유도하는 'Sign Now' 버튼을 포함하고 있습니다.\n*   **직관적인 메시지**: 서비스의 핵심 가치를 전달하는 헤드라인과 서브 텍스트로 구성됩니다.\n\n### 사용 가이드\n이 컴포넌트는 페이지의 최상단에 배치하여 유저의 이목을 집중시키는 용도로 사용하세요.\n\n### 인터랙션\n*   **Sign Now 버튼 클릭**: 회원가입(Sign Up) 페이지로 이동합니다. \n        ",
              },
            },
          },
        },
        Default = {
          parameters: {
            viewport: { defaultViewport: 'responsive' },
            docs: {
              story:
                '기본적인 히어로 섹션의 모습입니다. 뷰포트를 조절하여 반응형 동작을 확인해보세요.',
            },
          },
        },
        __namedExportsOrder = ['Default'];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'responsive'\n    },\n    docs: {\n      story: '기본적인 히어로 섹션의 모습입니다. 뷰포트를 조절하여 반응형 동작을 확인해보세요.'\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      };
    },
  },
]);
