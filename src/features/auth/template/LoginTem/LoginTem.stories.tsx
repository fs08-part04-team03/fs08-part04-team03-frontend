import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import LoginTem, { LoginTemMobile, LoginTemDesktop } from './LoginTem';

const meta = {
  title: 'Features/Auth/Template/LoginTem',
  component: LoginTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      },
    },
    docs: {
      description: {
        component:
          '로그인 템플릿 컴포넌트입니다. UI만 담당하며, React Hook Form의 control과 handleSubmit을 props로 받습니다. 이메일과 비밀번호를 입력받아 로그인을 처리합니다.',
      },
    },
  },
} satisfies Meta<typeof LoginTem>;

export default meta;

type Story = StoryObj<typeof LoginTem>;

// 기본 스토리
export const Default: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
          email: '',
          password: '',
        },
      });

      const onSubmit = (values: LoginInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <LoginTem
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
  parameters: {
    docs: {
      description: {
        story: '기본 로그인 템플릿입니다. 이메일과 비밀번호를 입력받습니다.',
      },
    },
  },
};

// 서버 에러가 있는 경우
export const WithServerError: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
          email: '',
          password: '',
        },
      });

      const onSubmit = (values: LoginInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <LoginTem
          control={control}
          isValid={formState.isValid}
          serverError="이메일 또는 비밀번호를 다시 확인해 주세요."
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      );
    };

    return <Wrapper />;
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
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
          email: 'test@example.com',
          password: '',
        },
      });

      const onSubmit = (values: LoginInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <LoginTemMobile
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
  parameters: {
    docs: {
      description: {
        story: '모바일 화면 크기에 맞춘 로그인 템플릿입니다. Logo가 포함되어 있습니다.',
      },
    },
  },
};

// 데스크톱 버전
export const Desktop: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
          email: 'test@example.com',
          password: '',
        },
      });

      const onSubmit = (values: LoginInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <LoginTemDesktop
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
  parameters: {
    docs: {
      description: {
        story: '데스크톱 화면 크기에 맞춘 로그인 템플릿입니다.',
      },
    },
  },
};

// 유효하지 않은 폼 상태
export const InvalidForm: Story = {
  render: () => {
    const Wrapper = () => {
      const { control, handleSubmit, formState } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
          email: 'invalid-email', // 유효하지 않은 이메일
          password: '123', // 유효하지 않은 비밀번호
        },
      });

      const onSubmit = (values: LoginInput) => {
        // eslint-disable-next-line no-console
        console.log('Form submitted:', values);
      };

      return (
        <LoginTem
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
  parameters: {
    docs: {
      description: {
        story: '유효하지 않은 입력값이 있는 경우입니다. 버튼이 비활성화됩니다.',
      },
    },
  },
};
