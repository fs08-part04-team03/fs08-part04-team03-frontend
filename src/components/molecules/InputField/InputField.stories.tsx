import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Molecules/InputField',
  component: InputField,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

// -----------------------
// 1) 이름
// -----------------------
export const NameField: Story = {
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <InputField
          label="이름 (기업 담당자)"
          placeholder="이름을 입력해주세요."
          type="text"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <Wrapper />;
  },
};

// -----------------------
// 2) 이메일
// -----------------------
export const EmailField: Story = {
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <InputField
          label="이메일"
          placeholder="이메일을 입력해주세요."
          type="email"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <Wrapper />;
  },
};

// -----------------------
// 3) 비밀번호
// -----------------------
export const PasswordField: Story = {
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <InputField
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          value={value}
          onChange={setValue}
          minLength={8}
        />
      );
    };
    return <Wrapper />;
  },
};

// -----------------------
// 4) 비밀번호 확인
// -----------------------
export const PasswordConfirmField: Story = {
  render: () => {
    const Wrapper = () => {
      const [pw, setPw] = useState('');
      const [confirm, setConfirm] = useState('');

      return (
        <div className="flex flex-col gap-20">
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            value={pw}
            onChange={setPw}
            minLength={8}
          />
          <InputField
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요."
            type="passwordConfirm"
            value={confirm}
            onChange={setConfirm}
            compareWith={pw}
          />
        </div>
      );
    };
    return <Wrapper />;
  },
};

// -----------------------
// 5) 회사명
// -----------------------
export const CompanyField: Story = {
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <InputField
          label="회사명"
          placeholder="회사명을 입력해주세요."
          type="text"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <Wrapper />;
  },
};

// -----------------------
// 6) 사업자 번호
// -----------------------
export const BusinessNumberField: Story = {
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <InputField
          label="사업자 번호"
          placeholder="사업자 번호를 입력해주세요."
          type="businessNumber"
          value={value}
          onChange={setValue}
        />
      );
    };
    return <Wrapper />;
  },
};
