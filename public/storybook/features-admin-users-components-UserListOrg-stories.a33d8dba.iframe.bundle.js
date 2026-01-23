'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2382],
  {
    './src/components/atoms/Avatar/Avatar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { e: () => Avatar });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ =
          (__webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
          __webpack_require__('./node_modules/@storybook/nextjs/dist/images/next-image.js')),
        clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const sizeClass = { 24: 'w-24 h-24', 32: 'w-32 h-32' },
        iconSizeClass = { 24: 12, 32: 16 },
        bgColorClass = { 'gray-100': 'bg-gray-100', 'gray-50': 'bg-gray-50' },
        Avatar = ({
          src,
          alt = 'avatar',
          name,
          size = 32,
          bgColor = 'gray-100',
          className,
          onClick,
          onKeyDown,
          onMouseEnter,
          onMouseLeave,
          style,
          id,
          'aria-label': ariaLabel,
          'aria-labelledby': ariaLabelledBy,
        }) => {
          const effectiveSrc = src,
            handleKeyDown = (event) => {
              (!onClick ||
                ('Enter' !== event.key && ' ' !== event.key) ||
                (event.preventDefault(), onClick(event)),
                onKeyDown?.(event));
            },
            renderContent = () => {
              if (effectiveSrc)
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    src: effectiveSrc,
                    alt,
                    width: size,
                    height: size,
                    className: 'h-full w-full object-cover rounded-full aspect-square',
                  }
                );
              if (name) {
                const firstChar = name.charAt(0).toUpperCase(),
                  fontSize = 24 === size ? 'text-10' : 'text-14';
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  className: (0, clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                    'font-medium text-gray-950 tracking--0.25',
                    fontSize
                  ),
                  children: firstChar,
                });
              }
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                {
                  src: '/icons/user-default.svg',
                  alt: 'Default user avatar',
                  width: iconSizeClass[size],
                  height: iconSizeClass[size],
                  className: 'shrink-0',
                  unoptimized: !0,
                }
              );
            },
            baseClassName = (0, clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'relative flex items-center justify-center overflow-hidden rounded-full flex-shrink-0',
              sizeClass[size],
              bgColorClass[bgColor],
              className
            );
          return onClick
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: baseClassName,
                onClick,
                onKeyDown: handleKeyDown,
                onMouseEnter,
                onMouseLeave,
                style,
                id,
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledBy,
                role: 'button',
                tabIndex: 0,
                children: renderContent(),
              })
            : onKeyDown
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: baseClassName,
                  onKeyDown,
                  onMouseEnter,
                  onMouseLeave,
                  style,
                  id,
                  'aria-label': ariaLabel,
                  'aria-labelledby': ariaLabelledBy,
                  role: 'button',
                  tabIndex: 0,
                  children: renderContent(),
                })
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: baseClassName,
                  onMouseEnter,
                  onMouseLeave,
                  style,
                  id,
                  'aria-label': ariaLabel,
                  'aria-labelledby': ariaLabelledBy,
                  children: renderContent(),
                });
        };
      Avatar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Avatar',
        props: {
          src: { required: !1, tsType: { name: 'string' }, description: '' },
          alt: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'avatar'", computed: !1 },
          },
          name: { required: !1, tsType: { name: 'string' }, description: '' },
          size: {
            required: !1,
            tsType: {
              name: 'union',
              raw: '24 | 32',
              elements: [
                { name: 'literal', value: '24' },
                { name: 'literal', value: '32' },
              ],
            },
            description: '',
            defaultValue: { value: '32', computed: !1 },
          },
          bgColor: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'gray-100' | 'gray-50'",
              elements: [
                { name: 'literal', value: "'gray-100'" },
                { name: 'literal', value: "'gray-50'" },
              ],
            },
            description: '',
            defaultValue: { value: "'gray-100'", computed: !1 },
          },
        },
      };
    },
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
    './src/components/atoms/RoleBadge/RoleBadge.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const roleStyles = {
          user: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-gray-50', 'text-gray-500'),
          manager: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-gray-700', 'text-white'),
        },
        RoleBadge = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          ({ role, className, children, ...props }, ref) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              ref,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'inline-flex',
                'justify-center items-center',
                'w-51 h-23 tablet:w-64 tablet:h-30 desktop:w-64 desktop:h-30',
                'rounded-100',
                'text-12 tablet:text-14 desktop:text-14',
                'font-bold leading-normal',
                roleStyles[role],
                className
              ),
              style: { fontFamily: 'SUIT, var(--font-family-base), sans-serif' },
              ...props,
              children,
            })
        );
      RoleBadge.displayName = 'RoleBadge';
      const __WEBPACK_DEFAULT_EXPORT__ = RoleBadge;
      RoleBadge.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'RoleBadge',
        props: {
          role: {
            required: !0,
            tsType: {
              name: 'union',
              raw: "'user' | 'manager'",
              elements: [
                { name: 'literal', value: "'user'" },
                { name: 'literal', value: "'manager'" },
              ],
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
    './src/features/admin/users/components/UserListOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Empty: () => Empty,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => UserListOrg_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        Avatar = __webpack_require__('./src/components/atoms/Avatar/Avatar.tsx'),
        RoleBadge = __webpack_require__('./src/components/atoms/RoleBadge/RoleBadge.tsx'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx');
      const UserList = ({ users, onRoleChange, onDelete }) => {
          const [openMenuId, setOpenMenuId] = (0, react.useState)(null),
            getRoleLabel = (role) => ('MANAGER' === role || 'ADMIN' === role ? '관리자' : '일반'),
            getBadgeRole = (role) => ('MANAGER' === role || 'ADMIN' === role ? 'manager' : 'user');
          return 0 === users.length
            ? (0, jsx_runtime.jsx)('div', {
                className: 'w-full flex-1 flex flex-col items-center justify-center min-h-400',
                children: (0, jsx_runtime.jsxs)('div', {
                  className: 'flex flex-col items-center gap-24',
                  children: [
                    (0, jsx_runtime.jsx)('div', {
                      className: 'w-36 h-43 relative opacity-50',
                      children: (0, jsx_runtime.jsx)(next_image.A, {
                        src: '/icons/book.svg',
                        alt: 'empty',
                        fill: !0,
                        className: 'object-contain',
                        unoptimized: !0,
                      }),
                    }),
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex flex-col items-center gap-8',
                      children: [
                        (0, jsx_runtime.jsx)('span', {
                          className: 'text-18 font-bold text-gray-900',
                          children: '아직 회원이 없어요',
                        }),
                        (0, jsx_runtime.jsxs)('span', {
                          className:
                            'text-14 font-medium text-gray-500 text-center whitespace-pre-wrap',
                          children: [
                            '함께 이용할 회원을 초대하고',
                            '\n',
                            '간식 구매를 통합 관리하세요',
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              })
            : (0, jsx_runtime.jsxs)('div', {
                className: 'w-full desktop:max-w-960',
                children: [
                  (0, jsx_runtime.jsxs)('div', {
                    className:
                      'hidden tablet:flex items-center w-full px-20 border-b border-gray-100 py-20 gap-20 desktop:gap-32',
                    children: [
                      (0, jsx_runtime.jsx)('div', {
                        className:
                          'w-150 desktop:w-100 text-center shrink-0 text-16 font-bold text-gray-500',
                        children: '이름',
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className: 'flex-1 text-center text-16 font-bold text-gray-500',
                        children: '메일',
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className: 'w-72 text-center text-16 font-bold text-gray-500',
                        children: '권한',
                      }),
                      (0, jsx_runtime.jsx)('div', {
                        className: 'w-200 text-center text-16 font-bold text-gray-500',
                        children: '비고',
                      }),
                    ],
                  }),
                  (0, jsx_runtime.jsx)('div', {
                    className: 'flex flex-col items-center tablet:items-stretch',
                    children: users.map((user) =>
                      (0, jsx_runtime.jsxs)(
                        'div',
                        {
                          className: 'contents',
                          children: [
                            (0, jsx_runtime.jsxs)('div', {
                              className:
                                'flex tablet:hidden w-full py-16 gap-12 border-b border-gray-100 relative px-16',
                              children: [
                                (0, jsx_runtime.jsx)('div', {
                                  className:
                                    'flex justify-center items-center w-48 h-48 shrink-0 rounded-100 bg-gray-50',
                                  children: (0, jsx_runtime.jsx)(Avatar.e, {
                                    size: 32,
                                    alt: user.name,
                                    src: user.avatarUrl,
                                  }),
                                }),
                                (0, jsx_runtime.jsxs)('div', {
                                  className: 'flex flex-col justify-center gap-2',
                                  children: [
                                    (0, jsx_runtime.jsxs)('div', {
                                      className: 'flex items-center gap-8',
                                      children: [
                                        (0, jsx_runtime.jsx)('span', {
                                          className:
                                            'text-gray-950 text-16 font-bold tracking-tight',
                                          children: user.name,
                                        }),
                                        (0, jsx_runtime.jsx)(RoleBadge.A, {
                                          role: getBadgeRole(user.role),
                                          children: getRoleLabel(user.role),
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime.jsx)('span', {
                                      className:
                                        'w-172 text-gray-950 text-16 font-normal tracking-tight truncate',
                                      children: user.email,
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime.jsxs)('div', {
                                  className: 'ml-auto relative',
                                  children: [
                                    (0, jsx_runtime.jsx)('button', {
                                      type: 'button',
                                      onClick: () => {
                                        return (
                                          (id = user.id),
                                          void setOpenMenuId(openMenuId === id ? null : id)
                                        );
                                        var id;
                                      },
                                      className: 'p-4',
                                      children: (0, jsx_runtime.jsx)(next_image.A, {
                                        src: '/icons/kebab-vertical.svg',
                                        alt: 'more',
                                        width: 24,
                                        height: 24,
                                        className: 'cursor-pointer',
                                        unoptimized: !0,
                                      }),
                                    }),
                                    openMenuId === user.id &&
                                      (0, jsx_runtime.jsx)('div', {
                                        className:
                                          'absolute right-0 top-full mt-0 bg-white border border-gray-100 rounded-md shadow-lg z-dropdown w-fit whitespace-nowrap',
                                        children: (0, jsx_runtime.jsx)('button', {
                                          type: 'button',
                                          disabled: 'ADMIN' === user.role,
                                          className:
                                            'w-full px-16 py-12 text-left text-16 font-normal tracking-tight \n                        ' +
                                            ('ADMIN' === user.role
                                              ? 'text-gray-400 cursor-not-allowed'
                                              : 'text-gray-950 hover:bg-gray-50'),
                                          onClick: () => {
                                            (onRoleChange(user.id), setOpenMenuId(null));
                                          },
                                          children: '권한 변경',
                                        }),
                                      }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime.jsxs)('div', {
                              className:
                                'hidden tablet:flex items-center w-full h-100 px-20 border-b border-[#E6E6E6] bg-white gap-20 desktop:gap-32',
                              children: [
                                (0, jsx_runtime.jsxs)('div', {
                                  className:
                                    'flex items-center gap-12 w-150 desktop:w-100 shrink-0',
                                  children: [
                                    (0, jsx_runtime.jsx)(Avatar.e, {
                                      size: 32,
                                      alt: user.name,
                                      src: user.avatarUrl,
                                    }),
                                    (0, jsx_runtime.jsx)('span', {
                                      className: 'font-normal text-gray-950 text-16 truncate',
                                      children: user.name,
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime.jsx)('div', {
                                  className:
                                    'flex-1 min-w-0 text-gray-950 text-16 font-normal truncate',
                                  children: user.email,
                                }),
                                (0, jsx_runtime.jsx)('div', {
                                  className: 'w-72 shrink-0 flex justify-center',
                                  children: (0, jsx_runtime.jsx)(RoleBadge.A, {
                                    role: getBadgeRole(user.role),
                                    children: getRoleLabel(user.role),
                                  }),
                                }),
                                (0, jsx_runtime.jsxs)('div', {
                                  className: 'w-200 shrink-0 flex justify-center gap-8',
                                  children: [
                                    (0, jsx_runtime.jsx)(Button.A, {
                                      variant: 'secondary',
                                      inactive: 'ADMIN' === user.role,
                                      className:
                                        '!px-12 !py-8 !text-16 !font-normal !text-gray-900 !bg-white !border !border-gray-300 !rounded-default hover:!bg-gray-50 transition-colors whitespace-nowrap !h-auto',
                                      onClick: () => onRoleChange(user.id),
                                      children: '권한 변경',
                                    }),
                                    (0, jsx_runtime.jsx)(Button.A, {
                                      variant: 'primary',
                                      className:
                                        '!px-12 !py-8 !text-16 !font-normal !text-white !bg-red !rounded-default hover:!opacity-90 transition-opacity whitespace-nowrap !h-auto',
                                      onClick: () => onDelete(user.id),
                                      children: '계정 탈퇴',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        },
                        user.id
                      )
                    ),
                  }),
                ],
              });
        },
        UserListOrg = UserList;
      UserList.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'UserList',
        props: {
          users: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'User' }], raw: 'User[]' },
            description: '',
          },
          onRoleChange: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(userId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'userId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onDelete: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(userId: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'userId' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
      const UserListOrg_stories = {
          title: 'Features/Admin/Users/UserListOrg',
          component: UserListOrg,
          parameters: {
            layout: 'centered',
            docs: {
              description: {
                component:
                  "\n### 개요\n관리자 페이지의 사용자 목록 조회 컴포넌트입니다.\n\n### 주요 특징\n-   **반응형 디자인**: 모바일, 태블릿, 데스크탑 환경에 최적화된 레이아웃을 제공합니다.\n    -   모바일: 카드 형태의 리스트\n    -   테블릿/데스크탑: 테이블 형태의 리스트\n-   **사용자 관리**: 각 사용자의 권한 변경 및 계정 탈퇴 기능을 제공합니다.\n-   **데이터 없음 상태**: 표시할 사용자가 없을 때 안내 메시지를 보여줍니다.\n\n### 인터랙션\n-   **권한 변경**: \n    -   모바일: 케밥 메뉴 > 권한 변경 선택\n    -   데스크탑: '권한 변경' 버튼 클릭\n-   **계정 탈퇴**:\n    -   데스크탑: '계정 탈퇴' 버튼 클릭\n",
              },
            },
            viewport: { defaultViewport: 'responsive' },
          },
          tags: ['autodocs'],
          argTypes: {
            users: { description: '표시할 사용자 목록 데이터입니다.' },
            onRoleChange: { description: '권한 변경 버튼 클릭 시 호출되는 콜백 함수입니다.' },
            onDelete: { description: '계정 탈퇴 버튼 클릭 시 호출되는 콜백 함수입니다.' },
          },
          args: {
            onRoleChange: () => alert('권한 변경 클릭됨'),
            onDelete: () => alert('계정 탈퇴 클릭됨'),
          },
        },
        Default = {
          args: {
            users: [
              {
                id: '1',
                name: '김관리',
                email: 'admin@example.com',
                role: 'ADMIN',
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
                isActive: !0,
              },
              {
                id: '2',
                name: '이매니저',
                email: 'manager@example.com',
                role: 'MANAGER',
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager',
                isActive: !0,
              },
              {
                id: '3',
                name: '박사원',
                email: 'user@example.com',
                role: 'USER',
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
                isActive: !0,
              },
              {
                id: '4',
                name: '최사원',
                email: 'choi@example.com',
                role: 'USER',
                avatarUrl: void 0,
                isActive: !1,
              },
            ],
          },
          render: (args) =>
            (0, jsx_runtime.jsx)(UserListOrg, {
              users: args.users,
              onRoleChange: args.onRoleChange,
              onDelete: args.onDelete,
            }),
        },
        Empty = {
          args: { users: [] },
          render: (args) =>
            (0, jsx_runtime.jsx)(UserListOrg, {
              users: args.users,
              onRoleChange: args.onRoleChange,
              onDelete: args.onDelete,
            }),
        },
        __namedExportsOrder = ['Default', 'Empty'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    users: mockUsers\n  },\n  render: args => <UserList users={args.users} onRoleChange={args.onRoleChange} onDelete={args.onDelete} />\n}',
            ...Default.parameters?.docs?.source,
          },
          description: {
            story:
              '**기본 상태 (Default)**\n\n- 가상 사용자 목록이 표시됩니다.\n- 반응형 뷰포트를 조절하며 각 브레이크포인트에서의 변화를 확인할 수 있습니다.',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (Empty.parameters = {
          ...Empty.parameters,
          docs: {
            ...Empty.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    users: []\n  },\n  render: args => <UserList users={args.users} onRoleChange={args.onRoleChange} onDelete={args.onDelete} />\n}',
              ...Empty.parameters?.docs?.source,
            },
            description: {
              story:
                '**데이터가 없는 상태 (Empty)**\n\n- 사용자 목록이 비어있을 경우 메시지가 표시됩니다.',
              ...Empty.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
