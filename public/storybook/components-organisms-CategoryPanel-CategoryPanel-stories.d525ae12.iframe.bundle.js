'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [1911],
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
    './src/components/organisms/CategoryPanel/CategoryPanel.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithSelectedValue: () => WithSelectedValue,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__('./src/constants/index.ts'),
        _CategoryPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/organisms/CategoryPanel/CategoryPanel.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Organisms/CategoryPanel',
          component: _CategoryPanel__WEBPACK_IMPORTED_MODULE_3__.x,
          tags: ['autodocs'],
          parameters: {
            layout: 'centered',
            docs: {
              description: {
                component:
                  '카테고리 필터링을 위한 아코디언 패널 컴포넌트입니다. 여러 섹션을 가지며, 각 섹션은 접기/펼치기가 가능하고, 옵션을 선택할 수 있습니다.',
              },
            },
          },
          argTypes: {
            sections: { control: 'object', description: '카테고리 섹션 배열' },
            selectedValue: {
              control: 'number',
              description: '현재 선택된 카테고리 값 (ChildCategory의 id)',
            },
            onChange: {
              action: 'category-changed',
              description: '카테고리 옵션 클릭 시 호출되는 콜백',
            },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        sampleSections = _constants__WEBPACK_IMPORTED_MODULE_2__.w,
        CategoryPanelWithState = ({
          sections,
          selectedValue: initialSelectedValue,
          onChange,
          className,
        }) => {
          const [selectedValue, setSelectedValue] = (0,
          react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialSelectedValue ?? null);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            _CategoryPanel__WEBPACK_IMPORTED_MODULE_3__.x,
            {
              sections,
              selectedValue,
              onChange: (value) => {
                (setSelectedValue(value), onChange?.(value));
              },
              className,
            }
          );
        },
        Default = {
          render: (args) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelWithState, {
              sections: args.sections,
              selectedValue: args.selectedValue,
              onChange: args.onChange,
              className: args.className,
            }),
          args: { sections: sampleSections, selectedValue: null },
        },
        WithSelectedValue = {
          render: (args) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CategoryPanelWithState, {
              sections: args.sections,
              selectedValue: args.selectedValue,
              onChange: args.onChange,
              className: args.className,
            }),
          args: { sections: sampleSections, selectedValue: 202 },
        },
        __namedExportsOrder = ['Default', 'WithSelectedValue'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: args => <CategoryPanelWithState sections={args.sections} selectedValue={args.selectedValue} onChange={args.onChange} className={args.className} />,\n  args: {\n    sections: sampleSections,\n    selectedValue: null\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithSelectedValue.parameters = {
          ...WithSelectedValue.parameters,
          docs: {
            ...WithSelectedValue.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: args => <CategoryPanelWithState sections={args.sections} selectedValue={args.selectedValue} onChange={args.onChange} className={args.className} />,\n  args: {\n    sections: sampleSections,\n    selectedValue: 202 // 과즙음료\n  }\n}',
              ...WithSelectedValue.parameters?.docs?.source,
            },
          },
        }));
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
  },
]);
