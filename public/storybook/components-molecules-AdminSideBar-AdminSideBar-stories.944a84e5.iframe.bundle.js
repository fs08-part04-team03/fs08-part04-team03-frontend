'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4847],
  {
    './src/components/molecules/AdminSideBar/AdminSideBar.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          DesktopView: () => DesktopView,
          MobileView: () => MobileView,
          TabletView: () => TabletView,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/molecules/AdminSideBar/AdminSideBar.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/AdminSideBar',
          component: _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__.ay,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '관리자 사이드바 컴포넌트입니다. 회원 관리, 예산 관리 등의 메뉴를 표시합니다. 뷰포트별로 다른 레이아웃을 제공합니다.',
              },
            },
          },
        },
        Default = { args: { companyId: 'company-1', userRole: 'admin' } },
        MobileView = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'w-full max-w-375',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                className: 'flex flex-row gap-0 border-b border-gray-200',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__.I6,
                    {
                      href: '/company-1/admin/users',
                      iconSrc: '/icons/user.svg',
                      label: '회원 관리',
                      active: !0,
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__.I6,
                    {
                      href: '/company-1/admin/budget',
                      iconSrc: '/icons/coin-outline.svg',
                      label: '예산 관리',
                      active: !1,
                    }
                  ),
                ],
              }),
            }),
          parameters: {
            docs: { description: { story: '모바일 뷰 (~ 743px): 가로 탭 형태, 밑줄 강조' } },
          },
        },
        TabletView = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'w-full max-w-744',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                className: 'flex flex-row gap-0 border-b border-gray-200',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__.a,
                    {
                      href: '/company-1/admin/users',
                      iconSrc: '/icons/user.svg',
                      label: '회원 관리',
                      active: !0,
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__.a,
                    {
                      href: '/company-1/admin/budget',
                      iconSrc: '/icons/coin-outline.svg',
                      label: '예산 관리',
                      active: !1,
                    }
                  ),
                ],
              }),
            }),
          parameters: {
            docs: { description: { story: '태블릿 뷰 (744px ~ 1199px): 가로 탭 형태, 밑줄 강조' } },
          },
        },
        DesktopView = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'w-200',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                className: 'flex flex-col gap-4',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__._U,
                    {
                      href: '/company-1/admin/users',
                      iconSrc: '/icons/user.svg',
                      label: '회원 관리',
                      active: !0,
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _AdminSideBar__WEBPACK_IMPORTED_MODULE_1__._U,
                    {
                      href: '/company-1/admin/budget',
                      iconSrc: '/icons/coin-outline.svg',
                      label: '예산 관리',
                      active: !1,
                    }
                  ),
                ],
              }),
            }),
          parameters: {
            docs: { description: { story: '데스크톱 뷰 (1200px ~): 세로 사이드바, 배경색 강조' } },
          },
        },
        __namedExportsOrder = ['Default', 'MobileView', 'TabletView', 'DesktopView'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    companyId: 'company-1',\n    userRole: 'admin'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (MobileView.parameters = {
          ...MobileView.parameters,
          docs: {
            ...MobileView.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="w-full max-w-375">\n      <aside className="flex flex-row gap-0 border-b border-gray-200">\n        <AdminSidebarMenuItemMobile href="/company-1/admin/users" iconSrc="/icons/user.svg" label="회원 관리" active />\n        <AdminSidebarMenuItemMobile href="/company-1/admin/budget" iconSrc="/icons/coin-outline.svg" label="예산 관리" active={false} />\n      </aside>\n    </div>,\n  parameters: {\n    docs: {\n      description: {\n        story: \'모바일 뷰 (~ 743px): 가로 탭 형태, 밑줄 강조\'\n      }\n    }\n  }\n}',
              ...MobileView.parameters?.docs?.source,
            },
          },
        }),
        (TabletView.parameters = {
          ...TabletView.parameters,
          docs: {
            ...TabletView.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="w-full max-w-744">\n      <aside className="flex flex-row gap-0 border-b border-gray-200">\n        <AdminSidebarMenuItemTablet href="/company-1/admin/users" iconSrc="/icons/user.svg" label="회원 관리" active />\n        <AdminSidebarMenuItemTablet href="/company-1/admin/budget" iconSrc="/icons/coin-outline.svg" label="예산 관리" active={false} />\n      </aside>\n    </div>,\n  parameters: {\n    docs: {\n      description: {\n        story: \'태블릿 뷰 (744px ~ 1199px): 가로 탭 형태, 밑줄 강조\'\n      }\n    }\n  }\n}',
              ...TabletView.parameters?.docs?.source,
            },
          },
        }),
        (DesktopView.parameters = {
          ...DesktopView.parameters,
          docs: {
            ...DesktopView.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="w-200">\n      <aside className="flex flex-col gap-4">\n        <AdminSidebarMenuItemDesktop href="/company-1/admin/users" iconSrc="/icons/user.svg" label="회원 관리" active />\n        <AdminSidebarMenuItemDesktop href="/company-1/admin/budget" iconSrc="/icons/coin-outline.svg" label="예산 관리" active={false} />\n      </aside>\n    </div>,\n  parameters: {\n    docs: {\n      description: {\n        story: \'데스크톱 뷰 (1200px ~): 세로 사이드바, 배경색 강조\'\n      }\n    }\n  }\n}',
              ...DesktopView.parameters?.docs?.source,
            },
          },
        }));
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
  },
]);
