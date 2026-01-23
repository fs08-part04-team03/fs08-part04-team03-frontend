'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [5114],
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
    './src/components/atoms/CarouselIndicator/CarouselIndicator.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { w: () => CarouselIndicator });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const CarouselIndicator = ({
        count,
        activeIndex,
        onSelect,
        ariaLabelPrefix = '캐러셀',
        className,
      }) => {
        if (count <= 1) return null;
        const isClickable = 'function' == typeof onSelect,
          dots = Array.from({ length: count }, (_, i) => i);
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'flex justify-center gap-6',
            className
          ),
          role: isClickable ? void 0 : 'status',
          'aria-label': isClickable ? void 0 : `${ariaLabelPrefix} ${activeIndex + 1} / ${count}`,
          children: dots.map((dotIndex) => {
            const dotClassName = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              'h-6 w-6 rounded-full transition-colors',
              dotIndex === activeIndex ? 'bg-gray-900' : 'bg-gray-200'
            );
            return isClickable
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  'button',
                  {
                    type: 'button',
                    'aria-label': `${ariaLabelPrefix} ${dotIndex + 1}번째로 이동`,
                    onClick: () => onSelect(dotIndex),
                    className: dotClassName,
                  },
                  dotIndex
                )
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  'span',
                  { className: dotClassName },
                  dotIndex
                );
          }),
        });
      };
      CarouselIndicator.__docgenInfo = {
        description:
          'CarouselIndicator (Atom)\n- 점(dot) 인디케이터를 렌더링합니다.\n- onSelect가 있으면 클릭으로 이동(네비게이션) 가능합니다.',
        methods: [],
        displayName: 'CarouselIndicator',
        props: {
          count: { required: !0, tsType: { name: 'number' }, description: '' },
          activeIndex: { required: !0, tsType: { name: 'number' }, description: '' },
          onSelect: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(index: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'index' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          ariaLabelPrefix: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'캐러셀'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/components/molecules/AdminSideBar/AdminSideBar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        I6: () => AdminSidebarMenuItemMobile,
        _U: () => AdminSidebarMenuItemDesktop,
        a: () => AdminSidebarMenuItemTablet,
        ay: () => AdminSidebar,
      });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_1__
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/export-mocks/navigation/index.js'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./src/constants/index.ts'),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const AdminSidebarMenuItemMobile = ({ href, iconSrc, label, active = !1, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                'flex justify-center items-center gap-8',
                'w-full h-50 px-12',
                'border-b-2 transition-colors select-none',
                active
                  ? 'border-gray-950 text-gray-950'
                  : 'border-gray-200 text-gray-400 hover:text-gray-900',
                className
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'w-15 h-15 flex items-center justify-center',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    { src: iconSrc, alt: '', width: 15, height: 15, 'aria-hidden': 'true' }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  className: 'text-14 font-medium',
                  children: label,
                }),
              ],
            }
          ),
        AdminSidebarMenuItemTablet = ({ href, iconSrc, label, active = !1, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                'flex justify-center items-center gap-8',
                'w-full h-50 px-12',
                'border-b-2 transition-colors select-none',
                active
                  ? 'border-gray-950 text-gray-950'
                  : 'border-gray-200 text-gray-400 hover:text-gray-900',
                className
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'w-25 h-25 flex items-center justify-center',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    { src: iconSrc, alt: '', width: 20, height: 20, 'aria-hidden': 'true' }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  className: 'text-16 font-medium',
                  children: label,
                }),
              ],
            }
          ),
        AdminSidebarMenuItemDesktop = ({ href, iconSrc, label, active = !1, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
                'flex justify-start items-center gap-8',
                'w-180 h-50 px-12 rounded-md',
                'transition-colors select-none',
                active
                  ? 'bg-gray-50 text-gray-900'
                  : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900',
                className
              ),
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: 'w-25 h-25 flex items-center justify-center',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    { src: iconSrc, alt: '', width: 20, height: 20, 'aria-hidden': 'true' }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  className: 'text-16 font-medium',
                  children: label,
                }),
              ],
            }
          ),
        AdminSidebar = ({ companyId, userRole = 'user' }) => {
          const pathname = (0, next_navigation__WEBPACK_IMPORTED_MODULE_3__.usePathname)();
          if ('admin' !== userRole) return null;
          const dashboardHref =
              _constants__WEBPACK_IMPORTED_MODULE_4__.vp.ADMIN_DASHBOARD(companyId),
            usersHref = _constants__WEBPACK_IMPORTED_MODULE_4__.vp.ADMIN_USERS(companyId),
            budgetHref = _constants__WEBPACK_IMPORTED_MODULE_4__.vp.ADMIN_BUDGET(companyId),
            isUsersPage = !!pathname && pathname.includes('/admin/users'),
            isBudgetPage = !!pathname && pathname.includes('/admin/budget'),
            isDashboardPage =
              !pathname || pathname.includes('/admin/dashboard') || (!isUsersPage && !isBudgetPage);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                  className: 'flex flex-row gap-0 border-b border-gray-200 tablet:hidden',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemMobile,
                      {
                        href: dashboardHref,
                        iconSrc: '/icons/dashboard-chart.svg',
                        label: '대시보드',
                        active: isDashboardPage,
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemMobile,
                      {
                        href: usersHref,
                        iconSrc: isUsersPage ? '/icons/user.svg' : '/icons/user-outline.svg',
                        label: '회원 관리',
                        active: isUsersPage,
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemMobile,
                      {
                        href: budgetHref,
                        iconSrc: isBudgetPage ? '/icons/coin.svg' : '/icons/coin-outline.svg',
                        label: '예산 관리',
                        active: isBudgetPage,
                      }
                    ),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                  className:
                    'hidden tablet:flex desktop:hidden flex-row gap-0 border-b border-gray-200',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemTablet,
                      {
                        href: dashboardHref,
                        iconSrc: '/icons/dashboard-chart.svg',
                        label: 'Dashboard',
                        active: isDashboardPage,
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemTablet,
                      {
                        href: usersHref,
                        iconSrc: isUsersPage ? '/icons/user.svg' : '/icons/user-outline.svg',
                        label: '회원 관리',
                        active: isUsersPage,
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemTablet,
                      {
                        href: budgetHref,
                        iconSrc: isBudgetPage ? '/icons/coin.svg' : '/icons/coin-outline.svg',
                        label: '예산 관리',
                        active: isBudgetPage,
                      }
                    ),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                  className: 'hidden desktop:flex flex-col gap-4',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemDesktop,
                      {
                        href: dashboardHref,
                        iconSrc: '/icons/dashboard-chart.svg',
                        label: 'Dashboard',
                        active: isDashboardPage,
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemDesktop,
                      {
                        href: usersHref,
                        iconSrc: isUsersPage ? '/icons/user.svg' : '/icons/user-outline.svg',
                        label: '회원 관리',
                        active: isUsersPage,
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      AdminSidebarMenuItemDesktop,
                      {
                        href: budgetHref,
                        iconSrc: isBudgetPage ? '/icons/coin.svg' : '/icons/coin-outline.svg',
                        label: '예산 관리',
                        active: isBudgetPage,
                      }
                    ),
                  ],
                }),
              ],
            }
          );
        };
      ((AdminSidebarMenuItemMobile.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'AdminSidebarMenuItemMobile',
        props: {
          href: { required: !0, tsType: { name: 'string' }, description: '' },
          iconSrc: { required: !0, tsType: { name: 'string' }, description: '' },
          label: { required: !0, tsType: { name: 'string' }, description: '' },
          active: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      }),
        (AdminSidebarMenuItemTablet.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'AdminSidebarMenuItemTablet',
          props: {
            href: { required: !0, tsType: { name: 'string' }, description: '' },
            iconSrc: { required: !0, tsType: { name: 'string' }, description: '' },
            label: { required: !0, tsType: { name: 'string' }, description: '' },
            active: {
              required: !1,
              tsType: { name: 'boolean' },
              description: '',
              defaultValue: { value: 'false', computed: !1 },
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }),
        (AdminSidebarMenuItemDesktop.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'AdminSidebarMenuItemDesktop',
          props: {
            href: { required: !0, tsType: { name: 'string' }, description: '' },
            iconSrc: { required: !0, tsType: { name: 'string' }, description: '' },
            label: { required: !0, tsType: { name: 'string' }, description: '' },
            active: {
              required: !1,
              tsType: { name: 'boolean' },
              description: '',
              defaultValue: { value: 'false', computed: !1 },
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }),
        (AdminSidebar.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'AdminSidebar',
          props: {
            companyId: { required: !0, tsType: { name: 'string' }, description: '' },
            userRole: {
              required: !1,
              tsType: { name: 'string' },
              description: '',
              defaultValue: { value: "'user'", computed: !1 },
            },
          },
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
    './src/constants/notification.constants.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Nh: () => NOTIFICATION_TARGET_TYPE,
        l4: () => NOTIFICATION_API,
        p1: () => NOTIFICATION_PAGINATION,
        x8: () => SSE_CONFIG,
      });
      const NOTIFICATION_API = {
          STREAM: '/api/v1/notification/stream',
          LIST: '/api/v1/notification',
          UNREAD_COUNT: '/api/v1/notification/unread-count',
          READ: (id) => `/api/v1/notification/${id}/read`,
          BROADCAST: '/api/v1/notification/broadcast',
        },
        NOTIFICATION_TARGET_TYPE = {
          PURCHASE_REQUEST: 'PURCHASE_REQUEST',
          APPROVAL_NOTICE: 'APPROVAL_NOTICE',
          DENIAL_NOTICE: 'DENIAL_NOTICE',
          ADMIN_MESSAGE: 'ADMIN_MESSAGE',
          GENERAL_NOTICE: 'GENERAL_NOTICE',
        },
        SSE_CONFIG = { HEARTBEAT_TIMEOUT: 36e5, RECONNECT_DELAY: 5e3, POLLING_INTERVAL: 6e4 },
        NOTIFICATION_PAGINATION = { DEFAULT_PAGE: 1, DEFAULT_LIMIT: 10, MODAL_LIMIT: 20 };
    },
    './src/features/dashboard/template/DashboardTem/DashboardTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          LongUserName: () => LongUserName,
          NonAdmin: () => NonAdmin,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => DashboardTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        AdminSideBar = __webpack_require__(
          './src/components/molecules/AdminSideBar/AdminSideBar.tsx'
        ),
        DashboardCardOrg = __webpack_require__(
          './src/features/dashboard/components/DashboardCardOrg/DashboardCardOrg.tsx'
        ),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        CarouselIndicator = __webpack_require__(
          './src/components/atoms/CarouselIndicator/CarouselIndicator.tsx'
        ),
        notification_queries = __webpack_require__(
          './src/features/notification/queries/notification.queries.ts'
        ),
        useToast = __webpack_require__('./src/hooks/useToast.ts'),
        Toast = __webpack_require__('./src/components/molecules/Toast/Toast.tsx'),
        api = __webpack_require__('./src/utils/api.ts');
      const REPORT_API_PATHS_EXPORT_PURCHASE_REQUESTS =
        '/api/v1/report/admin/exportPurchaseRequests';
      var clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      const EmergencyBroadcastModal = ({ open, onClose, onSend }) => {
        const [message, setMessage] = (0, react.useState)(''),
          textareaRef = (0, react.useRef)(null);
        if (
          ((0, react.useEffect)(() => {
            open && textareaRef.current?.focus();
          }, [open]),
          !open)
        )
          return null;
        return (0, jsx_runtime.jsx)('div', {
          className:
            'fixed inset-0 z-[var(--z-overlay-content)] flex items-center justify-center bg-black/50 backdrop-blur-sm',
          role: 'dialog',
          'aria-modal': 'true',
          children: (0, jsx_runtime.jsxs)('div', {
            className: 'bg-white rounded-16 p-24 w-full max-w-400 shadow-xl m-16',
            children: [
              (0, jsx_runtime.jsx)('h2', {
                className: 'text-18 font-bold text-gray-900 mb-16',
                children: '긴급 알림 전송',
              }),
              (0, jsx_runtime.jsx)('p', {
                className: 'text-14 text-gray-600 mb-8',
                children: '전체 사용자에게 발송될 알림 내용을 입력하세요.',
              }),
              (0, jsx_runtime.jsx)('textarea', {
                ref: textareaRef,
                value: message,
                onChange: (e) => setMessage(e.target.value),
                className: (0, clsx.A)(
                  'w-full h-120 p-12 mb-20',
                  'border border-gray-200 rounded-8',
                  'text-14 text-gray-900',
                  'placeholder:text-gray-400',
                  'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
                  'resize-none'
                ),
                placeholder: '내용을 입력해주세요',
              }),
              (0, jsx_runtime.jsxs)('div', {
                className: 'flex justify-end gap-10',
                children: [
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'secondary',
                    className: 'w-80 h-40 text-14',
                    onClick: onClose,
                    children: '취소',
                  }),
                  (0, jsx_runtime.jsx)(Button.A, {
                    variant: 'primary',
                    className: 'w-80 h-40 text-14',
                    onClick: () => {
                      message.trim() && (onSend(message), setMessage(''), onClose());
                    },
                    inactive: !message.trim(),
                    children: '전송',
                  }),
                ],
              }),
            ],
          }),
        });
      };
      EmergencyBroadcastModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'EmergencyBroadcastModal',
        props: {
          open: { required: !0, tsType: { name: 'boolean' }, description: '' },
          onClose: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onSend: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(message: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'message' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
      var ExcelExportModal = __webpack_require__(
        './src/features/dashboard/template/DashboardTem/ExcelExportModal.tsx'
      );
      const DashboardTem = ({
          companyId,
          user,
          userRole = 'admin',
          monthlyExpense = 0,
          yearlyExpense = 0,
          progressValue = 0,
          currentBudget = 0,
          lastBudget = 0,
          monthlyExpenses,
          newUsers,
          changedUsers,
          snackRank,
        }) => {
          const { mutate: broadcast } = (0, notification_queries.Yf)(),
            [isEmergencyModalOpen, setIsEmergencyModalOpen] = (0, react.useState)(!1),
            [isExcelModalOpen, setIsExcelModalOpen] = (0, react.useState)(!1),
            [isExcelExporting, setIsExcelExporting] = (0, react.useState)(!1),
            defaultCarouselRef = (0, react.useRef)(null),
            usersCarouselRef = (0, react.useRef)(null),
            [defaultCarouselIndex, setDefaultCarouselIndex] = (0, react.useState)(0),
            [usersCarouselIndex, setUsersCarouselIndex] = (0, react.useState)(0),
            { showToast, toastVariant, toastMessage, triggerToast, closeToast } = (0, useToast.d)(),
            scrollToCarouselIndex = (ref, index) => {
              const el = ref.current;
              if (!el) return;
              const target = Array.from(el.querySelectorAll('[data-carousel-item="true"]'))[index];
              target && el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
            };
          (0, react.useEffect)(() => {
            const attach = (ref, setIndex) => {
                const el = ref.current;
                if (!el) return () => {};
                let raf = 0;
                const onScroll = () => {
                  (cancelAnimationFrame(raf),
                    (raf = requestAnimationFrame(() => {
                      const items = Array.from(el.querySelectorAll('[data-carousel-item="true"]'));
                      if (0 === items.length) return;
                      const left = el.scrollLeft;
                      let bestIdx = 0,
                        bestDist = Math.abs((items[0]?.offsetLeft ?? 0) - left);
                      for (let i = 1; i < items.length; i += 1) {
                        const dist = Math.abs((items[i]?.offsetLeft ?? 0) - left);
                        dist < bestDist && ((bestDist = dist), (bestIdx = i));
                      }
                      setIndex(bestIdx);
                    })));
                };
                return (
                  onScroll(),
                  el.addEventListener('scroll', onScroll, { passive: !0 }),
                  () => {
                    (cancelAnimationFrame(raf), el.removeEventListener('scroll', onScroll));
                  }
                );
              },
              detachDefault = attach(defaultCarouselRef, setDefaultCarouselIndex),
              detachUsers = attach(usersCarouselRef, setUsersCarouselIndex);
            return () => {
              (detachDefault(), detachUsers());
            };
          }, []);
          const handleEmergencyClick = () => {
              setIsEmergencyModalOpen(!0);
            },
            handleExcelClick = () => {
              setIsExcelModalOpen(!0);
            };
          return (0, jsx_runtime.jsxs)('div', {
            className:
              ' mx-auto flex flex-col w-327 tablet:w-696 desktop:flex-row desktop:w-full desktop:max-w-1400 desktop:pl-25 desktop:pr-100 desktop:mt-104 ',
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className:
                  ' mb-10 tablet:mb-20 flex items-center justify-between desktop:hidden w-full ',
                children: [
                  (0, jsx_runtime.jsxs)('h1', {
                    className: ' text-black font-suit text-18 font-bold tracking--0.45 ',
                    children: [user.name, '의 Dashboard'],
                  }),
                  (0, jsx_runtime.jsxs)('div', {
                    className: 'flex gap-8',
                    children: [
                      (0, jsx_runtime.jsx)(Button.A, {
                        variant: 'secondary',
                        size: 'sm',
                        onClick: handleEmergencyClick,
                        className: 'whitespace-nowrap',
                        children: '긴급 알림',
                      }),
                      (0, jsx_runtime.jsx)(Button.A, {
                        variant: 'secondary',
                        size: 'sm',
                        onClick: handleExcelClick,
                        children: 'Excel',
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime.jsx)('div', {
                className: ' shrink-0 mb-10 tablet:mb-20 desktop:mb-0 ',
                children: (0, jsx_runtime.jsx)(AdminSideBar.ay, { companyId, userRole }),
              }),
              (0, jsx_runtime.jsxs)('main', {
                className: 'flex flex-col desktop:ml-90 flex-1 min-w-0',
                children: [
                  (0, jsx_runtime.jsxs)('div', {
                    className: ' hidden desktop:flex items-center justify-between mb-30 w-full ',
                    children: [
                      (0, jsx_runtime.jsxs)('h1', {
                        className: ' text-black font-suit text-18 font-bold tracking--0.45 ',
                        children: [user.name, '의 Dashboard'],
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'flex gap-10',
                        children: [
                          (0, jsx_runtime.jsx)(Button.A, {
                            variant: 'secondary',
                            size: 'sm',
                            onClick: handleEmergencyClick,
                            children: '긴급 알림',
                          }),
                          (0, jsx_runtime.jsx)(Button.A, {
                            variant: 'secondary',
                            size: 'sm',
                            onClick: handleExcelClick,
                            children: 'Excel',
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime.jsxs)('section', {
                    ref: defaultCarouselRef,
                    className:
                      ' flex flex-row flex-nowrap gap-10 mb-10 overflow-x-auto snap-x snap-mandatory scrollbar-none  tablet:gap-20 tablet:mb-20 tablet:flex-col tablet:overflow-visible desktop:flex-row desktop:gap-30 desktop:mb-30 desktop:overflow-visible desktop:snap-none ',
                    children: [
                      (0, jsx_runtime.jsx)('div', {
                        className:
                          'shrink-0 snap-start tablet:shrink desktop:shrink desktop:flex-1 desktop:min-w-0',
                        'data-carousel-item': 'true',
                        children: (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                          variant: 'default',
                          defaultType: 'summary',
                          monthlyExpense,
                          yearlyExpense,
                          showProgressBar: !0,
                          progressValue,
                          currentBudget,
                          lastBudget,
                        }),
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className:
                          'shrink-0 snap-start tablet:shrink desktop:shrink desktop:flex-1 desktop:min-w-0',
                        'data-carousel-item': 'true',
                        children: (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                          variant: 'default',
                          defaultType: 'yearlyBar',
                          monthlyExpensesByYear: monthlyExpenses,
                        }),
                      }),
                    ],
                  }),
                  (0, jsx_runtime.jsx)(CarouselIndicator.w, {
                    count: 2,
                    activeIndex: defaultCarouselIndex,
                    onSelect: (idx) => scrollToCarouselIndex(defaultCarouselRef, idx),
                    className: 'my-6 tablet:hidden',
                  }),
                  (0, jsx_runtime.jsxs)('section', {
                    ref: usersCarouselRef,
                    className:
                      ' flex flex-row flex-nowrap gap-10 mb-10 overflow-x-auto snap-x snap-mandatory scrollbar-none  tablet:hidden ',
                    children: [
                      (0, jsx_runtime.jsx)('div', {
                        className: 'shrink-0 snap-start',
                        'data-carousel-item': 'true',
                        children: (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                          variant: 'longMedium',
                          mediumMode: 'new',
                          monthlyNewUsers: newUsers,
                        }),
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className: 'shrink-0 snap-start',
                        'data-carousel-item': 'true',
                        children: (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                          variant: 'longMedium',
                          mediumMode: 'changed',
                          monthlyChangedUsers: changedUsers,
                        }),
                      }),
                    ],
                  }),
                  (0, jsx_runtime.jsx)(CarouselIndicator.w, {
                    count: 2,
                    activeIndex: usersCarouselIndex,
                    onSelect: (idx) => scrollToCarouselIndex(usersCarouselRef, idx),
                    className: 'my-6 tablet:hidden',
                  }),
                  (0, jsx_runtime.jsx)('section', {
                    className: ' mb-10 tablet:hidden ',
                    children: (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                      variant: 'mediumExtraLong',
                      largeChartData: snackRank,
                    }),
                  }),
                  (0, jsx_runtime.jsxs)('section', {
                    className:
                      ' hidden tablet:grid tablet:grid-cols-2 tablet:gap-30 tablet:mb-20  desktop:hidden ',
                    children: [
                      (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                        variant: 'medium',
                        mediumMode: 'new',
                        monthlyNewUsers: newUsers,
                      }),
                      (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                        variant: 'medium',
                        mediumMode: 'changed',
                        monthlyChangedUsers: changedUsers,
                      }),
                    ],
                  }),
                  (0, jsx_runtime.jsx)('section', {
                    className: ' hidden tablet:block tablet:mb-20 desktop:hidden ',
                    children: (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                      variant: 'large',
                      largeChartData: snackRank,
                    }),
                  }),
                  (0, jsx_runtime.jsxs)('section', {
                    className:
                      ' hidden desktop:grid desktop:grid-cols-2 desktop:gap-x-30 desktop:gap-y-24 desktop:mb-30 ',
                    children: [
                      (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                        variant: 'medium',
                        mediumMode: 'new',
                        monthlyNewUsers: newUsers,
                      }),
                      (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                        variant: 'large',
                        className: 'row-span-2',
                        largeChartData: snackRank,
                      }),
                      (0, jsx_runtime.jsx)(DashboardCardOrg.A, {
                        variant: 'medium',
                        mediumMode: 'changed',
                        monthlyChangedUsers: changedUsers,
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime.jsx)(EmergencyBroadcastModal, {
                open: isEmergencyModalOpen,
                onClose: () => setIsEmergencyModalOpen(!1),
                onSend: (message) => {
                  (broadcast(message, {
                    onSuccess: (data) => {
                      triggerToast(
                        'success',
                        `알림이 전송되었습니다. (생성: ${data.data.createdCount}, 발송: ${data.data.deliveredCount})`
                      );
                    },
                    onError: (err) => {
                      const errMessage =
                        err instanceof Error ? err.message : '알림 전송에 실패했습니다.';
                      triggerToast('error', errMessage);
                    },
                  }),
                    setIsEmergencyModalOpen(!1));
                },
              }),
              (0, jsx_runtime.jsx)(ExcelExportModal.h, {
                open: isExcelModalOpen,
                onClose: () => setIsExcelModalOpen(!1),
                onExport: async (params) => {
                  setIsExcelExporting(!0);
                  try {
                    const blob = await (async (params) => {
                      const searchParams = new URLSearchParams({
                        from: params.from,
                        to: params.to,
                      });
                      (params.status && searchParams.append('status', params.status),
                        params.role && searchParams.append('role', params.role));
                      const url = `${REPORT_API_PATHS_EXPORT_PURCHASE_REQUESTS}?${searchParams.toString()}`,
                        response = await (0, api.v$)(url, { method: 'GET' });
                      if (!response.ok) {
                        const errorData = await response.json().catch(() => ({}));
                        throw new Error(errorData.message || '엑셀 다운로드에 실패했습니다.');
                      }
                      return response.blob();
                    })(params);
                    (((blob, filename) => {
                      const url = window.URL.createObjectURL(blob),
                        link = document.createElement('a');
                      ((link.href = url),
                        (link.download = filename),
                        document.body.appendChild(link),
                        link.click(),
                        document.body.removeChild(link),
                        window.URL.revokeObjectURL(url));
                    })(
                      blob,
                      `purchase_requests_${params.from.slice(0, 10)}_${params.to.slice(0, 10)}.xlsx`
                    ),
                      triggerToast('success', '엑셀 파일 다운로드가 완료되었습니다.'),
                      setIsExcelModalOpen(!1));
                  } catch (err) {
                    const errMessage =
                      err instanceof Error ? err.message : '엑셀 다운로드에 실패했습니다.';
                    triggerToast('error', errMessage);
                  } finally {
                    setIsExcelExporting(!1);
                  }
                },
                isLoading: isExcelExporting,
              }),
              showToast &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'fixed bottom-24 left-1/2 -translate-x-1/2 z-toast',
                  children: (0, jsx_runtime.jsx)(Toast.y, {
                    variant: toastVariant,
                    message: toastMessage,
                    onClose: closeToast,
                  }),
                }),
            ],
          });
        },
        DashboardTem_DashboardTem = DashboardTem;
      DashboardTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DashboardTem',
        props: {
          companyId: { required: !0, tsType: { name: 'string' }, description: '' },
          user: { required: !0, tsType: { name: 'User' }, description: '' },
          userRole: {
            required: !1,
            tsType: { name: 'UserRole' },
            description: '',
            defaultValue: { value: "'admin'", computed: !1 },
          },
          monthlyExpense: {
            required: !1,
            tsType: { name: 'number' },
            description: '✅ Dashboard Data (Story / Page에서 주입)',
            defaultValue: { value: '0', computed: !1 },
          },
          yearlyExpense: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          progressValue: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          currentBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          lastBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          monthlyExpenses: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'number' }], raw: 'number[]' },
            description: '',
          },
          newUsers: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'NewUser' }], raw: 'NewUser[]' },
            description: '',
          },
          changedUsers: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'ChangedUser' }], raw: 'ChangedUser[]' },
            description: '',
          },
          snackRank: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'LargeChartItem' }],
              raw: 'LargeChartItem[]',
            },
            description: '',
          },
        },
      };
      const mockUser = { name: '홍길동' },
        mockMonthlyExpenses = [120, 200, 150, 300, 280, 350, 50, 400, 320, 450, 500, 600],
        mockNewUsers = [
          {
            id: '1',
            name: '김철수',
            email: 'chulsoo@test.com',
            role: 'user',
            createdAt: '2024-01-10',
          },
          {
            id: '2',
            name: '이영희',
            email: 'younghee@test.com',
            role: 'manager',
            createdAt: '2024-01-12',
          },
        ],
        mockChangedUsers = [
          {
            id: '3',
            name: '박민수',
            email: 'minsoo@test.com',
            changeType: 'roleChange',
            beforeRole: 'user',
            afterRole: 'manager',
            changedAt: '2024-01-15',
          },
        ],
        mockSnackRank = [
          { label: '초코파이', value: 42, color: '#2563EB' },
          { label: '새우깡', value: 28, color: '#10B981' },
          { label: '포카칩', value: 18, color: '#F59E0B' },
          { label: '홈런볼', value: 12, color: '#EF4444' },
        ],
        DashboardTem_stories = {
          title: 'Features/Dashboard/Template/DashboardTem',
          component: DashboardTem_DashboardTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '\n관리자 대시보드 화면의 **Template 레벨 컴포넌트**입니다.\n\n> ⚠️ **본 페이지는 Admin 권한 사용자만 접근 가능합니다.**\n\n좌측의 `AdminSidebar` 와  \n우측의 **Dashboard 콘텐츠 영역**을 조합하여  \n관리자 페이지의 전체 레이아웃 구조를 담당합니다.\n\n---\n\n## 역할 (Responsibility)\n\n- **Admin 전용 레이아웃 구성**\n  - 좌측: `AdminSidebar`\n  - 우측: Dashboard 메인 콘텐츠 영역\n- 사용자 이름 기반의  \n  **"{user.name}의 Dashboard" 타이틀 렌더링**\n- Dashboard 카드 영역 레이아웃 관리\n  - 반응형 (Mobile / Tablet / Desktop)\n  - 카드 간 간격 및 배치 책임\n\n> ⚠️ 본 Template 컴포넌트는  \n> - 실제 API 호출  \n> - 비즈니스 로직  \n> 을 포함하지 않으며  \n> **데이터는 상위(Page / Story)에서 주입받습니다.**\n\n---\n\n## 접근 제어 (Access Control)\n\n- ✅ **Admin**: 접근 가능\n- ❌ **User / Manager**: 접근 불가  \n  → 실제 서비스에서는 **Route Guard / Middleware**에서 제어\n        ',
              },
            },
          },
        },
        Default = {
          args: {
            companyId: 'company-123',
            user: mockUser,
            userRole: 'admin',
            monthlyExpenses: mockMonthlyExpenses,
            newUsers: mockNewUsers,
            changedUsers: mockChangedUsers,
            snackRank: mockSnackRank,
          },
        },
        LongUserName = {
          args: {
            companyId: 'company-123',
            user: { name: '아주아주긴이름을가진관리자' },
            userRole: 'admin',
            monthlyExpenses: mockMonthlyExpenses,
            newUsers: mockNewUsers,
            changedUsers: mockChangedUsers,
            snackRank: mockSnackRank,
          },
        },
        NonAdmin = {
          args: {
            companyId: 'company-123',
            user: mockUser,
            userRole: 'user',
            monthlyExpenses: mockMonthlyExpenses,
            newUsers: mockNewUsers,
            changedUsers: mockChangedUsers,
            snackRank: mockSnackRank,
          },
        },
        __namedExportsOrder = ['Default', 'LongUserName', 'NonAdmin'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    companyId: mockCompanyId,\n    user: mockUser,\n    userRole: 'admin' as UserRole,\n    monthlyExpenses: mockMonthlyExpenses,\n    newUsers: mockNewUsers,\n    changedUsers: mockChangedUsers,\n    snackRank: mockSnackRank\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nDefault (Admin)\n======================',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (LongUserName.parameters = {
          ...LongUserName.parameters,
          docs: {
            ...LongUserName.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    companyId: mockCompanyId,\n    user: {\n      name: '아주아주긴이름을가진관리자'\n    },\n    userRole: 'admin' as UserRole,\n    monthlyExpenses: mockMonthlyExpenses,\n    newUsers: mockNewUsers,\n    changedUsers: mockChangedUsers,\n    snackRank: mockSnackRank\n  }\n}",
              ...LongUserName.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nLong User Name\n======================',
              ...LongUserName.parameters?.docs?.description,
            },
          },
        }),
        (NonAdmin.parameters = {
          ...NonAdmin.parameters,
          docs: {
            ...NonAdmin.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    companyId: mockCompanyId,\n    user: mockUser,\n    userRole: 'user' as UserRole,\n    monthlyExpenses: mockMonthlyExpenses,\n    newUsers: mockNewUsers,\n    changedUsers: mockChangedUsers,\n    snackRank: mockSnackRank\n  }\n}",
              ...NonAdmin.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nNon Admin (Access Restricted)\n======================',
              ...NonAdmin.parameters?.docs?.description,
            },
          },
        }));
    },
    './src/features/dashboard/template/DashboardTem/ExcelExportModal.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { h: () => ExcelExportModal });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        );
      const STATUS_OPTIONS = [
          { value: '', label: '전체' },
          { value: 'APPROVED', label: '승인' },
          { value: 'REJECTED', label: '거절' },
        ],
        ROLE_OPTIONS = [
          { value: 'ALL', label: '전체' },
          { value: 'USER', label: '일반 사용자' },
          { value: 'MANAGER', label: '매니저' },
          { value: 'ADMIN', label: '관리자' },
        ],
        getLocalDateString = (date) =>
          `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
        getDefaultFromDate = () => {
          const now = new Date(),
            firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
          return getLocalDateString(firstDay);
        },
        getDefaultToDate = () => getLocalDateString(new Date()),
        ExcelExportModal = ({ open, onClose, onExport, isLoading = !1 }) => {
          const [fromDate, setFromDate] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              getDefaultFromDate
            ),
            [toDate, setToDate] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              getDefaultToDate
            ),
            [status, setStatus] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(''),
            [role, setRole] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)('ALL');
          if (
            ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              open &&
                (setFromDate(getDefaultFromDate()),
                setToDate(getDefaultToDate()),
                setStatus(''),
                setRole('ALL'));
            }, [open]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              const handleEsc = (e) => {
                'Escape' !== e.key || isLoading || onClose();
              };
              return (
                open && window.addEventListener('keydown', handleEsc),
                () => window.removeEventListener('keydown', handleEsc)
              );
            }, [open, onClose, isLoading]),
            !open)
          )
            return null;
          const isValid = fromDate && toDate && new Date(fromDate) <= new Date(toDate),
            inputClassName = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
              'w-full h-44 px-12',
              'border border-gray-200 rounded-8',
              'text-14 text-gray-900',
              'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
              'disabled:bg-gray-50 disabled:cursor-not-allowed'
            ),
            labelClassName = 'block text-14 font-medium text-gray-700 mb-6';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className:
              'fixed inset-0 z-[var(--z-overlay-content)] flex items-center justify-center bg-black/50 backdrop-blur-sm',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-labelledby': 'excel-export-title',
            'aria-describedby': 'excel-export-desc',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'bg-white rounded-16 p-24 w-full max-w-400 shadow-xl m-16',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                  id: 'excel-export-title',
                  className: 'text-18 font-bold text-gray-900 mb-16',
                  children: '엑셀 리포트 다운로드',
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                  id: 'excel-export-desc',
                  className: 'text-14 text-gray-600 mb-20',
                  children: '구매 요청 승인/거절 내역을 엑셀 파일로 다운로드합니다.',
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'space-y-16 mb-20',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('label', {
                          htmlFor: 'excel-from-date',
                          className: labelClassName,
                          children: [
                            '시작일 ',
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-error-500',
                              children: '*',
                            }),
                          ],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
                          id: 'excel-from-date',
                          type: 'date',
                          value: fromDate,
                          onChange: (e) => setFromDate(e.target.value),
                          className: inputClassName,
                          disabled: isLoading,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('label', {
                          htmlFor: 'excel-to-date',
                          className: labelClassName,
                          children: [
                            '종료일 ',
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                              className: 'text-error-500',
                              children: '*',
                            }),
                          ],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
                          id: 'excel-to-date',
                          type: 'date',
                          value: toDate,
                          onChange: (e) => setToDate(e.target.value),
                          className: inputClassName,
                          disabled: isLoading,
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('label', {
                          htmlFor: 'excel-status',
                          className: labelClassName,
                          children: '결정 상태',
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('select', {
                          id: 'excel-status',
                          value: status,
                          onChange: (e) => setStatus(e.target.value),
                          className: inputClassName,
                          disabled: isLoading,
                          children: STATUS_OPTIONS.map((option) =>
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'option',
                              { value: option.value, children: option.label },
                              option.value
                            )
                          ),
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('label', {
                          htmlFor: 'excel-role',
                          className: labelClassName,
                          children: '요청자 역할',
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('select', {
                          id: 'excel-role',
                          value: role,
                          onChange: (e) => setRole(e.target.value),
                          className: inputClassName,
                          disabled: isLoading,
                          children: ROLE_OPTIONS.map((option) =>
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'option',
                              { value: option.value, children: option.label },
                              option.value
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                fromDate &&
                  toDate &&
                  new Date(fromDate) > new Date(toDate) &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                    className: 'text-12 text-error-500 mb-12',
                    children: '종료일은 시작일 이후여야 합니다.',
                  }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex justify-end gap-10',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        variant: 'secondary',
                        className: 'w-80 h-40 text-14',
                        onClick: onClose,
                        inactive: isLoading,
                        children: '취소',
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        variant: 'primary',
                        className: 'w-120 h-40 text-14 whitespace-nowrap',
                        onClick: () => {
                          if (!isValid || isLoading) return;
                          const params = { from: fromDate, to: toDate };
                          (status && (params.status = status),
                            role && (params.role = role),
                            Promise.resolve(onExport(params)).catch(() => {}));
                        },
                        inactive: !isValid || isLoading,
                        children: isLoading ? '다운로드 중...' : '다운로드',
                      }
                    ),
                  ],
                }),
              ],
            }),
          });
        };
      ExcelExportModal.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ExcelExportModal',
        props: {
          open: { required: !0, tsType: { name: 'boolean' }, description: '' },
          onClose: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          onExport: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(params: ExcelExportParams) => void | Promise<void>',
              signature: {
                arguments: [{ type: { name: 'ExcelExportParams' }, name: 'params' }],
                return: {
                  name: 'union',
                  raw: 'void | Promise<void>',
                  elements: [
                    { name: 'void' },
                    { name: 'Promise', elements: [{ name: 'void' }], raw: 'Promise<void>' },
                  ],
                },
              },
            },
            description: '',
          },
          isLoading: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/features/notification/queries/notification.queries.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        qn: () => notificationKeys,
        Yf: () => useBroadcastNotification,
        SF: () => useMarkNotificationAsRead,
        E$: () => useNotifications,
        J9: () => useUnreadNotificationCount,
      });
      var useQuery = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/useQuery.js'
        ),
        QueryClientProvider = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js'
        ),
        useMutation = __webpack_require__(
          './node_modules/@tanstack/react-query/build/modern/useMutation.js'
        ),
        api = __webpack_require__('./src/utils/api.ts'),
        notification_constants = __webpack_require__('./src/constants/notification.constants.ts');
      const notificationApi_getNotifications = async (
          page = notification_constants.p1.DEFAULT_PAGE,
          limit = notification_constants.p1.DEFAULT_LIMIT
        ) => {
          const response = await (0, api.v$)(
            `${notification_constants.l4.LIST}?page=${page}&limit=${limit}`,
            { method: 'GET' }
          );
          if (!response.ok) {
            let errorMessage = '알림 목록 조회 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || !Array.isArray(data.data))
            throw new Error(data.message || '알림 데이터 형식이 올바르지 않습니다.');
          return data;
        },
        notificationApi_getUnreadCount = async () => {
          const response = await (0, api.v$)(notification_constants.l4.UNREAD_COUNT, {
            method: 'GET',
          });
          if (!response.ok) {
            let errorMessage = '읽지 않은 알림 수 조회 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || 'number' != typeof data.data?.count)
            throw new Error(data.message || '알림 수 데이터 형식이 올바르지 않습니다.');
          return data;
        },
        notificationApi_markAsRead = async (id) => {
          const response = await (0, api.v$)(notification_constants.l4.READ(id), {
            method: 'PATCH',
          });
          if (!response.ok) {
            let errorMessage = '알림 읽음 처리 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success || !data.data)
            throw new Error(data.message || '알림 읽음 처리 응답 형식이 올바르지 않습니다.');
          return data;
        },
        notificationApi_broadcastNotification = async (content) => {
          const response = await (0, api.v$)(notification_constants.l4.BROADCAST, {
            method: 'POST',
            body: JSON.stringify({ content }),
          });
          if (!response.ok) {
            let errorMessage = '전체 알림 발송 실패';
            try {
              errorMessage = (await response.json()).message || errorMessage;
            } catch {}
            throw new Error(errorMessage);
          }
          const data = await response.json();
          if (!data.success) throw new Error(data.message || '전체 알림 발송에 실패했습니다.');
          return data;
        };
      var staleTime = __webpack_require__('./src/constants/staleTime.ts');
      const notificationKeys = {
        all: ['notification'],
        list: (page, limit) => [...notificationKeys.all, 'list', page, limit],
        unreadCount: () => [...notificationKeys.all, 'unread-count'],
      };
      function useNotifications(params) {
        const {
          page = notification_constants.p1.DEFAULT_PAGE,
          limit = notification_constants.p1.DEFAULT_LIMIT,
          enabled = !0,
        } = params || {};
        return (0, useQuery.I)({
          queryKey: notificationKeys.list(page, limit),
          queryFn: () => notificationApi_getNotifications(page, limit),
          staleTime: staleTime.S.SHORT,
          enabled,
        });
      }
      function useUnreadNotificationCount(options) {
        const { enabled = !0 } = options || {};
        return (0, useQuery.I)({
          queryKey: notificationKeys.unreadCount(),
          queryFn: () => notificationApi_getUnreadCount(),
          staleTime: staleTime.S.SHORT,
          enabled,
          refetchInterval: notification_constants.x8.POLLING_INTERVAL,
          refetchIntervalInBackground: !1,
        });
      }
      function useMarkNotificationAsRead() {
        const queryClient = (0, QueryClientProvider.jE)();
        return (0, useMutation.n)({
          mutationFn: (id) => notificationApi_markAsRead(id),
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
          },
        });
      }
      function useBroadcastNotification() {
        const queryClient = (0, QueryClientProvider.jE)();
        return (0, useMutation.n)({
          mutationFn: (content) => notificationApi_broadcastNotification(content),
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: notificationKeys.all });
          },
        });
      }
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
  },
]);
