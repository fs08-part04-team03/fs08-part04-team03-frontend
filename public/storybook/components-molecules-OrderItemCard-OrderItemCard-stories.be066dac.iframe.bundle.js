'use strict';
(self.webpackChunkproject_name = self.webpackChunkproject_name || []).push([
  [9751],
  {
    './src/components/molecules/OrderItemCard/OrderItemCard.stories.tsx'(
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) {
      (__webpack_require__.r(__webpack_exports__),
        __webpack_require__.d(__webpack_exports__, {
          Confirm: () => Confirm,
          Default: () => Default,
          __namedExportsOrder: () => __namedExportsOrder,
          default: () => __WEBPACK_DEFAULT_EXPORT__,
        }));
      var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/jsx-runtime.js'
        ),
        react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          './node_modules/next/dist/compiled/react/index.js'
        ),
        _OrderItemCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          './src/components/molecules/OrderItemCard/OrderItemCard.tsx'
        );
      const __WEBPACK_DEFAULT_EXPORT__ = {
          title: 'Molecules/OrderItemCard',
          component: _OrderItemCard__WEBPACK_IMPORTED_MODULE_2__.q,
          tags: ['autodocs'],
          parameters: {
            layout: 'padded',
            docs: {
              description: {
                component:
                  '주문 상품 카드 컴포넌트입니다. variant에 따라 다른 레이아웃을 제공합니다.\n\n- `default`: 체크박스, 이미지, 제목, 금액, 배송비, NumberInput, 총 금액, 즉시 구매 버튼\n- `confirm`: 이미지, 제목, 금액, 수량, 금액',
              },
            },
          },
          argTypes: {
            variant: {
              control: 'radio',
              options: ['default', 'confirm'],
              description: '카드 variant 타입',
            },
            onQuantityChange: { action: 'quantity-changed' },
            onPurchaseClick: { action: 'purchase-clicked' },
            onCheckboxChange: { action: 'checkbox-changed' },
          },
        },
        Default = {
          render: (args) => {
            const [quantity, setQuantity] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(
                args.quantity ?? 1
              ),
              [checked, setChecked] = (0, react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1);
            return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _OrderItemCard__WEBPACK_IMPORTED_MODULE_2__.q,
              {
                variant: args.variant,
                name: args.name,
                unitPrice: args.unitPrice,
                quantity,
                shippingCost: args.shippingCost,
                shippingLabelText: args.shippingLabelText,
                imageSrc: args.imageSrc,
                checked,
                onCheckboxChange: (newChecked) => {
                  (setChecked(newChecked), args.onCheckboxChange?.(newChecked));
                },
                onQuantityChange: (option) => {
                  (setQuantity(Number(option.key)), args.onQuantityChange?.(option));
                },
                onPurchaseClick: args.onPurchaseClick,
                className: args.className,
              }
            );
          },
          args: {
            variant: 'default',
            name: '코카콜라 제로',
            unitPrice: 2e3,
            quantity: 1,
            shippingCost: 0,
          },
        },
        Confirm = {
          render: (args) =>
            (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _OrderItemCard__WEBPACK_IMPORTED_MODULE_2__.q,
              {
                variant: args.variant,
                name: args.name,
                unitPrice: args.unitPrice,
                quantity: args.quantity,
                imageSrc: args.imageSrc,
                className: args.className,
              }
            ),
          args: { variant: 'confirm', name: '코카콜라 제로', unitPrice: 2e3, quantity: 3 },
        },
        __namedExportsOrder = ['Default', 'Confirm'];
      ((Default.parameters = {
        ...Default.parameters,
        docs: {
          ...Default.parameters?.docs,
          source: {
            originalSource:
              "{\n  render: args => {\n    const [quantity, setQuantity] = useState(args.quantity ?? 1);\n    const [checked, setChecked] = useState(false);\n    return <OrderItemCard variant={args.variant} name={args.name} unitPrice={args.unitPrice} quantity={quantity} shippingCost={args.shippingCost} shippingLabelText={args.shippingLabelText} imageSrc={args.imageSrc} checked={checked} onCheckboxChange={newChecked => {\n      setChecked(newChecked);\n      args.onCheckboxChange?.(newChecked);\n    }} onQuantityChange={option => {\n      setQuantity(Number(option.key));\n      args.onQuantityChange?.(option);\n    }} onPurchaseClick={args.onPurchaseClick} className={args.className} />;\n  },\n  args: {\n    variant: 'default',\n    name: '코카콜라 제로',\n    unitPrice: 2000,\n    quantity: 1,\n    shippingCost: 0\n  }\n}",
            ...Default.parameters?.docs?.source,
          },
        },
      }),
        (Confirm.parameters = {
          ...Confirm.parameters,
          docs: {
            ...Confirm.parameters?.docs,
            source: {
              originalSource:
                "{\n  render: args => <OrderItemCard variant={args.variant} name={args.name} unitPrice={args.unitPrice} quantity={args.quantity} imageSrc={args.imageSrc} className={args.className} />,\n  args: {\n    variant: 'confirm',\n    name: '코카콜라 제로',\n    unitPrice: 2000,\n    quantity: 3\n  }\n}",
              ...Confirm.parameters?.docs?.source,
            },
          },
        }));
    },
  },
]);
