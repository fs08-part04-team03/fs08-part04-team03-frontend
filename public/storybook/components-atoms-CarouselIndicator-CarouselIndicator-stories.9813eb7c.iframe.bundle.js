'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2370],
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
    './src/components/atoms/CarouselIndicator/CarouselIndicator.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Clickable: () => Clickable,
          Static: () => Static,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _CarouselIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/CarouselIndicator/CarouselIndicator.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Atoms/CarouselIndicator',
          component: _CarouselIndicator__WEBPACK_IMPORTED_MODULE_2__.w,
          tags: ['autodocs'],
          parameters: {
            docs: {
              description: {
                component:
                  '\n모바일/캐러셀 UI에서 **현재 페이지(카드) 위치**를 사용자에게 알려주는 점(dot) 인디케이터입니다.\n\n## 언제 쓰나요?\n- 카드/이미지/리스트가 **가로 스와이프(스크롤)** 로 넘어가는 레이아웃에서\n- 사용자가 “**뒤에 더 있다**”는 것을 직관적으로 알 수 있게 하고 싶을 때 사용합니다.\n\n## 동작 방식\n- `count`: 총 페이지(카드) 개수\n- `activeIndex`: 현재 활성 페이지 인덱스(0부터 시작)\n- `onSelect`를 전달하면 각 점이 **버튼**이 되어, 사용자가 점을 눌러 페이지 이동을 트리거할 수 있습니다.\n\n## 접근성(권장)\n- `onSelect`를 사용하는 경우, 각 점에는 `aria-label`이 자동으로 부여됩니다.\n- `ariaLabelPrefix`로 문구를 커스터마이즈할 수 있습니다.\n\n## 레이아웃/스타일링 팁\n- 이 컴포넌트는 기본적으로 `flex`로 중앙 정렬됩니다.\n- 필요 시 `className`으로 여백(예: `mt-10`)이나 반응형 숨김(예: `tablet:hidden`)을 제어하세요.\n        '.trim(),
              },
            },
          },
          argTypes: {
            count: {
              control: { type: 'number', min: 1, step: 1 },
              description: '총 페이지(점) 개수',
            },
            activeIndex: {
              control: { type: 'number', min: 0, step: 1 },
              description: '현재 활성 페이지 인덱스(0부터 시작)',
            },
            onSelect: {
              action: 'select',
              description:
                '점 클릭 시 호출됩니다. 전달하면 인디케이터가 클릭 가능한 네비게이션으로 동작합니다.',
            },
            ariaLabelPrefix: { control: 'text', description: '각 점 버튼의 aria-label prefix' },
            className: { control: 'text', description: '컨테이너 className (여백/반응형 등)' },
          },
        },
        Static = { args: { count: 3, activeIndex: 1, className: 'mt-10' } },
        Clickable = {
          render: (args) => {
            const [activeIndex, setActiveIndex] = react__WEBPACK_IMPORTED_MODULE_1__.useState(
              args.activeIndex
            );
            return (
              react__WEBPACK_IMPORTED_MODULE_1__.useEffect(() => {
                setActiveIndex(args.activeIndex);
              }, [args.activeIndex]),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: 'p-16',
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _CarouselIndicator__WEBPACK_IMPORTED_MODULE_2__.w,
                  {
                    count: args.count,
                    ariaLabelPrefix: args.ariaLabelPrefix,
                    className: args.className,
                    activeIndex,
                    onSelect: (idx) => {
                      (setActiveIndex(idx), args.onSelect?.(idx));
                    },
                  }
                ),
              })
            );
          },
          args: {
            count: 4,
            activeIndex: 0,
            ariaLabelPrefix: '대시보드 캐러셀',
            className: 'mt-10',
          },
        },
        __namedExportsOrder = ['Static', 'Clickable'];
      ((Static.parameters = {
        ...Static.parameters,
        docs: {
          ...Static.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    count: 3,\n    activeIndex: 1,\n    className: 'mt-10'\n  }\n}",
            ...Static.parameters?.docs?.source,
          },
        },
      }),
        (Clickable.parameters = {
          ...Clickable.parameters,
          docs: {
            ...Clickable.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => {\n    const [activeIndex, setActiveIndex] = React.useState(args.activeIndex);\n    React.useEffect(() => {\n      setActiveIndex(args.activeIndex);\n    }, [args.activeIndex]);\n    return <div className=\"p-16\">\n        <CarouselIndicator count={args.count} ariaLabelPrefix={args.ariaLabelPrefix} className={args.className} activeIndex={activeIndex} onSelect={idx => {\n        setActiveIndex(idx);\n        args.onSelect?.(idx);\n      }} />\n      </div>;\n  },\n  args: {\n    count: 4,\n    activeIndex: 0,\n    ariaLabelPrefix: '대시보드 캐러셀',\n    className: 'mt-10'\n  }\n}",
              ...Clickable.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/atoms/CarouselIndicator/CarouselIndicator.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { w: () => CarouselIndicator });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const CarouselIndicator = ({
        count,
        activeIndex,
        onSelect,
        ariaLabelPrefix = '캐러셀',
        className,
      }) => {
        if (count <= 1) return null;
        const isClickable = 'function' == typeof onSelect,
          dots = Array.from({ length: count }, (_, i) => i);
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
            'flex justify-center gap-6',
            className
          ),
          role: isClickable ? void 0 : 'status',
          'aria-label': isClickable ? void 0 : `${ariaLabelPrefix} ${activeIndex + 1} / ${count}`,
          children: dots.map((dotIndex) => {
            const dotClassName = (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              'h-6 w-6 rounded-full transition-colors',
              dotIndex === activeIndex ? 'bg-gray-900' : 'bg-gray-200'
            );
            return isClickable
              ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  'button',
                  {
                    type: 'button',
                    'aria-label': `${ariaLabelPrefix} ${dotIndex + 1}번째로 이동`,
                    onClick: () => onSelect(dotIndex),
                    className: dotClassName,
                  },
                  dotIndex
                )
              : (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  'span',
                  { className: dotClassName },
                  dotIndex
                );
          }),
        });
      };
      CarouselIndicator.__docgenInfo = {
        description:
          'CarouselIndicator (Atom)\n- 점(dot) 인디케이터를 렌더링합니다.\n- onSelect가 있으면 클릭으로 이동(네비게이션) 가능합니다.',
        methods: [],
        displayName: 'CarouselIndicator',
        props: {
          count: { required: !0, tsType: { name: 'number' }, description: '' },
          activeIndex: { required: !0, tsType: { name: 'number' }, description: '' },
          onSelect: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(index: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'index' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          ariaLabelPrefix: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'캐러셀'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
  },
]);
