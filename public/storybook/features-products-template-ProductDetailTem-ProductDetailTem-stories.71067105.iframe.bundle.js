'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1172],
  {
    './src/components/molecules/StatusNotice/StatusNotice.tsx'(
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
        _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/Button/Button.tsx'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const StatusNotice = ({
          icon = '/icons/book.svg',
          title,
          description,
          buttonText = '',
          onButtonClick,
          hideButton = !1,
        }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
              'mobile:w-375 mobile:min-h-300 mobile:px-24 mobile:flex mobile:flex-col mobile:items-center',
              'tablet:w-310 tablet:min-h-336 tablet:px-0'
            ),
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'flex items-center justify-center rounded-full bg-gray-25',
                  'px-32 pt-30 pb-27',
                  'mobile:mt-30 mobile:mb-41',
                  'tablet:mb-50'
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  next_image__WEBPACK_IMPORTED_MODULE_1__.A,
                  { src: icon, alt: '', width: 36, height: 43, className: 'object-contain' }
                ),
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'mobile:text-gray-primary-950 mobile:text-18 mobile:font-extrabold mobile:tracking--0.45 mobile:text-center mobile:mb-10',
                  'tablet:text-gray-primary-950 tablet:text-24 tablet:font-extrabold tablet:tracking--0.6 tablet:text-center tablet:mb-12'
                ),
                children: title,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                  'mobile:text-gray-primary-800 mobile:text-14 mobile:font-normal mobile:tracking--0.35 mobile:leading-160 mobile:whitespace-pre-line mobile:text-center mobile:mb-40',
                  'tablet:text-gray-primary-800 tablet:text-16 tablet:font-normal tablet:tracking--0.4 tablet:leading-160 tablet:text-center tablet:mb-48'
                ),
                children: description,
              }),
              !hideButton &&
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                  _components_atoms_Button_Button__WEBPACK_IMPORTED_MODULE_2__.A,
                  {
                    size: 'lg',
                    variant: 'primary',
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_3__.A)(
                      'mobile:w-327 mobile:h-64 mobile:cursor-pointer',
                      'tablet:w-310 tablet:h-64 tablet:cursor-pointer'
                    ),
                    onClick: onButtonClick,
                    children: buttonText,
                  }
                ),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = StatusNotice;
      StatusNotice.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'StatusNotice',
        props: {
          icon: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "'/icons/book.svg'", computed: !1 },
          },
          title: { required: !0, tsType: { name: 'string' }, description: '' },
          description: { required: !0, tsType: { name: 'string' }, description: '' },
          buttonText: {
            required: !1,
            tsType: { name: 'string' },
            description: '',
            defaultValue: { value: "''", computed: !1 },
          },
          onButtonClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '',
          },
          hideButton: {
            required: !1,
            tsType: { name: 'boolean' },
            description: '',
            defaultValue: { value: 'false', computed: !1 },
          },
        },
      };
    },
    './src/components/organisms/CategoryPanel/CategoryPanel.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { x: () => CategoryPanel });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const CategoryPanelMobile = ({
          sections,
          activeSectionId,
          selectedValue,
          onChange,
          className,
        }) => {
          const activeSection = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
            if (!sections?.length) return null;
            if (null != activeSectionId)
              return sections.find((s) => s.id === activeSectionId) ?? sections[0];
            if (null != selectedValue) {
              const found = sections.find((s) => s.options.some((o) => o.value === selectedValue));
              if (found) return found;
            }
            return sections[0];
          }, [sections, activeSectionId, selectedValue]);
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!activeSection) return;
            if (null == activeSectionId) return;
            if (!onChange) return;
            if (null == selectedValue) return;
            activeSection.options.some((o) => o.value === selectedValue) || onChange(null);
          }, [activeSection, activeSectionId, selectedValue, onChange]);
          return activeSection
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('section', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'w-full bg-white tablet:hidden',
                  'flex flex-col',
                  className
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                    'w-full overflow-x-auto border-b border-gray-200',
                    'scroll-smooth scrollbar-none'
                  ),
                  style: { WebkitOverflowScrolling: 'touch' },
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                      'flex min-w-max px-16'
                    ),
                    children: activeSection.options.map((option) => {
                      const isActive = selectedValue === option.value;
                      return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                        'button',
                        {
                          type: 'button',
                          onClick: () => {
                            return (
                              (value = option.value),
                              void (onChange && onChange(selectedValue === value ? null : value))
                            );
                            var value;
                          },
                          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                            'px-16 py-14 whitespace-nowrap',
                            'text-14 transition-colors duration-150',
                            isActive
                              ? 'text-gray-950 font-bold'
                              : 'text-gray-500 font-normal hover:text-gray-700',
                            'cursor-pointer'
                          ),
                          'aria-pressed': isActive,
                          children: option.label,
                        },
                        option.value
                      );
                    }),
                  }),
                }),
              })
            : null;
        },
        CategoryPanelTablet = ({ sections, selectedValue, onChange, className }) => {
          const [openSectionId, setOpenSectionId] = (0,
          react__WEBPACK_IMPORTED_MODULE_1__.useState)(
            (selectedValue
              ? sections.find((section) =>
                  section.options.some((option) => option.value === selectedValue)
                )
              : null
            )?.id ?? null
          );
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!selectedValue) return;
            const foundSection = sections.find((s) =>
              s.options.some((option) => option.value === selectedValue)
            );
            foundSection && setOpenSectionId(foundSection.id);
          }, [selectedValue, sections]);
          return sections?.length
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'hidden tablet:flex desktop:hidden w-180 bg-white',
                  'flex flex-col',
                  className
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className:
                      'mb-10 text-18 font-suit font-bold text-gray-primary-950 tracking-[-0.45px]',
                    children: '카테고리',
                  }),
                  sections.map((section) => {
                    const isOpen = openSectionId === section.id;
                    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      'div',
                      {
                        className: 'flex flex-col',
                        children: [
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-0.5 bg-gray-900',
                            }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                            type: 'button',
                            onClick: () => {
                              return (
                                (id = section.id),
                                void setOpenSectionId((prev) => (prev === id ? null : id))
                              );
                              var id;
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'w-full p-14',
                              'flex items-center justify-between',
                              'transition-colors duration-150',
                              'text-left',
                              'cursor-pointer'
                            ),
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'text-16 text-gray-900',
                                  isOpen ? 'font-bold' : 'font-normal'
                                ),
                                children: section.title,
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'inline-flex items-center justify-center transform transition-transform duration-200 ease-out text-gray-400 shrink-0 ml-2',
                                  isOpen ? 'rotate-180' : 'rotate-0'
                                ),
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'svg',
                                  {
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    'aria-hidden': !0,
                                    children: (0,
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                                      d: 'M6 9L12 15L18 9',
                                      stroke: 'currentColor',
                                      strokeWidth: '2',
                                      strokeLinecap: 'round',
                                      strokeLinejoin: 'round',
                                    }),
                                  }
                                ),
                              }),
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'overflow-hidden',
                              'transition-all duration-200 ease-out',
                              isOpen
                                ? 'max-h-500 opacity-100 translate-y-0'
                                : 'max-h-0 opacity-0 -translate-y-2'
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'div',
                              {
                                className: 'p-14',
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'ul',
                                  {
                                    className: 'flex flex-col',
                                    children: section.options.map((option) => {
                                      const isActive = selectedValue === option.value;
                                      return (0,
                                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                        'li',
                                        {
                                          children: (0,
                                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                            'button',
                                            {
                                              type: 'button',
                                              onClick: () =>
                                                ((value) => {
                                                  if (!onChange) return;
                                                  if (selectedValue === value)
                                                    return void onChange(null);
                                                  onChange(value);
                                                  const sectionWithOption = sections.find((s) =>
                                                    s.options.some(
                                                      (option) => option.value === value
                                                    )
                                                  );
                                                  sectionWithOption &&
                                                    setOpenSectionId(sectionWithOption.id);
                                                })(option.value),
                                              className: (0,
                                              _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                                'w-full text-left py-14 px-20',
                                                'text-16 transition-colors duration-150',
                                                isActive
                                                  ? 'text-gray-950 font-normal'
                                                  : 'text-gray-500 font-normal hover:text-gray-700',
                                                'cursor-pointer'
                                              ),
                                              'aria-pressed': isActive,
                                              children: option.label,
                                            }
                                          ),
                                        },
                                        option.value
                                      );
                                    }),
                                  }
                                ),
                              }
                            ),
                          }),
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-px bg-gray-100 mt-2',
                            }),
                        ],
                      },
                      section.id
                    );
                  }),
                ],
              })
            : null;
        },
        CategoryPanelDesktop = ({ sections = [], selectedValue, onChange, className }) => {
          const [openSectionId, setOpenSectionId] = (0,
          react__WEBPACK_IMPORTED_MODULE_1__.useState)(
            (selectedValue
              ? sections.find((section) =>
                  section.options.some((option) => option.value === selectedValue)
                )
              : null
            )?.id ?? null
          );
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!selectedValue) return;
            const foundSection = sections.find((s) =>
              s.options.some((option) => option.value === selectedValue)
            );
            foundSection && setOpenSectionId(foundSection.id);
          }, [selectedValue, sections]);
          return sections.length
            ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('section', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'hidden desktop:flex w-180 bg-white',
                  'flex flex-col',
                  className
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                    className:
                      'mb-10 text-18 font-suit font-bold text-gray-primary-950 tracking-[-0.45px]',
                    children: '카테고리',
                  }),
                  sections.map((section) => {
                    const isOpen = openSectionId === section.id;
                    return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
                      'div',
                      {
                        className: 'flex flex-col',
                        children: [
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-0.5 bg-gray-900',
                            }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                            type: 'button',
                            onClick: () => {
                              return (
                                (id = section.id),
                                void setOpenSectionId((prev) => (prev === id ? null : id))
                              );
                              var id;
                            },
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'w-full p-14',
                              'flex items-center justify-between',
                              'transition-colors duration-150',
                              'text-left',
                              'cursor-pointer'
                            ),
                            children: [
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'text-16 text-gray-900',
                                  isOpen ? 'font-bold' : 'font-normal'
                                ),
                                children: section.title,
                              }),
                              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                  'inline-flex items-center justify-center transform transition-transform duration-200 ease-out text-gray-400 shrink-0 ml-2',
                                  isOpen ? 'rotate-180' : 'rotate-0'
                                ),
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'svg',
                                  {
                                    width: '16',
                                    height: '16',
                                    viewBox: '0 0 24 24',
                                    fill: 'none',
                                    'aria-hidden': !0,
                                    children: (0,
                                    react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('path', {
                                      d: 'M6 9L12 15L18 9',
                                      stroke: 'currentColor',
                                      strokeWidth: '2',
                                      strokeLinecap: 'round',
                                      strokeLinejoin: 'round',
                                    }),
                                  }
                                ),
                              }),
                            ],
                          }),
                          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                              'overflow-hidden',
                              'transition-all duration-200 ease-out',
                              isOpen
                                ? 'max-h-500 opacity-100 translate-y-0'
                                : 'max-h-0 opacity-0 -translate-y-2'
                            ),
                            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                              'div',
                              {
                                className: 'p-14',
                                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                  'ul',
                                  {
                                    className: 'flex flex-col',
                                    children: section.options.map((option) => {
                                      const isActive = selectedValue === option.value;
                                      return (0,
                                      react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                        'li',
                                        {
                                          children: (0,
                                          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                                            'button',
                                            {
                                              type: 'button',
                                              onClick: () =>
                                                ((value) => {
                                                  if (!onChange) return;
                                                  if (selectedValue === value)
                                                    return void onChange(null);
                                                  onChange(value);
                                                  const sectionWithOption = sections.find((s) =>
                                                    s.options.some(
                                                      (option) => option.value === value
                                                    )
                                                  );
                                                  sectionWithOption &&
                                                    setOpenSectionId(sectionWithOption.id);
                                                })(option.value),
                                              className: (0,
                                              _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                                                'w-full text-left py-14 px-20',
                                                'text-16 transition-colors duration-150',
                                                isActive
                                                  ? 'text-gray-950 font-normal'
                                                  : 'text-gray-500 font-normal hover:text-gray-700',
                                                'cursor-pointer'
                                              ),
                                              'aria-pressed': isActive,
                                              children: option.label,
                                            }
                                          ),
                                        },
                                        option.value
                                      );
                                    }),
                                  }
                                ),
                              }
                            ),
                          }),
                          isOpen &&
                            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                              className: 'h-px bg-gray-100 mt-2',
                            }),
                        ],
                      },
                      section.id
                    );
                  }),
                ],
              })
            : null;
        },
        CategoryPanel = ({ sections, activeSectionId, selectedValue, onChange, className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelMobile, {
                  sections,
                  activeSectionId,
                  selectedValue,
                  onChange,
                  className,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelTablet, {
                  sections,
                  selectedValue,
                  onChange,
                  className,
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelDesktop, {
                  sections,
                  selectedValue,
                  onChange,
                  className,
                }),
              ],
            }
          );
      CategoryPanel.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'CategoryPanel',
        props: {
          sections: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'CategoryPanelSection' }],
              raw: 'CategoryPanelSection[]',
            },
            description: '',
          },
          activeSectionId: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'number | null',
              elements: [{ name: 'number' }, { name: 'null' }],
            },
            description: '(모바일) GNB에서 선택된 대분류(ParentCategory) id',
          },
          selectedValue: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'number | null',
              elements: [{ name: 'number' }, { name: 'null' }],
            },
            description: '현재 선택된 카테고리 (단일 선택) - ChildCategory id',
          },
          onChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(value: number | null) => void',
              signature: {
                arguments: [
                  {
                    type: {
                      name: 'union',
                      raw: 'number | null',
                      elements: [{ name: 'number' }, { name: 'null' }],
                    },
                    name: 'value',
                  },
                ],
                return: { name: 'void' },
              },
            },
            description: '옵션 클릭 시 callback (토글 포함)',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/products/constants/messages.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { F: () => PRODUCT_MESSAGES });
      const PRODUCT_MESSAGES = {
        SUCCESS: {
          UPDATE: '상품이 수정되었습니다.',
          DELETE: '상품이 삭제되었습니다.',
          ADD_TO_CART: '장바구니에 상품이 추가되었습니다.',
          REGISTER: '상품이 등록되었습니다.',
        },
        ERROR: {
          UPDATE: '상품 수정에 실패했습니다.',
          DELETE: '상품 삭제에 실패했습니다.',
          FETCH_PRODUCT: '상품 정보를 불러올 수 없습니다.',
          ADD_TO_CART: '나중에 다시 시도해주세요.',
          REGISTER: '상품 등록에 실패했습니다.',
        },
        EMPTY: {
          NO_PRODUCTS: {
            TITLE: '등록된 상품이 없습니다',
            DESCRIPTION: '상품을 등록하면\n여기에 표시됩니다.',
          },
          NO_MY_PRODUCTS: {
            TITLE: '등록한 상품이 없습니다',
            DESCRIPTION: '상품을 등록하면\n여기에 표시됩니다.',
          },
        },
        MODAL: {
          CART_ADD_FAILED_DESCRIPTION: '나중에 다시 시도해주세요.',
          CART_ADD_SUCCESS_DESCRIPTION: '장바구니에 상품이 추가되었습니다.',
        },
      };
    },
    './src/features/products/template/ProductDetailTem/ProductDetailTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => ProductDetailTem_stories,
        }));
      var jsx_runtime = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react = __webpack_require__('./node_modules/next/dist/compiled/react/index.js'),
        CategoryPanel = __webpack_require__(
          './src/components/organisms/CategoryPanel/CategoryPanel.tsx'
        ),
        DetailPageLayout = __webpack_require__(
          './src/components/organisms/DetailPageLayout/DetailPageLayout.tsx'
        ),
        StatusNotice = __webpack_require__(
          './src/components/molecules/StatusNotice/StatusNotice.tsx'
        ),
        CustomModal = __webpack_require__('./src/components/molecules/CustomModal/CustomModal.tsx'),
        ProductEditModal = __webpack_require__(
          './src/components/molecules/ProductEditModal/ProductEditModal.tsx'
        ),
        constants = __webpack_require__('./src/constants/index.ts'),
        categories_utils = __webpack_require__('./src/constants/categories/categories.utils.ts'),
        messages = __webpack_require__('./src/features/products/constants/messages.ts');
      const ProductDetailTem = (props) => {
          const {
              categorySections,
              detailPageProps,
              isLoading,
              hasProduct,
              productCategoryId,
              canUseMenu,
              editModalOpen,
              deleteModalOpen,
              onCloseEditModal,
              onCloseDeleteModal,
              onEditSubmit,
              onDeleteConfirm,
              initialCategoryOption,
              initialSubCategoryOption,
              initialLink,
              initialImage,
              initialImageKey,
              productName,
              productPrice,
              cartAddFailedModalOpen,
              cartAddSuccessModalOpen,
              onCloseCartAddFailedModal,
              onCloseCartAddSuccessModal,
              onGoToCart,
              onGoToProducts,
              onChangeCategory,
            } = (function isGroupedProps(props) {
              return 'data' in props && 'category' in props && 'cartModal' in props;
            })(props)
              ? {
                  categorySections: props.category.categorySections,
                  detailPageProps: props.data.detailPageProps,
                  isLoading: props.data.isLoading,
                  hasProduct: props.data.hasProduct,
                  productCategoryId: props.data.productCategoryId,
                  canUseMenu: props.canUseMenu,
                  editModalOpen: props.editModal?.isOpen ?? !1,
                  deleteModalOpen: props.deleteModal?.isOpen ?? !1,
                  onCloseEditModal: props.editModal?.onClose,
                  onCloseDeleteModal: props.deleteModal?.onClose,
                  onEditSubmit: props.editModal?.onSubmit,
                  onDeleteConfirm: props.deleteModal?.onConfirm,
                  initialCategoryOption: props.editModal?.initialValues.category ?? null,
                  initialSubCategoryOption: props.editModal?.initialValues.subCategory ?? null,
                  initialLink: props.editModal?.initialValues.link ?? '',
                  initialImage: props.editModal?.initialValues.image ?? null,
                  initialImageKey: props.editModal?.initialValues.imageKey ?? null,
                  productName:
                    props.editModal?.initialValues.name ?? props.deleteModal?.productName ?? '',
                  productPrice: props.editModal?.initialValues.price ?? '',
                  cartAddFailedModalOpen: props.cartModal.addFailedOpen,
                  cartAddSuccessModalOpen: props.cartModal.addSuccessOpen,
                  onCloseCartAddFailedModal: props.cartModal.onCloseAddFailed,
                  onCloseCartAddSuccessModal: props.cartModal.onCloseAddSuccess,
                  onGoToCart: props.cartModal.onGoToCart,
                  onGoToProducts: props.cartModal.onGoToProducts,
                  onChangeCategory: props.category.onChangeCategory,
                }
              : {
                  ...props,
                  isLoading: props.isLoading ?? !1,
                  hasProduct: props.hasProduct ?? !0,
                  productCategoryId: props.productCategoryId ?? null,
                  canUseMenu: props.canUseMenu ?? !1,
                  editModalOpen: props.editModalOpen ?? !1,
                  deleteModalOpen: props.deleteModalOpen ?? !1,
                  initialCategoryOption: props.initialCategoryOption ?? null,
                  initialSubCategoryOption: props.initialSubCategoryOption ?? null,
                  initialLink: props.initialLink ?? '',
                  initialImage: props.initialImage ?? null,
                  initialImageKey: props.initialImageKey ?? null,
                  productName: props.productName ?? '',
                  productPrice: props.productPrice ?? '',
                  cartAddFailedModalOpen: props.cartAddFailedModalOpen ?? !1,
                  cartAddSuccessModalOpen: props.cartAddSuccessModalOpen ?? !1,
                },
            activeSectionId = (0, react.useMemo)(() => {
              if (!productCategoryId) return null;
              const childCategory = (0, categories_utils.ZV)(productCategoryId);
              return childCategory?.parentId ?? null;
            }, [productCategoryId]);
          return isLoading
            ? (0, jsx_runtime.jsx)('div', {
                className: 'flex items-center justify-center min-h-screen',
                children: (0, jsx_runtime.jsx)('p', { children: constants.I$.DEFAULT }),
              })
            : hasProduct
              ? (0, jsx_runtime.jsxs)('div', {
                  className: 'flex justify-center w-full tablet:mt-10 desktop:mt-80',
                  children: [
                    (0, jsx_runtime.jsx)('div', {
                      className: 'w-327 tablet:w-696 desktop:w-1400',
                      children: (0, jsx_runtime.jsxs)('div', {
                        className:
                          'flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40',
                        children: [
                          (0, jsx_runtime.jsx)(CategoryPanel.x, {
                            sections: categorySections,
                            activeSectionId,
                            selectedValue:
                              'string' == typeof productCategoryId
                                ? Number(productCategoryId)
                                : productCategoryId,
                            onChange: onChangeCategory || (() => {}),
                          }),
                          (0, jsx_runtime.jsx)('div', {
                            className: 'shrink-0',
                            children: (0, jsx_runtime.jsx)(DetailPageLayout.A, {
                              breadcrumbItems: detailPageProps.breadcrumbItems,
                              productImage: detailPageProps.productImage,
                              accordionPanels: detailPageProps.accordionPanels,
                              className: detailPageProps.className,
                              productDetailHeader: detailPageProps.productDetailHeader,
                              liked: detailPageProps.liked,
                              onToggleLike: detailPageProps.onToggleLike,
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime.jsx)(CustomModal.A, {
                      open: cartAddFailedModalOpen,
                      type: 'cart-add-failed',
                      description: messages.F.MODAL.CART_ADD_FAILED_DESCRIPTION,
                      onClose: onCloseCartAddFailedModal || (() => {}),
                      onConfirm: onCloseCartAddFailedModal || (() => {}),
                    }),
                    (0, jsx_runtime.jsx)(CustomModal.A, {
                      open: cartAddSuccessModalOpen,
                      type: 'cart-add-success',
                      description: messages.F.MODAL.CART_ADD_SUCCESS_DESCRIPTION,
                      onClose: onCloseCartAddSuccessModal || (() => {}),
                      onGoToCart,
                      onGoToProducts,
                    }),
                    canUseMenu &&
                      onEditSubmit &&
                      onDeleteConfirm &&
                      (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                        children: [
                          (0, jsx_runtime.jsx)(ProductEditModal.A, {
                            open: editModalOpen,
                            onClose: onCloseEditModal || (() => {}),
                            onSubmit: onEditSubmit,
                            initialName: productName,
                            initialPrice: productPrice,
                            initialLink,
                            initialImage,
                            initialImageKey,
                            initialCategory: initialCategoryOption,
                            initialSubCategory: initialSubCategoryOption,
                          }),
                          (0, jsx_runtime.jsx)(CustomModal.A, {
                            open: deleteModalOpen,
                            type: 'delete',
                            productName,
                            onClose: onCloseDeleteModal || (() => {}),
                            onConfirm: onDeleteConfirm,
                          }),
                        ],
                      }),
                  ],
                })
              : (0, jsx_runtime.jsx)('div', {
                  className: 'flex justify-center w-full tablet:mt-10 desktop:mt-80',
                  children: (0, jsx_runtime.jsx)('div', {
                    className: 'w-327 tablet:w-696 desktop:w-1400',
                    children: (0, jsx_runtime.jsxs)('div', {
                      className: 'flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40',
                      children: [
                        (0, jsx_runtime.jsx)(CategoryPanel.x, {
                          sections: categorySections,
                          activeSectionId,
                          selectedValue:
                            'string' == typeof productCategoryId
                              ? Number(productCategoryId)
                              : productCategoryId,
                          onChange: onChangeCategory || (() => {}),
                        }),
                        (0, jsx_runtime.jsx)('div', {
                          className:
                            'flex items-center justify-center w-full h-522 tablet:h-604 desktop:h-938',
                          children: (0, jsx_runtime.jsx)(StatusNotice.A, {
                            title: messages.F.EMPTY.NO_PRODUCTS.TITLE,
                            description: messages.F.EMPTY.NO_PRODUCTS.DESCRIPTION,
                            hideButton: !0,
                          }),
                        }),
                      ],
                    }),
                  }),
                });
        },
        ProductDetailTem_ProductDetailTem = ProductDetailTem;
      ProductDetailTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'ProductDetailTem',
      };
      const ProductDetailTem_stories = {
          title: 'Features/Products/Template/ProductDetailTem',
          component: ProductDetailTem_ProductDetailTem,
          tags: ['autodocs'],
          parameters: {
            docs: {
              description: {
                component:
                  'ProductDetailTem 컴포넌트는 상세 페이지 템플릿으로, 제품 이미지, 제품 상세 헤더, 카테고리 패널 등을 포함합니다. breadcrumb는 상세 페이지 진입 시 고정되며, isLoading과 hasProduct props로 로딩 및 에러 상태를 처리합니다.',
              },
            },
          },
        },
        Default = {
          args: {
            categorySections: [
              {
                id: 1,
                title: '음료',
                options: [
                  { value: 101, label: '탄산음료', count: 12 },
                  { value: 102, label: '과즙음료', count: 8 },
                  { value: 103, label: '에너지음료', count: 5 },
                  { value: 104, label: '이온음료', count: 6 },
                  { value: 105, label: '건강음료', count: 3 },
                  { value: 106, label: '차류', count: 9 },
                ],
              },
              {
                id: 2,
                title: '스낵',
                options: [
                  { value: 201, label: '과자', count: 15 },
                  { value: 202, label: '쿠키', count: 10 },
                  { value: 203, label: '비스켓류', count: 7 },
                  { value: 204, label: '초콜릿류', count: 12 },
                  { value: 205, label: '캔디류', count: 8 },
                  { value: 206, label: '젤리류', count: 5 },
                  { value: 207, label: '시리얼바', count: 6 },
                  { value: 208, label: '견과류', count: 9 },
                ],
              },
              {
                id: 3,
                title: '생수',
                options: [
                  { value: 301, label: '생수', count: 20 },
                  { value: 302, label: '스파클링', count: 7 },
                ],
              },
              {
                id: 4,
                title: '간편식',
                options: [
                  { value: 401, label: '컵라면', count: 14 },
                  { value: 402, label: '소시지', count: 6 },
                  { value: 403, label: '계란', count: 10 },
                  { value: 404, label: '컵밥류', count: 8 },
                  { value: 405, label: '시리얼', count: 5 },
                ],
              },
              {
                id: 5,
                title: '신선식',
                options: [
                  { value: 501, label: '과일', count: 12 },
                  { value: 502, label: '샐러드', count: 7 },
                  { value: 503, label: '빵', count: 9 },
                  { value: 504, label: '샌드위치', count: 6 },
                  { value: 505, label: '요거트류', count: 4 },
                  { value: 506, label: '유제품', count: 10 },
                ],
              },
              {
                id: 6,
                title: '원두커피',
                options: [
                  { value: 601, label: '드립커피', count: 8 },
                  { value: 602, label: '원두', count: 5 },
                  { value: 603, label: '캡슐커피', count: 7 },
                ],
              },
              {
                id: 7,
                title: '비품',
                options: [
                  { value: 701, label: '일회용품', count: 12 },
                  { value: 702, label: '사무용품', count: 6 },
                  { value: 703, label: '청소용품', count: 4 },
                  { value: 704, label: '위생용품', count: 9 },
                ],
              },
            ],
            detailPageProps: {
              breadcrumbItems: [{ label: '음료' }, { label: '탄산음료' }],
              productImage: { src: '/images/zero-cola.svg', alt: '코카콜라 제로' },
              productDetailHeader: {
                productName: '코카콜라 제로',
                purchaseCount: 1234,
                price: 2e3,
                onQuantityChange: () => {},
                onMenuClick: () => {},
                onAddToCart: () => {},
              },
            },
            isLoading: !1,
            hasProduct: !0,
          },
          parameters: {
            docs: {
              description: {
                story:
                  'breadcrumb는 "음료 > 탄산음료"로 고정되며, 상품이 있을 때 상세 정보를 표시합니다.',
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
              '{\n  args: {\n    categorySections: mockCategorySections,\n    detailPageProps: mockDetailPageProps,\n    isLoading: false,\n    hasProduct: true\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'breadcrumb는 "음료 > 탄산음료"로 고정되며, 상품이 있을 때 상세 정보를 표시합니다.\'\n      }\n    }\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      };
    },
  },
]);
