'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4149],
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
    './src/components/molecules/ItemMenu/ItemMenu.stories.tsx'(
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
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/ItemMenu',
          component: __webpack_require__('./src/components/molecules/ItemMenu/ItemMenu.tsx').A,
          tags: ['autodocs'],
          parameters: { layout: 'centered' },
        },
        Default = { args: {} },
        __namedExportsOrder = ['Default'];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: { originalSource: '{\n  args: {}\n}', ...Default.parameters?.docs?.source },
        },
      };
    },
    './src/components/molecules/ItemMenu/ItemMenu.tsx'(
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
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        );
      const ItemMenu = ({ onClick }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            dropdownRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            buttonRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            const handleClickOutside = (event) => {
              const target = event.target;
              dropdownRef.current &&
                target &&
                !dropdownRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target) &&
                setOpen(!1);
            };
            return (
              document.addEventListener('mousedown', handleClickOutside),
              () => document.removeEventListener('mousedown', handleClickOutside)
            );
          }, []);
          const handleItemClick = (action) => {
            (setOpen(!1), onClick?.(action));
          };
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'relative w-24 h-24',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_4__.K,
                {
                  ref: buttonRef,
                  onClick: () => setOpen(!open),
                  className: 'w-24 h-24 p-1 cursor-pointer',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                    {
                      src: '/icons/ic-more.svg',
                      alt: '더보기',
                      width: 24,
                      height: 24,
                      unoptimized: !0,
                    }
                  ),
                }
              ),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                ref: dropdownRef,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'absolute top-0 flex-col bg-white shadow-dropdown rounded overflow-hidden z-dropdown w-100',
                  'right-full xl:left-full xl:right-auto',
                  open ? 'flex' : 'hidden'
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    role: 'button',
                    tabIndex: 0,
                    className:
                      'flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer',
                    onClick: () => handleItemClick('edit'),
                    onKeyDown: (e) => {
                      ('Enter' !== e.key && ' ' !== e.key) ||
                        (e.preventDefault(), handleItemClick('edit'));
                    },
                    children: '상품 수정',
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    role: 'button',
                    tabIndex: 0,
                    className:
                      'flex justify-center items-center h-45 text-16 font-suit font-normal text-gray-950 cursor-pointer',
                    onClick: () => handleItemClick('delete'),
                    onKeyDown: (e) => {
                      ('Enter' !== e.key && ' ' !== e.key) ||
                        (e.preventDefault(), handleItemClick('delete'));
                    },
                    children: '상품 삭제',
                  }),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ItemMenu;
      ItemMenu.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ItemMenu',
        props: {
          onClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: "(action: 'edit' | 'delete') => void",
              signature: {
                arguments: [
                  {
                    type: {
                      name: 'union',
                      raw: "'edit' | 'delete'",
                      elements: [
                        { name: 'literal', value: "'edit'" },
                        { name: 'literal', value: "'delete'" },
                      ],
                    },
                    name: 'action',
                  },
                ],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
  },
]);
