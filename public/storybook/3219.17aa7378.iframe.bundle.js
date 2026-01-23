'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3219],
  {
    './src/components/atoms/ProgressBar/ProgressBar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const ProgressBar = ({ value, currentBudget, lastBudget, className }) => {
          const safeCurrentBudget = Number.isFinite(currentBudget) ? currentBudget : 0,
            safeLastBudget = Number.isFinite(lastBudget) ? lastBudget : 0,
            clampedValue = Math.max(0, Math.min(100, value)),
            diff = safeCurrentBudget - safeLastBudget;
          let diffText = '';
          diffText =
            diff > 0 ? ' 덜 사용했어요' : diff < 0 ? ' 더 사용했어요' : ' 동일하게 사용했어요';
          const formattedPercentage = `${Math.round(clampedValue)}%`,
            containerWidthClass = className || 'w-345 desktop:w-345 tablet:w-179 mobile:w-116',
            trackWidthClass = className
              ? 'w-full'
              : 'w-304 desktop:w-304 tablet:w-179 mobile:w-116',
            wrapperWidthClass = className || 'w-fit';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              'relative group',
              wrapperWidthClass
            ),
            tabIndex: 0,
            role: 'button',
            onKeyDown: (e) => {
              ('Enter' !== e.key && ' ' !== e.key) || e.preventDefault();
            },
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'flex items-center gap-5 desktop:gap-10 tablet:gap-8 h-17 tablet:h-17 mobile:h-15',
                  containerWidthClass
                ),
                role: 'progressbar',
                'aria-valuenow': clampedValue,
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-label': '진행률',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'relative h-6 rounded-6 bg-gray-200 overflow-hidden',
                      trackWidthClass
                    ),
                    children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                        'h-full bg-secondary-500 rounded-6 transition-all duration-500'
                      ),
                      style: { width: `${clampedValue}%` },
                    }),
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                      'text-gray-950 leading-none',
                      'desktop:text-14 tablet:text-14 mobile:text-12',
                      'desktop:font-normal tablet:font-normal mobile:font-normal',
                      'desktop:tracking--0.35 tablet:tracking--0.35 mobile:tracking--0.3'
                    ),
                    children: formattedPercentage,
                  }),
                ],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
                  'absolute left-0 mt-8',
                  'hidden group-hover:flex group-focus-within:flex',
                  'flex-col justify-center items-start text-center gap-8',
                  'w-260 h-130 p-24 rounded-4 bg-gray-950',
                  'text-white',
                  'z-tooltip'
                ),
                role: 'tooltip',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                    className: 'text-14 font-extrabold tracking-tight',
                    children: ['이번 달 남은 예산: ', safeCurrentBudget.toLocaleString(), '원'],
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                    className: 'text-12 font-normal tracking--0.35',
                    children: ['지난 달 남은 예산: ', safeLastBudget.toLocaleString(), '원'],
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('p', {
                    className: 'text-12 font-normal tracking--0.35',
                    children: ['지난 달 보다 ', Math.abs(diff).toLocaleString(), '원', diffText],
                  }),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = ProgressBar;
      ProgressBar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProgressBar',
        props: {
          value: { required: !0, tsType: { name: 'number' }, description: '' },
          currentBudget: { required: !0, tsType: { name: 'number' }, description: '' },
          lastBudget: { required: !0, tsType: { name: 'number' }, description: '' },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/dashboard/components/DashboardCardOrg/DashboardCardOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _utils_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./src/utils/array.ts'),
        _components_atoms_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__('./src/components/atoms/ProgressBar/ProgressBar.tsx'),
        next_dynamic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/next/dynamic.js'
        ),
        next_dynamic__WEBPACK_IMPORTED_MODULE_4___default = __webpack_require__.n(
          next_dynamic__WEBPACK_IMPORTED_MODULE_4__
        ),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__('./node_modules/recharts/es6/component/Tooltip.js'),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__('./node_modules/recharts/es6/component/Cell.js'),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__('./node_modules/recharts/es6/polar/Pie.js'),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_8__ =
          __webpack_require__('./node_modules/recharts/es6/cartesian/Bar.js'),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_9__ =
          __webpack_require__('./node_modules/recharts/es6/cartesian/XAxis.js'),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__ =
          __webpack_require__('./node_modules/recharts/es6/cartesian/YAxis.js'),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__ =
          __webpack_require__('./node_modules/recharts/es6/chart/BarChart.js'),
        _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__ =
          __webpack_require__('./node_modules/recharts/es6/chart/PieChart.js');
      const ResponsiveContainer = next_dynamic__WEBPACK_IMPORTED_MODULE_4___default()(
          () =>
            __webpack_require__
              .e(5236)
              .then(
                __webpack_require__.bind(
                  __webpack_require__,
                  './node_modules/recharts/es6/index.js'
                )
              )
              .then((m) => m.ResponsiveContainer),
          {
            loadableGenerated: { webpack: () => ['./node_modules/recharts/es6/index.js'] },
            ssr: !1,
          }
        ),
        variantStyles = {
          default:
            '\n    w-327 h-132 gap-12 justify-start\n    tablet:w-696 tablet:h-190 tablet:gap-20\n    desktop:w-full desktop:h-190 desktop:gap-20\n  ',
          medium:
            '\n    w-327 h-132 gap-8 justify-start\n    tablet:w-333 tablet:h-250\n    desktop:w-full desktop:h-255\n  ',
          longMedium:
            '\n    w-327 h-190 gap-8 justify-start\n    tablet:w-333 tablet:h-250\n    desktop:w-full desktop:h-255\n  ',
          large:
            '\n    w-327 h-132 gap-8 justify-center\n    tablet:w-696 tablet:h-190\n    desktop:w-full desktop:h-534\n  ',
          mediumExtraLong:
            '\n    w-327 h-390 gap-12 justify-start\n    tablet:w-696 tablet:h-320\n    desktop:w-full desktop:h-534\n  ',
        },
        DashboardCardOrg = ({
          variant = 'default',
          defaultType = 'summary',
          mediumMode,
          className,
          monthlyExpense = 0,
          yearlyExpense = 0,
          showProgressBar = !1,
          progressValue = 0,
          currentBudget = 0,
          lastBudget = 0,
          monthlyExpensesByYear = [],
          monthlyNewUsers = [],
          monthlyChangedUsers = [],
          largeChartData = [],
        }) => {
          const maxValue = Math.max(...monthlyExpensesByYear, 0),
            chartData = monthlyExpensesByYear.map((value, index) => ({
              month: `${index + 1}월`,
              value,
            })),
            isChangedUserMode =
              ('medium' === variant || 'longMedium' === variant) && 'changed' === mediumMode,
            isEmptyTable = 0 === (isChangedUserMode ? monthlyChangedUsers : monthlyNewUsers).length,
            largeTotal = (0, _utils_array__WEBPACK_IMPORTED_MODULE_2__.xu)(largeChartData, 'value');
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              '\n        flex flex-col items-start shrink-0\n        rounded-4 bg-gray-50\n        px-15 py-20 tablet:p-30 desktop:p-30\n        ',
              variantStyles[variant],
              className
            ),
            children: [
              'default' === variant &&
                'summary' === defaultType &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'w-full flex flex-col gap-20',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: 'flex justify-between items-center',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          className: 'text-14 text-gray-700',
                          children: '이번 달 지출액',
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                          className: 'text-16 font-bold text-gray-900',
                          children: [monthlyExpense.toLocaleString(), '원'],
                        }),
                      ],
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className: 'flex justify-between items-center',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                          className: 'text-14 text-gray-700',
                          children: '올해 총 지출액',
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                          className: 'text-16 font-bold text-gray-900',
                          children: [yearlyExpense.toLocaleString(), '원'],
                        }),
                      ],
                    }),
                    showProgressBar &&
                      (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        _components_atoms_ProgressBar_ProgressBar__WEBPACK_IMPORTED_MODULE_3__.A,
                        { value: progressValue, currentBudget, lastBudget, className: 'w-full' }
                      ),
                  ],
                }),
              'default' === variant &&
                'yearlyBar' === defaultType &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'w-full flex flex-col gap-8 tablet:gap-16',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 font-medium text-gray-900',
                      children: '월별 지출 현황',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'w-full h-60 tablet:h-100 desktop:h-100',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        ResponsiveContainer,
                        {
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                            _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_11__.E,
                            {
                              data: chartData,
                              children: [
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_9__.W,
                                  {
                                    dataKey: 'month',
                                    tickLine: !1,
                                    axisLine: !1,
                                    interval: 0,
                                    minTickGap: 0,
                                    tick: { fontSize: 9, fill: '#6B7280' },
                                    className: 'tablet:text-10',
                                  }
                                ),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_10__.h,
                                  { hide: !0, domain: [0, maxValue] }
                                ),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__.m,
                                  {
                                    cursor: { fill: 'transparent' },
                                    formatter: (value) => [
                                      `${(value ?? 0).toLocaleString()}원`,
                                      '지출액',
                                    ],
                                  }
                                ),
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_8__.yP,
                                  { dataKey: 'value', fill: '#2563EB', radius: [6, 6, 0, 0] }
                                ),
                              ],
                            }
                          ),
                        }
                      ),
                    }),
                  ],
                }),
              ('medium' === variant || 'longMedium' === variant) &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'w-full flex flex-col gap-8 h-full',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 font-medium text-gray-900 shrink-0',
                      children: isChangedUserMode
                        ? '이번 달 탈퇴 / 권한 변경'
                        : '이번 달 신규 회원 리스트',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                      className: 'w-full flex-1 overflow-y-auto scrollbar-none',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('table', {
                        className: 'w-full table-fixed text-12 text-gray-700',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('thead', {
                            className: 'sticky top-0 bg-gray-50 shadow-sm',
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                              'tr',
                              {
                                className: 'border-b border-gray-200',
                                children: [
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('th', {
                                    className: 'w-1/4 text-left py-6',
                                    children: '이름',
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('th', {
                                    className: 'w-2/4 text-left py-6',
                                    children: '이메일',
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('th', {
                                    className: 'w-1/4 text-left py-6',
                                    children: isChangedUserMode ? '변경 내용' : '권한',
                                  }),
                                ],
                              }
                            ),
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('tbody', {
                            children: [
                              isEmptyTable &&
                                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('tr', {
                                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                    'td',
                                    {
                                      colSpan: 3,
                                      className: 'py-12 text-center text-gray-400',
                                      children: '데이터가 없습니다.',
                                    }
                                  ),
                                }),
                              !isEmptyTable &&
                                isChangedUserMode &&
                                monthlyChangedUsers.map((user) => {
                                  const changeText =
                                    'withdraw' === user.changeType
                                      ? '탈퇴'
                                      : `${user.beforeRole ?? '알 수 없음'} → ${user.afterRole ?? '알 수 없음'}`;
                                  return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                    'tr',
                                    {
                                      className: 'border-b border-gray-100 last:border-0',
                                      children: [
                                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                          'td',
                                          {
                                            className: 'py-6',
                                            children: (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                              'span',
                                              { className: 'block truncate', children: user.name }
                                            ),
                                          }
                                        ),
                                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                          'td',
                                          {
                                            className: 'py-6',
                                            children: (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                              'span',
                                              { className: 'block truncate', children: user.email }
                                            ),
                                          }
                                        ),
                                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                          'td',
                                          {
                                            className: 'py-6',
                                            children: (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                              'span',
                                              { className: 'block truncate', children: changeText }
                                            ),
                                          }
                                        ),
                                      ],
                                    },
                                    user.id
                                  );
                                }),
                              !isEmptyTable &&
                                !isChangedUserMode &&
                                monthlyNewUsers.map((user) =>
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                    'tr',
                                    {
                                      className: 'border-b border-gray-100 last:border-0',
                                      children: [
                                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                          'td',
                                          {
                                            className: 'py-6',
                                            children: (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                              'span',
                                              {
                                                className: 'block truncate font-medium',
                                                children: user.name,
                                              }
                                            ),
                                          }
                                        ),
                                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                          'td',
                                          {
                                            className: 'py-6',
                                            children: (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                              'span',
                                              { className: 'block truncate', children: user.email }
                                            ),
                                          }
                                        ),
                                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                          'td',
                                          {
                                            className: 'py-6',
                                            children: (0,
                                            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                              'span',
                                              {
                                                className: 'block truncate capitalize',
                                                children: user.role,
                                              }
                                            ),
                                          }
                                        ),
                                      ],
                                    },
                                    user.id
                                  )
                                ),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              'large' === variant &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'w-full h-full flex flex-col gap-12',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 font-medium text-gray-900',
                      children: '이번 달 요청한 간식 순위',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'flex flex-col tablet:flex-row desktop:flex-col items-start flex-1 gap-16 overflow-hidden tablet:h-320',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className:
                            'shrink-0 w-200 h-200 tablet:w-110 tablet:h-110 desktop:w-208 desktop:h-208 desktop:self-center',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            ResponsiveContainer,
                            {
                              width: '100%',
                              height: '100%',
                              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__.r,
                                {
                                  children: [
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                      _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_7__.Fq,
                                      {
                                        data: largeChartData,
                                        dataKey: 'value',
                                        nameKey: 'label',
                                        innerRadius: '50%',
                                        outerRadius: '80%',
                                        paddingAngle: 2,
                                        children: largeChartData.map((item) =>
                                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                            _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__.f,
                                            { fill: item.color },
                                            item.label
                                          )
                                        ),
                                      }
                                    ),
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                      _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__.m,
                                      { formatter: (value, name) => [`${value ?? 0}회`, name] }
                                    ),
                                  ],
                                }
                              ),
                            }
                          ),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                          className:
                            'w-full tablet:flex-1 flex flex-col gap-8 text-12 text-gray-700 overflow-y-auto scrollbar-none tablet:max-h-full',
                          children: largeChartData.map((item, index) =>
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                              'li',
                              {
                                className: 'flex items-center gap-8',
                                children: [
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                                    className: 'text-gray-400 w-12',
                                    children: [index + 1, '.'],
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                    className: 'w-8 h-8 rounded-full',
                                    style: { backgroundColor: item.color },
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                    className: 'flex-1 truncate',
                                    children: item.label,
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                                    className: 'text-gray-500',
                                    children: [
                                      item.value,
                                      '회 ·',
                                      ' ',
                                      0 === largeTotal
                                        ? '0.0'
                                        : ((item.value / largeTotal) * 100).toFixed(1),
                                      '%',
                                    ],
                                  }),
                                ],
                              },
                              item.label
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              'mediumExtraLong' === variant &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'w-full h-full flex flex-col gap-12',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: 'text-14 font-medium text-gray-900',
                      children: '이번 달 요청한 간식 순위',
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                      className:
                        'flex flex-col tablet:flex-row items-start flex-1 gap-16 tablet:gap-20 overflow-hidden tablet:h-320',
                      children: [
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                          className:
                            'self-center tablet:self-auto shrink-0 w-180 h-180 tablet:w-220 tablet:h-220 desktop:w-180 desktop:h-180',
                          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                            ResponsiveContainer,
                            {
                              width: '100%',
                              height: '100%',
                              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                                _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_12__.r,
                                {
                                  children: [
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                      _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_7__.Fq,
                                      {
                                        data: largeChartData,
                                        dataKey: 'value',
                                        nameKey: 'label',
                                        innerRadius: '50%',
                                        outerRadius: '80%',
                                        paddingAngle: 2,
                                        children: largeChartData.map((item) =>
                                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                            _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_6__.f,
                                            { fill: item.color },
                                            item.label
                                          )
                                        ),
                                      }
                                    ),
                                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                      _barrel_optimize_names_Bar_BarChart_Cell_Pie_PieChart_Tooltip_XAxis_YAxis_recharts__WEBPACK_IMPORTED_MODULE_5__.m,
                                      { formatter: (value, name) => [`${value ?? 0}회`, name] }
                                    ),
                                  ],
                                }
                              ),
                            }
                          ),
                        }),
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                          className:
                            'w-full tablet:flex-1 flex flex-col gap-8 text-12 text-gray-700 overflow-y-auto scrollbar-none max-h-160 tablet:max-h-full',
                          children: largeChartData.map((item, index) =>
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                              'li',
                              {
                                className: 'flex items-center gap-8',
                                children: [
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                                    className: 'text-gray-400 w-12',
                                    children: [index + 1, '.'],
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                    className: 'w-8 h-8 rounded-full',
                                    style: { backgroundColor: item.color },
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                    className: 'flex-1 min-w-0 whitespace-normal break-words',
                                    children: item.label,
                                  }),
                                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('span', {
                                    className: 'text-gray-500',
                                    children: [
                                      item.value,
                                      '회 ·',
                                      ' ',
                                      0 === largeTotal
                                        ? '0.0'
                                        : ((item.value / largeTotal) * 100).toFixed(1),
                                      '%',
                                    ],
                                  }),
                                ],
                              },
                              item.label
                            )
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = DashboardCardOrg;
      DashboardCardOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DashboardCardOrg',
        props: {
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "| 'default'\n| 'medium'\n| 'large'\n| 'longMedium'\n| 'mediumExtraLong'",
              elements: [
                { name: 'literal', value: "'default'" },
                { name: 'literal', value: "'medium'" },
                { name: 'literal', value: "'large'" },
                { name: 'literal', value: "'longMedium'" },
                { name: 'literal', value: "'mediumExtraLong'" },
              ],
            },
            description: '',
            defaultValue: { value: "'default'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
          defaultType: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'summary' | 'yearlyBar'",
              elements: [
                { name: 'literal', value: "'summary'" },
                { name: 'literal', value: "'yearlyBar'" },
              ],
            },
            description: '',
            defaultValue: { value: "'summary'", computed: !1 },
          },
          mediumMode: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'new' | 'changed'",
              elements: [
                { name: 'literal', value: "'new'" },
                { name: 'literal', value: "'changed'" },
              ],
            },
            description: 'medium 전용',
          },
          monthlyExpense: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          yearlyExpense: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          showProgressBar: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          progressValue: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          currentBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          lastBudget: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '0', computed: !1 },
          },
          monthlyExpensesByYear: {
            required: !1,
            tsType: { name: 'Array', elements: [{ name: 'number' }], raw: 'number[]' },
            description: '',
            defaultValue: { value: '[]', computed: !1 },
          },
          monthlyNewUsers: {
            required: !1,
            tsType: { name: 'Array', elements: [{ name: 'NewUser' }], raw: 'NewUser[]' },
            description: '',
            defaultValue: { value: '[]', computed: !1 },
          },
          monthlyChangedUsers: {
            required: !1,
            tsType: { name: 'Array', elements: [{ name: 'ChangedUser' }], raw: 'ChangedUser[]' },
            description: '',
            defaultValue: { value: '[]', computed: !1 },
          },
          largeChartData: {
            required: !1,
            tsType: {
              name: 'Array',
              elements: [{ name: 'LargeChartItem' }],
              raw: 'LargeChartItem[]',
            },
            description: '',
            defaultValue: { value: '[]', computed: !1 },
          },
        },
      };
    },
    './src/utils/array.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      function filterByIds(items, ids, idField = 'id') {
        const idSet = new Set(ids.map(String));
        return items.filter((item) => idSet.has(String(item[idField])));
      }
      function sumPrices(items) {
        return items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
      }
      function sumBy(items, field) {
        return items.reduce((sum, item) => {
          const value = item[field];
          return sum + ('number' == typeof value ? value : 0);
        }, 0);
      }
      function sumTotal(items, priceField, quantityField) {
        return items.reduce((sum, item) => {
          const price = item[priceField],
            quantity = item[quantityField];
          return (
            sum +
            ('number' == typeof price ? price : 0) * ('number' == typeof quantity ? quantity : 1)
          );
        }, 0);
      }
      __webpack_require__.d(__webpack_exports__, {
        _l: () => sumTotal,
        as: () => filterByIds,
        mN: () => sumPrices,
        xu: () => sumBy,
      });
    },
  },
]);
