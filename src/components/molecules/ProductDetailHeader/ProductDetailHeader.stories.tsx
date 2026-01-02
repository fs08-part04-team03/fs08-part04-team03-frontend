import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useAuthStore } from '@/lib/store/authStore';
import type { UserRole } from '@/constants/roles';
import ProductDetailHeader from './ProductDetailHeader';

// 인증 상태를 모킹하는 decorator
const withAuth = (role: UserRole | null) => {
  const AuthDecorator = (Story: React.ComponentType) => {
    React.useEffect(() => {
      if (role) {
        useAuthStore.getState().setAuth({
          user: {
            id: '1',
            email: 'test@example.com',
            name: '테스트 사용자',
            role,
            companyId: '1',
          },
          accessToken: 'mock-token',
        });
      } else {
        useAuthStore.getState().clearAuth();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Story />;
  };
  AuthDecorator.displayName = `withAuth(${role || 'null'})`;
  return AuthDecorator;
};

const meta = {
  title: 'Molecules/ProductDetailHeader',
  component: ProductDetailHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
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
      description: '제품 단가 (1개 가격)',
    },
    type: {
      control: 'radio',
      options: ['default', 'simple'],
      description: '헤더 타입 (simple일 경우 ItemMenu 숨김)',
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

/** =====================
 * Default with Manager (ItemMenu 표시)
 ====================== */
export const DefaultWithManager: Story = {
  args: {
    productName: '코카콜라',
    purchaseCount: 29,
    price: 2000,
    type: 'default',
    onMenuClick: (action) => {
      console.log('menu action:', action);
    },
  },
  decorators: [withAuth('manager')],
  parameters: {
    docs: {
      description: {
        story:
          '기본 타입입니다. 매니저 역할의 사용자에게는 ItemMenu가 표시되며, 수량 변경 시 총 금액이 자동 계산됩니다.',
      },
    },
  },
};

/** =====================
 * Default with Admin (ItemMenu 표시)
 ====================== */
export const DefaultWithAdmin: Story = {
  args: {
    productName: '코카콜라',
    purchaseCount: 29,
    price: 2000,
    type: 'default',
    onMenuClick: (action) => {
      console.log('menu action:', action);
    },
  },
  decorators: [withAuth('admin')],
  parameters: {
    docs: {
      description: {
        story:
          '기본 타입입니다. 관리자 역할의 사용자에게는 ItemMenu가 표시되며, 수량 변경 시 총 금액이 자동 계산됩니다.',
      },
    },
  },
};

/** =====================
 * Default with User (ItemMenu 숨김)
 ====================== */
export const DefaultWithUser: Story = {
  args: {
    productName: '코카콜라',
    purchaseCount: 29,
    price: 2000,
    type: 'default',
    onMenuClick: (action) => {
      console.log('menu action:', action);
    },
  },
  decorators: [withAuth('user')],
  parameters: {
    docs: {
      description: {
        story:
          '기본 타입이지만 일반 사용자(user) 역할의 사용자에게는 ItemMenu가 표시되지 않습니다. 수량 변경 시 총 금액이 자동 계산됩니다.',
      },
    },
  },
};

/** =====================
 * Simple (ItemMenu 숨김)
 ====================== */
export const Simple: Story = {
  args: {
    productName: '코카콜라',
    purchaseCount: 29,
    price: 2000,
    type: 'simple',
    onMenuClick: (action) => {
      console.log('menu action:', action);
    },
  },
  decorators: [withAuth('manager')],
  parameters: {
    docs: {
      description: {
        story:
          'simple 타입입니다. type이 simple이면 역할과 관계없이 ItemMenu가 숨겨지고 수량 선택과 장바구니 기능만 제공합니다.',
      },
    },
  },
};
