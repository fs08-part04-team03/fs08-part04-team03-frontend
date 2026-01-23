'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [3747],
  {
    './src/components/molecules/OrderItemDetailCard/OrderItemDetailCard.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Default: () => Default,
          HighPrice: () => HighPrice,
          MultipleQuantity: () => MultipleQuantity,
          WithoutImage: () => WithoutImage,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/OrderItemDetailCard',
          component: __webpack_require__(
            './src/components/molecules/OrderItemDetailCard/OrderItemDetailCard.tsx'
          ).Ay,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '주문 상품 상세 카드 컴포넌트입니다. 이미지, 제목, 단가, 수량, 총 금액을 표시합니다. 반응형으로 모바일, 태블릿, 데스크탑에 맞게 자동으로 레이아웃이 변경됩니다.',
              },
            },
          },
          argTypes: {
            name: { control: 'text', description: '상품명' },
            unitPrice: { control: 'number', description: '단가' },
            quantity: { control: 'number', description: '수량' },
            imageSrc: { control: 'text', description: '이미지 URL' },
            className: { control: 'text', description: '추가 CSS 클래스' },
          },
        },
        Default = {
          args: {
            name: '코카콜라 제로',
            unitPrice: 1900,
            quantity: 2,
            imageSrc: '/images/zero-cola.svg',
          },
        },
        WithoutImage = { args: { name: '펩시 콜라', unitPrice: 2e3, quantity: 1 } },
        MultipleQuantity = {
          args: {
            name: '스프라이트',
            unitPrice: 1500,
            quantity: 5,
            imageSrc: '/images/zero-cola.svg',
          },
        },
        HighPrice = {
          args: {
            name: '프리미엄 상품',
            unitPrice: 5e4,
            quantity: 3,
            imageSrc: '/images/zero-cola.svg',
          },
        },
        __namedExportsOrder = ['Default', 'WithoutImage', 'MultipleQuantity', 'HighPrice'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  args: {\n    name: '코카콜라 제로',\n    unitPrice: 1900,\n    quantity: 2,\n    imageSrc: '/images/zero-cola.svg'\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (WithoutImage.parameters = {
          ...WithoutImage.parameters,
          docs: {
            ...WithoutImage.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    name: '펩시 콜라',\n    unitPrice: 2000,\n    quantity: 1\n  }\n}",
              ...WithoutImage.parameters?.docs?.source,
            },
          },
        }),
        (MultipleQuantity.parameters = {
          ...MultipleQuantity.parameters,
          docs: {
            ...MultipleQuantity.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    name: '스프라이트',\n    unitPrice: 1500,\n    quantity: 5,\n    imageSrc: '/images/zero-cola.svg'\n  }\n}",
              ...MultipleQuantity.parameters?.docs?.source,
            },
          },
        }),
        (HighPrice.parameters = {
          ...HighPrice.parameters,
          docs: {
            ...HighPrice.parameters?.docs,
            source: {
              originalSource:
                "{\n  args: {\n    name: '프리미엄 상품',\n    unitPrice: 50000,\n    quantity: 3,\n    imageSrc: '/images/zero-cola.svg'\n  }\n}",
              ...HighPrice.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
