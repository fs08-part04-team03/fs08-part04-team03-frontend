'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [348],
  {
    './src/features/products/components/RegisteredProductOrg/RegisteredProductOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          Empty: () => Empty,
          SingleProduct: () => SingleProduct,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const mockProducts = [
          {
            id: 1,
            categoryLabel: '청량 · 탄산음료',
            name: '코카콜라 제로',
            price: 2e3,
            imageSrc: '/images/sample/coke-zero.png',
            link: 'https://www.coca-cola.com/products/coke-zero',
          },
          {
            id: 2,
            categoryLabel: '커피 · 음료',
            name: '아메리카노',
            price: 4500,
            imageSrc: '/images/sample/americano.png',
            link: 'https://www.starbucks.com/products/americano',
          },
          {
            id: 3,
            categoryLabel: '유제품',
            name: '서울우유 1L',
            price: 3200,
            imageSrc: '/images/sample/milk.png',
            link: 'https://www.seoulmilk.co.kr/products/milk-1l',
          },
        ],
        __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/Products/Organisms/RegisteredProductOrg',
          component: __webpack_require__(
            './src/features/products/components/RegisteredProductOrg/RegisteredProductOrg.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '\n조직/파트너 환경에서 **등록된 상품 목록을 날짜 단위로 묶어 보여주는 Organism 컴포넌트**입니다.\n\n---\n\n## 📌 주요 역할\n\n- 특정 날짜에 등록된 **상품 리스트 그룹 표현**\n- Product List 내부에 **날짜 + 총 상품 수 헤더 포함**\n- 상품 단위로 **카테고리 / 상품명 / 가격 / 출처 주소** 제공\n- Divider를 활용한 리스트 구분\n\n---\n\n## 🧩 UI 구조\n\n### 1️⃣ Product List (ul)\nProduct List 내부는 다음 순서로 구성됩니다.\n\n#### ▸ Header 영역 (리스트 최상단)\n- **날짜**\n  - ex) `2024.07.04`\n  - 리스트 그룹의 기준 날짜\n- **총 등록 상품 수**\n  - `총 등록한 상품 N개`\n  - products.length 기반 자동 계산\n- **Divider**\n  - 헤더와 상품 리스트 구분\n\n---\n\n### 2️⃣ 상품 아이템 영역 (li)\n각 상품은 다음 정보를 포함합니다.\n\n- **상품 이미지**\n  - 90×90 고정 박스\n  - 중앙 정렬\n- **카테고리 라벨**\n  - ex) 청량 · 탄산음료\n- **상품명**\n- **가격**\n  - 천 단위 콤마 + `원`\n- **주소**\n  - 상품 등록 출처 정보\n- **하단 Divider**\n  - 상품 간 시각적 구분\n\n---\n\n## ⚠️ 참고 사항\n\n- 본 컴포넌트는 **순수 UI 컴포넌트**\n- 클릭 이벤트 / 라우팅 / API 연동 없음\n- Product List 내부에 Header가 포함된 구조\n- 날짜별 여러 리스트를 쌓는 형태로 확장 가능\n- 모바일 기준 px 고정 레이아웃\n\n---\n\n## 💡 사용 예시\n\n- 조직 관리자 상품 등록 내역\n- 파트너 상품 관리 페이지\n- 날짜별 상품 히스토리 리스트\n        ',
              },
            },
          },
          argTypes: {
            products: { control: 'object', description: '해당 날짜에 등록된 상품 목록' },
          },
          args: { products: mockProducts, totalCount: mockProducts.length },
        },
        Default = { name: '기본 / 상품 여러 개' },
        SingleProduct = { name: '단일 상품', args: { products: [mockProducts[0]], totalCount: 1 } },
        Empty = { name: '상품 없음', args: { products: [], totalCount: 0 } },
        __namedExportsOrder = ['Default', 'SingleProduct', 'Empty'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource: "{\n  name: '기본 / 상품 여러 개'\n}",
            ...Default.parameters?.docs?.source,
          },
          description: {
            story: '=====================\nDefault\n======================',
            ...Default.parameters?.docs?.description,
          },
        },
      }),
        (SingleProduct.parameters = {
          ...SingleProduct.parameters,
          docs: {
            ...SingleProduct.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: '단일 상품',\n  args: {\n    products: [mockProducts[0]!],\n    totalCount: 1\n  }\n}",
              ...SingleProduct.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nSingle Product\n======================',
              ...SingleProduct.parameters?.docs?.description,
            },
          },
        }),
        (Empty.parameters = {
          ...Empty.parameters,
          docs: {
            ...Empty.parameters?.docs,
            source: {
              originalSource:
                "{\n  name: '상품 없음',\n  args: {\n    products: [],\n    totalCount: 0\n  }\n}",
              ...Empty.parameters?.docs?.source,
            },
            description: {
              story: '=====================\nEmpty\n======================',
              ...Empty.parameters?.docs?.description,
            },
          },
        }));
    },
  },
]);
