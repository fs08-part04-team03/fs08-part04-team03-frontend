import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import Image from 'next/image';
import { SideBarMenu } from './SideBarMenu';

const meta = {
  title: 'Organisms/SideBarMenu',
  component: SideBarMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '오른쪽에서 왼쪽으로 슬라이드되는 사이드바 메뉴 컴포넌트입니다. 오버레이 클릭 또는 닫기 버튼으로 닫을 수 있습니다.',
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '사이드바 열림/닫힘 상태',
    },
    onClose: {
      action: 'closed',
      description: '사이드바 닫기 콜백',
    },
  },
} satisfies Meta<typeof SideBarMenu>;

export default meta;

type Story = StoryObj<typeof SideBarMenu>;

export const Default: Story = {
  render: ({ open: initialOpen, onClose, children }) => {
    const [open, setOpen] = useState(initialOpen ?? false);

    return (
      <div className="w-full h-screen bg-gray-50">
        <div className="p-24 flex items-center gap-12">
          <IconButton
            aria-label="메뉴 열기"
            size="md"
            variant="default"
            className="flex items-center justify-center"
            onClick={() => setOpen(true)}
          >
            <Image src="/icons/hamburger.svg" alt="" width={20} height={20} aria-hidden="true" />
          </IconButton>
          <span className="text-14 text-gray-600">햄버거 버튼을 클릭하면 사이드바가 열립니다</span>
        </div>

        <SideBarMenu
          open={open}
          onClose={() => {
            setOpen(false);
            onClose?.();
          }}
        >
          {children ?? (
            <div className="flex flex-col justify-center items-center gap-16">
              <nav className="flex flex-col justify-center items-center gap-12">
                <button
                  type="button"
                  className="text-16 text-gray-700 hover:text-gray-900 text-left"
                >
                  홈
                </button>
                <button
                  type="button"
                  className="text-16 text-gray-700 hover:text-gray-900 text-left"
                >
                  상품
                </button>
                <button
                  type="button"
                  className="text-16 text-gray-700 hover:text-gray-900 text-left"
                >
                  장바구니
                </button>
                <button
                  type="button"
                  className="text-16 text-gray-700 hover:text-gray-900 text-left"
                >
                  마이페이지
                </button>
              </nav>
            </div>
          )}
        </SideBarMenu>
      </div>
    );
  },
  args: {
    open: false,
  },
};
