'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [2243],
  {
    './src/components/molecules/GNBCategorySwitcher/GNBCategorySwitcher.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          WithManyCategories: () => WithManyCategories,
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
        _GNBCategorySwitcher__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/components/molecules/GNBCategorySwitcher/GNBCategorySwitcher.tsx'
        );
      const CATEGORY_OPTIONS = _constants__WEBPACK_IMPORTED_MODULE_2__.zk,
        __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/GNBCategorySwitcher',
          component: _GNBCategorySwitcher__WEBPACK_IMPORTED_MODULE_3__.p,
          tags: ['autodocs'],
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '모바일 GNB 상단에서 대분류 카테고리를 선택할 수 있는 스위처 컴포넌트입니다.',
              },
            },
          },
          argTypes: {
            onCategoryChange: {
              action: 'category-changed',
              description: '카테고리 변경 시 호출되는 콜백',
            },
          },
        },
        Default = {
          render: ({
            categories,
            activeCategoryId: initialCategoryId,
            onCategoryChange,
            className,
          }) => {
            const [activeCategoryId, setActiveCategoryId] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialCategoryId ?? 'drink');
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'w-full h-600 bg-gray-50',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('header', {
                  className: 'flex items-center justify-center h-56 bg-white',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _GNBCategorySwitcher__WEBPACK_IMPORTED_MODULE_3__.p,
                    {
                      categories: categories ?? CATEGORY_OPTIONS,
                      activeCategoryId,
                      onCategoryChange: (id) => {
                        (setActiveCategoryId(id), onCategoryChange?.(id));
                      },
                      className,
                    }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('main', {
                  className: 'p-16 text-14 text-gray-600',
                  children: '카테고리를 선택하면 상단 GNB에서 변경되는 모습을 확인할 수 있습니다.',
                }),
              ],
            });
          },
          args: { categories: CATEGORY_OPTIONS, activeCategoryId: 'drink' },
        },
        WithManyCategories = {
          render: (args) => {
            const [activeCategoryId, setActiveCategoryId] = (0,
            react__WEBPACK_IMPORTED_MODULE_1__.useState)(args.activeCategoryId ?? 'snack');
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
              className: 'w-full h-600 bg-gray-50',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('header', {
                  className: 'flex items-center justify-center h-56 bg-white',
                  children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _GNBCategorySwitcher__WEBPACK_IMPORTED_MODULE_3__.p,
                    {
                      categories: CATEGORY_OPTIONS,
                      activeCategoryId,
                      onCategoryChange: (id) => {
                        (setActiveCategoryId(id), args.onCategoryChange?.(id));
                      },
                      className: args.className,
                    }
                  ),
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('main', {
                  className: 'p-16 text-14 text-gray-600',
                  children: '카테고리를 선택하면 상단 GNB에서 변경되는 모습을 확인할 수 있습니다.',
                }),
              ],
            });
          },
          args: { activeCategoryId: 'snack' },
        },
        __namedExportsOrder = ['Default', 'WithManyCategories'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              '{\n  render: ({\n    categories,\n    activeCategoryId: initialCategoryId,\n    onCategoryChange,\n    className\n  }) => {\n    const [activeCategoryId, setActiveCategoryId] = useState(initialCategoryId ?? \'drink\');\n    return <div className="w-full h-600 bg-gray-50">\n        <header className="flex items-center justify-center h-56 bg-white">\n          <GNBCategorySwitcher categories={categories ?? CATEGORY_OPTIONS} activeCategoryId={activeCategoryId} onCategoryChange={id => {\n          setActiveCategoryId(id);\n          onCategoryChange?.(id);\n        }} className={className} />\n        </header>\n        <main className="p-16 text-14 text-gray-600">\n          카테고리를 선택하면 상단 GNB에서 변경되는 모습을 확인할 수 있습니다.\n        </main>\n      </div>;\n  },\n  args: {\n    categories: CATEGORY_OPTIONS,\n    activeCategoryId: \'drink\' as const\n  }\n}',
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithManyCategories.parameters = {
          ...WithManyCategories.parameters,
          docs: {
            ...WithManyCategories.parameters?.docs,
            source: {
              originalSource:
                '{\n  render: args => {\n    const [activeCategoryId, setActiveCategoryId] = useState(args.activeCategoryId ?? \'snack\');\n    return <div className="w-full h-600 bg-gray-50">\n        <header className="flex items-center justify-center h-56 bg-white">\n          <GNBCategorySwitcher categories={CATEGORY_OPTIONS} activeCategoryId={activeCategoryId} onCategoryChange={id => {\n          setActiveCategoryId(id);\n          args.onCategoryChange?.(id);\n        }} className={args.className} />\n        </header>\n        <main className="p-16 text-14 text-gray-600">\n          카테고리를 선택하면 상단 GNB에서 변경되는 모습을 확인할 수 있습니다.\n        </main>\n      </div>;\n  },\n  args: {\n    activeCategoryId: \'snack\' as const\n  }\n}',
              ...WithManyCategories.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/GNBCategorySwitcher/GNBCategorySwitcher.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { p: () => GNBCategorySwitcher });
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
      const GNBCategorySwitcher = ({
        categories,
        categorySections,
        sectionIdByParentKey,
        activeCategoryId,
        productCategoryId,
        onCategoryChange,
        onSubCategoryChange,
        className,
      }) => {
        const sections = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
            () => categorySections ?? [],
            [categorySections]
          ),
          [isOpen, setIsOpen] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
          [mounted, setMounted] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),
          triggerRef = (0, react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),
          effectiveCategoryId = productCategoryId ?? activeCategoryId,
          activeOption = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(
            () => categories.find((c) => c.id === effectiveCategoryId) ?? categories[0],
            [categories, effectiveCategoryId]
          ),
          derivedSectionIdByParentKey = (0, react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
            const mapping = {};
            return (
              sections.forEach((section) => {
                section.key && (mapping[section.key] = section.id);
              }),
              mapping
            );
          }, [sections]),
          finalSectionIdByParentKey = sectionIdByParentKey ?? derivedSectionIdByParentKey;
        (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
          setMounted(!0);
        }, []);
        const close = () => {
            (setIsOpen(!1),
              requestAnimationFrame(() => {
                triggerRef.current?.focus();
              }));
          },
          handleParentClick = (parentKey) => {
            onCategoryChange(parentKey);
            const firstSubValue = ((parentKey) => {
              const sectionId = finalSectionIdByParentKey[parentKey];
              if (!sectionId) return null;
              const section = sections.find((s) => s.id === sectionId),
                first = section?.options?.[0];
              return first?.value ?? null;
            })(parentKey);
            (close(),
              null != firstSubValue &&
                onSubCategoryChange &&
                queueMicrotask(() => {
                  onSubCategoryChange(firstSubValue);
                }));
          };
        if (
          ((0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!isOpen) return;
            const handleKeyDown = (event) => {
              'Escape' === event.key && close();
            };
            return (
              document.addEventListener('keydown', handleKeyDown),
              () => document.removeEventListener('keydown', handleKeyDown)
            );
          }, [isOpen]),
          (0, react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
            if (!isOpen) return;
            const prevOverflow = document.body.style.overflow;
            return (
              (document.body.style.overflow = 'hidden'),
              () => {
                document.body.style.overflow = prevOverflow;
              }
            );
          }, [isOpen]),
          !categories.length || !activeOption)
        )
          return null;
        const overlay = (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
          className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
            'fixed inset-0 z-menu tablet:hidden',
            'transition-opacity duration-200',
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          ),
          onClick: (event) => {
            null === event.target.closest('[role="dialog"]') && close();
          },
          role: 'button',
          tabIndex: 0,
          'aria-label': '오버레이 닫기',
          onKeyDown: (e) => {
            ('Enter' !== e.key && ' ' !== e.key) || close();
          },
          children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
              'absolute left-0 right-0 top-56 w-full',
              'bg-white/95 backdrop-blur-sm',
              'py-24',
              'shadow-lg',
              'transform transition-transform duration-200 ease-out',
              isOpen ? 'translate-y-0' : '-translate-y-full'
            ),
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': '카테고리 선택',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: 'px-24',
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('ul', {
                className: 'flex flex-col gap-10 max-h-[60vh] overflow-y-auto',
                role: 'listbox',
                'aria-label': '카테고리 목록',
                children: categories.map((category) => {
                  const isActive = category.id === effectiveCategoryId;
                  return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    'li',
                    {
                      children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('button', {
                        type: 'button',
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'w-full text-center text-16 py-12',
                          'transition-colors',
                          isActive
                            ? 'font-semibold text-gray-950'
                            : 'font-normal text-gray-400 hover:text-gray-800',
                          'cursor-pointer'
                        ),
                        role: 'option',
                        'aria-selected': isActive,
                        onClick: (e) => {
                          (e.stopPropagation(), handleParentClick(category.id));
                        },
                        children: category.label,
                      }),
                    },
                    category.id
                  );
                }),
              }),
            }),
          }),
        });
        return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
          {
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                  'relative flex items-center justify-start tablet:hidden',
                  className
                ),
                children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                  ref: triggerRef,
                  type: 'button',
                  className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                    'flex justify-end items-center gap-10',
                    'px-8 py-4 rounded-999',
                    'text-16 font-medium text-gray-950',
                    'active:scale-[0.97] transition-transform',
                    'cursor-pointer'
                  ),
                  onClick: () => {
                    categories.length && setIsOpen((prev) => !prev);
                  },
                  'aria-haspopup': 'dialog',
                  'aria-expanded': isOpen,
                  'aria-label': '카테고리 선택',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                      children: activeOption.label,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      next_image__WEBPACK_IMPORTED_MODULE_3__.A,
                      {
                        src: '/icons/arrow-down.svg',
                        alt: '',
                        width: 12,
                        height: 7,
                        className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_4__.A)(
                          'transition-transform duration-200',
                          isOpen && 'rotate-180'
                        ),
                        'aria-hidden': 'true',
                      }
                    ),
                  ],
                }),
              }),
              mounted &&
                isOpen &&
                (0, react_dom__WEBPACK_IMPORTED_MODULE_2__.createPortal)(overlay, document.body),
            ],
          }
        );
      };
      GNBCategorySwitcher.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'GNBCategorySwitcher',
        props: {
          categories: {
            required: !0,
            tsType: {
              name: 'Array',
              elements: [{ name: 'ParentCategoryOption' }],
              raw: 'CategoryOption[]',
            },
            description: "대분류 카테고리 리스트\n예: [{ id: 'drink', label: '음료' }]",
          },
          categorySections: {
            required: !1,
            tsType: {
              name: 'Array',
              elements: [{ name: 'CategorySection' }],
              raw: 'CategorySection[]',
            },
            description:
              "대분류별 소분류 카테고리 섹션\n예: [{ id: 2, title: '음료', options: [{ value: 201, label: '탄산음료' }, ...] }]",
          },
          sectionIdByParentKey: {
            required: !1,
            tsType: {
              name: 'Partial',
              elements: [
                {
                  name: 'Record',
                  elements: [{ name: 'ParentCategoryKey' }, { name: 'number' }],
                  raw: 'Record<ParentCategoryKey, number>',
                },
              ],
              raw: 'Partial<Record<ParentCategoryKey, number>>',
            },
            description:
              'ParentCategoryKey -> CategorySection.id(number) 매핑\n\nParentCategoryKey는 문자열 키(\'drink\')이고,\ncategorySections의 id는 number(2)인 구조이므로\n"대분류 클릭 시 해당 섹션의 첫 소분류로 이동" UX를 구현하려면 매핑이 필요합니다.\n\n예: { drink: 2, snack: 1 }',
          },
          activeCategoryId: {
            required: !0,
            tsType: { name: 'ParentCategoryKey' },
            description: '현재 선택된 카테고리 ID\n예: "drink"',
          },
          productCategoryId: {
            required: !1,
            tsType: { name: 'ParentCategoryKey' },
            description:
              '상품의 대분류 ID (상품 상세 페이지에서 사용)\n이 값이 있으면 activeCategoryId보다 우선적으로 표시됩니다.\n예: "drink"',
          },
          onCategoryChange: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(id: ParentCategoryKey) => void',
              signature: {
                arguments: [{ type: { name: 'ParentCategoryKey' }, name: 'id' }],
                return: { name: 'void' },
              },
            },
            description:
              '카테고리 변경 시 호출되는 콜백\n카테고리 클릭 → 부모(GNB 또는 페이지)에서 URL 업데이트 or 상태 업데이트 처리',
          },
          onSubCategoryChange: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '(subCategoryId: number) => void',
              signature: {
                arguments: [{ type: { name: 'number' }, name: 'subCategoryId' }],
                return: { name: 'void' },
              },
            },
            description: '소분류 카테고리 선택 시 호출되는 콜백 (선택 사항)',
          },
          className: {
            required: !1,
            tsType: { name: 'string' },
            description:
              "추가 스타일링용 className\n(모바일 전용 노출: 'mobile:flex tablet:hidden' 과 함께 사용 가능)",
          },
        },
      };
    },
  },
]);
