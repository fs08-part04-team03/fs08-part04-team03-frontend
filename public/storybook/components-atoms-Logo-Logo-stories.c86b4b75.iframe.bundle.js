'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9814],
  {
    './src/components/atoms/Logo/Logo.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          CustomSrc: () => CustomSrc,
          Large: () => Large,
          Medium: () => Medium,
          Small: () => Small,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/Logo',
          component: __webpack_require__('./src/components/atoms/Logo/Logo.tsx').A,
          tags: ['autodocs'],
          argTypes: {
            size: { control: 'radio', options: ['sm', 'md', 'lg'] },
            src: { control: 'text' },
            alt: { control: 'text' },
          },
        },
        Small = { args: { size: 'sm' } },
        Medium = { args: { size: 'md' } },
        Large = { args: { size: 'lg' } },
        CustomSrc = { args: { size: 'md', src: '/logo/custom-logo.svg', alt: 'Custom Logo' } },
        __namedExportsOrder = ['Small', 'Medium', 'Large', 'CustomSrc'];
      ((Small.parameters = {
        ...Small.parameters,
        docs: {
          ...Small.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    size: 'sm'\n  }\n}",
            ...Small.parameters?.docs?.source,
          },
        },
      }),
        (Medium.parameters = {
          ...Medium.parameters,
          docs: {
            ...Medium.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    size: 'md'\n  }\n}",
              ...Medium.parameters?.docs?.source,
            },
          },
        }),
        (Large.parameters = {
          ...Large.parameters,
          docs: {
            ...Large.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    size: 'lg'\n  }\n}",
              ...Large.parameters?.docs?.source,
            },
          },
        }),
        (CustomSrc.parameters = {
          ...CustomSrc.parameters,
          docs: {
            ...CustomSrc.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    size: 'md',\n    src: '/logo/custom-logo.svg',\n    alt: 'Custom Logo'\n  }\n}",
              ...CustomSrc.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/atoms/Logo/Logo.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./node_modules/next/link.js'),
        next_link__WEBPACK_IMPORTED_MODULE_2___default = __webpack_require__.n(
          next_link__WEBPACK_IMPORTED_MODULE_2__
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const sizeClass = {
          sm: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-70 h-20'),
          md: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-225 h-100'),
          lg: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)('w-344 h-97'),
        },
        sizeValues = {
          sm: { width: 70, height: 20 },
          md: { width: 225, height: 100 },
          lg: { width: 344, height: 97 },
        },
        Logo = ({ size = 'md', src = '/logo/logo.svg', alt = 'Logo', href, className }) => {
          const { width, height } = sizeValues[size],
            isSvg = src.endsWith('.svg'),
            imageElement = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              next_image__WEBPACK_IMPORTED_MODULE_1__.A,
              {
                src,
                alt,
                width,
                height,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  sizeClass[size],
                  className
                ),
                priority: !0,
                unoptimized: isSvg,
              }
            );
          return href
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                next_link__WEBPACK_IMPORTED_MODULE_2___default(),
                { href, children: imageElement }
              )
            : imageElement;
        },
        __WEBPACK_DEFAULT_EXPORT__ = Logo;
      Logo.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Logo',
        props: {
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
          src: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/logo/logo.svg'", computed: !1 },
          },
          alt: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'Logo'", computed: !1 },
          },
          href: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['Omit'],
      };
    },
  },
]);
