'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8417],
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
    './src/components/organisms/DetailPageLayout/DetailPageLayout.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          MultipleAccordionPanels: () => MultipleAccordionPanels,
          WithoutImage: () => WithoutImage,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Organisms/DetailPageLayout',
          component: __webpack_require__(
            './src/components/organisms/DetailPageLayout/DetailPageLayout.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: { layout: 'fullscreen' },
          argTypes: {
            breadcrumbItems: { control: 'object', description: 'Breadcrumb에 표시될 아이템 배열' },
            productImage: { control: 'object', description: '상품 이미지 정보' },
            productDetailHeader: {
              control: 'object',
              description: 'ProductDetailHeader에 전달될 props',
            },
            accordionPanels: { control: 'object', description: 'AccordionPanel 배열' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = {
          args: {
            breadcrumbItems: [
              { label: '음료', href: '/products?category=2' },
              { label: '청량 ∙ 탄산 음료' },
            ],
            productImage: { src: '/images/zero-cola.svg', alt: '제로 콜라' },
            productDetailHeader: {
              productName: '코카콜라 제로',
              purchaseCount: 29,
              price: 2e3,
              type: 'default',
              onQuantityChange: () => {},
              onMenuClick: () => {},
              onAddToCart: () => {},
            },
            accordionPanels: [
              {
                label: '상품 정보',
                content:
                  '코카콜라 제로는 설탕 없이 콜라의 맛을 즐길 수 있는 제로 칼로리 음료입니다.',
              },
              {
                label: '배송 정보',
                content: '배송은 평일 기준 2-3일 소요됩니다.',
                subContent: '제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
              },
            ],
          },
          parameters: {
            docs: {
              description: {
                story:
                  '상품 상세 페이지의 기본 레이아웃입니다. 상단 Breadcrumb, 좌측 상품 이미지, 우측 상품 정보와 아코디언 패널로 구성됩니다.',
              },
            },
          },
        },
        WithoutImage = {
          args: {
            breadcrumbItems: [
              { label: '음료', href: '/products?category=2' },
              { label: '청량 ∙ 탄산 음료' },
            ],
            productDetailHeader: {
              productName: '스프라이트',
              purchaseCount: 15,
              price: 1800,
              type: 'default',
              onQuantityChange: () => {},
              onMenuClick: () => {},
              onAddToCart: () => {},
            },
            accordionPanels: [
              { label: '상품 정보', content: '상품 이미지가 없는 경우 플레이스홀더가 표시됩니다.' },
            ],
          },
          parameters: {
            docs: { description: { story: '상품 이미지가 없는 경우의 레이아웃입니다.' } },
          },
        },
        MultipleAccordionPanels = {
          args: {
            breadcrumbItems: [
              { label: '간편식', href: '/products?category=4' },
              { label: '컵라면' },
            ],
            productImage: { src: '/images/zero-cola.svg', alt: '신라면' },
            productDetailHeader: {
              productName: '신라면 컵라면',
              purchaseCount: 42,
              price: 1500,
              type: 'simple',
              onQuantityChange: () => {},
              onMenuClick: () => {},
              onAddToCart: () => {},
            },
            accordionPanels: [
              {
                label: '상품 정보',
                content: '신라면 컵라면은 매콤한 맛이 특징인 인기 컵라면입니다.',
              },
              { label: '영양 정보', content: '칼로리: 530kcal', subContent: '나트륨: 1,980mg' },
              { label: '배송 정보', content: '배송은 평일 기준 2-3일 소요됩니다.' },
              {
                label: '교환/반품 안내',
                content: '상품 수령 후 7일 이내 교환/반품이 가능합니다.',
                subContent: '단, 개봉된 상품은 교환/반품이 불가능합니다.',
              },
            ],
          },
          parameters: {
            docs: {
              description: { story: '여러 개의 아코디언 패널이 있는 경우의 레이아웃입니다.' },
            },
          },
        },
        __namedExportsOrder = ['Default', 'WithoutImage', 'MultipleAccordionPanels'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    breadcrumbItems: [{\n      label: '음료',\n      href: '/products?category=2'\n    }, {\n      label: '청량 ∙ 탄산 음료'\n    }],\n    productImage: {\n      src: '/images/zero-cola.svg',\n      alt: '제로 콜라'\n    },\n    productDetailHeader: {\n      productName: '코카콜라 제로',\n      purchaseCount: 29,\n      price: 2000,\n      type: 'default',\n      // ItemMenu 표시\n      onQuantityChange: () => {},\n      onMenuClick: () => {},\n      onAddToCart: () => {}\n    },\n    accordionPanels: [{\n      label: '상품 정보',\n      content: '코카콜라 제로는 설탕 없이 콜라의 맛을 즐길 수 있는 제로 칼로리 음료입니다.'\n    }, {\n      label: '배송 정보',\n      content: '배송은 평일 기준 2-3일 소요됩니다.',\n      subContent: '제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.'\n    }]\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '상품 상세 페이지의 기본 레이아웃입니다. 상단 Breadcrumb, 좌측 상품 이미지, 우측 상품 정보와 아코디언 패널로 구성됩니다.'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nDefault\n======================',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (WithoutImage.parameters = {
          ...WithoutImage.parameters,
          docs: {
            ...WithoutImage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    breadcrumbItems: [{\n      label: '음료',\n      href: '/products?category=2'\n    }, {\n      label: '청량 ∙ 탄산 음료'\n    }],\n    productDetailHeader: {\n      productName: '스프라이트',\n      purchaseCount: 15,\n      price: 1800,\n      type: 'default',\n      onQuantityChange: () => {},\n      onMenuClick: () => {},\n      onAddToCart: () => {}\n    },\n    accordionPanels: [{\n      label: '상품 정보',\n      content: '상품 이미지가 없는 경우 플레이스홀더가 표시됩니다.'\n    }]\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '상품 이미지가 없는 경우의 레이아웃입니다.'\n      }\n    }\n  }\n}",
              ...WithoutImage.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nWithout Image\n======================',
              ...WithoutImage.parameters?.docs?.description,
            },
          },
        }),
        (MultipleAccordionPanels.parameters = {
          ...MultipleAccordionPanels.parameters,
          docs: {
            ...MultipleAccordionPanels.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    breadcrumbItems: [{\n      label: '간편식',\n      href: '/products?category=4'\n    }, {\n      label: '컵라면'\n    }],\n    productImage: {\n      src: '/images/zero-cola.svg',\n      alt: '신라면'\n    },\n    productDetailHeader: {\n      productName: '신라면 컵라면',\n      purchaseCount: 42,\n      price: 1500,\n      type: 'simple',\n      // ItemMenu 숨김\n      onQuantityChange: () => {},\n      onMenuClick: () => {},\n      onAddToCart: () => {}\n    },\n    accordionPanels: [{\n      label: '상품 정보',\n      content: '신라면 컵라면은 매콤한 맛이 특징인 인기 컵라면입니다.'\n    }, {\n      label: '영양 정보',\n      content: '칼로리: 530kcal',\n      subContent: '나트륨: 1,980mg'\n    }, {\n      label: '배송 정보',\n      content: '배송은 평일 기준 2-3일 소요됩니다.'\n    }, {\n      label: '교환/반품 안내',\n      content: '상품 수령 후 7일 이내 교환/반품이 가능합니다.',\n      subContent: '단, 개봉된 상품은 교환/반품이 불가능합니다.'\n    }]\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '여러 개의 아코디언 패널이 있는 경우의 레이아웃입니다.'\n      }\n    }\n  }\n}",
              ...MultipleAccordionPanels.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nMultiple Accordion Panels\n======================',
              ...MultipleAccordionPanels.parameters?.docs?.description,
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
