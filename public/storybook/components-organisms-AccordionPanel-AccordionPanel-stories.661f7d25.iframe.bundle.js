'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4213],
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
    './src/components/organisms/AccordionPanel/AccordionPanel.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          MultipleAccordion: () => MultipleAccordion,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _AccordionPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/organisms/AccordionPanel/AccordionPanel.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Organisms/AccordionPanel',
          component: _AccordionPanel__WEBPACK_IMPORTED_MODULE_1__.A,
          tags: ['autodocs'],
          args: { label: '기본 아코디언 텍스트', content: '아코디언 내용이 여기에 표시됩니다.' },
        },
        Default = { args: { label: '기본 아코디언', content: '기본 아코디언 내용입니다.' } },
        MultipleAccordion = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex flex-col gap-2',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _AccordionPanel__WEBPACK_IMPORTED_MODULE_1__.A,
                  { label: '아코디언 1', content: '첫 번째 아코디언의 내용입니다.' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _AccordionPanel__WEBPACK_IMPORTED_MODULE_1__.A,
                  { label: '아코디언 2', content: '두 번째 아코디언의 내용입니다.' }
                ),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _AccordionPanel__WEBPACK_IMPORTED_MODULE_1__.A,
                  {
                    label: '아코디언 3',
                    content: '세 번째 아코디언의 내용입니다.',
                    subContent: '아래의 추가 내용입니다.',
                  }
                ),
              ],
            }),
        },
        __namedExportsOrder = ['Default', 'MultipleAccordion'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    label: '기본 아코디언',\n    content: '기본 아코디언 내용입니다.'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (MultipleAccordion.parameters = {
          ...MultipleAccordion.parameters,
          docs: {
            ...MultipleAccordion.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <div className="flex flex-col gap-2">\n      <AccordionPanel label="아코디언 1" content="첫 번째 아코디언의 내용입니다." />\n      <AccordionPanel label="아코디언 2" content="두 번째 아코디언의 내용입니다." />\n      <AccordionPanel label="아코디언 3" content="세 번째 아코디언의 내용입니다." subContent="아래의 추가 내용입니다." />\n    </div>\n}',
              ...MultipleAccordion.parameters?.docs?.source,
            },
            description: {
              story: '여러 개의 AccordionPanel을 렌더링하는 스토리',
              ...MultipleAccordion.parameters?.docs?.description,
            },
          },
        }));
    },
    './src/components/organisms/AccordionPanel/AccordionPanel.tsx'(
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
        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        ),
        _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './src/components/atoms/Divider/Divider.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const AccordionPanel = ({ label, content, subContent, className }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            contentId = (0, react__WEBPACK_IMPORTED_MODULE_1__.useId)();
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_5__.A)(
              '\n        w-328\n        tablet:w-496\n        desktop:w-610\n      ',
              className
            ),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: ' w-full py-30 tablet:py-40 desktop:py-40 ',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                    className: 'flex items-center h-20',
                    children: [
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className:
                          ' text-gray-950  font-suit  text-16 font-700 tracking--0.4 tablet:text-18 tablet:tracking--0.45 desktop:text-18 desktop:tracking--0.45 mb-6 ',
                        children: label,
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                        className: 'flex-1',
                      }),
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_IconButton_IconButton__WEBPACK_IMPORTED_MODULE_3__.K,
                        {
                          variant: 'default',
                          size: 'md',
                          onClick: () => setOpen((prev) => !prev),
                          'aria-expanded': open,
                          'aria-controls': contentId,
                          'aria-label': `${label} ${open ? '접기' : '펼치기'}`,
                          className: 'cursor-pointer',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                            {
                              src: open ? '/icons/minus.svg' : '/icons/plus.svg',
                              alt: '',
                              'aria-hidden': !0,
                              width: 20,
                              height: 20,
                            }
                          ),
                        }
                      ),
                    ],
                  }),
                  open &&
                    (content || subContent) &&
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      id: contentId,
                      role: 'region',
                      'aria-labelledby': contentId,
                      className:
                        ' mt-6 tablet:flex tablet:flex-row tablet:items-center tablet:gap-6 desktop:flex desktop:flex-row desktop:items-center desktop:gap-6 ',
                      children: [
                        content &&
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className:
                              ' text-gray-600 font-suit text-14 font-400 tracking--0.35 tablet:text-16 tablet:tracking--0.4 desktop:text-16 desktop:tracking--0.4 ',
                            children: content,
                          }),
                        subContent &&
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className:
                              ' text-gray-400 font-suit text-14 font-400 tracking--0.35 tablet:text-16 tablet:tracking--0.4 desktop:text-16 desktop:tracking--0.4 mt-6 tablet:mt-0 desktop:mt-0 ',
                            children: subContent,
                          }),
                      ],
                    }),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_4__.c,
                {}
              ),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = AccordionPanel;
      AccordionPanel.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'AccordionPanel',
        props: {
          label: { required: !0, tsType: { name: 'string' }, description: '' },
          content: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'string | React.ReactNode',
              elements: [{ name: 'string' }, { name: 'ReactReactNode', raw: 'React.ReactNode' }],
            },
            description: '',
          },
          subContent: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'string | React.ReactNode',
              elements: [{ name: 'string' }, { name: 'ReactReactNode', raw: 'React.ReactNode' }],
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
  },
]);
