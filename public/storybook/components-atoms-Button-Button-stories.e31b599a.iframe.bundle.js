'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9200],
  {
    './src/components/atoms/Button/Button.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          FullWidth: () => FullWidth,
          Inactive: () => Inactive,
          InactiveSecondary: () => InactiveSecondary,
          Large: () => Large,
          Medium: () => Medium,
          Primary: () => Primary,
          Secondary: () => Secondary,
          Signup: () => Signup,
          SignupButtonExample: () => SignupButtonExample,
          Small: () => Small,
          WithRightIcon: () => WithRightIcon,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/Button',
          component: _Button__WEBPACK_IMPORTED_MODULE_2__.A,
          tags: ['autodocs'],
          argTypes: {
            variant: { control: 'radio', options: ['primary', 'secondary', 'signup'] },
            size: { control: 'radio', options: ['sm', 'md', 'lg'] },
            fullWidth: { control: 'boolean' },
            inactive: { control: 'boolean' },
            rightIcon: { control: !1 },
            onClick: { action: 'clicked' },
          },
        },
        Primary = { args: { children: 'Primary 버튼', variant: 'primary', size: 'md' } },
        Secondary = { args: { children: 'Secondary 버튼', variant: 'secondary', size: 'md' } },
        Signup = { args: { children: 'Signup 버튼', variant: 'signup' } },
        Small = { args: { children: 'Small 버튼', size: 'sm', variant: 'primary' } },
        Medium = { args: { children: 'Medium 버튼', size: 'md', variant: 'primary' } },
        Large = { args: { children: 'Large 버튼', size: 'lg', variant: 'primary' } },
        Inactive = { args: { children: 'Inactive 버튼', inactive: !0, variant: 'primary' } },
        InactiveSecondary = {
          args: { children: 'Inactive Secondary 버튼', variant: 'secondary', inactive: !0 },
        },
        WithRightIcon = {
          args: {
            children: '아이콘 포함',
            rightIcon: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-base',
              children: '★',
            }),
            variant: 'primary',
          },
        },
        FullWidth = { args: { children: 'Full Width 버튼', fullWidth: !0, variant: 'primary' } },
        SignupButtonExample = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _Button__WEBPACK_IMPORTED_MODULE_2__.X,
              {
                rightIcon: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_1__.A,
                  {
                    src: '/icons/arrow-right-up.svg',
                    alt: '',
                    width: 16,
                    height: 16,
                    className: 'shrink-0',
                  }
                ),
                children: 'Signup Now',
              }
            ),
        },
        __namedExportsOrder = [
          'Primary',
          'Secondary',
          'Signup',
          'Small',
          'Medium',
          'Large',
          'Inactive',
          'InactiveSecondary',
          'WithRightIcon',
          'FullWidth',
          'SignupButtonExample',
        ];
      ((Primary.parameters = {
        ...Primary.parameters,
        docs: {
          ...Primary.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    children: 'Primary 버튼',\n    variant: 'primary',\n    size: 'md'\n  }\n}",
            ...Primary.parameters?.docs?.source,
          },
        },
      }),
        (Secondary.parameters = {
          ...Secondary.parameters,
          docs: {
            ...Secondary.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: 'Secondary 버튼',\n    variant: 'secondary',\n    size: 'md'\n  }\n}",
              ...Secondary.parameters?.docs?.source,
            },
          },
        }),
        (Signup.parameters = {
          ...Signup.parameters,
          docs: {
            ...Signup.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: 'Signup 버튼',\n    variant: 'signup'\n  }\n}",
              ...Signup.parameters?.docs?.source,
            },
          },
        }),
        (Small.parameters = {
          ...Small.parameters,
          docs: {
            ...Small.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: 'Small 버튼',\n    size: 'sm',\n    variant: 'primary'\n  }\n}",
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
                "{\n  args: {\n    children: 'Medium 버튼',\n    size: 'md',\n    variant: 'primary'\n  }\n}",
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
                "{\n  args: {\n    children: 'Large 버튼',\n    size: 'lg',\n    variant: 'primary'\n  }\n}",
              ...Large.parameters?.docs?.source,
            },
          },
        }),
        (Inactive.parameters = {
          ...Inactive.parameters,
          docs: {
            ...Inactive.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: 'Inactive 버튼',\n    inactive: true,\n    variant: 'primary'\n  }\n}",
              ...Inactive.parameters?.docs?.source,
            },
          },
        }),
        (InactiveSecondary.parameters = {
          ...InactiveSecondary.parameters,
          docs: {
            ...InactiveSecondary.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: 'Inactive Secondary 버튼',\n    variant: 'secondary',\n    inactive: true\n  }\n}",
              ...InactiveSecondary.parameters?.docs?.source,
            },
          },
        }),
        (WithRightIcon.parameters = {
          ...WithRightIcon.parameters,
          docs: {
            ...WithRightIcon.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: '아이콘 포함',\n    rightIcon: <span className=\"text-base\">★</span>,\n    variant: 'primary'\n  }\n}",
              ...WithRightIcon.parameters?.docs?.source,
            },
          },
        }),
        (FullWidth.parameters = {
          ...FullWidth.parameters,
          docs: {
            ...FullWidth.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    children: 'Full Width 버튼',\n    fullWidth: true,\n    variant: 'primary'\n  }\n}",
              ...FullWidth.parameters?.docs?.source,
            },
          },
        }),
        (SignupButtonExample.parameters = {
          ...SignupButtonExample.parameters,
          docs: {
            ...SignupButtonExample.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: () => <SignupButton rightIcon={<Image src="/icons/arrow-right-up.svg" alt="" width={16} height={16} className="shrink-0" />}>\n      Signup Now\n    </SignupButton>\n}',
              ...SignupButtonExample.parameters?.docs?.source,
            },
          },
        }));
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
  },
]);
