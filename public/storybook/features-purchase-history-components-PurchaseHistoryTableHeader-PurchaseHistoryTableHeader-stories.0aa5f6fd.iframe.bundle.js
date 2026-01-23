'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [7948],
  {
    './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          DesktopView: () => DesktopView,
          MobileView: () => MobileView,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryTableHeader',
          component: __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.tsx'
          ).J,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '구매 내역 테이블의 헤더 컴포넌트입니다. 데스크톱 환경에서만 표시되며, 구매 요청일, 요청인, 구매 물품, 총 금액, 구매 승인일, 담당자 컬럼을 포함합니다. PurchaseHistoryTem과 PurchaseHistoryListOrg에서 재사용됩니다.',
              },
            },
          },
          argTypes: {},
        },
        Default = {
          parameters: {
            docs: {
              description: {
                story:
                  '기본 테이블 헤더입니다. 데스크톱 화면에서만 표시되며(grid 레이아웃), 모바일과 태블릿에서는 hidden 클래스로 인해 숨겨집니다. 6개의 컬럼(구매 요청일 130px, 요청인 160px, 구매 물품 1fr, 총 금액 140px, 구매 승인일 120px, 담당자 100px)을 가진 반응형 그리드 레이아웃입니다.',
              },
            },
          },
        },
        DesktopView = {
          parameters: {
            viewport: { defaultViewport: 'desktop' },
            docs: {
              description: {
                story:
                  '데스크톱 화면(1024px 이상)에서의 모습입니다. 그리드 레이아웃이 활성화되어 6개의 컬럼이 한 줄에 표시됩니다. 각 헤더 항목은 text-16(16px) 크기의 회색 텍스트로 표시되며, 하단에 border가 있습니다.',
              },
            },
          },
        },
        MobileView = {
          parameters: {
            viewport: { defaultViewport: 'mobile1' },
            docs: {
              description: {
                story:
                  '모바일 화면에서의 모습입니다. hidden desktop:grid 클래스로 인해 모바일과 태블릿에서는 완전히 숨겨지며 표시되지 않습니다. 모바일 환경에서는 다른 레이아웃 구조를 사용합니다.',
              },
            },
          },
        },
        __namedExportsOrder = ['Default', 'DesktopView', 'MobileView'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  parameters: {\n    docs: {\n      description: {\n        story: '기본 테이블 헤더입니다. 데스크톱 화면에서만 표시되며(grid 레이아웃), 모바일과 태블릿에서는 hidden 클래스로 인해 숨겨집니다. 6개의 컬럼(구매 요청일 130px, 요청인 160px, 구매 물품 1fr, 총 금액 140px, 구매 승인일 120px, 담당자 100px)을 가진 반응형 그리드 레이아웃입니다.'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (DesktopView.parameters = {
          ...DesktopView.parameters,
          docs: {
            ...DesktopView.parameters?.docs,
            source: {
              originalSource:
                "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'desktop'\n    },\n    docs: {\n      description: {\n        story: '데스크톱 화면(1024px 이상)에서의 모습입니다. 그리드 레이아웃이 활성화되어 6개의 컬럼이 한 줄에 표시됩니다. 각 헤더 항목은 text-16(16px) 크기의 회색 텍스트로 표시되며, 하단에 border가 있습니다.'\n      }\n    }\n  }\n}",
              ...DesktopView.parameters?.docs?.source,
            },
          },
        }),
        (MobileView.parameters = {
          ...MobileView.parameters,
          docs: {
            ...MobileView.parameters?.docs,
            source: {
              originalSource:
                "{\n  parameters: {\n    viewport: {\n      defaultViewport: 'mobile1'\n    },\n    docs: {\n      description: {\n        story: '모바일 화면에서의 모습입니다. hidden desktop:grid 클래스로 인해 모바일과 태블릿에서는 완전히 숨겨지며 표시되지 않습니다. 모바일 환경에서는 다른 레이아웃 구조를 사용합니다.'\n      }\n    }\n  }\n}",
              ...MobileView.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/features/purchase-history/components/PurchaseHistoryTableHeader/PurchaseHistoryTableHeader.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { J: () => PurchaseHistoryTableHeader });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _constants_labels__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/features/purchase-history/constants/labels.ts'
        );
      const PurchaseHistoryTableHeader = () =>
        (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
          className:
            'hidden desktop:grid desktop:grid-cols-[130px_160px_1fr_140px_120px_100px] desktop:gap-16 desktop:items-center desktop:h-60 w-full desktop:border-b desktop:border-gray-200',
          children: [
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700 pl-40',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.REQUEST_DATE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.REQUESTER,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.PRODUCTS,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.TOTAL_PRICE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children:
                _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.APPROVAL_DATE,
            }),
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
              className: 'text-16 text-gray-700',
              children: _constants_labels__WEBPACK_IMPORTED_MODULE_1__.l.TABLE_HEADERS.MANAGER,
            }),
          ],
        });
      PurchaseHistoryTableHeader.__docgenInfo = {
        description:
          '구매 내역 테이블 헤더 컴포넌트\nPurchaseHistoryTem과 PurchaseHistoryListOrg에서 재사용',
        methods: [],
        displayName: 'PurchaseHistoryTableHeader',
      };
    },
    './src/features/purchase-history/constants/labels.ts'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { l: () => PURCHASE_HISTORY_LABELS });
      const PURCHASE_HISTORY_LABELS = {
        PAGE_TITLE: '구매 내역 확인',
        SORT_PLACEHOLDER: '정렬',
        TABLE_HEADERS: {
          REQUEST_DATE: '구매 요청일',
          REQUESTER: '요청인',
          PRODUCTS: '구매 물품',
          TOTAL_PRICE: '총 금액',
          APPROVAL_DATE: '구매 승인일',
          MANAGER: '담당자',
        },
        ROW_LABELS: {
          REQUEST_DATE: '구매 요청일',
          REQUESTER: '요청인',
          APPROVAL_DATE: '구매 승인일',
          MANAGER: '담당자',
          TOTAL_QUANTITY: '총수량',
          TOTAL_QUANTITY_DESKTOP: '총 수량',
        },
        QUANTITY_UNIT: '개',
        TITLE: '구매 내역 확인',
        BACK_TO_LIST: '구매 내역 목록으로 돌아가기',
      };
    },
  },
]);
