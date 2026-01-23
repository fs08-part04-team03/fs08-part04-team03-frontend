'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7463],
  {
    './node_modules/clsx/dist/clsx.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      function r(e) {
        var t,
          f,
          n = '';
        if ('string' == typeof e || 'number' == typeof e) n += e;
        else if ('object' == typeof e)
          if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
          } else for (f in e) e[f] && (n && (n += ' '), (n += f));
        return n;
      }
      function clsx() {
        for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
          (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      __webpack_require__.d(__webpack_exports__, {
        $: () => clsx,
        A: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = clsx;
    },
    './node_modules/next/dist/client/use-merged-ref.js'(module, exports, __webpack_require__) {
      (Object.defineProperty(exports, '__esModule', { value: !0 }),
        Object.defineProperty(exports, 'useMergedRef', {
          enumerable: !0,
          get: function () {
            return useMergedRef;
          },
        }));
      const _react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js');
      function useMergedRef(refA, refB) {
        const cleanupA = (0, _react.useRef)(null),
          cleanupB = (0, _react.useRef)(null);
        return (0, _react.useCallback)(
          (current) => {
            if (null === current) {
              const cleanupFnA = cleanupA.current;
              cleanupFnA && ((cleanupA.current = null), cleanupFnA());
              const cleanupFnB = cleanupB.current;
              cleanupFnB && ((cleanupB.current = null), cleanupFnB());
            } else
              (refA && (cleanupA.current = applyRef(refA, current)),
                refB && (cleanupB.current = applyRef(refB, current)));
          },
          [refA, refB]
        );
      }
      function applyRef(refA, current) {
        if ('function' == typeof refA) {
          const cleanup = refA(current);
          return 'function' == typeof cleanup ? cleanup : () => refA(null);
        }
        return (
          (refA.current = current),
          () => {
            refA.current = null;
          }
        );
      }
      ('function' == typeof exports.default ||
        ('object' == typeof exports.default && null !== exports.default)) &&
        void 0 === exports.default.__esModule &&
        (Object.defineProperty(exports.default, '__esModule', { value: !0 }),
        Object.assign(exports.default, exports),
        (module.exports = exports.default));
    },
    './src/components/molecules/GNBPrimaryNav/GNBPrimaryNav.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AdminRole: () => AdminRole,
          ManagerRole: () => ManagerRole,
          SidebarAdmin: () => SidebarAdmin,
          SidebarManager: () => SidebarManager,
          SidebarUser: () => SidebarUser,
          SidebarWithoutLogout: () => SidebarWithoutLogout,
          UserRole: () => UserRole,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _GNBPrimaryNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/molecules/GNBPrimaryNav/GNBPrimaryNav.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/GNBPrimaryNav',
          component: _GNBPrimaryNav__WEBPACK_IMPORTED_MODULE_1__.Ay,
          tags: ['autodocs'],
          parameters: {
            nextjs: { appDirectory: !0, navigation: { pathname: '/products' } },
            docs: {
              description: {
                component:
                  'GNB(Global Navigation Bar) 상단의 텍스트 네비게이션 바입니다. 역할(user, manager, admin)에 따라 보여지는 메뉴가 달라지며, 현재 경로가 일치하는 메뉴는 강조 스타일이 적용됩니다.',
              },
            },
          },
          argTypes: {
            role: {
              control: 'select',
              options: ['user', 'manager', 'admin'],
              description: '사용자 역할',
            },
            companyId: { control: 'text', description: '회사 스코프 라우팅에 사용할 companyId' },
            activePath: { control: 'text', description: '현재 활성화된 경로 (선택사항)' },
            onItemClick: {
              action: 'item-clicked',
              description: '네비게이션 메뉴 아이템 클릭 시 호출되는 콜백',
            },
          },
        },
        UserRole = {
          args: { role: 'user', companyId: 'company-1' },
          parameters: {
            docs: {
              description: {
                story:
                  '일반 사용자(user) 역할의 메뉴입니다. 상품 리스트와 구매 요청 내역만 표시됩니다.',
              },
            },
            viewport: { defaultViewport: 'desktop' },
          },
        },
        ManagerRole = {
          args: { role: 'manager', companyId: 'company-1' },
          parameters: {
            docs: {
              description: {
                story:
                  '매니저(manager) 역할의 메뉴입니다. 상품 등록 내역, 구매 요청 관리, 구매 내역 확인이 추가로 표시됩니다.',
              },
            },
            viewport: { defaultViewport: 'desktop' },
          },
        },
        AdminRole = {
          args: { role: 'admin', companyId: 'company-1' },
          parameters: {
            docs: {
              description: {
                story:
                  '관리자(admin) 역할의 메뉴입니다. 모든 메뉴가 표시되며 관리 메뉴가 추가됩니다.',
              },
            },
            viewport: { defaultViewport: 'desktop' },
          },
        },
        SidebarUser = {
          render: (args) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'w-225 h-screen bg-white shadow-lg p-16',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _GNBPrimaryNav__WEBPACK_IMPORTED_MODULE_1__.rw,
                {
                  role: args.role,
                  companyId: args.companyId,
                  activePath: args.activePath,
                  onItemClick: args.onItemClick,
                  onProfileClick: args.onProfileClick,
                  onLogout: args.onLogout,
                }
              ),
            }),
          args: { role: 'user', companyId: 'company-1', onLogout: () => {} },
          parameters: {
            docs: { description: { story: '일반 사용자(user) 역할의 사이드바 메뉴입니다.' } },
          },
        },
        SidebarManager = {
          render: (args) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'w-225 h-screen bg-white shadow-lg p-16',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _GNBPrimaryNav__WEBPACK_IMPORTED_MODULE_1__.rw,
                {
                  role: args.role,
                  companyId: args.companyId,
                  activePath: args.activePath,
                  onItemClick: args.onItemClick,
                  onProfileClick: args.onProfileClick,
                  onLogout: args.onLogout,
                }
              ),
            }),
          args: { role: 'manager', companyId: 'company-1', onLogout: () => {} },
          parameters: {
            docs: { description: { story: '매니저(manager) 역할의 사이드바 메뉴입니다.' } },
          },
        },
        SidebarAdmin = {
          render: (args) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'w-225 h-screen bg-white shadow-lg p-16',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _GNBPrimaryNav__WEBPACK_IMPORTED_MODULE_1__.rw,
                {
                  role: args.role,
                  companyId: args.companyId,
                  activePath: args.activePath,
                  onItemClick: args.onItemClick,
                  onProfileClick: args.onProfileClick,
                  onLogout: args.onLogout,
                }
              ),
            }),
          args: { role: 'admin', companyId: 'company-1', onLogout: () => {} },
          parameters: {
            docs: { description: { story: '관리자(admin) 역할의 사이드바 메뉴입니다.' } },
          },
        },
        SidebarWithoutLogout = {
          render: (args) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'w-225 h-screen bg-white shadow-lg p-16',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _GNBPrimaryNav__WEBPACK_IMPORTED_MODULE_1__.rw,
                {
                  role: args.role,
                  companyId: args.companyId,
                  activePath: args.activePath,
                  onItemClick: args.onItemClick,
                  onProfileClick: args.onProfileClick,
                  onLogout: args.onLogout,
                }
              ),
            }),
          args: { role: 'user', companyId: 'company-1' },
          parameters: {
            docs: {
              description: {
                story:
                  '로그아웃 버튼이 없는 사이드바 메뉴입니다. onLogout prop이 없으면 로그아웃 버튼이 표시되지 않습니다.',
              },
            },
          },
        },
        __namedExportsOrder = [
          'UserRole',
          'ManagerRole',
          'AdminRole',
          'SidebarUser',
          'SidebarManager',
          'SidebarAdmin',
          'SidebarWithoutLogout',
        ];
      ((UserRole.parameters = {
        ...UserRole.parameters,
        docs: {
          ...UserRole.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    role: 'user',\n    companyId: 'company-1'\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '일반 사용자(user) 역할의 메뉴입니다. 상품 리스트와 구매 요청 내역만 표시됩니다.'\n      }\n    },\n    viewport: {\n      defaultViewport: 'desktop'\n    }\n  }\n}",
            ...UserRole.parameters?.docs?.source,
          },
        },
      }),
        (ManagerRole.parameters = {
          ...ManagerRole.parameters,
          docs: {
            ...ManagerRole.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    role: 'manager',\n    companyId: 'company-1'\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '매니저(manager) 역할의 메뉴입니다. 상품 등록 내역, 구매 요청 관리, 구매 내역 확인이 추가로 표시됩니다.'\n      }\n    },\n    viewport: {\n      defaultViewport: 'desktop'\n    }\n  }\n}",
              ...ManagerRole.parameters?.docs?.source,
            },
          },
        }),
        (AdminRole.parameters = {
          ...AdminRole.parameters,
          docs: {
            ...AdminRole.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    role: 'admin',\n    companyId: 'company-1'\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '관리자(admin) 역할의 메뉴입니다. 모든 메뉴가 표시되며 관리 메뉴가 추가됩니다.'\n      }\n    },\n    viewport: {\n      defaultViewport: 'desktop'\n    }\n  }\n}",
              ...AdminRole.parameters?.docs?.source,
            },
          },
        }),
        (SidebarUser.parameters = {
          ...SidebarUser.parameters,
          docs: {
            ...SidebarUser.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <div className=\"w-225 h-screen bg-white shadow-lg p-16\">\n      <GNBPrimaryNavSidebar role={args.role} companyId={args.companyId} activePath={args.activePath} onItemClick={args.onItemClick} onProfileClick={args.onProfileClick} onLogout={args.onLogout} />\n    </div>,\n  args: {\n    role: 'user',\n    companyId: 'company-1',\n    onLogout: () => {}\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '일반 사용자(user) 역할의 사이드바 메뉴입니다.'\n      }\n    }\n  }\n}",
              ...SidebarUser.parameters?.docs?.source,
            },
          },
        }),
        (SidebarManager.parameters = {
          ...SidebarManager.parameters,
          docs: {
            ...SidebarManager.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <div className=\"w-225 h-screen bg-white shadow-lg p-16\">\n      <GNBPrimaryNavSidebar role={args.role} companyId={args.companyId} activePath={args.activePath} onItemClick={args.onItemClick} onProfileClick={args.onProfileClick} onLogout={args.onLogout} />\n    </div>,\n  args: {\n    role: 'manager',\n    companyId: 'company-1',\n    onLogout: () => {}\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '매니저(manager) 역할의 사이드바 메뉴입니다.'\n      }\n    }\n  }\n}",
              ...SidebarManager.parameters?.docs?.source,
            },
          },
        }),
        (SidebarAdmin.parameters = {
          ...SidebarAdmin.parameters,
          docs: {
            ...SidebarAdmin.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <div className=\"w-225 h-screen bg-white shadow-lg p-16\">\n      <GNBPrimaryNavSidebar role={args.role} companyId={args.companyId} activePath={args.activePath} onItemClick={args.onItemClick} onProfileClick={args.onProfileClick} onLogout={args.onLogout} />\n    </div>,\n  args: {\n    role: 'admin',\n    companyId: 'company-1',\n    onLogout: () => {}\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '관리자(admin) 역할의 사이드바 메뉴입니다.'\n      }\n    }\n  }\n}",
              ...SidebarAdmin.parameters?.docs?.source,
            },
          },
        }),
        (SidebarWithoutLogout.parameters = {
          ...SidebarWithoutLogout.parameters,
          docs: {
            ...SidebarWithoutLogout.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <div className=\"w-225 h-screen bg-white shadow-lg p-16\">\n      <GNBPrimaryNavSidebar role={args.role} companyId={args.companyId} activePath={args.activePath} onItemClick={args.onItemClick} onProfileClick={args.onProfileClick} onLogout={args.onLogout} />\n    </div>,\n  args: {\n    role: 'user',\n    companyId: 'company-1'\n    // onLogout이 없으면 로그아웃 버튼이 표시되지 않음\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '로그아웃 버튼이 없는 사이드바 메뉴입니다. onLogout prop이 없으면 로그아웃 버튼이 표시되지 않습니다.'\n      }\n    }\n  }\n}",
              ...SidebarWithoutLogout.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/GNBPrimaryNav/GNBPrimaryNav.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        Ay: () => __WEBPACK_DEFAULT_EXPORT__,
        rw: () => GNBPrimaryNavSidebar,
      });
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
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./src/constants/index.ts');
      const GNBPrimaryNavDesktop = ({
          role,
          companyId,
          activePath,
          onItemClick,
          navClassName,
          className,
        }) => {
          const pathname = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)(),
            currentPath = activePath ?? pathname ?? '',
            desktopItems = (0, _constants__WEBPACK_IMPORTED_MODULE_4__.Hf)(role).filter(
              (item) => 'wishlist' !== item.key
            ),
            sortedItems = [...desktopItems].sort((a, b) => b.href.length - a.href.length),
            activeKeys = new Set(),
            activeItem = sortedItems.find((item) =>
              (0, _constants__WEBPACK_IMPORTED_MODULE_4__.o1)(currentPath, item.href)
            );
          return (
            activeItem && activeKeys.add(activeItem.key),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('nav', {
              'aria-label': '주요 페이지',
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex justify-center items-center gap-13',
                navClassName,
                className
              ),
              children: desktopItems.map((item) => {
                const href = item.href.replace('[companyId]', companyId),
                  active = activeKeys.has(item.key);
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href,
                    onClick: () => onItemClick?.(item.key),
                    'aria-current': active ? 'page' : void 0,
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'text-14 leading-22 transition-colors',
                      active ? 'font-semibold text-black' : 'text-gray-500 hover:text-black'
                    ),
                    children: item.label,
                  },
                  item.key
                );
              }),
            })
          );
        },
        GNBPrimaryNav = ({ role, companyId, activePath, onItemClick, navClassName, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'hidden desktop:flex',
              className
            ),
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              GNBPrimaryNavDesktop,
              { role, companyId, activePath, onItemClick, navClassName }
            ),
          }),
        __WEBPACK_DEFAULT_EXPORT__ = GNBPrimaryNav,
        GNBPrimaryNavSidebar = ({
          role,
          companyId,
          activePath,
          onItemClick,
          onProfileClick,
          onLogout,
          navClassName,
          className,
        }) => {
          const pathname = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)(),
            currentPath = activePath ?? pathname ?? '',
            items = (0, _constants__WEBPACK_IMPORTED_MODULE_4__.Hf)(role),
            profileHref = _constants__WEBPACK_IMPORTED_MODULE_4__.vp.PROFILE(companyId),
            isProfileActive = (0, _constants__WEBPACK_IMPORTED_MODULE_4__.o1)(
              currentPath,
              '/[companyId]/my/profile'
            ),
            sortedItems = [...items].sort((a, b) => b.href.length - a.href.length),
            activeKeys = new Set(),
            activeItem = sortedItems.find((item) =>
              (0, _constants__WEBPACK_IMPORTED_MODULE_4__.o1)(currentPath, item.href)
            );
          return (
            activeItem && activeKeys.add(activeItem.key),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('nav', {
              'aria-label': '주요 페이지',
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                'flex flex-col justify-center gap-36',
                navClassName,
                className
              ),
              children: [
                items.map((item) => {
                  const href = item.href.replace('[companyId]', companyId),
                    active = activeKeys.has(item.key);
                  return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                    {
                      href,
                      onClick: () => onItemClick?.(item.key),
                      'aria-current': active ? 'page' : void 0,
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                        'flex items-center justify-center',
                        'text-16 leading-22 transition-colors',
                        active ? 'font-semibold text-black' : 'text-gray-500 hover:text-black'
                      ),
                      children: item.label,
                    },
                    item.key
                  );
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_link__WEBPACK_IMPORTED_MODULE_1___default(),
                  {
                    href: profileHref,
                    onClick: onProfileClick,
                    'aria-current': isProfileActive ? 'page' : void 0,
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'flex items-center justify-center',
                      'text-16 leading-22 transition-colors',
                      isProfileActive
                        ? 'font-semibold text-black'
                        : 'text-gray-500 hover:text-black'
                    ),
                    children: '마이페이지',
                  }
                ),
                onLogout &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                    type: 'button',
                    onClick: onLogout,
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'flex items-center justify-center',
                      'text-16 leading-22 transition-colors',
                      'text-gray-500 hover:text-black',
                      'cursor-pointer'
                    ),
                    children: '로그아웃',
                  }),
              ],
            })
          );
        };
      ((GNBPrimaryNavDesktop.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'GNBPrimaryNavDesktop',
        props: {
          role: {
            required: !0,
            tsType: { name: 'UserRole' },
            description: '사용자 역할 (user | manager | admin)',
          },
          companyId: {
            required: !0,
            tsType: { name: 'string' },
            description: '회사 스코프 라우팅에 사용할 companyId',
          },
          activePath: {
            required: !1,
            tsType: { name: 'string' },
            description: '현재 활성 경로 (pathname 대신 사용 가능)',
          },
          onItemClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(key: AppRouteKey) => void',
              signature: {
                arguments: [{ type: { name: 'AppRouteKey' }, name: 'key' }],
                return: { name: 'void' },
              },
            },
            description: '네비게이션 아이템 클릭 시 호출되는 콜백',
          },
          navClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '네비게이션 메뉴 className',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      }),
        (GNBPrimaryNav.__docgenInfo = {
          description:
            'GNBPrimaryNav\n\n반응형 GNB 상단 네비게이션 컴포넌트\n- 데스크탑 (1024px ~): 네비게이션 링크들',
          methods: [],
          displayName: 'GNBPrimaryNav',
          props: {
            role: {
              required: !0,
              tsType: { name: 'UserRole' },
              description: '사용자 역할 (user | manager | admin)',
            },
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            activePath: {
              required: !1,
              tsType: { name: 'string' },
              description: '현재 활성 경로 (pathname 대신 사용 가능)',
            },
            onItemClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(key: AppRouteKey) => void',
                signature: {
                  arguments: [{ type: { name: 'AppRouteKey' }, name: 'key' }],
                  return: { name: 'void' },
                },
              },
              description: '네비게이션 아이템 클릭 시 호출되는 콜백',
            },
            navClassName: {
              required: !1,
              tsType: { name: 'string' },
              description: '데스크탑 네비게이션 메뉴 className',
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }),
        (GNBPrimaryNavSidebar.__docgenInfo = {
          description:
            'GNBPrimaryNavSidebar\n\n사이드바 메뉴용 네비게이션 컴포넌트\n- 기본 네비게이션 아이템들\n- 마이페이지(프로필)\n- 로그아웃',
          methods: [],
          displayName: 'GNBPrimaryNavSidebar',
          props: {
            role: {
              required: !0,
              tsType: { name: 'UserRole' },
              description: '사용자 역할 (user | manager | admin)',
            },
            companyId: {
              required: !0,
              tsType: { name: 'string' },
              description: '회사 스코프 라우팅에 사용할 companyId',
            },
            activePath: {
              required: !1,
              tsType: { name: 'string' },
              description: '현재 활성 경로 (pathname 대신 사용 가능)',
            },
            onItemClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '(key: AppRouteKey) => void',
                signature: {
                  arguments: [{ type: { name: 'AppRouteKey' }, name: 'key' }],
                  return: { name: 'void' },
                },
              },
              description: '네비게이션 아이템 클릭 시 호출되는 콜백',
            },
            onProfileClick: {
              required: !1,
              tsType: {
                name: 'signature',
                type: 'function',
                raw: '() => void',
                signature: { arguments: [], return: { name: 'void' } },
              },
              description: '마이페이지 클릭 시 호출되는 콜백',
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
            navClassName: {
              required: !1,
              tsType: { name: 'string' },
              description: '네비게이션 메뉴 className',
            },
            className: { required: !1, tsType: { name: 'string' }, description: '' },
          },
        }));
    },
  },
]);
