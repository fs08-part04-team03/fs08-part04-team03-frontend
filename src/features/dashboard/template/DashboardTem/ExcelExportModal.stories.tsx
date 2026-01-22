/* eslint-disable */
import type { Meta, StoryObj } from '@storybook/nextjs';
import { logger } from '@/utils/logger';
import { ExcelExportModal } from './ExcelExportModal';

const meta: Meta<typeof ExcelExportModal> = {
  title: 'Features/Dashboard/Template/ExcelExportModal',
  component: ExcelExportModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
관리자용 **구매 요청 승인/거절 리포트 엑셀 다운로드 모달**입니다.

## 기능

- **날짜 범위 선택**: 시작일, 종료일 (필수)
- **상태 필터**: 전체 / 승인 / 거절
- **역할 필터**: 전체 / 일반 사용자 / 매니저 / 관리자

## 동작

- 날짜 미입력 시 다운로드 버튼 비활성화
- 종료일이 시작일보다 이전인 경우 에러 메시지 표시
- ESC 키로 모달 닫기 가능
        `,
      },
    },
  },
  args: {
    onClose: () => logger.info('닫기 버튼'),
    onExport: (data) => logger.info('내보내기 버튼', data),
  },
};

export default meta;
type Story = StoryObj<typeof ExcelExportModal>;

/** 기본 상태 (모달 열림) */
export const Default: Story = {
  args: {
    open: true,
    isLoading: false,
  },
};

/** 로딩 상태 */
export const Loading: Story = {
  args: {
    open: true,
    isLoading: true,
  },
};

/** 모달 닫힘 */
export const Closed: Story = {
  args: {
    open: false,
    isLoading: false,
  },
};
