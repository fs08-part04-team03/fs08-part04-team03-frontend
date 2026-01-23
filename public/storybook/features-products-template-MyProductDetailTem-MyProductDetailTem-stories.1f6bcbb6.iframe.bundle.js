'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1268],
  {
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
    './src/constants/categories/categories.constants.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        A: () => CHILD_CATEGORIES,
        _: () => PARENT_CATEGORIES,
      });
      const PARENT_CATEGORIES = [
          { id: 1, key: 'snack', name: '스낵' },
          { id: 2, key: 'drink', name: '음료' },
          { id: 3, key: 'water', name: '생수' },
          { id: 4, key: 'simple-meal', name: '간편식' },
          { id: 5, key: 'fresh-food', name: '신선식' },
          { id: 6, key: 'coffee-beans', name: '원두커피' },
          { id: 7, key: 'supplies', name: '비품' },
        ],
        CHILD_CATEGORIES = [
          { id: 101, parentId: 1, key: 'snack-snack', name: '과자' },
          { id: 102, parentId: 1, key: 'snack-cookie', name: '쿠키' },
          { id: 103, parentId: 1, key: 'snack-biscuit', name: '비스켓류' },
          { id: 104, parentId: 1, key: 'snack-chocolate', name: '초콜릿류' },
          { id: 105, parentId: 1, key: 'snack-candy', name: '캔디류' },
          { id: 106, parentId: 1, key: 'snack-jelly', name: '젤리류' },
          { id: 107, parentId: 1, key: 'snack-cereal-bar', name: '시리얼바' },
          { id: 108, parentId: 1, key: 'snack-nuts', name: '견과류' },
          { id: 201, parentId: 2, key: 'drink-soda', name: '탄산음료' },
          { id: 202, parentId: 2, key: 'drink-fruit', name: '과즙음료' },
          { id: 203, parentId: 2, key: 'drink-energy', name: '에너지음료' },
          { id: 204, parentId: 2, key: 'drink-ion', name: '이온음료' },
          { id: 205, parentId: 2, key: 'drink-health', name: '건강음료' },
          { id: 206, parentId: 2, key: 'drink-tea', name: '차류' },
          { id: 301, parentId: 3, key: 'water-water', name: '생수' },
          { id: 302, parentId: 3, key: 'water-sparkling', name: '스파클링' },
          { id: 401, parentId: 4, key: 'simple-cup-ramen', name: '컵라면' },
          { id: 402, parentId: 4, key: 'simple-sausage', name: '소시지' },
          { id: 403, parentId: 4, key: 'simple-egg', name: '계란' },
          { id: 404, parentId: 4, key: 'simple-cup-rice', name: '컵밥류' },
          { id: 405, parentId: 4, key: 'simple-cereal', name: '시리얼' },
          { id: 501, parentId: 5, key: 'fresh-fruit', name: '과일' },
          { id: 502, parentId: 5, key: 'fresh-salad', name: '샐러드' },
          { id: 503, parentId: 5, key: 'fresh-bread', name: '빵' },
          { id: 504, parentId: 5, key: 'fresh-sandwich', name: '샌드위치' },
          { id: 505, parentId: 5, key: 'fresh-yogurt', name: '요거트류' },
          { id: 506, parentId: 5, key: 'fresh-dairy', name: '유제품' },
          { id: 601, parentId: 6, key: 'coffee-drip', name: '드립커피' },
          { id: 602, parentId: 6, key: 'coffee-beans', name: '원두' },
          { id: 603, parentId: 6, key: 'coffee-capsule', name: '캡슐커피' },
          { id: 701, parentId: 7, key: 'supplies-disposable', name: '일회용품' },
          { id: 702, parentId: 7, key: 'supplies-office', name: '사무용품' },
          { id: 703, parentId: 7, key: 'supplies-cleaning', name: '청소용품' },
          { id: 704, parentId: 7, key: 'supplies-hygiene', name: '위생용품' },
        ];
    },
    './src/constants/categories/categories.utils.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        JV: () => getParentById,
        WW: () => getChildrenByParentId,
        ZV: () => getChildById,
        w: () => CATEGORY_SECTIONS,
        zk: () => PARENT_CATEGORY_OPTIONS,
      });
      var _categories_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        './src/constants/categories/categories.constants.ts'
      );
      const parentById = new Map(
          _categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((c) => [c.id, c])
        ),
        childById =
          (new Map(_categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((c) => [c.key, c])),
          new Map(_categories_constants__WEBPACK_IMPORTED_MODULE_0__.A.map((c) => [c.id, c]))),
        childrenByParentId = new Map(
          _categories_constants__WEBPACK_IMPORTED_MODULE_0__.A.reduce((map, child) => {
            const list = map.get(child.parentId) ?? [];
            return (map.set(child.parentId, [...list, child]), map);
          }, new Map())
        );
      function getParentById(id) {
        return null == id ? null : (parentById.get(id) ?? null);
      }
      function getChildById(id) {
        return null == id ? null : (childById.get(id) ?? null);
      }
      function getChildrenByParentId(parentId) {
        return null == parentId ? [] : (childrenByParentId.get(parentId) ?? []);
      }
      const PARENT_CATEGORY_OPTIONS = [
          { id: 'all', label: '상품', parentId: 1 },
          ..._categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((parent) => ({
            id: parent.key,
            label: parent.name,
            parentId: parent.id,
          })),
        ],
        CATEGORY_SECTIONS = _categories_constants__WEBPACK_IMPORTED_MODULE_0__._.map((parent) => {
          const children = getChildrenByParentId(parent.id);
          return {
            id: parent.id,
            key: parent.key,
            title: parent.name,
            options: children.map((child) => ({
              value: child.id,
              key: child.key,
              label: child.name,
            })),
          };
        });
    },
    './src/features/auth/utils/constants.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, {
        cS: () => DEFAULT_TIMEOUT,
        h1: () => AUTH_API_PATHS,
        rK: () => DEFAULT_API_URL,
      });
      const DEFAULT_TIMEOUT = 3e4,
        DEFAULT_API_URL =
          { NODE_ENV: 'production', NODE_PATH: [], STORYBOOK: 'true', PUBLIC_URL: '.' }
            .NEXT_PUBLIC_API_URL || 'https://api.snock.store',
        AUTH_API_PATHS = {
          LOGIN: '/api/v1/auth/login',
          ADMIN_REGISTER: '/api/v1/auth/admin/register',
          REGISTER: '/api/v1/auth/register',
          REFRESH: '/api/v1/auth/refresh',
          LOGOUT: '/api/v1/auth/logout',
          INVITATION_VERIFY_URL: '/api/v1/auth/invitation/verifyUrl',
          CSRF: '/api/v1/auth/csrf',
        };
    },
    './src/features/products/template/MyProductDetailTem/MyProductDetailTem.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Admin: () => Admin,
          Manager: () => Manager,
          User: () => User,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => MyProductDetailTem_stories,
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
        ProductEditModal = __webpack_require__(
          './src/components/molecules/ProductEditModal/ProductEditModal.tsx'
        ),
        CustomModal = __webpack_require__('./src/components/molecules/CustomModal/CustomModal.tsx'),
        categories_utils = __webpack_require__('./src/constants/categories/categories.utils.ts');
      const MyProductDetailTem = (props) => {
          const {
              categorySections,
              detailPageProps,
              canUseMenu,
              productCategoryId,
              editModalOpen,
              deleteModalOpen,
              onCloseEditModal,
              onCloseDeleteModal,
              onOpenEditModal,
              onOpenDeleteModal,
              onEditSubmit,
              onDeleteConfirm,
              initialCategoryOption,
              initialSubCategoryOption,
              initialLink,
              initialImage,
              initialImageKey,
              productName,
              productPrice,
              onProductUpdated,
              onChangeCategory,
            } = (function isGroupedProps(props) {
              return 'dataState' in props && 'categoryState' in props && 'modalState' in props;
            })(props)
              ? {
                  categorySections: props.categoryState.categorySections,
                  detailPageProps: props.dataState.detailPageProps,
                  canUseMenu: props.canUseMenu,
                  productCategoryId: props.dataState.productCategoryId,
                  editModalOpen: props.modalState.editModalOpen,
                  deleteModalOpen: props.modalState.deleteModalOpen,
                  onCloseEditModal: props.modalHandlers.onCloseEditModal,
                  onCloseDeleteModal: props.modalHandlers.onCloseDeleteModal,
                  onOpenEditModal: props.modalHandlers.onOpenEditModal,
                  onOpenDeleteModal: props.modalHandlers.onOpenDeleteModal,
                  onEditSubmit: props.modalHandlers.onEditSubmit,
                  onDeleteConfirm: props.modalHandlers.onDeleteConfirm,
                  initialCategoryOption: props.editInitialValues.initialCategoryOption,
                  initialSubCategoryOption: props.editInitialValues.initialSubCategoryOption,
                  initialLink: props.editInitialValues.initialLink,
                  initialImage: props.editInitialValues.initialImage,
                  initialImageKey: props.editInitialValues.initialImageKey,
                  productName: props.dataState.productName,
                  productPrice: props.dataState.productPrice,
                  onProductUpdated: props.modalHandlers.onProductUpdated,
                  onChangeCategory: props.categoryState.onChangeCategory,
                }
              : {
                  ...props,
                  productCategoryId: props.productCategoryId ?? null,
                  editModalOpen: props.editModalOpen ?? !1,
                  deleteModalOpen: props.deleteModalOpen ?? !1,
                  initialCategoryOption: props.initialCategoryOption ?? null,
                  initialSubCategoryOption: props.initialSubCategoryOption ?? null,
                  initialLink: props.initialLink ?? '',
                  initialImage: props.initialImage ?? null,
                  initialImageKey: props.initialImageKey ?? null,
                  productName: props.productName ?? '',
                  productPrice: props.productPrice ?? '',
                },
            initialSelectedCategory = (0, react.useMemo)(() => {
              const lastLabel =
                detailPageProps.breadcrumbItems?.[detailPageProps.breadcrumbItems.length - 1]
                  ?.label;
              return lastLabel
                ? (categorySections
                    .flatMap((section) => section.options)
                    .find((option) => option.label === lastLabel)?.value ?? null)
                : null;
            }, [categorySections, detailPageProps.breadcrumbItems]),
            [selectedCategory, setSelectedCategory] = (0, react.useState)(initialSelectedCategory),
            activeSectionId = (0, react.useMemo)(() => {
              if (!productCategoryId) return null;
              const childCategory = (0, categories_utils.ZV)(productCategoryId);
              return childCategory?.parentId ?? null;
            }, [productCategoryId]);
          return (0, jsx_runtime.jsxs)('div', {
            className: 'flex justify-center w-full tablet:mt-10 desktop:mt-80',
            children: [
              (0, jsx_runtime.jsx)('div', {
                className: 'w-327 tablet:w-696 desktop:w-1400',
                children: (0, jsx_runtime.jsxs)('div', {
                  className: 'flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40',
                  children: [
                    (0, jsx_runtime.jsx)(CategoryPanel.x, {
                      sections: categorySections,
                      activeSectionId,
                      selectedValue:
                        'string' == typeof selectedCategory
                          ? Number(selectedCategory)
                          : selectedCategory,
                      onChange: onChangeCategory || setSelectedCategory,
                    }),
                    (0, jsx_runtime.jsx)('div', {
                      className: 'shrink-0 relative',
                      children: (0, jsx_runtime.jsx)(DetailPageLayout.A, {
                        breadcrumbItems: detailPageProps.breadcrumbItems,
                        productImage: detailPageProps.productImage,
                        productDetailHeader: {
                          productName: detailPageProps.productDetailHeader.productName,
                          price: detailPageProps.productDetailHeader.price,
                          purchaseCount: detailPageProps.productDetailHeader.purchaseCount,
                          type: void 0,
                          onMenuClick: canUseMenu
                            ? (action) => {
                                ('edit' === action && onOpenEditModal && onOpenEditModal(),
                                  'delete' === action && onOpenDeleteModal && onOpenDeleteModal());
                              }
                            : void 0,
                        },
                        liked: detailPageProps.liked,
                        onToggleLike: detailPageProps.onToggleLike,
                      }),
                    }),
                  ],
                }),
              }),
              canUseMenu &&
                onEditSubmit &&
                onDeleteConfirm &&
                (0, jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                  children: [
                    (0, jsx_runtime.jsx)(ProductEditModal.A, {
                      open: editModalOpen ?? !1,
                      onClose: onCloseEditModal || (() => {}),
                      onSubmit: (data, options) => {
                        (onEditSubmit(data, options), onProductUpdated?.());
                      },
                      initialName: productName ?? '',
                      initialPrice: productPrice ?? '',
                      initialLink: initialLink ?? '',
                      initialImage: initialImage ?? null,
                      initialImageKey: initialImageKey ?? null,
                      initialCategory: initialCategoryOption ?? null,
                      initialSubCategory: initialSubCategoryOption ?? null,
                    }),
                    (0, jsx_runtime.jsx)(CustomModal.A, {
                      open: deleteModalOpen ?? !1,
                      type: 'delete',
                      productName: productName ?? '',
                      onClose: onCloseDeleteModal || (() => {}),
                      onConfirm: onDeleteConfirm,
                    }),
                  ],
                }),
            ],
          });
        },
        MyProductDetailTem_MyProductDetailTem = MyProductDetailTem;
      MyProductDetailTem.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'MyProductDetailTem',
      };
      const mockCategorySections = [
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
        mockDetailPageProps = {
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
        MyProductDetailTem_stories = {
          title: 'Features/Products/Template/MyProductDetailTem',
          component: MyProductDetailTem_MyProductDetailTem,
          tags: ['autodocs'],
          argTypes: {
            canUseMenu: {
              control: 'boolean',
              description: 'ItemMenu 사용 가능 여부 (manager 이상)',
            },
          },
        },
        User = {
          args: {
            canUseMenu: !1,
            categorySections: mockCategorySections,
            detailPageProps: mockDetailPageProps,
          },
        },
        Manager = {
          args: {
            canUseMenu: !0,
            categorySections: mockCategorySections,
            detailPageProps: mockDetailPageProps,
          },
        },
        Admin = {
          args: {
            canUseMenu: !0,
            categorySections: mockCategorySections,
            detailPageProps: mockDetailPageProps,
          },
        },
        __namedExportsOrder = ['User', 'Manager', 'Admin'];
      ((User.parameters = {
        ...User.parameters,
        docs: {
          ...User.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    canUseMenu: false,\n    categorySections: mockCategorySections,\n    detailPageProps: mockDetailPageProps\n  }\n}',
            ...User.parameters?.docs?.source,
          },
        },
      }),
        (Manager.parameters = {
          ...Manager.parameters,
          docs: {
            ...Manager.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    canUseMenu: true,\n    categorySections: mockCategorySections,\n    detailPageProps: mockDetailPageProps\n  }\n}',
              ...Manager.parameters?.docs?.source,
            },
          },
        }),
        (Admin.parameters = {
          ...Admin.parameters,
          docs: {
            ...Admin.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    canUseMenu: true,\n    categorySections: mockCategorySections,\n    detailPageProps: mockDetailPageProps\n  }\n}',
              ...Admin.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
