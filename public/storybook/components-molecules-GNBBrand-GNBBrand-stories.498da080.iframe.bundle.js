'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6897],
  {
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
    './src/components/molecules/GNBBrand/GNBBrand.stories.tsx'(
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
          title: 'Molecules/GNBBrand',
          component: __webpack_require__('./src/components/molecules/GNBBrand/GNBBrand.tsx').A,
          tags: ['autodocs'],
          parameters: {
            docs: {
              description: {
                component:
                  'GNB(Global Navigation Bar)의 브랜드 영역을 담당하는 컴포넌트입니다.\n- 로고를 렌더링하고, 클릭 시 홈(루트 경로)로 이동합니다.\n- 상단 GNB의 좌측 영역에 배치됩니다.',
              },
            },
          },
        },
        Default = {
          parameters: {
            docs: {
              description: {
                story:
                  '가장 기본 형태의 브랜드 컴포넌트입니다. 기본 로고만 표시하며, 클릭하면 홈으로 이동합니다.',
              },
            },
          },
        },
        __namedExportsOrder = ['Default'];
      Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  parameters: {\n    docs: {\n      description: {\n        story: '가장 기본 형태의 브랜드 컴포넌트입니다. 기본 로고만 표시하며, 클릭하면 홈으로 이동합니다.'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      };
    },
    './src/components/molecules/GNBBrand/GNBBrand.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
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
        _components_atoms_Logo_Logo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Logo/Logo.tsx'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__('./src/constants/index.ts');
      const GNBBrand = () => {
          const params = (0, next_navigation__WEBPACK_IMPORTED_MODULE_2__.useParams)(),
            companyId = params?.companyId,
            href = companyId
              ? _constants__WEBPACK_IMPORTED_MODULE_4__.vp.HOME(companyId)
              : _constants__WEBPACK_IMPORTED_MODULE_4__.vp.ROOT;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            next_link__WEBPACK_IMPORTED_MODULE_1___default(),
            {
              href,
              className: 'flex items-center',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Logo_Logo__WEBPACK_IMPORTED_MODULE_3__.A,
                { size: 'sm' }
              ),
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = GNBBrand;
      GNBBrand.__docgenInfo = { description: '', methods: [], displayName: 'GNBBrand' };
    },
  },
]);
