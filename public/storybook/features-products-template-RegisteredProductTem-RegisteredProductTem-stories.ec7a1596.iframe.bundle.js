'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2934],
  {
    './src/components/atoms/DropDown/DropDown.tsx'(
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
        react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/next/dist/compiled/react-dom/index.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const DropDown = ({
          items,
          placeholder = '선택',
          variant,
          disabled = !1,
          buttonClassName = '',
          dropdownClassName = '',
          optionClassName = '',
          onSelect,
          selected: externalSelected,
          inModal = !1,
        }) => {
          const [open, setOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [mounted, setMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
            [selected, setSelected] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
              externalSelected ?? null
            ),
            buttonRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            dropdownRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
            [position, setPosition] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)({
              top: 0,
              left: 0,
              width: 0,
            });
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setMounted(!0);
          }, []);
          const handleSelect = (item) => {
            (setSelected(item),
              setOpen(!1),
              queueMicrotask(() => {
                onSelect?.(item);
              }));
          };
          ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            setSelected(externalSelected ?? null);
          }, [externalSelected]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open || !buttonRef.current) return;
              const rect = buttonRef.current.getBoundingClientRect();
              setPosition({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width,
              });
            }, [open]),
            (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
              if (!open) return;
              const handleClickOutside = (e) => {
                  !dropdownRef.current ||
                    dropdownRef.current.contains(e.target) ||
                    buttonRef.current?.contains(e.target) ||
                    setOpen(!1);
                },
                handleEscape = (e) => {
                  'Escape' === e.key && setOpen(!1);
                };
              return (
                document.addEventListener('mousedown', handleClickOutside),
                document.addEventListener('keydown', handleEscape),
                () => {
                  (document.removeEventListener('mousedown', handleClickOutside),
                    document.removeEventListener('keydown', handleEscape));
                }
              );
            }, [open]));
          const appliedVariant = variant ?? 'small',
            textColorClasses = {
              small: 'text-gray-950',
              medium: 'text-gray-500',
              large: 'text-gray-950',
            },
            fontClasses = 'font-sans font-normal text-13 tracking--0.4',
            optionHeightClasses = { small: 'h-44', medium: 'h-56', large: 'h-44' },
            zIndexClass = inModal ? 'z-[var(--z-modaldropdown)]' : 'z-[var(--z-dropdown)]';
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                  ref: buttonRef,
                  type: 'button',
                  onClick: () => !disabled && setOpen((prev) => !prev),
                  disabled,
                  'aria-haspopup': 'listbox',
                  'aria-expanded': open,
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                    'border border-gray-300 rounded-8 bg-white flex items-center justify-between px-12',
                    {
                      small: 'w-110 h-44',
                      medium: 'mobile:w-153 tablet:w-216 desktop:w-216 h-56',
                      large: 'mobile:w-327 tablet:w-480 desktop:w-480 h-44',
                    }[appliedVariant],
                    disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                    buttonClassName
                  ),
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        fontClasses,
                        textColorClasses[appliedVariant]
                      ),
                      children: selected ? selected.label : placeholder,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        src: '/icons/arrow-down.svg',
                        alt: '',
                        'aria-hidden': !0,
                        width: 12,
                        height: 12,
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'w-12 h-12 transition-transform duration-200',
                          open && 'rotate-180'
                        ),
                      }
                    ),
                  ],
                }),
                mounted &&
                  open &&
                  (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                      ref: dropdownRef,
                      role: 'listbox',
                      'aria-label': placeholder,
                      style: {
                        position: 'absolute',
                        top: position.top,
                        left: position.left,
                        width: position.width,
                      },
                      className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                        zIndexClass,
                        'bg-white border border-gray-300 shadow-lg rounded-8 max-h-200 overflow-y-auto scrollbar-none',
                        dropdownClassName
                      ),
                      children: items.map((item) =>
                        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                          'li',
                          {
                            role: 'option',
                            'aria-selected': selected?.key === item.key,
                            tabIndex: 0,
                            onClick: () => handleSelect(item),
                            onKeyDown: (e) => {
                              ('Enter' !== e.key && ' ' !== e.key) ||
                                (e.preventDefault(), handleSelect(item));
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'flex items-center px-12 cursor-pointer hover:bg-gray-100',
                              fontClasses,
                              textColorClasses[appliedVariant],
                              optionHeightClasses[appliedVariant],
                              selected?.key === item.key && 'bg-gray-50',
                              optionClassName
                            ),
                            children: item.label,
                          },
                          item.key
                        )
                      ),
                    }),
                    document.body
                  ),
              ],
            }
          );
        },
        __WEBPACK_DEFAULT_EXPORT__ = DropDown;
      DropDown.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DropDown',
        props: {
          items: {
            required: !0,
            tsType: { name: 'Array', elements: [{ name: 'Option' }], raw: 'Option[]' },
            description: '',
          },
          placeholder: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'선택'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'small' | 'medium' | 'large'",
              elements: [
                { name: 'literal', value: "'small'" },
                { name: 'literal', value: "'medium'" },
                { name: 'literal', value: "'large'" },
              ],
            },
            description: '',
          },
          disabled: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
          buttonClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          dropdownClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          optionClassName: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onSelect: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(item: Option) => void',
              signature: {
                arguments: [{ type: { name: 'Option' }, name: 'item' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          selected: { required: !1, tsType: { name: 'Option' }, description: '' },
          inModal: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/components/molecules/PaginationBlock/PaginationBlock.tsx'(
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
        next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const PaginationBlock = ({ current, total, onPrev, onNext }) => {
          const [page, setPage] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(current);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            const safeTotal = Math.max(1, total),
              safeCurrent = Math.min(Math.max(1, current), safeTotal);
            setPage(safeCurrent);
          }, [current, total]);
          const isPrevEnd = 1 === page,
            isNextEnd = page === total;
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex items-center justify-between h-40 w-327 tablet:w-696 desktop:w-1400 mb-140',
            role: 'navigation',
            'aria-label': '페이지네이션',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'text-gray-primary-500 text-16 tracking-tight font-suit',
                children: [page, ' of ', total],
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                className: 'flex items-center gap-30',
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page > 1) {
                          const newPage = page - 1;
                          (setPage(newPage), onPrev?.(newPage));
                        }
                      },
                      inactive: isPrevEnd,
                      'aria-label': '이전 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isPrevEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-left.svg',
                                alt: '이전 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isPrevEnd,
                              'text-gray-primary-500': !isPrevEnd,
                            }),
                            children: 'Prev',
                          }),
                        ],
                      }),
                    }
                  ),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_3__.A,
                    {
                      type: 'button',
                      variant: 'secondary',
                      size: 'sm',
                      onClick: () => {
                        if (page < total) {
                          const newPage = page + 1;
                          (setPage(newPage), onNext?.(newPage));
                        }
                      },
                      inactive: isNextEnd,
                      'aria-label': '다음 페이지로 이동',
                      className:
                        'bg-transparent border-none shadow-none px-0 hover:cursor-pointer font-normal',
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                        className: 'flex items-center gap-6',
                        children: [
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)('text-16', {
                              'text-gray-500': isNextEnd,
                              'text-gray-950': !isNextEnd,
                            }),
                            children: 'Next',
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                              'relative w-8 h-14',
                              { 'opacity-50': isNextEnd }
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              next_image__WEBPACK_IMPORTED_MODULE_2__.A,
                              {
                                src: '/icons/arrow-right.svg',
                                alt: '다음 페이지',
                                fill: !0,
                                unoptimized: !0,
                              }
                            ),
                          }),
                        ],
                      }),
                    }
                  ),
                ],
              }),
            ],
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = PaginationBlock;
      PaginationBlock.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PaginationBlock',
        props: {
          current: { required: !0, tsType: { name: 'number' }, description: '' },
          total: { required: !0, tsType: { name: 'number' }, description: '' },
          onPrev: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
          onNext: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(newPage: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'newPage' }],
                return: { name: 'void' },
              },
            },
            description: '',
          },
        },
      };
    },
    './src/features/products/template/RegisteredProductTem/RegisteredProductTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Empty: () => Empty,
          ManyProducts: () => ManyProducts,
          SinglePage: () => SinglePage,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => RegisteredProductTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        DropDown = __webpack_require__('./src/components/atoms/DropDown/DropDown.tsx'),
        Divider = __webpack_require__('./src/components/atoms/Divider/Divider.tsx'),
        RegisteredProductOrg = __webpack_require__(
          './src/features/products/components/RegisteredProductOrg/RegisteredProductOrg.tsx'
        ),
        PaginationBlock = __webpack_require__(
          './src/components/molecules/PaginationBlock/PaginationBlock.tsx'
        ),
        clsx = __webpack_require__('./node_modules/clsx/dist/clsx.mjs'),
        labels = __webpack_require__('./src/features/products/constants/labels.ts');
      const RegisteredProductTem = (props) => {
          const {
            products,
            totalCount,
            isLoading,
            sortOptions,
            selectedSort,
            onSortChange,
            currentPage,
            totalPage,
            onPageChange,
            onRegisterClick,
          } = (function isGroupedProps(props) {
            return 'listState' in props && 'sortState' in props && 'paginationState' in props;
          })(props)
            ? {
                products: props.listState.products,
                totalCount: props.listState.totalCount,
                isLoading: props.listState.isLoading,
                sortOptions: props.sortState.sortOptions,
                selectedSort: props.sortState.selectedSort,
                onSortChange: props.sortState.onSortChange,
                currentPage: props.paginationState.currentPage,
                totalPage: props.paginationState.totalPage,
                onPageChange: props.paginationState.onPageChange,
                onRegisterClick: props.onRegisterClick,
              }
            : { ...props, isLoading: props.isLoading ?? !1 };
          return (0, jsx_runtime.jsxs)('section', {
            className: 'w-full bg-white',
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'w-full',
                children: (0, jsx_runtime.jsxs)('div', {
                  className: (0, clsx.A)(
                    'mx-auto flex items-center justify-between',
                    'px-24 pt-10 pb-20 max-w-375',
                    'tablet:max-w-744',
                    'desktop:max-w-1200 desktop:px-0 desktop:mt-80 desktop:mb-40'
                  ),
                  children: [
                    (0, jsx_runtime.jsx)('h2', {
                      className: 'text-gray-950 font-suit text-18 font-bold tracking--0.45',
                      children: labels.q.TITLE.MY_PRODUCT_LIST,
                    }),
                    (0, jsx_runtime.jsx)(DropDown.A, {
                      items: sortOptions,
                      selected: selectedSort,
                      onSelect: onSortChange,
                      variant: 'small',
                      buttonClassName: 'w-130',
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime.jsx)(Divider.c, { className: 'mb-20 desktop:hidden' }),
              (0, jsx_runtime.jsx)('div', {
                className: (0, clsx.A)('px-24', 'desktop:px-0'),
                children: (0, jsx_runtime.jsx)(RegisteredProductOrg.A, {
                  products,
                  totalCount,
                  onRegisterClick,
                  isLoading,
                }),
              }),
              !isLoading &&
                totalCount > 0 &&
                (0, jsx_runtime.jsx)('div', {
                  className: 'flex justify-center mt-20 tablet:mt-30',
                  children: (0, jsx_runtime.jsx)(PaginationBlock.A, {
                    current: currentPage,
                    total: totalPage,
                    onPrev: onPageChange,
                    onNext: onPageChange,
                  }),
                }),
            ],
          });
        },
        RegisteredProductTem_RegisteredProductTem = RegisteredProductTem;
      RegisteredProductTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'RegisteredProductTem',
      };
      const mockProducts = [
          {
            id: 1,
            categoryLabel: '청량 · 탄산음료',
            name: '코카콜라 제로',
            price: 2e3,
            imageSrc: '/images/sample1.png',
            link: 'https://www.coca-cola.com/products/coke-zero',
            createdAt: '2024-12-19T00:00:00Z',
          },
          {
            id: 2,
            categoryLabel: '청량 · 탄산음료',
            name: '스프라이트',
            price: 1800,
            imageSrc: '/images/sample2.png',
            link: 'https://www.coca-cola.com/products/sprite',
            createdAt: '2024-12-19T00:00:00Z',
          },
          {
            id: 3,
            categoryLabel: '커피 · 음료',
            name: '아메리카노',
            price: 3500,
            imageSrc: '/images/sample3.png',
            link: 'https://www.starbucks.com/products/americano',
            createdAt: '2024-12-19T00:00:00Z',
          },
        ],
        manyMockProducts = [
          ...mockProducts,
          {
            id: 4,
            categoryLabel: '간편식',
            name: '컵라면',
            price: 1500,
            imageSrc: '/images/sample4.png',
            link: 'https://www.example.com/products/cup-noodle',
            createdAt: '2024-12-18T00:00:00Z',
          },
          {
            id: 5,
            categoryLabel: '간편식',
            name: '즉석밥',
            price: 2200,
            imageSrc: '/images/sample5.png',
            link: 'https://www.example.com/products/instant-rice',
            createdAt: '2024-12-18T00:00:00Z',
          },
          {
            id: 6,
            categoryLabel: '스낵',
            name: '감자칩',
            price: 1700,
            imageSrc: '/images/sample6.png',
            link: 'https://www.example.com/products/potato-chips',
            createdAt: '2024-12-17T00:00:00Z',
          },
          {
            id: 7,
            categoryLabel: '스낵',
            name: '초코바',
            price: 1200,
            imageSrc: '/images/sample7.png',
            link: 'https://www.example.com/products/choco-bar',
            createdAt: '2024-12-17T00:00:00Z',
          },
          {
            id: 8,
            categoryLabel: '유제품',
            name: '우유',
            price: 2500,
            imageSrc: '/images/sample8.png',
            link: 'https://www.example.com/products/milk',
            createdAt: '2024-12-16T00:00:00Z',
          },
          {
            id: 9,
            categoryLabel: '유제품',
            name: '요거트',
            price: 1900,
            imageSrc: '/images/sample9.png',
            link: 'https://www.example.com/products/yogurt',
            createdAt: '2024-12-16T00:00:00Z',
          },
          {
            id: 10,
            categoryLabel: '베이커리',
            name: '식빵',
            price: 3e3,
            imageSrc: '/images/sample10.png',
            link: 'https://www.example.com/products/bread',
            createdAt: '2024-12-15T00:00:00Z',
          },
          {
            id: 11,
            categoryLabel: '베이커리',
            name: '크루아상',
            price: 3200,
            imageSrc: '/images/sample11.png',
            link: 'https://www.example.com/products/croissant',
            createdAt: '2024-12-15T00:00:00Z',
          },
        ],
        RegisteredProductTem_stories = {
          title: 'Features/Products/Template/RegisteredProductTem',
          component: RegisteredProductTem_RegisteredProductTem,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '\n상품 관리 페이지의 **Template 레벨 컴포넌트**입니다.\n\nRegisteredProductOrg, DropDown, PaginationBlock을 조합하여  \n**상품 등록 내역 화면의 전체 레이아웃과 흐름**을 담당합니다.\n\n---\n\n### 역할 (Responsibility)\n\n- 페이지 상단 **타이틀 및 정렬 옵션 영역 구성**\n- 상품 등록 날짜, 주소 정보를 포함한 **RegisteredProductOrg 배치**\n- 정렬 DropDown UI 제공 (전체 / 최신순 / 가격순)\n- PaginationBlock을 통한 **페이지 이동 UI 제공**\n- 페이지 레이아웃 전반의 **여백 및 정렬 관리**\n\n> ⚠️ 본 Template에서는  \n> - 상품 데이터 패칭  \n> - 실제 API 정렬 / 페이지네이션  \n> 과 같은 **비즈니스 로직을 포함하지 않습니다.**\n\n---\n\n### 사용 위치\n\n- Next.js Page 레벨에서 사용\n- Page → Template → Organism 구조의 **중간 레이아웃 계층**\n        ',
              },
            },
          },
        },
        Default = { args: { products: mockProducts } },
        ManyProducts = { args: { products: manyMockProducts } },
        SinglePage = { args: { products: mockProducts.slice(0, 1) } },
        Empty = { args: { products: [] } },
        __namedExportsOrder = ['Default', 'ManyProducts', 'SinglePage', 'Empty'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: '{\n  args: {\n    products: mockProducts\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nDefault\n======================',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (ManyProducts.parameters = {
          ...ManyProducts.parameters,
          docs: {
            ...ManyProducts.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    products: manyMockProducts\n  }\n}',
              ...ManyProducts.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nMany Products (Pagination)\n======================',
              ...ManyProducts.parameters?.docs?.description,
            },
          },
        }),
        (SinglePage.parameters = {
          ...SinglePage.parameters,
          docs: {
            ...SinglePage.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    products: mockProducts.slice(0, 1)\n  }\n}',
              ...SinglePage.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nSingle Page\n======================',
              ...SinglePage.parameters?.docs?.description,
            },
          },
        }),
        (Empty.parameters = {
          ...Empty.parameters,
          docs: {
            ...Empty.parameters?.docs,
            source: {
              originalSource: '{\n  args: {\n    products: []\n  }\n}',
              ...Empty.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nEmpty Products\n======================',
              ...Empty.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
