'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [4615],
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
    './src/components/molecules/StepBreadcrumb/StepBreadcrumb.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          FourSteps: () => FourSteps,
          Step1: () => Step1,
          Step2: () => Step2,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/StepBreadcrumb',
          component: __webpack_require__(
            './src/components/molecules/StepBreadcrumb/StepBreadcrumb.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: { layout: 'centered' },
          argTypes: {
            steps: { control: 'object', description: '단계 배열' },
            currentStep: { control: 'number', description: '현재 단계 (1-based index)' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        checkoutSteps = [{ label: 'Shopping Cart' }, { label: 'Order Confirmed' }],
        Step1 = { args: { steps: checkoutSteps, currentStep: 1 } },
        Step2 = { args: { steps: checkoutSteps, currentStep: 2 } },
        FourSteps = {
          args: {
            steps: [
              { label: '정보 입력' },
              { label: '검토' },
              { label: '결제' },
              { label: '완료' },
            ],
            currentStep: 2,
          },
        },
        __namedExportsOrder = ['Step1', 'Step2', 'FourSteps'];
      ((Step1.parameters = {
        ...Step1.parameters,
        docs: {
          ...Step1.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    steps: checkoutSteps,\n    currentStep: 1\n  }\n}',
            ...Step1.parameters?.docs?.source,
          },
        },
      }),
        (Step2.parameters = {
          ...Step2.parameters,
          docs: {
            ...Step2.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    steps: checkoutSteps,\n    currentStep: 2\n  }\n}',
              ...Step2.parameters?.docs?.source,
            },
          },
        }),
        (FourSteps.parameters = {
          ...FourSteps.parameters,
          docs: {
            ...FourSteps.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    steps: [{\n      label: '정보 입력'\n    }, {\n      label: '검토'\n    }, {\n      label: '결제'\n    }, {\n      label: '완료'\n    }],\n    currentStep: 2\n  }\n}",
              ...FourSteps.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/StepBreadcrumb/StepBreadcrumb.tsx'(
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
      const StepBreadcrumb = ({ steps, currentStep, className }) => {
          if (!steps || 0 === steps.length) return null;
          const safeCurrent = Math.min(Math.max(currentStep, 1), steps.length);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('nav', {
            'aria-label': 'Checkout steps',
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
              'flex flex-col gap-4',
              'tablet:flex-row tablet:items-center tablet:gap-20',
              className
            ),
            children: steps.map((step, index) => {
              const stepNumber = index + 1,
                isActive = stepNumber === safeCurrent;
              return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                react__WEBPACK_IMPORTED_MODULE_1__.Fragment,
                {
                  children: [
                    index > 0 &&
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                        className: 'hidden tablet:inline text-gray-300',
                        children: '>',
                      }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                        'flex justify-center items-center gap-4',
                        'text-16 leading-24 tracking--0.4',
                        'tablet:text-18 tablet:leading-26 tablet:tracking--0.45',
                        isActive ? 'text-gray-950 font-bold' : 'text-gray-300'
                      ),
                      'aria-current': isActive ? 'step' : void 0,
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                          className: 'tabular-nums pr-4 tablet:pr-6',
                          children: [stepNumber, '.'],
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          children: step.label,
                        }),
                      ],
                    }),
                  ],
                },
                index
              );
            }),
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = StepBreadcrumb;
      StepBreadcrumb.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'StepBreadcrumb',
        props: {
          steps: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'StepBreadcrumbStep' }],
              raw: 'StepBreadcrumbStep[]',
            },
            description: '',
          },
          currentStep: { required: !0, tsType: { name: 'number' }, description: '1-based index' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
  },
]);
