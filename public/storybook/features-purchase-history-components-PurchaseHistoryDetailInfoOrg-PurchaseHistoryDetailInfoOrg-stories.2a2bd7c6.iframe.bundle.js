'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [8040],
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
    './src/components/atoms/DateText/DateText.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _utils_clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        ),
        _utils_formatDate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/utils/formatDate.ts'
        );
      const DateText = ({ date, className }) => {
          const formattedDate = (0, _utils_formatDate__WEBPACK_IMPORTED_MODULE_2__.Y)(date);
          return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('span', {
            className: (0, _utils_clsx__WEBPACK_IMPORTED_MODULE_1__.A)('text-gray-950', className),
            children: formattedDate,
          });
        },
        __WEBPACK_DEFAULT_EXPORT__ = DateText;
      DateText.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'DateText',
        props: {
          date: {
            required: !0,
            tsType: {
              name: 'union',
              raw: 'string | Date',
              elements: [{ name: 'string' }, { name: 'Date' }],
            },
            description: '',
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/components/atoms/Divider/Divider.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { c: () => Divider });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/clsx/dist/clsx.mjs'
        );
      const variantClass = { thin: 'bg-gray-100', thick: 'bg-gray-950' },
        thicknessClass = { thin: 'h-px', thick: 'h-0.5' },
        Divider = ({ orientation = 'horizontal', variant = 'thin', className }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            role: 'separator',
            className: (0, clsx__WEBPACK_IMPORTED_MODULE_1__.A)(
              variantClass[variant],
              'horizontal' === orientation
                ? `w-full ${thicknessClass[variant]}`
                : 'h-full ' + ('thin' === variant ? 'w-px' : 'w-0.5'),
              className
            ),
          });
      Divider.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'Divider',
        props: {
          orientation: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'horizontal' | 'vertical'",
              elements: [
                { name: 'literal', value: "'horizontal'" },
                { name: 'literal', value: "'vertical'" },
              ],
            },
            description: '',
            defaultValue: { value: "'horizontal'", computed: !1 },
          },
          variant: {
            required: !1,
            tsType: {
              name: 'union',
              raw: "'thin' | 'thick'",
              elements: [
                { name: 'literal', value: "'thin'" },
                { name: 'literal', value: "'thick'" },
              ],
            },
            description: '',
            defaultValue: { value: "'thin'", computed: !1 },
          },
          className: { required: !1, tsType: { name: 'string' }, description: '' },
        },
      };
    },
    './src/features/purchase-history/components/PurchaseHistoryDetailInfoOrg/PurchaseHistoryDetailInfoOrg.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          LongRequestMessage: () => LongRequestMessage,
          Rejected: () => Rejected,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryDetailInfoOrg',
          component: __webpack_require__(
            './src/features/purchase-history/components/PurchaseHistoryDetailInfoOrg/PurchaseHistoryDetailInfoOrg.tsx'
          ).A,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '구매 내역의 상세 정보를 표시하는 Organism 컴포넌트입니다.\n\n**주요 기능:**\n- 요청 정보(요청인, 요청 날짜, 요청 메시지) 표시\n- 승인 정보(담당자, 승인 날짜, 상태, 결과 메시지) 표시\n- 반응형 레이아웃 지원 (모바일: 단일 열, 태블릿/데스크톱: 2열 그리드)\n\n**반응형 구조:**\n- **모바일**: 각 필드가 별도 행으로 표시 (140px 라벨 + 1fr 값)\n- **태블릿/데스크톱**: 2개 필드가 한 행에 2x2 그리드로 표시 (140px_1fr_140px_1fr)\n- 텍스트 크기: 모바일 14px, 태블릿/데스크톱 16px\n\n**구성 컴포넌트:**\n- `InfoSection`: 섹션 제목과 Divider를 포함한 래퍼\n- `InfoRowTwoColumns`: 2개 필드를 반응형으로 표시하는 행\n- `InfoRowSingle`: 단일 필드를 전체 너비로 표시하는 행',
              },
            },
          },
        },
        mockPurchaseRequest = {
          id: 'req-1',
          createdAt: '2025-07-05T09:30:00.000Z',
          updatedAt: '2025-07-05T09:30:00.000Z',
          itemsTotalPrice: 42e3,
          shippingFee: 3e3,
          finalTotalPrice: 45e3,
          totalPrice: 45e3,
          status: 'PENDING',
          purchaseItems: [
            {
              id: 'item-1',
              quantity: 2,
              priceSnapshot: 15e3,
              itemTotal: 3e4,
              products: { id: 1, name: '코카콜라 제로' },
            },
            {
              id: 'item-2',
              quantity: 1,
              priceSnapshot: 12e3,
              itemTotal: 12e3,
              products: { id: 2, name: '펩시콜라' },
            },
          ],
          requester: { id: 'user-1', name: '김스낵', email: 'snack@example.com' },
          urgent: !1,
          requestMessage: '회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.',
          reason: '',
        },
        Default = {
          args: {
            purchaseRequest: {
              ...mockPurchaseRequest,
              status: 'APPROVED',
              updatedAt: '2025-07-05T14:20:00.000Z',
            },
            approvedInfo: {
              approverName: '김코드',
              approvalDate: '2025-07-05T14:20:00.000Z',
              statusLabel: '승인',
              resultMessage: '승인되었습니다.',
            },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '승인 정보가 포함된 전체 상세 정보를 표시합니다.\n\n**요청 정보:**\n- 요청인: 김스낵\n- 요청 날짜: 2025년 7월 5일 09:30\n- 요청 메시지: 회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.\n\n**승인 정보:**\n- 담당자: 김코드\n- 승인 날짜: 2025년 7월 5일 14:20 (요청 후 약 5시간 후 승인)\n- 상태: 승인\n- 결과 메시지: 승인되었습니다.\n\n**레이아웃 구조:**\n- 요청 정보 섹션 (InfoSection)\n- 승인 정보 섹션 (InfoSection)\n- 각 섹션 사이에 `desktop:gap-y-50` 간격 적용\n\n**사용 시나리오:**\n- 승인된 구매 요청의 전체 정보 조회\n- APPROVED 상태의 요청 상세 정보 표시',
              },
            },
          },
        },
        LongRequestMessage = {
          args: {
            purchaseRequest: {
              ...mockPurchaseRequest,
              status: 'APPROVED',
              updatedAt: '2025-07-05T14:20:00.000Z',
              requestMessage:
                '이번 프로젝트를 위해 다음 물품들이 필요합니다. 회의실에서 사용할 음료와 간식이 필요하며, 팀원 모두가 함께 즐길 수 있는 품목으로 선정했습니다. 특히 코카콜라 제로는 건강을 생각하는 팀원들을 위한 선택이며, 펩시콜라는 다양한 취향을 고려한 것입니다. 가능한 한 빠른 배송을 부탁드리며, 배송 시 회의실 앞에 직접 배치해 주시면 감사하겠습니다. 추가로 영수증 발급도 함께 요청드립니다.',
            },
            approvedInfo: {
              approverName: '김코드',
              approvalDate: '2025-07-05T14:20:00.000Z',
              statusLabel: '승인',
              resultMessage: '승인되었습니다.',
            },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '긴 요청 메시지가 포함된 상세 정보입니다.\n\n**긴 메시지 처리:**\n- 요청 메시지가 여러 줄로 표시됨\n- `wrap-break-word` 클래스로 긴 단어도 자동 줄바꿈\n- fullWidth 옵션으로 `grid-cols-[140px_3fr]` 사용하여 메시지 영역 확보\n\n**레이아웃 특징:**\n- 모바일: 라벨(140px) + 메시지(3fr)\n- 태블릿/데스크톱: 동일하게 140px + 3fr 그리드\n- 메시지 텍스트는 자동 줄바꿈되어 가독성 유지\n\n**사용 시나리오:**\n- 상세한 구매 사유가 필요한 경우\n- 배송 요청사항이 포함된 경우\n- 복잡한 구매 건에 대한 설명이 필요한 경우',
              },
            },
          },
        },
        Rejected = {
          args: {
            purchaseRequest: {
              ...mockPurchaseRequest,
              status: 'REJECTED',
              updatedAt: '2025-07-05T11:15:00.000Z',
            },
            approvedInfo: {
              approverName: '박관리',
              approvalDate: '2025-07-05T11:15:00.000Z',
              statusLabel: '반려',
              resultMessage: '예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.',
            },
          },
          parameters: {
            docs: {
              description: {
                story:
                  '반려된 구매 요청의 상세 정보를 표시합니다.\n\n**요청 정보:**\n- 요청인: 김스낵\n- 요청 날짜: 2025년 7월 5일 09:30\n- 요청 메시지: 회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.\n\n**승인 정보:**\n- 담당자: 박관리\n- 승인 날짜: 2025년 7월 5일 11:15 (요청 후 약 2시간 후 반려)\n- 상태: 반려\n- 결과 메시지: 예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.\n\n**반려 시나리오 특징:**\n- 결과 메시지에 반려 사유가 상세히 기재됨\n- 상태 라벨이 "반려"로 표시\n- 승인 날짜는 반려 처리된 시각을 나타냄\n\n**사용 시나리오:**\n- REJECTED 상태의 요청 상세 정보 표시\n- 반려 사유 확인 및 재요청 판단\n- 예산 초과, 정책 위반 등의 사유로 거절된 경우',
              },
            },
          },
        },
        __namedExportsOrder = ['Default', 'LongRequestMessage', 'Rejected'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      status: 'APPROVED',\n      updatedAt: '2025-07-05T14:20:00.000Z'\n    },\n    approvedInfo: {\n      approverName: '김코드',\n      approvalDate: '2025-07-05T14:20:00.000Z',\n      statusLabel: '승인',\n      resultMessage: '승인되었습니다.'\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '승인 정보가 포함된 전체 상세 정보를 표시합니다.\\n\\n**요청 정보:**\\n- 요청인: 김스낵\\n- 요청 날짜: 2025년 7월 5일 09:30\\n- 요청 메시지: 회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.\\n\\n**승인 정보:**\\n- 담당자: 김코드\\n- 승인 날짜: 2025년 7월 5일 14:20 (요청 후 약 5시간 후 승인)\\n- 상태: 승인\\n- 결과 메시지: 승인되었습니다.\\n\\n**레이아웃 구조:**\\n- 요청 정보 섹션 (InfoSection)\\n- 승인 정보 섹션 (InfoSection)\\n- 각 섹션 사이에 `desktop:gap-y-50` 간격 적용\\n\\n**사용 시나리오:**\\n- 승인된 구매 요청의 전체 정보 조회\\n- APPROVED 상태의 요청 상세 정보 표시'\n      }\n    }\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (LongRequestMessage.parameters = {
          ...LongRequestMessage.parameters,
          docs: {
            ...LongRequestMessage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      status: 'APPROVED',\n      updatedAt: '2025-07-05T14:20:00.000Z',\n      requestMessage: '이번 프로젝트를 위해 다음 물품들이 필요합니다. 회의실에서 사용할 음료와 간식이 필요하며, 팀원 모두가 함께 즐길 수 있는 품목으로 선정했습니다. 특히 코카콜라 제로는 건강을 생각하는 팀원들을 위한 선택이며, 펩시콜라는 다양한 취향을 고려한 것입니다. 가능한 한 빠른 배송을 부탁드리며, 배송 시 회의실 앞에 직접 배치해 주시면 감사하겠습니다. 추가로 영수증 발급도 함께 요청드립니다.'\n    },\n    approvedInfo: {\n      approverName: '김코드',\n      approvalDate: '2025-07-05T14:20:00.000Z',\n      statusLabel: '승인',\n      resultMessage: '승인되었습니다.'\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '긴 요청 메시지가 포함된 상세 정보입니다.\\n\\n**긴 메시지 처리:**\\n- 요청 메시지가 여러 줄로 표시됨\\n- `wrap-break-word` 클래스로 긴 단어도 자동 줄바꿈\\n- fullWidth 옵션으로 `grid-cols-[140px_3fr]` 사용하여 메시지 영역 확보\\n\\n**레이아웃 특징:**\\n- 모바일: 라벨(140px) + 메시지(3fr)\\n- 태블릿/데스크톱: 동일하게 140px + 3fr 그리드\\n- 메시지 텍스트는 자동 줄바꿈되어 가독성 유지\\n\\n**사용 시나리오:**\\n- 상세한 구매 사유가 필요한 경우\\n- 배송 요청사항이 포함된 경우\\n- 복잡한 구매 건에 대한 설명이 필요한 경우'\n      }\n    }\n  }\n}",
              ...LongRequestMessage.parameters?.docs?.source,
            },
          },
        }),
        (Rejected.parameters = {
          ...Rejected.parameters,
          docs: {
            ...Rejected.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    purchaseRequest: {\n      ...mockPurchaseRequest,\n      status: 'REJECTED',\n      updatedAt: '2025-07-05T11:15:00.000Z'\n    },\n    approvedInfo: {\n      approverName: '박관리',\n      approvalDate: '2025-07-05T11:15:00.000Z',\n      statusLabel: '반려',\n      resultMessage: '예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.'\n    }\n  },\n  parameters: {\n    docs: {\n      description: {\n        story: '반려된 구매 요청의 상세 정보를 표시합니다.\\n\\n**요청 정보:**\\n- 요청인: 김스낵\\n- 요청 날짜: 2025년 7월 5일 09:30\\n- 요청 메시지: 회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.\\n\\n**승인 정보:**\\n- 담당자: 박관리\\n- 승인 날짜: 2025년 7월 5일 11:15 (요청 후 약 2시간 후 반려)\\n- 상태: 반려\\n- 결과 메시지: 예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.\\n\\n**반려 시나리오 특징:**\\n- 결과 메시지에 반려 사유가 상세히 기재됨\\n- 상태 라벨이 \"반려\"로 표시\\n- 승인 날짜는 반려 처리된 시각을 나타냄\\n\\n**사용 시나리오:**\\n- REJECTED 상태의 요청 상세 정보 표시\\n- 반려 사유 확인 및 재요청 판단\\n- 예산 초과, 정책 위반 등의 사유로 거절된 경우'\n      }\n    }\n  }\n}",
              ...Rejected.parameters?.docs?.source,
            },
          },
        }));
    },
    './src/features/purchase-history/components/PurchaseHistoryDetailInfoOrg/PurchaseHistoryDetailInfoOrg.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      __webpack_require__.d(__webpack_exports__, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './src/components/atoms/Divider/Divider.tsx'
        ),
        _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/atoms/DateText/DateText.tsx'
        );
      const InfoSection = ({ title, children }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: 'flex flex-col',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('h2', {
                className: 'font-bold text-14 tablet:text-16 py-14',
                children: title,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _components_atoms_Divider_Divider__WEBPACK_IMPORTED_MODULE_1__.c,
                { orientation: 'horizontal', variant: 'thick' }
              ),
              children,
            ],
          }),
        InfoRowTwoColumns = ({ label1, value1, label2, value2 }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,
            {
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'grid grid-cols-[140px_1fr] border-b border-gray-100 tablet:hidden',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 border-r border-gray-100 py-8 px-16 tablet:px-20',
                      children: label1,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 py-8 px-16 tablet:px-20',
                      children: value1,
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className: 'grid grid-cols-[140px_1fr] border-b border-gray-100 tablet:hidden',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 border-r border-gray-100 py-8 px-16 tablet:px-20',
                      children: label2,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-14 py-8 px-16 tablet:px-20',
                      children: value2,
                    }),
                  ],
                }),
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
                  className:
                    'hidden tablet:grid grid-cols-[140px_1fr_140px_1fr] border-b border-gray-100',
                  children: [
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 border-r border-gray-100 py-8 px-20',
                      children: label1,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 border-r border-gray-100 py-8 px-20',
                      children: value1,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 border-r border-gray-100 py-8 px-20',
                      children: label2,
                    }),
                    (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                      className: 'text-16 py-8 px-20',
                      children: value2,
                    }),
                  ],
                }),
              ],
            }
          ),
        InfoRowSingle = ({ label, value, fullWidth = !1 }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className: `grid ${fullWidth ? 'grid-cols-[140px_3fr]' : 'grid-cols-[140px_1fr]'} border-b border-gray-100`,
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className:
                  'text-14 tablet:text-16 border-r border-gray-100 py-8 px-16 tablet:px-20',
                children: label,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('p', {
                className: 'text-14 tablet:text-16 py-8 px-16 tablet:px-20 wrap-break-words',
                children: value,
              }),
            ],
          }),
        RequestInfo = ({ requester, createdAt, requestMessage }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)('div', {
            className: 'pt-30',
            children: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoSection, {
              title: '요청 정보',
              children: [
                (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowTwoColumns, {
                  label1: '요청인',
                  value1: requester.name,
                  label2: '요청 날짜',
                  value2: (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_2__.A,
                    { date: createdAt, className: 'text-14 tablet:text-16' }
                  ),
                }),
                requestMessage &&
                  (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowSingle, {
                    label: '요청 메시지',
                    value: requestMessage,
                    fullWidth: !0,
                  }),
              ],
            }),
          }),
        ApprovedInfo = ({ approverName, approvalDate, statusLabel, resultMessage }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(InfoSection, {
            title: '승인 정보',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowTwoColumns, {
                label1: '담당자',
                value1: approverName,
                label2: '승인 날짜',
                value2: approvalDate
                  ? (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                      _components_atoms_DateText_DateText__WEBPACK_IMPORTED_MODULE_2__.A,
                      { date: approvalDate, className: 'text-14 tablet:text-16' }
                    )
                  : '-',
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(InfoRowTwoColumns, {
                label1: '상태',
                value1: statusLabel,
                label2: '결과 메시지',
                value2: resultMessage,
              }),
            ],
          }),
        PurchaseHistoryDetailInfoOrg = ({ purchaseRequest, approvedInfo }) =>
          (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)('div', {
            className:
              'flex flex-col gap-30 w-full px-24 tablet:px-0 tablet:w-696 desktop:w-1200 desktop:mx-0',
            children: [
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RequestInfo, {
                requester: purchaseRequest.requester,
                createdAt: purchaseRequest.createdAt,
                requestMessage: purchaseRequest.requestMessage,
              }),
              (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ApprovedInfo, {
                approverName: approvedInfo.approverName,
                approvalDate: approvedInfo.approvalDate,
                statusLabel: approvedInfo.statusLabel,
                resultMessage: approvedInfo.resultMessage,
              }),
            ],
          }),
        __WEBPACK_DEFAULT_EXPORT__ = PurchaseHistoryDetailInfoOrg;
      PurchaseHistoryDetailInfoOrg.__docgenInfo = {
        description: '',
        methods: [],
        displayName: 'PurchaseHistoryDetailInfoOrg',
        props: {
          purchaseRequest: {
            required: !0,
            tsType: { name: 'PurchaseRequestItem' },
            description: '',
          },
          approvedInfo: {
            required: !0,
            tsType: {
              name: 'signature',
              type: 'object',
              raw: '{\n  approverName: string;\n  approvalDate: string | null;\n  statusLabel: string;\n  resultMessage: string;\n}',
              signature: {
                properties: [
                  { key: 'approverName', value: { name: 'string', required: !0 } },
                  {
                    key: 'approvalDate',
                    value: {
                      name: 'union',
                      raw: 'string | null',
                      elements: [{ name: 'string' }, { name: 'null' }],
                      required: !0,
                    },
                  },
                  { key: 'statusLabel', value: { name: 'string', required: !0 } },
                  { key: 'resultMessage', value: { name: 'string', required: !0 } },
                ],
              },
            },
            description: '',
          },
        },
      };
    },
    './src/utils/formatDate.ts'(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      function formatDate(dateInput) {
        const dateObj = dateInput instanceof Date ? dateInput : new Date(dateInput);
        if (Number.isNaN(dateObj.getTime())) return '-';
        return `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;
      }
      __webpack_require__.d(__webpack_exports__, { Y: () => formatDate });
    },
  },
]);
