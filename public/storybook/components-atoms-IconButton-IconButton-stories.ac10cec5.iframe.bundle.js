'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6094],
  {
    './src/components/atoms/IconButton/IconButton.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Disabled: () => Disabled,
          Filled: () => Filled,
          Ghost: () => Ghost,
          Large: () => Large,
          Medium: () => Medium,
          Outline: () => Outline,
          Small: () => Small,
          WithHamburgerIcon: () => WithHamburgerIcon,
          WithHeartIcon: () => WithHeartIcon,
          WithSearchIcon: () => WithSearchIcon,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _IconButton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/IconButton/IconButton.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/IconButton',
          component: _IconButton__WEBPACK_IMPORTED_MODULE_3__.K,
          tags: ['autodocs'],
          argTypes: {
            variant: { control: 'radio', options: ['default', 'filled', 'outline'] },
            size: { control: 'radio', options: ['sm', 'md', 'lg'] },
            disabled: { control: 'boolean' },
            onClick: { action: 'clicked' },
          },
        },
        Ghost = {
          args: {
            variant: 'default',
            size: 'md',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/close-circle.svg', alt: 'Close', width: 24, height: 24 }
            ),
            'aria-label': 'Close',
          },
        },
        Filled = {
          args: {
            variant: 'filled',
            size: 'md',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/close-white.svg', alt: 'Close', width: 24, height: 24 }
            ),
            'aria-label': 'Close',
          },
        },
        Outline = {
          args: {
            variant: 'outline',
            size: 'md',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/close-circle.svg', alt: 'Close', width: 24, height: 24 }
            ),
            'aria-label': 'Close',
          },
        },
        Small = {
          args: {
            variant: 'default',
            size: 'sm',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/arrow-up.svg', alt: 'Arrow up', width: 14, height: 8 }
            ),
            'aria-label': 'Arrow up',
          },
        },
        Medium = {
          args: {
            variant: 'default',
            size: 'md',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/arrow-up.svg', alt: 'Arrow up', width: 14, height: 8 }
            ),
            'aria-label': 'Arrow up',
          },
        },
        Large = {
          args: {
            variant: 'default',
            size: 'lg',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/arrow-up.svg', alt: 'Arrow up', width: 14, height: 8 }
            ),
            'aria-label': 'Arrow up',
          },
        },
        Disabled = {
          args: {
            variant: 'default',
            size: 'md',
            disabled: !0,
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/close-circle.svg', alt: 'Close', width: 24, height: 24 }
            ),
            'aria-label': 'Close',
          },
        },
        WithHeartIcon = {
          render: (args) => {
            const [isLiked, setIsLiked] = react__WEBPACK_IMPORTED_MODULE_1__.useState(!1);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _IconButton__WEBPACK_IMPORTED_MODULE_3__.K,
              {
                ...args,
                variant: 'default',
                onClick: () => setIsLiked(!isLiked),
                'aria-label': isLiked ? 'Unlike' : 'Like',
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    src: isLiked ? '/icons/heart.svg' : '/icons/heart-outline.svg',
                    alt: isLiked ? 'Liked' : 'Like',
                    width: 24,
                    height: 24,
                  }
                ),
              }
            );
          },
          args: {
            size: 'md',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/heart-outline.svg', alt: 'Like', width: 24, height: 24 }
            ),
          },
        },
        WithSearchIcon = {
          args: {
            variant: 'default',
            size: 'md',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/search-icon.svg', alt: 'Search', width: 24, height: 24 }
            ),
            'aria-label': 'Search',
          },
        },
        WithHamburgerIcon = {
          args: {
            variant: 'default',
            size: 'md',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
              { src: '/icons/hamburger.svg', alt: 'Menu', width: 24, height: 24 }
            ),
            'aria-label': 'Menu',
          },
        },
        __namedExportsOrder = [
          'Ghost',
          'Filled',
          'Outline',
          'Small',
          'Medium',
          'Large',
          'Disabled',
          'WithHeartIcon',
          'WithSearchIcon',
          'WithHamburgerIcon',
        ];
      ((Ghost.parameters = {
        ...Ghost.parameters,
        docs: {
          ...Ghost.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    variant: 'default',\n    size: 'md',\n    children: <Image src=\"/icons/close-circle.svg\" alt=\"Close\" width={24} height={24} />,\n    'aria-label': 'Close'\n  }\n}",
            ...Ghost.parameters?.docs?.source,
          },
        },
      }),
        (Filled.parameters = {
          ...Filled.parameters,
          docs: {
            ...Filled.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'filled',\n    size: 'md',\n    children: <Image src=\"/icons/close-white.svg\" alt=\"Close\" width={24} height={24} />,\n    'aria-label': 'Close'\n  }\n}",
              ...Filled.parameters?.docs?.source,
            },
          },
        }),
        (Outline.parameters = {
          ...Outline.parameters,
          docs: {
            ...Outline.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'outline',\n    size: 'md',\n    children: <Image src=\"/icons/close-circle.svg\" alt=\"Close\" width={24} height={24} />,\n    'aria-label': 'Close'\n  }\n}",
              ...Outline.parameters?.docs?.source,
            },
          },
        }),
        (Small.parameters = {
          ...Small.parameters,
          docs: {
            ...Small.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'default',\n    size: 'sm',\n    children: <Image src=\"/icons/arrow-up.svg\" alt=\"Arrow up\" width={14} height={8} />,\n    'aria-label': 'Arrow up'\n  }\n}",
              ...Small.parameters?.docs?.source,
            },
          },
        }),
        (Medium.parameters = {
          ...Medium.parameters,
          docs: {
            ...Medium.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'default',\n    size: 'md',\n    children: <Image src=\"/icons/arrow-up.svg\" alt=\"Arrow up\" width={14} height={8} />,\n    'aria-label': 'Arrow up'\n  }\n}",
              ...Medium.parameters?.docs?.source,
            },
          },
        }),
        (Large.parameters = {
          ...Large.parameters,
          docs: {
            ...Large.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'default',\n    size: 'lg',\n    children: <Image src=\"/icons/arrow-up.svg\" alt=\"Arrow up\" width={14} height={8} />,\n    'aria-label': 'Arrow up'\n  }\n}",
              ...Large.parameters?.docs?.source,
            },
          },
        }),
        (Disabled.parameters = {
          ...Disabled.parameters,
          docs: {
            ...Disabled.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'default',\n    size: 'md',\n    disabled: true,\n    children: <Image src=\"/icons/close-circle.svg\" alt=\"Close\" width={24} height={24} />,\n    'aria-label': 'Close'\n  }\n}",
              ...Disabled.parameters?.docs?.source,
            },
          },
        }),
        (WithHeartIcon.parameters = {
          ...WithHeartIcon.parameters,
          docs: {
            ...WithHeartIcon.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => {\n    const [isLiked, setIsLiked] = React.useState(false);\n    return <IconButton\n    // eslint-disable-next-line react/jsx-props-no-spreading\n    {...args} variant=\"default\" onClick={() => setIsLiked(!isLiked)} aria-label={isLiked ? 'Unlike' : 'Like'}>\n        <Image src={isLiked ? '/icons/heart.svg' : '/icons/heart-outline.svg'} alt={isLiked ? 'Liked' : 'Like'} width={24} height={24} />\n      </IconButton>;\n  },\n  args: {\n    size: 'md',\n    children: <Image src=\"/icons/heart-outline.svg\" alt=\"Like\" width={24} height={24} />\n  }\n}",
              ...WithHeartIcon.parameters?.docs?.source,
            },
          },
        }),
        (WithSearchIcon.parameters = {
          ...WithSearchIcon.parameters,
          docs: {
            ...WithSearchIcon.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'default',\n    size: 'md',\n    children: <Image src=\"/icons/search-icon.svg\" alt=\"Search\" width={24} height={24} />,\n    'aria-label': 'Search'\n  }\n}",
              ...WithSearchIcon.parameters?.docs?.source,
            },
          },
        }),
        (WithHamburgerIcon.parameters = {
          ...WithHamburgerIcon.parameters,
          docs: {
            ...WithHamburgerIcon.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    variant: 'default',\n    size: 'md',\n    children: <Image src=\"/icons/hamburger.svg\" alt=\"Menu\" width={24} height={24} />,\n    'aria-label': 'Menu'\n  }\n}",
              ...WithHamburgerIcon.parameters?.docs?.source,
            },
          },
        }));
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
  },
]);
