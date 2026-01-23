'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [851],
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
    './src/components/organisms/SideBarMenu/SideBarMenu.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _SideBarMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/organisms/SideBarMenu/SideBarMenu.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Organisms/SideBarMenu',
          component: _SideBarMenu__WEBPACK_IMPORTED_MODULE_4__.C,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '오른쪽에서 왼쪽으로 슬라이드되는 사이드바 메뉴 컴포넌트입니다. 오버레이 클릭 또는 닫기 버튼으로 닫을 수 있습니다.',
              },
            },
          },
          argTypes: {
            open: { control: 'boolean', description: '사이드바 열림/닫힘 상태' },
            onClose: { action: 'closed', description: '사이드바 닫기 콜백' },
          },
        },
        Default = {
          render: ({ open: initialOpen, onClose, children }) => {
            const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              initialOpen ?? !1
            );
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'w-full h-screen bg-gray-50',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'p-24 flex items-center gap-12',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_2__.K,
                      {
                        'aria-label': '메뉴 열기',
                        size: 'md',
                        variant: 'default',
                        className: 'flex items-center justify-center',
                        onClick: () => setOpen(!0),
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                          {
                            src: '/icons/hamburger.svg',
                            alt: '',
                            width: 20,
                            height: 20,
                            'aria-hidden': 'true',
                          }
                        ),
                      }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 text-gray-600',
                      children: '햄버거 버튼을 클릭하면 사이드바가 열립니다',
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _SideBarMenu__WEBPACK_IMPORTED_MODULE_4__.C,
                  {
                    open,
                    onClose: () => {
                      (setOpen(!1), onClose?.());
                    },
                    children:
                      children ??
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className: 'flex flex-col justify-center items-center gap-16',
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('nav', {
                          className: 'flex flex-col justify-center items-center gap-12',
                          children: [
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                              type: 'button',
                              className: 'text-16 text-gray-700 hover:text-gray-900 text-left',
                              children: '홈',
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                              type: 'button',
                              className: 'text-16 text-gray-700 hover:text-gray-900 text-left',
                              children: '상품',
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                              type: 'button',
                              className: 'text-16 text-gray-700 hover:text-gray-900 text-left',
                              children: '장바구니',
                            }),
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                              type: 'button',
                              className: 'text-16 text-gray-700 hover:text-gray-900 text-left',
                              children: '마이페이지',
                            }),
                          ],
                        }),
                      }),
                  }
                ),
              ],
            });
          },
          args: { open: !1 },
        },
        __namedExportsOrder = ['Default'];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: ({\n    open: initialOpen,\n    onClose,\n    children\n  }) => {\n    const [open, setOpen] = useState(initialOpen ?? false);\n    return <div className="w-full h-screen bg-gray-50">\n        <div className="p-24 flex items-center gap-12">\n          <IconButton aria-label="메뉴 열기" size="md" variant="default" className="flex items-center justify-center" onClick={() => setOpen(true)}>\n            <Image src="/icons/hamburger.svg" alt="" width={20} height={20} aria-hidden="true" />\n          </IconButton>\n          <span className="text-14 text-gray-600">햄버거 버튼을 클릭하면 사이드바가 열립니다</span>\n        </div>\n\n        <SideBarMenu open={open} onClose={() => {\n        setOpen(false);\n        onClose?.();\n      }}>\n          {children ?? <div className="flex flex-col justify-center items-center gap-16">\n              <nav className="flex flex-col justify-center items-center gap-12">\n                <button type="button" className="text-16 text-gray-700 hover:text-gray-900 text-left">\n                  홈\n                </button>\n                <button type="button" className="text-16 text-gray-700 hover:text-gray-900 text-left">\n                  상품\n                </button>\n                <button type="button" className="text-16 text-gray-700 hover:text-gray-900 text-left">\n                  장바구니\n                </button>\n                <button type="button" className="text-16 text-gray-700 hover:text-gray-900 text-left">\n                  마이페이지\n                </button>\n              </nav>\n            </div>}\n        </SideBarMenu>\n      </div>;\n  },\n  args: {\n    open: false\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      };
    },
    './src/components/organisms/SideBarMenu/SideBarMenu.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { C: () => SideBarMenu });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react-dom/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        );
      const SideBarMenu = ({ open, onClose, children, className }) => {
        const [isMounted, setIsMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);
        ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
          setIsMounted(!0);
        }, []),
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(
            () => (
              (document.body.style.overflow = open ? 'hidden' : ''),
              () => {
                document.body.style.overflow = '';
              }
            ),
            [open]
          ),
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!open) return;
            const handleKeyDown = (e) => {
              'Escape' === e.key && onClose();
            };
            return (
              window.addEventListener('keydown', handleKeyDown),
              () => window.removeEventListener('keydown', handleKeyDown)
            );
          }, [open, onClose]));
        const content = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
          {
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'fixed inset-0 bg-black/40 transition-opacity duration-200 z-menu',
                  open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                ),
                onClick: onClose,
                'aria-hidden': 'true',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('aside', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'fixed top-0 right-0 z-menu',
                  'w-225 h-full bg-white shadow-lg',
                  'transform transition-transform duration-250 ease-out',
                  'overflow-y-auto overflow-x-hidden',
                  open ? 'translate-x-0' : 'translate-x-full',
                  className
                ),
                role: 'dialog',
                'aria-modal': 'true',
                'aria-label': '사이드바 메뉴',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'flex justify-end items-center p-12 sticky top-0 bg-white z-10',
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                      {
                        'aria-label': '메뉴 닫기',
                        size: 'md',
                        variant: 'default',
                        onClick: onClose,
                        className: 'text-gray-500 hover:text-gray-900',
                        children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          next_image__WEBPACK_IMPORTED_MODULE_5__.A,
                          {
                            src: '/icons/close-white.svg',
                            alt: '',
                            width: 24,
                            height: 24,
                            'aria-hidden': 'true',
                          }
                        ),
                      }
                    ),
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: 'flex flex-col justify-center gap-8 my-16 mx-24 pb-24',
                    children,
                  }),
                ],
              }),
            ],
          }
        );
        return isMounted
          ? (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(content, document.body)
          : null;
      };
    },
  },
]);
