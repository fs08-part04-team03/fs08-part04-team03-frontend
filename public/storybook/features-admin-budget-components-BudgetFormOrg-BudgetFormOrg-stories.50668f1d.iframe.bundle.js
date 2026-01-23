'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8167],
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
    './src/components/atoms/Input/Input.tsx'(
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
      const Input = (0, react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(
        ({ className, type = 'text', placeholder, error = !1, ...props }, ref) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('input', {
            ref,
            type,
            placeholder,
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
              'text-16 tracking--0.4',
              'py-8 bg-transparent',
              'border-b',
              error ? 'border-error-500' : 'border-gray-600',
              'text-gray-950 placeholder:text-gray-500',
              'focus:outline-none',
              error ? 'focus:border-error-500' : 'focus:border-gray-950',
              'disabled:text-gray-300 disabled:border-gray-200 disabled:cursor-not-allowed',
              'w-full',
              className
            ),
            ...props,
          })
      );
      Input.displayName = 'Input';
      const __WEBPACK_DEFAULT_EXPORT__ = Input;
      Input.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Input',
        props: {
          placeholder: { required: !1, tsType: { name: 'string' }, description: '' },
          error: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          type: { defaultValue: { value: "'text'", computed: !1 }, required: !1 },
        },
        composes: ['Omit'],
      };
    },
    './src/features/admin/budget/components/BudgetFormOrg/BudgetFormOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithData: () => WithData,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => BudgetFormOrg_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        Button = __webpack_require__('./src/components/atoms/Button/Button.tsx'),
        Input = __webpack_require__('./src/components/atoms/Input/Input.tsx');
      const formatNumberToKorean = (value) => {
          if (!Number.isFinite(value) || value < 0) return '양의 정수만 입력 가능합니다';
          if (value && Number(value) > Number.MAX_SAFE_INTEGER)
            return '입력 가능한 범위를 초과했습니다';
          const intValue = Math.floor(value);
          if (0 === intValue) return '0원';
          const unitWords = ['', '만', '억', '조', '경'],
            splitCount = unitWords.length,
            resultArray = [];
          let resultString = '';
          for (let i = 0; i < splitCount; i += 1) {
            let unitResult = (intValue % 1e4 ** (i + 1)) / 1e4 ** i;
            ((unitResult = Math.floor(unitResult)),
              unitResult > 0 && (resultArray[i] = unitResult.toString()));
          }
          for (let i = 0; i < resultArray.length; i += 1) {
            const unitValue = resultArray[i];
            if (unitValue) {
              const innerUnits = ['', '십', '백', '천'];
              let innerResult = '';
              const strNum = parseInt(unitValue, 10).toString();
              for (let j = 0; j < strNum.length; j += 1) {
                const digit = strNum[j],
                  revIdx = strNum.length - 1 - j;
                '0' !== digit && (innerResult += `${digit}${innerUnits[revIdx]} `);
              }
              resultString = `${innerResult.trim()}${unitWords[i]} ${resultString}`;
            }
          }
          return `${resultString.trim()} 원`;
        },
        BudgetFormOrg = ({
          initialThisMonthBudget = 0,
          initialMonthlyStartBudget = 0,
          onSubmit,
        }) => {
          const [thisMonthBudget, setThisMonthBudget] = (0, react.useState)(''),
            [monthlyStartBudget, setMonthlyStartBudget] = (0, react.useState)(''),
            [thisMonthError, setThisMonthError] = (0, react.useState)(''),
            [monthlyStartError, setMonthlyStartError] = (0, react.useState)('');
          (0, react.useEffect)(() => {
            (void 0 !== initialThisMonthBudget &&
              setThisMonthBudget(initialThisMonthBudget.toString()),
              void 0 !== initialMonthlyStartBudget &&
                setMonthlyStartBudget(initialMonthlyStartBudget.toString()));
          }, [initialThisMonthBudget, initialMonthlyStartBudget]);
          const handleBudgetChange = (setter, errorSetter) => (e) => {
              const { value } = e.target,
                numericValue = value.replace(/[^0-9]/g, '');
              numericValue && Number(numericValue) > 15e8
                ? errorSetter(`최대 ${(15e8).toLocaleString()}원까지 입력 가능합니다.`)
                : (setter(numericValue),
                  errorSetter(
                    ((value) => {
                      if (!value) return '';
                      const numValue = Number(value);
                      return numValue < 0
                        ? `최소 ${(0).toLocaleString()}원 이상이어야 합니다.`
                        : numValue > 15e8
                          ? `최대 ${(15e8).toLocaleString()}원까지 입력 가능합니다.`
                          : '';
                    })(numericValue)
                  ));
            },
            isChanged =
              Number(thisMonthBudget) !== initialThisMonthBudget ||
              Number(monthlyStartBudget) !== initialMonthlyStartBudget,
            isSubmitDisabled = !(
              !thisMonthError &&
              !monthlyStartError &&
              thisMonthBudget &&
              monthlyStartBudget &&
              isChanged
            );
          return (0, jsx_runtime.jsxs)('div', {
            className: 'w-full max-w-960 bg-white',
            children: [
              (0, jsx_runtime.jsxs)('div', {
                className: ' flex flex-col gap-8 tablet:gap-12 desktop:gap-12 mb-40',
                children: [
                  (0, jsx_runtime.jsx)('h2', {
                    className:
                      ' font-bold text-black leading-normal text-18 tracking--0.45 tablet:tracking--0.6 desktop:tracking--0.6',
                    children: '예산 관리',
                  }),
                  (0, jsx_runtime.jsx)('p', {
                    className:
                      ' font-normal text-gray-500 leading-normal text-14 tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4',
                    children: '이번 달 예산을 정해서 지출을 관리해보세요',
                  }),
                ],
              }),
              (0, jsx_runtime.jsxs)('div', {
                className:
                  ' flex flex-col  gap-64 tablet:gap-64 desktop:gap-80 mb-80 tablet:mb-120 desktop:mb-120 ',
                children: [
                  (0, jsx_runtime.jsxs)('div', {
                    className: 'flex flex-col gap-8',
                    children: [
                      (0, jsx_runtime.jsx)('label', {
                        htmlFor: 'this-month-budget',
                        className:
                          ' font-bold text-gray-950 leading-normal text-14 tablet:text-16 desktop:text-16 tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4',
                        children: '이번 달',
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'relative flex items-center border-b border-gray-950',
                        children: [
                          (0, jsx_runtime.jsx)(Input.A, {
                            id: 'this-month-budget',
                            value: thisMonthBudget ? Number(thisMonthBudget).toLocaleString() : '',
                            onChange: handleBudgetChange(setThisMonthBudget, setThisMonthError),
                            placeholder: '예산을 입력해주세요',
                            className:
                              ' pr-50 border-none focus:border-none p-0 h-auto font-extrabold text-gray-950 !text-30 tablet:!text-40 desktop:!text-40 !tracking--0.75 tablet:!tracking--1 desktop:!tracking--1 placeholder:font-bold placeholder:text-gray-200 placeholder:text-20 tablet:placeholder:text-32 desktop:placeholder:text-32 placeholder:tracking--0.75 tablet:placeholder:tracking--0.8 desktop:placeholder:tracking--0.8',
                          }),
                          (0, jsx_runtime.jsx)('span', {
                            className:
                              ' absolute right-0 text-gray-950 text-30 tablet:text-40 desktop:text-40 font-bold tablet:font-extrabold desktop:font-extrabold tracking--0.75 tablet:tracking--1 desktop:tracking--1',
                            children: '원',
                          }),
                        ],
                      }),
                      (0, jsx_runtime.jsx)('span', {
                        className:
                          ' font-bold text-gray-500 leading-normal text-14 tablet:text-16 desktop:text-16 tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4',
                        children: formatNumberToKorean(Number(thisMonthBudget)),
                      }),
                      thisMonthError &&
                        (0, jsx_runtime.jsx)('span', {
                          className: 'text-12 text-red-500 mt-4',
                          children: thisMonthError,
                        }),
                    ],
                  }),
                  (0, jsx_runtime.jsxs)('div', {
                    className: 'flex flex-col gap-8',
                    children: [
                      (0, jsx_runtime.jsx)('label', {
                        htmlFor: 'monthly-start-budget',
                        className:
                          ' font-bold text-gray-950 leading-normal text-14 tablet:text-16 desktop:text-16 tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4',
                        children: '매달 시작',
                      }),
                      (0, jsx_runtime.jsxs)('div', {
                        className: 'relative flex items-center border-b border-gray-950',
                        children: [
                          (0, jsx_runtime.jsx)(Input.A, {
                            id: 'monthly-start-budget',
                            value: monthlyStartBudget
                              ? Number(monthlyStartBudget).toLocaleString()
                              : '',
                            onChange: handleBudgetChange(
                              setMonthlyStartBudget,
                              setMonthlyStartError
                            ),
                            placeholder: '예산을 입력해주세요',
                            className:
                              ' pr-50 border-none focus:border-none p-0 h-auto font-extrabold text-gray-950 !text-30 tablet:!text-40 desktop:!text-40 !tracking--0.75 tablet:!tracking--1 desktop:!tracking--1 placeholder:font-bold placeholder:text-gray-200 placeholder:text-20 tablet:placeholder:text-32 desktop:placeholder:text-32 placeholder:tracking--0.75 tablet:placeholder:tracking--0.8 desktop:placeholder:tracking--0.8',
                          }),
                          (0, jsx_runtime.jsx)('span', {
                            className:
                              ' absolute right-0 text-gray-950 text-30 tablet:text-40 desktop:text-40 font-bold tablet:font-extrabold desktop:font-extrabold tracking--0.75 tablet:tracking--1 desktop:tracking--1',
                            children: '원',
                          }),
                        ],
                      }),
                      (0, jsx_runtime.jsx)('span', {
                        className:
                          ' font-bold text-gray-500 leading-normal text-14 tablet:text-16 desktop:text-16 tracking--0.35 tablet:tracking--0.4 desktop:tracking--0.4',
                        children: formatNumberToKorean(Number(monthlyStartBudget)),
                      }),
                      monthlyStartError &&
                        (0, jsx_runtime.jsx)('span', {
                          className: 'text-12 text-red-500 mt-4',
                          children: monthlyStartError,
                        }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime.jsxs)('p', {
                className:
                  ' text-12 tablet:text-14 text-gray-400 mb-16 tracking--0.3 tablet:tracking--0.35',
                children: [
                  '입력 가능 범위: ',
                  (0).toLocaleString(),
                  '원 ~ ',
                  (15e8).toLocaleString(),
                  '원',
                ],
              }),
              (0, jsx_runtime.jsx)(Button.A, {
                fullWidth: !0,
                size: 'lg',
                variant: 'primary',
                onClick: () => {
                  onSubmit &&
                    onSubmit({
                      thisMonthBudget: Number(thisMonthBudget),
                      monthlyStartBudget: Number(monthlyStartBudget),
                    });
                },
                inactive: isSubmitDisabled,
                children: '수정하기',
              }),
            ],
          });
        },
        BudgetFormOrg_BudgetFormOrg = BudgetFormOrg;
      BudgetFormOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'BudgetFormOrg',
        props: {
          initialThisMonthBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          initialMonthlyStartBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          onSubmit: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(values: {\n  thisMonthBudget: number;\n  monthlyStartBudget: number;\n}) => void | Promise<void>',
              signature: {
                arguments: [
                  {
                    type: {
                      name: 'signature',
                      type: 'object',
                      raw: '{\n  thisMonthBudget: number;\n  monthlyStartBudget: number;\n}',
                      signature: {
                        properties: [
                          { key: 'thisMonthBudget', value: { name: 'number', required: !0 } },
                          { key: 'monthlyStartBudget', value: { name: 'number', required: !0 } },
                        ],
                      },
                    },
                    name: 'values',
                  },
                ],
                return: {
                  name: 'union',
                  raw: 'void | Promise<void>',
                  elements: [
                    { name: 'void' },
                    { name: 'Promise', elements: [{ name: 'void' }], raw: 'Promise<void>' },
                  ],
                },
              },
            },
            description: '',
          },
        },
      };
      const BudgetFormOrg_stories = {
          title: 'Features/Admin/Budget/BudgetFormOrg',
          component: BudgetFormOrg_BudgetFormOrg,
          argTypes: {
            initialThisMonthBudget: {
              control: { type: 'number' },
              description: '초기 이번 달 예산 설정값입니다.',
            },
            initialMonthlyStartBudget: {
              control: { type: 'number' },
              description: '초기 매달 시작 예산 설정값입니다.',
            },
            onSubmit: {
              description:
                '수정하기 버튼 클릭 시 호출되는 콜백 함수입니다. 입력된 예산 정보를 객체로 전달합니다.',
            },
          },
          args: { onSubmit: () => {} },
          parameters: {
            layout: 'centered',
            docs: {
              description: {
                component:
                  '\n### 개요\n관리자 페이지의 예산 설정 폼 컴포넌트입니다.\n\n### 주요 특징\n*   모바일, 태블릿, 데스크탑 등 모든 환경에서 반응형을 제공합니다.\n*   입력 편의성을 위해 한글 포맷팅 기능을 내장합니다.\n\n### 인터랙션\n*   수정하기 버튼 클릭: `onSubmit` 콜백 함수를 호출합니다.\n        ',
              },
            },
            viewport: { defaultViewport: 'responsive' },
          },
          tags: ['autodocs'],
        },
        Default = {
          render: (args) =>
            (0, jsx_runtime.jsx)(BudgetFormOrg_BudgetFormOrg, {
              initialThisMonthBudget: args.initialThisMonthBudget,
              initialMonthlyStartBudget: args.initialMonthlyStartBudget,
              onSubmit: args.onSubmit,
            }),
        },
        WithData = {
          args: { initialThisMonthBudget: 15e5, initialMonthlyStartBudget: 2e6 },
          render: (args) =>
            (0, jsx_runtime.jsx)(BudgetFormOrg_BudgetFormOrg, {
              initialThisMonthBudget: args.initialThisMonthBudget,
              initialMonthlyStartBudget: args.initialMonthlyStartBudget,
              onSubmit: args.onSubmit,
            }),
        },
        __namedExportsOrder = ['Default', 'WithData'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: args => <BudgetFormOrg initialThisMonthBudget={args.initialThisMonthBudget} initialMonthlyStartBudget={args.initialMonthlyStartBudget} onSubmit={args.onSubmit} />\n}',
            ...Default.parameters?.docs?.source,
          },
          description: {
            story:
              '**기본 상태 (Default)**\n\n- 초기값이 없는 상태입니다.\n- 반응형 뷰포트를 조절하며 각 브레이크포인트에서의 변화를 확인할 수 있습니다.',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (WithData.parameters = {
          ...WithData.parameters,
          docs: {
            ...WithData.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    initialThisMonthBudget: 1500000,\n    initialMonthlyStartBudget: 2000000\n  },\n  render: args => <BudgetFormOrg initialThisMonthBudget={args.initialThisMonthBudget} initialMonthlyStartBudget={args.initialMonthlyStartBudget} onSubmit={args.onSubmit} />\n}',
              ...WithData.parameters?.docs?.source,
            },
            description: {
              story:
                '**데이터가 있는 상태 (With Data)**\n\n- 초기 예산 데이터가 주입된 상태입니다.\n- 천 단위 콤마 포맷팅이 적용되어 표시됩니다.',
              ...WithData.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
