'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [6478],
  {
    './node_modules/clsx/dist/clsx.mjs'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      function r(e) {
        var t,
          f,
          n = '';
        if ('string' == typeof e || 'number' == typeof e) n += e;
        else if ('object' == typeof e)
          if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += ' '), (n += f));
          } else for (f in e) e[f] && (n && (n += ' '), (n += f));
        return n;
      }
      function clsx() {
        for (var e, t, f = 0, n = '', o = arguments.length; f < o; f++)
          (e = arguments[f]) && (t = r(e)) && (n && (n += ' '), (n += t));
        return n;
      }
      __webpack_require__.d(__webpack_exports__, {
        $: () => clsx,
        A: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      const __WEBPACK_DEFAULT_EXPORT__ = clsx;
    },
    './src/components/atoms/StatusTag/StatusTag.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          AllVariants: () => AllVariants,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _StatusTag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/atoms/StatusTag/StatusTag.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/StatusTag',
          component: _StatusTag__WEBPACK_IMPORTED_MODULE_1__.A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '상태를 표시하는 태그 컴포넌트입니다. 4가지 variant를 지원하며, 각 variant는 자동으로 해당하는 아이콘(15px)을 표시합니다.\n\n- `approved`: 승인 상태 (파란색 배경 `bg-blue-100`, 파란색 텍스트 `text-blue-200`, check-circle 아이콘)\n- `rejected`: 거절 상태 (빨간색 배경 `bg-red-100`, 빨간색 텍스트 `text-red`, close-circle 아이콘)\n- `cancelled`: 취소 상태 (검은색 배경 `bg-black-100`, 회색 텍스트 `text-gray-50`, close-circle 아이콘 white)\n- `pending`: 대기 상태 (회색 배경 `bg-gray-100`, 진한 회색 텍스트 `text-gray-950`, time 아이콘, 기본값)',
              },
            },
          },
          argTypes: {
            variant: {
              control: 'select',
              options: ['approved', 'rejected', 'cancelled', 'pending'],
              description: '상태 태그 variant',
              table: {
                type: { summary: "'approved' | 'rejected' | 'cancelled' | 'pending'" },
                defaultValue: { summary: 'pending' },
              },
            },
            children: { control: 'text', description: '태그에 표시할 텍스트' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        AllVariants = {
          render: () =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'flex flex-col gap-24',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-16',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 text-gray-700 w-80 font-medium',
                      children: '승인 (approved):',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _StatusTag__WEBPACK_IMPORTED_MODULE_1__.A,
                      { variant: 'approved', children: '승인' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-12 text-gray-500 ml-8',
                      children: 'bg-blue-100, text-blue-200, check-circle.svg',
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-16',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 text-gray-700 w-80 font-medium',
                      children: '거절 (rejected):',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _StatusTag__WEBPACK_IMPORTED_MODULE_1__.A,
                      { variant: 'rejected', children: '거절' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-12 text-gray-500 ml-8',
                      children: 'bg-red-100, text-red, close-circle.svg',
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-16',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 text-gray-700 w-80 font-medium',
                      children: '취소 (cancelled):',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _StatusTag__WEBPACK_IMPORTED_MODULE_1__.A,
                      { variant: 'cancelled', children: '취소' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-12 text-gray-500 ml-8',
                      children: 'bg-black-100, text-gray-50, close-circle.svg (white)',
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'flex items-center gap-16',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 text-gray-700 w-80 font-medium',
                      children: '대기 (pending):',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _StatusTag__WEBPACK_IMPORTED_MODULE_1__.A,
                      { variant: 'pending', children: '대기' }
                    ),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-12 text-gray-500 ml-8',
                      children: 'bg-gray-100, text-gray-950, time.svg',
                    }),
                  ],
                }),
              ],
            }),
          parameters: {
            docs: {
              description: {
                story:
                  '모든 variant를 한 번에 확인할 수 있습니다. 각 variant는 자동으로 해당하는 아이콘(15px × 15px)을 텍스트 앞에 표시합니다.',
              },
            },
          },
        },
        __namedExportsOrder = ['AllVariants'];
      AllVariants.parameters = {
        ...AllVariants.parameters,
        docs: {
          ...AllVariants.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: () => <div className="flex flex-col gap-24">\n      <div className="flex items-center gap-16">\n        <span className="text-14 text-gray-700 w-80 font-medium">승인 (approved):</span>\n        <StatusTag variant="approved">승인</StatusTag>\n        <span className="text-12 text-gray-500 ml-8">\n          bg-blue-100, text-blue-200, check-circle.svg\n        </span>\n      </div>\n      <div className="flex items-center gap-16">\n        <span className="text-14 text-gray-700 w-80 font-medium">거절 (rejected):</span>\n        <StatusTag variant="rejected">거절</StatusTag>\n        <span className="text-12 text-gray-500 ml-8">bg-red-100, text-red, close-circle.svg</span>\n      </div>\n      <div className="flex items-center gap-16">\n        <span className="text-14 text-gray-700 w-80 font-medium">취소 (cancelled):</span>\n        <StatusTag variant="cancelled">취소</StatusTag>\n        <span className="text-12 text-gray-500 ml-8">\n          bg-black-100, text-gray-50, close-circle.svg (white)\n        </span>\n      </div>\n      <div className="flex items-center gap-16">\n        <span className="text-14 text-gray-700 w-80 font-medium">대기 (pending):</span>\n        <StatusTag variant="pending">대기</StatusTag>\n        <span className="text-12 text-gray-500 ml-8">bg-gray-100, text-gray-950, time.svg</span>\n      </div>\n    </div>,\n  parameters: {\n    docs: {\n      description: {\n        story: \'모든 variant를 한 번에 확인할 수 있습니다. 각 variant는 자동으로 해당하는 아이콘(15px × 15px)을 텍스트 앞에 표시합니다.\'\n      }\n    }\n  }\n}',
            ...AllVariants.parameters?.docs?.source,
          },
        },
      };
    },
    './src/components/atoms/StatusTag/StatusTag.tsx'(
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
      const variantStyles = {
          approved: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-blue-100', 'text-blue-200'),
          rejected: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-red-100', 'text-red'),
          cancelled: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
            'bg-black-100',
            'text-gray-50'
          ),
          pending: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-gray-100', 'text-gray-950'),
          urgent: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)('bg-[#F2F6FF]', 'text-[#4C8AE1]'),
        },
        CheckCircleIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
              d: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.0254 13.7617L7.92676 10.5732L6.85156 11.6182L11.0107 15.8984L17.4023 9.50684L16.3418 8.44629L11.0254 13.7617Z',
              fill: 'currentColor',
            }),
          }),
        CloseCircleIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              d: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.999 10.9395L8.28711 7.22656L7.22559 8.28809L10.9385 12L7.22559 15.7119L8.28711 16.7734L11.999 13.0605L15.7109 16.7734L16.7715 15.7119L13.0596 12L16.7715 8.28809L15.7109 7.22656L11.999 10.9395Z',
              fill: 'currentColor',
            }),
          }),
        TimeIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                d: 'M20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5V22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22V20.5C16.6944 20.5 20.5 16.6944 20.5 12Z',
                fill: 'currentColor',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                d: 'M11.25 6.90527H12.75V11.25H16.3281V12.75H11.25V6.90527Z',
                fill: 'currentColor',
              }),
            ],
          }),
        CloseCircleWhiteIcon = () =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('svg', {
            width: '15',
            height: '15',
            viewBox: '0 0 24 24',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              d: 'M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM11.999 10.9395L8.28711 7.22656L7.22559 8.28809L10.9385 12L7.22559 15.7119L8.28711 16.7734L11.999 13.0605L15.7109 16.7734L16.7715 15.7119L13.0596 12L16.7715 8.28809L15.7109 7.22656L11.999 10.9395Z',
              fill: 'white',
            }),
          }),
        variantIcons = {
          approved: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CheckCircleIcon, {}),
          rejected: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseCircleIcon, {}),
          cancelled: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            CloseCircleWhiteIcon,
            {}
          ),
          pending: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TimeIcon, {}),
          urgent: null,
        },
        variantLabels = {
          approved: '승인',
          rejected: '거절',
          cancelled: '취소',
          pending: '대기중',
          urgent: '즉시 요청',
        },
        StatusTag = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
          ({ variant = 'pending', className, children, ...props }, ref) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
              ref,
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'flex',
                'w-72 h-30',
                'px-8 py-6',
                'justify-center items-center',
                'gap-4',
                'rounded-100',
                'text-13 font-bold leading-normal tracking--0.3px',
                variantStyles[variant],
                className
              ),
              style: { fontFamily: 'SUIT, var(--font-family-base), sans-serif' },
              ...props,
              children: [
                variantIcons[variant] &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: 'shrink-0',
                    children: variantIcons[variant],
                  }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                  children: children || variantLabels[variant],
                }),
              ],
            })
        );
      StatusTag.displayName = 'StatusTag';
      const __WEBPACK_DEFAULT_EXPORT__ = StatusTag;
      StatusTag.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'StatusTag',
        props: {
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'approved' | 'rejected' | 'cancelled' | 'pending' | 'urgent'",
              elements: [
                { name: 'literal', value: "'approved'" },
                { name: 'literal', value: "'rejected'" },
                { name: 'literal', value: "'cancelled'" },
                { name: 'literal', value: "'pending'" },
                { name: 'literal', value: "'urgent'" },
              ],
            },
            description: '',
            defaultValue: { value: "'pending'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
        composes: ['HTMLAttributes'],
      };
    },
  },
]);
