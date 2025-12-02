import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductDetailHeader, {
  MobileProductDetailHeader,
  DesktopTabletProductDetailHeader,
} from './ProductDetailHeader';

const meta = {
  title: 'Molecules/ProductDetailHeader',
  component: ProductDetailHeader,
  tags: ['autodocs'],
  argTypes: {
    productName: {
      control: 'text',
      description: '제품명',
    },
    purchaseCount: {
      control: 'number',
      description: '구매 횟수',
    },
    price: {
      control: 'number',
      description: '제품 가격',
    },
    quantityOptions: {
      control: 'object',
      description: '수량 선택 옵션',
    },
    onQuantityChange: {
      action: 'quantity-changed',
      description: '수량 변경 시 호출되는 콜백 함수',
    },
    onMenuClick: {
      action: 'menu-clicked',
      description: '케밥 메뉴 클릭 시 호출되는 콜백 함수',
    },
    onAddToCart: {
      action: 'add-to-cart',
      description: '장바구니 담기 버튼 클릭 시 호출되는 콜백 함수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof ProductDetailHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({
    productName,
    purchaseCount,
    price,
    quantityOptions,
    onQuantityChange,
    onMenuClick,
    onAddToCart,
  }) => (
    <div
      style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '16px',
      }}
    >
      <DesktopTabletProductDetailHeader
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        quantityOptions={quantityOptions}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
      />
    </div>
  ),
  args: {
    productName: '프리미엄 무선 이어폰',
    purchaseCount: 42,
    price: 129000,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    layout: 'padded',
  },
};

export const Mobile: Story = {
  render: ({
    productName,
    purchaseCount,
    price,
    quantityOptions,
    onQuantityChange,
    onMenuClick,
    onAddToCart,
  }) => (
    <div
      style={{
        width: '375px',
        minWidth: '375px',
        maxWidth: '375px',
        margin: '0 auto',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <MobileProductDetailHeader
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        quantityOptions={quantityOptions}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
      />
    </div>
  ),
  args: {
    productName: '프리미엄 무선 이어폰',
    purchaseCount: 42,
    price: 129000,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
      },
    },
    layout: 'padded',
  },
};
