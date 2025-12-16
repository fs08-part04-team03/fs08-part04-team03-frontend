import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import InviteSignupTem, { InviteSignupTemMobile, InviteSignupTemDesktop } from './InviteSignupTem';

const meta = {
  title: 'Features/Auth/Template/InviteSignupTem',
  component: InviteSignupTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/invite/[token]',
      },
    },
    docs: {
      description: {
        component:
          '초대 회원가입 템플릿 컴포넌트입니다. UI만 담당하며, React Hook Form의 control과 handleSubmit을 props로 받습니다. 이메일은 백엔드에서 제공되므로 읽기 전용이며, 비밀번호와 비밀번호 확인만 입력받습니다.',
      },
    },
  },
} satisfies Meta<typeof InviteSignupTem>;

export default meta;

type Story = StoryObj<typeof InviteSignupTem>;

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<InviteSignupInput>({
        resolver: zodResolver(inviteSignupSchema),
        mode: 'onTouched',
        defaultValues: {
          email: args.name === '홍길동' ? 'hong@example.com' : 'test@example.com',
          password: '',
          confirmPassword: '',
        },
      });

      const onSubmit = (values: InviteSignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <InviteSignupTem
          name={args.name}
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  args: {
    name: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 초대 회원가입 템플릿입니다. 이메일은 읽기 전용으로 표시됩니다.',
      },
    },
  },
};

// 서버 에러가 있는 경우
export const WithServerError: Story = {
  render: (args) => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<InviteSignupInput>({
        resolver: zodResolver(inviteSignupSchema),
        mode: 'onTouched',
        defaultValues: {
          email: args.name === '홍길동' ? 'hong@example.com' : 'test@example.com',
          password: '',
          confirmPassword: '',
        },
      });

      const onSubmit = (values: InviteSignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <InviteSignupTem
          name={args.name}
          control={control}
          isValid={formState.isValid}
          serverError="회원가입에 실패했습니다. 다시 시도해 주세요."
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  args: {
    name: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '서버 에러 메시지가 표시되는 경우입니다.',
      },
    },
  },
};

// 모바일 버전
export const Mobile: Story = {
  render: (args) => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<InviteSignupInput>({
        resolver: zodResolver(inviteSignupSchema),
        mode: 'onTouched',
        defaultValues: {
          email: 'hong@example.com',
          password: '',
          confirmPassword: '',
        },
      });

      const onSubmit = (values: InviteSignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <InviteSignupTemMobile
          name={args.name}
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  args: {
    name: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '모바일 화면 크기에 맞춘 초대 회원가입 템플릿입니다. Logo가 포함되어 있습니다.',
      },
    },
  },
};

// 데스크톱 버전
export const Desktop: Story = {
  render: (args) => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<InviteSignupInput>({
        resolver: zodResolver(inviteSignupSchema),
        mode: 'onTouched',
        defaultValues: {
          email: 'hong@example.com',
          password: '',
          confirmPassword: '',
        },
      });

      const onSubmit = (values: InviteSignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <InviteSignupTemDesktop
          name={args.name}
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  args: {
    name: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '데스크톱 화면 크기에 맞춘 초대 회원가입 템플릿입니다.',
      },
    },
  },
};

// 유효하지 않은 폼 상태
export const InvalidForm: Story = {
  render: (args) => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<InviteSignupInput>({
        resolver: zodResolver(inviteSignupSchema),
        mode: 'onTouched',
        defaultValues: {
          email: 'hong@example.com',
          password: '123', // 유효하지 않은 비밀번호
          confirmPassword: '456', // 일치하지 않는 비밀번호
        },
      });

      const onSubmit = (values: InviteSignupInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <InviteSignupTem
          name={args.name}
          control={control}
          isValid={formState.isValid}
          serverError={null}
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
  },
  args: {
    name: '홍길동',
  },
  parameters: {
    docs: {
      description: {
        story: '유효하지 않은 입력값이 있는 경우입니다. 버튼이 비활성화됩니다.',
      },
    },
  },
};
