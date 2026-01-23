'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8073],
  {
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
    './src/components/molecules/GNBUserActions/GNBUserActions.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { ec: () => GNBUserActions });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        next_link = __webpack_require__('./node_modules/next/link.js'),
        link_default = __webpack_require__.n(next_link),
        navigation = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        constants = __webpack_require__('./src/constants/index.ts'),
        IconButton = __webpack_require__('./src/components/atoms/IconButton/IconButton.tsx'),
        CartButton = __webpack_require__('./src/components/molecules/CartButton/CartButton.tsx');
      const NotificationButton = ({ unreadCount, onClick, className, ariaLabel }) => {
        const hasUnread = unreadCount > 0,
          displayCount = unreadCount < 0 ? 0 : unreadCount,
          label = ariaLabel ?? `알림 (${displayCount}개)`;
        return (0, jsx_runtime.jsx)('button', {
          type: 'button',
          'aria-label': label,
          onClick,
          className: (0, clsx.A)(
            'inline-flex items-center justify-center',
            'w-32 h-32 rounded-full',
            'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
            'transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
            className
          ),
          children: (0, jsx_runtime.jsxs)('div', {
            className: 'relative inline-flex items-center justify-center',
            children: [
              (0, jsx_runtime.jsx)(next_image.A, {
                src: hasUnread ? '/icons/notification-black.svg' : '/icons/notification.svg',
                alt: '',
                width: 24,
                height: 24,
                'aria-hidden': 'true',
                className: 'cursor-pointer',
              }),
              hasUnread &&
                (0, jsx_runtime.jsx)('span', {
                  className: (0, clsx.A)(
                    'pointer-events-none',
                    'absolute',
                    '-top-4 -right-3',
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
        });
      };
      NotificationButton.__docgenInfo = {
        description:
          'NotificationButton\n\n- 종 모양 알림 아이콘 + 빨간 점 뱃지\n- unreadCount > 0: 빨간 점 + 숫자 표시\n- unreadCount === 0: 테두리만 있는 아이콘 (bell-outline)',
        methods: [],
        displayName: 'NotificationButton',
        props: {
          unreadCount: { required: !0, tsType: { name: 'number' }, description: '' },
          onClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          ariaLabel: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
      const GNBUserActionsMobile = ({
          companyId,
          cartCount = 0,
          notificationCount = 0,
          onNotificationClick,
          onMenuClick,
          className,
        }) =>
          (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('flex items-center gap-8', className),
            children: [
              (0, jsx_runtime.jsx)(CartButton.l, { companyId, count: cartCount }),
              (0, jsx_runtime.jsx)(NotificationButton, {
                unreadCount: notificationCount,
                onClick: onNotificationClick,
              }),
              onMenuClick &&
                (0, jsx_runtime.jsx)(IconButton.K, {
                  'aria-label': '메뉴 열기',
                  size: 'md',
                  variant: 'default',
                  className: 'flex items-center justify-center',
                  onClick: onMenuClick,
                  children: (0, jsx_runtime.jsx)(next_image.A, {
                    src: '/icons/hamburger.svg',
                    alt: '',
                    width: 20,
                    height: 20,
                    'aria-hidden': 'true',
                  }),
                }),
            ],
          }),
        GNBUserActionsTablet = ({
          companyId,
          userProfile,
          cartCount = 0,
          notificationCount = 0,
          isLoadingProfile = !1,
          onNotificationClick,
          onMenuClick,
          className,
        }) =>
          (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('flex items-center gap-12', className),
            children: [
              (0, jsx_runtime.jsx)(CartButton.l, { companyId, count: cartCount }),
              (0, jsx_runtime.jsx)(NotificationButton, {
                unreadCount: notificationCount,
                onClick: onNotificationClick,
              }),
              isLoadingProfile
                ? (0, jsx_runtime.jsxs)('div', {
                    className: 'flex items-center gap-8',
                    children: [
                      (0, jsx_runtime.jsx)('div', {
                        className: 'w-32 h-32 bg-gray-200 rounded-full animate-pulse',
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className: 'w-60 h-16 bg-gray-200 rounded animate-pulse',
                      }),
                    ],
                  })
                : userProfile &&
                  (0, jsx_runtime.jsx)('div', {
                    className: 'flex items-center',
                    children: userProfile,
                  }),
              onMenuClick &&
                (0, jsx_runtime.jsx)(IconButton.K, {
                  'aria-label': '메뉴 열기',
                  size: 'md',
                  variant: 'default',
                  className: 'flex items-center justify-center',
                  onClick: onMenuClick,
                  children: (0, jsx_runtime.jsx)(next_image.A, {
                    src: '/icons/hamburger.svg',
                    alt: '',
                    width: 20,
                    height: 20,
                    'aria-hidden': 'true',
                  }),
                }),
            ],
          }),
        GNBUserActionsDesktop = ({
          companyId,
          userProfile,
          cartCount = 0,
          notificationCount = 0,
          isLoadingProfile = !1,
          onNotificationClick,
          onLogout,
          className,
        }) => {
          const pathname = (0, navigation.usePathname)(),
            [isAnimating, setIsAnimating] = (0, react.useState)(!1),
            wishlistHref = constants.vp.WISHLIST(companyId),
            wishlistIconSrc =
              (pathname?.includes('/wishlist') ?? !1)
                ? '/icons/heart.svg'
                : '/icons/heart-outline.svg';
          return (0, jsx_runtime.jsxs)('div', {
            className: (0, clsx.A)('flex items-center gap-3', className),
            children: [
              (0, jsx_runtime.jsx)(CartButton.l, { companyId, count: cartCount }),
              (0, jsx_runtime.jsx)(NotificationButton, {
                unreadCount: notificationCount,
                onClick: onNotificationClick,
              }),
              (0, jsx_runtime.jsx)(link_default(), {
                href: wishlistHref,
                'aria-label': '찜목록',
                onClick: () => {
                  (setIsAnimating(!0),
                    setTimeout(() => {
                      setIsAnimating(!1);
                    }, 300));
                },
                className:
                  'inline-flex items-center justify-center w-32 h-32 rounded-full bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
                children: (0, jsx_runtime.jsx)('div', {
                  className: 'relative w-24 h-24 flex items-center justify-center',
                  children: (0, jsx_runtime.jsx)(next_image.A, {
                    src: wishlistIconSrc,
                    alt: '',
                    width: 24,
                    height: 24,
                    className: (0, clsx.A)(
                      'w-24 h-24 transition-transform duration-300 ease-out',
                      isAnimating && 'scale-125'
                    ),
                    'aria-hidden': 'true',
                  }),
                }),
              }),
              (0, jsx_runtime.jsx)('span', { className: 'pl-2' }),
              isLoadingProfile
                ? (0, jsx_runtime.jsxs)('div', {
                    className: 'flex items-center gap-8',
                    children: [
                      (0, jsx_runtime.jsx)('div', {
                        className: 'w-32 h-32 bg-gray-200 rounded-full animate-pulse',
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className: 'w-60 h-16 bg-gray-200 rounded animate-pulse',
                      }),
                    ],
                  })
                : userProfile &&
                  (0, jsx_runtime.jsx)('div', {
                    className: 'flex items-center',
                    children: userProfile,
                  }),
              (0, jsx_runtime.jsx)('span', { className: 'pl-2' }),
              (userProfile || isLoadingProfile) &&
                (0, jsx_runtime.jsx)('div', { className: 'w-px h-20 bg-gray-200' }),
              onLogout &&
                (0, jsx_runtime.jsx)('button', {
                  type: 'button',
                  onClick: onLogout,
                  className: (0, clsx.A)(
                    'inline-flex',
                    'text-16 text-gray-700 hover:text-gray-900',
                    'px-8 py-4 rounded-999 hover:bg-gray-50 transition-colors',
                    'cursor-pointer'
                  ),
                  children: '로그아웃',
                }),
            ],
          });
        },
        GNBUserActions = ({
          companyId,
          userProfile,
          cartCount = 0,
          notificationCount = 0,
          isLoadingProfile = !1,
          onNotificationClick,
          onLogout,
          onMenuClick,
          className,
        }) =>
          (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('tablet:hidden', className),
                children: (0, jsx_runtime.jsx)(GNBUserActionsMobile, {
                  companyId,
                  cartCount,
                  notificationCount,
                  onNotificationClick,
                  onMenuClick,
                }),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('hidden tablet:flex desktop:hidden', className),
                children: (0, jsx_runtime.jsx)(GNBUserActionsTablet, {
                  companyId,
                  cartCount,
                  notificationCount,
                  onNotificationClick,
                  userProfile,
                  isLoadingProfile,
                  onMenuClick,
                }),
              }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('hidden desktop:flex', className),
                children: (0, jsx_runtime.jsx)(GNBUserActionsDesktop, {
                  companyId,
                  cartCount,
                  notificationCount,
                  onNotificationClick,
                  userProfile,
                  isLoadingProfile,
                  onLogout,
                }),
              }),
            ],
          });
      ((GNBUserActionsMobile.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'GNBUserActionsMobile',
        props: {
          companyId: {
            required: !0,
            tsType: { name: 'string' },
            description: '회사 스코프 라우팅에 사용할 companyId',
          },
          cartCount: {
            required: !1,
            tsType: { name: 'number' },
            description: '장바구니에 담긴 상품 개수',
            defaultValue: { value: '0', computed: !1 },
          },
          notificationCount: {
            required: !1,
            tsType: { name: 'number' },
            description: '읽지 않은 알림 수',
            defaultValue: { value: '0', computed: !1 },
          },
          onNotificationClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '알림 버튼 클릭 시 호출되는 콜백',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          onMenuClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '햄버거 메뉴 클릭 시 호출되는 콜백',
          },
        },
      }),
        (GNBUserActionsTablet.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'GNBUserActionsTablet',
          props: {
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            cartCount: {
              required: !1,
              tsType: { name: 'number' },
              description: '장바구니에 담긴 상품 개수',
              defaultValue: { value: '0', computed: !1 },
            },
            notificationCount: {
              required: !1,
              tsType: { name: 'number' },
              description: '읽지 않은 알림 수',
              defaultValue: { value: '0', computed: !1 },
            },
            onNotificationClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '알림 버튼 클릭 시 호출되는 콜백',
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
            userProfile: {
              required: !1,
              tsType: { name: 'ReactNode' },
              description: 'GNB 우측에 표시할 유저 프로필 컴포넌트',
            },
            isLoadingProfile: {
              required: !1,
              tsType: { name: 'boolean' },
              description: '프로필 로딩 중 여부',
              defaultValue: { value: 'false', computed: !1 },
            },
            onMenuClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '햄버거 메뉴 클릭 시 호출되는 콜백',
            },
          },
        }),
        (GNBUserActionsDesktop.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'GNBUserActionsDesktop',
          props: {
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            cartCount: {
              required: !1,
              tsType: { name: 'number' },
              description: '장바구니에 담긴 상품 개수',
              defaultValue: { value: '0', computed: !1 },
            },
            notificationCount: {
              required: !1,
              tsType: { name: 'number' },
              description: '읽지 않은 알림 수',
              defaultValue: { value: '0', computed: !1 },
            },
            onNotificationClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '알림 버튼 클릭 시 호출되는 콜백',
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
            userProfile: {
              required: !1,
              tsType: { name: 'ReactNode' },
              description: 'GNB 우측에 표시할 유저 프로필 컴포넌트',
            },
            isLoadingProfile: {
              required: !1,
              tsType: { name: 'boolean' },
              description: '프로필 로딩 중 여부',
              defaultValue: { value: 'false', computed: !1 },
            },
            onLogout: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '로그아웃 클릭 시 호출되는 콜백',
            },
          },
        }),
        (GNBUserActions.__docgenInfo = {
          description:
            'GNBUserActions\n\n반응형 사용자 액션 컴포넌트\n- 모바일: 장바구니, 알림, 햄버거메뉴\n- 태블릿: 장바구니, 알림, 유저프로필, 햄버거메뉴\n- 데스크탑: 장바구니, 알림, 찜목록, 유저프로필, 구분선, 로그아웃',
          methods: [],
          displayName: 'GNBUserActions',
          props: {
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            userProfile: {
              required: !1,
              tsType: { name: 'ReactNode' },
              description: 'GNB 우측에 표시할 유저 프로필 컴포넌트 (태블릿/데스크탑에서만 사용)',
            },
            cartCount: {
              required: !1,
              tsType: { name: 'number' },
              description: '장바구니에 담긴 상품 개수',
              defaultValue: { value: '0', computed: !1 },
            },
            notificationCount: {
              required: !1,
              tsType: { name: 'number' },
              description: '읽지 않은 알림 수',
              defaultValue: { value: '0', computed: !1 },
            },
            isLoadingProfile: {
              required: !1,
              tsType: { name: 'boolean' },
              description: '프로필 로딩 중 여부',
              defaultValue: { value: 'false', computed: !1 },
            },
            onNotificationClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '알림 버튼 클릭 시 호출되는 콜백',
            },
            onLogout: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '로그아웃 클릭 시 호출되는 콜백 (데스크탑 Only)',
            },
            onMenuClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '햄버거 메뉴 클릭 시 호출되는 콜백 (모바일/태블릿)',
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }));
    },
  },
]);
