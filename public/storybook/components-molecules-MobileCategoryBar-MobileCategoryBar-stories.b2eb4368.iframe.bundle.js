'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7467],
  {
    './src/components/molecules/MobileCategoryBar/MobileCategoryBar.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          ChildCategory: () => ChildCategory,
          ParentCategory: () => ParentCategory,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/MobileCategoryBar',
          component: __webpack_require__(
            './src/components/molecules/MobileCategoryBar/MobileCategoryBar.tsx'
          )._,
          parameters: {
            layout: 'fullscreen',
            docs: {
              description: {
                component:
                  '\n모바일 환경에서 선택된 카테고리를 표시하는 바 컴포넌트입니다.\n\n### 주요 기능\n- 선택된 카테고리를 상단 바에 표시\n- 대분류만 선택 시: "스낵" 형식으로 표시\n- 소분류까지 선택 시: "스낵 · 과자" 형식으로 표시\n- 클릭 시 카테고리 선택 모달을 열 수 있음\n- 모바일 전용 (tablet 이상에서는 숨김 처리)\n\n### 카테고리 ID 체계\n#### 대분류 (1~7)\n- 1: 스낵\n- 2: 음료\n- 3: 생수\n- 4: 간편식\n- 5: 신선식\n- 6: 원두커피\n- 7: 비품\n\n#### 소분류 (101~)\n- 스낵(1): 101~108 (과자, 쿠키, 비스켓류, 초콜릿류, 캔디류, 젤리류, 시리얼바, 견과류)\n- 음료(2): 201~206 (탄산음료, 과즙음료, 에너지음료, 이온음료, 건강음료, 차류)\n- 생수(3): 301~302 (생수, 스파클링)\n- 간편식(4): 401~405 (컵라면, 소시지, 계란, 컵밥류, 시리얼)\n- 신선식(5): 501~506 (과일, 샐러드, 빵, 샌드위치, 요거트류, 유제품)\n- 원두커피(6): 601~603 (드립커피, 원두, 캡슐커피)\n- 비품(7): 701~704 (일회용품, 사무용품, 청소용품, 위생용품)\n\n### 사용 예시\n```tsx\n// 대분류만 선택\n<MobileCategoryBar\n  categoryId={1}\n  onClick={() => openCategoryModal()}\n/>\n\n// 소분류까지 선택\n<MobileCategoryBar\n  categoryId={101}\n  onClick={() => openCategoryModal()}\n/>\n```\n        ',
              },
            },
          },
          tags: ['autodocs'],
          argTypes: {
            categoryId: {
              control: 'number',
              description:
                '선택된 카테고리 ID. 대분류(1~7) 또는 소분류(101~, 201~...)를 지정할 수 있습니다.',
              table: {
                type: { summary: 'number | null | undefined' },
                defaultValue: { summary: 'undefined' },
              },
            },
            onClick: {
              action: 'clicked',
              description: '클릭 시 실행될 핸들러. 주로 카테고리 선택 모달을 여는 데 사용됩니다.',
              table: { type: { summary: '() => void' } },
            },
            className: {
              control: 'text',
              description: '추가 CSS 클래스명',
              table: { type: { summary: 'string' } },
            },
          },
        },
        ParentCategory = {
          args: { categoryId: 1 },
          parameters: {
            docs: {
              description: {
                story:
                  '대분류(ID: 1 = 스낵)만 선택된 경우 "스낵"으로 표시됩니다. 클릭 시 카테고리 선택 UI를 열 수 있습니다.',
              },
            },
          },
        },
        ChildCategory = {
          args: { categoryId: 101 },
          parameters: {
            docs: {
              description: {
                story:
                  '소분류(ID: 101 = 스낵 > 과자)가 선택된 경우 "스낵 · 과자"로 표시됩니다. 클릭 시 카테고리 선택 UI를 열 수 있습니다.',
              },
            },
          },
        },
        __namedExportsOrder = ['ParentCategory', 'ChildCategory'];
      ((ParentCategory.parameters = {
        ...ParentCategory.parameters,
        docs: {
          ...ParentCategory.parameters?.docs,
          source: {
            originalSource:
              '{\n  args: {\n    categoryId: 1 // 스낵\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'대분류(ID: 1 = 스낵)만 선택된 경우 "스낵"으로 표시됩니다. 클릭 시 카테고리 선택 UI를 열 수 있습니다.\'\n      }\n    }\n  }\n}',
            ...ParentCategory.parameters?.docs?.source,
          },
        },
      }),
        (ChildCategory.parameters = {
          ...ChildCategory.parameters,
          docs: {
            ...ChildCategory.parameters?.docs,
            source: {
              originalSource:
                '{\n  args: {\n    categoryId: 101 // 스낵 > 과자\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: \'소분류(ID: 101 = 스낵 > 과자)가 선택된 경우 "스낵 · 과자"로 표시됩니다. 클릭 시 카테고리 선택 UI를 열 수 있습니다.\'\n      }\n    }\n  }\n}',
              ...ChildCategory.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/components/molecules/MobileCategoryBar/MobileCategoryBar.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { _: () => MobileCategoryBar });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/@storybook/nextjs/dist/images/next-image.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          './src/constants/categories/categories.utils.ts'
        );
      const MobileCategoryBar = ({ categoryId, onClick, className }) => {
        if (!categoryId) return null;
        const childCategory = (0,
        _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__.ZV)(categoryId);
        let displayText = '';
        if (childCategory) {
          const parentCategory = (0,
          _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__.JV)(
            childCategory.parentId
          );
          displayText = parentCategory
            ? `${parentCategory.name} · ${childCategory.name}`
            : childCategory.name;
        } else {
          const parentCategory = (0,
          _constants_categories_categories_utils__WEBPACK_IMPORTED_MODULE_3__.JV)(categoryId);
          parentCategory && (displayText = parentCategory.name);
        }
        return displayText
          ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
              className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                'w-full bg-white border-b border-gray-200',
                'tablet:hidden',
                className
              ),
              children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('button', {
                type: 'button',
                onClick,
                className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_2__.A)(
                  'w-full px-24 py-16',
                  'flex items-center justify-between',
                  'text-16 font-semibold text-gray-950',
                  'hover:bg-gray-50 active:bg-gray-100',
                  'transition-colors'
                ),
                children: [
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
                    children: displayText,
                  }),
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    next_image__WEBPACK_IMPORTED_MODULE_1__.A,
                    {
                      src: '/icons/arrow-down.svg',
                      alt: '',
                      width: 12,
                      height: 12,
                      'aria-hidden': 'true',
                    }
                  ),
                ],
              }),
            })
          : null;
      };
      MobileCategoryBar.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'MobileCategoryBar',
        props: {
          categoryId: {
            required: !1,
            tsType: {
              name: 'union',
              raw: 'number | null',
              elements: [{ name: 'number' }, { name: 'null' }],
            },
            description: '선택된 카테고리 ID (대분류 or 소분류)',
          },
          onClick: {
            required: !1,
            tsType: {
              name: 'signature',
              type: 'function',
              raw: '() => void',
              signature: { arguments: [], return: { name: 'void' } },
            },
            description: '클릭 핸들러',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '추가 className' },
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
  },
]);
