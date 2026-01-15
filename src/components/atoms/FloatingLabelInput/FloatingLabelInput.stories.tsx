import type { Meta, StoryObj } from '@storybook/nextjs';
import FloatingLabelInput from './FloatingLabelInput';

const meta = {
  title: 'Atoms/FloatingLabelInput',
  component: FloatingLabelInput,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description:
        '입력 필드의 레이블 텍스트. 값이 없을 때는 placeholder로 표시되고, 값이 있거나 disabled 상태일 때는 상단에 작은 레이블로 표시됩니다. 필수 prop입니다.',
    },
    error: {
      control: 'boolean',
      description:
        '에러 상태를 표시합니다. true일 경우 입력 필드 하단 테두리가 빨간색(error-500)으로 변경되어 에러 상태임을 시각적으로 표시합니다.',
    },
    showPasswordToggle: {
      control: 'boolean',
      description:
        '비밀번호 입력 필드에서 텍스트 표시/숨김을 토글할 수 있는 버튼을 표시합니다. true일 경우 입력 필드 오른쪽에 눈 아이콘이 표시되며, 클릭하면 password 타입과 text 타입을 전환합니다. type이 password일 때만 의미가 있습니다.',
    },
    disabled: {
      control: 'boolean',
      description:
        '입력 필드를 비활성화합니다. true일 경우 입력이 불가능하고, 시각적으로 투명도가 낮아지며 커서가 not-allowed로 변경됩니다. disabled 상태일 때도 레이블이 상단에 표시됩니다.',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'url'],
      description:
        'HTML input 요소의 type 속성입니다. 입력 필드의 타입에 따라 브라우저의 기본 검증 및 키보드가 다르게 동작합니다. 기본값은 "text"입니다. password 타입과 함께 showPasswordToggle을 사용하면 비밀번호 토글 기능을 활용할 수 있습니다.',
    },
    value: {
      control: 'text',
      description:
        '입력 필드의 현재 값입니다. controlled component로 사용할 때 상태와 함께 사용합니다. 값이 있을 경우 레이블이 상단에 작은 텍스트로 표시되고, placeholder는 숨겨집니다.',
    },
    className: {
      control: 'text',
      description:
        '컴포넌트의 최상위 div 요소에 추가할 커스텀 CSS 클래스입니다. 기본 스타일을 오버라이드하거나 추가 스타일을 적용할 때 사용합니다.',
    },
    placeholder: {
      control: 'text',
      description:
        '입력 필드에 값이 없고 disabled가 아닐 때 표시되는 placeholder 텍스트입니다. label과 동일한 값을 사용하며, 값이 있거나 disabled 상태일 때는 표시되지 않습니다.',
    },
    onChange: {
      control: false,
      description:
        '입력 값이 변경될 때 호출되는 콜백 함수입니다. React.ChangeEvent<HTMLInputElement>를 인자로 받습니다.',
    },
    onFocus: {
      control: false,
      description:
        '입력 필드에 포커스가 들어올 때 호출되는 콜백 함수입니다. React.FocusEvent<HTMLInputElement>를 인자로 받습니다.',
    },
    onBlur: {
      control: false,
      description:
        '입력 필드에서 포커스가 나갈 때 호출되는 콜백 함수입니다. React.FocusEvent<HTMLInputElement>를 인자로 받습니다.',
    },
  },
} satisfies Meta<typeof FloatingLabelInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이메일',
    type: 'text',
  },
};

export const WithValue: Story = {
  args: {
    label: '이메일',
    type: 'email',
    value: 'user@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    type: 'email',
    value: 'invalid-email',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '이메일',
    type: 'text',
    value: 'disabled@example.com',
    disabled: true,
  },
};

export const PasswordWithToggle: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    showPasswordToggle: true,
  },
};
