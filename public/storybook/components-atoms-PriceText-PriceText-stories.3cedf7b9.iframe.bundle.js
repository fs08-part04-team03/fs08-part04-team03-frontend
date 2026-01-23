'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1758],
  {
    './src/components/atoms/PriceText/PriceText.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          LargePrice: () => LargePrice,
          MediumPrice: () => MediumPrice,
          SmallPrice: () => SmallPrice,
          VeryLargePrice: () => VeryLargePrice,
          WithCustomClassName: () => WithCustomClassName,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/PriceText',
          component: __webpack_require__('./src/components/atoms/PriceText/PriceText.tsx').A,
          tags: ['autodocs'],
          argTypes: {
            value: { control: 'number', description: '가격 값 (숫자)' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = { args: { value: 1e4 } },
        SmallPrice = { args: { value: 1e3 } },
        MediumPrice = { args: { value: 5e4 } },
        LargePrice = { args: { value: 1e6 } },
        VeryLargePrice = { args: { value: 1e7 } },
        WithCustomClassName = { args: { value: 5e4, className: 'text-24' } },
        __namedExportsOrder = [
          'Default',
          'SmallPrice',
          'MediumPrice',
          'LargePrice',
          'VeryLargePrice',
          'WithCustomClassName',
        ];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    value: 10000\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (SmallPrice.parameters = {
          ...SmallPrice.parameters,
          docs: {
            ...SmallPrice.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    value: 1000\n  }\n}',
              ...SmallPrice.parameters?.docs?.source,
            },
          },
        }),
        (MediumPrice.parameters = {
          ...MediumPrice.parameters,
          docs: {
            ...MediumPrice.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    value: 50000\n  }\n}',
              ...MediumPrice.parameters?.docs?.source,
            },
          },
        }),
        (LargePrice.parameters = {
          ...LargePrice.parameters,
          docs: {
            ...LargePrice.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    value: 1000000\n  }\n}',
              ...LargePrice.parameters?.docs?.source,
            },
          },
        }),
        (VeryLargePrice.parameters = {
          ...VeryLargePrice.parameters,
          docs: {
            ...VeryLargePrice.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    value: 10000000\n  }\n}',
              ...VeryLargePrice.parameters?.docs?.source,
            },
          },
        }),
        (WithCustomClassName.parameters = {
          ...WithCustomClassName.parameters,
          docs: {
            ...WithCustomClassName.parameters?.docs,
            source: {
              originalSource: "{\n  args: {\n    value: 50000,\n    className: 'text-24'\n  }\n}",
              ...WithCustomClassName.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/atoms/PriceText/PriceText.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './node_modules/next/dist/compiled/react/jsx-runtime.js'
      );
      const PriceText = ({ value, showUnit = !0, className }) => {
          const formattedValue = (Number.isFinite(value) && value >= 0 ? value : 0).toLocaleString(
              'ko-KR'
            ),
            displayText = showUnit ? `${formattedValue}원` : formattedValue;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className,
            children: displayText,
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PriceText;
      PriceText.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PriceText',
        props: {
          value: { required: !0, tsType: { name: 'number' }, description: '' },
          showUnit: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'true', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
  },
]);
