'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7113],
  {
    './src/components/molecules/CartButton/CartButton.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithItems: () => WithItems,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/CartButton',
          component: __webpack_require__('./src/components/molecules/CartButton/CartButton.tsx').l,
          tags: ['autodocs'],
          parameters: {
            layout: 'centered',
            docs: {
              description: {
                component: '장바구니 아이콘과 숫자 뱃지를 표시하는 버튼 컴포넌트입니다.',
              },
            },
          },
          argTypes: {
            onClick: { action: 'click', description: '장바구니 버튼 클릭 시 호출되는 콜백' },
          },
        },
        Default = { args: { companyId: 'company-1', count: 0 } },
        WithItems = { args: { companyId: 'company-1', count: 5 } },
        __namedExportsOrder = ['Default', 'WithItems'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    companyId: 'company-1',\n    count: 0\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithItems.parameters = {
          ...WithItems.parameters,
          docs: {
            ...WithItems.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    companyId: 'company-1',\n    count: 5\n  }\n}",
              ...WithItems.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/CartButton/CartButton.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { l: () => CartButton });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./src/constants/index.ts'),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const CartButton = ({ companyId, count, className, onClick, ariaLabel }) => {
        const [isAnimating, setIsAnimating] = (0, react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1),
          href = _constants__WEBPACK_IMPORTED_MODULE_4__.vp.CART(companyId),
          displayCount = count < 0 ? 0 : count,
          label = ariaLabel ?? `장바구니 (${displayCount}개)`;
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          next_link__WEBPACK_IMPORTED_MODULE_1___default(),
          {
            href,
            'aria-label': label,
            onClick: () => {
              (setIsAnimating(!0),
                setTimeout(() => {
                  setIsAnimating(!1);
                }, 300),
                onClick?.());
            },
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
              'inline-flex items-center justify-center',
              'w-32 h-32 rounded-full',
              'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
              'transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
              className
            ),
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'relative inline-flex items-center justify-center',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                  {
                    src: '/icons/cart.svg',
                    alt: '',
                    width: 24,
                    height: 24,
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                      'w-24 h-24 transition-transform duration-300 ease-out',
                      isAnimating && 'scale-125'
                    ),
                    'aria-hidden': 'true',
                  }
                ),
                displayCount > 0 &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                      'pointer-events-none',
                      'absolute',
                      '-top-4 -right-6',
                      'min-w-16 h-16 px-4',
                      'flex justify-center items-center',
                      'bg-gray-200 text-black',
                      'text-10 font-bold',
                      'rounded-full'
                    ),
                    children: displayCount > 99 ? '99+' : displayCount,
                  }),
              ],
            }),
          }
        );
      };
      ((CartButton.displayName = 'CartButton'),
        (CartButton.__docgenInfo = {
          description:
            'CartButton\n\n- 장바구니 아이콘 + 숫자 뱃지 Molecule\n- NotificationButton과 동일한 숫자 뱃지 UI\n- 아이콘 크기: 24px',
          methods: [],
          displayName: 'CartButton',
          props: {
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            count: {
              required: !0,
              tsType: { name: 'number' },
              description: '장바구니에 담긴 상품 개수 (0이면 뱃지는 숨기고, 레이블에만 0개를 표시)',
            },
            className: {
              required: !1,
              tsType: { name: 'string' },
              description: '외부에서 추가 스타일 주입용',
            },
            onClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description:
                '클릭 시 추가로 처리할 로직이 있을 때 사용\n(라우팅은 기본적으로 /[companyId]/cart 로 이동)',
            },
            ariaLabel: {
              required: !1,
              tsType: { name: 'string' },
              description: '접근성용 레이블 (기본값: `장바구니 (n개)` 형식)',
            },
          },
        }));
    },
  },
]);
