'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2871],
  {
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
    './src/components/molecules/SearchBar/SearchBar.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          CustomWidth: () => CustomWidth,
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/SearchBar',
          component: __webpack_require__('./src/components/molecules/SearchBar/SearchBar.tsx').A,
          tags: ['autodocs'],
          argTypes: {
            placeholder: { control: 'text', description: '검색 입력 필드의 placeholder 텍스트' },
            defaultValue: { control: 'text', description: '초기 검색어 값' },
            onSearch: { action: 'searched', description: '검색 실행 시 호출되는 콜백 함수' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = { args: { placeholder: '검색어를 입력하세요' } },
        CustomWidth = { args: { placeholder: '검색어를 입력하세요', className: 'max-w-md' } },
        __namedExportsOrder = ['Default', 'CustomWidth'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  args: {\n    placeholder: '검색어를 입력하세요'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (CustomWidth.parameters = {
          ...CustomWidth.parameters,
          docs: {
            ...CustomWidth.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    placeholder: '검색어를 입력하세요',\n    className: 'max-w-md'\n  }\n}",
              ...CustomWidth.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/SearchBar/SearchBar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => SearchBar_SearchBar });
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        next_image = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs');
      var Input = __webpack_require__('./src/components/atoms/Input/Input.tsx'),
        IconButton = __webpack_require__('./src/components/atoms/IconButton/IconButton.tsx');
      const SearchBar = ({
          onSearch,
          defaultValue = '',
          className,
          instant = !1,
          debounceDelay = 300,
          ...inputProps
        }) => {
          const [query, setQuery] = (0, react.useState)(String(defaultValue)),
            debouncedQuery = (function useDebounce(value, delay) {
              const [debouncedValue, setDebouncedValue] = (0, react.useState)(value);
              return (
                (0, react.useEffect)(() => {
                  const timer = setTimeout(() => {
                    setDebouncedValue(value);
                  }, delay);
                  return () => {
                    clearTimeout(timer);
                  };
                }, [value, delay]),
                debouncedValue
              );
            })(query, debounceDelay),
            onSearchRef = (0, react.useRef)(onSearch);
          ((0, react.useEffect)(() => {
            onSearchRef.current = onSearch;
          }, [onSearch]),
            (0, react.useEffect)(() => {
              setQuery(String(defaultValue));
            }, [defaultValue]),
            (0, react.useEffect)(() => {
              instant && onSearchRef.current && onSearchRef.current(debouncedQuery.trim());
            }, [debouncedQuery, instant]));
          const handleSubmit = (e) => {
            (e?.preventDefault(), onSearch && onSearch(query.trim()));
          };
          return (0, jsx_runtime.jsx)('form', {
            onSubmit: handleSubmit,
            className: (0, clsx.A)('relative w-full', className),
            children: (0, jsx_runtime.jsxs)('div', {
              className: 'relative flex items-center',
              children: [
                (0, jsx_runtime.jsx)('div', {
                  className: 'absolute left-1 bottom-10 drop-shadow-sm',
                  children: (0, jsx_runtime.jsx)(IconButton.K, {
                    variant: 'default',
                    size: 'md',
                    'aria-label': '검색',
                    onClick: () => handleSubmit(),
                    children: (0, jsx_runtime.jsx)(next_image.A, {
                      src: '/icons/search-icon.svg',
                      alt: 'Search',
                      width: 24,
                      height: 24,
                      unoptimized: !0,
                    }),
                  }),
                }),
                (0, jsx_runtime.jsx)(Input.A, {
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  placeholder: '이름으로 검색하세요',
                  className: (0, clsx.A)(
                    'pl-50 pr-16 border-gray-300 focus:border-gray-500',
                    className
                  ),
                  ...inputProps,
                }),
              ],
            }),
          });
        },
        SearchBar_SearchBar = SearchBar;
      SearchBar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'SearchBar',
        props: {
          onSearch: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(query: string) => void',
              signature: {
                arguments: [{ type: { name: 'string' }, name: 'query' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          defaultValue: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          instant: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          debounceDelay: {
            required: !1,
            tsType: { name: 'number' },
            description: '',
            defaultValue: { value: '300', computed: !1 },
          },
        },
        composes: ['Omit'],
      };
    },
  },
]);
