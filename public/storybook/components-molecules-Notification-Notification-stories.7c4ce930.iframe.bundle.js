'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [783],
  {
    './src/components/atoms/Divider/Divider.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { c: () => Divider });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const variantClass = { thin: 'bg-gray-100', thick: 'bg-gray-950' },
        thicknessClass = { thin: 'h-px', thick: 'h-0.5' },
        Divider = ({ orientation = 'horizontal', variant = 'thin', className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            role: 'separator',
            className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              variantClass[variant],
              'horizontal' === orientation
                ? `w-full ${thicknessClass[variant]}`
                : 'h-full ' + ('thin' === variant ? 'w-px' : 'w-0.5'),
              className
            ),
          });
      Divider.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Divider',
        props: {
          orientation: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'horizontal' | 'vertical'",
              elements: [
                { name: 'literal', value: "'horizontal'" },
                { name: 'literal', value: "'vertical'" },
              ],
            },
            description: '',
            defaultValue: { value: "'horizontal'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'thin' | 'thick'",
              elements: [
                { name: 'literal', value: "'thin'" },
                { name: 'literal', value: "'thick'" },
              ],
            },
            description: '',
            defaultValue: { value: "'thin'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
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
    './src/components/molecules/Notification/Notification.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Empty: () => Empty,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => Notification_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        Divider = __webpack_require__('./src/components/atoms/Divider/Divider.tsx'),
        IconButton = __webpack_require__('./src/components/atoms/IconButton/IconButton.tsx');
      const sizeClass = { 32: 'w-32 h-32' },
        sortByRead = (list) =>
          [...list].sort((a, b) => Number(a.isRead ?? !1) - Number(b.isRead ?? !1)),
        Notification = ({ size = 32, className, notifications = [] }) => {
          const [open, setOpen] = (0, react.useState)(!1),
            [visibleCount, setVisibleCount] = (0, react.useState)(4),
            [items, setItems] = (0, react.useState)([]),
            wrapperRef = (0, react.useRef)(null),
            listRef = (0, react.useRef)(null),
            hasMore = visibleCount < items.length,
            visibleItems = items.slice(0, visibleCount),
            unreadCount = items.filter((item) => !item.isRead).length;
          ((0, react.useEffect)(() => {
            open && (setVisibleCount(4), setItems(sortByRead(notifications)));
          }, [open, notifications]),
            (0, react.useEffect)(() => {
              if (!open) return;
              const handleOutsideClick = (e) => {
                  wrapperRef.current && !wrapperRef.current.contains(e.target) && setOpen(!1);
                },
                handleEsc = (e) => {
                  'Escape' === e.key && setOpen(!1);
                };
              return (
                document.addEventListener('mousedown', handleOutsideClick),
                document.addEventListener('keydown', handleEsc),
                () => {
                  (document.removeEventListener('mousedown', handleOutsideClick),
                    document.removeEventListener('keydown', handleEsc));
                }
              );
            }, [open]));
          const handleRead = (id) => {
            setItems((prev) =>
              sortByRead(prev.map((item) => (item.id === id ? { ...item, isRead: !0 } : item)))
            );
          };
          return (0, jsx_runtime.jsxs)('div', {
            ref: wrapperRef,
            className: 'relative inline-flex',
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className: (0, clsx.A)(
                  'relative inline-flex items-center justify-center',
                  sizeClass[size],
                  'rounded-full cursor-pointer',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                  className
                ),
                role: 'button',
                tabIndex: 0,
                'aria-label': '알림' + (unreadCount > 0 ? `, 읽지 않은 알림 ${unreadCount}개` : ''),
                onClick: () => setOpen((prev) => !prev),
                onKeyDown: (e) => {
                  ('Enter' !== e.key && ' ' !== e.key) ||
                    (e.preventDefault(), setOpen((prev) => !prev));
                },
                children: [
                  (0, jsx_runtime.jsx)(next_image.A, {
                    src: open ? '/icons/notification-black.svg' : '/icons/notification.svg',
                    alt: '',
                    width: size,
                    height: size,
                    'aria-hidden': 'true',
                  }),
                  unreadCount > 0 &&
                    (0, jsx_runtime.jsx)('span', {
                      className: (0, clsx.A)(
                        'absolute -top-2 -right-2',
                        'min-w-20 h-20 px-4',
                        'rounded-full',
                        'bg-red-500 text-white',
                        'text-12 font-bold',
                        'flex items-center justify-center'
                      ),
                      'aria-hidden': 'true',
                      children: unreadCount > 99 ? '99+' : unreadCount,
                    }),
                ],
              }),
              open &&
                (0, jsx_runtime.jsxs)('div', {
                  className: (0, clsx.A)(
                    'absolute right-0 top-full mt-10 z-toast',
                    'w-327 max-h-394',
                    'rounded-[24px]',
                    'border border-gray-200 bg-white',
                    'shadow-[2px_2px_16px_0_rgba(0,0,0,0.06)]',
                    'flex flex-col'
                  ),
                  children: [
                    (0, jsx_runtime.jsxs)('div', {
                      className: 'flex items-center justify-between px-34 py-25',
                      children: [
                        (0, jsx_runtime.jsx)('span', {
                          className: 'text-18 font-bold text-gray-950',
                          children: '알림',
                        }),
                        (0, jsx_runtime.jsx)(IconButton.K, {
                          size: 'md',
                          onClick: () => setOpen(!1),
                          'aria-label': '알림 닫기',
                          children: (0, jsx_runtime.jsx)(next_image.A, {
                            src: '/icons/close-white.svg',
                            alt: '',
                            width: 24,
                            height: 24,
                            'aria-hidden': 'true',
                            className: 'cursor-pointer',
                          }),
                        }),
                      ],
                    }),
                    (0, jsx_runtime.jsx)('div', {
                      ref: listRef,
                      onScroll: () => {
                        const el = listRef.current;
                        el &&
                          hasMore &&
                          el.scrollTop + el.clientHeight >= el.scrollHeight - 16 &&
                          setVisibleCount((prev) => Math.min(prev + 4, items.length));
                      },
                      className: 'flex-1 overflow-y-auto scrollbar-none px-16 pb-0',
                      children:
                        0 === items.length
                          ? (0, jsx_runtime.jsx)('div', {
                              className: 'flex h-full items-center justify-center pb-50',
                              children: (0, jsx_runtime.jsx)('span', {
                                className: 'text-20 text-gray-400',
                                children: '알림이 없습니다',
                              }),
                            })
                          : (0, jsx_runtime.jsx)('div', {
                              className: 'flex flex-col',
                              children: visibleItems.map((item, index) => {
                                const isUnread = !item.isRead;
                                return (0, jsx_runtime.jsxs)(
                                  'div',
                                  {
                                    className: 'group',
                                    children: [
                                      (0, jsx_runtime.jsxs)('div', {
                                        className:
                                          'px-24 py-16 flex flex-col justify-between cursor-pointer',
                                        role: 'button',
                                        tabIndex: 0,
                                        onClick: () => handleRead(item.id),
                                        onKeyDown: (e) => {
                                          ('Enter' !== e.key && ' ' !== e.key) ||
                                            (e.preventDefault(), handleRead(item.id));
                                        },
                                        children: [
                                          (0, jsx_runtime.jsx)('p', {
                                            className: (0, clsx.A)(
                                              'text-16 [&>*]:inline',
                                              isUnread
                                                ? 'text-gray-950 font-medium'
                                                : 'text-gray-500'
                                            ),
                                            children: item.content,
                                          }),
                                          (0, jsx_runtime.jsxs)('div', {
                                            className: 'mt-4 flex items-center justify-between',
                                            children: [
                                              (0, jsx_runtime.jsx)('span', {
                                                className: (0, clsx.A)(
                                                  'text-14',
                                                  isUnread ? 'text-gray-400' : 'text-gray-300'
                                                ),
                                                children: item.time,
                                              }),
                                              (0, jsx_runtime.jsx)('button', {
                                                type: 'button',
                                                'aria-label': '알림 삭제',
                                                onClick: (e) => {
                                                  (e.stopPropagation(),
                                                    ((id) => {
                                                      const filtered = items.filter(
                                                        (item) => item.id !== id
                                                      );
                                                      (setItems(filtered),
                                                        setVisibleCount((prev) =>
                                                          Math.min(prev, filtered.length)
                                                        ));
                                                    })(item.id));
                                                },
                                                className:
                                                  'opacity-0 group-hover:opacity-100 transition-opacity',
                                                children: (0, jsx_runtime.jsx)(next_image.A, {
                                                  src: '/icons/trash.svg',
                                                  alt: '',
                                                  width: 16,
                                                  height: 16,
                                                  'aria-hidden': 'true',
                                                  className: 'cursor-pointer',
                                                }),
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                      index < visibleItems.length - 1 &&
                                        (0, jsx_runtime.jsx)('div', {
                                          className: 'mx-24',
                                          children: (0, jsx_runtime.jsx)(Divider.c, {}),
                                        }),
                                    ],
                                  },
                                  item.id
                                );
                              }),
                            }),
                    }),
                  ],
                }),
            ],
          });
        };
      ((Notification.displayName = 'Notification'),
        (Notification.__docgenInfo = {
          description: '',
          methods: [],
          displayName: 'Notification',
          props: {
            size: {
              required: !1,
              tsType: { name: 'literal', value: '32' },
              description: '',
              defaultValue: { value: '32', computed: !1 },
            },
            notifications: {
              required: !1,
              tsType: {
                name: 'Array',
                elements: [{ name: 'NotificationItem' }],
                raw: 'NotificationItem[]',
              },
              description: '',
              defaultValue: { value: '[]', computed: !1 },
            },
          },
        }));
      const mockNotifications = [
          {
            id: 1,
            content: (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: '무선 청소기 구매가 완료되었어요',
            }),
            time: '방금 전',
          },
          {
            id: 2,
            content: (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: '노트북 거치대 구매 요청이 접수되었어요',
            }),
            time: '10분 전',
          },
          {
            id: 3,
            content: (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: '의자 교환 요청이 수락되었어요',
            }),
            time: '1시간 전',
          },
          {
            id: 4,
            content: (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: '환불 요청이 반려되었어요',
            }),
            time: '3시간 전',
          },
          {
            id: 5,
            content: (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: '주문 취소가 완료되었어요',
            }),
            time: '어제',
          },
          {
            id: 6,
            content: (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children: '배송 요청이 처리 중이에요',
            }),
            time: '2일 전',
          },
          {
            id: 7,
            content: (0, jsx_runtime.jsx)(jsx_runtime.Fragment, {
              children:
                '배송 요청 건과 관련하여 상품이 배송 중 분실되어 현재 내부 확인 절차가 진행 중입니다. 확인이 완료되는 대로 추가 안내드릴 예정입니다.',
            }),
            time: '1일 전',
          },
        ],
        Notification_stories = {
          title: 'Molecules/Notification',
          component: Notification,
          tags: ['autodocs'],
          parameters: {
            layout: 'centered',
            docs: {
              description: {
                component:
                  '\n알림 드롭다운 컴포넌트입니다.\n\n### UX 규칙\n- **안 읽은 알림은 항상 상단에 노출됩니다.**\n- 알림을 클릭하면 **읽음 처리되며 리스트 하단으로 이동**합니다.\n- 스크롤 시 일정 개수씩 알림이 추가 로드됩니다.\n- 개별 알림은 삭제할 수 있습니다.\n\n실제 서비스 환경에서 사용하는 알림 UX 패턴을 그대로 반영했습니다.\n        ',
              },
            },
          },
        },
        Default = {
          args: { notifications: mockNotifications },
          parameters: {
            docs: {
              description: {
                story:
                  '\n기본 알림 상태입니다.\n\n- 모든 알림은 **초기에는 읽지 않은 상태**로 노출됩니다.\n- 알림을 클릭하면 읽음 처리되며 **자동으로 하단으로 이동**합니다.\n- 스크롤을 내려 추가 알림을 확인할 수 있습니다.\n        ',
              },
            },
          },
        },
        Empty = {
          args: { notifications: [] },
          parameters: {
            docs: {
              description: {
                story:
                  '\n알림이 없는 상태입니다.\n\n- 알림 데이터가 없을 경우  \n  **"알림이 없습니다"** 안내 문구가 표시됩니다.\n        ',
              },
            },
          },
        },
        __namedExportsOrder = ['Default', 'Empty'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    notifications: mockNotifications\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: `\n기본 알림 상태입니다.\n\n- 모든 알림은 **초기에는 읽지 않은 상태**로 노출됩니다.\n- 알림을 클릭하면 읽음 처리되며 **자동으로 하단으로 이동**합니다.\n- 스크롤을 내려 추가 알림을 확인할 수 있습니다.\n        `\n      }\n    }\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nDefault\n======================',
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
                '{\n  args: {\n    notifications: []\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: `\n알림이 없는 상태입니다.\n\n- 알림 데이터가 없을 경우  \n  **"알림이 없습니다"** 안내 문구가 표시됩니다.\n        `\n      }\n    }\n  }\n}',
              ...Empty.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nEmpty\n======================',
              ...Empty.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
